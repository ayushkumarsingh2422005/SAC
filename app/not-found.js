'use client';
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar whiteBg={true} />
      
      {/* 404 Content Section */}
      <section className="min-h-[80vh] flex items-center justify-center py-20 pt-32">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 sm:p-12"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-blue-600 mb-4">
              404
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Page Not Found
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <a
                href="/"
                className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30"
              >
                Return to Home
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 