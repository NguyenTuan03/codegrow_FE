'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { Check, X } from 'lucide-react';

interface RoadmapCardProps {
    title: string;
    description: string;
    nodeId?: string;
    resources?: { type: string; title: string; url: string }[];
    progress?: number;
    onClose?: () => void;
}

export function RoadmapCard({
    title,
    description,

    resources = [],
    progress = 0,
    onClose,
}: RoadmapCardProps) {
    const [localProgress, setLocalProgress] = React.useState(progress);

    const handleProgressChange = (adjustment: number) => {
        setLocalProgress(Math.max(0, Math.min(100, localProgress + adjustment)));
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <div
                    role="button"
                    tabIndex={0}
                    className="cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') e.preventDefault();
                    }}
                    aria-label={`Open details for ${title}`}
                >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{description}</p>
                </div>
            </DrawerTrigger>
            <DrawerContent className="max-w-2xl mx-auto">
                <DrawerHeader>
                    <DrawerTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {title}
                    </DrawerTitle>
                    <DrawerDescription className="text-gray-600 dark:text-gray-400 mt-2">
                        {description}
                    </DrawerDescription>
                </DrawerHeader>
                <div className="p-6 space-y-6">
                    {/* Progress Section */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Progress
                        </h4>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {localProgress}%
                            </span>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 rounded-full"
                                    onClick={() => handleProgressChange(-10)}
                                    disabled={localProgress <= 0}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 rounded-full"
                                    onClick={() => handleProgressChange(10)}
                                    disabled={localProgress >= 100}
                                >
                                    <Check className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${localProgress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Resources Section */}
                    {resources.length > 0 && (
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Learning Resources
                            </h4>
                            <ul className="space-y-2">
                                {resources.map((resource, index) => (
                                    <li
                                        key={index}
                                        className="text-sm text-gray-600 dark:text-gray-400"
                                    >
                                        <a
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            {resource.type}: {resource.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <DrawerFooter>
                    <Button>Save Progress</Button>
                    <DrawerClose asChild>
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
