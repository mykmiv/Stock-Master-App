export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_roles: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          permissions: Json | null
          role: Database["public"]["Enums"]["admin_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          permissions?: Json | null
          role?: Database["public"]["Enums"]["admin_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          permissions?: Json | null
          role?: Database["public"]["Enums"]["admin_role"]
          user_id?: string
        }
        Relationships: []
      }
      chart_analyses: {
        Row: {
          analysis_result: Json | null
          created_at: string | null
          id: string
          image_url: string | null
          patterns_found: string[] | null
          recommendation: string | null
          resistance_levels: number[] | null
          support_levels: number[] | null
          trend: string | null
          user_id: string
        }
        Insert: {
          analysis_result?: Json | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          patterns_found?: string[] | null
          recommendation?: string | null
          resistance_levels?: number[] | null
          support_levels?: number[] | null
          trend?: string | null
          user_id: string
        }
        Update: {
          analysis_result?: Json | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          patterns_found?: string[] | null
          recommendation?: string | null
          resistance_levels?: number[] | null
          support_levels?: number[] | null
          trend?: string | null
          user_id?: string
        }
        Relationships: []
      }
      educational_videos: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          duration_minutes: number | null
          id: string
          is_premium: boolean | null
          level: string
          order_index: number | null
          published: boolean | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          video_url: string
          view_count: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_premium?: boolean | null
          level?: string
          order_index?: number | null
          published?: boolean | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          video_url: string
          view_count?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_premium?: boolean | null
          level?: string
          order_index?: number | null
          published?: boolean | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          video_url?: string
          view_count?: number | null
        }
        Relationships: []
      }
      holdings: {
        Row: {
          average_cost: number
          created_at: string | null
          id: string
          portfolio_id: string
          shares: number
          symbol: string
          updated_at: string | null
        }
        Insert: {
          average_cost: number
          created_at?: string | null
          id?: string
          portfolio_id: string
          shares: number
          symbol: string
          updated_at?: string | null
        }
        Update: {
          average_cost?: number
          created_at?: string | null
          id?: string
          portfolio_id?: string
          shares?: number
          symbol?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "holdings_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "portfolios"
            referencedColumns: ["id"]
          },
        ]
      }
      league_groups: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          league: string
          week_number: number
          week_start_date: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          league?: string
          week_number: number
          week_start_date: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          league?: string
          week_number?: number
          week_start_date?: string
        }
        Relationships: []
      }
      lessons: {
        Row: {
          content: string | null
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          id: string
          level: Database["public"]["Enums"]["user_level"]
          order_index: number
          title: string
          xp_reward: number | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          level: Database["public"]["Enums"]["user_level"]
          order_index: number
          title: string
          xp_reward?: number | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          level?: Database["public"]["Enums"]["user_level"]
          order_index?: number
          title?: string
          xp_reward?: number | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_label: string | null
          action_url: string | null
          created_at: string | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_label?: string | null
          action_url?: string | null
          created_at?: string | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          action_label?: string | null
          action_url?: string | null
          created_at?: string | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      onboarding_data: {
        Row: {
          biggest_challenge: string | null
          completed_at: string | null
          created_at: string
          current_knowledge: string | null
          id: string
          main_interests: string[] | null
          main_motivation: string | null
          notification_prefs: string[] | null
          preparation_score: number | null
          risk_tolerance: string | null
          screen_time: string | null
          sectors: string[] | null
          starting_capital: string | null
          stock_types: string[] | null
          tools_used: string | null
          trade_timeline: string | null
          trading_experience: string[] | null
          trading_style: string | null
          user_id: string
          why_trading: string | null
        }
        Insert: {
          biggest_challenge?: string | null
          completed_at?: string | null
          created_at?: string
          current_knowledge?: string | null
          id?: string
          main_interests?: string[] | null
          main_motivation?: string | null
          notification_prefs?: string[] | null
          preparation_score?: number | null
          risk_tolerance?: string | null
          screen_time?: string | null
          sectors?: string[] | null
          starting_capital?: string | null
          stock_types?: string[] | null
          tools_used?: string | null
          trade_timeline?: string | null
          trading_experience?: string[] | null
          trading_style?: string | null
          user_id: string
          why_trading?: string | null
        }
        Update: {
          biggest_challenge?: string | null
          completed_at?: string | null
          created_at?: string
          current_knowledge?: string | null
          id?: string
          main_interests?: string[] | null
          main_motivation?: string | null
          notification_prefs?: string[] | null
          preparation_score?: number | null
          risk_tolerance?: string | null
          screen_time?: string | null
          sectors?: string[] | null
          starting_capital?: string | null
          stock_types?: string[] | null
          tools_used?: string | null
          trade_timeline?: string | null
          trading_experience?: string[] | null
          trading_style?: string | null
          user_id?: string
          why_trading?: string | null
        }
        Relationships: []
      }
      portfolio_snapshots: {
        Row: {
          cash_balance: number
          created_at: string
          id: string
          invested_value: number
          portfolio_id: string
          snapshot_date: string
          total_value: number
        }
        Insert: {
          cash_balance: number
          created_at?: string
          id?: string
          invested_value: number
          portfolio_id: string
          snapshot_date?: string
          total_value: number
        }
        Update: {
          cash_balance?: number
          created_at?: string
          id?: string
          invested_value?: number
          portfolio_id?: string
          snapshot_date?: string
          total_value?: number
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_snapshots_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "portfolios"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolios: {
        Row: {
          cash_balance: number | null
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cash_balance?: number | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cash_balance?: number | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          current_level: number | null
          daily_xp: number | null
          estimated_completion_days: number | null
          id: string
          last_activity_date: string | null
          learning_path: string | null
          learning_path_description: string | null
          lessons_per_day: number | null
          level: Database["public"]["Enums"]["user_level"] | null
          level_name: string | null
          longest_streak: number | null
          onboarding_completed: boolean | null
          readiness_score: number | null
          risk_tolerance: string | null
          started_learning_at: string | null
          streak_days: number | null
          tier: string | null
          total_lessons_completed: number | null
          total_lessons_in_path: number | null
          total_quizzes_perfect: number | null
          trading_goals: string | null
          updated_at: string | null
          user_id: string
          username: string | null
          weekly_xp: number | null
          xp: number | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          current_level?: number | null
          daily_xp?: number | null
          estimated_completion_days?: number | null
          id?: string
          last_activity_date?: string | null
          learning_path?: string | null
          learning_path_description?: string | null
          lessons_per_day?: number | null
          level?: Database["public"]["Enums"]["user_level"] | null
          level_name?: string | null
          longest_streak?: number | null
          onboarding_completed?: boolean | null
          readiness_score?: number | null
          risk_tolerance?: string | null
          started_learning_at?: string | null
          streak_days?: number | null
          tier?: string | null
          total_lessons_completed?: number | null
          total_lessons_in_path?: number | null
          total_quizzes_perfect?: number | null
          trading_goals?: string | null
          updated_at?: string | null
          user_id: string
          username?: string | null
          weekly_xp?: number | null
          xp?: number | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          current_level?: number | null
          daily_xp?: number | null
          estimated_completion_days?: number | null
          id?: string
          last_activity_date?: string | null
          learning_path?: string | null
          learning_path_description?: string | null
          lessons_per_day?: number | null
          level?: Database["public"]["Enums"]["user_level"] | null
          level_name?: string | null
          longest_streak?: number | null
          onboarding_completed?: boolean | null
          readiness_score?: number | null
          risk_tolerance?: string | null
          started_learning_at?: string | null
          streak_days?: number | null
          tier?: string | null
          total_lessons_completed?: number | null
          total_lessons_in_path?: number | null
          total_quizzes_perfect?: number | null
          trading_goals?: string | null
          updated_at?: string | null
          user_id?: string
          username?: string | null
          weekly_xp?: number | null
          xp?: number | null
        }
        Relationships: []
      }
      push_subscriptions: {
        Row: {
          auth: string
          created_at: string
          endpoint: string
          id: string
          p256dh: string
          updated_at: string
          user_id: string
        }
        Insert: {
          auth: string
          created_at?: string
          endpoint: string
          id?: string
          p256dh: string
          updated_at?: string
          user_id: string
        }
        Update: {
          auth?: string
          created_at?: string
          endpoint?: string
          id?: string
          p256dh?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      trades: {
        Row: {
          executed_at: string | null
          id: string
          order_type: Database["public"]["Enums"]["order_type"]
          portfolio_id: string
          price: number
          shares: number
          side: string
          status: Database["public"]["Enums"]["order_status"] | null
          symbol: string
          total_value: number
        }
        Insert: {
          executed_at?: string | null
          id?: string
          order_type: Database["public"]["Enums"]["order_type"]
          portfolio_id: string
          price: number
          shares: number
          side: string
          status?: Database["public"]["Enums"]["order_status"] | null
          symbol: string
          total_value: number
        }
        Update: {
          executed_at?: string | null
          id?: string
          order_type?: Database["public"]["Enums"]["order_type"]
          portfolio_id?: string
          price?: number
          shares?: number
          side?: string
          status?: Database["public"]["Enums"]["order_status"] | null
          symbol?: string
          total_value?: number
        }
        Relationships: [
          {
            foreignKeyName: "trades_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "portfolios"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_leagues: {
        Row: {
          created_at: string | null
          current_league: string
          highest_league_reached: string | null
          id: string
          league_group_id: string | null
          league_rank: number | null
          total_demotions: number | null
          total_first_place_finishes: number | null
          total_promotions: number | null
          total_top_3_finishes: number | null
          updated_at: string | null
          user_id: string
          week_number: number
          week_start_date: string | null
          weekly_xp: number | null
          weeks_participated: number | null
        }
        Insert: {
          created_at?: string | null
          current_league?: string
          highest_league_reached?: string | null
          id?: string
          league_group_id?: string | null
          league_rank?: number | null
          total_demotions?: number | null
          total_first_place_finishes?: number | null
          total_promotions?: number | null
          total_top_3_finishes?: number | null
          updated_at?: string | null
          user_id: string
          week_number?: number
          week_start_date?: string | null
          weekly_xp?: number | null
          weeks_participated?: number | null
        }
        Update: {
          created_at?: string | null
          current_league?: string
          highest_league_reached?: string | null
          id?: string
          league_group_id?: string | null
          league_rank?: number | null
          total_demotions?: number | null
          total_first_place_finishes?: number | null
          total_promotions?: number | null
          total_top_3_finishes?: number | null
          updated_at?: string | null
          user_id?: string
          week_number?: number
          week_start_date?: string | null
          weekly_xp?: number | null
          weeks_participated?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_leagues_league_group_id_fkey"
            columns: ["league_group_id"]
            isOneToOne: false
            referencedRelation: "league_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      user_lesson_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          day_number: number | null
          id: string
          is_locked: boolean | null
          lesson_id: string
          order_in_path: number | null
          position_in_day: number | null
          quiz_score: number | null
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          day_number?: number | null
          id?: string
          is_locked?: boolean | null
          lesson_id: string
          order_in_path?: number | null
          position_in_day?: number | null
          quiz_score?: number | null
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          day_number?: number | null
          id?: string
          is_locked?: boolean | null
          lesson_id?: string
          order_in_path?: number | null
          position_in_day?: number | null
          quiz_score?: number | null
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          animations_enabled: boolean | null
          auto_fetch_prices: boolean | null
          compact_mode: boolean | null
          confidence_threshold: number | null
          confirm_before_trade: boolean | null
          created_at: string | null
          date_format: string | null
          default_order_type: string | null
          desktop_notifications: boolean | null
          email_badge_unlocked: boolean | null
          email_daily_streak: boolean | null
          email_marketing: boolean | null
          email_new_lesson: boolean | null
          email_portfolio_alerts: boolean | null
          email_scanner_complete: boolean | null
          email_weekly_summary: boolean | null
          history_retention_days: number | null
          id: string
          include_fundamentals: boolean | null
          include_news: boolean | null
          language: string | null
          push_badge_unlocked: boolean | null
          push_daily_streak: boolean | null
          push_enabled: boolean | null
          push_lesson_completed: boolean | null
          push_portfolio_alerts: boolean | null
          push_scanner_complete: boolean | null
          save_scan_history: boolean | null
          show_pnl_mode: string | null
          show_xp_in_header: boolean | null
          sound_effects: boolean | null
          starting_cash: number | null
          theme: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          animations_enabled?: boolean | null
          auto_fetch_prices?: boolean | null
          compact_mode?: boolean | null
          confidence_threshold?: number | null
          confirm_before_trade?: boolean | null
          created_at?: string | null
          date_format?: string | null
          default_order_type?: string | null
          desktop_notifications?: boolean | null
          email_badge_unlocked?: boolean | null
          email_daily_streak?: boolean | null
          email_marketing?: boolean | null
          email_new_lesson?: boolean | null
          email_portfolio_alerts?: boolean | null
          email_scanner_complete?: boolean | null
          email_weekly_summary?: boolean | null
          history_retention_days?: number | null
          id?: string
          include_fundamentals?: boolean | null
          include_news?: boolean | null
          language?: string | null
          push_badge_unlocked?: boolean | null
          push_daily_streak?: boolean | null
          push_enabled?: boolean | null
          push_lesson_completed?: boolean | null
          push_portfolio_alerts?: boolean | null
          push_scanner_complete?: boolean | null
          save_scan_history?: boolean | null
          show_pnl_mode?: string | null
          show_xp_in_header?: boolean | null
          sound_effects?: boolean | null
          starting_cash?: number | null
          theme?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          animations_enabled?: boolean | null
          auto_fetch_prices?: boolean | null
          compact_mode?: boolean | null
          confidence_threshold?: number | null
          confirm_before_trade?: boolean | null
          created_at?: string | null
          date_format?: string | null
          default_order_type?: string | null
          desktop_notifications?: boolean | null
          email_badge_unlocked?: boolean | null
          email_daily_streak?: boolean | null
          email_marketing?: boolean | null
          email_new_lesson?: boolean | null
          email_portfolio_alerts?: boolean | null
          email_scanner_complete?: boolean | null
          email_weekly_summary?: boolean | null
          history_retention_days?: number | null
          id?: string
          include_fundamentals?: boolean | null
          include_news?: boolean | null
          language?: string | null
          push_badge_unlocked?: boolean | null
          push_daily_streak?: boolean | null
          push_enabled?: boolean | null
          push_lesson_completed?: boolean | null
          push_portfolio_alerts?: boolean | null
          push_scanner_complete?: boolean | null
          save_scan_history?: boolean | null
          show_pnl_mode?: string | null
          show_xp_in_header?: boolean | null
          sound_effects?: boolean | null
          starting_cash?: number | null
          theme?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      watchlist_items: {
        Row: {
          added_at: string | null
          id: string
          symbol: string
          watchlist_id: string
        }
        Insert: {
          added_at?: string | null
          id?: string
          symbol: string
          watchlist_id: string
        }
        Update: {
          added_at?: string | null
          id?: string
          symbol?: string
          watchlist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "watchlist_items_watchlist_id_fkey"
            columns: ["watchlist_id"]
            isOneToOne: false
            referencedRelation: "watchlists"
            referencedColumns: ["id"]
          },
        ]
      }
      watchlists: {
        Row: {
          created_at: string | null
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      xp_transactions: {
        Row: {
          amount: number
          created_at: string | null
          final_amount: number
          id: string
          metadata: Json | null
          multiplier: number | null
          source: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          final_amount: number
          id?: string
          metadata?: Json | null
          multiplier?: number | null
          source: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          final_amount?: number
          id?: string
          metadata?: Json | null
          multiplier?: number | null
          source?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_month_number: { Args: never; Returns: number }
      get_current_week_number: { Args: never; Returns: number }
      get_month_start_date: { Args: never; Returns: string }
      get_week_start_date: { Args: never; Returns: string }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      is_owner: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      admin_role: "owner" | "admin" | "moderator"
      order_status: "pending" | "executed" | "cancelled"
      order_type: "market" | "limit" | "stop_loss" | "trailing_stop"
      user_level: "beginner" | "intermediate" | "advanced"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      admin_role: ["owner", "admin", "moderator"],
      order_status: ["pending", "executed", "cancelled"],
      order_type: ["market", "limit", "stop_loss", "trailing_stop"],
      user_level: ["beginner", "intermediate", "advanced"],
    },
  },
} as const
