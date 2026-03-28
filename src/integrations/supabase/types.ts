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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      activity_log: {
        Row: {
          action: string
          actor_id: string | null
          actor_name: string | null
          created_at: string
          id: string
          project_id: string | null
          type: string
          workspace_id: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          actor_name?: string | null
          created_at?: string
          id?: string
          project_id?: string | null
          type?: string
          workspace_id: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          actor_name?: string | null
          created_at?: string
          id?: string
          project_id?: string | null
          type?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_log_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_log_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          author_id: string | null
          author_name: string | null
          author_type: string
          body: string
          created_at: string
          deliverable_id: string
          id: string
          resolved: boolean | null
          version_number: number
        }
        Insert: {
          author_id?: string | null
          author_name?: string | null
          author_type?: string
          body: string
          created_at?: string
          deliverable_id: string
          id?: string
          resolved?: boolean | null
          version_number: number
        }
        Update: {
          author_id?: string | null
          author_name?: string | null
          author_type?: string
          body?: string
          created_at?: string
          deliverable_id?: string
          id?: string
          resolved?: boolean | null
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "comments_deliverable_id_fkey"
            columns: ["deliverable_id"]
            isOneToOne: false
            referencedRelation: "deliverables"
            referencedColumns: ["id"]
          },
        ]
      }
      deliverable_versions: {
        Row: {
          change_summary: string | null
          created_at: string
          deliverable_id: string
          file_name: string | null
          file_size: number | null
          file_url: string | null
          id: string
          note: string | null
          submitted_by: string | null
          version_number: number
        }
        Insert: {
          change_summary?: string | null
          created_at?: string
          deliverable_id: string
          file_name?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: string
          note?: string | null
          submitted_by?: string | null
          version_number: number
        }
        Update: {
          change_summary?: string | null
          created_at?: string
          deliverable_id?: string
          file_name?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: string
          note?: string | null
          submitted_by?: string | null
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "deliverable_versions_deliverable_id_fkey"
            columns: ["deliverable_id"]
            isOneToOne: false
            referencedRelation: "deliverables"
            referencedColumns: ["id"]
          },
        ]
      }
      deliverables: {
        Row: {
          created_at: string
          current_version: number
          file_name: string
          file_size: number | null
          file_type: string | null
          file_url: string | null
          id: string
          project_id: string
          status: Database["public"]["Enums"]["deliverable_status"]
          title: string
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          current_version?: number
          file_name: string
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          project_id: string
          status?: Database["public"]["Enums"]["deliverable_status"]
          title: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          current_version?: number
          file_name?: string
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          project_id?: string
          status?: Database["public"]["Enums"]["deliverable_status"]
          title?: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deliverables_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      invitations: {
        Row: {
          created_at: string
          email: string
          expires_at: string
          id: string
          invited_by: string
          role: Database["public"]["Enums"]["app_role"]
          status: Database["public"]["Enums"]["invitation_status"]
          token: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          email: string
          expires_at?: string
          id?: string
          invited_by: string
          role?: Database["public"]["Enums"]["app_role"]
          status?: Database["public"]["Enums"]["invitation_status"]
          token?: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          invited_by?: string
          role?: Database["public"]["Enums"]["app_role"]
          status?: Database["public"]["Enums"]["invitation_status"]
          token?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitations_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          archived: boolean | null
          body: string | null
          created_at: string
          deliverable_id: string | null
          id: string
          project_id: string | null
          read: boolean | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          urgency: Database["public"]["Enums"]["notification_urgency"]
          user_id: string
          workspace_id: string | null
        }
        Insert: {
          archived?: boolean | null
          body?: string | null
          created_at?: string
          deliverable_id?: string | null
          id?: string
          project_id?: string | null
          read?: boolean | null
          title: string
          type?: Database["public"]["Enums"]["notification_type"]
          urgency?: Database["public"]["Enums"]["notification_urgency"]
          user_id: string
          workspace_id?: string | null
        }
        Update: {
          archived?: boolean | null
          body?: string | null
          created_at?: string
          deliverable_id?: string | null
          id?: string
          project_id?: string | null
          read?: boolean | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          urgency?: Database["public"]["Enums"]["notification_urgency"]
          user_id?: string
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_deliverable_id_fkey"
            columns: ["deliverable_id"]
            isOneToOne: false
            referencedRelation: "deliverables"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          client_email: string | null
          client_name: string
          created_at: string
          created_by: string | null
          deadline: string | null
          description: string | null
          id: string
          name: string
          project_type: string | null
          status: Database["public"]["Enums"]["project_status"]
          updated_at: string
          workspace_id: string
        }
        Insert: {
          client_email?: string | null
          client_name: string
          created_at?: string
          created_by?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          name: string
          project_type?: string | null
          status?: Database["public"]["Enums"]["project_status"]
          updated_at?: string
          workspace_id: string
        }
        Update: {
          client_email?: string | null
          client_name?: string
          created_at?: string
          created_by?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          name?: string
          project_type?: string | null
          status?: Database["public"]["Enums"]["project_status"]
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_members: {
        Row: {
          id: string
          joined_at: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
          workspace_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
          workspace_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_members_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaces: {
        Row: {
          accent_color: string | null
          agency_name: string | null
          brand_description: string | null
          created_at: string
          id: string
          logo_url: string | null
          name: string
          notify_on_approval: boolean | null
          notify_on_changes_requested: boolean | null
          notify_on_comment: boolean | null
          plan: string
          portal_footer_text: string | null
          portal_help_url: string | null
          portal_success_message: string | null
          portal_welcome_message: string | null
          reminder_cadence_days: number | null
          support_email: string | null
          timezone: string | null
          updated_at: string
        }
        Insert: {
          accent_color?: string | null
          agency_name?: string | null
          brand_description?: string | null
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          notify_on_approval?: boolean | null
          notify_on_changes_requested?: boolean | null
          notify_on_comment?: boolean | null
          plan?: string
          portal_footer_text?: string | null
          portal_help_url?: string | null
          portal_success_message?: string | null
          portal_welcome_message?: string | null
          reminder_cadence_days?: number | null
          support_email?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Update: {
          accent_color?: string | null
          agency_name?: string | null
          brand_description?: string | null
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          notify_on_approval?: boolean | null
          notify_on_changes_requested?: boolean | null
          notify_on_comment?: boolean | null
          plan?: string
          portal_footer_text?: string | null
          portal_help_url?: string | null
          portal_success_message?: string | null
          portal_welcome_message?: string | null
          reminder_cadence_days?: number | null
          support_email?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_workspace_storage_bytes: {
        Args: { _workspace_id: string }
        Returns: number
      }
      get_workspace_usage: {
        Args: { _workspace_id: string }
        Returns: {
          project_count: number
          storage_bytes: number
          team_member_count: number
        }[]
      }
      has_workspace_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
          _workspace_id: string
        }
        Returns: boolean
      }
      is_workspace_admin_or_owner: {
        Args: { _user_id: string; _workspace_id: string }
        Returns: boolean
      }
      is_workspace_member: {
        Args: { _user_id: string; _workspace_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "owner" | "admin" | "member"
      deliverable_status:
        | "draft"
        | "in_review"
        | "changes_requested"
        | "approved"
      invitation_status: "pending" | "accepted" | "expired"
      notification_type:
        | "approval"
        | "comment"
        | "upload"
        | "reminder"
        | "status_change"
        | "invite"
      notification_urgency: "low" | "medium" | "high" | "critical"
      project_status: "draft" | "in_review" | "changes_requested" | "approved"
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
      app_role: ["owner", "admin", "member"],
      deliverable_status: [
        "draft",
        "in_review",
        "changes_requested",
        "approved",
      ],
      invitation_status: ["pending", "accepted", "expired"],
      notification_type: [
        "approval",
        "comment",
        "upload",
        "reminder",
        "status_change",
        "invite",
      ],
      notification_urgency: ["low", "medium", "high", "critical"],
      project_status: ["draft", "in_review", "changes_requested", "approved"],
    },
  },
} as const
