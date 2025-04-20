// @/components/LessonList.tsx
'use client';

import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import LessonItem from '@/app/(routes)/customer/courses/[courseId]/LessionItem';

interface Lesson {
    _id: string;
    title: string;
    description: string;
    order: number;
    type: 'video' | 'reading' | 'practice';
    createdAt: string;
    updatedAt: string;
}

interface LessonListProps {
    courseId: string;
    progressPercentage: number;
    completedModules: { [key: string]: boolean };
    onNavigate: (path: string) => void;
}

export default function LessonList({
    courseId,
    progressPercentage,
    completedModules,
    onNavigate,
}: LessonListProps) {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);

    // Mock data for testing (replace with actual API call)
    const mockLessons: Lesson[] = [
        {
            _id: '1',
            title: 'Introduction to React',
            description: 'Learn the basics of React.',
            order: 1,
            type: 'video',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            _id: '2',
            title: 'Advanced JavaScript',
            description: 'Deep dive into JavaScript concepts.',
            order: 2,
            type: 'reading',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            _id: '3',
            title: 'Hands-on React Practice',
            description: 'Build a project with React.',
            order: 3,
            type: 'practice',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ];

    // Fetch lessons
    const loadLessons = async () => {
        try {
            setLoading(true);
            // const data = await fetchLessons(courseId);
            // setLessons(data);
            setLessons(mockLessons); // Use mock data for now
        } catch (error) {
            console.error('Failed to fetch lessons:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to load lessons',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLessons();
    }, [courseId]);

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    Course Lessons
                </h3>
                <div className="flex items-center gap-4 mt-2">
                    <Progress value={progressPercentage} className="h-2 w-64" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {Math.round(progressPercentage)}% Complete
                    </span>
                </div>
            </div>
            <Separator className="bg-gray-200 dark:bg-gray-700" />

            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <Loader2 className="h-8 w-8 animate-spin text-[#5AD3AF]" />
                </div>
            ) : lessons.length === 0 ? (
                <div className="text-center text-gray-600 dark:text-gray-400 p-4">
                    No lessons found for this course.
                </div>
            ) : (
                <div className="space-y-4">
                    {lessons.map((lesson) => (
                        <LessonItem
                            key={lesson._id}
                            lesson={lesson}
                            completed={completedModules[lesson._id] || false}
                            onNavigate={onNavigate}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
