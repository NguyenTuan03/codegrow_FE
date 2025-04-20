// @/components/LessonItem.tsx
'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle2, PlayCircle, BookOpen, Code } from 'lucide-react';

interface Lesson {
    _id: string;
    title: string;
    description: string;
    order: number;
    type: 'video' | 'reading' | 'practice';
    createdAt: string;
    updatedAt: string;
}

interface LessonItemProps {
    lesson: Lesson;
    completed: boolean;
    onNavigate: (path: string) => void;
}

export default function LessonItem({ lesson, completed, onNavigate }: LessonItemProps) {
    const iconMap = {
        video: <PlayCircle className="w-5 h-5 text-[#657ED4]" />,
        reading: <BookOpen className="w-5 h-5 text-[#657ED4]" />,
        practice: <Code className="w-5 h-5 text-[#657ED4]" />,
    };

    const buttonTextMap = {
        video: 'Watch Video',
        reading: 'Start Reading',
        practice: 'Start Practice',
    };

    const pathMap = {
        video: `/customer/courses/${lesson._id}/video`,
        reading: `/customer/courses/${lesson._id}/reading`,
        practice: `/customer/courses/${lesson._id}/practice`,
    };

    return (
        <div
            className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg ${
                completed ? 'border-l-4 border-green-500' : 'border-l-4 border-[#657ED4]'
            }`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                        iconMap[lesson.type]
                    )}
                    <div className="font-medium text-gray-800 dark:text-gray-200">
                        {lesson.title}
                    </div>
                </div>
                <Button
                    onClick={() => onNavigate(pathMap[lesson.type])}
                    className="flex items-center gap-2 bg-[#657ED4] hover:bg-[#354065] text-white"
                >
                    {iconMap[lesson.type]}
                    {buttonTextMap[lesson.type]}
                </Button>
            </div>
        </div>
    );
}
