'use client';

import { useState } from 'react';
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
    const testTitle = 'Kiểm tra kiến thức nền';
    const router = useRouter(); // Initialize useRouter for navigation

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

    const handleStartTest = () => {
        // Redirect to the challenge page
        router.push('/customer/challenge');
    };

    const totalPages = Math.ceil(testOptions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTests = testOptions.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b py-4 px-6">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="mr-8">
                            <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-md">
                                <span className="text-gray-600">Logo</span>
                            </div>
                        </Link>
                        <nav className="hidden md:flex space-x-6">
                            <Link href="/" className="text-gray-700 hover:text-gray-900">
                                Home
                            </Link>
                            <Link href="/courses" className="text-gray-700 hover:text-gray-900">
                                Courses
                            </Link>
                            <Link href="/roadmap" className="text-gray-700 hover:text-gray-900">
                                Roadmap
                            </Link>
                            <Link href="/more" className="text-gray-700 hover:text-gray-900">
                                More
                            </Link>
                            <Link href="/test" className="text-gray-900 font-medium">
                                Test
                            </Link>
                            <Link href="/process" className="text-gray-700 hover:text-gray-900">
                                Process
                            </Link>
                        </nav>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                            Sign in
                        </Button>
                        <Button size="sm">Register</Button>
                    </div>
                </div>
            </header>

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
                    <span className="text-gray-600">></span>
                    <Link href="/customer/test" className="text-gray-600 hover:text-gray-900">
                        Test
                    </Link>
                    <span className="text-gray-600">></span>
                    <span className="text-gray-900">{testTitle}</span>
                    <Badge className="ml-2 bg-blue-100 text-blue-800 text-xs">NEW</Badge>
                </div>

                <h1 className="text-4xl font-bold my-8">TEST</h1>

                <div className="flex space-x-4 mb-6">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center space-x-2">
                                <span>Language</span>
                                <ChevronDown className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Python</DropdownMenuItem>
                            <DropdownMenuItem>JavaScript</DropdownMenuItem>
                            <DropdownMenuItem>SQL</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center space-x-2">
                                <span>Difficulty</span>
                                <ChevronDown className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Easy</DropdownMenuItem>
                            <DropdownMenuItem>Medium</DropdownMenuItem>
                            <DropdownMenuItem>Hard</DropdownMenuItem>
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
