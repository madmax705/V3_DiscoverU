import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ArrowRight, Target, Search, Camera, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Parallax } from "react-scroll-parallax";

const About = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
      },
    },
  };

  // Blob animation variants
  const blobAnimation = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const [showFullStory, setShowFullStory] = useState(false);

  const toggleFullStory = () => {
    setShowFullStory(!showFullStory);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative py-24 md:py-36 bg-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Example Shape 1: Large circle */}
            <Parallax speed={-10}>
              <motion.div className="absolute top-[5%] left-[5%] w-64 h-64 bg-blue-400 rounded-full" variants={blobAnimation} animate="animate"></motion.div>
            </Parallax>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24">
              <motion.div
                className="md:w-1/2 text-left"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                  About DiscoverU
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
                  DiscoverU is a digital hub that catalogs every club in SUIS Gubei, making it effortless to explore activities, see meeting details, and join with a click.
                </p>
              </motion.div>

              <motion.div
                className="md:w-1/2 relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative">

                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&q=85&w=1200&h=800"
                    alt="DiscoverU Team"
                    className="rounded-lg shadow-xl relative z-10 w-full h-auto object-cover"
                  />
                </div>

              </motion.div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="mt-12 pt-8 pb-16 md:mt-24 md:pt-12 md:pb-24 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl md:text-6xl font-bold mb-24 mt-16 text-center">Meet our Team</h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <motion.div
                className="md:w-1/2 relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative">
                  <div className="rounded-full overflow-hidden w-[480px] h-[480px] border-8 border-white/20 shadow-2xl mx-auto">
                    <img
                      src="https://discoveru.club/wp-content/uploads/2024/12/eb152d858de7edf2a9c0bb8bb1cebb1d-edited.jpg"
                      alt="Max Wang"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="md:w-1/2 text-left"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Max Wang</h2>
                <p className="text-2xl font-semibold text-white/90 mb-6">
                  Founder & Lead Front-end Developer
                </p>
                <p className="text-lg text-white/90 leading-relaxed mb-8">
                  A Grade 11 student at SUIS Gubei, Max is passionate about community and innovation. As the founder and lead front-end developer of DiscoverU, he built this platform to help every student—especially freshmen—easily discover and join clubs and ECAs that ignite their interests and create lasting memories.
                </p>
                <a
                  href="mailto:maxwang3016@gmail.com"
                  className="text-white hover:text-blue-100 font-medium text-lg inline-flex items-center"
                >
                  <span>maxwang3016@gmail.com</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </motion.div>
            </div>

            {/* Leo Zhou Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 mt-32">
              <motion.div
                className="md:w-1/2 text-left order-2 md:order-1"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Leo Zhou</h2>
                <p className="text-2xl font-semibold text-white/90 mb-6">
                  Co-founder & Lead Backend Developer
                </p>
                <p className="text-lg text-white/90 leading-relaxed mb-8">
                  A Grade 11 student at SUIS Gubei, Leo is passionate about technology and software development. As the co-founder and lead backend developer of DiscoverU, he works tirelessly to ensure the platform runs smoothly and efficiently, providing a seamless experience for all users.
                </p>
                <a
                  href="mailto:leo.zhou@school.edu"
                  className="text-white hover:text-blue-100 font-medium text-lg inline-flex items-center"
                >
                  <span>leo.zhou@school.edu</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </motion.div>

              <motion.div
                className="md:w-1/2 relative order-1 md:order-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative">
                  <div className="rounded-full overflow-hidden w-[480px] h-[480px] border-8 border-white/20 shadow-2xl mx-auto">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=leozhou"
                      alt="Leo Zhou"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission Statement Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                Mission Statement
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Students, particularly new ninth graders, often lack comprehensive information about the various clubs and extracurricular activities (ECAs) offered at SUIS GUBEI.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Problem Statement */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-md transition-shadow"
              >
                <div className="bg-red-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">The Problem</h3>
                <p className="text-gray-600 leading-relaxed">
                  This information gap can result in students missing opportunities to join clubs that align with their interests or passions. Moreover, participation in clubs and ECAs plays a crucial role in personal development and can significantly enhance college applications. As the high school experience is unique and finite, club involvement can create lifetime milestones for students.
                </p>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-blue-50 rounded-2xl p-8 hover:shadow-md transition-shadow"
              >
                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <Search className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Solution</h3>
                <p className="text-gray-600 leading-relaxed">
                  We created a digital platform that comprehensively catalogs all clubs (student-led and teacher-supervised) available at our school. This makes it effortless for students to explore new clubs and activities, see meeting details, and join with a click.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Journey Section */}
        <section className="py-16 md:py-24 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                Our Journey
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                The story of how DiscoverU came to life
              </p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              {/* Timeline and Story Container */}
              <div className="relative">
                {/* Vertical Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-[109%] bg-white/30"></div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  className="space-y-24 mb-24 transition-all duration-500 ease-in-out"
                >
                  {/* Timeline Item 1: SEP 2024 */}
                  <motion.div
                    className="flex items-center justify-between w-full flex-row-reverse md:flex-row group"
                    variants={fadeIn}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex-1 md:mr-8 text-right md:text-left">
                      <div className="bg-white/10 p-6 rounded-xl shadow-sm group-hover:shadow-md transition-shadow ml-auto md:ml-0 max-w-sm">
                        <h3 className="text-2xl font-bold text-white mb-2">SEP 2024</h3>
                        <p className="text-white/90 font-semibold mb-1">Project Inception</p>
                        <p className="text-white/90 text-sm">The idea of DiscoverU was initiated.</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white border-4 border-blue-800 z-10"></div>
                    <div className="flex-1 md:ml-8">
                      <div className="rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow max-w-sm mr-auto md:mr-0">
                        <img
                          src="/timeline-images/image1.jpg"
                          alt="Timeline Event 1"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Timeline Item 2: DEC 2024 */}
                  <motion.div
                    className="flex items-center justify-between w-full flex-row md:flex-row-reverse group"
                    variants={fadeIn}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex-1 md:ml-8 text-left md:text-right">
                      <div className="bg-white/10 p-6 rounded-xl shadow-sm group-hover:shadow-md transition-shadow mr-auto md:mr-0 max-w-sm">
                        <h3 className="text-2xl font-bold text-white mb-2">DEC 2024</h3>
                        <p className="text-white/90 font-semibold mb-1">First Prototype</p>
                        <p className="text-white/90 text-sm">The first version of DiscoverU was developed.</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white border-4 border-blue-800 z-10"></div>
                    <div className="flex-1 md:mr-8">
                      <div className="rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow max-w-sm ml-auto md:ml-0">
                        <img
                          src="/timeline-images/image2.jpg"
                          alt="Timeline Event 2"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Timeline Item 3: FEB 2025 */}
                  <motion.div
                    className="flex items-center justify-between w-full flex-row-reverse md:flex-row group"
                    variants={fadeIn}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex-1 md:mr-8 text-right md:text-left">
                      <div className="bg-white/10 p-6 rounded-xl shadow-sm group-hover:shadow-md transition-shadow ml-auto md:ml-0 max-w-sm">
                        <h3 className="text-2xl font-bold text-white mb-2">FEB 2025</h3>
                        <p className="text-white/90 font-semibold mb-1">Second Prototype</p>
                        <p className="text-white/90 text-sm">Further development and refinement based on feedback.</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white border-4 border-blue-800 z-10"></div>
                    <div className="flex-1 md:ml-8">
                      <div className="rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow max-w-sm mr-auto md:mr-0">
                        <img
                          src="/timeline-images/image3.png"
                          alt="Timeline Event 3"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Timeline Item 4: JUN 2025 */}
                  <motion.div
                    className="flex items-center justify-between w-full flex-row md:flex-row-reverse group"
                    variants={fadeIn}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex-1 md:ml-8 text-left md:text-right">
                      <div className="bg-white/10 p-6 rounded-xl shadow-sm group-hover:shadow-md transition-shadow mr-auto md:mr-0 max-w-sm">
                        <h3 className="text-2xl font-bold text-white mb-2">JUN 2025</h3>
                        <p className="text-white/90 font-semibold mb-1">Final Version</p>
                        <p className="text-white/90 text-sm">The polished and ready-to-launch version.</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white border-4 border-blue-800 z-10"></div>
                    <div className="flex-1 md:mr-8">
                      <div className="rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow max-w-sm ml-auto md:ml-0">
                        <img
                          src="/timeline-images/image4.png"
                          alt="Timeline Event 4"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Our Story Box */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="max-w-3xl mx-auto bg-white/10 rounded-2xl p-8 px-12 cursor-pointer hover:shadow-md transition-shadow relative z-10"
                onClick={toggleFullStory}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">The Story Behind</h3>
                  <motion.div
                    animate={{ rotate: showFullStory ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {showFullStory && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-6 text-white/90 leading-relaxed">
                        The idea of DiscoverU was initiated from a thursday ECA in Gubei: Product Deisgn (Maker Portfolio) ECA at the september of 2024. Max, Leo, and Jason, being students who have studied in this school for three year, never really had a clear grasp on how much resources and opportunities our school truly offers; despite the fact that there are actually loads of them provided by Gubei. Noticing this problem, Max, Leo, and Jason came up with this idea of creating a digital platform that catalogs all the clubs and ECAs in our school. In the following month I have communicated with Mr.Lee(Director of Studies), Ms.Li(Head of Grade 11), Mr.Mundy(Directors of ECAs) to confirm the mission, and numerous student club leaders and teachers to collect detailed club information.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="text-center text-xl font-semibold text-white mt-16"
              >
                And we're just getting started.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                Connect with Us
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join our community and stay updated with all the latest club activities
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Email Box */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow text-center border border-gray-100"
              >
                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Email Us</h3>
                <a href="mailto:maxwang3016@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium">
                  maxwang3016@gmail.com
                </a>
              </motion.div>

              {/* Instagram Box */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow text-center border border-gray-100"
              >
                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Instagram</h3>
                <a href="https://instagram.com/discoveru" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium">
                  @discoveru
                </a>
              </motion.div>

              {/* Gubei Box */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow text-center border border-gray-100"
              >
                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Visit Us</h3>
                <p className="text-gray-600">
                  SUIS Gubei Campus<br />
                  Shanghai, China
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
