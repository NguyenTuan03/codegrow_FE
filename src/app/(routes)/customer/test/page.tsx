'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Crown, CheckCircle2, BookOpen, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Define types for test items
interface TestItem {
    title: string;
    description: string;
    imageUrl: string;
    isPremium: boolean;
    isTaken: boolean;
    testId: string;
}

const tests: TestItem[] = [
    {
        title: 'Kiểm tra kiến thức nền',
        description: 'Đánh giá trình độ hiểu biết ban đầu về một lĩnh vực...',
        imageUrl: '/hk1.png',
        isPremium: true,
        isTaken: false,
        testId: 'knowledge-base-test',
    },
    {
        title: 'Kiểm tra học thuật',
        description: 'Xác định mức độ hiểu biết về một môn học hoặc chủ đề...',
        imageUrl: '/hk1.png',
        isPremium: true,
        isTaken: false,
        testId: 'academic-test',
    },
    {
        title: 'Kiểm tra kiến thức Abap',
        description: 'Đánh giá khả năng lập trình với Abap qua các câu hỏi thực tiễn...',
        imageUrl: '/hk1.png',
        isPremium: false,
        isTaken: false,
        testId: 'abap-knowledge-test',
    },
    {
        title: 'Kiểm tra kiến thức nền',
        description: 'Đánh giá trình độ hiểu biết ban đầu về một lĩnh vực...',
        imageUrl: '/hk1.png',
        isPremium: false,
        isTaken: true,
        testId: 'completed-test-1',
    },
    {
        title: 'Kiểm tra kiến thức nền',
        description: 'Đánh giá trình độ hiểu biết ban đầu về một lĩnh vực...',
        imageUrl: '/hk1.png',
        isPremium: false,
        isTaken: true,
        testId: 'completed-test-2',
    },
    {
        title: 'Kiểm tra kiến thức nền',
        description: 'Đánh giá trình độ hiểu biết ban đầu về một lĩnh vực...',
        imageUrl: '/hk1.png',
        isPremium: false,
        isTaken: true,
        testId: 'completed-test-3',
    },
];

export default function Test() {
    return (
        <div className="px-4 sm:px-6 md:px-12 lg:px-24 py-12 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Header Section */}
                <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    {/* Background Gradient Layer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#5AD3AF]/20 to-[#657ED4]/20 dark:from-[#5AD3AF]/10 dark:to-[#657ED4]/10 z-0" />

                    {/* Background Image */}
                    <div className="absolute inset-0 w-full h-full z-0">
                        <Image
                            src="/pasted-image-0 (1).png"
                            alt="Banner"
                            fill
                            className="object-cover object-right opacity-80 dark:opacity-60"
                        />
                    </div>

                    {/* Button Overlay */}
                    <div className="absolute bottom-6 left-6 md:left-20 z-10">
                        <button className="bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md flex items-center gap-2 transition-all duration-300">
                            <BookOpen className="w-5 h-5" />
                            Bài Test Online
                        </button>
                    </div>

                    {/* Left Content */}
                    <div className="relative z-10 h-full flex items-center px-6 md:px-20 md:w-1/2">
                        <div className="space-y-4">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                                <BookOpen className="w-8 h-8 text-[#5AD3AF]" />
                                Bài Test Online
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
                                Đánh giá trình độ của bạn và bắt đầu lộ trình học tập phù hợp.
                            </p>
                        </div>
                    </div>
                </div>

                <Separator className="bg-gray-200 dark:bg-gray-700" />

                {/* Title Section */}
                <div className="text-center space-y-3">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-6 h-6 text-[#5AD3AF]" />
                        Test Your Level – Take A Test
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                        Khám phá trình độ của bạn qua các bài test đa dạng và chuyên sâu!
                    </p>
                </div>

                {/* Test Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tests.map((test, idx) => (
                        <Card
                            key={idx}
                            className={cn(
                                'relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-[#5AD3AF] transform hover:-translate-y-1',
                            )}
                        >
                            {/* Premium Badge */}
                            {test.isPremium && (
                                <div className="absolute top-4 right-4 z-10 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1">
                                    <Crown className="w-4 h-4 text-gray-900" />
                                    Premium
                                </div>
                            )}

                            <CardHeader className="p-0 mb-4">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-[#5AD3AF]" />
                                    {test.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                                    {test.description}
                                </p>
                            </CardHeader>

                            <CardContent className="flex items-center justify-between p-0 mt-4">
                                <div className="space-y-3">
                                    {test.isTaken ? (
                                        <div className="space-y-2">
                                            <Link href={`/customer/result`} passHref>
                                                <Button
                                                    variant="outline"
                                                    className="text-sm bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-none hover:bg-green-200 dark:hover:bg-green-800/50 rounded-full flex items-center gap-2"
                                                >
                                                    Đã hoàn thành
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <Link href={`/customer/result`} passHref>
                                                <p className="text-xs text-[#657ED4] dark:text-[#5AD3AF] hover:underline cursor-pointer flex items-center gap-1">
                                                    View Your Mark
                                                    <ArrowRight className="w-3 h-3" />
                                                </p>
                                            </Link>
                                        </div>
                                    ) : (
                                        <Link
                                            href={{
                                                pathname: `/customer/test/${test.testId}`,
                                                query: { title: encodeURIComponent(test.title) },
                                            }}
                                            passHref
                                        >
                                            <Button className="text-sm bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white rounded-full shadow-md flex items-center gap-2 transition-all duration-200">
                                                <BookOpen className="w-4 h-4" />
                                                Làm Bài Thi
                                            </Button>
                                        </Link>
                                    )}
                                </div>

                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600 shadow-md">
                                    <Image
                                        src={test.imageUrl}
                                        alt={test.title}
                                        width={64}
                                        height={64}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
