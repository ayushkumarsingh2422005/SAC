'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import achievementsData from "@/data/achievements.json";

export default function AchievementPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const { achievements, categories, stats } = achievementsData;

  const recentAchievements = achievements.filter(achievement => achievement.isRecent);
  const otherAchievements = achievements.filter(achievement => !achievement.isRecent);

  const filteredAchievements = activeCategory === "all" 
    ? otherAchievements 
    : otherAchievements.filter(achievement => achievement.category === activeCategory);

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-4xl w-full">
            <button 
              className="absolute top-4 right-4 text-white text-2xl z-10"
              onClick={closeImageModal}
            >
              ×
            </button>
            <Image
              src={selectedImage.url}
              alt={selectedImage.caption}
              width={1200}
              height={800}
              className="rounded-lg"
            />
            {selectedImage.caption && (
              <p className="text-white text-center mt-4">{selectedImage.caption}</p>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <div className="absolute inset-0">
          <Image
            src="/achievements/hero-bg.jpg"
            alt="Achievements Background"
            fill
            className="object-cover brightness-[0.85]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        </div>

        <div className="relative h-full container mx-auto px-4 flex items-center">
          <motion.div
            className="w-full max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Our Achievements
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Celebrating Excellence and Success
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(stats).map(([key, value], index) => (
              <motion.div
                key={key}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{value}</div>
                <div className="text-blue-200 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Achievements Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Recent Achievements</h2>
            <p className="text-xl text-gray-600">Our latest accomplishments and milestones</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="h-64 relative">
                  <Image
                    src={achievement.images[0].url}
                    alt={achievement.images[0].caption}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                    {achievement.category}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-xl font-semibold text-white">
                      {achievement.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {new Date(achievement.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{achievement.description}</p>
                  
                  {/* Image Gallery */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {achievement.images.map((image, idx) => (
                      <div 
                        key={idx}
                        className="relative aspect-square cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => openImageModal(image)}
                      >
                        <Image
                          src={image.url}
                          alt={image.caption}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    {achievement.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {highlight}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Team:</span> {achievement.team.join(", ")}
                    </div>
                    {achievement.link && (
                      <div className="mt-2">
                        <a 
                          href={achievement.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                        >
                          {achievement.link.text}
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Achievements Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Other Achievements</h2>
            <p className="text-xl text-gray-600">Explore our past accomplishments and milestones</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === "all"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              All Achievements
            </button>
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.name
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.icon} {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="h-48 relative">
                  <Image
                    src={achievement.images[0].url}
                    alt={achievement.images[0].caption}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                    {achievement.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{achievement.description}</p>
                  
                  {/* Image Gallery */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {achievement.images.map((image, idx) => (
                      <div 
                        key={idx}
                        className="relative aspect-square cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => openImageModal(image)}
                      >
                        <Image
                          src={image.url}
                          alt={image.caption}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    {achievement.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {highlight}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Team:</span> {achievement.team.join(", ")}
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Date:</span> {new Date(achievement.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    {achievement.link && (
                      <div className="mt-2">
                        <a 
                          href={achievement.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                        >
                          {achievement.link.text}
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
