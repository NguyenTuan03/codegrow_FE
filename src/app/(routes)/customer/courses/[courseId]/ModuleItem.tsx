// @/components/ModuleItem.tsx
'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle2, PlayCircle, BookOpen, Video, Code } from 'lucide-react';

interface ModuleItemProps {
    moduleId: string;
    title: string;
    completed: boolean;
    type: 'video' | 'reading' | 'practice';
    onNavigate: (path: string) => void;
}

export default function ModuleItem({ title, completed, type, onNavigate }: ModuleItemProps) {
    const iconMap = {
        video: <Video className="w-5 h-5 text-[#657ED4]" />,
        reading: <BookOpen className="w-5 h-5 text-[#657ED4]" />,
        practice: <Code className="w-5 h-5 text-[#657ED4]" />,
    };

    const buttonTextMap = {
        video: 'Watch Video',
        reading: 'Start Reading',
        practice: 'Start Practice',
    };

    const pathMap = {
        video: '/customer/coursesdetailwatching',
        reading: '/customer/coursesdetailreading',
        practice: '/customer/coursesdetailpractice',
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
                        iconMap[type]
                    )}
                    <div className="font-medium text-gray-800 dark:text-gray-200">{title}</div>
                </div>
                <Button
                    onClick={() => onNavigate(pathMap[type])}
                    className="flex items-center gap-2 bg-[#657ED4] hover:bg-[#354065] text-white"
                >
                    {type === 'video' && <PlayCircle className="w-4 h-4" />}
                    {type === 'reading' && <BookOpen className="w-4 h-4" />}
                    {type === 'practice' && <Code className="w-4 h-4" />}
                    {buttonTextMap[type]}
                </Button>
            </div>
        </div>
    );
}
