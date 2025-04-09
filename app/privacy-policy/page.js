'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import React from 'react';

const PrivacyPolicy = () => {
    return (
        <>
            <Navbar whiteBg={true}/>
            <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white shadow-lg rounded-lg p-8">
                        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                            Privacy Policy
                        </h1>

                        <div className="space-y-8">
                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">1. Introduction</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    This Privacy Policy describes how the Student Activity Center (SAC) of the National Institute of Technology Jamshedpur (NIT JSR) collects, uses, and protects your personal information when you use our website. This policy is designed to help you understand how we handle your data and protect your privacy.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">2. Information We Collect</h2>
                                <p className="text-gray-600 mb-4">
                                    We may collect the following types of information:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                    <li>Personal identification information (name, email address, student ID)</li>
                                    <li>Contact information (phone number, address)</li>
                                    <li>Academic information (department, year of study)</li>
                                    <li>Usage data (how you interact with our website)</li>
                                    <li>Event participation and club membership information</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">3. How We Use Your Information</h2>
                                <p className="text-gray-600 mb-4">
                                    We use the collected information for the following purposes:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                    <li>To provide and maintain our services</li>
                                    <li>To notify you about events and activities</li>
                                    <li>To manage club memberships and event registrations</li>
                                    <li>To improve our website and services</li>
                                    <li>To communicate with you about SAC-related matters</li>
                                    <li>To ensure compliance with institute policies</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">4. Data Protection</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We implement appropriate security measures to protect your personal information. These include:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-4">
                                    <li>Secure data storage and transmission</li>
                                    <li>Regular security assessments</li>
                                    <li>Access controls and authentication</li>
                                    <li>Data encryption where necessary</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">5. Data Sharing</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We do not sell or rent your personal information. We may share your information with:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-4">
                                    <li>NIT JSR administration for official purposes</li>
                                    <li>Club coordinators for event management</li>
                                    <li>Third-party service providers who assist in website operations</li>
                                    <li>When required by law or to protect our rights</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">6. Your Rights</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    You have the right to:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-4">
                                    <li>Access your personal information</li>
                                    <li>Correct inaccurate information</li>
                                    <li>Request deletion of your information</li>
                                    <li>Opt-out of certain communications</li>
                                    <li>Withdraw consent for data processing</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">7. Cookies and Tracking</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Our website uses cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser preferences.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">8. Changes to This Policy</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">9. Contact Us</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    If you have any questions about this Privacy Policy, please contact us at:
                                    <br />
                                    <span className="block mt-2">
                                        Student Activity Center, NIT Jamshedpur
                                        <br />
                                        Email: sac@nitjsr.ac.in
                                        <br />
                                        Phone: [Contact Number]
                                        <br />
                                        Address: [SAC Office Address]
                                    </span>
                                </p>
                            </section>
                        </div>

                        <div className="mt-8 text-center text-sm text-gray-500">
                            Last updated: {new Date().toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PrivacyPolicy; 