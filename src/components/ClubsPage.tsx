import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FeaturedClubCard from "./FeaturedClubCard";
import { allClubsList } from "../data/clubsData";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface ClubsPageProps {
  onClubSelect?: (clubId: string) => void;
  isLoading?: boolean;
}

const ClubsPage = ({
  onClubSelect = () => {},
  isLoading = false,
}: ClubsPageProps) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredClubs, setFilteredClubs] = useState(allClubsList);
  const navigate = useNavigate();

  useEffect(() => {
    // Filter clubs based on search term and category
    const filtered = allClubsList.filter((club) => {
      const matchesSearch = club.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory
        ? club.category === selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    });

    setFilteredClubs(filtered);
  }, [searchTerm, selectedCategory]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleClearCategory = () => {
    setSelectedCategory("");
  };

  const handleClubSelect = (club: any) => {
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
        <div className="container mx-auto px-4 py-8 pt-16 pb-16">
          <div className="flex justify-between items-center mb-8 ml-4">
            <h1 className="text-3xl font-bold">
              {selectedCategory ? selectedCategory : "All Clubs"}
            </h1>
            {selectedCategory && (
              <Button
                variant="outline"
                className="flex items-center gap-1"
                onClick={handleClearCategory}
              >
                <X className="h-4 w-4" /> Clear filter
              </Button>
            )}
          </div>
          {filteredClubs.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-gray-700">
                No clubs found
              </h3>
              <p className="text-gray-500 mt-2">Try adjusting your search</p>
            </div>
          ) : (
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
                    <FeaturedClubCard
                      key={club.id}
                      id={club.id}
                      name={club.name}
                      category={club.category}
                      imageUrl={club.imageUrl}
                      onNameClick={() => handleClubSelect(club)}
                      onImageClick={() => handleClubSelect(club)}
                      onExploreClick={() => handleExploreClick(club.id)}
                    />
                  ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ClubsPage;
