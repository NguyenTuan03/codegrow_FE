'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { motion } from 'framer-motion';
import CustomerHeader from '@/lib/components/layout/header/Customerheader';
import { Skeleton } from '@/components/ui/skeleton';

const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PaymentErrorPage() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Simulate loading to match the callback flow
        setTimeout(() => {
            setLoading(false);
        }, 1000); // Simulate a 1-second delay
    }, []);

    const handleBackToCourses = () => {
        router.push('/customer/courses');
    };

    return (
        <div className="min-h-screen bg-gray-50 mt-20 dark:bg-gray-900 transition-colors duration-300">
            <CustomerHeader />
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="container mx-auto p-4 sm:p-6"
            >
                <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
                    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                        <CardHeader className="flex flex-col items-center justify-center text-center p-6">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                Payment Error
                            </h1>
                            {loading ? (
                                <div className="flex items-center gap-2 mt-4">
                                    <Skeleton className="h-6 w-6 animate-spin text-[#657ED4] dark:text-[#5AD3AF]" />
                                    <span className="text-lg text-gray-600 dark:text-gray-300">
                                        Processing payment data...
                                    </span>
                                </div>
                            ) : (
                                <Badge className="mt-4 text-lg bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200">
                                    Error
                                </Badge>
                            )}
                        </CardHeader>
                        <CardContent className="p-6">
                            {loading ? (
                                <div className="space-y-4">
                                    <Skeleton className="h-10 w-full" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            ) : (
                                <div className="space-y-4 text-center">
                                    <p className="text-lg text-gray-600 dark:text-gray-300">
                                        An error occurred during payment processing. Please try
                                        again or contact support.
                                    </p>
                                    <div className="flex justify-center gap-4">
                                        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                            Status: Error
                                        </span>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="p-6 flex justify-center">
                            <Button
                                onClick={handleBackToCourses}
                                className="bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#5A6BBE] dark:hover:bg-[#4ac2a0] text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
                            >
                                Back to Courses
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            </motion.div>
        </div>
    );
}
