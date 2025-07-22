// Centralized data source for all clubs

export interface ClubEvent {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export interface Leader {
  name: string;
  role: string;
  photoUrl: string;
  email?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface Resource {
  title: string;
  description: string;
  url: string;
  type: "document" | "link" | "video";
}

export interface Opportunity {
  title: string;
  description: string;
  commitment: string;
}

export interface Achievement {
  title: string;
  date: string;
  description: string;
}

export interface GalleryImage {
  url: string;
  caption: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatarUrl: string;
}

export interface ClubData {
  id: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  bannerUrl: string;
  logoUrl: string;
  mission: string;
  meetingTimes: string;
  location: string;
  advisor: string;
  memberCount: number;
  foundedYear: number;
  leaders: Leader[];
  upcomingEvents: ClubEvent[];
  galleryImages: GalleryImage[];
  testimonials: Testimonial[];
  socialLinks: SocialLink[];
  resources: Resource[];
  opportunities: Opportunity[];
  achievements: Achievement[];
  imageUrl?: string; // For compatibility with ClubsPage
  bookmarked?: boolean; // Track if club is bookmarked
}

// Helper function to generate default data for a club
const generateDefaultClubData = (club: Partial<ClubData>): ClubData => {
  const id = club.id || "default-club";
  const name = club.name || "Default Club";
  const category = club.category || "Academics";

  return {
    id,
    name,
    tagline: club.tagline || `Explore the world of ${name}`,
    category,
    description:
      club.description ||
      `The ${name} provides a welcoming environment for students interested in ${category.toLowerCase()}.`,
    bannerUrl:
      club.bannerUrl ||
      club.imageUrl ||
      `https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?ixlib=rb-4.0.3&q=85&w=1200`,
    logoUrl:
      club.logoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
    mission:
      club.mission ||
      `Our mission is to foster a community of passionate individuals interested in ${category.toLowerCase()}.`,
    meetingTimes:
      club.meetingTimes || "Mondays & Wednesdays, 3:30 PM - 5:00 PM",
    location: club.location || "Room 204, Student Center",
    advisor: club.advisor || "Dr. Smith",
    memberCount: club.memberCount || 20,
    foundedYear: club.foundedYear || 2018,
    imageUrl: club.imageUrl,
    leaders: club.leaders || [
      {
        name: "Student Leader",
        role: "President",
        photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=leader-${id}`,
        email: "student.leader@school.edu",
      },
      {
        name: club.advisor || "Faculty Advisor",
        role: "Faculty Advisor",
        photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=advisor-${id}`,
        email: "faculty.advisor@school.edu",
      },
    ],
    upcomingEvents: club.upcomingEvents || [
      {
        title: "General Meeting",
        date: "June 15, 2024",
        time: "3:30 PM - 5:00 PM",
        location: "Room 204",
        description: `Join us for our regular ${name} meeting where we'll discuss upcoming events and activities.`,
      },
      {
        title: "Workshop",
        date: "June 22, 2024",
        time: "1:00 PM - 3:00 PM",
        location: "Student Center",
        description: `Learn new skills and techniques related to ${category.toLowerCase()}.`,
      },
    ],
    galleryImages: club.galleryImages || [
      {
        url:
          club.imageUrl ||
          `https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?ixlib=rb-4.0.3&q=85&w=600`,
        caption: "Club meeting",
      },
      {
        url: "https://images.unsplash.com/photo-1580541631971-a0e1263c5b34?ixlib=rb-4.0.3&q=85&w=600",
        caption: "Club activity",
      },
      {
        url: "https://images.unsplash.com/photo-1638167821652-ad45431d6f21?ixlib=rb-4.0.3&q=85&w=600",
        caption: "Club workshop",
      },
    ],
    testimonials: club.testimonials || [
      {
        quote: `Being part of the ${name} has been an amazing experience. I've learned so much and made great friends!`,
        name: "Student Member",
        role: "Member since 2022",
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=member1-${id}`,
      },
      {
        quote: `The ${name} has provided me with valuable skills and experiences that I'll carry with me throughout my academic career.`,
        name: "Another Member",
        role: "Member since 2023",
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=member2-${id}`,
      },
    ],
    socialLinks: club.socialLinks || [
      { platform: "Instagram", url: "#", icon: "instagram" },
      { platform: "Discord", url: "#", icon: "discord" },
    ],
    resources: club.resources || [
      {
        title: "Club Handbook",
        description:
          "Everything you need to know about our club rules, expectations, and activities.",
        url: "#",
        type: "document",
      },
      {
        title: `${category} Resources`,
        description: `Helpful resources related to ${category.toLowerCase()}.`,
        url: "#",
        type: "link",
      },
    ],
    opportunities: club.opportunities || [
      {
        title: "Event Organizer",
        description: "Help plan and run our events.",
        commitment: "3-5 hours per month",
      },
      {
        title: "New Member Mentor",
        description:
          "Mentor new members and help them get acclimated to the club.",
        commitment: "1-2 hours per week",
      },
    ],
    achievements: club.achievements || [
      {
        title: "School Recognition",
        date: "May 2023",
        description:
          "Recognized as an outstanding club by the school administration",
      },
    ],
  };
};

// Import club data from ClubsPage.tsx
const clubsFromPage = [
  {
    id: "the-aquarist",
    name: "The Aquarist",
    category: "Science",
    description:
      "The Aquarist Club is dedicated to exploring and understanding aquatic ecosystems. We study marine biology, freshwater systems, and aquarium science. Our activities include aquarium maintenance, fish breeding, water quality testing, and educational workshops about aquatic life.",
    meetingTimes: "Every Thursday, 4:00 PM",
    advisor: "Dr. Fisher",
    memberCount: 45,
    logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=aquarist",
    imageUrl: "/ClubBannerPhoto/TheAquarist.jpg",
    tagline: "Dive into the fascinating world of aquatic life",
    mission:
      "To foster appreciation and understanding of aquatic life through hands-on experience and scientific inquiry.",
    bannerUrl: "/ClubBannerPhoto/TheAquarist.jpg",
    coverUrl: "/ClubCoverPhotos/TheAquarist.jpg",
    galleryImages: [
      {
        url: "/ClubGalleryPhotos/TheAquarist1.jpg",
        caption: "Our main aquarium display",
      },
      {
        url: "/ClubGalleryPhotos/TheAquarist2.jpg",
        caption: "Water quality testing session",
      },
      {
        url: "/ClubGalleryPhotos/TheAquarist3.jpg",
        caption: "Marine biology workshop",
      },
      {
        url: "/ClubGalleryPhotos/TheAquarist4.jpg",
        caption: "Freshwater ecosystem study",
      },
    ],
  },
  {
    id: "flute-club",
    name: "Flute Club",
    category: "Creativity",
    description:
      "Develop your flute skills and perform in school concerts and community events.",
    meetingTimes: "Mondays & Wednesdays, 3:15 PM",
    advisor: "Ms. Melody",
    memberCount: 12,
    logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=flute",
    imageUrl: "/ClubBannerPhoto/FluteClub.jpg",
    tagline: "Harmonize your passion for music",
    mission:
      "To foster musical excellence and cultural appreciation through the art of flute playing.",
    bannerUrl: "/ClubBannerPhoto/FluteClub.jpg",
    coverUrl: "/ClubCoverPhotos/FluteClub.jpg",
    galleryImages: [
      {
        url: "/ClubGalleryPhotos/FluteClub1.jpg",
        caption: "Flute Club performance",
      },
      {
        url: "/ClubGalleryPhotos/FluteClub2.jpg",
        caption: "Flute Club practice session",
      },
      {
        url: "/ClubGalleryPhotos/FluteClub3.jpg",
        caption: "Flute Club concert",
      },
      {
        url: "/ClubGalleryPhotos/FluteClub4.jpg",
        caption: "Flute Club workshop",
      },
    ],
  },
  {
    id: "linguistics-club",
    name: "Linguistics Club",
    category: "Academics",
    description:
      "Explore the fascinating world of languages, their structures, and cultural contexts.",
    meetingTimes: "Thursdays, 3:30 PM",
    advisor: "Dr. Wordsmith",
    memberCount: 15,
    logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=linguistics",
    imageUrl: "/ClubBannerPhoto/LinguisticClub.jpg",
    tagline: "Unlocking the power of language",
    mission:
      "To explore and celebrate the diversity of languages and cultures through interactive learning and cultural exchange.",
    bannerUrl: "/ClubBannerPhoto/LinguisticClub.jpg",
    coverUrl: "/ClubCoverPhotos/LinguisticClub.jpg",
    galleryImages: [
      {
        url: "/ClubGalleryPhotos/LinguisticClub1.jpg",
        caption: "Language workshop",
      },
      {
        url: "/ClubGalleryPhotos/LinguisticClub2.jpg",
        caption: "Cultural exchange event",
      },
      {
        url: "/ClubGalleryPhotos/LinguisticClub3.jpg",
        caption: "Language learning session",
      },
      {
        url: "/ClubGalleryPhotos/LinguisticClub4.jpg",
        caption: "Intercultural dialogue",
      },
    ],
  },
  {
    id: "economics-society",
    name: "Economics Society",
    category: "Academics",
    description:
      "Discuss economic theories, current events, and participate in economics competitions.",
    meetingTimes: "Wednesdays, 4:00 PM",
    advisor: "Mr. Keynes",
    memberCount: 20,
    logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=economics",
    imageUrl: "/ClubBannerPhoto/EconomicSociety.jpg",
    tagline: "Understanding the world through economic principles",
    mission:
      "To foster understanding of economic principles and their real-world applications through discussion and analysis.",
    bannerUrl: "/ClubBannerPhoto/EconomicSociety.jpg",
    coverUrl: "/ClubCoverPhotos/EconomicSociety.jpg",
    galleryImages: [
      {
        url: "/ClubGalleryPhotos/EconomicSociety1.jpg",
        caption: "Economics Society meeting",
      },
      {
        url: "/ClubGalleryPhotos/EconomicSociety2.jpg",
        caption: "Economics Society discussion",
      },
      {
        url: "/ClubGalleryPhotos/EconomicSociety3.jpg",
        caption: "Economics Society workshop",
      },
      {
        url: "/ClubGalleryPhotos/EconomicSociety4.jpg",
        caption: "Economics Society competition",
      },
    ],
  },
  {
    id: "cancer-club",
    name: "Cancer Club",
    category: "Service",
    description:
      "Raise awareness about cancer prevention and support cancer research through fundraising.",
    meetingTimes: "Fridays, 3:00 PM",
    advisor: "Ms. Hope",
    memberCount: 25,
    logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=cancer",
    imageUrl: "/ClubBannerPhoto/CancerClub.jpg",
    tagline: "Supporting cancer awareness and research",
    mission:
      "To raise awareness about cancer prevention and support those affected by cancer through education and community service.",
    bannerUrl: "/ClubBannerPhoto/CancerClub.jpg",
    coverUrl: "/ClubCoverPhotos/CancerClub.jpg",
    galleryImages: [
      {
        url: "/ClubGalleryPhotos/CancerClub1.jpg",
        caption: "Cancer Club fundraiser"
      },
      {
        url: "/ClubGalleryPhotos/CancerClub2.jpg",
        caption: "Cancer Club awareness event"
      },
      {
        url: "/ClubGalleryPhotos/CancerClub3.jpg",
        caption: "Cancer Club workshop"
      },
      {
        url: "/ClubGalleryPhotos/CancerClub4.jpg",
        caption: "Cancer Club community service"
      }
    ],
  },
  {
    id: "reptile-club",
    name: "Reptile Club",
    category: "Service",
    description:
      "Learn about reptile conservation and care for the school's collection of reptiles.",
    meetingTimes: "Tuesdays & Thursdays, 3:30 PM",
    advisor: "Mr. Scales",
    memberCount: 14,
    logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=reptile",
    imageUrl: "/ClubBannerPhoto/ReptileClub.jpg",
    tagline: "Exploring the fascinating world of reptiles",
    mission:
      "To promote understanding and appreciation of reptiles through education and hands-on experiences.",
    bannerUrl: "/ClubBannerPhoto/ReptileClub.jpg",
    coverUrl: "/ClubCoverPhotos/ReptileClub.jpg",
    galleryImages: [
      {
        url: "/ClubGalleryPhotos/ReptileClub1.jpg",
        caption: "Reptile Club meeting"
      },
      {
        url: "/ClubGalleryPhotos/ReptileClub2.jpg",
        caption: "Reptile Club activity"
      },
      {
        url: "/ClubGalleryPhotos/ReptileClub3.jpg",
        caption: "Reptile Club workshop"
      },
      {
        url: "/ClubGalleryPhotos/ReptileClub4.jpg",
        caption: "Reptile Club field trip"
      }
    ],
  },
  {
    id: "theatre-team",
    name: "Theatre Team",
    tagline: "Breaking Brilliance - Student-led Theatre Collective",
    description:
      "Founded by Thomas Chen in September 2024.",
    category: "Arts",
    foundedYear: 2024,
    memberCount: 25,
    meetingTimes: "Rehearsal session may vary",
    location: "Drama Studio",
    advisor: "Thomas Chen",
    mission:
      "Theatre Team, also known as Breaking Brilliance, is the first student-led theatre collective at SUIS Gubei Campus. Created to explore bold, original, and daring performance work — driven entirely by students — the collective now boasts a growing cast of 25 members.",
    bannerUrl: "/ClubBannerPhoto/TheatreTeam.jpg",
    coverUrl: "/ClubCoverPhotos/TheatreTeam.jpg",
    imageUrl: "/ClubBannerPhoto/TheatreTeam.jpg",
    galleryImages: [
      {
        url: "/ClubGalleryPhotos/TheatreTeam1.jpg",
        caption: "Theatre Team performance"
      },
      {
        url: "/ClubGalleryPhotos/TheatreTeam2.jpg",
        caption: "Theatre Team rehearsal"
      },
      {
        url: "/ClubGalleryPhotos/TheatreTeam3.jpg",
        caption: "Theatre Team workshop"
      },
      {
        url: "/ClubGalleryPhotos/TheatreTeam4.jpg",
        caption: "Theatre Team team photo"
      }
    ],
    leaders: [
      {
        name: "Thomas Chen",
        role: "Founder & Director",
        photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=thomas",
        email: "thomaschen410@outlook.com",
      },
    ],
    upcomingEvents: [
      {
        title: "Auditions for New Members",
        date: "September 2025",
        time: "TBD",
        location: "Drama Studio",
        description: "Auditions for new members joining the Theatre Team.",
      },
    ],
    testimonials: [
      {
        quote: "Breaking Brilliance has been an incredible journey of artistic exploration and growth.",
        name: "Thomas Chen",
        role: "Founder & Director",
        avatarUrl: "/Characters/character_6.png",
      },
    ],
    socialLinks: [
      { platform: "Instagram", url: "#", icon: "instagram" },
    ],
    resources: [
      {
        title: "SE7EN Production Guide",
        description: "Documentation of our first original production 'SE7EN'.",
        url: "#",
        type: "document" as const,
      },
      {
        title: "Treason's Edge Production Guide",
        description: "Documentation of our second original production 'Treason's Edge'.",
        url: "#",
        type: "document" as const,
      },
    ],
    opportunities: [
      {
        title: "Audition for New Members",
        description: "Join our growing collective of student performers.",
        commitment: "Varies by role",
      },
    ],
    achievements: [
      {
        title: "First Original Production - SE7EN",
        date: "2024",
        description: "Debut of our first original production",
      },
      {
        title: "Second Original Production - Treason's Edge",
        date: "2024",
        description: "Successfully staged our second original production",
      },
    ],
  },
  {
    id: "football-team",
    name: "Football Team",
    category: "Sports",
    description:
      "Compete in interscholastic football tournaments and develop teamwork skills.",
    meetingTimes: "Mondays, Wednesdays & Fridays, 4:00 PM",
    advisor: "Coach Wilson",
    memberCount: 35,
    logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=football",
    imageUrl: "/ClubBannerPhoto/FootballTeam.jpg",
    tagline: "Building champions on and off the field",
    mission:
      "To develop athletic excellence, teamwork, and sportsmanship through competitive football.",
    bannerUrl: "/ClubBannerPhoto/FootballTeam.jpg",
    coverUrl: "/ClubCoverPhotos/FootballTeam.jpg",
    galleryImages: [
      {
        url: "/ClubGalleryPhotos/FootballTeam1.jpg",
        caption: "Football Team practice session",
      },
      {
        url: "/ClubGalleryPhotos/FootballTeam2.jpg",
        caption: "Football Team game",
      },
      {
        url: "/ClubGalleryPhotos/FootballTeam3.jpg",
        caption: "Football Team celebration",
      },
      {
        url: "/ClubGalleryPhotos/FootballTeam4.jpg",
        caption: "Football Team team photo",
      },
    ],
  },
  {
    id: "basketball-team",
    name: "Basketball Team",
    category: "Sports",
    description:
      "Join our competitive basketball team and develop your skills on the court.",
    meetingTimes: "Tuesdays & Thursdays, 4:00 PM",
    advisor: "Coach Johnson",
    memberCount: 24,
    logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=basketball",
    imageUrl: "/ClubBannerPhoto/BasketballTeam.jpg",
    tagline: "Shooting for excellence",
    mission:
      "To develop basketball skills, teamwork, and competitive spirit while promoting sportsmanship.",
    bannerUrl: "/ClubBannerPhoto/BasketballTeam.jpg",
    coverUrl: "/ClubCoverPhotos/BasketballTeam.jpg",
    galleryImages: [
      {
        url: "/ClubGalleryPhotos/BasketballTeam1.jpg",
        caption: "Basketball Team practice session",
      },
      {
        url: "/ClubGalleryPhotos/BasketballTeam2.jpg",
        caption: "Basketball Team game",
      },
      {
        url: "/ClubGalleryPhotos/BasketballTeam3.jpg",
        caption: "Basketball Team celebration",
      },
      {
        url: "/ClubGalleryPhotos/BasketballTeam4.jpg",
        caption: "Basketball Team team photo",
      },
    ],
  },
  {
    id: "volleyball-team",
    name: "Volleyball Team",
    category: "Sports",
    description:
      "Develop volleyball skills and compete in tournaments throughout the school year.",
    meetingTimes: "Mondays & Wednesdays, 3:30 PM",
    advisor: "Coach Smith",
    memberCount: 18,
    logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=volleyball",
    imageUrl: "/ClubBannerPhoto/VolleyballTeam.jpg",
    tagline: "Spiking our way to victory",
    mission:
      "To develop volleyball skills, teamwork, and competitive spirit while promoting sportsmanship.",
    bannerUrl: "/ClubBannerPhoto/VolleyballTeam.jpg",
    coverUrl: "/ClubCoverPhotos/VolleyballTeam.jpg",
    galleryImages: [
      {
        url: "/ClubGalleryPhotos/VolleyballTeam1.jpg",
        caption: "Volleyball Team practice session",
      },
      {
        url: "/ClubGalleryPhotos/VolleyballTeam2.jpg",
        caption: "Volleyball Team game",
      },
      {
        url: "/ClubGalleryPhotos/VolleyballTeam3.jpg",
        caption: "Volleyball Team celebration",
      },
      {
        url: "/ClubGalleryPhotos/VolleyballTeam4.jpg",
        caption: "Volleyball Team team photo",
      },
    ],
  },
  {
    id: "bpc-club",
    name: "BPC Club",
    category: "Academics",
    description:
      "Business and professional communication skills development through workshops and competitions.",
    meetingTimes: "Fridays, 3:15 PM",
    advisor: "Ms. Business",
    memberCount: 22,
    logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=bpc",
    imageUrl: "/ClubBannerPhoto/BPCClub.jpg",
    tagline: "Developing tomorrow's business leaders",
    mission:
      "To develop business and professional skills through real-world projects and networking opportunities.",
    bannerUrl: "/ClubBannerPhoto/BPCClub.jpg",
    coverUrl: "/ClubCoverPhotos/BPCClub.jpg",
    galleryImages: [
      {
        url: "/ClubGalleryPhotos/BPCClub1.jpg",
        caption: "BPC Club meeting",
      },
      {
        url: "/ClubGalleryPhotos/BPCClub2.jpg",
        caption: "BPC Club workshop",
      },
      {
        url: "/ClubGalleryPhotos/BPCClub3.jpg",
        caption: "BPC Club competition",
      },
      {
        url: "/ClubGalleryPhotos/BPCClub4.jpg",
        caption: "BPC Club networking event",
      },
    ],
  },
  {
    id: "math-clinic",
    name: "Math Clinic",
    category: "Academics",
    description:
      "Provide peer tutoring in mathematics and prepare for math competitions.",
    meetingTimes: "Tuesdays & Thursdays, 3:15 PM",
    advisor: "Dr. Calculus",
    memberCount: 16,
    logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=math",
    imageUrl: "/ClubBannerPhoto/MathClinic.jpg",
    tagline: "Making math accessible and enjoyable",
    mission:
      "To provide peer tutoring and support in mathematics, helping students build confidence and improve their skills.",
    bannerUrl: "/ClubBannerPhoto/MathClinic.jpg",
    coverUrl: "/ClubCoverPhotos/MathClinic.jpg",
    galleryImages: [
      {
        url: "/ClubGalleryPhotos/MathClinic1.jpg",
        caption: "Math Clinic tutoring session",
      },
      {
        url: "/ClubGalleryPhotos/MathClinic2.jpg",
        caption: "Math Clinic practice session",
      },
      {
        url: "/ClubGalleryPhotos/MathClinic3.jpg",
        caption: "Math Clinic competition",
      },
      {
        url: "/ClubGalleryPhotos/MathClinic4.jpg",
        caption: "Math Clinic community service",
      },
    ],
  },
  {
    id: "english-clinic",
    name: "English Clinic",
    category: "Academic",
    description:
      "Improve writing skills and provide peer tutoring for English language and literature.",
    meetingTimes: "Mondays & Wednesdays, 3:15 PM",
    advisor: "Ms. Wordsworth",
    memberCount: 14,
    logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=english",
    imageUrl: "/ClubBannerPhoto/EnglishClinic.jpg",
    tagline: "Crafting words, shaping minds",
    mission:
      "To provide peer tutoring and support in English, helping students improve their reading, writing, and communication skills.",
    bannerUrl: "/ClubBannerPhoto/EnglishClinic.jpg",
    coverUrl: "/ClubCoverPhotos/EnglishClinic.jpg",
    galleryImages: [
      {
        url: "/ClubGalleryPhotos/EnglishClinic1.jpg",
        caption: "English Clinic tutoring session",
      },
      {
        url: "/ClubGalleryPhotos/EnglishClinic2.jpg",
        caption: "English Clinic practice session",
      },
      {
        url: "/ClubGalleryPhotos/EnglishClinic3.jpg",
        caption: "English Clinic competition",
      },
      {
        url: "/ClubGalleryPhotos/EnglishClinic4.jpg",
        caption: "English Clinic community service",
      },
    ],
  },
  {
    id: "art-team",
    name: "Art Team",
    category: "Creativity",
    description:
      "Create artwork for school events and showcase your artistic talents in exhibitions.",
    meetingTimes: "Wednesdays, 3:30 PM",
    advisor: "Ms. Picasso",
    memberCount: 20,
    logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=art",
    imageUrl: "/ClubBannerPhoto/ArtTeam.jpg",
    tagline: "Expressing creativity through visual arts",
    mission:
      "To foster creativity and artistic expression through various forms of visual art.",
    bannerUrl: "/ClubBannerPhoto/ArtTeam.jpg",
    coverUrl: "/ClubCoverPhotos/ArtTeam.jpg",
    galleryImages: [
      {
        url: "/ClubGalleryPhotos/ArtTeam1.jpg",
        caption: "Art Team exhibition",
      },
      {
        url: "/ClubGalleryPhotos/ArtTeam2.jpg",
        caption: "Art Team workshop",
      },
      {
        url: "/ClubGalleryPhotos/ArtTeam3.jpg",
        caption: "Art Team collaboration",
      },
      {
        url: "/ClubGalleryPhotos/ArtTeam4.jpg",
        caption: "Art Team community service",
      },
    ],
  },
  {
    id: "tech-team",
    name: "Tech Team",
    category: "Service",
    description:
      "Support school technology needs and develop technical skills through hands-on projects.",
    meetingTimes: "Tuesdays & Thursdays, 3:30 PM",
    advisor: "Mr. Tech",
    memberCount: 18,
    logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=tech",
    imageUrl: "/ClubBannerPhoto/TechTeam.jpg",
    tagline: "Powering the school's digital future",
    mission:
      "To provide technical support and promote technology literacy within the school community.",
    bannerUrl: "/ClubBannerPhoto/TechTeam.jpg",
    coverUrl: "/ClubCoverPhotos/TechTeam.jpg",
    galleryImages: [
      {
        url: "/ClubGalleryPhotos/TechTeam1.jpg",
        caption: "Tech Team project",
      },
      {
        url: "/ClubGalleryPhotos/TechTeam2.jpg",
        caption: "Tech Team workshop",
      },
      {
        url: "/ClubGalleryPhotos/TechTeam3.jpg",
        caption: "Tech Team collaboration",
      },
      {
        url: "/ClubGalleryPhotos/TechTeam4.jpg",
        caption: "Tech Team community service",
      },
    ],
  },
  {
    id: "media-team",
    name: "Media Team",
    category: "Service",
    description:
      "Create and manage media content for school events and social media channels.",
    meetingTimes: "Mondays & Fridays, 3:15 PM",
    advisor: "Ms. Media",
    memberCount: 15,
    logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=media",
    imageUrl: "/ClubBannerPhoto/MediaTeam.jpg",
    tagline: "Telling our school's story through media",
    mission:
      "To develop media production skills and create engaging content for the school community.",
    bannerUrl: "/ClubBannerPhoto/MediaTeam.jpg",
    coverUrl: "/ClubCoverPhotos/MediaTeam.jpg",
    galleryImages: [
      {
        url: "/ClubGalleryPhotos/MediaTeam1.jpg",
        caption: "Media Team project",
      },
      {
        url: "/ClubGalleryPhotos/MediaTeam2.jpg",
        caption: "Media Team workshop",
      },
      {
        url: "/ClubGalleryPhotos/MediaTeam3.jpg",
        caption: "Media Team collaboration",
      },
      {
        url: "/ClubGalleryPhotos/MediaTeam4.jpg",
        caption: "Media Team community service",
      },
    ],
  },
  {
    id: "grizzlies-tv",
    name: "Grizzlies TV",
    category: "Sports",
    description:
      "Broadcast school sports events and create video content highlighting athletic achievements.",
    meetingTimes: "Wednesdays & Game Days",
    advisor: "Mr. Broadcast",
    memberCount: 12,
    logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=grizzlies",
    imageUrl: "/ClubBannerPhoto/GrizzliesTV.JPG",
    tagline: "Broadcasting Grizzly pride to the world",
    mission:
      "To provide hands-on experience in video production and broadcasting while creating engaging content for the school community.",
    bannerUrl: "/ClubBannerPhoto/GrizzliesTV.JPG",
    coverUrl: "/ClubCoverPhotos/GrizzliesTV.JPG",
    galleryImages: [
      {
        url: "/ClubGalleryPhotos/GrizzliesTV1.png",
        caption: "Grizzlies TV production",
      },
      {
        url: "/ClubGalleryPhotos/GrizzliesTV2.png",
        caption: "Grizzlies TV editing session",
      },
      {
        url: "/ClubGalleryPhotos/GrizzliesTV3.png",
        caption: "Grizzlies TV broadcast",
      },
      {
        url: "/ClubGalleryPhotos/GrizzliesTV4.png",
        caption: "Grizzlies TV interview",
      },
    ],
  },
  {
    id: "eco-club",
    name: "Eco Club",
    category: "Service",
    description:
      "Promote environmental awareness and sustainability through campus initiatives.",
    meetingTimes: "Fridays, 3:00 PM",
    advisor: "Ms. Green",
    memberCount: 22,
    logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=eco",
    imageUrl: "/ClubBannerPhoto/EcoClub.jpg",
    tagline: "Creating a sustainable future",
    mission:
      "To promote environmental awareness and sustainability through education and action.",
    bannerUrl: "/ClubBannerPhoto/EcoClub.jpg",
    coverUrl: "/ClubCoverPhotos/EcoClub.jpg",
    galleryImages: [
      {
        url: "/ClubGalleryPhotos/EcoClub1.jpg",
        caption: "Eco Club meeting"
      },
      {
        url: "/ClubGalleryPhotos/EcoClub2.jpg",
        caption: "Eco Club workshop"
      },
      {
        url: "/ClubGalleryPhotos/EcoClub3.jpg",
        caption: "Eco Club competition"
      },
      {
        url: "/ClubGalleryPhotos/EcoClub4.jpg",
        caption: "Eco Club community service"
      }
    ],
  },
];

// Generate full club data for each club
export const allClubsData: Record<string, ClubData> = {};

// Add the existing chess club data first
allClubsData["chess-club"] = {
  id: "chess-club",
  name: "Chess Club",
  tagline: "Master the game of kings",
  description:
    "The Chess Club provides a welcoming environment for students of all skill levels to learn, practice, and compete in chess. We focus on strategic thinking, problem-solving, and friendly competition.",
  category: "Games & Recreation",
  foundedYear: 2018,
  memberCount: 24,
  meetingTimes: "Mondays & Wednesdays, 3:30 PM",
  location: "Room 204, Student Center",
  advisor: "Dr. Knight",
  mission:
    "To foster strategic thinking and competitive spirit through the game of chess, while building a community of passionate players.",
  bannerUrl: "/ClubBannerPhoto/ChessClub.jpg",
  logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=chess",
  imageUrl: "/ClubBannerPhoto/ChessClub.jpg",
  galleryImages: [
    {
      url: "/ClubGalleryPhotos/ChessClub1.jpg",
      caption: "Weekly chess tournament"
    },
    {
      url: "/ClubGalleryPhotos/ChessClub2.jpg",
      caption: "Strategy workshop"
    },
    {
      url: "/ClubGalleryPhotos/ChessClub3.jpg",
      caption: "Team practice session"
    },
    {
      url: "/ClubGalleryPhotos/ChessClub4.jpg",
      caption: "Inter-school competition"
    }
  ],
  leaders: [
    {
      name: "Sarah Chen",
      role: "President",
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      email: "sarah.chen@school.edu"
    },
    {
      name: "Dr. Knight",
      role: "Faculty Advisor",
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=knight",
      email: "dr.knight@school.edu"
    }
  ],
  upcomingEvents: [
    {
      title: "Weekly Tournament",
      date: "June 15, 2024",
      time: "3:30 PM - 5:00 PM",
      location: "Room 204",
      description: "Join us for our weekly chess tournament. All skill levels welcome!"
    },
    {
      title: "Strategy Workshop",
      date: "June 22, 2024",
      time: "1:00 PM - 3:00 PM",
      location: "Student Center",
      description: "Learn advanced chess strategies and tactics."
    }
  ],
  testimonials: [
    {
      quote: "The Chess Club has helped me develop my strategic thinking and make great friends.",
      name: "Alex Johnson",
      role: "Member since 2022",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
    },
    {
      quote: "A welcoming community for chess enthusiasts of all levels.",
      name: "Maria Garcia",
      role: "Member since 2023",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria"
    }
  ],
  socialLinks: [
    { platform: "Instagram", url: "#", icon: "instagram" },
    { platform: "Discord", url: "#", icon: "discord" }
  ],
  resources: [
    {
      title: "Chess Strategy Guide",
      description: "Comprehensive guide to chess strategies and tactics.",
      url: "#",
      type: "document"
    },
    {
      title: "Online Chess Resources",
      description: "Links to helpful chess learning resources.",
      url: "#",
      type: "link"
    }
  ],
  opportunities: [
    {
      title: "Tournament Organizer",
      description: "Help organize and run chess tournaments.",
      commitment: "2-3 hours per week"
    },
    {
      title: "Beginner Mentor",
      description: "Mentor new members in learning chess basics.",
      commitment: "1-2 hours per week"
    }
  ],
  achievements: [
    {
      title: "State Championship",
      date: "December 2023",
      description: "First place in the state collegiate chess championship"
    }
  ]
};

// Add coding club
allClubsData["coding-club"] = {
  id: "coding-club",
  name: "Coding Club",
  tagline: "Building the future through code",
  category: "Creativity",
  bannerUrl:
    "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&q=85&w=1200",
  logoUrl: "/ClubLogos/CodingClub.png",
  mission:
    "Our mission is to foster computational thinking and programming skills while building a supportive community of young developers.",
  description:
    "The Coding Club provides a collaborative environment for students interested in computer science and programming. We offer workshops, hackathons, and project-based learning opportunities for all skill levels. Whether you're a complete beginner or an experienced coder, our club welcomes everyone who wants to explore the world of programming.",
  meetingTimes: "Tuesdays & Thursdays, 4:00 PM - 5:30 PM",
  location: "Room 301, Computer Lab",
  advisor: "Ms. Zhang",
  memberCount: 28,
  foundedYear: 2019,
  leaders: [
    {
      name: "Max Wang",
      role: "President",
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=maxwang",
      email: "maxwang3016@gmail.com",
    },
    {
      name: "Leo Zhou",
      role: "President",
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=leozhou",
      email: "leo.zhou@school.edu",
    },
    {
      name: "Johnny Gao",
      role: "President",
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=johnnygao",
      email: "johnny.gao@school.edu",
    },
    {
      name: "Mr. Marcopoulos",
      role: "Faculty Advisor",
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcopoulos",
      email: "mr.marcopoulos@school.edu",
    },
  ],
  upcomingEvents: [
    {
      title: "Intro to Web Development",
      date: "June 18, 2024",
      time: "4:00 PM - 5:30 PM",
      location: "Room 301",
      description:
        "Learn the basics of HTML, CSS, and JavaScript to build your first website.",
    },
    {
      title: "Mini Hackathon",
      date: "June 25, 2024",
      time: "3:00 PM - 7:00 PM",
      location: "Student Center",
      description:
        "Team up and build a project in just 4 hours! Prizes for the most creative solutions.",
    },
    {
      title: "Python for Data Science",
      date: "July 2, 2024",
      time: "4:00 PM - 5:30 PM",
      location: "Room 301",
      description:
        "Introduction to data analysis and visualization using Python libraries.",
    },
  ],
  galleryImages: [
    {
      url: "/ClubGalleryPhotos/CodingClub1.png",
      caption: "Coding Club workshop"
    },
    {
      url: "/ClubGalleryPhotos/CodingClub2.png",
      caption: "Coding Club hackathon"
    },
    {
      url: "/ClubGalleryPhotos/CodingClub3.png",
      caption: "Coding Club competition"
    },
    {
      url: "/ClubGalleryPhotos/CodingClub4.png",
      caption: "Coding Club project showcase"
    }
  ],
  testimonials: [
    {
      quote:
        "Joining the Coding Club has helped me discover my passion for programming and given me skills I'll use throughout my career.",
      name: "Ryan Kim",
      role: "Member since 2022",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ryan",
    },
    {
      quote:
        "I came in knowing nothing about coding, and now I'm building my own apps. The supportive environment makes learning fun!",
      name: "Mei Lin",
      role: "Member since 2023",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=mei",
    },
  ],
  socialLinks: [
    { platform: "GitHub", url: "#", icon: "github" },
    { platform: "Discord", url: "#", icon: "discord" },
    { platform: "WeChat Group", url: "#", icon: "wechat" },
  ],
  resources: [
    {
      title: "Beginner's Coding Resources",
      description:
        "A collection of tutorials, exercises, and documentation for those new to programming.",
      url: "#",
      type: "document",
    },
    {
      title: "Project Repository",
      description:
        "Access our GitHub organization with all club projects and code samples.",
      url: "#",
      type: "link",
    },
    {
      title: "Learning Path Guide",
      description:
        "Structured learning paths for different programming interests and career goals.",
      url: "#",
      type: "document",
    },
  ],
  opportunities: [
    {
      title: "Workshop Leader",
      description:
        "Plan and lead coding workshops on topics you're passionate about.",
      commitment: "2-3 hours per month",
    },
    {
      title: "Mentorship Program",
      description:
        "Help new members learn programming fundamentals and work through challenges.",
      commitment: "1-2 hours per week",
    },
    {
      title: "Hackathon Organizer",
      description: "Join the team planning our termly hackathon events.",
      commitment: "5-10 hours per term",
    },
  ],
  achievements: [
    {
      title: "Regional Coding Competition",
      date: "April 2024",
      description: "First place in the regional high school coding competition",
    },
    {
      title: "App Development Award",
      date: "December 2023",
      description:
        "Recognition for student-developed mobile app to support campus sustainability",
    },
  ],
  imageUrl:
    "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&q=85&w=800&h=600",
};

// Add Reptile Club
allClubsData["reptile-club"] = {
  id: "reptile-club",
  name: "Reptile Club",
  tagline: "Exploring the fascinating world of reptiles",
  description:
    "The Reptile Club is dedicated to learning about and caring for reptiles. We study different species, their habitats, and proper care techniques. Our activities include reptile handling sessions, educational workshops, and field trips to reptile exhibits.",
  category: "Science",
  foundedYear: 2019,
  memberCount: 14,
  meetingTimes: "Every Wednesday, 3:30 PM",
  location: "Room 105, Science Building",
  advisor: "Dr. Scales",
  mission:
    "To promote understanding and appreciation of reptiles through education and hands-on experiences.",
  bannerUrl: "/ClubBannerPhoto/ReptileClub.jpg",
  logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=reptile",
  imageUrl: "/ClubBannerPhoto/ReptileClub.jpg",
  galleryImages: [
    {
      url: "/ClubGalleryPhotos/ReptileClub1.jpg",
      caption: "Reptile Club meeting"
    },
    {
      url: "/ClubGalleryPhotos/ReptileClub2.jpg",
      caption: "Reptile Club activity"
    },
    {
      url: "/ClubGalleryPhotos/ReptileClub3.jpg",
      caption: "Reptile Club workshop"
    },
    {
      url: "/ClubGalleryPhotos/ReptileClub4.jpg",
      caption: "Reptile Club field trip"
    }
  ],
  leaders: [
    {
      name: "Dr. Scales",
      role: "Faculty Advisor",
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=scales",
      email: "dr.scales@school.edu",
    },
  ],
  upcomingEvents: [
    {
      title: "Reptile Handling Workshop",
      date: "June 20, 2024",
      time: "3:30 PM - 5:00 PM",
      location: "Room 105",
      description: "Learn proper handling techniques for different reptile species.",
    },
  ],
  testimonials: [
    {
      quote: "The Reptile Club has given me a deeper appreciation for these amazing creatures and their role in our ecosystem.",
      name: "Alex Thompson",
      role: "Member since 2022",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    },
  ],
  socialLinks: [
    { platform: "Instagram", url: "#", icon: "instagram" },
    { platform: "Discord", url: "#", icon: "discord" },
  ],
  resources: [
    {
      title: "Reptile Care Guide",
      description: "Comprehensive guide to reptile care and handling.",
      url: "#",
      type: "document" as const,
    },
  ],
  opportunities: [
    {
      title: "Reptile Care Assistant",
      description: "Help maintain and care for our reptile collection.",
      commitment: "2-3 hours per week",
    },
  ],
  achievements: [
    {
      title: "Educational Excellence Award",
      date: "May 2023",
      description: "Recognized for outstanding educational programs about reptiles",
    },
  ],
};

// Generate data for all other clubs
clubsFromPage.forEach((club) => {
  if (club.id !== "chess-club") {
    // Skip chess club as we already added it
    allClubsData[club.id] = generateDefaultClubData(club);
  }
});

// Export a list of all clubs for use in ClubsPage
export const allClubsList = Object.values(allClubsData).map((club) => ({
  id: club.id,
  name: club.name,
  category: club.category,
  description: club.description,
  meetingTimes: club.meetingTimes,
  advisor: club.advisor,
  memberCount: club.memberCount,
  logoUrl: club.logoUrl,
  imageUrl: club.imageUrl || club.bannerUrl,
}));
