'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import React from 'react';

const CookiePolicy = () => {
    return (
        <>
            <Navbar whiteBg={true}/>
            <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white shadow-lg rounded-lg p-8">
                        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                            Cookie Policy
                        </h1>

                        <div className="space-y-8">
                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">1. Introduction</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    This Cookie Policy explains how the Student Activity Center (SAC) of the National Institute of Technology Jamshedpur (NIT JSR) uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">2. What Are Cookies?</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">3. Types of Cookies We Use</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-700">Essential Cookies</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            These cookies are strictly necessary for the website to function properly. They enable core functionality such as:
                                        </p>
                                        <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-2">
                                            <li>User authentication and security</li>
                                            <li>Basic website functionality</li>
                                            <li>Session management</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-700">Analytics Cookies</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously:
                                        </p>
                                        <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-2">
                                            <li>Page views and navigation patterns</li>
                                            <li>Time spent on the website</li>
                                            <li>Error messages and performance issues</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-700">Functionality Cookies</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            These cookies enable the website to provide enhanced functionality and personalization:
                                        </p>
                                        <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-2">
                                            <li>Remembering your preferences</li>
                                            <li>Language settings</li>
                                            <li>Customized content display</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">4. How to Control Cookies</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
                                </p>
                                <p className="text-gray-600 leading-relaxed mt-4">
                                    Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-2">
                                    <li><a href="https://www.allaboutcookies.org" className="text-blue-600 hover:underline">www.allaboutcookies.org</a></li>
                                    <li><a href="https://www.aboutcookies.org" className="text-blue-600 hover:underline">www.aboutcookies.org</a></li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">5. Third-Party Cookies</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    In some special cases, we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-4">
                                    <li>Google Analytics - for understanding how visitors use our website</li>
                                    <li>Social Media plugins - for sharing content on social media platforms</li>
                                    <li>Payment processors - for secure online transactions</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">6. Cookie Duration</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Cookies can remain on your computer or mobile device for different periods of time:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-4">
                                    <li>Session Cookies - These cookies expire when you close your browser</li>
                                    <li>Persistent Cookies - These cookies remain on your device for a set period of time or until you delete them</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">7. Updates to This Policy</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. We encourage you to check this page periodically for the latest information on our cookie practices.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">8. Contact Us</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    If you have any questions about our use of cookies, please contact us at:
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

export default CookiePolicy; 