import { useNavigate } from "react-router-dom";
import { useBookmarks } from "../hooks/useBookmarks";
import { allClubsData } from "../data/clubsData";
import FeaturedClubCard from "./FeaturedClubCard";
import Layout from "./layout";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Button } from "./ui/button";

const BookmarksPage = () => {
  const { bookmarkedClubs } = useBookmarks();
  const navigate = useNavigate();

  // Get the list of bookmarked club IDs
  const bookmarkedClubIds = Object.keys(bookmarkedClubs).filter(
    (id) => bookmarkedClubs[id],
  );

  // Get the full club data for each bookmarked club
  const bookmarkedClubsData = bookmarkedClubIds
    .filter((id) => allClubsData[id]) // Make sure the club exists in our data
    .map((id) => allClubsData[id]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 min-h-[70vh]">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Your Bookmarked Clubs
        </h1>

        {bookmarkedClubsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookmarkedClubsData.map((club) => (
              <FeaturedClubCard
                key={club.id}
                id={club.id}
                name={club.name}
                category={club.category}
                imageUrl={club.imageUrl || club.bannerUrl}
                onExploreClick={() => navigate(`/club/${club.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-xl text-gray-600 mb-6">
              You haven't bookmarked any clubs yet ~ Discover more
            </p>
            <Button
              onClick={() => navigate("/clubs")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
              Explore Clubs
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BookmarksPage;
