'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SportsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-screen">
                <div className="absolute inset-0">
                    <Image
                        src="/urja/bg.JPG"
                        alt="Sports Fest Background"
                        fill
                        className="object-cover brightness-[0.85]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />
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
                            URJA
                        </motion.h1>
                        <motion.p
                            className="text-2xl md:text-3xl text-white/90 mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            Where Champions Are Made
                        </motion.p>
                        <motion.div
                            className="flex justify-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white">Comming back in, 2026</span>
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
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">About URJA</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            URJA is our annual sports extravaganza that brings together the best athletes from across the country.
                            It's a celebration of sportsmanship, teamwork, and athletic excellence that transforms our campus into a vibrant arena of competition.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                title: "Competitive Spirit",
                                description: "Experience intense competition across multiple sports disciplines",
                                icon: "🏆"
                            },
                            {
                                title: "Team Unity",
                                description: "Witness the power of teamwork and sportsmanship in action",
                                icon: "🤝"
                            },
                            {
                                title: "Athletic Excellence",
                                description: "Join a celebration of physical prowess and determination",
                                icon: "💪"
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

            {/* Sports Categories Section */}
            <section className="relative h-[90vh] overflow-hidden">
                <div className="absolute inset-0 flex">
                    <div className="absolute inset-0 bg-white" />
                    {[
                        {
                            category: "Cricket",
                            description: "Where Legends Are Born",
                            image: "/urja/cricket-bg.png",
                            color: "from-green-600/30 to-green-900/30",
                            transform: "skew(-12deg) translateX(-5%)"
                        },
                        {
                            category: "Football",
                            description: "The Beautiful Game",
                            image: "/urja/football-bg.png",
                            color: "from-blue-600/30 to-blue-900/30",
                            transform: "skew(-12deg)"
                        },
                        {
                            category: "Basketball",
                            description: "Dunk Your Dreams",
                            image: "/urja/basketball-bg.png",
                            color: "from-orange-600/30 to-orange-900/30",
                            transform: "skew(-12deg) translateX(5%)"
                        },
                        {
                            category: "Athletics",
                            description: "Speed & Strength",
                            image: "/urja/athletics-bg.png",
                            color: "from-red-600/30 to-red-900/30",
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
            </section>

            {/* Statistics Section */}
            <section className="py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">URJA in Numbers</h2>
                        <p className="text-xl text-gray-600">Celebrating Sporting Excellence</p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                number: "15+",
                                label: "Sports",
                                description: "Competitive events and tournaments"
                            },
                            {
                                number: "50+",
                                label: "Teams",
                                description: "Participating from top institutions"
                            },
                            {
                                number: "₹3L+",
                                label: "Prize Money",
                                description: "Total prize distribution"
                            },
                            {
                                number: "3",
                                label: "Days",
                                description: "Of non-stop sporting action"
                            }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-8 rounded-xl shadow-lg text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.number}</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</h3>
                                <p className="text-gray-600">{stat.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Preview */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Action Shots</h2>
                        <p className="text-xl text-gray-600 mb-8">Relive the thrilling moments from previous editions</p>
                        <motion.a
                            href="/society/urja/gallery"
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
                                    src={`/urja/g${item}.jpg`}
                                    alt={`Gallery Image ${item}`}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    {/* <span className="text-white font-medium">Click to view</span> */}
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
