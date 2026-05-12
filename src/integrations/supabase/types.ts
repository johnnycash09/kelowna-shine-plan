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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      booking_addons: {
        Row: {
          addon_key: string
          addon_label: string
          booking_id: string
          created_at: string
          id: string
          price: number
        }
        Insert: {
          addon_key: string
          addon_label: string
          booking_id: string
          created_at?: string
          id?: string
          price: number
        }
        Update: {
          addon_key?: string
          addon_label?: string
          booking_id?: string
          created_at?: string
          id?: string
          price?: number
        }
        Relationships: [
          {
            foreignKeyName: "booking_addons_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          address: string | null
          base_price: number
          condition: string
          condition_modifier: number
          created_at: string
          deposit_amount: number
          email: string
          estimated_total: number
          first_name: string
          id: string
          internal_notes: string | null
          last_name: string
          notes: string | null
          package_name: string
          package_slug: string
          phone: string
          preferred_date: string | null
          service_mode: string | null
          size_modifier: number
          status: Database["public"]["Enums"]["booking_status"]
          stripe_session_id: string | null
          time_window: string | null
          updated_at: string
          vehicle_make: string | null
          vehicle_model: string | null
          vehicle_size: string
          vehicle_year: string | null
        }
        Insert: {
          address?: string | null
          base_price: number
          condition: string
          condition_modifier?: number
          created_at?: string
          deposit_amount: number
          email: string
          estimated_total: number
          first_name: string
          id?: string
          internal_notes?: string | null
          last_name: string
          notes?: string | null
          package_name: string
          package_slug: string
          phone: string
          preferred_date?: string | null
          service_mode?: string | null
          size_modifier?: number
          status?: Database["public"]["Enums"]["booking_status"]
          stripe_session_id?: string | null
          time_window?: string | null
          updated_at?: string
          vehicle_make?: string | null
          vehicle_model?: string | null
          vehicle_size: string
          vehicle_year?: string | null
        }
        Update: {
          address?: string | null
          base_price?: number
          condition?: string
          condition_modifier?: number
          created_at?: string
          deposit_amount?: number
          email?: string
          estimated_total?: number
          first_name?: string
          id?: string
          internal_notes?: string | null
          last_name?: string
          notes?: string | null
          package_name?: string
          package_slug?: string
          phone?: string
          preferred_date?: string | null
          service_mode?: string | null
          size_modifier?: number
          status?: Database["public"]["Enums"]["booking_status"]
          stripe_session_id?: string | null
          time_window?: string | null
          updated_at?: string
          vehicle_make?: string | null
          vehicle_model?: string | null
          vehicle_size?: string
          vehicle_year?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          booking_id: string | null
          created_at: string
          currency: string
          id: string
          raw: Json | null
          status: string
          stripe_payment_intent: string | null
          stripe_session_id: string | null
        }
        Insert: {
          amount: number
          booking_id?: string | null
          created_at?: string
          currency?: string
          id?: string
          raw?: Json | null
          status: string
          stripe_payment_intent?: string | null
          stripe_session_id?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string | null
          created_at?: string
          currency?: string
          id?: string
          raw?: Json | null
          status?: string
          stripe_payment_intent?: string | null
          stripe_session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_requests: {
        Row: {
          asset_type: string | null
          created_at: string
          email: string
          id: string
          internal_notes: string | null
          length_ft: string | null
          main_goal: string | null
          name: string
          notes: string | null
          phone: string
          photo_urls: string[]
          service_needed: string
          status: Database["public"]["Enums"]["quote_status"]
          timeline: string | null
          updated_at: string
          vehicle_make: string | null
          vehicle_model: string | null
          vehicle_year: string | null
        }
        Insert: {
          asset_type?: string | null
          created_at?: string
          email: string
          id?: string
          internal_notes?: string | null
          length_ft?: string | null
          main_goal?: string | null
          name: string
          notes?: string | null
          phone: string
          photo_urls?: string[]
          service_needed: string
          status?: Database["public"]["Enums"]["quote_status"]
          timeline?: string | null
          updated_at?: string
          vehicle_make?: string | null
          vehicle_model?: string | null
          vehicle_year?: string | null
        }
        Update: {
          asset_type?: string | null
          created_at?: string
          email?: string
          id?: string
          internal_notes?: string | null
          length_ft?: string | null
          main_goal?: string | null
          name?: string
          notes?: string | null
          phone?: string
          photo_urls?: string[]
          service_needed?: string
          status?: Database["public"]["Enums"]["quote_status"]
          timeline?: string | null
          updated_at?: string
          vehicle_make?: string | null
          vehicle_model?: string | null
          vehicle_year?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      booking_status:
        | "New Booking"
        | "Deposit Paid"
        | "Pending Confirmation"
        | "Confirmed"
        | "Completed"
        | "Cancelled"
      quote_status:
        | "New Request"
        | "Needs Review"
        | "Quote Sent"
        | "Accepted"
        | "Declined"
        | "Completed"
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
      app_role: ["admin", "user"],
      booking_status: [
        "New Booking",
        "Deposit Paid",
        "Pending Confirmation",
        "Confirmed",
        "Completed",
        "Cancelled",
      ],
      quote_status: [
        "New Request",
        "Needs Review",
        "Quote Sent",
        "Accepted",
        "Declined",
        "Completed",
      ],
    },
  },
} as const
