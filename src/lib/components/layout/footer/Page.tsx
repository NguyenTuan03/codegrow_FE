'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
    // FaTwitter,
    // FaInstagram,
    // FaYoutube,
    // FaLinkedin,
    FaGithub,
    FaFacebook,
    FaTiktok,
} from 'react-icons/fa';
import { Separator } from '@/components/ui/separator';

interface FooterSection {
    title: string;
    links: { label: string; href: string }[];
}

const footerSections: FooterSection[] = [
    {
        title: 'Company',
        links: [
            { label: 'About Us', href: '/aboutus' },

            { label: 'Contact', href: '/contact' },
        ],
    },
    {
        title: 'Explore',
        links: [
            { label: 'Courses', href: '/customer/courses' },
            { label: 'Classes', href: '/customer/classes' },
            { label: 'RoadMap', href: '/customer/roadmap' },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-800 py-10">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-5 ml-50 gap-10">
                    {/* Logo and Introduction Section */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="relative w-[50px] h-[50px]">
                                <Image
                                    src="/logo.png" // Replace with your actual logo path
                                    alt="CODEGROW Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 cursor-default">
                                CODEGROW
                            </h4>
                        </div>
                        <p className="text-base text-gray-600 dark:text-gray-300 font-medium cursor-default">
                            CODEGROW empowers learners to master coding through structured courses,
                            mentorship, and practical exercises. Join us to grow your skills and
                            achieve your programming goals.
                        </p>
                    </div>

                    {/* Footer Sections */}
                    {footerSections.map((section, idx) => (
                        <div key={idx}>
                            <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 cursor-default">
                                {section.title}
                            </h4>
                            <ul className="space-y-2 text-base text-gray-600 dark:text-gray-300 font-medium">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <Link
                                            href={link.href}
                                            className="hover:text-[#657ED4] dark:hover:text-[#5AD3AF] transition-colors cursor-pointer"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Follow Us Section */}
                    <div>
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 cursor-default">
                            Follow us
                        </h4>
                        <div className="flex gap-4 text-gray-600 dark:text-gray-300">
                            <Link
                                href="https://github.com/NguyenTuan03/codegrow_FE"
                                className="hover:text-[#657ED4] dark:hover:text-[#5AD3AF] cursor-pointer"
                            >
                                <FaGithub className="w-6 h-6" />
                            </Link>
                            <Link
                                href="https://www.tiktok.com/@codegrow.vn"
                                className="hover:text-[#657ED4] dark:hover:text-[#5AD3AF] cursor-pointer"
                            >
                                <FaTiktok className="w-6 h-6" />
                            </Link>
                            <Link
                                href="https://www.facebook.com/codegrow.vn"
                                className="hover:text-[#657ED4] dark:hover:text-[#5AD3AF] cursor-pointer"
                            >
                                <FaFacebook className="w-6 h-6" />
                            </Link>
                            {/* <Link
                                href="#"
                                className="hover:text-[#657ED4] dark:hover:text-[#5AD3AF] cursor-pointer"
                            >
                                <FaYoutube className="w-6 h-6" />
                            </Link>
                            <Link
                                href="#"
                                className="hover:text-[#657ED4] dark:hover:text-[#5AD3AF] cursor-pointer"
                            >
                                <FaLinkedin className="w-6 h-6" />
                            </Link> */}
                        </div>
                    </div>
                </div>

                <Separator className="my-8 bg-gray-200 dark:bg-gray-600" />

                {/* Copyright and Date/Time */}
                <div className="text-center">
                    <p className="text-base text-gray-600 dark:text-gray-300 font-medium cursor-default">
                        © {new Date().getFullYear()} CODEGROW. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
