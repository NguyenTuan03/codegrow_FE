'use client';

import { useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { Home, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { useState } from 'react';

interface TestOption {
    id: string;
    title: string;
    isPremium: boolean;
    language: string;
    difficulty: string;
}

export default function TestDetail() {
    const [selectedTest, setSelectedTest] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const router = useRouter(); // Initialize useRouter for navigation
    const searchParams = useSearchParams();
    // Lấy và decode title
    const encodedTitle = searchParams.get('title');
    const testTitle = encodedTitle ? decodeURIComponent(encodedTitle) : null;
    const testOptions: TestOption[] = [
        {
            id: '1',
            title: 'Decipher the Ancient Message',
            isPremium: true,
            language: 'Python',
            difficulty: 'Medium',
        },
        {
            id: '2',
            title: 'Decipher the Ancient Message',
            isPremium: true,
            language: 'Python',
            difficulty: 'Medium',
        },
        {
            id: '3',
            title: 'Decipher the Ancient Message',
            isPremium: true,
            language: 'Python',
            difficulty: 'Medium',
        },
        {
            id: '4',
            title: 'Solve The Algorithm',
            isPremium: false,
            language: 'JavaScript',
            difficulty: 'Easy',
        },
        {
            id: '5',
            title: 'Advanced SQL Queries',
            isPremium: true,
            language: 'SQL',
            difficulty: 'Hard',
        },
    ];
    // const [testTitle, setTestTitle] = useState<string | null>(null);
    //   useEffect(() => {
    //     const fetchTestTitle = async () => {
    //       try {
    //         const res = await fetch(`/api/tests/${testId}`);
    //         const data = await res.json();
    //         setTestTitle(data.title);
    //       } catch (error) {
    //         router.push('/customer/test');
    //       }
    //     };

    //     if (!searchParams.get('title')) {
    //       fetchTestTitle();
    //     } else {
    //       setTestTitle(decodeURIComponent(searchParams.get('title')!));
    //     }
    //   }, [testId, searchParams]);
    const handleStartTest = () => {
        // Redirect to the challenge page
        router.push('/customer/challenge');
    };
    const [selectedLanguage, setSelectedLanguage] = useState('Language'); // State cho Language
    const [selectedDifficulty, setSelectedDifficulty] = useState('Difficulty'); // State cho Difficulty

    const totalPages = Math.ceil(testOptions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTests = testOptions.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="min-h-screen bg-white">
            {/* Banner */}
            <div className="w-full relative h-[300px] md:h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 z-0" />
                <div className="absolute inset-0 w-full h-full z-0">
                    <Image
                        src="/pasted-image-0 (1).png"
                        alt="Banner"
                        fill
                        className="object-cover object-right"
                    />
                </div>
                <div className="absolute bottom-6 left-6 md:left-20 z-10">
                    <Badge className="bg-[#ef476f] text-white px-5 py-2 rounded-lg text-sm shadow-md">
                        Bài Test Online
                    </Badge>
                </div>
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
                    <span className="text-gray-600">{'>'}</span>
                    <Link href="/customer/test" className="text-gray-600 hover:text-gray-900">
                        Test
                    </Link>
                    <span className="text-gray-600">{'>'}</span>
                    <span className="text-gray-900">{testTitle}</span>
                    <Badge className="ml-2 bg-blue-100 text-blue-800 text-xs">NEW</Badge>
                </div>

                <h1 className="text-4xl font-bold my-8">TEST</h1>

                <div className="flex space-x-4 mb-6">
                    {/* Dropdown for Language */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="flex items-center space-x-2 bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-800"
                            >
                                <span>{selectedLanguage}</span> {/* Hiển thị giá trị được chọn */}
                                <ChevronDown className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg rounded-lg p-2 z-50">
                            <DropdownMenuItem
                                className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-800 rounded-md"
                                onClick={() => setSelectedLanguage('Python')} // Cập nhật state
                            >
                                Python
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-800 rounded-md"
                                onClick={() => setSelectedLanguage('JavaScript')} // Cập nhật state
                            >
                                JavaScript
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-800 rounded-md"
                                onClick={() => setSelectedLanguage('SQL')} // Cập nhật state
                            >
                                SQL
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Dropdown for Difficulty */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="flex items-center space-x-2 bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-800"
                            >
                                <span>{selectedDifficulty}</span> {/* Hiển thị giá trị được chọn */}
                                <ChevronDown className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg rounded-lg p-2 z-50">
                            <DropdownMenuItem
                                className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-800 rounded-md"
                                onClick={() => setSelectedDifficulty('Easy')} // Cập nhật state
                            >
                                Easy
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-800 rounded-md"
                                onClick={() => setSelectedDifficulty('Medium')} // Cập nhật state
                            >
                                Medium
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-800 rounded-md"
                                onClick={() => setSelectedDifficulty('Hard')} // Cập nhật state
                            >
                                Hard
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <RadioGroup onValueChange={setSelectedTest} className="space-y-6">
                    {currentTests.map((test) => (
                        <div key={test.id} className="border-b pb-6 flex items-center">
                            <RadioGroupItem
                                value={test.id}
                                id={`test-${test.id}`}
                                className="mr-4"
                            />
                            <div className="flex-grow">
                                <div className="flex items-center">
                                    <Label
                                        htmlFor={`test-${test.id}`}
                                        className="text-lg font-medium"
                                    >
                                        {test.title}
                                    </Label>
                                    {test.isPremium && (
                                        <Badge className="ml-2 bg-rose-500 text-white text-xs">
                                            PREMIUM
                                        </Badge>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Badge className="bg-blue-100 text-blue-800">{test.language}</Badge>
                                <Badge className="bg-blue-100 text-blue-800">
                                    {test.difficulty}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </RadioGroup>

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

                {selectedTest && (
                    <div className="mt-8 flex justify-center">
                        <Button
                            className="bg-[#ef476f] hover:bg-[#e63956] text-white px-6 py-3 rounded-lg font-medium"
                            onClick={handleStartTest}
                        >
                            Bắt đầu làm bài
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
