import React, { useState, useRef, useEffect } from "react";
import ClubCard from "./ClubCard";
import ClubProfileModal from "./ClubProfileModal";
import { Skeleton } from "./ui/skeleton";
import { allClubsData } from "../data/clubsData";
import { Club } from "../lib/supabase-client";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useAuth } from "../contexts/AuthContext";
import { fetchUserClubMemberships, getClubAverageRating } from "../lib/supabase-client";

interface ClubGridProps {
  clubs?: any[];
  onLearnMore?: (clubId: string) => void;
  isLoading?: boolean;
}

const defaultClubs: Club[] = [
  {
    id: 1,
    name: "Chess Club",
    category: "Games & Recreation",
    description: "A place for chess enthusiasts to gather, learn, and compete in a friendly environment.",
    meeting_times: "Mondays & Wednesdays, 3:30 PM",
    advisor: "Dr. Smith",
    member_count: 24,
    logo_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=chess",
    image_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=chess",
    created_at: "2024-01-01T00:00:00Z",
    slug: "chess-club",
    mission: null,
    location: "Room 204, Student Center"
  },
  {
    id: 2,
    name: "Debate Team",
    category: "Academic",
    description: "Develop public speaking and argumentation skills through competitive debate.",
    meeting_times: "Tuesdays & Thursdays, 4:00 PM",
    advisor: "Ms. Johnson",
    member_count: 18,
    logo_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=debate",
    image_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=debate",
    created_at: "2024-01-01T00:00:00Z",
    slug: "debate-team",
    mission: null,
    location: "Room 101, Main Building"
  },
  {
    id: 3,
    name: "Environmental Club",
    category: "Service",
    description: "Working together to make our school and community more environmentally sustainable.",
    meeting_times: "Fridays, 3:00 PM",
    advisor: "Mr. Green",
    member_count: 32,
    logo_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=environment",
    image_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=environment",
    created_at: "2024-01-01T00:00:00Z",
    slug: "environmental-club",
    mission: null,
    location: "Room 303, Science Wing"
  },
  {
    id: 4,
    name: "Art Society",
    category: "Arts & Culture",
    description: "Express yourself through various art forms and showcase your creativity.",
    meeting_times: "Wednesdays, 3:15 PM",
    advisor: "Ms. Rivera",
    member_count: 28,
    logo_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=art",
    image_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=art",
    created_at: "2024-01-01T00:00:00Z",
    slug: "art-society",
    mission: null,
    location: "Room 210, Arts Building"
  },
];

const ClubGrid = ({
  clubs = defaultClubs,
  onLearnMore = (clubId: string) =>
    console.log(`Learn more about club ${clubId}`),
  isLoading = false,
}: ClubGridProps) => {
  const { user } = useAuth();
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const [joinedClubIds, setJoinedClubIds] = React.useState<string[]>([]);
  const [clubRatings, setClubRatings] = useState<{ [key: number]: { average: number; count: number } }>({});

  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(clubs.length / 3), // Number of rows
    getScrollElement: () => parentRef.current,
    estimateSize: () => 400, // Estimate row height in pixels
    overscan: 5,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: 3, // Number of columns
    getScrollElement: () => parentRef.current,
    estimateSize: () => 350, // Estimate column width in pixels
  });

  useEffect(() => {
    if (user) {
      fetchUserClubMemberships(user.id).then((data) => {
        setJoinedClubIds(data.map((m: any) => m.club_id));
      });
    } else {
      setJoinedClubIds([]);
    }
  }, [user]);

  // Fetch ratings for all clubs
  useEffect(() => {
    const fetchClubRatings = async () => {
      const ratings: { [key: number]: { average: number; count: number } } = {};

      for (const club of clubs) {
        try {
          const clubId = typeof club.id === 'string' ? parseInt(club.id, 10) : club.id;
          const ratingData = await getClubAverageRating(clubId);
          ratings[clubId] = ratingData;
        } catch (error) {
          console.error(`Error fetching rating for club ${club.id}:`, error);
          ratings[typeof club.id === 'string' ? parseInt(club.id, 10) : club.id] = { average: 0, count: 0 };
        }
      }

      setClubRatings(ratings);
    };

    fetchClubRatings();
  }, [clubs]);

  const handleClubCardClick = (clubId: string) => {
    // Try to find the club in allClubsData first
    const clubDataFromAllClubs = allClubsData[clubId];
    let clubData: Club | undefined;

    if (clubDataFromAllClubs) {
      // Convert ClubData to Club type
      clubData = {
        id: parseInt(clubDataFromAllClubs.id),
        name: clubDataFromAllClubs.name,
        description: clubDataFromAllClubs.description,
        category: clubDataFromAllClubs.category,
        image_url: clubDataFromAllClubs.imageUrl || clubDataFromAllClubs.bannerUrl || null,
        logo_url: clubDataFromAllClubs.logoUrl || null,
        meeting_times: clubDataFromAllClubs.meetingTimes || null,
        location: clubDataFromAllClubs.location || null,
        advisor: clubDataFromAllClubs.advisor || null,
        member_count: clubDataFromAllClubs.memberCount || 0,
        created_at: new Date().toISOString(),
        slug: clubDataFromAllClubs.id,
        mission: clubDataFromAllClubs.mission || null,
      };
    } else {
      // Create club data from the clubs array
      const found = clubs.find((c) => c.id === clubId);
      if (found) {
        clubData = {
          id: typeof found.id === 'string' ? parseInt(found.id, 10) : found.id,
          name: found.name,
          description: found.description ?? '',
          category: found.category,
          image_url: found.image_url ?? null,
          logo_url: found.logo_url ?? null,
          meeting_times: found.meeting_times ?? null,
          location: found.location ?? null,
          advisor: found.advisor ?? null,
          member_count: found.member_count ?? 0,
          created_at: found.created_at ?? new Date().toISOString(),
          slug: found.slug ?? String(found.id),
          mission: found.mission ?? null,
        };
      }
    }

    if (clubData) {
      setSelectedClub(clubData);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedClub(null);
  };

  return (
    <div ref={parentRef} className="h-[80vh] w-full overflow-auto p-2">
      <div
        className="relative w-full"
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const rowIndex = virtualRow.index;
          return (
            <div
              key={virtualRow.key}
              className="absolute top-0 left-0 w-full"
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className="flex gap-4">
                {[...Array(3)].map((_, colIndex) => {
                  const clubIndex = rowIndex * 3 + colIndex;
                  const club = clubs[clubIndex];
                  if (!club) return null;

                  return (
                    <div key={club.id} className="w-1/3">
                      <ClubCard
                        club={{
                          ...club,
                          id: typeof club.id === 'string' ? parseInt(club.id, 10) : club.id,
                          image_url: club.image_url || null,
                          logo_url: club.logo_url || null,
                          meeting_times: club.meeting_times || null,
                          location: club.location || null,
                          advisor: club.advisor || null,
                          member_count: club.member_count || 0,
                          created_at: club.created_at || '',
                          slug: club.slug || club.id.toString(),
                          description: club.description || '',
                          name: club.name,
                          category: club.category,
                        }}
                        onExplore={onLearnMore}
                        isJoined={joinedClubIds.includes(club.id)}
                        averageRating={clubRatings[typeof club.id === 'string' ? parseInt(club.id, 10) : club.id]?.average || 0}
                        ratingCount={clubRatings[typeof club.id === 'string' ? parseInt(club.id, 10) : club.id]?.count || 0}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Club Profile Modal */}
      {selectedClub && (
        <ClubProfileModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          club={{
            ...selectedClub,
            id: typeof selectedClub.id === 'string' ? parseInt(selectedClub.id, 10) : selectedClub.id,
            image_url: selectedClub.logo_url || null,
            logo_url: selectedClub.logo_url || null,
            meeting_times: selectedClub.meeting_times || null,
            location: selectedClub.location || null,
            advisor: selectedClub.advisor || null,
            member_count: selectedClub.member_count || 0,
            created_at: selectedClub.created_at || '',
            slug: selectedClub.slug || selectedClub.id.toString(),
            description: selectedClub.description || '',
            name: selectedClub.name,
            category: selectedClub.category,
          }}
          isLoading={false}
        />
      )}
    </div>
  );
};

export default ClubGrid;
