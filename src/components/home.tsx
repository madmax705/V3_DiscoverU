import React, { useState, useEffect } from "react";
import SearchFilterBar from "./SearchFilterBar";
import FeaturedClubsCarousel from "./FeaturedClubsCarousel";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import TestimonialsSection from "./TestimonialsSection";
import Footer from "./Footer";
import { getClubs, Club } from "../lib/supabase-client";
import FeaturedClubCard from "./FeaturedClubCard";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import ClubProfileModal from "./ClubProfileModal";

interface HomeProps {
  onSearch?: (searchTerm: string) => void;
  onCategoryChange?: (category: string) => void;
  onDayChange?: (day: Date | undefined) => void;
  onClubSelect?: (clubId: string) => void;
  isLoading?: boolean;
}

interface SearchFilterBarProps {
  onSearch: (term: string) => void;
  onCategorySelect: (category: string) => void;
  className?: string;
  selectedCategory?: string;
  showAdditionalFilters?: boolean;
}

const Home = ({
  onSearch = () => { },
  onCategoryChange = () => { },
  onDayChange = () => { },
  onClubSelect = () => { },
  isLoading = false,
}: HomeProps) => {
  const [allClubs, setAllClubs] = useState<Club[]>([]);
  const [showAllClubs, setShowAllClubs] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLeadership, setSelectedLeadership] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [enrichedClub, setEnrichedClub] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadClubs = async () => {
      setLoading(true);
      try {
        const clubs = await getClubs();
        setAllClubs(clubs);
      } catch (error) {
        // Optionally, set an error state to show a message to the user
      } finally {
        setLoading(false);
      }
    };

    loadClubs();
  }, []);

  // Filter clubs based on search term and category
  const filteredClubs = allClubs.filter((club) => {
    const matchesSearch = club.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" ||
      club.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // If a category filter or leadership filter (other than "all") is applied, show all clubs without the "explore more" limitation
  React.useEffect(() => {
    if (selectedCategory !== "" || selectedLeadership !== "all") {
      setShowAllClubs(true);
    }
  }, [selectedCategory, selectedLeadership]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    onSearch(term);
  };

  const handleCategoryChange = (category: string) => {
    const actualCategory = category === "any_category" ? "" : category;
    setSelectedCategory(actualCategory);
    onCategoryChange(actualCategory);
  };

  const handleLeadershipChange = (leadership: string) => {
    setSelectedLeadership(leadership);
  };

  const handleShowAllClubs = () => {
    setShowAllClubs(true);
    // Scroll to the all clubs section
    setTimeout(() => {
      document
        .getElementById("all-clubs-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleClubSelect = (clubOrId: Club | number | string) => {
    let club: Club | undefined;
    if (typeof clubOrId === 'object' && clubOrId !== null && 'id' in clubOrId) {
      club = clubOrId as Club;
    } else {
      club = allClubs.find((c) => c.id === Number(clubOrId));
    }
    if (club) {
      setSelectedClub(club);
      setEnrichedClub({
        ...club,
        leaders: [],
        members: [],
        upcomingEvents: [],
        gallery: [],
      });
      setModalOpen(true);
    }
    if (onClubSelect && typeof clubOrId !== 'object') {
      onClubSelect(clubOrId as string);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearch={handleSearch} />
      <HeroSection />
      <main className="flex-1">
        <section className="-mt-24 relative z-10">
          <SearchFilterBar
            onSearch={handleSearch}
            onCategorySelect={handleCategoryChange}
            className="mb-16"
            showAdditionalFilters={false}
          />
        </section>

        <section className="py-0 mt-0">
          <div className="container mx-auto px-4 pb-16">
            <div className="relative mb-6">
              <FeaturedClubsCarousel
                onClubSelect={handleClubSelect}
                isLoading={isLoading || loading}
                clubs={filteredClubs.slice(0, showAllClubs ? filteredClubs.length : 9)}
                leadership={selectedCategory}
                onLeadershipChange={handleLeadershipChange}
              />
              {selectedCategory && (
                <div className="absolute top-0 right-9 z-10">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 bg-white/80 backdrop-blur-sm"
                    onClick={() => setSelectedCategory("")}
                  >
                    <X className="h-3 w-3" /> {selectedCategory}
                  </Button>
                </div>
              )}
            </div>

            {filteredClubs.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold text-gray-700">
                  No clubs found
                </h3>
                <p className="text-gray-500 mt-2">Try adjusting your search</p>
              </div>
            )}

            {!showAllClubs &&
              filteredClubs.length > 9 && (
                <div className="flex flex-col items-center mt-20 mb-16 relative z-20">
                  <Button
                    size="lg"
                    className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 px-10 py-7 text-lg font-semibold shadow-md hover:shadow-lg rounded-full relative z-20"
                    onClick={handleShowAllClubs}
                  >
                    Explore more
                  </Button>
                </div>
              )}
            {showAllClubs && (
              <div className="flex justify-center mt-24 mb-16">
                <div className="inline-block group">
                  <span className="text-xl font-medium text-blue-600 transition-all duration-300 group-hover:text-blue-700">
                    More exciting clubs coming soon!
                  </span>
                  <div className="h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full mx-auto mt-2"></div>
                </div>
              </div>
            )}
            {enrichedClub && (
              <ClubProfileModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                club={enrichedClub}
              />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
