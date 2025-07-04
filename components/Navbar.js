'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar({ whiteBg = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isEventAvailable, setIsEventAvailable] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Administration', href: '/administration' },
    {
      name: 'Society',
      href: '/',
      submenu: [
        { name: 'URJA', href: '/society/urja' },
        { name: 'OJASS', href: '/society/ojass' },
        { name: 'CULFEST', href: '/society/culfest' }
      ]
    },
    { name: 'Notice', href: '/notices' },
    { name: 'Events', href: '/events' }
  ];

  return (
    <motion.nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${whiteBg || isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <Link href={'/'}>
              <Image
                src={whiteBg || isScrolled ? `/sac-logo-b.png` : `/sac-logo-y.png`} // Add your logo to public folder
                // src={'/sac-logo-b.png'} // Add your logo to public folder
                alt="NITJSR Logo"
                width={40}
                height={40}
              />
            </Link>
            <div className={`font-bold ${whiteBg || isScrolled ? 'text-gray-900' : 'text-white'}`}>
              <Link href={'/'}>
                <span className="text-2xl">NITJSR</span>
                <span className="text-sm block text-blue-600">Student Activities</span>
              </Link>
            </div>


          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <div key={item.name} className="relative group">
                <motion.a
                  href={item.href}
                  className={`px-4 py-2 rounded-full mx-1 font-medium transition-colors ${whiteBg || isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="relative inline-flex items-center gap-2">
                    {item.name}
                    {(item.name === 'Events') && isEventAvailable && (
                      <span className="relative flex h-3 w-3 right-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                      </span>
                    )}
                  </span>
                </motion.a>

                {/* Submenu for Clubs */}
                {item.submenu && (
                  <div className="absolute left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="py-2 bg-white rounded-xl shadow-xl">
                      {item.submenu.map(({ name, href }, index) => (
                        <a
                          key={index}
                          href={href} // Use the href from the submenu item
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                          {name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <motion.a
              className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href='/achievements'
            >
              Achivement
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.div
            className="lg:hidden"
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg ${whiteBg || isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden bg-white rounded-2xl mt-2 shadow-xl overflow-hidden mb-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 space-y-3">
                {navItems.map((item, index) => (
                  <div key={item.name}>
                    <motion.a
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="relative inline-flex items-center gap-2">
                        {item.name}
                        {(item.name === 'Events') && isEventAvailable && (
                          <span className="relative flex h-3 w-3 right-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                          </span>
                        )}
                      </span>
                    </motion.a>
                    {item.submenu && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.submenu.map(({ name, href }, index) => (
                          <a
                            key={index}
                            href={href} // Use the href from the submenu item
                            className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                          >
                            {name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link href='/achievements'>
                  <motion.button
                    className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    Achivement
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
} 