'use client';

import { Auth } from '@/lib/components/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { motion } from 'framer-motion';
import { linear } from 'popmotion'; // ✅ Sửa đúng easing linear

interface JwtPayload {
    _id: string;
    role: string;
    name: string;
    email: string;
}

export default function Page() {
    const router = useRouter();
    const auth = useContext(Auth);
    const searchParams = useSearchParams();

    useEffect(() => {
        const token: string | null = searchParams.get('token');
        let jwtdecode: JwtPayload | undefined;

        if (token) {
            try {
                jwtdecode = jwtDecode<JwtPayload>(token);
                console.log(jwtdecode);
            } catch (e) {
                console.error('JWT decode error:', e);
            }
        }

        if (jwtdecode && auth && token) {
            auth.loginUser(
                {
                    _id: jwtdecode._id,
                    role: jwtdecode.role,
                    fullName: jwtdecode.name,
                    email: jwtdecode.email,
                    avatar: '', // Provide a default or fetched avatar value
                },
                token,
            );
        }
    }, [searchParams, auth]);

    useEffect(() => {
        if (!auth || !auth.userAuth) {
            router.replace('/customer');
            return;
        }

        switch (auth.userAuth.role) {
            case 'admin':
                router.replace('/admin');
                break;
            case 'mentor':
                router.replace('/mentor');
                break;
            case 'qaqc':
                router.replace('/qaqc');
                break;
            case 'customer':
                router.replace('/customer');
                break;
            default:
                router.replace('/customer');
                break;
        }
    }, [auth, router]);

    // Animation variants for the spinner
    const spinnerVariants = {
        animate: {
            rotate: 360,
            transition: {
                repeat: Infinity,
                duration: 1.5,
                ease: linear, // ✅ sửa thành linear
            },
        },
    };

    // Animation variants for the text
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.5,
                duration: 0.8,
                ease: linear, // ✅ sửa thành linear
            },
        },
    };

    // Animation variants for the dots
    const dotVariants = {
        animate: (i: number) => ({
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
            transition: {
                repeat: Infinity,
                duration: 1.2,
                delay: i * 0.2,
                ease: linear, // use imported linear easing function
            },
        }),
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="text-center space-y-8 max-w-md">
                {/* Animated Spinner with Gradient */}
                <motion.div
                    className="relative inline-block"
                    variants={spinnerVariants}
                    animate="animate"
                >
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#5AD3AF] to-[#657ED4] p-1">
                        <div className="w-full h-full bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-[#5AD3AF]"
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
                    {/* Glowing Effect */}
                    <div className="absolute inset-0 rounded-full bg-[#5AD3AF] opacity-20 blur-xl animate-pulse"></div>
                </motion.div>

                {/* Loading Text with Animation */}
                <motion.div
                    className="space-y-3"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        <span className="inline-flex space-x-1">
                            {['L', 'o', 'a', 'd', 'i', 'n', 'g'].map((letter, index) => (
                                <motion.span
                                    key={index}
                                    className="inline-block"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: index * 0.1,
                                        duration: 0.5,
                                        ease: 'easeOut',
                                    }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Preparing your dashboard...
                    </p>
                </motion.div>

                {/* Progress Bar with Gradient */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                        className="h-3 rounded-full bg-gradient-to-r from-[#5AD3AF] to-[#657ED4]"
                        initial={{ width: '0%' }}
                        animate={{ width: '45%' }}
                        transition={{
                            duration: 1.5,
                            ease: 'easeInOut',
                            repeat: Infinity,
                            repeatType: 'reverse',
                        }}
                    />
                </div>

                {/* Decorative Dots with Animation */}
                <div className="flex justify-center space-x-3 pt-4">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-3 h-3 bg-[#657ED4] rounded-full"
                            custom={i}
                            variants={dotVariants}
                            animate="animate"
                        />
                    ))}
                </div>

                {/* Subtle Message */}
                <motion.p
                    className="text-sm text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    This may take a few seconds...
                </motion.p>
            </div>
        </div>
    );
}
