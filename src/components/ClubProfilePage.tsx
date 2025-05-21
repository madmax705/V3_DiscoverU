import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
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
  Plus,
  Calendar as CalendarIcon,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { useBookmarks } from "../hooks/useBookmarks";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TestimonialCard from "./TestimonialCard";
import { allClubsData, ClubData } from "../data/clubsData";

interface ClubProfilePageProps {
  // Props can be passed when component is used directly
}

const ClubProfilePage: React.FC<ClubProfilePageProps> = () => {
  const { clubId } = useParams<{ clubId: string }>();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  // Get the club data from our centralized data source
  const club =
    allClubsData[clubId || "chess-club"] || allClubsData["chess-club"];

  const bookmarked = isBookmarked(clubId || "chess-club");

  const handleBookmarkToggle = () => {
    toggleBookmark(clubId || "chess-club");
  };

  // Scroll to top when club page changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [clubId]);

  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-xl">Loading club profile...</p>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <p className="text-xl">Club not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="bg-white sticky top-0 z-50 border-b border-gray-200">
        <Navbar />
      </div>

      {/* Hero Header with Banner */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src={club.bannerUrl}
          alt={`${club.name} banner`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="container mx-auto px-6 pb-12">
            <div>
              <h1 className="text-5xl font-bold text-white">{club.name}</h1>
              <p className="text-xl text-white/90 mt-2">{club.tagline}</p>
              <div className="flex items-center gap-3 mt-3">
                <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
                  {club.category}
                </Badge>
                <span className="text-white/80 flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {club.memberCount} members
                </span>
                <span className="text-white/80 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Est. {club.foundedYear}
                </span>
                <button
                  onClick={handleBookmarkToggle}
                  className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full transition-colors"
                >
                  {bookmarked ? (
                    <>
                      <BookmarkCheck className="w-4 h-4" />
                      <span>Bookmarked</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4" />
                      <span>Bookmark</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Mission & Overview */}
            <section className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-800">
                <Target className="w-6 h-6" />
                Mission & Overview
              </h2>
              <p className="text-lg font-medium mb-4 text-blue-900 italic">
                "{club.mission}"
              </p>
              <p className="text-gray-700">{club.description}</p>
            </section>

            {/* Tabs for different sections */}
            <Tabs defaultValue="events" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="events">Upcoming Events</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              {/* Upcoming Events Tab */}
              <TabsContent value="events" className="space-y-6">
                <h3 className="text-xl font-semibold">Upcoming Events</h3>
                <div className="grid gap-6">
                  {club.upcomingEvents.map((event, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
                    >
                      <h4 className="text-lg font-bold">{event.title}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 mt-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span>{event.location}</span>
                      </div>
                      <p className="mt-3 text-gray-700">{event.description}</p>
                      <div className="mt-4 flex gap-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <CalendarIcon className="w-4 h-4" />
                          Add to Calendar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Event Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-6">
                  <Button variant="outline">See All Events</Button>
                </div>
              </TabsContent>

              {/* Gallery Tab */}
              <TabsContent value="gallery">
                <h3 className="text-xl font-semibold mb-6">Photo Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {club.galleryImages.map((image, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-lg bg-gray-100 h-[300px]"
                    >
                      <img
                        src={image.url}
                        alt={image.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <p className="text-white p-4">{image.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Testimonials Tab */}
              <TabsContent value="testimonials">
                <h3 className="text-xl font-semibold mb-6">
                  What Our Members Say
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {club.testimonials.map((testimonial, index) => (
                    <TestimonialCard
                      key={index}
                      quote={testimonial.quote}
                      name={testimonial.name}
                      role={testimonial.role}
                      avatarUrl={testimonial.avatarUrl}
                    />
                  ))}
                </div>
              </TabsContent>

              {/* Resources Tab */}
              <TabsContent value="resources">
                <h3 className="text-xl font-semibold mb-6">
                  Resources & Links
                </h3>
                <div className="grid gap-6">
                  {club.resources.map((resource, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
                    >
                      <h4 className="text-lg font-bold flex items-center gap-2">
                        {resource.title}
                        {resource.type === "link" && (
                          <ExternalLink className="w-4 h-4 text-blue-500" />
                        )}
                      </h4>
                      <p className="mt-2 text-gray-700">
                        {resource.description}
                      </p>
                      <div className="mt-4">
                        <Button
                          size="sm"
                          variant={
                            resource.type === "document" ? "default" : "outline"
                          }
                          className="flex items-center gap-1"
                          asChild
                        >
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {resource.type === "document"
                              ? "Download"
                              : "Visit"}
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Get Involved Section */}
            <section className="bg-amber-50 rounded-xl p-6 border border-amber-100">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-amber-800">
                <Plus className="w-6 h-6" />
                Get Involved
              </h2>
              <p className="text-gray-700 mb-6">
                Looking for ways to contribute to our club? Check out these
                opportunities:
              </p>

              <div className="grid gap-6">
                {club.opportunities.map((opportunity, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm border p-6"
                  >
                    <h4 className="text-lg font-bold">{opportunity.title}</h4>
                    <p className="mt-2 text-gray-700">
                      {opportunity.description}
                    </p>
                    <div className="flex items-center gap-2 text-gray-600 mt-3">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span>Time Commitment: {opportunity.commitment}</span>
                    </div>
                    <div className="mt-4">
                      <Button
                        size="sm"
                        className="bg-amber-500 hover:bg-amber-600"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Join CTA */}
            <div className="bg-blue-600 text-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3">Join {club.name}</h3>
              <p className="mb-6">
                Become a member and get access to all our events, resources, and
                community.
              </p>
              <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold text-lg py-6">
                Join Now
              </Button>
              <p className="text-sm mt-3 text-blue-100">
                You'll receive a welcome email with next steps and event
                invites.
              </p>
            </div>

            {/* Meeting Details */}
            <div className="bg-white rounded-xl p-6 border shadow-sm">
              <h3 className="text-lg font-bold mb-4">Meeting Details</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Regular Meetings</p>
                    <p className="text-gray-600">{club.meetingTimes}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">{club.location}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full flex items-center justify-center gap-1"
                >
                  <CalendarIcon className="w-4 h-4" />
                  Add to Calendar
                </Button>
              </div>
            </div>

            {/* Leadership & Contact */}
            <div className="bg-white rounded-xl p-6 border shadow-sm">
              <h3 className="text-lg font-bold mb-4">Leadership & Contact</h3>
              <div className="space-y-6">
                {club.leaders.map((leader, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-blue-500 pl-4 py-3 mb-3"
                  >
                    <p className="font-medium text-xl">{leader.name}</p>
                    <p className="text-gray-600 mt-1">{leader.role}</p>
                    {leader.email && (
                      <a
                        href={`mailto:${leader.email}`}
                        className="text-blue-600 hover:underline flex items-center gap-2 mt-2"
                      >
                        <Mail className="w-5 h-5" />
                        {leader.email}
                      </a>
                    )}
                  </div>
                ))}
                <Button className="w-full mt-4 flex items-center justify-center gap-1">
                  <Mail className="w-4 h-4" />
                  Message Leaders
                </Button>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-xl p-6 border shadow-sm">
              <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
              <div className="flex flex-wrap gap-3">
                {club.socialLinks.map((link, index) => (
                  <Button key={index} variant="outline" size="sm" asChild>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.platform}
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl p-6 border shadow-sm">
              <h3 className="text-lg font-bold mb-4">Recent Achievements</h3>
              <div className="space-y-4">
                {club.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-blue-500 pl-4 py-1"
                  >
                    <p className="font-medium">{achievement.title}</p>
                    <p className="text-sm text-gray-600">{achievement.date}</p>
                    <p className="text-sm mt-1">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="bg-gray-100 py-6 mt-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <Link
              to="/clubs"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to Clubs Gallery
            </Link>
            <div className="flex gap-6">
              <Link to="/faq" className="text-gray-600 hover:text-blue-600">
                FAQ
              </Link>
              <Link to="/help" className="text-gray-600 hover:text-blue-600">
                Help
              </Link>
              <a
                href="https://school-website.edu"
                className="text-gray-600 hover:text-blue-600"
              >
                School Homepage
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ClubProfilePage;
