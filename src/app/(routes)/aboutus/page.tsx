'use client';

import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Customerheader from '@/lib/components/layout/header/Customerheader';

export default function AboutUs() {
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
                            <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4 cursor-default">
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
                        {/* Member 1: Vũ Ngọc Lan Anh */}
                        <section className="bg-white dark:bg-gray-700 shadow-md border-gray-200 dark:border-gray-600 rounded-xl flex flex-col items-center">
                            <div className="relative w-full h-[300px]">
                                <Image
                                    src="/anna.jpg" // Ensure this image exists in the public directory
                                    alt="Vũ Ngọc Lan Anh"
                                    fill
                                    className="object-cover rounded-t-xl"
                                />
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 cursor-default">
                                    Vũ Ngọc Lan Anh
                                </h3>
                                <p className="text-base text-gray-600 dark:text-gray-300 font-medium cursor-default">
                                    CEO – Chief Executive Officer
                                </p>
                            </div>
                        </section>

                        {/* Member 2: Trần Thị Diễm Quỳnh */}
                        <section className="bg-white dark:bg-gray-700 shadow-md border-gray-200 dark:border-gray-600 rounded-xl flex flex-col items-center">
                            <div className="relative w-full h-[300px]">
                                <Image
                                    src="/quynh.png" // Ensure this image exists in the public directory
                                    alt="Trần Thị Diễm Quỳnh"
                                    fill
                                    className="object-cover rounded-t-xl"
                                />
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 cursor-default">
                                    Trần Thị Diễm Quỳnh
                                </h3>
                                <p className="text-base text-gray-600 dark:text-gray-300 font-medium cursor-default">
                                    CMO – Chief Marketing Officer
                                </p>
                            </div>
                        </section>

                        {/* Member 3: Phan Thanh Phong */}
                        <section className="bg-white dark:bg-gray-700 shadow-md border-gray-200 dark:border-gray-600 rounded-xl flex flex-col items-center">
                            <div className="relative w-full h-[300px]">
                                <Image
                                    src="/phong.png" // Ensure this image exists in the public directory
                                    alt="Phan Thanh Phong"
                                    fill
                                    className="object-cover rounded-t-xl"
                                />
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 cursor-default">
                                    Phan Thanh Phong
                                </h3>
                                <p className="text-base text-gray-600 dark:text-gray-300 font-medium cursor-default">
                                    CFO – Chief Financial Officer
                                </p>
                            </div>
                        </section>

                        {/* Member 4: Nguyễn Tiến Kha */}
                        <section className="bg-white dark:bg-gray-700 shadow-md border-gray-200 dark:border-gray-600 rounded-xl flex flex-col items-center">
                            <div className="relative w-full h-[300px]">
                                <Image
                                    src="/khant.jpg" // Ensure this image exists in the public directory
                                    alt="Nguyễn Tiến Kha"
                                    fill
                                    className="object-cover rounded-t-xl"
                                />
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 cursor-default">
                                    Nguyễn Tiến Kha
                                </h3>
                                <p className="text-base text-gray-600 dark:text-gray-300 font-medium cursor-default">
                                    CTO – Chief Technology Officer
                                </p>
                            </div>
                        </section>

                        {/* Member 5: Nguyễn Anh Tuấn */}
                        <section className="bg-white dark:bg-gray-700 shadow-md border-gray-200 dark:border-gray-600 rounded-xl flex flex-col items-center">
                            <div className="relative w-full h-[300px]">
                                <Image
                                    src="/tuan.png" // Ensure this image exists in the public directory
                                    alt="Nguyễn Anh Tuấn"
                                    fill
                                    className="object-cover rounded-t-xl"
                                />
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 cursor-default">
                                    Nguyễn Anh Tuấn
                                </h3>
                                <p className="text-base text-gray-600 dark:text-gray-300 font-medium cursor-default">
                                    CIO - Chief Information Officer
                                </p>
                            </div>
                        </section>

                        {/* Member 6: Tô Duy Hoàng */}
                        <section className="bg-white dark:bg-gray-700 shadow-md border-gray-200 dark:border-gray-600 rounded-xl flex flex-col items-center">
                            <div className="relative w-full h-[300px]">
                                <Image
                                    src="/hoang.jpg" // Ensure this image exists in the public directory
                                    alt="Tô Duy Hoàng"
                                    fill
                                    className="object-cover rounded-t-xl"
                                />
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 cursor-default">
                                    Tô Duy Hoàng
                                </h3>
                                <p className="text-base text-gray-600 dark:text-gray-300 font-medium cursor-default">
                                    Dev Team
                                </p>
                            </div>
                        </section>
                    </div>
                </section>
            </div>
        </div>
    );
}
