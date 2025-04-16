'use client';
import { useState, useEffect } from 'react';
import * as React from 'react';
import ProfileForm from '@/components/profile-form';
import { useToast } from '@/components/ui/use-toast';
import { getUserDetail } from '@/lib/services/admin/getuserdetail';

export default function ProfileCustomer() {
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

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center p-4">
            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
                    <p className="mt-4 text-gray-600 font-medium">Loading your profile...</p>
                </div>
            ) : !profileData ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh] bg-white rounded-lg shadow-md p-8 max-w-md w-full">
                    <svg
                        className="w-16 h-16 text-red-500 mb-4"
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
                    <p className="text-gray-700 text-lg font-medium text-center">
                        Failed to load profile data. Please try again later.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-4 py-2 bg-[#657ED4] text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 md:p-8 transform transition-all duration-300 hover:shadow-xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Your Profile</h1>
                        <p className="text-gray-500 mt-2">Manage your personal information</p>
                    </div>
                    <div className="flex flex-col gap-6">
                        <ProfileForm profile={profileData} />
                    </div>
                </div>
            )}
        </div>
    );
}
