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
} from '@/components/ui/drawer';
import { Check, X } from 'lucide-react';

interface RoadmapCardProps {
    title: string;
    description: string;
    resources?: { type: string; title: string; url: string; discount?: string }[];
    progress?: number;
    onClose?: () => void;
    isOpen?: boolean;
}

export function RoadmapCard({
    title,
    description,
    resources = [],
    progress = 0,
    onClose,
    isOpen = false,
}: RoadmapCardProps) {
    const [localProgress, setLocalProgress] = React.useState(progress);

    const handleProgressChange = (adjustment: number) => {
        setLocalProgress(Math.max(0, Math.min(100, localProgress + adjustment)));
    };

    // Separate free and premium resources
    const freeResources = resources.filter((r) => !r.discount);
    const premiumResources = resources.filter((r) => r.discount);

    return (
        <Drawer open={isOpen} onOpenChange={(open) => !open && onClose?.()}>
            <DrawerContent className="max-w-2xl mx-auto bg-white shadow-lg">
                {/* Customize animation to slide from left to right */}
                <style jsx>{`
                    .drawer-content {
                        animation: slideFromLeft 0.3s ease-in-out;
                    }
                    @keyframes slideFromLeft {
                        from {
                            transform: translateX(-100%);
                        }
                        to {
                            transform: translateX(0);
                        }
                    }
                `}</style>
                <DrawerHeader>
                    <DrawerTitle className="text-2xl font-bold text-gray-900">{title}</DrawerTitle>
                    <DrawerDescription className="text-gray-600 mt-2">
                        {description}
                    </DrawerDescription>
                </DrawerHeader>
                <div className="p-6 space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="text-md font-medium text-gray-700 mb-2">Progress</h4>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">{localProgress}%</span>
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
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${localProgress}%` }}
                            ></div>
                        </div>
                    </div>

                    {(freeResources.length > 0 || premiumResources.length > 0) && (
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <h4 className="text-md font-medium text-gray-700 mb-2">
                                Learning Resources
                            </h4>
                            {freeResources.length > 0 && (
                                <div className="mb-4">
                                    <h5 className="text-sm font-semibold text-green-600 mb-2">
                                        Free Resources
                                    </h5>
                                    <ul className="space-y-2">
                                        {freeResources.map((resource, index) => (
                                            <li key={index} className="text-sm text-gray-600">
                                                <a
                                                    href={resource.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {resource.type}: {resource.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {premiumResources.length > 0 && (
                                <div className="mb-4">
                                    <h5 className="text-sm font-semibold text-purple-600 mb-2">
                                        Premium Resources
                                    </h5>
                                    <ul className="space-y-2">
                                        {premiumResources.map((resource, index) => (
                                            <li key={index} className="text-sm text-gray-600">
                                                <a
                                                    href={resource.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-yellow-600 hover:underline flex items-center gap-2"
                                                >
                                                    {resource.type}: {resource.title}
                                                    {resource.discount && (
                                                        <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                                                            {resource.discount}
                                                        </span>
                                                    )}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text-xs text-gray-500 mt-2 bg-gray-100 p-2 rounded">
                                        Note on Premium Resources: These are optional paid resources
                                        vetted by the roadmap team. If you purchase a resource, we
                                        may receive a small commission at no extra cost to you. This
                                        helps us offset the costs of running this site and keep it
                                        free for everyone.
                                    </p>
                                </div>
                            )}
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
