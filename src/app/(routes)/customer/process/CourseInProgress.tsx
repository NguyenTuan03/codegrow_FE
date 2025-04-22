'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from '@/components/ui/use-toast';
import { GetProgress } from '@/lib/services/api/progress';

interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    author: {
        fullName: string;
    };
    category?: Category[] | Category | null;
    createdAt: string;
    enrolledCount: number;
}

interface Category {
    _id: string;
    name: string;
}

interface CourseInProgressProps {
    enrollCourse: Course[];
}

// interface ProgressData {
//     courseId: string;
//     progress: number;
//     completedLessons: [];
//     completedQuizzes: [];
// }

export default function CourseInProgress({ enrollCourse }: CourseInProgressProps) {
    const [progressData, setProgressData] = useState<{ [key: string]: number }>({});
    const [loading, setLoading] = useState<boolean>(true);

    const fetchProgress = async (courseId: string) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication token is missing');
            }
            const response = await GetProgress(token, courseId);
            console.log('Progress response:', response);
            const progress = response.metadata?.progress ?? 0; // Default to 0 if progress is undefined
            return { courseId, progress };
        } catch (error) {
            console.error(`Error fetching progress for course ${courseId}:`, error);
            toast({
                title: 'Error',
                description: 'Failed to load course progress. Please try again later.',
                variant: 'destructive',
            });
            return { courseId, progress: 0 };
        }
    };

    useEffect(() => {
        const loadProgress = async () => {
            setLoading(true);
            const progressPromises = enrollCourse.map((course) => fetchProgress(course._id));
            const results = await Promise.all(progressPromises);
            const progressMap = results.reduce(
                (acc, { courseId, progress }) => {
                    acc[courseId] = progress;
                    return acc;
                },
                {} as { [key: string]: number },
            );
            setProgressData(progressMap);
            setLoading(false);
        };

        if (enrollCourse.length > 0) {
            loadProgress();
        } else {
            setLoading(false);
        }
    }, [enrollCourse]);

    const renderCategories = (category: Course['category']) => {
        if (!category) return null;

        if (!Array.isArray(category)) {
            return (
                <Badge variant="outline" className="ml-2 text-gray-500">
                    {category.name}
                </Badge>
            );
        }

        return category.map((cat) => (
            <Badge key={cat._id} variant="outline" className="ml-2 text-gray-500">
                {cat.name}
            </Badge>
        ));
    };

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Course in Progress</h2>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Loading course progress...
                    </p>
                ) : enrollCourse.length > 0 ? (
                    enrollCourse.map((course) => {
                        const progress = progressData[course._id] ?? 0;
                        const statusText = progress === 0 ? 'Not Started' : `${progress}% Complete`;

                        return (
                            <Card key={course._id} className="shadow-sm border border-gray-200">
                                <CardContent className="p-4">
                                    <div className="flex items-center text-xs text-gray-500 mb-2">
                                        <span className="font-medium">{course.title}</span>
                                        {renderCategories(course.category)}
                                    </div>

                                    <div className="flex justify-between items-center my-3">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-xs">{progress}</span>
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-500">{statusText}</div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-1">
                                                <Badge className="bg-gray-200 text-gray-700 font-normal hover:bg-gray-300">
                                                    PRACTICE
                                                </Badge>
                                                <div className="text-xs text-gray-700 line-clamp-1">
                                                    {course.description}
                                                </div>
                                            </div>
                                        </div>
                                        <Link href={`/customer/courses/${course._id}`}>
                                            <Button className="bg-[#5AD3AF] hover:bg-emerald-600 text-white text-xs">
                                                {progress === 0
                                                    ? 'Start Course'
                                                    : 'Continue Course'}
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })
                ) : (
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        No courses enrolled yet.
                    </p>
                )}
            </div>
        </section>
    );
}
