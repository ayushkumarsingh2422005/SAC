'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import React from 'react';

const TermsAndConditions = () => {
    return (
        <>
            <Navbar whiteBg={true}/>
            <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white shadow-lg rounded-lg p-8">
                        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                            Terms and Conditions
                        </h1>

                        <div className="space-y-8">
                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">1. Introduction</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Welcome to the Student Activity Center (SAC) website of the National Institute of Technology Jamshedpur (NIT JSR).
                                    This website is designed and maintained by DigiCraft.one. By accessing and using this website, you agree to be bound
                                    by these Terms and Conditions.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">2. Website Usage</h2>
                                <p className="text-gray-600 mb-4">
                                    The SAC website is intended for the use of NIT JSR students, faculty, staff, and authorized visitors.
                                    Users are expected to:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                    <li>Use the website for legitimate purposes only</li>
                                    <li>Maintain appropriate conduct and respect for others</li>
                                    <li>Not engage in any activity that may disrupt the website's functionality</li>
                                    <li>Not attempt to gain unauthorized access to any part of the website</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">3. Intellectual Property</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    All content on this website, including but not limited to text, graphics, logos, images, and software,
                                    is the property of NIT JSR and is protected by intellectual property laws. Users may not reproduce,
                                    distribute, or modify any content without prior written permission.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">4. Privacy Policy</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    The collection and use of personal information on this website are governed by our Privacy Policy.
                                    By using this website, you consent to the collection and use of your information as described in the Privacy Policy.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">5. Third-Party Links</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    This website may contain links to third-party websites. NIT JSR and DigiCraft.one are not responsible for
                                    the content or practices of these external sites. Users access third-party links at their own risk.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">6. Disclaimer</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    While we strive to maintain accurate and up-to-date information, NIT JSR and DigiCraft.one make no
                                    warranties about the completeness, reliability, or accuracy of the information on this website.
                                    Users access and use the website at their own risk.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">7. Limitation of Liability</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    NIT JSR and DigiCraft.one shall not be liable for any direct, indirect, incidental, special, or
                                    consequential damages resulting from the use or inability to use the website.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">8. Modifications</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    These Terms and Conditions may be modified at any time without prior notice. Continued use of the
                                    website after such modifications constitutes acceptance of the updated terms.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">9. Governing Law</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    These Terms and Conditions shall be governed by and construed in accordance with the laws of India.
                                    Any disputes shall be subject to the exclusive jurisdiction of the courts in Jamshedpur, Jharkhand.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">10. Contact Information</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    For any questions or concerns regarding these Terms and Conditions, please contact:
                                    <br />
                                    <span className="block mt-2">
                                        Student Activity Center, NIT Jamshedpur
                                        <br />
                                        Email: sac@nitjsr.ac.in
                                        <br />
                                        Website: https://nitjsr.ac.in
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

export default TermsAndConditions;
