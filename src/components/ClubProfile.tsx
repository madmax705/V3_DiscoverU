import React from "react";
import {
  Bookmark,
  Calendar,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Target,
  Users,
  CheckCircle,
  UserPlus,
  Loader2,
  BookmarkCheck,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useBookmarks } from "../hooks/useBookmarks";
import {
  addClubMembership,
  removeClubMembership,
  joinClub,
  checkClubMembership,
  Club,
  ClubMember,
  ClubEvent,
} from "../lib/supabase-client";
import ExpandedPhotoModal from "./ExpandedPhotoModal";
import PulseLoader from "./PulseLoader";
import { useUserMemberships } from '../hooks/useUserMemberships';
import ClubRatingStats from './ClubRatingStats';

type EnrichedClub = Club & {
  leaders: ClubMember[];
  members: ClubMember[];
  upcomingEvents: ClubEvent[];
  gallery: { id: string; url: string; caption: string }[];
  mission?: string;
  tagline?: string;
  foundedYear?: number;
  resources?: { title: string; url: string; type: 'link' | 'document' }[];
  testimonials?: { name: string; role: string; avatarUrl: string; quote: string }[];
  achievements?: { title: string; date: string; description: string }[];
  socialLinks?: { platform: string; url: string }[];
};

type ClubProfileProps = {
  club: EnrichedClub;
  rating?: number;
  hoverRating?: number;
  averageRating?: number;
  ratingCount?: number;
  ratingLoading?: boolean;
  onRatingChange?: (star: number) => void;
  onRatingHover?: (star: number) => void;
  onRatingHoverOut?: () => void;
};

const ClubProfile: React.FC<ClubProfileProps> = ({
  club,
  rating = 0,
  hoverRating = 0,
  averageRating = 0,
  ratingCount = 0,
  ratingLoading = false,
  onRatingChange,
  onRatingHover,
  onRatingHoverOut
}) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: memberships = [], mutate: refreshMemberships } = useUserMemberships(user?.id);
  const isMember = memberships.some(m => m.club_id === club.id);
  const [joinLoading, setJoinLoading] = React.useState(false);
  const [membershipLoading, setMembershipLoading] = React.useState(false);
  const [joinMessage, setJoinMessage] = React.useState({ type: "", text: "" });
  const [expandedPhoto, setExpandedPhoto] = React.useState<{ url: string; caption: string } | null>(null);

  const bookmarked = isBookmarked(club.id.toString());

  const handleBookmarkToggle = () => {
    toggleBookmark(club.id.toString());
  };

  const handleJoinClub = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setJoinLoading(true);
    setJoinMessage({ type: "", text: "" });

    try {
      if (isMember) {
        const result = await removeClubMembership(user.id, club.id);
        if (result.success) {
          refreshMemberships();
          setJoinMessage({
            type: "success",
            text: "Successfully left the club.",
          });
        } else {
          setJoinMessage({
            type: "error",
            text: (result.error as any)?.message || "Failed to leave the club.",
          });
        }
      } else {
        const result = await joinClub(user.id, club.id);
        if (result.success) {
          refreshMemberships();
          setJoinMessage({
            type: "success",
            text: "Successfully joined the club!",
          });
        } else if (
          result.error?.message === "Already a member" ||
          result.error?.code === "23505"
        ) {
          refreshMemberships();
          setJoinMessage({
            type: "info",
            text: "You are already a member of this club.",
          });
        } else {
          setJoinMessage({
            type: "error",
            text: (result.error as any)?.message || "Failed to join the club.",
          });
        }
      }
    } catch (error) {
      setJoinMessage({ type: "error", text: "An unexpected error occurred." });
    } finally {
      setJoinLoading(false);
    }
  };

  React.useEffect(() => {
    const checkMembership = async () => {
      if (user && club && typeof club.id === 'number') {
        setMembershipLoading(true);
        try {
          const { isMember: memberStatus } = await checkClubMembership(
            user.id,
            club.id,
          );
          refreshMemberships();
        } catch (error) {
          console.error("Error checking membership:", error);
        } finally {
          setMembershipLoading(false);
        }
      }
    };

    checkMembership();
  }, [user, club, refreshMemberships]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="relative h-64 md:h-80 w-full overflow-hidden shadow-lg">
        <img
          src={club.image_url || '/placeholder-banner.jpg'}
          alt={`${club.name} banner`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 flex items-end">
          <div className="container mx-auto px-6 pb-12">
            <div>
              <h1 className="text-5xl font-bold text-white">{club.name}</h1>
              <p className="text-xl text-white/90 mt-2">{club.tagline || 'A great place to be!'}</p>
              {/* Club Rating UI */}
              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    onClick={() => onRatingChange && onRatingChange(star)}
                    onMouseEnter={() => onRatingHover && onRatingHover(star)}
                    onMouseLeave={() => onRatingHoverOut && onRatingHoverOut()}
                    className={`w-7 h-7 cursor-pointer transition-colors ${star <= (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                  </svg>
                ))}
                <span className="ml-2 text-white/80 text-sm">
                  {ratingLoading ? (
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 border border-white/60 border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </span>
                  ) : (
                    `(${averageRating.toFixed(1)}) ${ratingCount > 0 ? `• ${ratingCount} ${ratingCount === 1 ? 'rating' : 'ratings'}` : 'No ratings yet'}`
                  )}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <Badge className="bg-blue-500 hover:bg-blue-600 text-white">{club.category}</Badge>
                <span className="text-white/80 flex items-center gap-1">
                  <Users className="w-4 h-4" /> {club.member_count} members
                </span>
                <span className="text-white/80 flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> Est. {new Date(club.created_at).getFullYear()}
                </span>
                <button
                  onClick={handleBookmarkToggle}
                  className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full transition-colors"
                >
                  {bookmarked ? (
                    <><BookmarkCheck className="w-4 h-4" /><span>Bookmarked</span></>
                  ) : (
                    <><Bookmark className="w-4 h-4" /><span>Bookmark</span></>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-800">
                <Target className="w-6 h-6" /> Mission & Overview
              </h2>
              <p className="text-lg font-medium mb-4 text-blue-900 italic">
                "{club.mission || 'No mission statement provided.'}"
              </p>
              <p className="text-gray-700">{club.description}</p>
            </section>

            <Tabs defaultValue="events" className="w-full">
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="events">Upcoming Events</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              <TabsContent value="events" className="space-y-6">
                <h3 className="text-xl font-semibold">Upcoming Events</h3>
                <div className="grid gap-6">
                  {club.upcomingEvents.length > 0 ? (
                    club.upcomingEvents.map((event) => (
                      <div key={event.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                        <h4 className="text-lg font-bold">{event.name}</h4>
                        <p className="mt-3 text-gray-700">{event.description}</p>
                      </div>
                    ))
                  ) : (
                    <p>No upcoming events scheduled.</p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="resources">
                <h3 className="text-xl font-semibold mb-6">Resources & Links</h3>
                {club.resources && club.resources.length > 0 ? (
                  <div className="grid gap-6">
                    {club.resources.map((resource, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                        <h4 className="text-lg font-bold flex items-center gap-2">
                          {resource.title}
                          {resource.type === 'link' && <ExternalLink className="w-4 h-4 text-blue-500" />}
                        </h4>
                        <Button size="sm" variant="outline" className="flex items-center gap-1 mt-4" asChild>
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            {resource.type === 'document' ? 'Download' : 'Visit'}
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No resources available.</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
          <div className="space-y-8">
            <div className="bg-blue-600 text-white rounded-xl p-6 shadow-[0_0_35px_rgba(59,130,246,0.5)]">
              <h3 className="text-xl font-bold mb-3">{isMember ? `You're a member of ${club.name}` : `Join ${club.name}`}</h3>
              <p className="mb-6">{isMember ? "You have access to all..." : "Become a member to get access..."}</p>
              <Button className={`w-full font-bold text-lg py-6 flex items-center justify-center gap-2 ${isMember ? "bg-red-500 hover:bg-red-600 text-white" : "bg-white text-blue-600 hover:bg-blue-50"}`} onClick={handleJoinClub} disabled={joinLoading || membershipLoading}>
                {joinLoading ? (<><PulseLoader size="small" color="white" />{isMember ? "Leaving..." : "Joining..."}</>) : isMember ? (<><CheckCircle className="w-5 h-5" />Leave Club</>) : (<><UserPlus className="w-5 h-5" />Join</>)}
              </Button>
            </div>
            <div className="bg-white rounded-xl p-6 border shadow-sm">
              <h3 className="text-lg font-bold mb-4">Meeting Details</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3"><Clock className="w-5 h-5 text-blue-500 mt-0.5" /><div><p className="font-medium">Regular Meetings</p><p className="text-gray-600">{club.meeting_times}</p></div></div>
                <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-blue-500 mt-0.5" /><div><p className="font-medium">Location</p><p className="text-gray-600">{club.location}</p></div></div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border shadow-sm">
              <h3 className="text-lg font-bold mb-4">Leadership & Contact</h3>
              <div className="space-y-6">
                {club.leaders.map((leader) => (
                  <div key={leader.id} className="border-l-4 border-blue-500 pl-4 py-3 mb-3">
                    <p className="font-medium text-xl">{leader.user_id}</p> {/* TODO: Get user full_name from user_id */}
                    <p className="text-gray-600 mt-1">{leader.role}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Club Rating Card */}
            <div>
              <ClubRatingStats
                averageRating={averageRating}
                ratingCount={ratingCount}
                distribution={{}}
                userRating={isMember ? rating : null}
              />
              {/* Only members can rate */}
              {isMember ? (
                <div className="flex items-center gap-1 mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      onClick={() => onRatingChange && onRatingChange(star)}
                      onMouseEnter={() => onRatingHover && onRatingHover(star)}
                      onMouseLeave={() => onRatingHoverOut && onRatingHoverOut()}
                      className={`w-7 h-7 cursor-pointer transition-colors ${star <= (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-700 text-sm">
                    {ratingLoading ? (
                      <span className="flex items-center gap-1">
                        <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </span>
                    ) : (
                      `Your rating: ${rating}/5`
                    )}
                  </span>
                </div>
              ) : (
                <div className="mt-4 text-gray-500 text-sm text-center">Only club members can rate this club.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubProfile;
