// @/app/mentor/meeting/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { v4 as uuid } from 'uuid';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Video, PlusCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export default function Meeting() {
    const [roomID, setRoomID] = useState('');
    const [fullName, setFullName] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');

                if (!token) {
                    toast({
                        title: 'Lỗi',
                        description: 'Token không tồn tại. Vui lòng đăng nhập lại.',
                        variant: 'destructive',
                        className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                    });
                    router.push('/login');
                    return;
                }
                const tokenuser = JSON.parse(token);
                console.log('Token user:', tokenuser);
                const user = localStorage.getItem('user');
                if (!tokenuser || !user) {
                    throw new Error('Authentication token or user ID is missing');
                }

                const parsedUser = JSON.parse(user);
                const userId = parsedUser.id;
                console.log('User ID:', userId);

                // Retrieve fullName directly from localStorage
                const storedFullName = parsedUser.fullname || 'User'; // Use 'fullname' to match decoded token field
                setFullName(storedFullName);
                setToken(tokenuser);
            } catch (error) {
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : 'Failed to authenticate. Please log in again.';
                console.error('Error fetching user data:', errorMessage);
                toast({
                    title: 'Error',
                    description: errorMessage,
                    variant: 'destructive',
                });
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [router]);

    const handleJoinMeeting = () => {
        if (roomID) {
            router.push(`/mentor/room/${roomID}`);
        }
    };

    const handleCreateMeeting = () => {
        const newRoomID = uuid();
        router.push(`/mentor/room/${newRoomID}`);
    };

    if (loading || !fullName || !token) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="relative inline-block">
                    <div className="w-20 h-20 border-4 border-[#657ED4] border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 bg-[#5AD3AF] rounded-full flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="max-w-4xl w-full text-center space-y-8">
                {/* Logo */}
                <Image src="/logo.svg" alt="logo" width={150} height={150} className="mx-auto" />

                {/* Heading */}
                <div className="space-y-2">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        <span className="block bg-gradient-to-r from-[#5AD3AF] to-[#657ED4] bg-clip-text text-transparent">
                            Join Your Learning Session
                        </span>
                        <span className="block bg-gradient-to-r from-[#5AD3AF] to-[#657ED4] bg-clip-text text-transparent">
                            with Team Members
                        </span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                        Collaborate seamlessly with your classmates and mentors using Zegoclouds
                        powerful video conferencing tools.
                    </p>
                </div>

                {/* Input Form */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 sm:p-8 space-y-6">
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                        Welcome, <span className="font-medium">{fullName}</span>!
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Input
                            type="text"
                            id="roomid"
                            value={roomID}
                            onChange={(e) => setRoomID(e.target.value)}
                            className="w-full sm:w-80 rounded-full border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#5AD3AF] focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                            placeholder="Enter room ID to join a session"
                        />
                        <Button
                            onClick={handleJoinMeeting}
                            disabled={!roomID}
                            className={`rounded-full px-6 py-2 transition-all duration-200 shadow-sm flex items-center gap-2 text-sm font-medium ${
                                roomID
                                    ? 'bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white'
                                    : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            <Video className="w-5 h-5" />
                            Join Session
                        </Button>
                    </div>

                    <Button
                        onClick={handleCreateMeeting}
                        variant="outline"
                        className="rounded-full px-6 py-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-[#5AD3AF] hover:text-white dark:hover:bg-[#5AD3AF] dark:hover:text-white flex items-center gap-2 transition-all duration-200"
                    >
                        <PlusCircle className="w-5 h-5" />
                        Create a New Session
                    </Button>
                </div>

                {/* Footer Note */}
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Powered by Zegocloud • Connect with your learning community
                </p>
            </div>
        </div>
    );
}
