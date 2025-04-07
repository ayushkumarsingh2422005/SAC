'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CulturalPage() {

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-screen">
                <div className="absolute inset-0">
                    <Image
                        src="/cultural/bg.png"
                        alt="Cultural Fest Background"
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
                            className="text-6xl md:text-8xl font-bold text-white mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            CULFEST
                        </motion.h1>
                        <motion.p
                            className="text-2xl md:text-3xl text-white/90 mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            Where Creativity Meets Culture
                        </motion.p>
                        <motion.div
                            className="flex justify-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white">March 15-20, 2024</span>
                            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white">NIT Jamshedpur</span>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">About Culfest</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Culfest is our annual cultural extravaganza that brings together the best of art, music, dance, and drama.
                            It's a celebration of creativity, talent, and cultural diversity that transforms our campus into a vibrant hub of artistic expression.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                title: "Cultural Diversity",
                                description: "Experience a rich tapestry of cultural performances from across India",
                                icon: "🎭"
                            },
                            {
                                title: "Artistic Excellence",
                                description: "Witness performances that push the boundaries of creativity",
                                icon: "🎨"
                            },
                            {
                                title: "Community Spirit",
                                description: "Join a celebration that brings together students, faculty, and alumni",
                                icon: "🤝"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-8 rounded-xl shadow-lg text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Events Section */}
            {/* <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Events & Performances</h2>
            <p className="text-xl text-gray-600">Discover the magic of cultural expression</p>
          </motion.div>

          <div className="flex justify-center gap-4 mb-12">
            {['all', 'dance', 'music', 'drama'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-6 py-2 rounded-full capitalize transition-all duration-300 ${
                  activeTab === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(events).map(([category, categoryEvents]) => (
              activeTab === 'all' || activeTab === category
                ? categoryEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <div className="h-48 relative">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                          <p className="text-white/80 text-sm">{event.date} | {event.venue}</p>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-600 mb-4">{event.description}</p>
                        <div className="space-y-2">
                          {event.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-500">
                              <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              {highlight}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))
                : null
            ))}
          </div>
        </div>
      </section> */}

            {/* Creative Categories Section */}
            <section className="relative h-[90vh] overflow-hidden">
                <div className="absolute inset-0 flex">
                    <div className="absolute inset-0 bg-white" /> {/* Background cover */}
                    {[
                        {
                            category: "Dance",
                            description: "Where Movement Becomes Poetry",
                            image: "/cultural/dance-bg.png",
                            color: "from-purple-600/30 to-purple-900/30",
                            transform: "skew(-12deg) translateX(-5%)"
                        },
                        {
                            category: "Drama",
                            description: "Stories That Touch The Soul",
                            image: "/cultural/drama-bg.png",
                            color: "from-red-600/30 to-red-900/30",
                            transform: "skew(-12deg)"
                        },
                        {
                            category: "Music",
                            description: "Melodies That Resonate",
                            image: "/cultural/music-bg.png",
                            color: "from-blue-600/30 to-blue-900/30",
                            transform: "skew(-12deg) translateX(5%)"
                        },
                        {
                            category: "Fashion",
                            description: "Style That Speaks Volumes",
                            image: "/cultural/fashion-bg.png",
                            color: "from-pink-600/30 to-pink-900/30",
                            transform: "skew(-12deg) translateX(10%)"
                        }
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="relative flex-1 overflow-hidden -mx-2"
                            style={{ transform: item.transform }}
                        >
                            <div className="absolute inset-0">
                                <Image
                                    src={item.image}
                                    alt={`${item.category} background`}
                                    fill
                                    className="object-cover"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-r ${item.color}`} />
                            </div>
                            <div className="relative h-full flex items-center justify-center">
                                <motion.div
                                    className="text-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <motion.h2
                                        className="text-4xl md:text-6xl font-bold text-white mb-1"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {item.category}
                                    </motion.h2>
                                    <motion.p
                                        className="text-base md:text-lg text-white/90"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        {item.description}
                                    </motion.p>
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>\

            {/* Gallery Preview */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Moments to Remember</h2>
                        <p className="text-xl text-gray-600 mb-8">A glimpse into the magic of previous editions</p>
                        <motion.a
                            href="/society/cultural/gallery"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View Full Gallery
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </motion.a>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((item) => (
                            <motion.div
                                key={item}
                                className="relative aspect-square rounded-xl overflow-hidden group"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: item * 0.1 }}
                            >
                                <Image
                                    src={`/cultural/gallery-${item}.png`}
                                    alt={`Gallery Image ${item}`}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-white font-medium">Click to view</span>
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
