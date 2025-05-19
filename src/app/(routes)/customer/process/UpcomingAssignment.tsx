// @/app/(routes)/customer/process/UpcomingAssignment.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

export default function UpcomingAssignment() {
    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-[#5AD3AF]" />
                    Upcoming Assignment
                </h2>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="link"
                        className="text-[#657ED4] dark:text-[#5AD3AF] text-xs p-0 hover:underline"
                    >
                        View All
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-xl hover:border-[#5AD3AF]">
                    <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full mr-3"></div>
                            <div>
                                <div className="font-semibold text-gray-800 dark:text-gray-200">
                                    Kristin Watson
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    Research at UI Design
                                </div>
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                            WEDNESDAY, 10:00 AM
                        </div>
                        <Button className="text-xs bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white w-full rounded-full px-4 py-2 transition-all duration-200 shadow-sm">
                            15min
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-xl hover:border-[#5AD3AF]">
                    <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full mr-3"></div>
                            <div>
                                <div className="font-semibold text-gray-800 dark:text-gray-200">
                                    Ronald Richards
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    Exploring Content Strategist
                                </div>
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                            WEDNESDAY, 01:00 PM
                        </div>
                        <Button className="text-xs bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white w-full rounded-full px-4 py-2 transition-all duration-200 shadow-sm">
                            15min
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-xl hover:border-[#5AD3AF]">
                    <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full mr-3"></div>
                            <div>
                                <div className="font-semibold text-gray-800 dark:text-gray-200">
                                    Brooklyn Simmons
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    Visual Design System
                                </div>
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                            WEDNESDAY, 12:30 PM
                        </div>
                        <Button className="text-xs bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white w-full rounded-full px-4 py-2 transition-all duration-200 shadow-sm">
                            30min
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
