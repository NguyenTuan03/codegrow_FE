'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { FaClock, FaPlay, FaUserFriends, FaArrowRight } from 'react-icons/fa';

const courses = new Array(6).fill({
    img: '/courses.png',
    title: 'Lập trình Python cơ bản',
    description: 'Kiến thức nhập môn IT cho người mới bắt đầu',
    progress: 'Đang mở',
    price: '100.000đ',
    students: '1.2k',
    lessons: 9,
    duration: '3h12p',
});

export default function CoursesPage() {
    return (
        <div className="py-12 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Tổng hợp khoá học lập trình tại{' '}
                        <span className="text-blue-600">CODEGROW</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Học lập trình từ cơ bản đến nâng cao với lộ trình bài bản, dễ hiểu
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <Card
                            key={index}
                            className="rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-200 group"
                        >
                            <div className="relative w-full h-[200px]">
                                <Image
                                    src={course.img}
                                    alt={course.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                <Badge className="absolute top-3 left-3 bg-white text-blue-600 hover:bg-white">
                                    {course.progress}
                                </Badge>
                            </div>

                            <CardHeader className="pb-3">
                                <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">
                                    {course.title}
                                </CardTitle>
                                <p className="text-gray-600 text-sm line-clamp-2">
                                    {course.description}
                                </p>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <FaUserFriends className="text-blue-500" />
                                        <span>{course.students} học viên</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaPlay className="text-blue-500" />
                                        <span>{course.lessons} bài học</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaClock className="text-blue-500" />
                                        <span>{course.duration}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <Link
                                        href="/customer/coursesdetail"
                                        className="w-full max-w-[150px]"
                                    >
                                        <Button
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 flex items-center gap-2"
                                            size="lg"
                                        >
                                            Vào học ngay
                                            <FaArrowRight className="text-sm" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
