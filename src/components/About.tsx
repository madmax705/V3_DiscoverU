import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Mail } from "lucide-react";
import { Button } from "./ui/button";

interface TeamMember {
  name: string;
  role: string;
  email: string;
  caption: string;
  photoUrl: string;
}

const About = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Max Wang",
      role: "Founder & Lead Dev",
      email: "maxwang3016@gmail.com",
      caption:
        "Max Wang, 11th Grader. Passionate about community and innovation, believes that club participation fosters personal growth, learning, and lasting memories.",
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=maxwang",
    },
    {
      name: "Leo Zhou",
      role: "UI/UX Designer",
      email: "leo.zhou@school.edu",
      caption:
        "Leo brings creative design solutions to make the platform intuitive and engaging for all users.",
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=leozhou",
    },
    {
      name: "Johnny Gao",
      role: "Backend Developer",
      email: "johnny.gao@school.edu",
      caption:
        "Johnny ensures our platform runs smoothly behind the scenes with robust data management.",
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=johnnygao",
    },
    {
      name: "Mr. Marcopoulos",
      role: "Faculty Advisor",
      email: "mr.marcopoulos@school.edu",
      caption:
        "Providing guidance and support to help the student team bring their vision to life.",
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcopoulos",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-600">
            About DiscoverU
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting students with their passions through an innovative club
            discovery platform
          </p>
        </div>

        {/* About Us Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">About Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="h-48 bg-blue-50 flex items-center justify-center">
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="h-32 w-32"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">{member.caption}</p>
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    {member.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="mb-20 bg-blue-50 rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
            <p className="text-lg mb-6 leading-relaxed">
              At DiscoverU, our mission is to empower students to discover and
              engage with clubs and activities that align with their interests
              and passions. We believe that extracurricular involvement is a
              crucial part of student development, fostering skills,
              friendships, and memories that last a lifetime.
            </p>
            <p className="text-lg mb-10 leading-relaxed">
              We strive to create a platform that makes club discovery
              accessible, engaging, and personalized, helping every student find
              their community within our school.
            </p>

            <h3 className="text-2xl font-bold mb-6 text-center">
              Future Vision
            </h3>
            <p className="text-lg mb-6 leading-relaxed">
              Looking ahead, we envision DiscoverU evolving into a comprehensive
              platform that not only helps students discover clubs but also
              facilitates club management, event planning, and community
              building.
            </p>
            <p className="text-lg leading-relaxed">
              We aim to implement features such as personalized recommendations,
              attendance tracking, club achievements, and integration with
              school calendars to create a seamless experience for both students
              and club leaders.
            </p>
          </div>
        </section>

        {/* The Story Section */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p>
                DiscoverU was born from a simple observation: many students at
                SUIS Gubei were missing out on clubs and activities that could
                enrich their school experience, simply because they didn't know
                these opportunities existed.
              </p>
              <p>
                As a student who had benefited greatly from club participation,
                Max Wang recognized this gap and envisioned a solution. With the
                support of fellow students Leo Zhou and Johnny Gao, and under
                the guidance of Mr. Marcopoulos, the team set out to create a
                platform that would make club discovery intuitive and engaging.
              </p>
              <p>
                What started as a small project quickly evolved into a
                comprehensive platform designed to showcase the diverse range of
                clubs and activities available at our school. Through countless
                hours of coding, design iterations, and user testing, DiscoverU
                has grown into the platform you see today.
              </p>
              <p>
                Our journey is just beginning, and we're excited to continue
                developing DiscoverU to better serve our school community and
                potentially expand to other schools in the future.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-20">
          <h2 className="text-3xl font-bold mb-6">Join Us on This Journey</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We're always looking for feedback and ideas to improve DiscoverU and
            make it more valuable for our school community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="px-8">
              Contact Us
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Provide Feedback
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
