'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaTiktok, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

import Customerheader from '@/lib/components/layout/header/Customerheader';

export default function ContactWithUs() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto mt-20">
                <Customerheader />
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[#657ED4] dark:text-[#5AD3AF] cursor-default">
                        Contact With Us
                    </h1>
                </div>

                {/* Contact Information Section */}
                <section className="mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4 cursor-default">
                                Get in Touch with CODEGROW
                            </h2>
                            <p className="text-base text-gray-600 dark:text-gray-300 font-medium leading-relaxed cursor-default mb-6">
                                We are here to help you with any questions or support you need.
                                Reach out to us through the contact details below, or follow us on
                                social media to stay updated with the latest from CODEGROW.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <FaMapMarkerAlt className="w-6 h-6 text-[#657ED4] dark:text-[#5AD3AF]" />
                                    <p className="text-base text-gray-600 dark:text-gray-300 font-medium cursor-default">
                                        Đại học FPT
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaPhone className="w-6 h-6 text-[#657ED4] dark:text-[#5AD3AF]" />
                                    <p className="text-base text-gray-600 dark:text-gray-300 font-medium cursor-default">
                                        0986762530
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaEnvelope className="w-6 h-6 text-[#657ED4] dark:text-[#5AD3AF]" />
                                    <Link
                                        href="mailto:Codegrow.vn@gmail.com"
                                        className="text-base text-gray-600 dark:text-gray-300 font-medium hover:text-[#657ED4] dark:hover:text-[#5AD3AF] cursor-pointer"
                                    >
                                        Codegrow.vn@gmail.com
                                    </Link>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaFacebook className="w-6 h-6 text-[#657ED4] dark:text-[#5AD3AF]" />
                                    <Link
                                        href="https://www.facebook.com/codegrow.vn/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-base text-gray-600 dark:text-gray-300 font-medium hover:text-[#657ED4] dark:hover:text-[#5AD3AF] cursor-pointer"
                                    >
                                        Facebook: codegrow.vn
                                    </Link>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaTiktok className="w-6 h-6 text-[#657ED4] dark:text-[#5AD3AF]" />
                                    <Link
                                        href="https://www.tiktok.com/@codegrow.vn"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-base text-gray-600 dark:text-gray-300 font-medium hover:text-[#657ED4] dark:hover:text-[#5AD3AF] cursor-pointer"
                                    >
                                        TikTok: @codegrow.vn
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full h-[300px]">
                            <Image
                                src="/bgcodegrow.jpg" // Ensure this image exists in the public directory
                                alt="Contact CODEGROW"
                                fill
                                className="object-cover rounded-lg shadow-md"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
