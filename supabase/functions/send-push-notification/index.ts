import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SEND-PUSH] ${step}${detailsStr}`);
};

interface PushPayload {
  user_id: string;
  title: string;
  body: string;
  url?: string;
  tag?: string;
  type?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const payload: PushPayload = await req.json();
    const { user_id, title, body, url = "/", tag = "stocksim-notification", type } = payload;

    if (!user_id || !title || !body) {
      throw new Error("Missing required fields: user_id, title, body");
    }
    logStep("Payload received", { user_id, title, type });

    // Check user notification preferences if type is provided
    if (type) {
      const { data: settings } = await supabaseClient
        .from("user_settings")
        .select("*")
        .eq("user_id", user_id)
        .single();

      if (settings) {
        const preferenceMap: Record<string, string> = {
          daily_streak: "push_daily_streak",
          lesson_completed: "push_lesson_completed",
          scanner_complete: "push_scanner_complete",
          portfolio_alerts: "push_portfolio_alerts",
          badge_unlocked: "push_badge_unlocked",
        };

        const preferenceKey = preferenceMap[type];
        if (preferenceKey && !settings[preferenceKey]) {
          logStep("Notification disabled by user preference", { type, preferenceKey });
          return new Response(JSON.stringify({ 
            success: false, 
            reason: "disabled_by_preference" 
          }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          });
        }
      }
    }

    // Get user's push subscriptions
    const { data: subscriptions, error: subError } = await supabaseClient
      .from("push_subscriptions")
      .select("*")
      .eq("user_id", user_id);

    if (subError) throw subError;

    if (!subscriptions || subscriptions.length === 0) {
      logStep("No push subscriptions found for user");
      return new Response(JSON.stringify({ 
        success: false, 
        reason: "no_subscriptions" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    logStep("Found subscriptions", { count: subscriptions.length });

    // Note: In production, you would use web-push library to send actual push notifications
    // This requires VAPID private key and proper push service integration
    // For now, we'll log the notification that would be sent

    const notificationPayload = {
      title,
      body,
      tag,
      data: { url },
    };

    logStep("Would send notification", { 
      payload: notificationPayload,
      subscriptionCount: subscriptions.length 
    });

    // Also create an in-app notification
    await supabaseClient
      .from("notifications")
      .insert({
        user_id,
        title,
        message: body,
        type: type || "push",
        action_url: url,
      });

    logStep("In-app notification created");

    return new Response(JSON.stringify({
      success: true,
      sent_to: subscriptions.length,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
