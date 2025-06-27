'use client';

import { useEffect, useState, useRef } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { getUserDetail } from '@/lib/services/admin/getuserdetail';
import CourseInProgress from '@/app/(routes)/customer/process/CourseInProgress';
import UpcomingAssignment from '@/app/(routes)/customer/process/UpcomingAssignment';
import ContinueWatching from '@/app/(routes)/customer/process/ContinueWatching';
import YourMentor from '@/app/(routes)/customer/process/YourMentor';
import CertificationSection from '@/app/(routes)/customer/process/CertificationSection';
import LeaderboardCard from '@/app/(routes)/customer/process/LeaderboardCard';
import UserProfileCard from '@/app/(routes)/customer/process/UserProfileCard';
import MyAssignmentCard from '@/app/(routes)/customer/process/MyAssignmentCard';
import { motion } from 'framer-motion';
import ChatAIPage from '@/components/ChatAIPage';
import { TooltipProvider } from '@/components/ui/tooltip';
import { X, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Category {
    _id: string;
    name: string;
}

interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    author: {
        fullName: string;
    };
    category: Category[];
    createdAt: string;
    enrolledCount: number;
}

interface User {
    _id: string;
    fullName: string;
    role: string;
    wallet: number;
    email: string;
    enrolledCourses: Course[];
    createdAt: string;
    updatedAt: string;
    dailyStreak: number;
    totalXP: number;
}

const guideSteps = [
    {
        title: 'Courses in Progress',
        target: 'course-in-progress',
        description: 'Track your learning progress. See what you need to complete next.',
    },
    {
        title: 'Upcoming Assignments',
        target: 'upcoming-assignments',
        description: 'View upcoming assignments to avoid missing important deadlines.',
    },
    {
        title: 'Continue Learning',
        target: 'continue-watching',
        description: 'Resume from the lecture you left off to avoid interruption.',
    },
    {
        title: 'Your Mentor',
        target: 'your-mentor',
        description: 'Connect with your mentor for guidance and support when needed.',
    },
    {
        title: 'Certificates',
        target: 'certification-section',
        description: 'View and download certificates after completing courses.',
    },
    {
        title: 'Personal Profile',
        target: 'user-profile',
        description: 'Manage your personal information, achievements, and learning statistics.',
    },
    {
        title: 'Leaderboard',
        target: 'leaderboard',
        description: 'Check your rank compared to other learners.',
    },
    {
        title: 'My Assignments',
        target: 'my-assignments',
        description: 'Submit assignments and review feedback from instructors.',
    },
    {
        title: 'AI Support',
        target: 'ai-insights',
        description: 'Get personalized learning suggestions from the AI assistant.',
    },
];

export default function Process() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [enrollCourse, setEnrollCourse] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'Dashboard' | 'AI Insights'>('Dashboard');
    const [showGuide, setShowGuide] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [elementPosition, setElementPosition] = useState({
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        popupTop: 0,
        popupLeft: 0,
        arrowDirection: 'bottom' as 'top' | 'bottom' | 'left' | 'right', // Updated to union type
    });
    const [highlightStyle, setHighlightStyle] = useState({});
    const guideRef = useRef<HTMLDivElement>(null);

    const fetchUserDetail = async () => {
        try {
            setIsLoading(true);
            const userId = localStorage.getItem('user');
            if (!userId) {
                toast({
                    title: 'Error',
                    description: 'Please log in to view your personal page',
                    variant: 'destructive',
                });
                router.push('/login');
                return;
            }
            const user = JSON.parse(userId);
            const id = user.id;

            const userDetail = await getUserDetail(id);
            setEnrollCourse(userDetail.metadata?.enrolledCourses || []);
            setUser(userDetail.metadata);
        } catch (error) {
            console.error('Error loading user information:', error);
            toast({
                title: 'Error',
                description: 'Unable to load user information',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserDetail();
        const hasSeenGuide = localStorage.getItem('hasSeenGuide');
        if (!hasSeenGuide) {
            setTimeout(() => {
                setShowGuide(true);
            }, 1500);
        }
    }, []);

    useEffect(() => {
        if (showGuide) {
            const element = document.getElementById(guideSteps[currentStep].target);
            if (element) {
                const rect = element.getBoundingClientRect();
                const scrollY = window.scrollY;
                const scrollX = window.scrollX;

                const popupWidth = 280;
                const popupHeight = 160;
                const padding = 15;

                // Calculate available space around element
                const spaceAbove = rect.top;
                const spaceBelow = window.innerHeight - rect.bottom;
                const spaceLeft = rect.left;
                const spaceRight = window.innerWidth - rect.right;

                // Determine best position for popup and arrow direction
                let popupTop, popupLeft, arrowDirection: 'top' | 'bottom' | 'left' | 'right';

                if (spaceRight > popupWidth + padding && spaceRight > spaceLeft) {
                    // Position to the right
                    popupLeft = rect.right + scrollX + padding;
                    popupTop = rect.top + scrollY + rect.height / 2 - popupHeight / 2;
                    arrowDirection = 'left';
                } else if (spaceLeft > popupWidth + padding) {
                    // Position to the left
                    popupLeft = rect.left + scrollX - popupWidth - padding;
                    popupTop = rect.top + scrollY + rect.height / 2 - popupHeight / 2;
                    arrowDirection = 'right';
                } else if (spaceBelow > popupHeight + padding && spaceBelow > spaceAbove) {
                    // Position below
                    popupLeft = rect.left + scrollX + rect.width / 2 - popupWidth / 2;
                    popupTop = rect.bottom + scrollY + padding;
                    arrowDirection = 'top';
                } else {
                    // Position above
                    popupLeft = rect.left + scrollX + rect.width / 2 - popupWidth / 2;
                    popupTop = rect.top + scrollY - popupHeight - padding;
                    arrowDirection = 'bottom';
                }

                // Ensure popup stays within viewport
                popupLeft = Math.max(
                    padding,
                    Math.min(popupLeft, window.innerWidth - popupWidth - padding),
                );
                popupTop = Math.max(
                    padding,
                    Math.min(popupTop, window.innerHeight - popupHeight - padding),
                );

                // Set highlight style with adjustment to move up and left
                setHighlightStyle({
                    position: 'absolute',
                    top: `${rect.top + scrollY - 102}px`, // Adjust up by 20px
                    left: `${rect.left + scrollX - 102}px`, // Adjust left by 40px
                    width: `${rect.width + 8}px`,
                    height: `${rect.height + 8}px`,
                    borderRadius: '0.375rem',
                    border: '2px solid #657ED4',
                    boxShadow: '0 0 0 9999px rgba(101, 126, 212, 0.1)',
                    pointerEvents: 'none',
                    zIndex: 49,
                    transition: 'all 0.3s ease',
                });

                setElementPosition({
                    top: rect.top + scrollY,
                    left: rect.left + scrollX,
                    width: rect.width,
                    height: rect.height,
                    popupTop,
                    popupLeft,
                    arrowDirection,
                });

                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [showGuide, currentStep]);

    const handleStartGuide = () => {
        setShowGuide(true);
        setCurrentStep(0);
    };

    const handleNext = () => {
        if (currentStep < guideSteps.length - 1) {
            if (guideSteps[currentStep + 1].target === 'ai-insights') {
                setActiveTab('AI Insights');
            }
            setCurrentStep(currentStep + 1);
        } else {
            handleExit();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            if (guideSteps[currentStep - 1].target !== 'ai-insights') {
                setActiveTab('Dashboard');
            }
            setCurrentStep(currentStep - 1);
        }
    };

    const handleExit = () => {
        setShowGuide(false);
        localStorage.setItem('hasSeenGuide', 'true');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 bg-[#657ED4] rounded-full mb-4"></div>
                    <p className="text-gray-600">Loading personal page...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen px-4 sm:px-6 md:px-12 lg:px-24 py-12">
            {/* Highlight overlay (very subtle) */}
            {showGuide && <div style={highlightStyle}></div>}

            <TooltipProvider>
                <div className="max-w-8xl mx-auto">
                    <div className="mb-8 text-center">
                        <Button
                            onClick={handleStartGuide}
                            className="bg-[#657ED4] hover:bg-[#5A6ED4] text-white flex items-center gap-2"
                        >
                            <HelpCircle className="h-5 w-5" />
                            Start Guide
                        </Button>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-[#657ED4] mb-8">
                        Personal Learning Page
                    </h1>

                    <div className="mb-6 flex space-x-4">
                        <button
                            className={`px-4 py-2 rounded-lg ${activeTab === 'Dashboard' ? 'bg-[#657ED4] text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setActiveTab('Dashboard')}
                        >
                            Dashboard
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg ${activeTab === 'AI Insights' ? 'bg-[#657ED4] text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setActiveTab('AI Insights')}
                        >
                            AI Support
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {activeTab === 'Dashboard' && (
                            <>
                                <div className="md:col-span-2 space-y-8">
                                    <div id="course-in-progress">
                                        <CourseInProgress enrollCourse={enrollCourse} />
                                    </div>

                                    <div id="upcoming-assignments">
                                        <UpcomingAssignment />
                                    </div>

                                    <div id="continue-watching">
                                        <ContinueWatching />
                                    </div>

                                    <div id="your-mentor">
                                        <YourMentor />
                                    </div>

                                    <div id="certification-section">
                                        <CertificationSection />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div id="user-profile">
                                        <UserProfileCard user={user} />
                                    </div>

                                    <div id="leaderboard">
                                        <LeaderboardCard />
                                    </div>

                                    {user && (
                                        <div id="my-assignments">
                                            <MyAssignmentCard user={user} />
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {activeTab === 'AI Insights' && (
                            <div className="md:col-span-3" id="ai-insights">
                                <ChatAIPage onClose={() => setActiveTab('Dashboard')} />
                            </div>
                        )}
                    </div>
                </div>
            </TooltipProvider>

            {/* Guide Popup */}
            {showGuide && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 border border-gray-200 dark:border-gray-700"
                    style={{
                        top: elementPosition.popupTop,
                        left: elementPosition.popupLeft,
                    }}
                    ref={guideRef}
                >
                    {/* Arrow pointing to the component */}
                    {elementPosition.arrowDirection === 'top' && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <svg width="20" height="10" viewBox="0 0 20 10">
                                <path
                                    d="M0 10 L10 0 L20 10"
                                    fill="currentColor"
                                    className="text-white dark:text-gray-800"
                                />
                            </svg>
                        </div>
                    )}
                    {elementPosition.arrowDirection === 'bottom' && (
                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                            <svg width="20" height="10" viewBox="0 0 20 10">
                                <path
                                    d="M0 0 L10 10 L20 0"
                                    fill="currentColor"
                                    className="text-white dark:text-gray-800"
                                />
                            </svg>
                        </div>
                    )}
                    {elementPosition.arrowDirection === 'left' && (
                        <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 rotate-90">
                            <svg width="10" height="20" viewBox="0 0 10 20">
                                <path
                                    d="M10 0 L0 10 L10 20"
                                    fill="currentColor"
                                    className="text-white dark:text-gray-800"
                                />
                            </svg>
                        </div>
                    )}
                    {elementPosition.arrowDirection === 'right' && (
                        <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 -rotate-90">
                            <svg width="10" height="20" viewBox="0 0 10 20">
                                <path
                                    d="M0 0 L10 10 L0 20"
                                    fill="currentColor"
                                    className="text-white dark:text-gray-800"
                                />
                            </svg>
                        </div>
                    )}

                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-md font-bold text-[#657ED4] dark:text-[#5AD3AF]">
                            {guideSteps[currentStep].title}
                        </h3>
                        <button
                            onClick={handleExit}
                            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                        {guideSteps[currentStep].description}
                    </p>

                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            Step {currentStep + 1}/{guideSteps.length}
                        </span>

                        <div className="flex space-x-2">
                            {currentStep > 0 && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handlePrev}
                                    className="text-xs h-8"
                                >
                                    Back
                                </Button>
                            )}
                            <Button
                                variant="default"
                                size="sm"
                                onClick={handleNext}
                                className="bg-[#657ED4] hover:bg-[#5A6ED4] text-white text-xs h-8"
                            >
                                {currentStep === guideSteps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
