'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
    const router = useRouter();
    const searchParams = useSearchParams();
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

    const handleStartTest = () => {
        router.push('/customer/challenge');
    };

    const [selectedLanguage, setSelectedLanguage] = useState('Language');
    const [selectedDifficulty, setSelectedDifficulty] = useState('Difficulty');

    const totalPages = Math.ceil(testOptions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTests = testOptions.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 dark:from-gray-900 dark:to-gray-800">
            {/* Banner */}
            <div className="w-full relative h-[300px] md:h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 z-0" />
                <div className="absolute inset-0 w-full h-full z-0">
                    <Image
                        src="/pasted-image-0 (1).png"
                        alt="Banner"
                        fill
                        className="object-cover object-right"
                    />
                </div>
                <div className="absolute bottom-6 left-6 md:left-20 z-10">
                    <Badge className="bg-[#657ed4] dark:bg-[#5AD3AF] text-white px-5 py-2 rounded-lg text-sm shadow-md">
                        Online Test
                    </Badge>
                </div>
                <div className="relative z-10 h-full flex items-center px-6 md:px-20 md:w-1/2">
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-bold text-[#657ed4] dark:text-[#5AD3AF]">
                            Online Test
                        </h1>
                        <p className="text-muted-foreground dark:text-gray-300">
                            Evaluate your skills and start the appropriate learning path.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-6">
                <div className="flex items-center text-sm space-x-2">
                    <Link
                        href="/"
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    >
                        <Home className="w-4 h-4" />
                    </Link>
                    <span className="text-gray-600 dark:text-gray-300">{'>'}</span>
                    <Link
                        href="/customer/test"
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    >
                        Test
                    </Link>
                    <span className="text-gray-600 dark:text-gray-300">{'>'}</span>
                    <span className="text-gray-900 dark:text-white">{testTitle}</span>
                    <Badge className="ml-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
                        NEW
                    </Badge>
                </div>

                <h1 className="text-4xl font-bold my-8 dark:text-white">TEST</h1>

                <div className="flex space-x-4 mb-6">
                    {/* Dropdown for Language */}
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="flex items-center space-x-2 bg-blue-50 dark:bg-gray-800 border-blue-200 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-700 text-blue-800 dark:text-gray-200"
                            >
                                <span>{selectedLanguage}</span>
                                <ChevronDown className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-2 z-50">
                            <DropdownMenuItem
                                className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-800 dark:hover:text-white rounded-md"
                                onClick={() => setSelectedLanguage('Python')}
                            >
                                Python
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-800 dark:hover:text-white rounded-md"
                                onClick={() => setSelectedLanguage('JavaScript')}
                            >
                                JavaScript
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-800 dark:hover:text-white rounded-md"
                                onClick={() => setSelectedLanguage('SQL')}
                            >
                                SQL
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Dropdown for Difficulty */}
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="flex items-center space-x-2 bg-blue-50 dark:bg-gray-800 border-blue-200 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-700 text-blue-800 dark:text-gray-200"
                            >
                                <span>{selectedDifficulty}</span>
                                <ChevronDown className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-2 z-50">
                            <DropdownMenuItem
                                className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-800 dark:hover:text-white rounded-md"
                                onClick={() => setSelectedDifficulty('Easy')}
                            >
                                Easy
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-800 dark:hover:text-white rounded-md"
                                onClick={() => setSelectedDifficulty('Medium')}
                            >
                                Medium
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-800 dark:hover:text-white rounded-md"
                                onClick={() => setSelectedDifficulty('Hard')}
                            >
                                Hard
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <RadioGroup onValueChange={setSelectedTest} className="space-y-6">
                    {currentTests.map((test) => (
                        <div
                            key={test.id}
                            className="border-b dark:border-gray-700 pb-6 flex items-center"
                        >
                            <RadioGroupItem
                                value={test.id}
                                id={`test-${test.id}`}
                                className="mr-4 text-[#657ED4] dark:text-[#5AD3AF]"
                            />
                            <div className="flex-grow">
                                <div className="flex items-center">
                                    <Label
                                        htmlFor={`test-${test.id}`}
                                        className="text-lg font-medium dark:text-white"
                                    >
                                        {test.title}
                                    </Label>
                                    {test.isPremium && (
                                        <Badge className="ml-2 bg-yellow-600 dark:bg-yellow-700 text-white text-xs">
                                            PREMIUM
                                        </Badge>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Badge className="bg-blue-100 dark:bg-blue-900 text-[#657ED4] dark:text-[#5AD3AF]">
                                    {test.language}
                                </Badge>
                                <Badge className="bg-blue-100 dark:bg-blue-900 text-[#657ED4] dark:text-[#5AD3AF]">
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
                                        currentPage === 1
                                            ? 'pointer-events-none opacity-50'
                                            : 'dark:text-white'
                                    }
                                />
                            </PaginationItem>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <PaginationItem key={index + 1}>
                                    <PaginationLink
                                        onClick={() => setCurrentPage(index + 1)}
                                        isActive={currentPage === index + 1}
                                        className="dark:text-white"
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
                                            : 'dark:text-white'
                                    }
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>

                {selectedTest && (
                    <div className="mt-8 flex justify-center">
                        <Button
                            className="bg-[#5AD3AF] hover:bg-[#4ac2a0] dark:bg-[#5AD3AF] dark:hover:bg-[#4ac2a0] text-white px-6 py-3 rounded-lg font-medium"
                            onClick={handleStartTest}
                        >
                            Start Test
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
