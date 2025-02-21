'use client';
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen">
        {/* Background Image with mobile optimization */}
        <div className="absolute inset-0">
          <Image
            src="/nit-jsr-campus.png"
            alt="NIT Jamshedpur Campus"
            fill
            className="object-cover brightness-[0.85] sm:brightness-75"
            sizes="100vw"
            priority
          />
          {/* Enhanced gradient overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
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
              <motion.button 
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center justify-center">
                  Explore Activities
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </motion.button>
              <motion.button 
                className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-semibold rounded-full hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center justify-center">
                  Join Clubs
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </motion.button>
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
            description: "Join technical clubs and participate in innovative projects and competitions. Develop your skills in robotics, programming, AI, and more.",
            image: "/tech-activities.png",
            stats: [
              { number: "10+", label: "Tech Clubs" },
              { number: "20+", label: "Annual Projects" },
              { number: "5+", label: "Hackathons" }
            ],
            color: "from-blue-600 to-cyan-500"
          },
          {
            title: "Cultural Activities",
            description: "Express yourself through music, dance, drama, and various art forms. Participate in cultural festivals and showcase your talent.",
            image: "/cultural-activities.png",
            stats: [
              { number: "8+", label: "Cultural Clubs" },
              { number: "15+", label: "Annual Events" },
              { number: "4+", label: "Major Festivals" }
            ],
            color: "from-purple-600 to-pink-500"
          },
          {
            title: "Sports & Athletics",
            description: "Participate in various sports activities and represent NIT JSR in national competitions. Stay fit and develop team spirit.",
            image: "/sports-activities.png",
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

                  <motion.button
                    className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
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
                  <p className="text-gray-600 mb-4">{club.description}</p>
                  <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                    Learn More →
                  </button>
                </div>
              </motion.div>
            ))}
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
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Register for Clubs
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        {/* Main Footer */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* About Column */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">NITJSR</h3>
              <p className="text-gray-400 mb-4">
                National Institute of Technology, Jamshedpur - Nurturing excellence in technology and innovation since 1960.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.164 22 16.42 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 7h-2v-3c0-.55-.45-1-1-1s-1 .45-1 1v3h-2v-6h2v1.1c.17-.31.48-.51.83-.51.83 0 1.5.67 1.5 1.5V17z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Clubs & Activities</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Events Calendar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Student Resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gallery</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>NIT Jamshedpur, Adityapur, Jamshedpur, Jharkhand - 831014</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>contact@nitjsr.ac.in</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91 657-2373392</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-white font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates on events and activities.</p>
              <form className="flex flex-col space-y-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                <p className="text-sm text-gray-400">
                  © {new Date().getFullYear()} NIT Jamshedpur. All rights reserved.
                </p>
                <span className="hidden md:block text-gray-600">|</span>
                <p className="text-sm text-gray-400">
                  Designed & Developed by{' '}
                  <a 
                    href="https://digicraft.one" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                  >
                    DigiCraft.one
                  </a>
                </p>
              </div>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
