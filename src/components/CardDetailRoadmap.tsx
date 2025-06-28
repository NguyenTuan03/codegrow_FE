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
    onClose,
    isOpen = false,
}: RoadmapCardProps) {
    console.log('RoadmapCard props:', { title, description, resources }); // Debug log

    // Separate free and premium resources
    const freeResources = resources.filter((r) => !r.discount);
    const premiumResources = resources.filter((r) => r.discount);

    return (
        <Drawer open={isOpen} onOpenChange={(open) => !open && onClose?.()}>
            <DrawerContent
                className="max-w-3xl mx-auto bg-white shadow-lg h-screen min-h-[100vh] flex flex-col"
                style={{ right: 0, left: 'auto' }}
            >
                {/* Customize animation to slide from right */}
                <style jsx>{`
                    .drawer-content {
                        animation: slideFromRight 0.3s ease-in-out;
                    }
                    @keyframes slideFromRight {
                        from {
                            transform: translateX(100%);
                        }
                        to {
                            transform: translateX(0);
                        }
                    }
                `}</style>
                <DrawerHeader className="p-6 border-b border-gray-200 flex-shrink-0">
                    <DrawerTitle className="text-2xl font-bold text-gray-900">{title}</DrawerTitle>
                    <DrawerDescription className="text-gray-600 mt-2">
                        {description}
                    </DrawerDescription>
                </DrawerHeader>
                <div className="p-6 flex-grow overflow-y-auto">
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
                <DrawerFooter className="p-6 border-t border-gray-200 flex-shrink-0">
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
