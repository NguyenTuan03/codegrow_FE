'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { GetCourses } from '@/lib/services/course/getcourse';
import { toast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import { EnrollCourse } from '@/lib/services/course/enrollcourse';
import { useRouter } from 'next/navigation';

// Define interfaces for type safety
interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    author: string;
    category: string;
    createdAt: string;
    enrolledCount: number;
    isEnrolled: boolean;
}

interface ApiResponse {
    message: string;
    status: number;
    metadata: {
        courses: Course[];
        page: number;
        totalPages: number;
    };
}

export default function CoursesPage() {
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState<Course[]>([]);

    const router = useRouter();
    const fetchCourse = async () => {
        try {
            const data: ApiResponse = await GetCourses();
            console.log('check data', data);

            if (data.metadata.courses && data.metadata.courses.length > 0) {
                setCourses(data.metadata.courses);
                console.log('check course', data);
            } else {
                throw new Error('No courses found');
            }
        } catch (error: unknown) {
            console.error('Failed to fetch courses:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to fetch courses',
                variant: 'destructive',
            });
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourse();
    }, []);

    const handleEnroll = async (courseId: string) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast({
                    title: 'Error',
                    description: 'You need to log in to enroll in a course',
                    variant: 'destructive',
                });
                return;
            }

            setLoading(true);

            const response = await EnrollCourse({ courseId, token });
            if (!response.ok) {
                throw new Error('Failed to enroll in the course');
            }

            toast({
                title: 'Success',
                description: 'You have successfully enrolled in the course!',
                variant: 'default',
            });

            router.push(`/customer/courses/${courseId}`);
        } catch (error) {
            console.error('Error enrolling in course:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'An unknown error occurred',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="py-12 bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        Tổng hợp khoá học lập trình tại{' '}
                        <span className="text-[#5AD3AF] dark:text-[#4ac2a0]">CODEGROW</span>
                    </h2>
                    <p className="text-gray-900 dark:text-gray-300 max-w-2xl mx-auto">
                        Học lập trình từ cơ bản đến nâng cao với lộ trình bài bản, dễ hiểu
                    </p>
                </div>

                {courses.length === 0 ? (
                    <div className="text-center text-gray-600 dark:text-gray-400 p-6">
                        No courses available at the moment.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course) => (
                            <Card
                                key={course._id}
                                className="rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-[#EEF1EF] dark:border-gray-700 group bg-white dark:bg-gray-800"
                            >
                                <div className="relative w-full h-[200px]">
                                    <Image
                                        src="data:image/png;base64,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"
                                        alt={course.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        onError={(e) => {
                                            e.currentTarget.src = '/placeholder-course.jpg';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 hover:bg-[#EEF1EF]">
                                        New
                                    </Badge>
                                </div>

                                <CardHeader className="pb-3">
                                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 line-clamp-2">
                                        {course.title}
                                    </CardTitle>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                                        {course.description}
                                    </p>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        <strong>Price:</strong> {course.price} VND
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        <strong>Author:</strong> {course.author}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        <strong>Category:</strong> {course.category}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        <strong>Created At:</strong>{' '}
                                        {new Date(course.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        <strong>Enrolled Count:</strong> {course.enrolledCount}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        {course.isEnrolled ? (
                                            <Link
                                                href={`/customer/courses/${course._id}`}
                                                className="w-full max-w-[150px]"
                                            >
                                                <Button
                                                    className="w-full bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white transition-all duration-300 flex items-center gap-2"
                                                    size="lg"
                                                >
                                                    View Detail
                                                    <FaArrowRight className="text-sm" />
                                                </Button>
                                            </Link>
                                        ) : (
                                            <Button
                                                onClick={() => handleEnroll(course._id)}
                                                className="w-full bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white transition-all duration-300 flex items-center gap-2"
                                                size="lg"
                                            >
                                                Enroll
                                                <FaArrowRight className="text-sm" />
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
