import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useBookmarks } from "../hooks/useBookmarks";
import { allClubsData } from "../data/clubsData";
import { getClubEvents, ClubEvent, fetchClubById, ClubMember, fetchUserProfile, updateUserProfile, fetchUserClubMemberships } from "../lib/supabase-client";
import { supabase } from "../supabase-client";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FeaturedClubCard from "./FeaturedClubCard";
import ClubOverviewBar from "./ClubOverviewBar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import NotificationSettings from "./NotificationSettings";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  User,
  Edit3,
  Bookmark,
  Users,
  Calendar,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Save,
  LogOut,
  Settings as SettingsIcon,
  CheckCircle,
  Search,
  User as UserIcon,
  Trash2,
  ExternalLink
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import BouncingDotsLoader from "./BouncingDotsLoader";
import PulseLoader from "./PulseLoader";
import { useUserMemberships } from '../hooks/useUserMemberships';

interface UserProfileData {
  id: string;
  full_name?: string;
  bio?: string;
  phone?: string;
  location?: string;
  school_year?: string;
  interests?: string[];
  avatar_url?: string;
  grade?: string;
}

function formatJoinDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'long' });
  // If over a year ago, show 'a year ago', else show 'Month Year'
  if (diff > 31536000000) return 'a year ago';
  if (diff > 2592000000) return `${month} ${year}`;
  return 'recently';
}

function formatLastSeen(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  if (diff < 86400000) return 'in the past day';
  if (diff < 604800000) return 'this week';
  if (diff < 2592000000) return 'this month';
  return 'a while ago';
}

const UserProfile = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { bookmarkedClubs, toggleBookmark } = useBookmarks();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const { data: memberships = [], mutate: refreshMemberships } = useUserMemberships(user?.id);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<Partial<UserProfileData>>({});
  const [saving, setSaving] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [selectedSection, setSelectedSection] = useState<'overview' | 'clubs' | 'events' | 'bookmarks' | 'settings'>('overview');
  const [clubEvents, setClubEvents] = useState<Record<string, ClubEvent[]>>({});
  const [bookmarkedClubsData, setBookmarkedClubsData] = useState<any[]>([]);
  const [bookmarksLoading, setBookmarksLoading] = useState(false);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Use SWR for memberships
  const membershipClubsData = memberships
    .filter((membership) => allClubsData[membership.club_id])
    .map((membership) => ({
      ...allClubsData[membership.club_id],
      membership,
    }));

  // Fetch bookmarked clubs data
  useEffect(() => {
    const fetchBookmarkedClubs = async () => {
      const bookmarkedClubIds = Object.keys(bookmarkedClubs).filter(
        (id) => bookmarkedClubs[id],
      );

      if (bookmarkedClubIds.length === 0) {
        setBookmarkedClubsData([]);
        return;
      }

      setBookmarksLoading(true);
      try {
        const clubs = await Promise.all(
          bookmarkedClubIds.map((id) => fetchClubById(Number(id)))
        );
        setBookmarkedClubsData(clubs.filter(Boolean));
      } catch (error) {
        console.error("Error fetching bookmarked clubs:", error);
        setBookmarkedClubsData([]);
      } finally {
        setBookmarksLoading(false);
      }
    };

    fetchBookmarkedClubs();
  }, [bookmarkedClubs]);

  useEffect(() => {
    // Don't redirect while auth is still loading
    if (authLoading) return;

    // Only redirect if we're sure there's no user
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }

    const loadUserData = async () => {
      if (!user) return; // Extra safety check

      setLoading(true);
      try {
        // Load user profile
        const profileData = await fetchUserProfile(user.id);
        if (profileData) {
          setProfile(profileData);
          setEditForm(profileData);
        } else {
          // Create initial profile from auth data
          const initialProfile = {
            id: user.id,
            full_name: user.user_metadata?.full_name || "",
            bio: "",
            phone: "",
            location: "",
            school_year: "",
            interests: [],
          };
          setProfile(initialProfile);
          setEditForm(initialProfile);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadUserData();
    }
  }, [user, navigate, authLoading]);

  // Fetch events for all joined clubs when memberships change
  useEffect(() => {
    const fetchAllClubEvents = async () => {
      const eventsByClub: Record<string, ClubEvent[]> = {};
      for (const club of membershipClubsData) {
        try {
          const clubIdNum = typeof club.id === 'string' ? parseInt(club.id, 10) : club.id;
          const events = await getClubEvents(clubIdNum);
          eventsByClub[club.id] = events;
        } catch (e) {
          eventsByClub[club.id] = [];
        }
      }
      setClubEvents(eventsByClub);
    };
    if (membershipClubsData.length > 0) {
      fetchAllClubEvents();
    }
  }, [membershipClubsData]);

  // Handle avatar file selection
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedAvatarFile(file);
    if (file) {
      setAvatarPreviewUrl(URL.createObjectURL(file));
    } else {
      setAvatarPreviewUrl(null);
    }
  };

  // Helper to get initials
  function getInitials(name: string | undefined) {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }

  // Modified save profile to handle avatar upload
  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    let avatar_url = editForm.avatar_url;
    try {
      // If a new avatar file is selected, upload it
      if (selectedAvatarFile) {
        const fileExt = selectedAvatarFile.name.split('.').pop();
        const fileName = `${user.id}_${Date.now()}.${fileExt}`;
        const { data, error } = await supabase.storage.from('avatars').upload(fileName, selectedAvatarFile, { upsert: true });
        if (error) throw error;
        const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(fileName);
        avatar_url = publicUrlData.publicUrl;
      }
      const result = await updateUserProfile(user.id, { ...editForm, avatar_url });
      if (result.success) {
        setProfile(result.data);
        setEditMode(false); // Always return to display state after successful save
        setSelectedAvatarFile(null);
        setAvatarPreviewUrl(null);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const handleRemoveBookmark = (clubId: string) => {
    toggleBookmark(clubId);
  };

  // Helper for sidebar item
  const sidebarItem = (label: string, icon: React.ReactNode, section: typeof selectedSection) => (
    <li
      className={`flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer ${selectedSection === section ? 'font-semibold text-gray-800 bg-gray-100' : 'text-gray-600 hover:bg-gray-100'}`}
      onClick={() => setSelectedSection(section)}
    >
      {icon} {label}
    </li>
  );

  // Only check for user after we're sure auth has loaded
  if (!authLoading && !user) {
    // Add a fallback: if user is null for more than 2 seconds after authLoading is false, redirect or show message
    const [timeoutReached, setTimeoutReached] = useState(false);
    useEffect(() => {
      if (!authLoading && !user) {
        const timer = setTimeout(() => setTimeoutReached(true), 2000);
        return () => clearTimeout(timer);
      }
    }, [authLoading, user]);
    if (timeoutReached) {
      navigate("/login");
      return null;
    }
    // Show a temporary loading spinner for up to 2 seconds
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <BouncingDotsLoader />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col">
      <Navbar />
      <div className="flex w-full max-w-7xl mx-auto mt-8 gap-8">
        {/* Sidebar */}
        <aside className="w-64 bg-white rounded-2xl shadow-md p-6 flex flex-col">
          <nav className="mb-8">
            <ul className="space-y-2">
              {sidebarItem('Profile', <User className="w-5 h-5" />, 'overview')}
              {sidebarItem('Clubs', <Users className="w-5 h-5" />, 'clubs')}
              {sidebarItem('Bookmarks', <Bookmark className="w-5 h-5" />, 'bookmarks')}
              {sidebarItem('Events', <Calendar className="w-5 h-5" />, 'events')}
              {sidebarItem('Settings', <SettingsIcon className="w-5 h-5" />, 'settings')}
              <li className="flex items-center gap-3 text-gray-600 hover:bg-gray-100 rounded-lg px-3 py-2 cursor-pointer mt-4" onClick={() => setShowLogoutDialog(true)}>
                <LogOut className="w-5 h-5" /> Logout
              </li>
            </ul>
          </nav>
        </aside>
        {/* Main content */}
        <main className="flex-1 flex flex-col gap-6">
          {/* Main content area based on sidebar selection */}
          {selectedSection !== 'settings' ? (
            <>
              {/* Profile Section */}
              <section className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
                {selectedSection === 'overview' && (
                  <>
                    {/* Modern Profile Banner */}
                    <div className="relative w-full bg-white border border-gray-200 flex items-center min-h-[320px] px-20 py-20 overflow-visible">
                      {/* Avatar */}
                      <div
                        className="relative flex-shrink-0 w-56 h-56 rounded-full bg-blue-100 border-4 border-white flex items-center justify-center overflow-hidden shadow-md group cursor-pointer"
                        onClick={() => editMode && fileInputRef.current?.click()}
                        style={{ position: 'relative' }}
                      >
                        {editMode ? (
                          avatarPreviewUrl ? (
                            <img src={avatarPreviewUrl} alt="avatar preview" className="w-full h-full object-cover" />
                          ) : profile?.avatar_url ? (
                            <img src={profile.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-7xl font-bold text-blue-600">{getInitials(profile?.full_name || user?.user_metadata?.full_name)}</span>
                          )
                        ) : profile?.avatar_url ? (
                          <img src={profile.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-7xl font-bold text-blue-600">{getInitials(profile?.full_name || user?.user_metadata?.full_name)}</span>
                        )}
                        {/* Overlay for edit mode */}
                        {editMode && (
                          <>
                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <button
                                type="button"
                                className="px-4 py-1 rounded-full border border-white bg-black/40 text-white font-bold text-base shadow-lg hover:bg-black/60 focus:outline-none"
                                onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}
                              >
                                Edit photo
                              </button>
                            </div>
                          </>
                        )}
                        {/* Hidden file input */}
                        {editMode && (
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                          />
                        )}
                      </div>
                      {/* Info */}
                      <div className="ml-24 flex-1 flex flex-col justify-center">
                        {/* Identity group - handle, name, bio */}
                        <div className="mb-8">
                          <div className="flex flex-col items-start gap-0">
                            <span className="text-gray-400 text-lg font-mono">
                              @{user?.email?.split("@")?.[0]}
                            </span>
                            <div className="flex items-center gap-2 mb-1">
                              {editMode ? (
                                <input
                                  className="text-4xl font-extrabold text-gray-900 leading-tight bg-white border-2 border-black rounded-md focus:outline-none focus:border-blue-500 transition w-auto px-2 py-1 shadow-sm"
                                  type="text"
                                  value={editForm.full_name ?? ''}
                                  onChange={e => setEditForm(f => ({ ...f, full_name: e.target.value }))}
                                  style={{ minWidth: '120px' }}
                                />
                              ) : (
                                <span className="text-4xl font-extrabold text-gray-900 leading-tight">
                                  {profile?.full_name || user?.user_metadata?.full_name || "User"}
                                </span>
                              )}
                            </div>
                            <div className="text-base text-gray-600 font-medium w-full mt-0">
                              {editMode ? (
                                <textarea
                                  className="w-full border-2 border-black rounded-md bg-white text-base text-gray-600 font-medium resize-none focus:outline-none focus:border-blue-500 p-2 shadow-sm min-h-[1.5em]"
                                  rows={2}
                                  value={editForm.bio ?? ''}
                                  onChange={e => setEditForm(f => ({ ...f, bio: e.target.value }))}
                                  placeholder="Add a short bio about yourself."
                                />
                              ) : (
                                profile?.bio || "Add a short bio about yourself."
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Activity and Stats group - joined/seen and clubs */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-gray-700 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {user?.created_at ? `Joined ${formatJoinDate(user.created_at)}` : 'Joined recently'}
                              {user?.last_sign_in_at ? ` · last seen ${formatLastSeen(user.last_sign_in_at)}` : ''}
                            </span>
                          </div>
                          <div className="flex gap-10 text-gray-700 text-base">
                            <span><b>{membershipClubsData.length}</b> Clubs Joined</span>
                            <span><b>{membershipClubsData.filter(c => c.membership?.role === 'leader').length}</b> Clubs Led</span>
                          </div>
                        </div>

                        {/* Save/Cancel buttons in edit mode */}
                        {editMode && (
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" type="button" onClick={handleSaveProfile} disabled={saving}>
                              {saving ? 'Saving...' : 'Save'}
                            </Button>
                            <Button size="sm" type="button" variant="outline" onClick={() => { setEditMode(false); setEditForm(profile ?? {}); }}>
                              Cancel
                            </Button>
                          </div>
                        )}
                      </div>
                      {/* Floating Edit Button */}
                      {!editMode && (
                        <button
                          className="absolute top-8 right-8 bg-white border border-gray-300 rounded-full p-3 shadow hover:bg-gray-100 transition"
                          onClick={() => setEditMode(true)}
                          title="Edit Profile"
                        >
                          <Edit3 className="w-6 h-6 text-gray-600" />
                        </button>
                      )}
                    </div>
                  </>
                )}
              </section>

              {/* Section content */}
              <section className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="px-12">
                  {selectedSection === 'clubs' && (
                    <>
                      <div className="pt-8 pb-4">
                        <ClubOverviewBar userName={profile?.full_name || user?.user_metadata?.full_name} />
                      </div>
                      <div className="py-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Clubs</h2>
                        {membershipClubsData.length === 0 ? (
                          <div className="text-gray-500 text-center py-12">
                            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-600 mb-2">You haven't joined any clubs yet.</h3>
                            <p className="text-gray-500 text-sm mb-6">Explore clubs and join your first one!</p>
                            <Button onClick={() => navigate('/clubs')} className="bg-blue-600 hover:bg-blue-700">
                              Explore Clubs
                            </Button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {membershipClubsData.map((club) => (
                              <div key={club.id} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
                                <div className="h-32 w-full bg-gray-100 flex-shrink-0">
                                  <img src={club.bannerUrl || club.imageUrl || '/placeholder-banner.jpg'} alt={club.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4 flex-1 flex flex-col justify-between">
                                  <div>
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="font-bold text-lg text-gray-900">{club.name}</span>
                                      <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">{club.category}</span>
                                      <span className={`inline-block ${club.membership?.role === 'leader' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'} text-xs font-semibold px-3 py-1 rounded-full`}>{club.membership?.role === 'leader' ? 'Leader' : 'Member'}</span>
                                    </div>
                                    <div className="text-gray-600 text-sm mb-2 line-clamp-2">{club.description}</div>
                                  </div>
                                  <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-sm transition-all duration-200 shadow">View</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  {selectedSection === 'events' && (
                    <div className="py-8">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Events</h2>
                      {membershipClubsData.length === 0 && (
                        <div className="text-gray-500 text-center py-12">
                          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-600 mb-2">No upcoming events</h3>
                          <p className="text-gray-500 text-sm">Join clubs to see their events here.</p>
                        </div>
                      )}
                      {membershipClubsData.map((club) => (
                        <div key={club.id} className="mb-10">
                          {/* Club header */}
                          <div className="flex items-center gap-4 mb-3">
                            <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                              <img src={club.logoUrl || '/placeholder-logo.png'} alt={club.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-bold text-lg text-gray-900">{club.name}</div>
                              <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mt-1">{club.category}</span>
                            </div>
                          </div>
                          {/* Events list */}
                          {clubEvents[club.id] && clubEvents[club.id].length > 0 ? (
                            <div className="flex flex-col gap-4">
                              {clubEvents[club.id].map((event) => (
                                <div key={event.id} className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row md:items-center gap-4">
                                  <div className="flex-1">
                                    <div className="font-semibold text-blue-800 text-base mb-1">{event.name}</div>
                                    <div className="text-xs text-gray-500 mb-1">{event.date}</div>
                                    <div className="text-gray-700 text-sm mb-2">{event.description}</div>
                                  </div>
                                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl text-sm transition-all duration-200 shadow">View Event</button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-gray-400 text-sm">No events for this club.</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {selectedSection === 'bookmarks' && (
                    <div className="py-8">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Bookmarks</h2>
                      {bookmarksLoading ? (
                        <div className="flex justify-center items-center py-12">
                          <PulseLoader size="large" />
                        </div>
                      ) : bookmarkedClubsData.length === 0 ? (
                        <div className="text-center py-12">
                          <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-600 mb-2">No bookmarks yet</h3>
                          <p className="text-gray-500 text-sm mb-6">Start exploring clubs and bookmark your favorites!</p>
                          <Button onClick={() => navigate('/clubs')} className="bg-blue-600 hover:bg-blue-700">
                            Explore Clubs
                          </Button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {bookmarkedClubsData.map((club) => (
                            <div key={club.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                              <div className="h-32 w-full bg-gray-100 flex-shrink-0">
                                <img
                                  src={club.image_url || '/placeholder-banner.jpg'}
                                  alt={club.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-bold text-lg text-gray-900">{club.name}</span>
                                  <button
                                    onClick={() => handleRemoveBookmark(club.id.toString())}
                                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                                    title="Remove bookmark"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">{club.category}</span>
                                <div className="text-gray-600 text-sm mb-4 line-clamp-2">{club.description}</div>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                                    onClick={() => navigate(`/club/${club.slug}`)}
                                  >
                                    View Club
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => navigate(`/club/${club.slug}`)}
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </section>
            </>
          ) : (
            <section className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-12">
                <NotificationSettings />
              </div>
            </section>
          )}
        </main>
      </div>
      <div className="mb-16" />
      <Footer />
      {/* Logout confirmation dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
          </DialogHeader>
          <div className="py-2 text-gray-700">Are you sure you want to log out?</div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleLogout}>Log out</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfile;
