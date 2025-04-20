// @/app/(routes)/customer/project/page.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Crown, Lock, CheckCircle2 } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { useRouter } from 'next/navigation';
import { Auth } from '@/lib/components/context/AuthContext';

const projects = [
    {
        id: '1',
        title: 'Build a routing program to help Vancouver commuters',
        description:
            'Use Python data structures and algorithms to help people navigate around Vancouver.',
        isPremium: true,
        category: 'Python',
    },
    {
        id: '2',
        title: 'Decrypt Secret Messages',
        description:
            'Practice decrypting intercepted data using the command line to thwart Evil Corp.',
        isPremium: true,
        category: 'Cybersecurity',
    },
    {
        id: '3',
        title: 'Analyze and Visualize Netflix Stock Data',
        description:
            'Act as a "Yahoo Finance" data analyst to generate a stock profile for Netflix.',
        isPremium: false,
        category: 'Data Analysis',
    },
    {
        id: '4',
        title: 'Analyze Hacker News Trends',
        description: 'Query Hacker News data using SQL to discover trends.',
        isPremium: false,
        category: 'SQL',
    },
    {
        id: '5',
        title: 'Create a E-Commerce App (Part Two)',
        description:
            'Make a full-stack e-commerce app that lets users register accounts, browse products, and make purchases.',
        isPremium: true,
        category: 'Web Development',
    },
    {
        id: '6',
        title: 'Predict Baseball Strike Zones With Machine Learning',
        description: 'Calculate and visualize MLB player strike zones based on their real data.',
        isPremium: false,
        category: 'Machine Learning',
    },
    {
        id: '7',
        title: 'Build a Social Media Dashboard',
        description:
            'Create a responsive dashboard to track and analyze social media metrics across platforms.',
        isPremium: true,
        category: 'Frontend',
    },
    {
        id: '8',
        title: 'Develop a Weather Forecast App',
        description:
            'Build a weather application that fetches real-time data from APIs and displays forecasts.',
        isPremium: false,
        category: 'API Integration',
    },
    {
        id: '9',
        title: 'Create a Task Management System',
        description:
            'Design and implement a full-featured task management system with user authentication.',
        isPremium: true,
        category: 'Full Stack',
    },
    {
        id: '10',
        title: 'Build a Recipe Finder App',
        description:
            'Develop an application that helps users find recipes based on available ingredients.',
        isPremium: false,
        category: 'Mobile Development',
    },
    {
        id: '11',
        title: 'Design a Personal Finance Tracker',
        description:
            'Create a secure application for tracking expenses, income, and financial goals.',
        isPremium: true,
        category: 'Financial Tech',
    },
    {
        id: '12',
        title: 'Develop a Language Learning Game',
        description:
            'Build an interactive game that helps users learn vocabulary in a new language.',
        isPremium: false,
        category: 'Educational Tech',
    },
];

export default function ProjectPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const totalPages = Math.ceil(projects.length / itemsPerPage);
    const router = useRouter();
    const userAuth = useContext(Auth);
    const paginatedProjects = projects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const userFromStorage = localStorage.getItem('user');
        let isAuthenticated = false;
        let role = null;

        if (userAuth?.userAuth) {
            isAuthenticated = true;
            role = userAuth.userAuth.role;
        } else if (userFromStorage) {
            try {
                const parsedUser = JSON.parse(userFromStorage);
                isAuthenticated = !!parsedUser._id;
                role = parsedUser.role;
            } catch (e) {
                console.error('Failed to parse user from localStorage', e);
            }
        }

        setIsLoggedIn(isAuthenticated);
        setUserRole(role);
    }, [userAuth?.userAuth]);

    const handleProjectClick = (projectIndex: number, isPremium: boolean) => {
        if (!isLoggedIn) {
            router.push('/login');
            return;
        }

        if (isPremium && userRole !== 'premium') {
            router.push('/customer/upgrade');
            return;
        }

        // Pass the project ID as a query parameter
        const projectId = projects[projectIndex].id;
        router.push(`/customer/project/detail?id=${projectId}`);
    };

    return (
        <section className="px-6 md:px-16 py-12 bg-gradient-to-br from-[#EEF1EF] to-[#5AD3AF]/20 dark:from-gray-900 dark:to-[#657ED4]/20 transition-colors duration-300">
            <div className="text-center space-y-3 mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-[#657ED4] dark:text-[#5AD3AF] italic flex items-center justify-center gap-2">
                    <Crown className="w-6 h-6 text-[#F76F8E] dark:text-[#F76F8E]" />
                    Projects help you build your tech portfolio
                </h2>
                <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                    With a Plus or Pro account, you can work on real-world projects to apply your
                    learning and showcase your skills. Get started with one of our handpicked
                    options.
                </p>
            </div>

            <div className="grid h-auto sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {paginatedProjects.map((project, index) => (
                    <Card
                        key={index}
                        className="relative transition-all border border-[#EEF1EF] dark:border-[#657ED4]/30 rounded-2xl p-4 shadow-xl hover:shadow-2xl hover:scale-105 bg-white dark:bg-gray-800 flex flex-col justify-between"
                    >
                        {project.isPremium && (
                            <div className="absolute top-3 right-3 z-10">
                                <Badge
                                    variant="secondary"
                                    className="text-white bg-[#F76F8E] dark:bg-[#F76F8E]/80 border border-[#F76F8E]/50 dark:border-[#F76F8E]/30 flex items-center gap-1"
                                >
                                    <Crown className="w-4 h-4" /> Premium
                                </Badge>
                            </div>
                        )}
                        <CardHeader className="pb-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                <Badge
                                    variant="outline"
                                    className="text-xs font-normal text-[#657ED4] dark:text-[#5AD3AF] border-[#657ED4] dark:border-[#5AD3AF]"
                                >
                                    {project.category}
                                </Badge>
                            </p>
                            <h3 className="text-lg font-semibold text-[#657ED4] dark:text-[#5AD3AF] mt-2 leading-snug">
                                {project.title}
                            </h3>
                        </CardHeader>
                        <CardContent className="text-sm text-gray-700 dark:text-gray-300 pt-2 flex-grow">
                            {project.description}
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={() =>
                                    handleProjectClick(
                                        (currentPage - 1) * itemsPerPage + index,
                                        project.isPremium,
                                    )
                                }
                                className={`w-full rounded-full py-2 text-sm font-semibold flex items-center justify-center gap-2 ${
                                    project.isPremium
                                        ? 'bg-gradient-to-r from-[#657ED4] to-[#F76F8E] hover:from-[#5A6BBE] hover:to-[#E56582]'
                                        : 'bg-gradient-to-r from-[#5AD3AF] to-[#657ED4] hover:from-[#4AC2A0] hover:to-[#5A6BBE]'
                                } text-white transition-all duration-300`}
                            >
                                {project.isPremium ? (
                                    <>
                                        <Lock className="w-4 h-4" />
                                        {isLoggedIn ? 'Unlock with Premium' : 'Login to Access'}
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="w-4 h-4" />
                                        {isLoggedIn ? 'Enroll Now' : 'Login to Enroll'}
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div className="flex justify-center mt-10">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                                }}
                                className={
                                    currentPage === 1
                                        ? 'pointer-events-none opacity-50'
                                        : 'text-[#657ED4] dark:text-[#5AD3AF] hover:bg-[#EEF1EF] dark:hover:bg-gray-700'
                                }
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }).map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage(index + 1);
                                    }}
                                    isActive={currentPage === index + 1}
                                    className={
                                        currentPage === index + 1
                                            ? 'bg-[#5AD3AF] text-white dark:bg-[#657ED4] dark:text-white'
                                            : 'text-[#657ED4] dark:text-[#5AD3AF] hover:bg-[#EEF1EF] dark:hover:bg-gray-700'
                                    }
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                                }}
                                className={
                                    currentPage === totalPages
                                        ? 'pointer-events-none opacity-50'
                                        : 'text-[#657ED4] dark:text-[#5AD3AF] hover:bg-[#EEF1EF] dark:hover:bg-gray-700'
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

            <div className="flex flex-col items-center mt-12 gap-4">
                <Button className="bg-gradient-to-r from-[#5AD3AF] to-[#657ED4] hover:from-[#4AC2A0] hover:to-[#5A6BBE] text-white px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300">
                    Developing
                </Button>
                <a
                    href="#"
                    className="text-sm underline text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#F76F8E] dark:hover:text-[#F76F8E] transition-colors"
                >
                    Explore all projects
                </a>
            </div>
        </section>
    );
}
