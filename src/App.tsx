import { Suspense, createContext, ReactNode, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import ClubsPage from "./components/ClubsPage";
import ClubProfilePage from "./components/ClubProfilePage";
import BookmarksPage from "./components/BookmarksPage";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserProfile from "./components/UserProfile";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import {
  fetchUserBookmarks,
  addBookmark,
  removeBookmark,
} from "./lib/supabase-client";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";

import Layout from "./components/layout";
import { ParallaxProvider } from "react-scroll-parallax";

// Define BookmarkContext before it's used in the App component
export const BookmarkContext = createContext<{
  bookmarkedClubs: Record<string, boolean>;
  toggleBookmark: (clubId: string) => void;
  isBookmarked: (clubId: string) => boolean;
  loading: boolean;
}>({
  bookmarkedClubs: {},
  toggleBookmark: () => { },
  isBookmarked: () => false,
  loading: false,
});

interface BookmarkProviderProps {
  children: ReactNode;
}

function BookmarkProvider({ children }: BookmarkProviderProps) {
  const [bookmarkedClubs, setBookmarkedClubs] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const loadUserBookmarks = async () => {
      if (user) {
        setLoading(true);
        try {
          const bookmarkIds = await fetchUserBookmarks(user.id);
          const bookmarksRecord: Record<string, boolean> = {};
          bookmarkIds.forEach((id) => {
            bookmarksRecord[id] = true;
          });
          setBookmarkedClubs(bookmarksRecord);
        } catch (error) {
          console.error("Error loading user bookmarks:", error);
        } finally {
          setLoading(false);
        }
      } else {
        const savedBookmarks = localStorage.getItem("bookmarkedClubs");
        if (savedBookmarks) {
          setBookmarkedClubs(JSON.parse(savedBookmarks));
        } else {
          setBookmarkedClubs({});
        }
      }
    };
    loadUserBookmarks();
  }, [user]);

  useEffect(() => {
    localStorage.setItem("bookmarkedClubs", JSON.stringify(bookmarkedClubs));
  }, [bookmarkedClubs]);

  const toggleBookmark = async (clubId: string) => {
    const isCurrentlyBookmarked = bookmarkedClubs[clubId];
    setBookmarkedClubs((prev) => {
      const newBookmarks = { ...prev };
      if (newBookmarks[clubId]) {
        delete newBookmarks[clubId];
      } else {
        newBookmarks[clubId] = true;
      }
      return newBookmarks;
    });

    if (user) {
      try {
        const success = isCurrentlyBookmarked
          ? await removeBookmark(user.id, clubId)
          : await addBookmark(user.id, clubId);

        if (!success) {
          // Revert optimistic update on failure
          setBookmarkedClubs((prev) => {
            const newBookmarks = { ...prev };
            if (isCurrentlyBookmarked) {
              newBookmarks[clubId] = true;
            } else {
              delete newBookmarks[clubId];
            }
            return newBookmarks;
          });
        }
      } catch (error) {
        console.error("Error updating bookmark:", error);
      }
    }
  };

  const isBookmarked = (clubId: string) => !!bookmarkedClubs[clubId];

  return (
    <BookmarkContext.Provider
      value={{ bookmarkedClubs, toggleBookmark, isBookmarked, loading }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <NotificationProvider>
          <BookmarkProvider>
            <Suspense fallback={<LoadingSpinner fullScreen size="large" />}>
              <ParallaxProvider>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/clubs" element={<ClubsPage />} />
                    <Route path="/club/:slug" element={<ClubProfilePage />} />
                    <Route path="/bookmarks" element={<BookmarksPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile" element={<UserProfile />} />
                  </Routes>
                </Layout>
              </ParallaxProvider>
            </Suspense>
          </BookmarkProvider>
        </NotificationProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
