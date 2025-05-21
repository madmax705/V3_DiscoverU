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
    id: "aquarist-club",
    name: "The Aquarist",
    category: "Academics",
    description:
      "Explore marine biology and aquatic ecosystems through hands-on projects and research.",
    meetingTimes: "Tuesdays, 3:30 PM",
    advisor: "Dr. Fisher",
    memberCount: 18,
    logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=aquarist",
    imageUrl:
      "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?ixlib=rb-4.0.3&q=85&w=800&h=600",
    tagline: "Dive into the fascinating world of aquatic life",
    mission:
      "To promote understanding and appreciation of aquatic ecosystems through education and hands-on experiences.",
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
    imageUrl:
      "https://images.unsplash.com/photo-1621628898826-8956e10449eb?ixlib=rb-4.0.3&q=85&w=800&h=600",
    tagline: "Harmonize your passion for music",
    mission:
      "To cultivate musical talent and provide performance opportunities for flute enthusiasts.",
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
    imageUrl:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&q=85&w=800&h=600",
    tagline: "Unlocking the power of language",
    mission:
      "To foster appreciation for linguistic diversity and promote understanding of language structures and evolution.",
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
    imageUrl:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&q=85&w=800&h=600",
    tagline: "Understanding the world through economic principles",
    mission:
      "To promote economic literacy and critical thinking about financial systems and policies.",
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
    imageUrl:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&q=85&w=800&h=600",
    tagline: "Supporting cancer awareness and research",
    mission:
      "To raise awareness about cancer prevention and support cancer research through community engagement and fundraising.",
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
    imageUrl:
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?ixlib=rb-4.0.3&q=85&w=800&h=600",
    tagline: "Exploring the fascinating world of reptiles",
    mission:
      "To promote understanding and conservation of reptiles through education and hands-on care experiences.",
  },
  {
    id: "theatre-team",
    name: "Theatre Team",
    category: "Creativity",
    description:
      "Produce and perform in theatrical productions throughout the school year.",
    meetingTimes: "Mondays & Wednesdays, 4:00 PM",
    advisor: "Ms. Stage",
    memberCount: 30,
    logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=theatre",
    imageUrl:
      "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?ixlib=rb-4.0.3&q=85&w=800&h=600",
    tagline: "Bringing stories to life on stage",
    mission:
      "To cultivate theatrical talent and provide opportunities for creative expression through performance arts.",
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
    imageUrl:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&q=85&w=800&h=600",
    tagline: "Building champions on and off the field",
    mission:
      "To develop athletic excellence, teamwork, and sportsmanship through competitive football.",
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
    imageUrl:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&q=85&w=800&h=600",
    tagline: "Shooting for excellence",
    mission:
      "To foster basketball skills, teamwork, and competitive spirit through training and competition.",
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
    imageUrl:
      "https://images.unsplash.com/photo-1592656094267-764a45160876?ixlib=rb-4.0.3&q=85&w=800&h=600",
    tagline: "Spiking our way to victory",
    mission:
      "To develop volleyball skills and promote teamwork through practice and competition.",
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
    imageUrl:
      "https://images.unsplash.com/photo-1573497491765-55a64cc0144c?ixlib=rb-4.0.3&q=85&w=800&h=600",
    tagline: "Developing tomorrow's business leaders",
    mission:
      "To cultivate professional communication skills and business acumen through practical experiences.",
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
    imageUrl:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&q=85&w=800&h=600",
    tagline: "Making math accessible and enjoyable",
    mission:
      "To support mathematical learning through peer tutoring and promote excellence in mathematics.",
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
    imageUrl:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&q=85&w=800&h=600",
    tagline: "Crafting words, shaping minds",
    mission:
      "To enhance English language skills and foster appreciation for literature through peer support and collaborative learning.",
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
    imageUrl:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&q=85&w=800&h=600",
    tagline: "Expressing creativity through visual arts",
    mission:
      "To provide opportunities for artistic expression and development through various mediums and exhibitions.",
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
    imageUrl:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&q=85&w=800&h=600",
    tagline: "Powering the school's digital future",
    mission:
      "To support the school's technology infrastructure and provide opportunities for students to develop technical skills.",
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
    imageUrl:
      "https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-4.0.3&q=85&w=800&h=600",
    tagline: "Telling our school's story through media",
    mission:
      "To document and share school events and achievements through various media channels.",
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
    imageUrl:
      "https://images.unsplash.com/photo-1586184059684-461bc7a3229c?ixlib=rb-4.0.3&q=85&w=800&h=600",
    tagline: "Broadcasting Grizzly pride to the world",
    mission:
      "To showcase school athletic events and achievements through quality video production and broadcasting.",
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
    imageUrl:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&q=85&w=800&h=600",
    tagline: "Creating a sustainable future",
    mission:
      "To promote environmental awareness and implement sustainable practices within our school and community.",
  },
  {
    id: "chess-club",
    name: "Chess Club",
    category: "Creativity",
    description:
      "Learn chess strategies and compete in tournaments with other schools.",
    meetingTimes: "Mondays & Wednesdays, 3:30 PM",
    advisor: "Dr. Knight",
    memberCount: 16,
    logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=chess",
    imageUrl:
      "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?ixlib=rb-4.0.3&q=85&w=800&h=600",
    tagline: "Developing strategic thinking through the royal game",
    mission:
      "To foster strategic thinking and competitive spirit through the game of chess, while building a community of passionate players.",
    // This is the club that already has detailed data in ClubProfilePage.tsx
    // We'll keep the existing detailed data for this club
  },
];

// Generate full club data for each club
export const allClubsData: Record<string, ClubData> = {};

// Add the existing chess club data first
allClubsData["chess-club"] = {
  id: "chess-club",
  name: "Chess Club",
  tagline: "Develop strategic thinking through the royal game",
  category: "Games & Recreation",
  bannerUrl:
    "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?ixlib=rb-4.0.3&q=85&w=1200",
  logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=chess",
  mission:
    "Our mission is to foster strategic thinking and competitive spirit through the game of chess, while building a community of passionate players.",
  description:
    "The Chess Club provides a welcoming environment for players of all skill levels to learn, practice, and compete. We offer regular training sessions, friendly matches, and opportunities to participate in interschool tournaments. Whether you're a beginner looking to learn the basics or an experienced player seeking challenging opponents, our club has something for everyone.",
  meetingTimes: "Mondays & Wednesdays, 3:30 PM - 5:00 PM",
  location: "Room 204, Student Center",
  advisor: "Dr. Knight",
  memberCount: 24,
  foundedYear: 2018,
  leaders: [
    {
      name: "Sarah Chen",
      role: "President",
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      email: "sarah.chen@school.edu",
    },
    {
      name: "Michael Wong",
      role: "Vice President",
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      email: "michael.wong@school.edu",
    },
    {
      name: "Dr. Knight",
      role: "Faculty Advisor",
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=smith",
      email: "dr.knight@school.edu",
    },
  ],
  upcomingEvents: [
    {
      title: "Beginner's Workshop",
      date: "June 15, 2024",
      time: "3:30 PM - 5:00 PM",
      location: "Room 204",
      description:
        "Learn the basics of chess, including piece movements, basic strategies, and common openings.",
    },
    {
      title: "Friendly Tournament",
      date: "June 22, 2024",
      time: "1:00 PM - 5:00 PM",
      location: "Student Center",
      description:
        "Participate in our monthly friendly tournament. Prizes for top three players!",
    },
    {
      title: "Advanced Strategy Session",
      date: "June 29, 2024",
      time: "3:30 PM - 5:00 PM",
      location: "Room 204",
      description:
        "Deep dive into advanced chess strategies and endgame techniques.",
    },
  ],
  galleryImages: [
    {
      url: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?ixlib=rb-4.0.3&q=85&w=600",
      caption: "Weekly club meeting",
    },
    {
      url: "https://images.unsplash.com/photo-1580541631971-a0e1263c5b34?ixlib=rb-4.0.3&q=85&w=600",
      caption: "Tournament finals",
    },
    {
      url: "https://images.unsplash.com/photo-1638167821652-ad45431d6f21?ixlib=rb-4.0.3&q=85&w=600",
      caption: "Chess workshop for beginners",
    },
    {
      url: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?ixlib=rb-4.0.3&q=85&w=600",
      caption: "Interschool competition",
    },
  ],
  testimonials: [
    {
      quote:
        "Joining the Chess Club has improved my critical thinking skills and introduced me to lifelong friends.",
      name: "Emma Liu",
      role: "Member since 2022",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    },
    {
      quote:
        "The supportive environment helped me go from a complete beginner to competing in tournaments within just one semester.",
      name: "Jason Park",
      role: "Member since 2023",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=jason",
    },
  ],
  socialLinks: [
    { platform: "Instagram", url: "#", icon: "instagram" },
    { platform: "Discord", url: "#", icon: "discord" },
    { platform: "WeChat Group", url: "#", icon: "wechat" },
  ],
  resources: [
    {
      title: "Club Handbook",
      description:
        "Everything you need to know about our club rules, expectations, and activities.",
      url: "#",
      type: "document",
    },
    {
      title: "Beginner's Guide to Chess",
      description: "A comprehensive guide for those new to the game.",
      url: "#",
      type: "document",
    },
    {
      title: "Chess.com",
      description: "Practice your skills online between meetings.",
      url: "https://chess.com",
      type: "link",
    },
  ],
  opportunities: [
    {
      title: "Tournament Organizer",
      description: "Help plan and run our monthly tournaments.",
      commitment: "3-5 hours per month",
    },
    {
      title: "Beginner's Coach",
      description: "Mentor new members and help them learn the basics.",
      commitment: "1-2 hours per week",
    },
  ],
  achievements: [
    {
      title: "District Championship",
      date: "May 2023",
      description: "First place in the district chess championship",
    },
    {
      title: "Regional Finalist",
      date: "November 2023",
      description: "Second place in the regional tournament",
    },
  ],
  imageUrl:
    "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?ixlib=rb-4.0.3&q=85&w=800&h=600",
};

// Add coding club
allClubsData["coding-club"] = {
  id: "coding-club",
  name: "Coding Club",
  tagline: "Building the future through code",
  category: "Creativity",
  bannerUrl:
    "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&q=85&w=1200",
  logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=coding",
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
      url: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&q=85&w=600",
      caption: "Club members working on a coding project",
    },
    {
      url: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&q=85&w=600",
      caption: "Our hackathon winners",
    },
    {
      url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&q=85&w=600",
      caption: "Learning web development",
    },
    {
      url: "https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?ixlib=rb-4.0.3&q=85&w=600",
      caption: "Pair programming session",
    },
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
