import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  fetchUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  fetchUserNotificationPreferences,
  updateUserNotificationPreferences,
} from "../lib/supabase-client";

interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  club_id?: string;
  event_id?: string;
  action_url?: string;
  read: boolean;
  read_at?: string;
  created_at: string;
}

interface NotificationPreferences {
  user_id: string;
  event_reminders: boolean;
  club_updates: boolean;
  new_events: boolean;
  reminder_timing: string;
  email_notifications: boolean;
  push_notifications: boolean;
}

type NotificationContextType = {
  notifications: Notification[];
  unreadCount: number;
  preferences: NotificationPreferences | null;
  loading: boolean;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (notificationId: string) => Promise<void>;
  updatePreferences: (
    preferences: Partial<NotificationPreferences>,
  ) => Promise<void>;
  refreshNotifications: () => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [preferences, setPreferences] =
    useState<NotificationPreferences | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Load notifications and preferences when user changes
  useEffect(() => {
    if (user) {
      loadNotifications();
      loadPreferences();
    } else {
      setNotifications([]);
      setPreferences(null);
    }
  }, [user]);

  const loadNotifications = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const data = await fetchUserNotifications(user.id);
      setNotifications(data);
    } catch (error) {
      console.error("Error loading notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadPreferences = async () => {
    if (!user) return;

    try {
      const data = await fetchUserNotificationPreferences(user.id);
      setPreferences(data);
    } catch (error) {
      console.error("Error loading notification preferences:", error);
    }
  };

  const markAsRead = async (notificationId: string) => {
    const success = await markNotificationAsRead(notificationId);
    if (success) {
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId
            ? { ...n, read: true, read_at: new Date().toISOString() }
            : n,
        ),
      );
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;

    const success = await markAllNotificationsAsRead(user.id);
    if (success) {
      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          read: true,
          read_at: new Date().toISOString(),
        })),
      );
    }
  };

  const handleDeleteNotification = async (notificationId: string) => {
    const success = await deleteNotification(notificationId);
    if (success) {
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    }
  };

  const updatePreferences = async (
    newPreferences: Partial<NotificationPreferences>,
  ) => {
    if (!user) return;

    const result = await updateUserNotificationPreferences(
      user.id,
      newPreferences,
    );
    if (result.success) {
      setPreferences(result.data);
    }
  };

  const refreshNotifications = async () => {
    await loadNotifications();
  };

  const value = {
    notifications,
    unreadCount,
    preferences,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification: handleDeleteNotification,
    updatePreferences,
    refreshNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
}
