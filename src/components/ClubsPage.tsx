import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FeaturedClubCard from "./FeaturedClubCard";
import { getClubs, Club } from "../lib/supabase-client";
import { Button } from "./ui/button";
import { X, Search } from "lucide-react";
import { Input } from "./ui/input";
import SearchFilterBar from "./SearchFilterBar";
import ClubProfileModal from "./ClubProfileModal";

interface ClubsPageProps {
  onClubSelect?: (clubId: string) => void;
  isLoading?: boolean;
}

const ClubsPage = ({
  onClubSelect = () => { },
  isLoading = false,
}: ClubsPageProps) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMemberCount, setSelectedMemberCount] = useState("");
  const [selectedMeetingDay, setSelectedMeetingDay] = useState("");
  const [selectedAdvisor, setSelectedAdvisor] = useState("");
  const [allClubs, setAllClubs] = useState<Club[]>([]);
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [enrichedClub, setEnrichedClub] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadClubs = async () => {
      setLoading(true);
      try {
        const clubs = await getClubs();
        setAllClubs(clubs);
        setFilteredClubs(clubs); // Initialize filtered list with all clubs
      } catch (error) {
        console.error("Failed to load clubs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadClubs();
  }, []);

  useEffect(() => {
    // Filter clubs based on all criteria
    const filtered = allClubs.filter((club) => {
      const matchesSearch = club.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory
        ? club.category === selectedCategory
        : true;

      // Member count filter
      const matchesMemberCount = selectedMemberCount
        ? (() => {
          const count = club.member_count;
          switch (selectedMemberCount) {
            case "small":
              return count <= 15;
            case "medium":
              return count >= 16 && count <= 25;
            case "large":
              return count >= 26;
            default:
              return true;
          }
        })()
        : true;

      // Meeting day filter
      const matchesMeetingDay = selectedMeetingDay
        ? club.meeting_times
          ?.toLowerCase()
          .includes(selectedMeetingDay.toLowerCase())
        : true;

      // Advisor filter
      const matchesAdvisor = selectedAdvisor
        ? club.advisor === selectedAdvisor
        : true;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMemberCount &&
        matchesMeetingDay &&
        matchesAdvisor
      );
    });

    setFilteredClubs(filtered);
  }, [
    searchTerm,
    selectedCategory,
    selectedMemberCount,
    selectedMeetingDay,
    selectedAdvisor,
    allClubs,
  ]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // Filter handlers are kept for potential future use

  const handleClearCategory = () => {
    setSelectedCategory("");
  };

  const handleClubSelect = (club: any) => {
    console.log("Club clicked:", club);
    setSelectedClub(club);
    setEnrichedClub({
      ...club,
      leaders: [],
      members: [],
      upcomingEvents: [],
      gallery: [],
    });
    setModalOpen(true);
    if (onClubSelect) {
      onClubSelect(club.id);
    }
  };

  const handleExploreClick = (clubId: string) => {
    navigate(`/club/${clubId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearch={handleSearch} />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 pb-24">
          <div className="flex flex-col gap-24">
            <div className="flex justify-between items-start gap-16">
              <div className="min-w-[300px] mt-12 ml-4">
                <h1 className="text-6xl font-extrabold text-black">
                  {selectedCategory ? selectedCategory : "All Clubs"}
                </h1>
                <p className="text-gray-600 mt-2">
                  {filteredClubs.length} club
                  {filteredClubs.length !== 1 ? "s" : ""} found
                </p>
                <div className="mt-6">
                  <p className="text-2xl font-bold text-blue-600 px-4 py-2 rounded-lg border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 hover:shadow-lg transition-all duration-300 cursor-pointer inline-block ml-[-8px]">
                    Discover Your Passion!
                  </p>
                </div>
              </div>

              {/* Additional Filters section */}
              <div className="flex-1 max-w-[1000px]">
                <SearchFilterBar
                  showAdditionalFilters={true}
                  showSearchAndCategories={false}
                  showCategoryButtons={false}
                  onMemberCountFilter={setSelectedMemberCount}
                  onMeetingDayFilter={setSelectedMeetingDay}
                  onAdvisorFilter={setSelectedAdvisor}
                  className="!p-0"
                />
              </div>
            </div>

            {filteredClubs.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold text-gray-700">
                  No clubs found
                </h3>
                <p className="text-gray-500 mt-2">Try adjusting your search</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12 justify-items-center">
                  {isLoading !== undefined && isLoading
                    ? // Loading skeletons
                    Array(9)
                      .fill(0)
                      .map((_, index) => (
                        <div key={index} className="w-full space-y-3">
                          <div className="relative w-full h-[300px] rounded-lg bg-gray-200 animate-pulse"></div>
                          <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      ))
                    : filteredClubs.map((club) => (
                      <FeaturedClubCard key={club.id} club={club} onClick={handleClubSelect} />
                    ))}
                </div>
                <div className="text-center mt-20">
                  <div className="inline-block group">
                    <p className="text-xl font-medium text-blue-600 transition-all duration-300 group-hover:text-blue-700">
                      More exciting clubs coming soon!
                    </p>
                    <div className="h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full mx-auto mt-2"></div>
                  </div>
                </div>
                {enrichedClub && (
                  console.log("Rendering modal for club:", enrichedClub),
                  <ClubProfileModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    club={enrichedClub}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ClubsPage;
