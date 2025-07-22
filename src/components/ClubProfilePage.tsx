import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Calendar,
  MapPin,
  Users,
  Target,
  Mail,
  Clock,
  Calendar as CalendarIcon,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  CheckCircle,
  UserPlus,
  Loader2,
} from "lucide-react";
import { useBookmarks } from "../hooks/useBookmarks";
import { useAuth } from "../contexts/AuthContext";
import {
  checkClubMembership,
  addClubMembership,
  removeClubMembership,
  getClubBySlug,
  getClubMembers,
  getClubEvents,
  getUserRating,
  setClubRating,
  getClubAverageRating,
  getClubRatingStats,
  Club,
  ClubMember,
  ClubEvent,
} from "../lib/supabase-client";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TestimonialCard from "./TestimonialCard";
import { allClubsData, ClubData } from "../data/clubsData";
import ExpandedPhotoModal from "./ExpandedPhotoModal";
import ClubProfile from "./ClubProfile";
import LoadingSpinner from "./LoadingSpinner";
import ClubRatingStats from "./ClubRatingStats";

interface ClubProfilePageProps {
  // Props can be passed when component is used directly
}

const ClubProfilePage: React.FC<ClubProfilePageProps> = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [club, setClub] = useState<Club | null>(null);
  const [members, setMembers] = useState<ClubMember[]>([]);
  const [events, setEvents] = useState<ClubEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const bookmarked = isBookmarked(slug || "chess-club");
  const currentClubId = slug || "chess-club";

  // State for membership functionality
  const [isMember, setIsMember] = useState(false);
  const [membershipLoading, setMembershipLoading] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinMessage, setJoinMessage] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });

  // State for rating functionality
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [ratingLoading, setRatingLoading] = useState(false);
  const [ratingDistribution, setRatingDistribution] = useState<{ [key: number]: number }>({});

  // Helper to get numeric club id
  const getNumericClubId = () => {
    if (club && typeof club.id === 'number') return club.id;
    return undefined;
  };

  const handleRatingClick = async (star: number) => {
    if (user && club && typeof club.id === 'number') {
      setRatingLoading(true);
      try {
        const result = await setClubRating(user.id, club.id, star);
        if (result.success) {
          setUserRating(star);
          // Refresh rating stats
          const statsData = await getClubRatingStats(club.id);
          setAverageRating(statsData.average);
          setRatingCount(statsData.count);
          setRatingDistribution(statsData.distribution);
          console.log(`User ${user.id} rated club ${club.id}: ${star}`);
        } else {
          console.error('Failed to save rating:', result.error);
        }
      } catch (error) {
        console.error('Error saving rating:', error);
      } finally {
        setRatingLoading(false);
      }
    } else {
      // Prompt user to login if not logged in
      navigate("/login");
    }
  };

  const handleBookmarkToggle = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    toggleBookmark(currentClubId);
  };

  // Check membership status when component mounts or user changes
  useEffect(() => {
    const checkMembership = async () => {
      if (user && club && typeof club.id === 'number') {
        setMembershipLoading(true);
        try {
          const { isMember: memberStatus } = await checkClubMembership(
            user.id,
            club.id,
          );
          setIsMember(memberStatus);
        } catch (error) {
          console.error("Error checking membership:", error);
        } finally {
          setMembershipLoading(false);
        }
      }
    };

    checkMembership();
  }, [user, club]);

  // Handle joining/leaving club
  const handleJoinClub = async () => {
    if (!user || !club || typeof club.id !== 'number') {
      navigate("/login");
      return;
    }

    setJoinLoading(true);
    setJoinMessage({ type: null, text: "" });

    try {
      if (isMember) {
        // Leave club
        const result = await removeClubMembership(user.id, club.id);
        if (result.success) {
          setIsMember(false);
          setJoinMessage({
            type: "success",
            text: "You have successfully left the club.",
          });
        } else {
          setJoinMessage({
            type: "error",
            text: "Failed to leave the club. Please try again.",
          });
        }
      } else {
        // Join club
        const result = await addClubMembership(user.id, club.id);
        if (result.success) {
          setIsMember(true);
          setJoinMessage({
            type: "success",
            text: "Welcome to the club! You'll receive updates about events and activities.",
          });
        } else {
          setJoinMessage({
            type: "error",
            text:
              result.error?.message ||
              "Failed to join the club. Please try again.",
          });
        }
      }
    } catch (error) {
      console.error("Error handling club membership:", error);
      setJoinMessage({
        type: "error",
        text: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setJoinLoading(false);
      // Clear message after 5 seconds
      setTimeout(() => {
        setJoinMessage({ type: null, text: "" });
      }, 5000);
    }
  };

  // Scroll to top when club page changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const [expandedPhoto, setExpandedPhoto] = React.useState<{ url: string; caption: string } | null>(null);

  useEffect(() => {
    const fetchClubData = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const clubData = await getClubBySlug(slug);
        if (clubData) {
          setClub(clubData);
          // Fetch members and events only if club exists
          const memberData = await getClubMembers(clubData.id);
          const eventData = await getClubEvents(clubData.id);
          setMembers(memberData);
          setEvents(eventData);

          // Fetch rating data
          const avgData = await getClubAverageRating(clubData.id);
          setAverageRating(avgData.average);
          setRatingCount(avgData.count);

          // Fetch rating distribution
          const statsData = await getClubRatingStats(clubData.id);
          setRatingDistribution(statsData.distribution);

          // Fetch user's rating if logged in
          if (user) {
            const userRatingData = await getUserRating(user.id, clubData.id);
            setUserRating(userRatingData);
            setRating(userRatingData || 0);
          }
        } else {
          // Handle club not found
          console.error(`Club with slug "${slug}" not found.`);
        }
      } catch (error) {
        console.error("Error fetching club data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubData();
  }, [slug, user]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!club) {
    return (
      <>
        <Navbar />
        <div className="flex h-screen items-center justify-center text-center">
          <h1 className="text-2xl font-bold">Club Not Found</h1>
          <p className="mt-2 text-gray-600">
            Sorry, we couldn't find the club you're looking for.
          </p>
        </div>
        <Footer />
      </>
    );
  }

  // Combine data for the ClubProfile component
  const clubProfileData = {
    ...club,
    leaders: members.filter(m => m.role === 'leader'),
    members: members,
    gallery: Array.isArray((club as any).gallery_images)
      ? (club as any).gallery_images.map((url: string, index: number) => ({ id: `${club.id}-gallery-${index}`, url, caption: `Gallery image ${index + 1}` }))
      : [],
    upcomingEvents: events,
    mission: club.mission || '',
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <ClubProfile
          club={clubProfileData}
          rating={rating}
          hoverRating={hoverRating}
          averageRating={averageRating}
          ratingCount={ratingCount}
          ratingLoading={ratingLoading}
          onRatingChange={handleRatingClick}
          onRatingHover={setHoverRating}
          onRatingHoverOut={() => setHoverRating(0)}
        />
      </div>
      <Footer />
    </>
  );
};

export default ClubProfilePage;
