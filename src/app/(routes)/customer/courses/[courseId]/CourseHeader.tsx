'use client';
import { Auth } from '@/lib/components/context/AuthContext';
import { getUserDetail } from '@/lib/services/admin/getuserdetail';
import { alternativePayment } from '@/lib/services/api/alternativePayment';
import { useContext, useEffect, useState } from 'react';

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

    // Safely access the context
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
                console.log('day ne', res);
                if (res.status === 200) {
                    setEnrolledCourses(res.metadata.enrolledCourses);
                }
                console.log(res);
            } catch (error) {
                console.error('Error fetching enrolled courses:', error);
            }
        };
        fetchEnrolledCourses();
    }, [userAuth]);

    if (!course) {
        return (
            <div className="text-center text-gray-600 dark:text-gray-400 py-10">
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

    return (
        <div className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg mx-auto">
            {/* Course Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-green-400 mb-4">
                {course.title}
            </h1>

            {/* Course Meta Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Instructor: {course.author?.fullName || 'Unknown'}
                    </span>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Enrolled: {course.enrolledCount} students
                    </span>
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-2 sm:mt-0">
                    Category: {course.category?.name || 'Uncategorized'}
                </span>
            </div>

            {/* Course Description */}
            <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                {course.description}
            </p>

            {/* Price and Enrollment Status */}
            <div className="mb-6">
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Học phí:{' '}
                    <span className="text-blue-600 dark:text-blue-400">
                        ${course.price.toFixed(2)}
                    </span>
                </p>
            </div>

            {/* Enrollment Status or Payment Buttons */}
            {enrolledCourses.map((enrolledCourse) => enrolledCourse._id).includes(course._id) ? (
                <div className="text-lg font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 rounded-lg p-4 text-center">
                    Bạn đã tham gia khóa học này
                </div>
            ) : (
                <div className="grid grid-cols-1  md:grid-cols-2 gap-4 mt-6">
                    <button
                        onClick={() => handleAlternativePayment('momo')}
                        disabled={loading}
                        className={`flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        <img src="/momoo.webp" alt="MoMo" className="h-6 w-6" />
                        {loading ? 'Đang xử lý...' : 'Thanh toán bằng MoMo'}
                    </button>
                    <button
                        onClick={() => handleAlternativePayment('vnpay')}
                        disabled={loading}
                        className={`flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        <img src="/vnpay.png" alt="VNPay" className="h-6 w-6" />
                        {loading ? 'Đang xử lý...' : 'Thanh toán bằng VNPay'}
                    </button>
                </div>
            )}
        </div>
    );
}
