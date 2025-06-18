'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Customerheader from '@/lib/components/layout/header/Customerheader';

interface TeamMember {
    name: string;
    role: string;
    image: string;
    description: string;
    responsibilities?: string[];
}

export default function AboutUs() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    const teamMembers: TeamMember[] = [
        {
            name: 'Vũ Ngọc Lan Anh',
            role: 'CEO – Chief Executive Officer',
            image: '/anna.jpg',
            description:
                'Vũ Ngọc Lan Anh is the visionary leader behind CODEGROW, driving the mission to empower learners worldwide. With over 4 years of experience in tech education, she is passionate about creating opportunities for aspiring developers to achieve their dreams.',
            responsibilities: [
                'Strategic Planning',
                'Operations Oversight',
                'Financial Management',
                'Product Development',
                'Long-term Vision Implementation',
            ],
        },
        {
            name: 'Trần Thị Diễm Quỳnh',
            role: 'CMO – Chief Marketing Officer',
            image: '/quynh.JPG',
            description:
                'Trần Thị Diễm Quỳnh leads our marketing efforts, ensuring that CODEGROW reaches learners globally. With a background in digital marketing and a knack for storytelling, she has played a key role in building our brand and community.',
            responsibilities: [
                'Marketing & Branding',
                'Media & Ads Management',
                'Content & Community',
                'Market Research',
                'Budget Planning',
            ],
        },
        {
            name: 'Phan Thanh Phong',
            role: 'CFO – Chief Financial Officer',
            image: '/pphong.jpg',
            description:
                'Phan Thanh Phong oversees the financial strategy of CODEGROW, ensuring sustainable growth. With his expertise in finance and business management, he ensures that we can continue to provide high-quality education to our learners.',
            responsibilities: [
                'Financial Management & Budgeting',
                'Financial Reporting',
                'Financial Strategy',
                'Financial Risk Management',
            ],
        },

        {
            name: 'Nguyễn Tiến Kha',
            role: 'CTO – Chief Technology Officer',
            image: '/khant.jpg',
            description:
                'Nguyễn Tiến Kha is the tech mastermind at CODEGROW, leading the development of our cutting-edge platform. With a deep passion for coding and innovation, he ensures that our technology empowers learners to succeed.',
            responsibilities: [
                'Technology',
                'System Design',
                'Platform Performance',
                'Business Support',
            ],
        },
        {
            name: 'Nguyễn Anh Tuấn',
            role: 'CIO - Chief Information Officer',
            image: '/tuan.jpg',
            description:
                'Nguyễn Anh Tuấn manages the information systems at CODEGROW, ensuring seamless operations. His expertise in IT infrastructure helps us deliver a smooth and secure learning experience for all users.',
            responsibilities: [
                'Internal IT Management',
                'Information & Data Security',
                'Process Optimization ',
                'Technology Strategy Support',
                'IT Infrastructure',
            ],
        },
        {
            name: 'Tô Duy Hoàng',
            role: 'Dev Team',
            image: '/hoang.jpg',
            description:
                'Tô Duy Hoàng is a key member of our development team, contributing to the creation of innovative features for CODEGROW. His dedication to coding excellence helps us provide a top-notch platform for our learners.',
            responsibilities: [
                'System Development',
                'Performance & Security',
                'AI Support',
                'Code Review',
                'UI/UX Debugging',
            ],
        },
    ];

    const openModal = (member: TeamMember) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMember(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto mt-20">
                <Customerheader />
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[#657ED4] dark:text-[#5AD3AF] cursor-default">
                        About Us
                    </h1>
                </div>

                {/* Introduction Section */}
                <section className="mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 cursor-default">
                                Welcome to CODEGROW
                            </h2>
                            <p className="text-base text-gray-600 dark:text-gray-300 font-medium leading-relaxed cursor-default">
                                At CODEGROW, we are passionate about empowering individuals to
                                master coding and achieve their programming dreams. Our platform
                                offers structured courses, personalized mentorship, and hands-on
                                exercises designed to help learners at all levels—from beginners to
                                advanced developers—grow their skills and succeed in the tech world.
                            </p>
                        </div>
                        <div className="relative w-full h-[300px]">
                            <Image
                                src="/logocodegrow.jpg" // Ensure this image exists in the public directory
                                alt="About CODEGROW"
                                fill
                                className="object-cover rounded-lg shadow-md"
                            />
                        </div>
                    </div>
                </section>

                {/* Mission and Vision Section */}
                <section className="mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="bg-white dark:bg-gray-700 shadow-md border-gray-200 dark:border-gray-600 rounded-xl">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100 cursor-default">
                                    Our Mission
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-base text-gray-600 dark:text-gray-300 font-medium leading-relaxed cursor-default">
                                    To provide accessible, high-quality coding education that equips
                                    learners with the skills and confidence to excel in the tech
                                    industry, fostering a global community of passionate coders.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-white dark:bg-gray-700 shadow-md border-gray-200 dark:border-gray-600 rounded-xl">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100 cursor-default">
                                    Our Vision
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-base text-gray-600 dark:text-gray-300 font-medium leading-relaxed cursor-default">
                                    To be the leading platform for coding education, inspiring
                                    innovation and growth by connecting learners with expert mentors
                                    and cutting-edge resources worldwide.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Team Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-8 text-center cursor-default">
                        Meet Our Team
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <section
                                key={index}
                                className="bg-white dark:bg-gray-700 shadow-md border-gray-200 dark:border-gray-600 rounded-xl flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow duration-300"
                                onClick={() => openModal(member)}
                            >
                                <div className="relative w-full h-[300px]">
                                    <Image
                                        src={member.image} // Ensure this image exists in the public directory
                                        alt={member.name}
                                        fill
                                        className="object-cover rounded-t-xl"
                                    />
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 cursor-default">
                                        {member.name}
                                    </h3>
                                    <p className="text-base text-gray-600 dark:text-gray-300 font-medium cursor-default">
                                        {member.role}
                                    </p>
                                </div>
                            </section>
                        ))}
                    </div>
                </section>

                {isModalOpen && selectedMember && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-transparent">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 p-6 relative">
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <div className="flex flex-col items-center">
                                <div className="relative w-[200px] h-[200px] mb-4">
                                    <Image
                                        src={selectedMember.image}
                                        alt={selectedMember.name}
                                        fill
                                        className="object-cover rounded-full border-4 border-[#657ED4] dark:border-[#5AD3AF]"
                                    />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2 cursor-default">
                                    {selectedMember.name}
                                </h3>
                                <p className="text-lg text-gray-600 dark:text-gray-300 font-medium mb-4 cursor-default">
                                    {selectedMember.role}
                                </p>
                                <p className="text-base text-gray-600 dark:text-gray-300 font-medium leading-relaxed text-center cursor-default mb-4">
                                    {selectedMember.description}
                                </p>
                                {selectedMember.responsibilities && (
                                    <div className="">
                                        <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 cursor-default">
                                            Responsibilities
                                        </h4>
                                        <ul className="text-base text-gray-600 dark:text-gray-300 font-medium list-disc list-inside">
                                            {selectedMember.responsibilities.map(
                                                (responsibility, idx) => (
                                                    <li key={idx} className="cursor-default">
                                                        {responsibility}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
