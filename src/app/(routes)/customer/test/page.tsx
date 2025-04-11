'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Crown, CheckCircle } from 'lucide-react';
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
        <div className="px-4 md:px-10 py-10 space-y-10">
            <div className="w-full relative h-[300px] md:h-[400px] overflow-hidden rounded-2xl shadow-md">
                {/* Background Gradient Layer */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-100 z-0" />

                {/* Hình ảnh bao phủ bên phải */}
                <div className="absolute inset-0 w-full h-full z-0">
                    <Image
                        src="/pasted-image-0 (1).png"
                        alt="Banner"
                        fill
                        className="object-cover object-right"
                    />
                </div>

                {/* Button đè lên hình ảnh */}
                <div className="absolute bottom-6 left-6  md:left-20 z-10">
                    <button className="bg-[#ef476f] text-white px-5 py-2 rounded-lg text-sm shadow-md">
                        Bài Test Online
                    </button>
                </div>

                {/* Nội dung bên trái */}
                <div className="relative z-10 h-full flex items-center px-6 md:px-20 md:w-1/2">
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-bold text-blue-900">
                            Bài Test Online
                        </h1>
                        <p className="text-muted-foreground">
                            Đánh giá trình độ của bạn và bắt đầu lộ trình học tập phù hợp.
                        </p>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Tiêu đề */}
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold text-gray-800 italic">
                    Test Your Level – Take A Test
                </h2>
            </div>

            {/* List tests */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tests.map((test, idx) => (
                    <Card
                        key={idx}
                        className={cn(
                            'relative bg-[#d9f2ef] rounded-xl p-5 shadow-md border border-[#b6e3db] hover:shadow-lg transition-all flex flex-col justify-between',
                        )}
                    >
                        {/* Badge Premium */}
                        {test.isPremium && (
                            <div className="absolute top-4 right-4 z-10">
                                <Crown className="w-5 h-5 text-yellow-500" />
                            </div>
                        )}

                        <CardHeader className="p-0 mb-4">
                            <h3 className="text-lg font-bold text-[#1a73e8]">{test.title}</h3>
                            <p className="text-sm text-gray-700 mt-1">{test.description}</p>
                        </CardHeader>

                        <CardContent className="flex items-center justify-between p-0 mt-4">
                            <div className="space-y-2">
                                {test.isTaken ? (
                                    <div className="space-y-1">
                                        <Link href={`/customer/result`} passHref>
                                            <Button
                                                variant="outline"
                                                className="text-sm bg-[#c6f0e2] text-[#008060] border-none hover:bg-[#b2e9d3]"
                                            >
                                                Đã hoàn thành{' '}
                                                <CheckCircle className="ml-2 w-4 h-4" />
                                            </Button>
                                        </Link>

                                        <Link href={`/customer/result`} passHref>
                                            <p className="text-xs ml-2 mt-2 text-[#008060] underline hover:opacity-80 cursor-pointer">
                                                View Your Mark &gt;
                                            </p>
                                        </Link>
                                    </div>
                                ) : (
                                    <Link href={`/customer/testdetail`} passHref>
                                        <Button
                                            asChild
                                            className="text-sm bg-[#ef476f] hover:bg-[#e63956] text-white"
                                        >
                                            <h1> Làm Bài Thi</h1>
                                        </Button>
                                    </Link>
                                )}
                            </div>

                            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md">
                                <Image
                                    src={test.imageUrl}
                                    alt={test.title}
                                    width={80}
                                    height={80}
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
