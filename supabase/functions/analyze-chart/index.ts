import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
const FINNHUB_API_KEY = Deno.env.get('FINNHUB_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;

interface FinnhubQuote {
  c: number;  // current price
  d: number;  // change
  dp: number; // percent change
  h: number;  // high
  l: number;  // low
  o: number;  // open
  pc: number; // previous close
}

interface FinnhubProfile {
  name: string;
  ticker: string;
  marketCapitalization: number;
  finnhubIndustry: string;
  logo: string;
  weburl: string;
}

interface FinnhubNews {
  headline: string;
  source: string;
  url: string;
  datetime: number;
  summary: string;
}

async function getStockQuote(symbol: string): Promise<FinnhubQuote | null> {
  if (!FINNHUB_API_KEY || !symbol) return null;
  
  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol.toUpperCase()}&token=${FINNHUB_API_KEY}`
    );
    if (!response.ok) return null;
    const data = await response.json();
    if (data.c === 0) return null; // Invalid symbol
    return data;
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    return null;
  }
}

async function getCompanyProfile(symbol: string): Promise<FinnhubProfile | null> {
  if (!FINNHUB_API_KEY || !symbol) return null;
  
  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol.toUpperCase()}&token=${FINNHUB_API_KEY}`
    );
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Error fetching company profile:', error);
    return null;
  }
}

async function getCompanyNews(symbol: string): Promise<FinnhubNews[]> {
  if (!FINNHUB_API_KEY || !symbol) return [];
  
  try {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const fromDate = weekAgo.toISOString().split('T')[0];
    const toDate = today.toISOString().split('T')[0];
    
    const response = await fetch(
      `https://finnhub.io/api/v1/company-news?symbol=${symbol.toUpperCase()}&from=${fromDate}&to=${toDate}&token=${FINNHUB_API_KEY}`
    );
    if (!response.ok) return [];
    const news = await response.json();
    return news.slice(0, 3); // Return only 3 latest news
  } catch (error) {
    console.error('Error fetching company news:', error);
    return [];
  }
}

function formatMarketCap(value: number): string {
  if (!value) return 'N/A';
  const inMillions = value; // Finnhub returns in millions
  if (inMillions >= 1000000) return `$${(inMillions / 1000000).toFixed(2)}T`;
  if (inMillions >= 1000) return `$${(inMillions / 1000).toFixed(2)}B`;
  return `$${inMillions.toFixed(2)}M`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!LOVABLE_API_KEY) {
      throw new Error('AI API key not configured');
    }

    const { imageBase64, ticker: providedTicker, userId } = await req.json();

    if (!imageBase64) {
      throw new Error('No image provided');
    }

    console.log('Starting chart analysis...');
    console.log('Provided ticker:', providedTicker || 'none');

    // AI Analysis with Lovable AI (Gemini 2.5 Pro for vision)
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-pro',
        messages: [
          {
            role: 'system',
            content: `You are an expert stock chart analyst specializing in technical analysis. Analyze the provided stock chart image and provide a comprehensive technical analysis.

Your response MUST be valid JSON with this exact structure:
{
  "ticker": "DETECTED_TICKER or null if not visible",
  "trend": "bullish" | "bearish" | "neutral",
  "patterns": ["Array of chart patterns identified, e.g., 'Head and Shoulders', 'Double Bottom', 'Ascending Triangle', 'Flag', 'Cup and Handle'"],
  "supportLevels": [array of numeric price levels],
  "resistanceLevels": [array of numeric price levels],
  "volumeAnalysis": "Description of volume patterns and what they indicate",
  "recommendation": {
    "action": "buy" | "hold" | "sell" | "watch",
    "confidence": 0-100,
    "reasoning": "2-3 paragraphs explaining the analysis and recommendation",
    "keyLevels": {
      "entry": numeric or null,
      "stopLoss": numeric or null,
      "target": numeric or null
    }
  },
  "educationalNotes": ["Array of 2-4 educational bullet points explaining the patterns and signals found"]
}

Guidelines:
- Be specific about price levels based on what you see
- Explain patterns in educational terms
- Always include risk warnings
- If ticker is provided, use it; otherwise try to detect from chart
- Confidence should reflect how clear the signals are
- Focus on actionable insights for beginner to intermediate traders`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: providedTicker 
                  ? `Analyze this ${providedTicker} stock chart and provide your technical analysis in JSON format.`
                  : 'Analyze this stock chart and provide your technical analysis in JSON format. Try to identify the ticker if visible.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageBase64.startsWith('data:') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content;
    console.log('AI response received');

    // Parse AI response
    let analysis;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      analysis = {
        ticker: providedTicker || null,
        trend: 'neutral',
        patterns: [],
        supportLevels: [],
        resistanceLevels: [],
        volumeAnalysis: 'Unable to analyze volume patterns.',
        recommendation: {
          action: 'watch',
          confidence: 0,
          reasoning: 'The chart analysis encountered an issue. Please try with a clearer image.',
          keyLevels: {}
        },
        educationalNotes: ['Ensure chart images are clear with visible candlesticks or price action.']
      };
    }

    // Use provided ticker or detected ticker
    const finalTicker = providedTicker || analysis.ticker;
    
    // Fetch real-time data if we have a ticker
    let fundamentals = null;
    let currentPrice = null;
    let priceChange = null;
    let priceChangePercent = null;

    if (finalTicker && FINNHUB_API_KEY) {
      console.log('Fetching Finnhub data for:', finalTicker);
      
      const [quote, profile, news] = await Promise.all([
        getStockQuote(finalTicker),
        getCompanyProfile(finalTicker),
        getCompanyNews(finalTicker)
      ]);

      if (quote) {
        currentPrice = quote.c;
        priceChange = quote.d;
        priceChangePercent = quote.dp;
      }

      if (profile || news.length > 0) {
        fundamentals = {
          marketCap: profile ? formatMarketCap(profile.marketCapitalization) : undefined,
          sector: profile?.finnhubIndustry || undefined,
          recentNews: news.map(n => ({
            headline: n.headline,
            source: n.source,
            url: n.url
          }))
        };
      }
    }

    // Prepare final result
    const result = {
      ticker: finalTicker,
      currentPrice,
      priceChange,
      priceChangePercent,
      trend: analysis.trend,
      patterns: analysis.patterns || [],
      supportLevels: analysis.supportLevels || [],
      resistanceLevels: analysis.resistanceLevels || [],
      volumeAnalysis: analysis.volumeAnalysis || '',
      recommendation: analysis.recommendation || {
        action: 'watch',
        confidence: 50,
        reasoning: 'Analysis completed.',
        keyLevels: {}
      },
      educationalNotes: analysis.educationalNotes || [],
      fundamentals,
      analyzedAt: new Date().toISOString()
    };

    // Save to database if user is authenticated
    if (userId) {
      try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        
        await supabase.from('chart_analyses').insert({
          user_id: userId,
          analysis_result: result,
          patterns_found: result.patterns,
          trend: result.trend,
          support_levels: result.supportLevels,
          resistance_levels: result.resistanceLevels,
          recommendation: result.recommendation.reasoning
        });
        console.log('Analysis saved to database');
      } catch (dbError) {
        console.error('Error saving to database:', dbError);
        // Don't fail the request if DB save fails
      }
    }

    console.log('Analysis complete:', result.ticker || 'unknown ticker');

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in analyze-chart function:', error);
    return new Response(JSON.stringify({ 
      error: errorMessage,
      trend: 'neutral',
      patterns: [],
      supportLevels: [],
      resistanceLevels: [],
      volumeAnalysis: '',
      recommendation: {
        action: 'watch',
        confidence: 0,
        reasoning: 'Unable to analyze the chart. Please ensure you have uploaded a clear stock chart image.',
        keyLevels: {}
      },
      educationalNotes: [],
      analyzedAt: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
