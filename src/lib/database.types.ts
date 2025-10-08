export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      catalog_items: {
        Row: {
          catalog_id: string | null
          date: string | null
          document_link: string | null
          fodler: string | null
          id: string
          number: number | null
          redirect_link: string | null
          title: string | null
        }
        Insert: {
          catalog_id?: string | null
          date?: string | null
          document_link?: string | null
          fodler?: string | null
          id?: string
          number?: number | null
          redirect_link?: string | null
          title?: string | null
        }
        Update: {
          catalog_id?: string | null
          date?: string | null
          document_link?: string | null
          fodler?: string | null
          id?: string
          number?: number | null
          redirect_link?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "section_catalog_id_fkey"
            columns: ["catalog_id"]
            isOneToOne: false
            referencedRelation: "catalogs"
            referencedColumns: ["id"]
          },
        ]
      }
      catalogs: {
        Row: {
          category: string | null
          id: string
          route_name: string | null
          title: string | null
        }
        Insert: {
          category?: string | null
          id?: string
          route_name?: string | null
          title?: string | null
        }
        Update: {
          category?: string | null
          id?: string
          route_name?: string | null
          title?: string | null
        }
        Relationships: []
      }
      commissions: {
        Row: {
          convocation: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          convocation?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          convocation?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "commissions_convocation_fkey"
            columns: ["convocation"]
            isOneToOne: false
            referencedRelation: "convocations"
            referencedColumns: ["id"]
          },
        ]
      }
      commissions_members: {
        Row: {
          commission: string
          deputy: string
          id: number
        }
        Insert: {
          commission?: string
          deputy?: string
          id?: number
        }
        Update: {
          commission?: string
          deputy?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "commissions_members_commission_fkey"
            columns: ["commission"]
            isOneToOne: false
            referencedRelation: "commissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_members_deputy_fkey"
            columns: ["deputy"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      constituencies: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      convocations: {
        Row: {
          dessolution_date: string | null
          election_date: string | null
          id: string
          name: string | null
          number: number
        }
        Insert: {
          dessolution_date?: string | null
          election_date?: string | null
          id?: string
          name?: string | null
          number: number
        }
        Update: {
          dessolution_date?: string | null
          election_date?: string | null
          id?: string
          name?: string | null
          number?: number
        }
        Relationships: []
      }
      documents: {
        Row: {
          author: string | null
          catalog_item_id: string | null
          category: string | null
          event_id: string | null
          file_path: string | null
          id: string
          name: string | null
          title: string | null
          type: Database["public"]["Enums"]["document_type"] | null
        }
        Insert: {
          author?: string | null
          catalog_item_id?: string | null
          category?: string | null
          event_id?: string | null
          file_path?: string | null
          id?: string
          name?: string | null
          title?: string | null
          type?: Database["public"]["Enums"]["document_type"] | null
        }
        Update: {
          author?: string | null
          catalog_item_id?: string | null
          category?: string | null
          event_id?: string | null
          file_path?: string | null
          id?: string
          name?: string | null
          title?: string | null
          type?: Database["public"]["Enums"]["document_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "documents_catalog_item_id_fkey"
            columns: ["catalog_item_id"]
            isOneToOne: false
            referencedRelation: "catalog_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_participants: {
        Row: {
          event_id: string
          participant_id: string
          visit: boolean | null
        }
        Insert: {
          event_id: string
          participant_id: string
          visit?: boolean | null
        }
        Update: {
          event_id?: string
          participant_id?: string
          visit?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "event participants_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      events: {
        Row: {
          description: string
          end_time: string | null
          id: string
          start_time: string | null
          title: string | null
          type: Database["public"]["Enums"]["event_type"]
          venue: string | null
        }
        Insert: {
          description: string
          end_time?: string | null
          id?: string
          start_time?: string | null
          title?: string | null
          type: Database["public"]["Enums"]["event_type"]
          venue?: string | null
        }
        Update: {
          description?: string
          end_time?: string | null
          id?: string
          start_time?: string | null
          title?: string | null
          type?: Database["public"]["Enums"]["event_type"]
          venue?: string | null
        }
        Relationships: []
      }
      fractions: {
        Row: {
          created_at: string
          full_name: string | null
          id: number
          image_path: string | null
          short_name: string | null
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id?: number
          image_path?: string | null
          short_name?: string | null
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: number
          image_path?: string | null
          short_name?: string | null
        }
        Relationships: []
      }
      news: {
        Row: {
          content: string | null
          created_at: string
          external_url: string | null
          fraction_id: number | null
          id: number
          title: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          external_url?: string | null
          fraction_id?: number | null
          id?: number
          title: string
        }
        Update: {
          content?: string | null
          created_at?: string
          external_url?: string | null
          fraction_id?: number | null
          id?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_fraction_id_fkey"
            columns: ["fraction_id"]
            isOneToOne: false
            referencedRelation: "fractions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          constituency_id: number | null
          constituency_name: string | null
          convocation_id: string | null
          deputy_id: string | null
          fraction_id: number | null
          fraction_short_name: string | null
          name: string
          photo_path: string | null
          role: Database["public"]["Enums"]["role"] | null
          role_name: string | null
          search_vector: unknown | null
          user_email: string | null
          user_id: string
          user_phone: string | null
        }
        Insert: {
          constituency_id?: number | null
          constituency_name?: string | null
          convocation_id?: string | null
          deputy_id?: string | null
          fraction_id?: number | null
          fraction_short_name?: string | null
          name: string
          photo_path?: string | null
          role?: Database["public"]["Enums"]["role"] | null
          role_name?: string | null
          search_vector?: unknown | null
          user_email?: string | null
          user_id: string
          user_phone?: string | null
        }
        Update: {
          constituency_id?: number | null
          constituency_name?: string | null
          convocation_id?: string | null
          deputy_id?: string | null
          fraction_id?: number | null
          fraction_short_name?: string | null
          name?: string
          photo_path?: string | null
          role?: Database["public"]["Enums"]["role"] | null
          role_name?: string | null
          search_vector?: unknown | null
          user_email?: string | null
          user_id?: string
          user_phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_constituency_fkey"
            columns: ["constituency_id"]
            isOneToOne: false
            referencedRelation: "constituencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_convocation_id_fkey"
            columns: ["convocation_id"]
            isOneToOne: false
            referencedRelation: "convocations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_deputy_id_fkey"
            columns: ["deputy_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "profiles_fraction_id_fkey"
            columns: ["fraction_id"]
            isOneToOne: false
            referencedRelation: "fractions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      catalog_items_by_route_name: {
        Args: { p_route_name: string }
        Returns: {
          catalog_id: string | null
          date: string | null
          document_link: string | null
          fodler: string | null
          id: string
          number: number | null
          redirect_link: string | null
          title: string | null
        }[]
      }
      events_by_date: {
        Args: Record<PropertyKey, never>
        Returns: {
          event_count: number
          event_date: string
        }[]
      }
      get_catalogs_grouped_by_category: {
        Args: Record<PropertyKey, never>
        Returns: {
          catalogs: Json
          category: string
        }[]
      }
      search_catalogs: {
        Args: { prefix: string }
        Returns: {
          category: string | null
          id: string
          route_name: string | null
          title: string | null
        }[]
      }
      search_profiles: {
        Args: { prefix: string }
        Returns: {
          constituency_id: number | null
          constituency_name: string | null
          convocation_id: string | null
          deputy_id: string | null
          fraction_id: number | null
          fraction_short_name: string | null
          name: string
          photo_path: string | null
          role: Database["public"]["Enums"]["role"] | null
          role_name: string | null
          search_vector: unknown | null
          user_email: string | null
          user_id: string
          user_phone: string | null
        }[]
      }
    }
    Enums: {
      document_type: "executive_order" | "ordinance" | "agenda" | "act" | "bill"
      event_type: "global" | "individual"
      role: "deputy" | "assistant" | "municipal"
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      document_type: ["executive_order", "ordinance", "agenda", "act", "bill"],
      event_type: ["global", "individual"],
      role: ["deputy", "assistant", "municipal"],
    },
  },
} as const

