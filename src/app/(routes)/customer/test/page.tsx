'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Crown, CheckCircle, BookOpen, ArrowRight } from 'lucide-react'; // Added icons
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
        <div className="px-4 sm:px-6 md:px-10 py-10 space-y-10 bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            {/* Header Section */}
            <div className="w-full relative h-[300px] md:h-[400px] overflow-hidden rounded-2xl shadow-2xl border border-indigo-200 dark:border-indigo-700">
                {/* Background Gradient Layer */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/50 to-purple-500/50 dark:from-gray-800/50 dark:to-gray-900/50 z-0" />

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
                    <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-md flex items-center gap-2 transition-all">
                        <BookOpen className="w-5 h-5" />
                        Bài Test Online
                    </button>
                </div>

                {/* Left Content */}
                <div className="relative z-10 h-full flex items-center px-6 md:px-20 md:w-1/2">
                    <div className="space-y-4">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-900 dark:text-indigo-200 flex items-center gap-3">
                            <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                            Bài Test Online
                        </h1>
                        <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
                            Đánh giá trình độ của bạn và bắt đầu lộ trình học tập phù hợp.
                        </p>
                    </div>
                </div>
            </div>

            <Separator className="bg-indigo-200 dark:bg-gray-600" />

            {/* Title Section */}
            <div className="text-center space-y-3">
                <h2 className="text-2xl md:text-3xl font-semibold text-indigo-800 dark:text-indigo-300 italic flex items-center justify-center gap-2">
                    <CheckCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
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
                            'relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-indigo-200 dark:border-indigo-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl',
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
                            <h3 className="text-lg font-bold text-indigo-800 dark:text-indigo-200 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                {test.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
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
                                                className="text-sm bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-none hover:bg-green-200 dark:hover:bg-green-800/50 rounded-lg flex items-center gap-2"
                                            >
                                                Đã hoàn thành
                                                <CheckCircle className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <Link href={`/customer/result`} passHref>
                                            <p className="text-xs text-indigo-600 dark:text-indigo-400 underline hover:opacity-80 cursor-pointer flex items-center gap-1">
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
                                        <Button className="text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg shadow-md flex items-center gap-2">
                                            <BookOpen className="w-4 h-4" />
                                            Làm Bài Thi
                                        </Button>
                                    </Link>
                                )}
                            </div>

                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-300 dark:border-indigo-600 shadow-md">
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
    );
}
