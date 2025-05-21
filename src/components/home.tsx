import React, { useState } from "react";
import SearchFilterBar from "./SearchFilterBar";
import FeaturedClubsCarousel from "./FeaturedClubsCarousel";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import TestimonialsSection from "./TestimonialsSection";
import Footer from "./Footer";
import { allClubsList } from "../data/clubsData";
import FeaturedClubCard from "./FeaturedClubCard";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface HomeProps {
  onSearch?: (searchTerm: string) => void;
  onCategoryChange?: (category: string) => void;
  onDayChange?: (day: Date | undefined) => void;
  onClubSelect?: (clubId: string) => void;
}

const Home = ({
  onSearch = () => {},
  onCategoryChange = () => {},
  onDayChange = () => {},
  onClubSelect = () => {},
  isLoading = false,
}: HomeProps) => {
  const [showAllClubs, setShowAllClubs] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // Filter clubs based on search term and category
  const filteredClubs = allClubsList.filter((club) => {
    const matchesSearch = club.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" ||
      club.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    onSearch(term);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange(category);
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

  const handleClubSelect = (clubId: string) => {
    if (onClubSelect) {
      onClubSelect(clubId);
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
            onCategorySelect={(category) =>
              handleCategoryChange(category.toLowerCase())
            }
            className="mb-16"
            selectedCategory={selectedCategory}
          />
        </section>

        <section className="py-0 mt-0">
          <div className="container mx-auto px-4 pb-16">
            <FeaturedClubsCarousel
              onClubSelect={handleClubSelect}
              isLoading={isLoading || loading}
              clubs={filteredClubs
                .slice(0, showAllClubs ? filteredClubs.length : 9)
                .map((club) => ({
                  id: club.id,
                  name: club.name,
                  category: club.category,
                  imageUrl: club.imageUrl,
                }))}
            />

            {filteredClubs.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold text-gray-700">
                  No clubs found
                </h3>
                <p className="text-gray-500 mt-2">Try adjusting your search</p>
              </div>
            )}

            {!showAllClubs && filteredClubs.length > 12 && (
              <div className="flex justify-center -mt-24 mb-16">
                <Button
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 px-10 py-7 text-lg font-semibold shadow-md hover:shadow-lg rounded-full"
                  onClick={handleShowAllClubs}
                >
                  Explore more
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
