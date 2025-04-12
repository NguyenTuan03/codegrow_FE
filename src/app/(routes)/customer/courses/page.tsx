'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { FaClock, FaPlay, FaUserFriends } from 'react-icons/fa';

const courses = new Array(6).fill({
    img: '/courses.png',
    description: 'Kiến thức nhập môn IT',
    progress: '50% learning',
    price: '100.000',
    lessons: 9,
    duration: '3h12p',
});

export default function CoursesPage() {
    return (
        <div className="py-10 bg-white min-h-screen">
            <div className="px-4 lg:px-20">
                <h2 className="text-2xl font-bold text-center mb-10">
                    Tổng hợp khoá học lập trình tại <span className="text-[#000]">CODEGROW</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {courses.map((course, index) => (
                        <Card
                            key={index}
                            className="rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative w-full h-[180px]">
                                <Image
                                    src={course.img}
                                    alt={course.description}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-semibold text-blue-600">
                                    {course.description}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-3">
                                <Badge className="bg-teal-100 text-teal-600 w-fit text-sm">
                                    {course.progress}
                                </Badge>

                                <div className="flex justify-between items-center text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <FaUserFriends />
                                        {course.price}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaPlay />
                                        {course.lessons}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaClock />
                                        {course.duration}
                                    </div>
                                </div>

                                <Link href="/customer/coursesdetail">
                                    <Button variant="secondary" className="w-full mt-4">
                                        Vào học
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
