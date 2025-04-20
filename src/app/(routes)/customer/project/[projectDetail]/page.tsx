// @/app/(routes)/customer/project/detail/page.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Clock, Code, Star, Lock, CheckCircle2 } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { Auth } from '@/lib/components/context/AuthContext';

// Static project data (same as in ProjectPage; in a real app, this would be fetched from an API)
const projects = [
    {
        id: '1',
        title: 'Build a routing program to help Vancouver commuters',
        description:
            'Use Python data structures and algorithms to help people navigate around Vancouver.',
        isPremium: true,
        category: 'Python',
        difficulty: 'Intermediate',
        estimatedTime: '10 hours',
        prerequisites: ['Basic Python', 'Data Structures', 'Algorithms'],
        overview: `
            In this project, you will build a routing program to assist Vancouver commuters in navigating the city efficiently. 
            Using Python, you'll implement graph-based algorithms like Dijkstra's to find the shortest paths between locations. 
            The project includes creating a user-friendly interface to input starting points and destinations, and visualizing the routes on a map.
        `,
        objectives: [
            'Understand and implement graph-based algorithms in Python.',
            'Design a user interface for inputting commute details.',
            'Visualize routes using a simple map representation.',
            'Optimize the routing algorithm for performance.',
        ],
        technologies: [
            'Python',
            'Graph Algorithms',
            'Tkinter (for UI)',
            'Matplotlib (for visualization)',
        ],
    },
    {
        id: '2',
        title: 'Decrypt Secret Messages',
        description:
            'Practice decrypting intercepted data using the command line to thwart Evil Corp.',
        isPremium: true,
        category: 'Cybersecurity',
        difficulty: 'Advanced',
        estimatedTime: '8 hours',
        prerequisites: ['Linux Command Line', 'Cryptography Basics'],
        overview: `
            This project focuses on cybersecurity by challenging you to decrypt secret messages intercepted from a fictional Evil Corp. 
            You'll use command-line tools and cryptographic techniques to decode the messages and reveal their contents.
        `,
        objectives: [
            'Learn to use command-line tools for decryption.',
            'Understand basic cryptographic techniques.',
            'Analyze and decode encrypted messages.',
        ],
        technologies: ['Linux', 'Cryptography', 'Bash Scripting'],
    },
    {
        id: '3',
        title: 'Analyze and Visualize Netflix Stock Data',
        description:
            'Act as a "Yahoo Finance" data analyst to generate a stock profile for Netflix.',
        isPremium: false,
        category: 'Data Analysis',
        difficulty: 'Beginner',
        estimatedTime: '5 hours',
        prerequisites: ['Basic Python', 'Pandas'],
        overview: `
            In this project, you'll act as a data analyst for Yahoo Finance, analyzing Netflix's stock data. 
            You'll use Python to process the data, calculate key metrics, and create visualizations to present your findings.
        `,
        objectives: [
            'Fetch and clean stock data using Python.',
            'Calculate financial metrics like moving averages.',
            'Create visualizations to present stock trends.',
        ],
        technologies: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
    },
    {
        id: '4',
        title: 'Analyze Hacker News Trends',
        description: 'Query Hacker News data using SQL to discover trends.',
        isPremium: false,
        category: 'SQL',
        difficulty: 'Intermediate',
        estimatedTime: '6 hours',
        prerequisites: ['Basic SQL', 'Data Analysis'],
        overview: `
            This project involves querying Hacker News data to identify trends in tech discussions. 
            You'll use SQL to extract insights and present your findings in a structured format.
        `,
        objectives: [
            'Write SQL queries to extract data from a database.',
            'Analyze trends in tech discussions.',
            'Present findings using tables and charts.',
        ],
        technologies: ['SQL', 'SQLite', 'Data Visualization'],
    },
    {
        id: '5',
        title: 'Create a E-Commerce App (Part Two)',
        description:
            'Make a full-stack e-commerce app that lets users register accounts, browse products, and make purchases.',
        isPremium: true,
        category: 'Web Development',
        difficulty: 'Advanced',
        estimatedTime: '20 hours',
        prerequisites: ['HTML/CSS', 'JavaScript', 'Node.js'],
        overview: `
            In this project, you'll build a full-stack e-commerce application with user authentication, product browsing, and payment integration. 
            This is Part Two of the series, focusing on advanced features like cart management and order processing.
        `,
        objectives: [
            'Implement user authentication and authorization.',
            'Create a product browsing and filtering system.',
            'Integrate a payment gateway for purchases.',
            'Manage cart and order processing.',
        ],
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    },
    {
        id: '6',
        title: 'Predict Baseball Strike Zones With Machine Learning',
        description: 'Calculate and visualize MLB player strike zones based on their real data.',
        isPremium: false,
        category: 'Machine Learning',
        difficulty: 'Intermediate',
        estimatedTime: '12 hours',
        prerequisites: ['Python', 'Machine Learning Basics'],
        overview: `
            This project uses machine learning to predict and visualize MLB player strike zones. 
            You'll work with real baseball data, train a model, and create visualizations to showcase your predictions.
        `,
        objectives: [
            'Preprocess baseball data for machine learning.',
            'Train a model to predict strike zones.',
            'Visualize predictions using charts and graphs.',
        ],
        technologies: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'],
    },
    {
        id: '7',
        title: 'Build a Social Media Dashboard',
        description:
            'Create a responsive dashboard to track and analyze social media metrics across platforms.',
        isPremium: true,
        category: 'Frontend',
        difficulty: 'Intermediate',
        estimatedTime: '15 hours',
        prerequisites: ['HTML/CSS', 'JavaScript', 'React'],
        overview: `
            In this project, you'll build a responsive dashboard to track social media metrics from platforms like Twitter and Instagram. 
            The dashboard will include charts, tables, and interactive features to analyze user engagement.
        `,
        objectives: [
            'Design a responsive UI with React.',
            'Fetch and display social media metrics.',
            'Create interactive charts and tables.',
        ],
        technologies: ['React', 'Tailwind CSS', 'Chart.js', 'API Integration'],
    },
    {
        id: '8',
        title: 'Develop a Weather Forecast App',
        description:
            'Build a weather application that fetches real-time data from APIs and displays forecasts.',
        isPremium: false,
        category: 'API Integration',
        difficulty: 'Beginner',
        estimatedTime: '7 hours',
        prerequisites: ['JavaScript', 'API Basics'],
        overview: `
            This project involves building a weather forecast app that fetches real-time data from a weather API. 
            You'll display current weather conditions and a 5-day forecast for user-selected locations.
        `,
        objectives: [
            'Fetch data from a weather API.',
            'Display current weather and forecasts.',
            'Allow users to search for locations.',
        ],
        technologies: ['JavaScript', 'Fetch API', 'HTML/CSS'],
    },
    {
        id: '9',
        title: 'Create a Task Management System',
        description:
            'Design and implement a full-featured task management system with user authentication.',
        isPremium: true,
        category: 'Full Stack',
        difficulty: 'Advanced',
        estimatedTime: '25 hours',
        prerequisites: ['React', 'Node.js', 'MongoDB'],
        overview: `
            In this project, you'll create a task management system with user authentication, task creation, and status tracking. 
            The system will include features like due dates, priorities, and notifications.
        `,
        objectives: [
            'Implement user authentication.',
            'Create and manage tasks with due dates and priorities.',
            'Add notifications for overdue tasks.',
        ],
        technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    },
    {
        id: '10',
        title: 'Build a Recipe Finder App',
        description:
            'Develop an application that helps users find recipes based on available ingredients.',
        isPremium: false,
        category: 'Mobile Development',
        difficulty: 'Intermediate',
        estimatedTime: '10 hours',
        prerequisites: ['React Native', 'API Basics'],
        overview: `
            This project focuses on building a mobile app that helps users find recipes based on ingredients they have. 
            You'll integrate with a recipe API and create a user-friendly interface for mobile devices.
        `,
        objectives: [
            'Fetch recipes from an API based on ingredients.',
            'Design a mobile-friendly UI with React Native.',
            'Allow users to save favorite recipes.',
        ],
        technologies: ['React Native', 'API Integration', 'AsyncStorage'],
    },
    {
        id: '11',
        title: 'Design a Personal Finance Tracker',
        description:
            'Create a secure application for tracking expenses, income, and financial goals.',
        isPremium: true,
        category: 'Financial Tech',
        difficulty: 'Advanced',
        estimatedTime: '18 hours',
        prerequisites: ['React', 'Firebase'],
        overview: `
            In this project, you'll build a personal finance tracker to help users manage their expenses, income, and financial goals. 
            The app will include secure authentication and data visualization for financial insights.
        `,
        objectives: [
            'Implement secure user authentication.',
            'Track expenses and income.',
            'Visualize financial data with charts.',
            'Set and track financial goals.',
        ],
        technologies: ['React', 'Firebase', 'Chart.js'],
    },
    {
        id: '12',
        title: 'Develop a Language Learning Game',
        description:
            'Build an interactive game that helps users learn vocabulary in a new language.',
        isPremium: false,
        category: 'Educational Tech',
        difficulty: 'Beginner',
        estimatedTime: '8 hours',
        prerequisites: ['JavaScript', 'HTML/CSS'],
        overview: `
            This project involves creating an interactive game to help users learn vocabulary in a new language. 
            The game will include quizzes, flashcards, and progress tracking to make learning fun and engaging.
        `,
        objectives: [
            'Create an interactive vocabulary quiz.',
            'Implement flashcards for learning.',
            'Track user progress and scores.',
        ],
        technologies: ['JavaScript', 'HTML/CSS', 'LocalStorage'],
    },
];

export default function ProjectDetailPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const projectId = searchParams.get('id');
    const userAuth = useContext(Auth);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    interface Project {
        id: string;
        title: string;
        description: string;
        isPremium: boolean;
        category: string;
        difficulty: string;
        estimatedTime: string;
        prerequisites: string[];
        overview: string;
        objectives: string[];
        technologies: string[];
    }

    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user authentication status
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

    useEffect(() => {
        // Fetch project details based on ID
        if (projectId) {
            const foundProject = projects.find((p) => p.id === projectId);
            if (foundProject) {
                setProject(foundProject);
            } else {
                // Handle case where project is not found
                router.push('/customer/project'); // Redirect back to project list
            }
        } else {
            router.push('/customer/project'); // Redirect if no ID is provided
        }
        setLoading(false);
    }, [projectId, router]);

    const handleStartProject = () => {
        if (!isLoggedIn) {
            router.push('/login');
            return;
        }

        if (project && project.isPremium && userRole !== 'premium') {
            router.push('/customer/upgrade');
            return;
        }

        // Redirect to a project workspace or starting page
        if (project) {
            router.push(`/customer/project/${project.id}/workspace`);
        }
    };

    const handleBack = () => {
        router.push('/customer/project');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5AD3AF]"></div>
            </div>
        );
    }

    if (!project) {
        return null; // Redirect will handle this case
    }

    return (
        <div className="min-h-screen bg-[#EEF1EF] dark:bg-gray-900 transition-colors duration-300">
            {/* Header Section */}
            <header className="bg-white dark:bg-gray-800 shadow-md py-6 px-6 md:px-16 sticky top-0 z-10 border-b border-[#EEF1EF] dark:border-[#657ED4]/30">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            onClick={handleBack}
                            className="text-[#657ED4] dark:text-[#5AD3AF] hover:bg-[#EEF1EF] dark:hover:bg-gray-700"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Projects
                        </Button>
                    </div>
                    <Badge
                        variant="outline"
                        className="text-xs font-normal text-[#657ED4] dark:text-[#5AD3AF] border-[#657ED4] dark:border-[#5AD3AF]"
                    >
                        {project.category}
                    </Badge>
                </div>
            </header>

            {/* Main Content */}
            <main className="px-6 md:px-16 py-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Section: Hero and Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Hero Section */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-[#EEF1EF] dark:border-[#657ED4]/30">
                            <div className="flex justify-between items-start mb-4">
                                <h1 className="text-3xl md:text-4xl font-bold text-[#657ED4] dark:text-[#5AD3AF]">
                                    {project.title}
                                </h1>
                                {project.isPremium && (
                                    <Badge
                                        variant="secondary"
                                        className="text-white bg-[#F76F8E] dark:bg-[#F76F8E]/80 border border-[#F76F8E]/50 dark:border-[#F76F8E]/30 flex items-center gap-1"
                                    >
                                        <Lock className="w-4 h-4" /> Premium
                                    </Badge>
                                )}
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mb-6">
                                {project.description}
                            </p>
                            <Button
                                onClick={handleStartProject}
                                className={`w-full md:w-auto rounded-full py-3 px-6 text-sm font-semibold flex items-center justify-center gap-2 ${
                                    project.isPremium
                                        ? 'bg-gradient-to-r from-[#657ED4] to-[#F76F8E] hover:from-[#5A6BBE] hover:to-[#E56582]'
                                        : 'bg-gradient-to-r from-[#5AD3AF] to-[#657ED4] hover:from-[#4AC2A0] hover:to-[#5A6BBE]'
                                } text-white transition-all duration-300`}
                            >
                                {project.isPremium ? (
                                    <>
                                        <Lock className="w-4 h-4" />
                                        {isLoggedIn ? 'Unlock with Premium' : 'Login to Start'}
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="w-4 h-4" />
                                        {isLoggedIn ? 'Start Project' : 'Login to Start'}
                                    </>
                                )}
                            </Button>
                        </section>

                        {/* Details Section with Tabs */}
                        <section>
                            <Tabs defaultValue="overview" className="w-full">
                                <TabsList className="flex gap-2 mb-6 bg-transparent border-b border-gray-200 dark:border-gray-700">
                                    {['Overview', 'Objectives', 'Technologies'].map((tab, i) => (
                                        <TabsTrigger
                                            key={i}
                                            value={['overview', 'objectives', 'technologies'][i]}
                                            className="py-3 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-t-lg transition-all data-[state=active]:bg-white data-[state=active]:dark:bg-gray-800 data-[state=active]:text-[#657ED4] data-[state=active]:dark:text-[#5AD3AF] data-[state=active]:shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            {tab}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>

                                <TabsContent value="overview">
                                    <Card className="border-[#EEF1EF] dark:border-[#657ED4]/30 rounded-2xl shadow-xl">
                                        <CardHeader>
                                            <h2 className="text-xl font-semibold text-[#657ED4] dark:text-[#5AD3AF]">
                                                Project Overview
                                            </h2>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                                                {project.overview}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="objectives">
                                    <Card className="border-[#EEF1EF] dark:border-[#657ED4]/30 rounded-2xl shadow-xl">
                                        <CardHeader>
                                            <h2 className="text-xl font-semibold text-[#657ED4] dark:text-[#5AD3AF]">
                                                Learning Objectives
                                            </h2>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                                {project.objectives.map(
                                                    (objective: string, index: number) => (
                                                        <li key={index}>{objective}</li>
                                                    ),
                                                )}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="technologies">
                                    <Card className="border-[#EEF1EF] dark:border-[#657ED4]/30 rounded-2xl shadow-xl">
                                        <CardHeader>
                                            <h2 className="text-xl font-semibold text-[#657ED4] dark:text-[#5AD3AF]">
                                                Technologies Used
                                            </h2>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map(
                                                    (tech: string, index: number) => (
                                                        <Badge
                                                            key={index}
                                                            variant="outline"
                                                            className="text-[#657ED4] dark:text-[#5AD3AF] border-[#657ED4] dark:border-[#5AD3AF]"
                                                        >
                                                            {tech}
                                                        </Badge>
                                                    ),
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </section>
                    </div>

                    {/* Right Section: Sidebar */}
                    <aside className="lg:col-span-1 space-y-6">
                        <Card className="border-[#EEF1EF] dark:border-[#657ED4]/30 rounded-2xl shadow-xl sticky top-24">
                            <CardHeader>
                                <h2 className="text-xl font-semibold text-[#657ED4] dark:text-[#5AD3AF]">
                                    Project Stats
                                </h2>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Star className="w-5 h-5 text-[#F76F8E]" />
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Difficulty
                                        </p>
                                        <p className="font-medium text-gray-900 dark:text-gray-100">
                                            {project.difficulty}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-[#F76F8E]" />
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Estimated Time
                                        </p>
                                        <p className="font-medium text-gray-900 dark:text-gray-100">
                                            {project.estimatedTime}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Code className="w-5 h-5 text-[#F76F8E]" />
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Prerequisites
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {project.prerequisites.map(
                                                (prereq: string, index: number) => (
                                                    <Badge
                                                        key={index}
                                                        variant="outline"
                                                        className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                                                    >
                                                        {prereq}
                                                    </Badge>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </main>

            {/* Sticky Footer Call-to-Action */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg py-4 px-6 md:px-16 border-t border-[#EEF1EF] dark:border-[#657ED4]/30">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <p className="text-gray-700 dark:text-gray-300">
                        Ready to dive into this project?
                    </p>
                    <Button
                        onClick={handleStartProject}
                        className={`rounded-full py-3 px-6 text-sm font-semibold flex items-center gap-2 ${
                            project.isPremium
                                ? 'bg-gradient-to-r from-[#657ED4] to-[#F76F8E] hover:from-[#5A6BBE] hover:to-[#E56582]'
                                : 'bg-gradient-to-r from-[#5AD3AF] to-[#657ED4] hover:from-[#4AC2A0] hover:to-[#5A6BBE]'
                        } text-white transition-all duration-300`}
                    >
                        {project.isPremium ? (
                            <>
                                <Lock className="w-4 h-4" />
                                {isLoggedIn ? 'Unlock with Premium' : 'Login to Start'}
                            </>
                        ) : (
                            <>
                                <CheckCircle2 className="w-4 h-4" />
                                {isLoggedIn ? 'Start Project' : 'Login to Start'}
                            </>
                        )}
                    </Button>
                </div>
            </footer>
        </div>
    );
}
