'use client';
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEventAvailable, setIsEventAvailable] = useState(false);

  const categoryColors = {
    cultural: 'bg-purple-100 text-purple-800',
    sports: 'bg-green-100 text-green-800',
    technical: 'bg-blue-100 text-blue-800',
    club_activities: 'bg-yellow-100 text-yellow-800',
    competitions: 'bg-red-100 text-red-800',
    events: 'bg-indigo-100 text-indigo-800'
  };

  const categoryLabels = {
    cultural: 'Cultural Activities',
    sports: 'Sports & Games',
    technical: 'Technical Activities',
    club_activities: 'Club Activities',
    competitions: 'Competitions',
    events: 'Events & Festivals'
  };

  useEffect(() => {
    fetchRecentNotices();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/events/len"); // Replace with your actual endpoint
        const result = await response.json();
        // alert(typeof(result));
        setIsEventAvailable(result);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchRecentNotices = async () => {
    try {
      const response = await fetch('/api/notices?limit=3&sort=priority');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch notices');
      }

      setNotices(data.notices);
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }
  };

  const videoRef = useRef(null);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 18;
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen">
        {/* Background Image with mobile optimization */}
        <div className="absolute inset-0">
          <video
            src="/bg.mp4"
            autoPlay
            loop
            muted
            playsInline
            ref={videoRef}
            onLoadedMetadata={handleLoadedMetadata}
            className="object-cover w-full h-full brightness-[0.85] sm:brightness-75"
            poster="/nit-jsr-campus.png"
          />


          {/* Enhanced gradient overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20" />
        </div>

        <div className="relative h-full container mx-auto px-4 flex items-center">
          <motion.div
            className="w-full max-w-4xl mx-auto pt-16 sm:pt-20 px-4 sm:px-6 text-center sm:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated subtitle */}
            <motion.p
              className="text-blue-400 font-medium mb-4 text-lg sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Welcome to
            </motion.p>

            {/* Main title with responsive sizing */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              Student Activity Center
              <span className="block text-3xl sm:text-4xl md:text-5xl mt-2 text-blue-300">
                NIT Jamshedpur
              </span>
            </h1>

            {/* Description with better readability */}
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto sm:mx-0 leading-relaxed">
              Discover a world of opportunities through our diverse range of student activities,
              clubs, and events that shape future leaders.
            </p>

            {/* Responsive button layout */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Live Events Button */}
                <motion.button
                  className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href={'/events'} className="flex items-center justify-center space-x-2">
                    {/* Live Dot */}
                    {isEventAvailable && (
                      <span className="relative flex h-3 w-3 right-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                      </span>
                    )}
                    <span>Live Events</span>

                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.button>

                {/* Achievements Button */}
                <motion.button
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-semibold rounded-full hover:bg-white/20 transition-all shadow-inner hover:shadow-white/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href={'/achievements'} className="flex items-center justify-center space-x-2">
                    <span>Achievements</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </Link>
                </motion.button>
              </div>

            </div>

            {/* Achievement badges */}
            <div className="mt-12 hidden sm:flex gap-6 justify-center sm:justify-start">
              {[
                { number: "20+", label: "Active Clubs" },
                { number: "1000+", label: "Students" },
                { number: "50+", label: "Events/Year" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="text-white font-bold">{stat.number}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Enhanced scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-white/60 text-sm mb-2 hidden sm:block">Scroll to explore</span>
          <div className="w-8 h-12 rounded-full border-2 border-white/20 flex justify-center p-2">
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>


      {/* Notice Board Section - Added pt-20 for pages where hero section is not visible */}
      <section className={`py-16 bg-gray-50 ${!notices.length ? 'pt-36' : ''}`}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Updates</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest activities, events, and club announcements
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-r-transparent"></div>
                <p className="mt-4 text-gray-600">Loading updates...</p>
              </div>
            ) : notices.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <p className="text-gray-600">No updates found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notices.map((notice, index) => (
                  <motion.div
                    key={notice._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize
                          ${categoryColors[notice.category] || 'bg-gray-100 text-gray-800'}`}
                        >
                          {categoryLabels[notice.category] || notice.category}
                        </span>
                        {notice.priority === 'urgent' && (
                          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Urgent
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{notice.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{notice.content}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <span className="text-gray-500">
                            {new Date(notice.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                          {notice.venue && (
                            <span className="text-gray-500 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              </svg>
                              {notice.venue}
                            </span>
                          )}
                        </div>
                        <a href={`/notices#${notice._id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                          Read More →
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* View All Button */}
            <div className="text-center mt-8">
              <a
                href="/notices"
                className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Updates
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section - Redesigned */}
      <section className="py-20">
        <div className="container mx-auto px-4 mb-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Student Activities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Engage in a variety of activities that enhance your skills and create memorable experiences
            </p>
          </motion.div>
        </div>

        {/* Full-width activity cards */}
        {[
          {
            title: "Technical Activities",
            description: "Join technical clubs and engage in projects and competitions, including our annual event, OJASS. Enhance your skills in robotics, programming, and AI.",
            image: "/tech-activities.JPG",
            stats: [
              { number: "10+", label: "Tech Clubs" },
              { number: "20+", label: "Annual Projects" },
              { number: "5+", label: "Hackathons" }
            ],
            color: "from-blue-600 to-cyan-500"
          },
          {
            title: "Cultural Activities",
            description: "Express yourself through music, dance, and art at NIT JSR's cultural events, highlighted by the annual CULFEST where you can showcase your talents.",
            image: "/cultural-activities.JPG",
            stats: [
              { number: "8+", label: "Cultural Clubs" },
              { number: "15+", label: "Annual Events" },
              { number: "4+", label: "Major Festivals" }
            ],
            color: "from-purple-600 to-pink-500"
          },
          {
            title: "Sports & Athletics",
            description: "Join various sports and represent NIT JSR in inter-NIT events. Stay fit and build team spirit, highlighted by the annual URJA event.",
            image: "/sports-activities.JPG",
            stats: [
              { number: "12+", label: "Sports Teams" },
              { number: "25+", label: "Tournaments" },
              { number: "10+", label: "Training Facilities" }
            ],
            color: "from-orange-600 to-yellow-500"
          }
        ].map((activity, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="absolute inset-0">
              <Image
                src={activity.image}
                alt={activity.title}
                fill
                className="object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${activity.color} mix-blend-multiply opacity-90`} />
            </div>

            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-8 items-center min-h-[600px] py-20 relative">
                <div className="text-white">
                  <motion.h3
                    className="text-4xl md:text-5xl font-bold mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    {activity.title}
                  </motion.h3>
                  <motion.p
                    className="text-xl mb-8 text-white/90"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    {activity.description}
                  </motion.p>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {activity.stats.map((stat, idx) => (
                      <motion.div
                        key={idx}
                        className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                      >
                        <div className="text-2xl font-bold">{stat.number}</div>
                        <div className="text-sm text-white/80">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.a
                    className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={index === 0 ? "/society/ojass" : index === 1 ? "/society/culfest" : "/society/urja"}
                  >
                    {index === 0 ? "Annual Tech Fest" : index === 1 ? "Annual Cult Fest" : "Annual Sports Fest"}
                  </motion.a>
                </div>

                <div className="hidden md:block">
                  {/* Additional visuals or content can be added here */}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Clubs Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Vibrant Clubs</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our diverse range of clubs and societies to explore your interests and develop new skills
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Robotics Club",
                category: "Technical",
                description: "Design and build innovative robots, participate in competitions",
                image: "/robotics-club.png"
              },
              {
                name: "Literary Club",
                category: "Cultural",
                description: "Express through words, poetry, and creative writing",
                image: "/literary-club.png"
              },
              {
                name: "Sports Club",
                category: "Sports",
                description: "Excel in various sports and athletic activities",
                image: "/sports-club.png"
              },
              {
                name: "Coding Club",
                category: "Technical",
                description: "Enhance programming skills and solve real-world problems",
                image: "/coding-club.png"
              },
              {
                name: "Music Club",
                category: "Cultural",
                description: "Showcase your musical talent and learn from peers",
                image: "/music-club.png"
              },
              {
                name: "Photography Club",
                category: "Cultural",
                description: "Capture moments and learn professional photography",
                image: "/photography-club.png"
              }
            ].map((club, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="h-48 relative">
                  <Image
                    src={club.image}
                    alt={club.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                    {club.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{club.name}</h3>
                  <p className="text-gray-600 mb-0">{club.description}</p>
                  {/* <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                    Learn More →
                  </button> */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* From the Dean's Desk Section - Government Style */}
      <section className="py-16 bg-white border-t-4 border-blue-800">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column - Dean's Profile */}
              <div className="md:w-1/3 bg-gray-50 p-6 border border-gray-200">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-800">
                    <Image
                      src="/dean-profile.jpg"
                      alt="Dean's Profile"
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Prof. John Doe</h3>
                  <p className="text-gray-700 mb-1">Dean of Student Affairs</p>
                  <p className="text-gray-600 text-sm">NIT Jamshedpur</p>
                </div>
              </div>

              {/* Right Column - Message */}
              <div className="md:w-2/3">
                <div className="border-l-4 border-blue-800 pl-6">
                  <h2 className="text-2xl font-bold text-blue-900 mb-6">From the Dean's Desk</h2>

                  <div className="space-y-4 text-gray-800">
                    <p className="leading-relaxed">
                      It gives me immense pleasure to welcome you to the Student Activity Center of NIT Jamshedpur.
                      As the Dean of Student Affairs, I am committed to fostering an environment that promotes
                      holistic development alongside academic excellence.
                    </p>

                    <p className="leading-relaxed">
                      The Student Activity Center serves as a platform for our students to explore their potential
                      beyond the classroom. Through various clubs, societies, and events, we aim to nurture
                      leadership qualities, teamwork, and social responsibility among our students.
                    </p>

                    <p className="leading-relaxed">
                      Our institution takes pride in maintaining a perfect balance between academic rigor and
                      extracurricular activities. I encourage all students to actively participate in these
                      activities as they play a crucial role in shaping well-rounded professionals and
                      responsible citizens.
                    </p>

                    <div className="mt-8 pt-4 border-t border-gray-200">
                      <p className="text-gray-600 text-sm">
                        <span className="font-semibold">Office Hours:</span> Monday to Friday, 10:00 AM - 5:00 PM<br />
                        <span className="font-semibold">Contact:</span> dean.sa@nitjsr.ac.in
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "20+", label: "Active Clubs" },
              { number: "50+", label: "Annual Events" },
              { number: "1000+", label: "Active Members" },
              { number: "100+", label: "Awards Won" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ready to Join Our Community?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Become a part of NIT Jamshedpur's vibrant student community and make your college life memorable
              </p>
              <Link href={'/contact'} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Contact for Clubs
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
