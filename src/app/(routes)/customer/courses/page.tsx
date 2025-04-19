'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from '@/components/ui/pagination';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { GetCourses } from '@/lib/services/course/getcourse';
import { toast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import { EnrollCourse } from '@/lib/services/course/enrollcourse';
import { useRouter } from 'next/navigation';

interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    author: {
        fullName: string;
    };
    category: string;
    createdAt: string;
    enrolledCount: number;
    enrolledAt?: string | null; // Thêm trường này
}

export default function CoursesPage() {
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState<Course[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const router = useRouter();
    // const [sucess, setSucess] = useState(false);
    const fetchCourse = async (page: number = 1) => {
        try {
            setLoading(true);
            const limit = 6; // Số khóa học mỗi trang
            const data = await GetCourses(page, limit); // Gửi page và limit
            console.log('Dữ liệu API:', data);

            setCourses(data.metadata.courses);
            setCurrentPage(data.metadata.page);
            setTotalPages(data.metadata.totalPages);
        } catch (error: unknown) {
            console.error('Lỗi khi lấy khóa học:', error);
            toast({
                title: 'Lỗi',
                description:
                    error instanceof Error ? error.message : 'Không thể lấy danh sách khóa học',
                variant: 'destructive',
            });
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourse(currentPage);
    }, [currentPage]);

    const handleEnroll = async (courseId: string) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast({
                    title: 'Lỗi',
                    description: 'Bạn cần đăng nhập để đăng ký khóa học',
                    variant: 'destructive',
                });
                router.push('/login');
                return;
            }

            setLoading(true);
            const response = await EnrollCourse({ courseId, token });

            if (response.success === 200) {
                toast({
                    title: 'Thành công',
                    description: 'Bạn đã đăng ký khóa học thành công!',
                    variant: 'default',
                });

                router.refresh();
            } else {
                throw new Error(response.message || 'Đăng ký thất bại');
            }
        } catch (error) {
            console.error('Lỗi khi đăng ký khóa học:', error);
            toast({
                title: 'Lỗi',
                description:
                    error instanceof Error ? error.message : 'Đã xảy ra lỗi không xác định',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
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
                        Không có khóa học nào hiện tại.
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {courses.map((course) => (
                                <Card
                                    key={course._id}
                                    className="rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-[#EEF1EF] dark:border-gray-700 group bg-white dark:bg-gray-800"
                                >
                                    <div className="relative w-full h-[200px]">
                                        {/* <Image
                                            src=""
                                            alt={course.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            onError={(e) => {
                                                e.currentTarget.src = '/placeholder-course.jpg';
                                            }}
                                        /> */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                        <Badge
                                            className={`absolute top-3 left-3 text-white px-3 py-1 rounded-lg font-medium ${
                                                course.category === 'Programming'
                                                    ? 'bg-gradient-to-r from-green-400 to-green-600'
                                                    : course.category === 'Design'
                                                      ? 'bg-gradient-to-r from-blue-400 to-blue-600'
                                                      : course.category === 'Marketing'
                                                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                                                        : 'bg-gradient-to-r from-gray-400 to-gray-600'
                                            }`}
                                        >
                                            {course.category}
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
                                            <strong>Author:</strong> {course.author?.fullName}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            <strong>Created At:</strong>{' '}
                                            {new Date(course.createdAt).toLocaleDateString()}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            <strong>Enrolled Count:</strong> {course.enrolledCount}
                                        </p>

                                        <div className="flex items-center justify-between gap-4">
                                            {course.enrolledAt !== '' ? (
                                                <Link
                                                    href={`/customer/courses/${course._id}`}
                                                    className="flex-1"
                                                >
                                                    <Button
                                                        className="w-full bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white transition-all duration-300 flex items-center justify-center gap-2"
                                                        size="lg"
                                                    >
                                                        View Detail
                                                        <FaArrowRight className="text-sm" />
                                                    </Button>
                                                </Link>
                                            ) : (
                                                <Button
                                                    onClick={() => handleEnroll(course._id)}
                                                    className="flex-1 w-full bg-[#657ED4] hover:bg-blue-700 text-white transition-all duration-300 flex items-center justify-center gap-2"
                                                    size="lg"
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Processing...' : 'Enroll Now'}
                                                    <FaArrowRight className="text-sm" />
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-12 flex justify-center">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                className={
                                                    currentPage === 1
                                                        ? 'pointer-events-none opacity-50'
                                                        : 'cursor-pointer'
                                                }
                                            />
                                        </PaginationItem>

                                        {/* Hiển thị số trang */}
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                            (page) => (
                                                <PaginationItem key={page}>
                                                    <PaginationLink
                                                        onClick={() => handlePageChange(page)}
                                                        isActive={currentPage === page}
                                                        className={
                                                            currentPage === page
                                                                ? 'bg-blue-600 text-white'
                                                                : 'cursor-pointer'
                                                        }
                                                    >
                                                        {page}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            ),
                                        )}

                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                className={
                                                    currentPage === totalPages
                                                        ? 'pointer-events-none opacity-50'
                                                        : 'cursor-pointer'
                                                }
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
