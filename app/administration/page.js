'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function page() {
    const [activeTab, setActiveTab] = useState('director');



    const tabLabels = {
        director: {
            label: 'Director',
            name: 'Prof. Goutam Sutradhar',
            image: 'https://nitjsr.ac.in/static/media/director.5dd2bd73bde93718a6fd.jpg',
            contact: {
                email: 'director@nitjsr.ac.in',
                phone: '0657-2373392(O), 0657-2373407(O)'
            }
        },
        deputy_director: {
            label: 'Deputy Director',
            name: 'Prof. Ram Vinoy Sharma',
            image: 'https://nitjsr.ac.in/static/media/deputy_director.a4aca0ca6d3a54793e35.jpg',
            contact: {
                email: 'rvsharma.me@nitjsr.ac.in',
                phone: '+91-12345-67891'
            }
        },
        registrar: {
            label: 'Registrar',
            name: 'Colonel (Dr.) Nisheeth Kumar Rai (Retd.)',
            image: 'https://nitjsr.ac.in/static/media/Registrar.b08beed36b16902e1693.jpeg',
            contact: {
                email: 'registrar@nitjsr.ac.in',
                phone: '0657-2373629(O)'
            }
        },
        dean_associate_dean: {
            label: 'Dean and Associate Dean',
            people: [
                {
                    name: 'Dr Rakesh Pratap Singh',
                    title: 'Dean Students\' Welfare',
                    image: 'https://nitjsr.ac.in/backend/uploads/Faculty/CE113/profile/66f9f0b0-5caf-4b49-ba5f-112956f96bc4.jpg', // No image provided
                    contact: {
                        email: 'dean.sw@nitjsr.ac.in',
                        phone: ''
                    }
                },
                {
                    name: 'Dr Sakthivel S',
                    title: 'Associate Dean Students\' Welfare',
                    image: 'https://nitjsr.ac.in/backend/uploads/Faculty/CH105/profile/7ce371fc-6110-43de-a29a-447ff3208185.jpg', // No image provided
                    contact: {
                        email: '',
                        phone: ''
                    }
                },
                {
                    name: 'Dr Kunal Singh',
                    title: 'Associate Dean Students\' Welfare',
                    image: 'https://nitjsr.ac.in/backend/uploads/Faculty/EC110/profile/703ad435-ab78-4b10-900d-bf5e68db357b.jpg', // No image provided
                    contact: {
                        email: '',
                        phone: ''
                    }
                },
                {
                    name: 'Dr Poulami Maji',
                    title: 'Associate Dean Students\' Welfare',
                    image: 'https://nitjsr.ac.in/backend/uploads/Faculty/MM105/profile/57c12643-fc04-458b-99a9-3f45ef0701ab.jpg', // No image provided
                    contact: {
                        email: '',
                        phone: ''
                    }
                },
            ]
        },
        principal_sas_officer: {
            label: 'Principal SAS Officer',
            name: 'To be announced',
            image: '/profile.png',
            contact: {
                email: '',
                phone: ''
            },
            note: 'This position is currently vacant.'
        },
        president_sac: {
            label: 'President SAC',
            name: 'Prof. A. K. L. Srivastava',
            image: '/presidentsac.jpg',
            contact: {
                email: 'president.sas@nitjsr.ac.in',
                phone: ''
            },
            note: 'This position is currently vacant.'
        },
        senior_sas_officer: {
            label: 'Senior SAS Officer',
            name: 'To be announced',
            image: '/profile.png',
            contact: {
                email: '',
                phone: ''
            },
            note: 'This position is currently vacant.'
        },
        sas_officer: {
            label: 'SAS Officer',
            name: 'To be announced',
            image: '/profile.png',
            contact: {
                email: '',
                phone: ''
            },
            note: 'This position is currently vacant.'
        },
        faculty: {
            label: 'Faculty In-charge',
            people: [
                {
                    name: 'Dr Sriram Karthick Raja P',
                    title: 'Assistant Professor, F/I Sports',
                    image: '/profile.png',
                    contact: {
                        email: 'skarthick.civil@nitjsr.ac.in',
                        phone: ''
                    }
                },
                {
                    name: 'Dr Sakthivel S',
                    title: 'Assistant Professor, F/I Sports',
                    image: '/profile.png',
                    contact: {
                        email: 'sakthi.chem@nitjsr.ac.in',
                        phone: ''
                    }
                },
                {
                    name: 'Dr Jichil Majhi',
                    title: 'Assistant Professor, F/I Sports',
                    image: '/profile.png',
                    contact: {
                        email: 'jichilmajhi.met@nitjsr.ac.in',
                        phone: ''
                    }
                },
                {
                    name: 'Dr Jitendra Kumar',
                    title: 'Assistant Professor, F/I Sports',
                    image: '/profile.png',
                    contact: {
                        email: 'jitendra.ee@nitjsr.ac.in',
                        phone: ''
                    }
                },
                {
                    name: 'Dr Amit Kumar',
                    title: 'Assistant Professor, F/I Sports',
                    image: '/profile.png',
                    contact: {
                        email: 'amitkumar.ece@nitjsr.ac.in',
                        phone: ''
                    }
                },
                {
                    name: 'Dr Dinesh Kumar',
                    title: 'Assistant Professor, F/I Technical Activities',
                    image: '/profile.png',
                    contact: {
                        email: 'dinesh.prod@nitjsr.ac.in',
                        phone: ''
                    }
                },
                {
                    name: 'Dr Basudeba Behera',
                    title: 'Assistant Professor, F/I Technical Activities',
                    image: '/profile.png',
                    contact: {
                        email: 'basudeb.ece@nitjsr.ac.in',
                        phone: ''
                    }
                },
                {
                    name: 'Dr Keshav Kumar Sharma',
                    title: 'Assistant Professor, F/I Cultural Activities',
                    image: '/profile.png',
                    contact: {
                        email: 'kksharma.ce@nitjsr.ac.in',
                        phone: ''
                    }
                },
                {
                    name: 'Dr Ananyo Bhattacharya',
                    title: 'Assistant Professor, F/I Cultural Activities',
                    image: '/profile.png',
                    contact: {
                        email: 'ananyo.ee@nitjsr.ac.in',
                        phone: ''
                    }
                }
            ]
        },
        sas_assistant: {
            label: 'SAS Assistant',
            name: 'Mr. Provat Kr Roy',
            image: '/sasassistance.jpg',
            contact: {
                email: 'provat.sas@nitjsr.ac.in',
                phone: '9836353526'
            },
            note: 'This position is currently vacant.'
        },
        sac_office_staff: {
            label: 'Sr. Attendant',
            name: 'Mr. Jyoti Lal Singh',
            image: '/profile.png',
            contact: {
                email: '----------',
                phone: '9931574988'
            },
            note: 'This position is currently vacant.'
        },
        club_secretary: {
            label: 'Club Secretaries',
            name: 'To be announced',
            image: '/profile.png',
            contact: {
                email: '',
                phone: ''
            },
            note: 'These positions are currently vacant.'
        },
        por_holder: {
            label: 'Student Representatives',
            name: 'To be announced',
            image: '/profile.png',
            contact: {
                email: '',
                phone: ''
            },
            note: 'These positions are currently vacant.'
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar whiteBg={true} />

            {/* Header */}
            <div className="bg-white border-b pt-20">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-900">Our Administration</h1>
                    <p className="mt-2 text-gray-600">Know more about our administration</p>
                </div>
            </div>



            <div className='container py-4 flex flex-col lg:flex-row mx-auto gap-4'>
                {/* Tabs */}
                <div className="w-full lg:w-1/4 bg-white border-b lg:border-b-0 lg:border-r h-auto lg:h-[60vh] overflow-x-auto lg:overflow-y-scroll lg:overflow-x-hidden rounded-t-lg lg:rounded-t-none lg:rounded-l-lg shadow-sm">
                    <div className="px-2 sm:px-4">
                        {/* Mobile: horizontal scroll, Desktop: vertical */}
                        <div className="flex flex-row lg:flex-col py-2 gap-1 lg:gap-0 overflow-x-auto lg:overflow-x-hidden whitespace-nowrap">
                            {Object.keys(tabLabels).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`min-w-[150px] lg:min-w-0 text-left px-4 py-2 sm:px-6 sm:py-4 text-xs sm:text-sm font-medium border-l-0 lg:border-l-2 border-b-2 lg:border-b-0 transition-colors whitespace-nowrap rounded-t-lg lg:rounded-none ${activeTab === tab
                                        ? 'lg:border-blue-600 border-blue-600 text-blue-600 bg-blue-50 lg:bg-white'
                                        : 'lg:border-transparent border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    
                                    {tab=="sac_office_staff" ? "Office Staff": tabLabels[tab].label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contact Cards */}
                <div className="w-full lg:w-3/4 px-0 sm:px-2 lg:px-4 py-2 sm:py-6 flex items-center justify-center">
                    {/* Responsive Card for selected tabLabels data */}
                    {(activeTab === 'dean_associate_dean' ||  activeTab === 'faculty') ? (
                        <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-2 sm:p-4 md:p-6 flex flex-col items-center max-h-[60vh] overflow-y-scroll">
                            <h2 className="text-base sm:text-lg lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-4 text-center">{tabLabels[activeTab].label}</h2>
                            <div className="w-full flex flex-col gap-2 sm:gap-4">
                                {tabLabels[activeTab].people.map((person, idx) => (
                                    <div key={idx} className="flex flex-col sm:flex-row items-center bg-gray-50 rounded-md p-2 sm:p-3 shadow-sm">
                                        <img
                                            src={person.image}
                                            alt={person.name}
                                            className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-full border-2 border-blue-100 mr-0 sm:mr-4 mb-2 sm:mb-0 aspect-square"
                                        />
                                        <div className="flex-1 text-center sm:text-left">
                                            <div className="font-semibold text-gray-900">{person.name}</div>
                                            <div className="text-xs sm:text-sm text-blue-600 mb-1">{person.title}</div>
                                            <div className="flex flex-col text-xs text-gray-600">
                                                <a href={`mailto:${person.contact.email}`} className="hover:text-blue-600 break-all">{person.contact.email}</a>
                                                <a href={`tel:${person.contact.phone}`} className="hover:text-blue-600">{person.contact.phone}</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-2 sm:p-4 md:p-6 flex flex-col lg:flex-row items-center">
                            <img
                                src={tabLabels[activeTab].image}
                                alt={tabLabels[activeTab].name}
                                className="w-24 h-24 sm:w-32 sm:h-32 lg:w-[40vh] lg:h-[40vh] object-cover rounded-full mb-4 lg:mb-0 border-4 border-blue-100 transition-all aspect-square"
                            />
                            <div className="w-full lg:px-6 px-0 flex flex-col items-center lg:items-start">
                                <h2 className="text-base sm:text-lg lg:text-2xl font-bold text-gray-900 mb-1 text-center lg:text-left">
                                    {tabLabels[activeTab].name}
                                </h2>
                                <p className="text-blue-600 font-medium mb-2 text-center lg:text-left">
                                    {tabLabels[activeTab].label}
                                </p>
                                <div className="flex flex-col items-center lg:items-start space-y-1">
                                    <a
                                        href={`mailto:${tabLabels[activeTab].contact.email}`}
                                        className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 flex items-center break-all"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        {tabLabels[activeTab].contact.email}
                                    </a>
                                    <a
                                        href={`tel:${tabLabels[activeTab].contact.phone}`}
                                        className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 flex items-center"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        {tabLabels[activeTab].contact.phone}
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
            {/* Explore More Contacts Button */}
            <div className="w-full flex justify-center mt-6 mb-8">
                <a
                    href="/contact"
                    className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors text-base sm:text-lg"
                >
                    Explore More Contacts
                </a>
            </div>
            <Footer />
        </main>
    );
}
