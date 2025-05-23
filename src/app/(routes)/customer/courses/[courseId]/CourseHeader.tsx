'use client';

import { useContext, useEffect, useState } from 'react';
import { Auth } from '@/lib/components/context/AuthContext';
import { getUserDetail } from '@/lib/services/admin/getuserdetail';
import { alternativePayment } from '@/lib/services/api/alternativePayment';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Users, BookOpen } from 'lucide-react';

interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    enrolledCount: number;
    author: {
        _id: string;
        fullName: string;
        email: string;
        role: string;
    };
    category: { _id: string; name: string } | null;
    createdAt: string;
}

interface CourseHeaderProps {
    course: Course | null;
}

export default function CourseHeader({ course }: CourseHeaderProps) {
    const [loading, setLoading] = useState(false);
    const [enrolledCourses, setEnrolledCourses] = useState<{ _id: string }[]>([]);

    const authContext = useContext(Auth);
    if (!authContext) {
        throw new Error('CourseHeader must be used within an AuthContext Provider');
    }
    const { userAuth } = authContext;

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            if (!userAuth) {
                console.log('User is not authenticated');
                return;
            }

            try {
                const res = await getUserDetail(userAuth.id);
                console.log('User detail response:', res);
                if (res.status === 200) {
                    setEnrolledCourses(res.metadata.enrolledCourses || []);
                }
            } catch (error) {
                console.error('Error fetching enrolled courses:', error);
            }
        };
        fetchEnrolledCourses();
    }, [userAuth]);

    if (!course) {
        return (
            <div className="text-center text-gray-600 dark:text-gray-400 py-10 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                Course not found
            </div>
        );
    }

    const handleAlternativePayment = async (paymentMethod: string) => {
        try {
            setLoading(true);
            const res = await alternativePayment({
                token: localStorage.getItem('token'),
                paymentMethod,
                course,
            });
            const { payUrl } = res.data.metadata;

            if (payUrl) {
                window.location.href = payUrl;
            } else {
                console.error('Không lấy được đường link thanh toán.');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const isEnrolled = enrolledCourses.some((enrolledCourse) => enrolledCourse._id === course._id);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="relative h-48 bg-gradient-to-r from-[#5AD3AF]/20 to-[#657ED4]/20 dark:from-[#5AD3AF]/10 dark:to-[#657ED4]/10">
                {/* Placeholder for course image or banner */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-20 h-20 text-[#5AD3AF] opacity-20" />
                </div>
            </div>
            <div className="p-6 sm:p-8 space-y-6">
                {/* Course Title */}
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    {course.title}
                </h1>

                {/* Course Meta Info */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-[#657ED4]" />
                        <span>{course.enrolledCount} students enrolled</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-[#657ED4]" />
                        <span>Instructor: {course.author?.fullName || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>Category: {course.category?.name || 'Uncategorized'}</span>
                    </div>
                </div>

                {/* Course Description */}
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-base">
                    {course.description}
                </p>

                {/* Price and Enrollment Status */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Học phí:{' '}
                        <span className="text-[#5AD3AF] dark:text-[#5AD3AF] text-2xl">
                            ${course.price.toFixed(2)}
                        </span>
                    </p>

                    {isEnrolled ? (
                        <div className="flex items-center gap-2 text-lg font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 rounded-full px-4 py-2">
                            <CheckCircle2 className="w-5 h-5" />
                            Bạn đã tham gia khóa học này
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                                onClick={() => handleAlternativePayment('momo')}
                                disabled={loading}
                                className={`flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-md ${
                                    loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                <img src="/momoo.webp" alt="MoMo" className="h-6 w-6" />
                                {loading ? 'Đang xử lý...' : 'Thanh toán MoMo'}
                            </Button>
                            <Button
                                onClick={() => handleAlternativePayment('vnpay')}
                                disabled={loading}
                                className={`flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-md ${
                                    loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                <img src="/vnpay.png" alt="VNPay" className="h-6 w-6" />
                                {loading ? 'Đang xử lý...' : 'Thanh toán VNPay'}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
