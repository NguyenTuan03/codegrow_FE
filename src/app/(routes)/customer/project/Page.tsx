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

// Expanded project list with more items
const projects = [
    {
        title: 'Build a routing program to help Vancouver commuters',
        description:
            'Use Python data structures and algorithms to help people navigate around Vancouver.',
        isPremium: true,
        category: 'Python',
    },
    {
        title: 'Decrypt Secret Messages',
        description:
            'Practice decrypting intercepted data using the command line to thwart Evil Corp.',
        isPremium: true,
        category: 'Cybersecurity',
    },
    {
        title: 'Analyze and Visualize Netflix Stock Data',
        description:
            'Act as a "Yahoo Finance" data analyst to generate a stock profile for Netflix.',
        isPremium: false,
        category: 'Data Analysis',
    },
    {
        title: 'Analyze Hacker News Trends',
        description: 'Query Hacker News data using SQL to discover trends.',
        isPremium: false,
        category: 'SQL',
    },
    {
        title: 'Create a E-Commerce App (Part Two)',
        description:
            'Make a full-stack e-commerce app that lets users register accounts, browse products, and make purchases.',
        isPremium: true,
        category: 'Web Development',
    },
    {
        title: 'Predict Baseball Strike Zones With Machine Learning',
        description: 'Calculate and visualize MLB player strike zones based on their real data.',
        isPremium: false,
        category: 'Machine Learning',
    },
    {
        title: 'Build a Social Media Dashboard',
        description:
            'Create a responsive dashboard to track and analyze social media metrics across platforms.',
        isPremium: true,
        category: 'Frontend',
    },
    {
        title: 'Develop a Weather Forecast App',
        description:
            'Build a weather application that fetches real-time data from APIs and displays forecasts.',
        isPremium: false,
        category: 'API Integration',
    },
    {
        title: 'Create a Task Management System',
        description:
            'Design and implement a full-featured task management system with user authentication.',
        isPremium: true,
        category: 'Full Stack',
    },
    {
        title: 'Build a Recipe Finder App',
        description:
            'Develop an application that helps users find recipes based on available ingredients.',
        isPremium: false,
        category: 'Mobile Development',
    },
    {
        title: 'Design a Personal Finance Tracker',
        description:
            'Create a secure application for tracking expenses, income, and financial goals.',
        isPremium: true,
        category: 'Financial Tech',
    },
    {
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
        // Check both localStorage and auth context
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
    }, [userAuth?.userAuth]); // Only depend on authContext.userAuth

    const handleProjectClick = (projectIndex: number, isPremium: boolean) => {
        if (!isLoggedIn) {
            router.push('/login');
            return;
        }

        if (isPremium && userRole !== 'premium') {
            router.push('/customer/upgrade');
            return;
        }

        router.push(`/customer/project/${projects[projectIndex].title}`);
    };
    return (
        <section className="px-6 md:px-16 py-12">
            <div className="text-center space-y-2 mb-10">
                <h2 className="text-xl md:text-2xl font-semibold italic">
                    Projects help you build your tech portfolio
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    With a Plus or Pro account, you can work on real-world projects to apply your
                    learning and showcase your skills. Get started with one of our handpicked
                    options.
                </p>
            </div>

            <div className="grid h-auto sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProjects.map((project, index) => (
                    <Card
                        key={index}
                        className="relative transition shadow-md hover:shadow-lg flex flex-col justify-between"
                    >
                        {project.isPremium && (
                            <div className="absolute top-3 right-3 z-10">
                                <Badge
                                    variant="secondary"
                                    className="text-yellow-600 bg-yellow-100 flex items-center gap-1"
                                >
                                    <Crown className="w-4 h-4" /> Premium
                                </Badge>
                            </div>
                        )}
                        <CardHeader className="pb-0">
                            <p className="text-sm text-muted-foreground">
                                <Badge variant="outline" className="text-xs font-normal">
                                    {project.category}
                                </Badge>
                            </p>
                            <h3 className="text-lg font-semibold text-blue-800 leading-snug mt-2">
                                {project.title}
                            </h3>
                        </CardHeader>
                        <CardContent className="text-sm text-gray-600 pt-2 flex-grow">
                            {project.description}
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={() => handleProjectClick(index, project.isPremium)}
                                className={`w-full ${
                                    project.isPremium
                                        ? 'bg-pink-500 hover:bg-pink-600'
                                        : 'bg-green-500 hover:bg-green-600'
                                } text-white rounded-lg py-2 flex items-center justify-center gap-2`}
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

            {/* Pagination using shadcn UI components */}
            <div className="flex justify-center mt-8">
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
                                    currentPage === 1 ? 'pointer-events-none opacity-50' : ''
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
                                        : ''
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
            <div className="flex flex-col items-center mt-12 gap-4">
                <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 text-sm">
                    Developing
                </Button>
                <a href="#" className="text-sm underline text-blue-500">
                    Explore all projects
                </a>
            </div>
        </section>
    );
}
