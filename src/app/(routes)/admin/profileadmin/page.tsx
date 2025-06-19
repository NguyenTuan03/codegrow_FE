'use client';
import { useState, useEffect } from 'react';
import * as React from 'react';
import ProfileForm from '@/components/profile-form';
import { useToast } from '@/components/ui/use-toast';
import { getUserDetail } from '@/lib/services/admin/getuserdetail';

export default function ProfileAdmin() {
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
                console.log('User data:', user);

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
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-navy-900 to-navy-700 p-6 flex items-center justify-center">
            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gold-400 border-solid"></div>
                    <p className="mt-4 text-gold-200 font-medium">Loading admin profile...</p>
                </div>
            ) : !profileData ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh] bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full">
                    <svg
                        className="w-16 h-16 text-red-500 dark:text-red-400 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="Error icon"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <p className="text-gray-700 dark:text-gray-300 text-lg font-medium text-center">
                        Failed to load admin profile. Please try again later.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-6 py-2 bg-navy-600 dark:bg-navy-500 text-white rounded-lg hover:bg-navy-700 dark:hover:bg-navy-600 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-3xl">
                    {/* Profile Form */}
                    <div>
                        <h2 className="text-lg font-semibold text-navy-700 dark:text-navy-300 mb-4 flex items-center gap-2">
                            <svg
                                className="w-5 h-5 text-gold-500 dark:text-gold-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                            </svg>
                            Edit Profile
                        </h2>
                        <ProfileForm profile={profileData} />
                    </div>
                </div>
            )}
        </div>
    );
}
