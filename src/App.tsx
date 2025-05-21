import { Suspense, useState, useEffect, createContext } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import ClubsPage from "./components/ClubsPage";
import ClubProfilePage from "./components/ClubProfilePage";
import BookmarksPage from "./components/BookmarksPage";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import routes from "tempo-routes";
import ClubProfileModal from "./components/ClubProfileModal";
import { ClubData } from "./components/ClubProfileModal";
import { allClubsData } from "./data/clubsData";

import Layout from "./components/layout";

// Define BookmarkContext before it's used in the App component
export const BookmarkContext = createContext<{
  bookmarkedClubs: Record<string, boolean>;
  toggleBookmark: (clubId: string) => void;
  isBookmarked: (clubId: string) => boolean;
}>({
  bookmarkedClubs: {},
  toggleBookmark: () => {},
  isBookmarked: () => false,
});

function App() {
  const [selectedClub, setSelectedClub] = useState<ClubData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookmarkedClubs, setBookmarkedClubs] = useState<
    Record<string, boolean>
  >({});

  // Load bookmarked clubs from localStorage on initial render
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarkedClubs");
    if (savedBookmarks) {
      setBookmarkedClubs(JSON.parse(savedBookmarks));
    }
  }, []);

  // Save bookmarked clubs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bookmarkedClubs", JSON.stringify(bookmarkedClubs));
  }, [bookmarkedClubs]);

  const toggleBookmark = (clubId: string) => {
    setBookmarkedClubs((prev) => {
      const newBookmarks = { ...prev };
      if (newBookmarks[clubId]) {
        delete newBookmarks[clubId];
      } else {
        newBookmarks[clubId] = true;
      }
      return newBookmarks;
    });
  };

  const isBookmarked = (clubId: string) => {
    return !!bookmarkedClubs[clubId];
  };

  const handleClubSelect = (clubId: string) => {
    setSelectedClub(allClubsData[clubId]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarkedClubs, toggleBookmark, isBookmarked }}
    >
      <Suspense fallback={<p>Loading...</p>}>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={<Home onClubSelect={handleClubSelect} />}
            />
            <Route
              path="/clubs"
              element={<ClubsPage onClubSelect={handleClubSelect} />}
            />
            <Route path="/club/:clubId" element={<ClubProfilePage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          {selectedClub && (
            <ClubProfileModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              clubData={selectedClub}
              isLoading={false}
            />
          )}
        </Layout>
      </Suspense>
    </BookmarkContext.Provider>
  );
}

export default App;
