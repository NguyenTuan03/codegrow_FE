'use client';

import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CheckCircle2, PlayCircle, BookOpen, Code, Video } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';

const CourseLearningPage = () => {
    const router = useRouter();
    const [completedModules, setCompletedModules] = useState({
        'module-1': false,
        'module-2': false,
        'module-3': false,
        'module-4': false,
        'module-5': false,
    });

    // Calculate progress percentage
    const progressPercentage =
        (Object.values(completedModules).filter(Boolean).length /
            Object.values(completedModules).length) *
        100;

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12 md:px-24 lg:px-32 space-y-8">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-500 space-x-2">
                <span className="hover:text-gray-700 transition-colors cursor-pointer">
                    Courses
                </span>
                <span>{'>'}</span>
                <span className="hover:text-gray-700 transition-colors cursor-pointer">
                    Programming
                </span>
                <span>{'>'}</span>
                <span className="text-blue-600 font-medium hover:underline cursor-pointer">
                    Introduction to Test and Behavior Driven Development
                </span>
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">
                    Introduction to Test and Behavior Driven Development
                </h1>
                <p className="text-gray-600">by IBM</p>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="flex flex-wrap gap-2 mb-8 bg-transparent border-b border-gray-200">
                    {['Tổng quan', 'Điểm số', 'Ghi chú', 'Thảo luận'].map((tab, i) => (
                        <TabsTrigger
                            key={i}
                            value={['overview', 'grades', 'notes', 'messages'][i]}
                            className="py-3 px-6 text-sm font-medium text-gray-700 rounded-t-lg transition-all data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm hover:bg-gray-100"
                        >
                            {tab}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* Overview Content */}
                <TabsContent value="overview">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900">
                                Test Driven Development
                            </h3>
                            <div className="flex items-center gap-4 mt-2">
                                <Progress value={progressPercentage} className="h-2 w-64" />
                                <span className="text-sm text-gray-500">
                                    {Math.round(progressPercentage)}% Complete
                                </span>
                            </div>
                        </div>
                        <Separator className="bg-gray-200" />

                        {/* Module List */}
                        <div className="space-y-4">
                            {/* Module 1 */}
                            <div
                                className={`bg-white p-6 rounded-xl shadow-sm ${
                                    completedModules['module-1']
                                        ? 'border-l-4 border-green-500'
                                        : 'border-l-4 border-blue-500'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {completedModules['module-1'] ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <PlayCircle className="w-5 h-5 text-blue-500" />
                                        )}
                                        <div className="font-medium text-gray-800">
                                            1. Introduction to TDD
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() =>
                                            handleNavigation('/customer/coursesdetailwatching')
                                        }
                                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        <PlayCircle className="w-4 h-4" /> Start Learning
                                    </Button>
                                </div>
                            </div>

                            {/* Module 2 */}
                            <div
                                className={`bg-white p-6 rounded-xl shadow-sm ${
                                    completedModules['module-2']
                                        ? 'border-l-4 border-green-500'
                                        : 'border-l-4 border-blue-500'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {completedModules['module-2'] ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <BookOpen className="w-5 h-5 text-blue-500" />
                                        )}
                                        <div className="font-medium text-gray-800">
                                            2. TDD Principles
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() =>
                                            handleNavigation('/customer/coursesdetailreading')
                                        }
                                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        <BookOpen className="w-4 h-4" /> Start Reading
                                    </Button>
                                </div>
                            </div>

                            {/* Module 3 */}
                            <div
                                className={`bg-white p-6 rounded-xl shadow-sm ${
                                    completedModules['module-3']
                                        ? 'border-l-4 border-green-500'
                                        : 'border-l-4 border-blue-500'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {completedModules['module-3'] ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <BookOpen className="w-5 h-5 text-blue-500" />
                                        )}
                                        <div className="font-medium text-gray-800">
                                            3. TDD Basics Reading
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() =>
                                            handleNavigation('/customer/coursesdetailreading')
                                        }
                                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        <BookOpen className="w-4 h-4" /> Start Reading
                                    </Button>
                                </div>
                            </div>

                            {/* Module 4 */}
                            <div
                                className={`bg-white p-6 rounded-xl shadow-sm ${
                                    completedModules['module-4']
                                        ? 'border-l-4 border-green-500'
                                        : 'border-l-4 border-blue-500'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {completedModules['module-4'] ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <Video className="w-5 h-5 text-blue-500" />
                                        )}
                                        <div className="font-medium text-gray-800">
                                            4. Video Tutorial: TDD in Practice
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() =>
                                            handleNavigation('/customer/coursesdetailwatching')
                                        }
                                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        <PlayCircle className="w-4 h-4" /> Watch Video
                                    </Button>
                                </div>
                            </div>

                            {/* Module 5 */}
                            <div
                                className={`bg-white p-6 rounded-xl shadow-sm ${
                                    completedModules['module-5']
                                        ? 'border-l-4 border-green-500'
                                        : 'border-l-4 border-blue-500'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {completedModules['module-5'] ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <Code className="w-5 h-5 text-blue-500" />
                                        )}
                                        <div className="font-medium text-gray-800">
                                            5. Hands-on Practice: Write TDD Tests
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() =>
                                            handleNavigation('/customer/coursesdetailpractice')
                                        }
                                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        <Code className="w-4 h-4" /> Start Practice
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default CourseLearningPage;
