'use client'
import AuthContext, { Auth } from "@/lib/components/context/AuthContext";
import { getUserDetail } from "@/lib/services/admin/getuserdetail";
import { alternativePayment } from "@/lib/services/api/alternativePayment";
import { makePayment } from "@/lib/services/api/payment";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

// @/app/(routes)/customer/courses/[courseId]/CourseHeader.tsx
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
  const [enrolledCourses, setEnrolledCourses] = useState<[]>([]);
  const {userAuth} = useContext(Auth)
    useEffect(() => {
      const fetchEnrolledCourses = async () => {
        const res = await getUserDetail(userAuth.id)
        console.log('day ne',res);        
        if (res.status === 200) {
          setEnrolledCourses(res.metadata.enrolledCourses)
        }
        console.log(res);        
      }    
      fetchEnrolledCourses()
    },[])
    if (!course) {
        return <div>Course not found</div>;
    }
    const handleAlternativePayment = async (paymentMethod:string) => {
      try {
        const res = await alternativePayment({
          token:localStorage.getItem('token'),
          paymentMethod,
          course
        })
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
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-[#657ED4] dark:text-[#5AD3AF] mb-2">
                {course.title}
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  <p>Học phí: <span className="font-semibold">{(course.price)}</span></p>
                </div>                
                {
                  enrolledCourses.map((courseId:string) => courseId._id).includes(course._id) ? (
                    <div className="text-lg text-green-500 font-semibold mb-4">Bạn đã tham gia khóa học này</div>
                  ) : (                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">                
                      <button
                        onClick={() => handleAlternativePayment('momo')}
                        disabled={loading}
                        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition"
                      >
                        {loading ? 'Đang xử lý...' : 'Thanh toán bằng MoMo'}
                      </button>

                      <button
                        onClick={() => handleAlternativePayment('vnpay')}
                        disabled={loading}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition"
                      >
                        {loading ? 'Đang xử lý...' : 'Thanh toán bằng VNPay'}
                      </button>
                    </div>   
                  )
                }
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Category: {course.category?.name || 'Uncategorized'}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{course.description}</p>
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    Instructor: {course.author?.fullName || 'Unknown'}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    Enrolled: {course.enrolledCount} students
                </span>
            </div>
        </div>
    );
}
