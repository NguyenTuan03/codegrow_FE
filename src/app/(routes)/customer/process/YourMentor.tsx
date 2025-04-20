// @/components/YourMentor.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function YourMentor() {
    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Your Mentor</h2>
                <Button variant="link" className="text-[#657ED4] dark:text-[#5AD3AF] text-xs p-0">
                    See All
                </Button>
            </div>

            <Card className="shadow-sm border border-gray-200">
                <CardContent className="p-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                                <div>
                                    <div className="text-sm font-medium">Alex Morgan</div>
                                    <div className="text-xs text-gray-500">FRONTEND</div>
                                </div>
                            </div>
                            <div className="text-sm">Understanding Concept Of React</div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-1">
                                <span className="sr-only">Contact</span>
                                <span className="text-[#657ED4] dark:text-[#5AD3AF]">✓</span>
                            </Button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                                <div>
                                    <div className="text-sm font-medium">Nicolas Helmet</div>
                                    <div className="text-xs text-gray-500">BACKEND</div>
                                </div>
                            </div>
                            <div className="text-sm">Concept Of The Data Base</div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-1">
                                <span className="sr-only">Contact</span>
                                <span className="text-[#657ED4] dark:text-[#5AD3AF]">✓</span>
                            </Button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                                <div>
                                    <div className="text-sm font-medium">Josh Freakson</div>
                                    <div className="text-xs text-gray-500">BACKEND</div>
                                </div>
                            </div>
                            <div className="text-sm">Core Development Approaches</div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-1">
                                <span className="sr-only">Contact</span>
                                <span className="text-[#657ED4] dark:text-[#5AD3AF]">✓</span>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
