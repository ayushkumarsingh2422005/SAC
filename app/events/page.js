'use client';
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Page() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/events"); // Replace with your actual endpoint
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar whiteBg={true} />
            {data.length > 0 ? <section className="min-h-[80vh] py-20 pt-28 flex flex-col items-center gap-8 px-4">
                {loading ? (
                    <p className="text-lg text-gray-600">Loading...</p>
                ) : (
                    data.map((item, index) => (
                        <div key={index} className="flex flex-col items-center w-full max-w-6xl">
                            <MediaRenderer url={item.url} type={item.type} />
                            <p className="mt-4 text-center text-gray-700">{item.desc}</p>
                        </div>
                    ))
                )}
            </section> : <section className="flex-1 flex items-center justify-center py-20 pt-32">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-8"
                    >
                        <Image
                            src="/no-event.svg" // Replace this with your illustration/image path
                            alt="No Event"
                            width={400}
                            height={300}
                            className="mx-auto mb-2"
                        />

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            No Live Event Right Now
                        </h2>

                        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
                            There are currently no events live at the moment. Check back soon or follow us to stay updated with the latest happenings!
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <a
                                href="/"
                                className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30"
                            >
                                Back to Home
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>}

            <Footer />
        </main>
    );
}

const MediaRenderer = ({ url, type }) => {
    switch (type) {
        case "image":
            return (
                <img
                    src={url}
                    alt="content"
                    className="w-full h-[75vh] object-contain rounded-lg shadow-lg"
                />
            );
        case "video":
            return (
                <video
                    src={url}
                    controls
                    className="w-full h-[75vh] object-contain rounded-lg shadow-lg"
                />
            );
        case "youtube":
            return (
                <iframe
                    src={url}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-[75vh] rounded-lg shadow-lg"
                ></iframe>
            );
        case "pdf":
            return (
                <iframe
                    src={url}
                    className="w-full h-[75vh] rounded-lg shadow-lg"
                    title="PDF document"
                />
            );
        case "canva":
            return (
                <div className="w-full h-[75vh] flex items-center justify-center rounded-lg shadow-lg bg-white border border-gray-300">
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline text-lg font-semibold"
                    >
                        Open Canva Design
                    </a>
                </div>
            );
        default:
            return (
                <iframe
                    src={url}
                    className="w-full h-[75vh] rounded-lg shadow-lg"
                    allowFullScreen
                />
            );
    }
};
