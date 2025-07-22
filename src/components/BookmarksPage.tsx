import { useNavigate } from "react-router-dom";
import { useBookmarks } from "../hooks/useBookmarks";
import { useEffect, useState, useMemo } from "react";
import { fetchClubById } from "../lib/supabase-client";
import FeaturedClubCard from "./FeaturedClubCard";
import Layout from "./layout";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Button } from "./ui/button";
import LoadingSpinner from "./LoadingSpinner";

const BookmarksPage = () => {
  const { bookmarkedClubs } = useBookmarks();
  const navigate = useNavigate();

  // Get the list of bookmarked club IDs
  const bookmarkedClubIds = useMemo(
    () => Object.keys(bookmarkedClubs).filter((id) => bookmarkedClubs[id]),
    [bookmarkedClubs]
  );

  // Fetch club data from Supabase for each bookmarked club
  const [bookmarkedClubsData, setBookmarkedClubsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchBookmarkedClubs = async () => {
      setLoading(true);
      try {
        const clubs = await Promise.all(
          bookmarkedClubIds.map((id) => fetchClubById(Number(id)))
        );
        if (!cancelled) {
          setBookmarkedClubsData(clubs.filter(Boolean));
          setLoading(false);
        }
      } catch (error) {
        if (!cancelled) {
          setBookmarkedClubsData([]);
          setLoading(false);
        }
      }
    };
    if (bookmarkedClubIds.length > 0) {
      fetchBookmarkedClubs();
    } else {
      setBookmarkedClubsData([]);
      setLoading(false);
    }
    return () => {
      cancelled = true;
    };
  }, [bookmarkedClubIds.join(",")]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 min-h-[70vh]">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Your Bookmarked Clubs
        </h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <LoadingSpinner />
          </div>
        ) : bookmarkedClubsData.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {bookmarkedClubsData.map((club) => (
                <FeaturedClubCard
                  key={club.id}
                  club={club}
                />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button
                onClick={() => navigate("/clubs")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore More Clubs
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-6">
              <svg
                className="mx-auto h-24 w-24 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No bookmarks yet
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                You haven't bookmarked any clubs yet. Discover clubs you're
                interested in and bookmark them to save for later!
              </p>
            </div>
            <Button
              onClick={() => navigate("/clubs")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
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
