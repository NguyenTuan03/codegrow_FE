'use client';
import { useState, useEffect } from 'react';
import * as React from 'react';
import ProfileForm from '@/components/profile-form';
import { useToast } from '@/components/ui/use-toast';
import { getUserDetail } from '@/lib/services/admin/getuserdetail';

export default function ProfileMentor() {
    const { toast } = useToast();
    const [loading, setLoading] = React.useState(true);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const userData = localStorage.getItem('user');
                if (!userData) {
                    throw new Error('User data is missing');
                }

                const user = JSON.parse(userData);
                const id = user.id;

                const userDetail = await getUserDetail(id);
                console.log(`User detail for ID ${id}:`, userDetail);
                setProfileData(userDetail.metadata);
            } catch (error) {
                console.error(' ❌ Error fetching user details:', error);
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

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-300">
            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 dark:border-indigo-400 border-solid"></div>
                    <p className="mt-4 text-2xl text-indigo-700 dark:text-indigo-300 font-medium">
                        Loading your mentor profile...
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
                        Failed to load mentor profile. Please try again later.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 transform transition-all duration-300 hover:shadow-xl">
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="relative">
                                <svg
                                    className="w-16 h-16 text-[#657ED4] dark:text-[#5AD3AF]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5.121 18.879A3 3 0 018 17h8a3 3 0 012.879 1.879M15 11a3 3 0 11-6 0 3 3 0 016 0zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span className="absolute -top-2 -right-2 text-[#657ED4] dark:text-[#5AD3AF] text-base font-bold rounded-full h-6 w-6 flex items-center justify-center">
                                    M
                                </span>
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-[#657ED4] dark:text-[#5AD3AF]">
                            Mentor Profile
                        </h1>
                        <p className="text-xl mt-2 text-gray-700 dark:text-gray-300">
                            Showcase your expertise and manage your details
                        </p>
                    </div>
                    <div className="flex flex-col gap-6">
                        <ProfileForm profile={profileData} />
                    </div>
                </div>
            )}
        </div>
    );
}
