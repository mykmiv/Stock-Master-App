import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PROMOTION_ZONE = 10;
const DEMOTION_ZONE = 5;

const LEAGUES_ORDER = [
  'Bronze',
  'Silver', 
  'Gold',
  'Platinum',
  'Diamond',
  'Masters',
  'Grandmaster',
  'Challenger'
];

function getNextLeague(league: string): string | null {
  const index = LEAGUES_ORDER.indexOf(league);
  return index < LEAGUES_ORDER.length - 1 ? LEAGUES_ORDER[index + 1] : null;
}

function getPreviousLeague(league: string): string | null {
  const index = LEAGUES_ORDER.indexOf(league);
  return index > 0 ? LEAGUES_ORDER[index - 1] : null;
}

function getCurrentMonthNumber(): number {
  const now = new Date();
  return now.getFullYear() * 12 + now.getMonth();
}

function getMonthStartDate(): string {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  return firstDay.toISOString().split('T')[0];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log("Starting monthly league reset...");

    // Get all unique leagues with participants
    const { data: leagueGroups, error: leagueError } = await supabase
      .from('user_leagues')
      .select('current_league')
      .neq('current_league', null);

    if (leagueError) {
      throw leagueError;
    }

    const uniqueLeagues = [...new Set(leagueGroups?.map(l => l.current_league) || [])];
    console.log(`Processing ${uniqueLeagues.length} leagues...`);

    let totalPromotions = 0;
    let totalDemotions = 0;
    let totalProcessed = 0;

    for (const league of uniqueLeagues) {
      // Get all users in this league, ordered by XP descending
      const { data: members, error: membersError } = await supabase
        .from('user_leagues')
        .select('*')
        .eq('current_league', league)
        .order('weekly_xp', { ascending: false });

      if (membersError) {
        console.error(`Error fetching members for ${league}:`, membersError);
        continue;
      }

      if (!members || members.length === 0) continue;

      console.log(`Processing ${members.length} members in ${league}...`);

      const nextLeague = getNextLeague(league);
      const prevLeague = getPreviousLeague(league);
      const totalMembers = members.length;

      for (let i = 0; i < members.length; i++) {
        const member = members[i];
        const rank = i + 1;
        
        let newLeague = league;
        let promoted = false;
        let demoted = false;
        let isTop3 = rank <= 3;
        let isFirstPlace = rank === 1;

        // Check for promotion (top 10)
        if (rank <= PROMOTION_ZONE && nextLeague) {
          newLeague = nextLeague;
          promoted = true;
          totalPromotions++;
        }
        // Check for demotion (bottom 5)
        else if (rank > totalMembers - DEMOTION_ZONE && prevLeague && totalMembers > DEMOTION_ZONE) {
          newLeague = prevLeague;
          demoted = true;
          totalDemotions++;
        }

        // Calculate new highest league
        const currentHighest = member.highest_league_reached || 'Bronze';
        const newHighest = LEAGUES_ORDER.indexOf(newLeague) > LEAGUES_ORDER.indexOf(currentHighest) 
          ? newLeague 
          : currentHighest;

        // Update user league data
        const { error: updateError } = await supabase
          .from('user_leagues')
          .update({
            current_league: newLeague,
            weekly_xp: 0, // Reset monthly XP
            league_rank: 50, // Reset rank for new month
            week_number: getCurrentMonthNumber(),
            week_start_date: getMonthStartDate(),
            highest_league_reached: newHighest,
            total_promotions: (member.total_promotions || 0) + (promoted ? 1 : 0),
            total_demotions: (member.total_demotions || 0) + (demoted ? 1 : 0),
            total_top_3_finishes: (member.total_top_3_finishes || 0) + (isTop3 ? 1 : 0),
            total_first_place_finishes: (member.total_first_place_finishes || 0) + (isFirstPlace ? 1 : 0),
            weeks_participated: (member.weeks_participated || 0) + 1,
            updated_at: new Date().toISOString()
          })
          .eq('id', member.id);

        if (updateError) {
          console.error(`Error updating member ${member.user_id}:`, updateError);
          continue;
        }

        // Create notification for the user
        let notificationType = 'info';
        let title = '📊 Résultats mensuels';
        let message = `Mois terminé! Vous avez fini #${rank} en ligue ${league}.`;

        if (isFirstPlace) {
          notificationType = 'achievement';
          title = '🏆 Champion du mois!';
          message = `Incroyable! Vous êtes #1 en ligue ${league}! Récompenses débloquées.`;
        } else if (isTop3) {
          notificationType = 'success';
          title = '🥇 Podium atteint!';
          message = `Bravo! Vous avez terminé #${rank} en ligue ${league}!`;
        }

        if (promoted) {
          await supabase.from('notifications').insert({
            user_id: member.user_id,
            type: 'success',
            title: `🚀 Promotion en ${newLeague}!`,
            message: `Félicitations! Vous avez terminé #${rank} et montez en ligue ${newLeague}.`,
            action_url: '/league',
            action_label: 'Voir le classement'
          });
        } else if (demoted) {
          await supabase.from('notifications').insert({
            user_id: member.user_id,
            type: 'warning',
            title: `📉 Relégation en ${newLeague}`,
            message: `Vous avez terminé #${rank} et descendez en ligue ${newLeague}. Continuez à gagner de l'XP!`,
            action_url: '/league',
            action_label: 'Voir le classement'
          });
        } else {
          await supabase.from('notifications').insert({
            user_id: member.user_id,
            type: notificationType,
            title,
            message,
            action_url: '/league',
            action_label: 'Voir le classement'
          });
        }

        totalProcessed++;
      }
    }

    console.log(`Monthly reset complete: ${totalProcessed} users processed, ${totalPromotions} promotions, ${totalDemotions} demotions`);

    return new Response(
      JSON.stringify({
        success: true,
        processed: totalProcessed,
        promotions: totalPromotions,
        demotions: totalDemotions,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error("Error in monthly league reset:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
