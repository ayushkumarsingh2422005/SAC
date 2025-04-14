'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const categories = ['Technical', 'Cultural', 'Sports', 'Other'];

const categoryColors = {
    Technical: 'bg-blue-100 text-blue-800',
    Cultural: 'bg-purple-100 text-purple-800',
    Sports: 'bg-green-100 text-green-800',
    // Academic: 'bg-yellow-100 text-yellow-800',
    Other: 'bg-gray-100 text-gray-800'
};

const categoryIcons = {
    Technical: '💻',
    Cultural: '🎭',
    Sports: '⚽',
    Academic: '📚',
    Other: '🏆'
};

export default function AchievementsPage() {
    const [achievements, setAchievements] = useState([]);
    const [recentAchievements, setRecentAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        category: '',
        isRecent: false
    });
    const [selectedAchievement, setSelectedAchievement] = useState(null);

    useEffect(() => {
        fetchAchievements();
    }, [filters]);

    const fetchAchievements = async () => {
        try {
            setLoading(true);
            setError(null);

            const queryParams = new URLSearchParams({
                ...filters,
                status: 'active'
            });

            const response = await fetch(`/api/achievements?${queryParams}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch achievements');
            }

            if (!data.achievements) {
                throw new Error('No achievements data received');
            }

            const uniqueIds = new Set();
            const uniqueAchievements = data.achievements
                .filter(achievement => {
                    if (uniqueIds.has(achievement._id)) {
                        return false;
                    }
                    uniqueIds.add(achievement._id);
                    return true;
                })
                .sort((a, b) => {
                    if (a.priority !== b.priority) {
                        return b.priority - a.priority;
                    }
                    return new Date(b.date) - new Date(a.date);
                });

            const recent = uniqueAchievements.filter(achievement => achievement.isRecent);
            const normal = uniqueAchievements.filter(achievement => !achievement.isRecent);

            setRecentAchievements(recent);
            setAchievements(normal);
        } catch (error) {
            console.error('Error fetching achievements:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <Navbar />

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
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />
                </div>

                <div className="relative h-full container mx-auto px-4 flex items-center">
                    <motion.div
                        className="w-full max-w-4xl mx-auto text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h1
                            className="text-5xl md:text-6xl font-bold text-white mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Our Achievements
                        </motion.h1>
                        <motion.p
                            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            Celebrating Excellence and Success in Every Field
                        </motion.p>
                        <motion.div
                            className="flex flex-wrap justify-center gap-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            {categories.map((category) => (
                                <motion.button
                                    key={category}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setFilters({ ...filters, category })}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${filters.category === category
                                            ? 'bg-white text-gray-900 shadow-lg'
                                            : 'bg-white/10 text-white hover:bg-white/20'}`}
                                >
                                    <span className="mr-2">{categoryIcons[category]}</span>
                                    {category}
                                </motion.button>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {/* Loading State */}
                    {loading && (
                        <div className="flex justify-center items-center py-12">
                            <motion.div
                                className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-8"
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Recent Achievements Section */}
                    {!loading && !error && recentAchievements.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-16"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                                <svg
                                    className="w-6 h-6 mr-3 text-yellow-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                    />
                                </svg>
                                Recent Achievements
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {recentAchievements.map((achievement) => (
                                    <AchievementCard
                                        key={achievement._id}
                                        achievement={achievement}
                                        onClick={() => setSelectedAchievement(achievement)}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    <div className='w-full bg-gradient-to-r from-blue-900 to-blue-600 flex justify-around gap-4 p-6 rounded-lg shadow-lg'>
                        <div className='text-center text-white'>
                            <h3 className='text-4xl font-bold'>100+</h3>
                            <p className='text-lg'>Sports Wins</p>
                        </div>
                        <div className='text-center text-white'>
                            <h3 className='text-4xl font-bold'>100+</h3>
                            <p className='text-lg'>Sports Wins</p>
                        </div>
                        <div className='text-center text-white'>
                            <h3 className='text-4xl font-bold'>100+</h3>
                            <p className='text-lg'>Sports Wins</p>
                        </div>
                        <div className='text-center text-white'>
                            <h3 className='text-4xl font-bold'>100+</h3>
                            <p className='text-lg'>Sports Wins</p>
                        </div>
                    </div>
                    <br /><br /><br />
                    {/* All Achievements Section */}
                    {!loading && !error && achievements.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">All Achievements</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {achievements.map((achievement) => (
                                    <AchievementCard
                                        key={achievement._id}
                                        achievement={achievement}
                                        onClick={() => setSelectedAchievement(achievement)}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* No Results */}
                    {!loading && !error && recentAchievements.length === 0 && achievements.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-12"
                        >
                            <p className="text-gray-500 text-lg">No achievements found</p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Achievement Modal */}
            <AnimatePresence>
                {selectedAchievement && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedAchievement(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            {selectedAchievement.images && selectedAchievement.images.length > 0 && (
                                <div className="relative h-64 w-full">
                                    <Image
                                        src={selectedAchievement.images[0].url}
                                        alt={selectedAchievement.title}
                                        fill
                                        className="object-cover rounded-t-xl"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority={true}
                                    />
                                </div>
                            )}
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <span className={`px-4 py-2 rounded-full text-sm font-medium
                    ${categoryColors[selectedAchievement.category]}`}>
                                        {selectedAchievement.category}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {new Date(selectedAchievement.date).toLocaleDateString()}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    {selectedAchievement.title}
                                </h3>

                                <p className="text-gray-600 mb-6">
                                    {selectedAchievement.description}
                                </p>

                                {selectedAchievement.highlights && (
                                    <div className="mb-6">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Highlights</h4>
                                        <ul className="space-y-2">
                                            {selectedAchievement.highlights[0].split('\r').map((highlight, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-blue-600 mr-2">•</span>
                                                    <span className="text-gray-600">{highlight.trim()}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {selectedAchievement.team && (
                                    <div className="mb-6">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Team Members</h4>
                                        <ul className="space-y-2">
                                            {selectedAchievement.team[0].split('\r').map((member, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-blue-600 mr-2">•</span>
                                                    <span className="text-gray-600">{member.trim()}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {selectedAchievement.link && selectedAchievement.link.url && (
                                    <a
                                        href={selectedAchievement.link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        {selectedAchievement.link.text || 'Learn More'}
                                        <svg
                                            className="ml-1 w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </main>
    );
}

function AchievementCard({ achievement, onClick }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 cursor-pointer transition-all duration-300 hover:shadow-lg"
            onClick={onClick}
        >
            {achievement.images && achievement.images.length > 0 && (
                <div className="relative h-40 w-full">
                    <Image
                        src={achievement.images[0].url}
                        alt={achievement.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
            )}

            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
            ${categoryColors[achievement.category]}`}>
                        {achievement.category}
                    </span>
                    <span className="text-xs text-gray-500">
                        {new Date(achievement.date).toLocaleDateString()}
                    </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                    {achievement.title}
                </h3>

                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {achievement.description}
                </p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                        <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        {achievement.team ? achievement.team[0].split('\r').length : 0} members
                    </div>
                    <span className="text-xs text-blue-600">View Details →</span>
                </div>
            </div>
        </motion.div>
    );
} 