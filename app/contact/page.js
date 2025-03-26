'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('faculty');

  // Dummy data for contacts
  const contacts = {
    faculty: [
      {
        id: 1,
        name: 'Dr. Rajesh Kumar',
        position: 'Faculty In-charge, SAC',
        department: 'Computer Science & Engineering',
        email: 'rajesh.kumar@nitjsr.ac.in',
        phone: '+91 9876543210',
        image: '/avatar.png',
        socialLinks: {
          linkedin: '#',
          twitter: '#',
        }
      },
      {
        id: 2,
        name: 'Dr. Priya Singh',
        position: 'Faculty Coordinator, Cultural',
        department: 'Electronics & Communication',
        email: 'priya.singh@nitjsr.ac.in',
        phone: '+91 9876543211',
        image: '/avatar.png',
        socialLinks: {
          linkedin: '#',
          twitter: '#',
        }
      },
      // Add more faculty members...
    ],
    club_secretary: [
      {
        id: 1,
        name: 'Rahul Sharma',
        position: 'Secretary',
        club: 'Robotics Club',
        email: 'robotics.secretary@nitjsr.ac.in',
        phone: '+91 9876543220',
        image: '/avatar.png',
        socialLinks: {
          linkedin: '#',
          instagram: '#',
        }
      },
      {
        id: 2,
        name: 'Priya Patel',
        position: 'Secretary',
        club: 'Cultural Club',
        email: 'cultural.secretary@nitjsr.ac.in',
        phone: '+91 9876543221',
        image: '/avatar.png',
        socialLinks: {
          linkedin: '#',
          instagram: '#',
        }
      },
      // Add more club secretaries...
    ],
    por_holder: [
      {
        id: 1,
        name: 'Amit Kumar',
        position: 'General Secretary, SAC',
        email: 'gs.sac@nitjsr.ac.in',
        phone: '+91 9876543230',
        image: '/avatar.png',
        socialLinks: {
          linkedin: '#',
          instagram: '#',
          twitter: '#',
        }
      },
      {
        id: 2,
        name: 'Sneha Gupta',
        position: 'Technical Secretary',
        email: 'tech.secretary@nitjsr.ac.in',
        phone: '+91 9876543231',
        image: '/avatar.png',
        socialLinks: {
          linkedin: '#',
          instagram: '#',
        }
      },
      // Add more POR holders...
    ],
  };

  const tabLabels = {
    faculty: 'Faculty In-charge',
    club_secretary: 'Club Secretaries',
    por_holder: 'Student Representatives',
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white border-b pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Contact Directory</h1>
          <p className="mt-2 text-gray-600">Get in touch with our faculty members, club secretaries, and student representatives</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            {Object.keys(tabLabels).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tabLabels[tab]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts[activeTab].map((contact, index) => (
            <motion.div
              key={contact.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={contact.image}
                      alt={contact.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                    <p className="text-sm text-gray-600">{contact.position}</p>
                    {contact.club && (
                      <p className="text-sm text-blue-600">{contact.club}</p>
                    )}
                    {contact.department && (
                      <p className="text-sm text-gray-500">{contact.department}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href={`mailto:${contact.email}`} className="hover:text-blue-600">
                      {contact.email}
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href={`tel:${contact.phone}`} className="hover:text-blue-600">
                      {contact.phone}
                    </a>
                  </div>
                </div>

                <div className="mt-4 flex space-x-3">
                  {contact.socialLinks.linkedin && (
                    <a
                      href={contact.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  )}
                  {contact.socialLinks.twitter && (
                    <a
                      href={contact.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                      </svg>
                    </a>
                  )}
                  {contact.socialLinks.instagram && (
                    <a
                      href={contact.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-pink-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
} 