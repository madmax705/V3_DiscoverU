import { supabase } from "../supabase-client";
import { Database } from "../types/database";

export type Club = Database['public']['Tables']['Club']['Row'];
export type ClubMember = Database['public']['Tables']['ClubMember']['Row'];
export type ClubEvent = Database['public']['Tables']['ClubEvent']['Row'];
export type ClubRating = Database['public']['Tables']['ClubRating']['Row'];

export async function getClubs(): Promise<Club[]> {
  const { data, error } = await supabase.from('Club').select(
    'id, name, description, category, image_url, logo_url, meeting_times, location, advisor, member_count, created_at, slug, mission'
  );

  if (error) {
    console.error('Error fetching clubs:', error);
    throw new Error('Could not fetch clubs');
  }

  return data || [];
}

export async function getClubBySlug(slug: string): Promise<Club | null> {
  const { data, error } = await supabase
    .from('Club')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching club with slug ${slug}:`, error);
    return null;
  }
  return data;
}

export async function getClubMembers(clubId: number): Promise<ClubMember[]> {
  const { data, error } = await supabase
    .from('ClubMember')
    .select('*')
    .eq('club_id', clubId);

  if (error) {
    console.error(`Error fetching members for club ${clubId}:`, error);
    return [];
  }
  return data || [];
}

export async function getClubEvents(clubId: number): Promise<ClubEvent[]> {
  const { data, error } = await supabase
    .from('ClubEvent')
    .select('*')
    .eq('club_id', clubId);

  if (error) {
    console.error(`Error fetching events for club ${clubId}:`, error);
    return [];
  }
  return data || [];
}

export async function fetchClubById(id: number | string): Promise<Club | null> {
  try {
    const { data, error } = await supabase
      .from("Club")
      .select("*")
      .eq("id", typeof id === 'string' ? Number(id) : id)
      .single();

    if (error) {
      console.error(`Error fetching club with id ${id}:`, error);
      return null;
    }

    return data;
  } catch (error) {
    console.error(`Error in fetchClubById for id ${id}:`, error);
    return null;
  }
}

export async function fetchClubsByCategory(
  category: string,
): Promise<Club[]> {
  try {
    const { data, error } = await supabase
      .from("Club")
      .select("*")
      .eq("category", category);

    if (error) {
      console.error(`Error fetching clubs with category ${category}:`, error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error(
      `Error in fetchClubsByCategory for category ${category}:`,
      error,
    );
    return [];
  }
}

// Bookmark functions
export async function fetchUserBookmarks(userId: string): Promise<string[]> {
  try {
    // Check if Supabase is properly configured
    if (
      !import.meta.env.VITE_SUPABASE_URL ||
      !import.meta.env.VITE_SUPABASE_ANON_KEY
    ) {
      console.warn("Supabase not configured, returning empty bookmarks array");
      return [];
    }

    const { data, error } = await supabase
      .from("bookmarks")
      .select("club_id")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching user bookmarks:", error);
      return [];
    }

    return data?.map((bookmark) => bookmark.club_id) || [];
  } catch (error) {
    console.error("Error in fetchUserBookmarks:", error);
    return [];
  }
}

export async function addBookmark(
  userId: string,
  clubId: string,
): Promise<boolean> {
  try {
    // Check if Supabase is properly configured
    if (
      !import.meta.env.VITE_SUPABASE_URL ||
      !import.meta.env.VITE_SUPABASE_ANON_KEY
    ) {
      console.warn(
        "Supabase not configured, bookmark will only be stored locally",
      );
      return true; // Return true to allow local storage to work
    }

    const { error } = await supabase
      .from("bookmarks")
      .insert({ user_id: userId, club_id: clubId });

    if (error) {
      console.error("Error adding bookmark:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in addBookmark:", error);
    return false;
  }
}

export async function removeBookmark(
  userId: string,
  clubId: string,
): Promise<boolean> {
  try {
    // Check if Supabase is properly configured
    if (
      !import.meta.env.VITE_SUPABASE_URL ||
      !import.meta.env.VITE_SUPABASE_ANON_KEY
    ) {
      console.warn(
        "Supabase not configured, bookmark will only be removed locally",
      );
      return true; // Return true to allow local storage to work
    }

    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("user_id", userId)
      .eq("club_id", clubId);

    if (error) {
      console.error("Error removing bookmark:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in removeBookmark:", error);
    return false;
  }
}

// User profile functions
export async function fetchUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching user profile:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in fetchUserProfile:", error);
    return null;
  }
}

export async function updateUserProfile(userId: string, profileData: any) {
  try {
    const { data, error } = await supabase
      .from("user")
      .upsert({ id: userId, ...profileData })
      .select()
      .single();

    if (error) {
      console.error("Error updating user profile:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    return { success: false, error };
  }
}

export async function fetchUserClubMemberships(userId: string) {
  try {
    const { data, error } = await supabase
      .from("ClubMember")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching user club memberships:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in fetchUserClubMemberships:", error);
    return [];
  }
}

// Notification functions
export async function fetchUserNotifications(userId: string) {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Error fetching notifications:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in fetchUserNotifications:", error);
    return [];
  }
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    const { error } = await supabase
      .from("notifications")
      .update({ read: true, read_at: new Date().toISOString() })
      .eq("id", notificationId);

    if (error) {
      console.error("Error marking notification as read:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in markNotificationAsRead:", error);
    return false;
  }
}

export async function markAllNotificationsAsRead(userId: string) {
  try {
    const { error } = await supabase
      .from("notifications")
      .update({ read: true, read_at: new Date().toISOString() })
      .eq("user_id", userId)
      .eq("read", false);

    if (error) {
      console.error("Error marking all notifications as read:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in markAllNotificationsAsRead:", error);
    return false;
  }
}

export async function createNotification(notification: {
  user_id: string;
  title: string;
  message: string;
  type: string;
  club_id?: string;
  event_id?: string;
  action_url?: string;
}) {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .insert({
        ...notification,
        created_at: new Date().toISOString(),
        read: false,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating notification:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in createNotification:", error);
    return null;
  }
}

export async function fetchUserNotificationPreferences(userId: string) {
  try {
    const { data, error } = await supabase
      .from("notification_preferences")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching notification preferences:", error);
      return null;
    }

    // Return default preferences if none exist
    if (!data) {
      return {
        user_id: userId,
        event_reminders: true,
        club_updates: true,
        new_events: true,
        reminder_timing: "1_day", // 1 day before event
        email_notifications: false,
        push_notifications: true,
      };
    }

    return data;
  } catch (error) {
    console.error("Error in fetchUserNotificationPreferences:", error);
    return null;
  }
}

export async function updateUserNotificationPreferences(
  userId: string,
  preferences: any,
) {
  try {
    const { data, error } = await supabase
      .from("notification_preferences")
      .upsert({ user_id: userId, ...preferences })
      .select()
      .single();

    if (error) {
      console.error("Error updating notification preferences:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error in updateUserNotificationPreferences:", error);
    return { success: false, error };
  }
}

export async function deleteNotification(notificationId: string) {
  try {
    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", notificationId);

    if (error) {
      console.error("Error deleting notification:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in deleteNotification:", error);
    return false;
  }
}

// Club membership functions
export async function checkClubMembership(
  userId: string,
  clubId: number,
): Promise<{ isMember: boolean; membership?: any }> {
  try {
    const { data, error } = await supabase
      .from("ClubMember")
      .select("*")
      .eq("user_id", userId)
      .eq("club_id", clubId)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error checking club membership:", error);
      return { isMember: false };
    }

    return { isMember: !!data, membership: data };
  } catch (error) {
    console.error("Error in checkClubMembership:", error);
    return { isMember: false };
  }
}

export async function addClubMembership(
  userId: string,
  clubId: number,
): Promise<{ success: boolean; error?: any; data?: any }> {
  try {
    // First check if user is already a member
    const { isMember } = await checkClubMembership(userId, clubId);
    if (isMember) {
      return {
        success: false,
        error: { message: "You are already a member of this club" },
      };
    }

    const { data, error } = await supabase
      .from("ClubMember")
      .insert({
        user_id: userId,
        club_id: clubId,
        status: "active",
        joined_at: new Date().toISOString(),
        role: "member",
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding club membership:", error);
      return { success: false, error };
    }

    // Create a welcome notification
    await createNotification({
      user_id: userId,
      title: "Welcome to the club!",
      message: `You have successfully joined the club. Welcome aboard!`,
      type: "club_update",
      club_id: clubId.toString(),
      action_url: `/club/${clubId}`,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Error in addClubMembership:", error);
    return { success: false, error };
  }
}

export async function removeClubMembership(
  userId: string,
  clubId: number,
): Promise<{ success: boolean; error?: any }> {
  try {
    const { error } = await supabase
      .from("ClubMember")
      .delete()
      .eq("user_id", userId)
      .eq("club_id", clubId);

    if (error) {
      console.error("Error removing club membership:", error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error("Error in removeClubMembership:", error);
    return { success: false, error };
  }
}

// Function to generate notifications for upcoming events
export async function generateEventNotifications() {
  try {
    // This would typically be called by a scheduled job
    // For now, we'll create a function that can be called manually

    // Get all users with their bookmarks and memberships
    const { data: users, error: usersError } = await supabase
      .from("profile")
      .select("id");

    if (usersError) {
      console.error("Error fetching users for notifications:", usersError);
      return false;
    }

    // For each user, check their notification preferences and create notifications
    for (const user of users || []) {
      const preferences = await fetchUserNotificationPreferences(user.id);

      if (!preferences?.event_reminders) continue;

      // Get user's bookmarked clubs
      const bookmarks = await fetchUserBookmarks(user.id);

      // Get user's club memberships
      const memberships = await fetchUserClubMemberships(user.id);
      const membershipClubIds = memberships.map((m) => m.club_id);

      // Combine bookmarked and membership clubs
      const relevantClubIds = [
        ...new Set([...bookmarks, ...membershipClubIds]),
      ];

      // For each relevant club, check for upcoming events
      // This is a simplified version - in a real app, you'd have an events table
      for (const clubId of relevantClubIds) {
        // Create sample notifications for demonstration
        const notification = {
          user_id: user.id,
          title: "Upcoming Club Event",
          message: `Don't forget about the upcoming event for your club!`,
          type: "event_reminder",
          club_id: clubId.toString(),
          action_url: `/club/${clubId}`,
        };

        await createNotification(notification);
      }
    }

    return true;
  } catch (error) {
    console.error("Error in generateEventNotifications:", error);
    return false;
  }
}

// Helper to join a club, handles duplicate gracefully
export async function joinClub(userId: string, clubId: number): Promise<{ success: boolean; error?: any; data?: any }> {
  try {
    // Check if already a member
    const { data: existing, error: checkError } = await supabase
      .from("ClubMember")
      .select("*")
      .eq("user_id", userId)
      .eq("club_id", clubId)
      .maybeSingle();
    if (existing) {
      return { success: false, error: { message: "Already a member" }, data: existing };
    }
    const { data, error } = await supabase
      .from("ClubMember")
      .insert({
        user_id: userId,
        club_id: clubId,
        role: "member",
        status: "active",
        created_at: new Date().toISOString(),
      })
      .select()
      .single();
    if (error) {
      return { success: false, error };
    }
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}

// Club Rating functions
export async function getUserRating(userId: string, clubId: number): Promise<number | null> {
  try {
    const { data, error } = await supabase
      .from('ClubRating')
      .select('rating')
      .eq('user_id', userId)
      .eq('club_id', clubId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rating found
        return null;
      }
      console.error('Error fetching user rating:', error);
      return null;
    }

    return data?.rating || null;
  } catch (error) {
    console.error('Error in getUserRating:', error);
    return null;
  }
}

export async function setClubRating(
  userId: string,
  clubId: number,
  rating: number
): Promise<{ success: boolean; error?: any; data?: any }> {
  try {
    // Check if user has already rated this club
    const { data: existingRating } = await supabase
      .from('ClubRating')
      .select('id')
      .eq('user_id', userId)
      .eq('club_id', clubId)
      .single();

    if (existingRating) {
      // Update existing rating
      const { data, error } = await supabase
        .from('ClubRating')
        .update({
          rating,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('club_id', clubId)
        .select()
        .single();

      if (error) {
        console.error('Error updating club rating:', error);
        return { success: false, error };
      }

      return { success: true, data };
    } else {
      // Insert new rating
      const { data, error } = await supabase
        .from('ClubRating')
        .insert({
          user_id: userId,
          club_id: clubId,
          rating,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating club rating:', error);
        return { success: false, error };
      }

      return { success: true, data };
    }
  } catch (error) {
    console.error('Error in setClubRating:', error);
    return { success: false, error };
  }
}

export async function getClubAverageRating(clubId: number): Promise<{ average: number; count: number }> {
  try {
    const { data, error } = await supabase
      .from('ClubRating')
      .select('rating')
      .eq('club_id', clubId);

    if (error) {
      console.error('Error fetching club ratings:', error);
      return { average: 0, count: 0 };
    }

    if (!data || data.length === 0) {
      return { average: 0, count: 0 };
    }

    const totalRating = data.reduce((sum, item) => sum + item.rating, 0);
    const average = totalRating / data.length;

    return { average, count: data.length };
  } catch (error) {
    console.error('Error in getClubAverageRating:', error);
    return { average: 0, count: 0 };
  }
}

export async function getClubRatingStats(clubId: number): Promise<{
  average: number;
  count: number;
  distribution: { [key: number]: number };
}> {
  try {
    const { data, error } = await supabase
      .from('ClubRating')
      .select('rating')
      .eq('club_id', clubId);

    if (error) {
      console.error('Error fetching club rating stats:', error);
      return { average: 0, count: 0, distribution: {} };
    }

    if (!data || data.length === 0) {
      return { average: 0, count: 0, distribution: {} };
    }

    const totalRating = data.reduce((sum, item) => sum + item.rating, 0);
    const average = totalRating / data.length;
    const count = data.length;

    // Calculate rating distribution
    const distribution: { [key: number]: number } = {};
    for (let i = 1; i <= 5; i++) {
      distribution[i] = data.filter(item => item.rating === i).length;
    }

    return { average, count, distribution };
  } catch (error) {
    console.error('Error in getClubRatingStats:', error);
    return { average: 0, count: 0, distribution: {} };
  }
}
