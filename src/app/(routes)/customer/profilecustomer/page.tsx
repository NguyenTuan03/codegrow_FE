'use client';

import { useState, useEffect } from 'react';
import * as React from 'react';
import ProfileForm from '@/components/profile-form';
import { useToast } from '@/components/ui/use-toast';
import { getUserDetail } from '@/lib/services/admin/getuserdetail';
import ProfileEnrollCourse from '@/app/(routes)/customer/profilecustomer/ProfileEnrollCourse';

export default function ProfileCustomer() {
    const { toast } = useToast();
    const [loading, setLoading] = React.useState(true);

    interface ProfileData {
        email: string;
        _id: string;
        fullName: string;
        role?: string;
        avatar: string;
        wallet?: string;
        enrolledCourses?: {
            _id: string;
            title: string;
            description: string;
            price: string;
            author: [];
            category: { _id: string; name: string } | null;
        }[]; // Original structure
    }

    const [profileData, setProfileData] = useState<ProfileData | null>(null);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const userData = localStorage.getItem('user');
                if (!userData) {
                    throw new Error('User data is missing');
                }

                const user = JSON.parse(userData);
                const id = user._id;

                const userDetail = await getUserDetail(id);
                console.log(`User detail for ID ${id}:`, userDetail);
                setProfileData(userDetail.metadata);
            } catch (error) {
                console.error('❌ Error fetching user details:', error);
                toast({
                    description: 'Failed to retrieve profile. Please try again.',
                    variant: 'destructive',
                });
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, [toast]);

    // Chuyển đổi dữ liệu enrolledCourses sang định dạng mong đợi
    const transformedCourses =
        profileData?.enrolledCourses?.map((course) => ({
            _id: course._id,
            title: course.title,
            category: course.category, // Sử dụng category từ enrolledCourses
            price: parseFloat(course.price), // Chuyển đổi price sang số
        })) || [];

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 dark:border-blue-300 border-solid"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
                        Loading your profile...
                    </p>
                </div>
            ) : !profileData ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh] bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md w-full">
                    <svg
                        className="w-16 h-16 text-red-500 dark:text-red-400 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <p className="text-gray-700 dark:text-gray-300 text-lg font-medium text-center">
                        Failed to load profile data. Please try again later.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-4 py-2 bg-[#657ED4] dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-7xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 md:p-12 transform transition-all duration-300 hover:shadow-3xl">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-[#657ED4] dark:[#5AD3AF]">
                            Your Profile
                        </h1>
                        <p className="text-xl text-gray-700 dark:text-gray-300 mt-4">
                            Manage your personal information and enrolled courses
                        </p>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-10">
                        <div className="flex-1 w-full lg:w-[60%]">
                            <div className="border-2 border-gray-300 dark:border-gray-700 rounded-xl p-8 h-full bg-gray-50 dark:bg-gray-900">
                                <ProfileForm profile={profileData} />
                            </div>
                        </div>
                        <div className="flex-1 w-full lg:w-[40%]">
                            <div className="border-2 border-gray-300 dark:border-gray-700 rounded-xl p-8 h-full bg-gray-50 dark:bg-gray-900">
                                <ProfileEnrollCourse courses={transformedCourses} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
