'use client';

import { useContext, useEffect, useState } from 'react';
import { Auth } from '@/lib/components/context/AuthContext';
import { getUserDetail } from '@/lib/services/admin/getuserdetail';
import { alternativePayment } from '@/lib/services/api/alternativePayment';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Users, BookOpen } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    enrolledCount: number;
    author: string;
    category: { _id: string; name: string } | null;
    createdAt: string;
    imgUrl?: string;
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

                if (res.status === 200) {
                    setEnrolledCourses(res.metadata.enrolledCourses || []);
                }
            } catch (error) {
                console.error('Error fetching enrolled courses:', error);
            }
        };
        fetchEnrolledCourses();
    }, [userAuth]);

    // Log the course data to debug imgUrl
    useEffect(() => {}, [course]);

    if (!course) {
        return (
            <div className="text-center text-gray-600 dark:text-gray-400 py-10 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                Course not found
            </div>
        );
    }

    const handleAlternativePayment = async (paymentMethod: string) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                toast({
                    title: 'Lỗi',
                    description: 'Token không tồn tại. Vui lòng đăng nhập lại.',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });

                return;
            }
            const tokenuser = JSON.parse(token);
            console.log('Token user:', tokenuser);
            setLoading(true);
            const res = await alternativePayment({
                token: tokenuser,
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
            <div
                className="relative h-48 overflow-hidden"
                style={{
                    backgroundImage: course.imgUrl
                        ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${course.imgUrl})`
                        : 'linear-gradient(to bottom, #657ED4, #4a5da0)',
                    backgroundColor: course.imgUrl ? 'transparent' : '#657ED4',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            ></div>
            <div className="p-6 sm:p-8 space-y-6">
                {/* Course Title */}
                <h1 className="sm:text-4xl font-bold text-[#657ED4] dark:text-[#5AD3AF] tracking-tight">
                    {course.title}
                </h1>

                {/* Course Meta Info */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
                    <div className="text-base flex items-center gap-2">
                        <Users className="w-5 h-5 text-[#657ED4]" />
                        <span>{course.enrolledCount} students enrolled</span>
                    </div>
                    <div className="text-base flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-[#657ED4]" />
                        <span>Author: {course.author || 'Unknown'}</span>
                    </div>
                    <div className="text-base flex items-center gap-2">
                        <span>Category: {course.category?.name || 'Uncategorized'}</span>
                    </div>
                </div>

                {/* Course Description */}
                <p className="text-xl leading-relaxed">{course.description}</p>

                {/* Price and Enrollment Status */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Học phí:{' '}
                        <span className="text-[#657ED4] dark:text-[#5AD3AF] text-xl">
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
                                className={`flex cursor-pointer items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-md ${
                                    loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                <img src="/momoo.webp" alt="MoMo" className="h-6 w-6" />
                                {loading ? 'Đang xử lý...' : 'Thanh toán MoMo'}
                            </Button>
                            <Button
                                onClick={() => handleAlternativePayment('vnpay')}
                                disabled={loading}
                                className={`flex cursor-pointer items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-md ${
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
