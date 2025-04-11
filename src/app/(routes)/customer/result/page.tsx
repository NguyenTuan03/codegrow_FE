'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

interface TestHistory {
    id: string;
    title: string;
    isPremium: boolean;
    language: string;
    difficulty: string;
    status: 'correct' | 'incorrect';
    description: string;
}

export default function Results() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Display 3 results per page to match the history tab style

    const testHistory: TestHistory[] = [
        {
            id: '1',
            title: 'Hello World!',
            isPremium: false,
            language: 'Java',
            difficulty: 'Beginner',
            status: 'correct',
            description: 'Successfully printed "Hello World!" to the console.',
        },
        {
            id: '2',
            title: 'Connect Beach Flags',
            isPremium: true,
            language: 'JavaScript',
            difficulty: 'Easy',
            status: 'correct',
            description:
                'At the unit testing level, developers test individual units or components of a software system.',
        },
        {
            id: '3',
            title: 'Marketplace Cipher Decoder',
            isPremium: true,
            language: 'Python',
            difficulty: 'Medium',
            status: 'correct',
            description: 'BDD focuses on the behavior of the system as observed from the outside.',
        },
        {
            id: '4',
            title: 'Decipher the Ancient Message',
            isPremium: true,
            language: 'Python',
            difficulty: 'Medium',
            status: 'correct',
            description:
                'In TDD, developers first write tests for the code that they wish they had, then write the code to make the tests pass.',
        },
        {
            id: '5',
            title: 'Connect Beach Flags',
            isPremium: true,
            language: 'JavaScript',
            difficulty: 'Easy',
            status: 'correct',
            description:
                'Developers use test cases to call the code and test for some expected output, thus ensuring that the code works correctly.',
        },
    ];

    const totalPages = Math.ceil(testHistory.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentHistory = testHistory.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="min-h-screen bg-white">
            {/* Banner */}
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

            {/* Main Content */}
            <div className="container mx-auto px-6 py-6">
                <div className="flex items-center text-sm space-x-2">
                    <Link href="/" className="text-gray-600 hover:text-gray-900">
                        <Home className="w-4 h-4" />
                    </Link>
                    <span className="text-gray-600">${'>'}</span>
                    <Link href="/customer/test" className="text-gray-600 hover:text-gray-900">
                        Test
                    </Link>
                    <span className="text-gray-600">${'>'}</span>
                    <span className="text-gray-900">Kết quả</span>
                </div>

                <h1 className="text-4xl font-bold my-8">TEST</h1>

                <div className="bg-green-50 p-4 rounded-lg mb-6 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-medium">Your grade: 100%</h3>
                        <p className="text-sm text-gray-600">
                            Your highest: 100% • To pass you need at least 60%. We keep your highest
                            score.
                        </p>
                    </div>
                    <Button variant="outline" className="text-blue-600 border-blue-600">
                        Next item <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>

                <div className="space-y-6">
                    {currentHistory.map((history) => (
                        <div key={history.id} className="border-b pb-6 flex items-center">
                            <div className="mr-4">
                                {history.status === 'correct' ? (
                                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-green-600">✔</span>
                                    </div>
                                ) : (
                                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                                        <span className="text-red-600">✘</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center">
                                    <h3 className="text-lg font-medium">{history.title}</h3>
                                    {history.isPremium && (
                                        <Badge className="ml-2 bg-rose-500 text-white text-xs">
                                            PREMIUM
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600">{history.description}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Badge className="bg-blue-100 text-blue-800">
                                    {history.language}
                                </Badge>
                                <Badge className="bg-blue-100 text-blue-800">
                                    {history.difficulty}
                                </Badge>
                                {history.status === 'incorrect' && (
                                    <Button variant="outline" size="sm">
                                        Retry
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-center">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    className={
                                        currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                                    }
                                />
                            </PaginationItem>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <PaginationItem key={index + 1}>
                                    <PaginationLink
                                        onClick={() => setCurrentPage(index + 1)}
                                        isActive={currentPage === index + 1}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() =>
                                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                                    }
                                    className={
                                        currentPage === totalPages
                                            ? 'pointer-events-none opacity-50'
                                            : ''
                                    }
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}
