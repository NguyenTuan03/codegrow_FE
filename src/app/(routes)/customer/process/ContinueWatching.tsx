'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';

export default function ContinueWatching() {
    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <PlayCircle className="w-6 h-6 text-[#657ED4] dark:text-[#5AD3AF]" />
                    Continue Watching
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
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-xl hover:border-[#657ED4] dark:hover:border-[#5AD3AF]">
                    <div className="h-40 bg-gradient-to-r from-[#657ED4]/20 to-[#5AD3AF]/20 dark:from-[#657ED4]/10 dark:to-[#5AD3AF]/10 relative">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-800 dark:text-gray-100">
                            <div className="text-center px-4">
                                <div className="text-xs uppercase mb-1 text-[#657ED4] dark:text-[#5AD3AF] font-semibold">
                                    FRONTEND
                                </div>
                                <div className="font-semibold text-sm line-clamp-2">
                                    Beginners Guide To Becoming A Professional Frontend Developer
                                </div>
                            </div>
                        </div>
                    </div>
                    <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full -ml-2"></div>
                                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full -ml-2"></div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                                    +24
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-gray-400 dark:text-gray-300 hover:text-[#657ED4] dark:hover:text-[#5AD3AF]"
                            >
                                <span className="text-xl">+</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-xl hover:border-[#657ED4] dark:hover:border-[#5AD3AF]">
                    <div className="h-40 bg-gradient-to-r from-[#657ED4]/20 to-[#5AD3AF]/20 dark:from-[#657ED4]/10 dark:to-[#5AD3AF]/10 relative">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-800 dark:text-gray-100">
                            <div className="text-center px-4">
                                <div className="text-xs uppercase mb-1 text-[#657ED4] dark:text-[#5AD3AF] font-semibold">
                                    BACKEND
                                </div>
                                <div className="font-semibold text-sm line-clamp-2">
                                    Beginners Guide To Becoming A Professional Backend Developer
                                </div>
                            </div>
                        </div>
                    </div>
                    <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full -ml-2"></div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                                    +15
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-gray-400 dark:text-gray-300 hover:text-[#657ED4] dark:hover:text-[#5AD3AF]"
                            >
                                <span className="text-xl">+</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-xl hover:border-[#657ED4] dark:hover:border-[#5AD3AF]">
                    <div className="h-40 bg-gradient-to-r from-[#657ED4]/20 to-[#5AD3AF]/20 dark:from-[#657ED4]/10 dark:to-[#5AD3AF]/10 relative">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-800 dark:text-gray-100">
                            <div className="text-center px-4">
                                <div className="text-xs uppercase mb-1 text-[#657ED4] dark:text-[#5AD3AF] font-semibold">
                                    FRONTEND
                                </div>
                                <div className="font-semibold text-sm line-clamp-2">
                                    How To Create Your Online Course Step 1
                                </div>
                            </div>
                        </div>
                    </div>
                    <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full -ml-2"></div>
                                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full -ml-2"></div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                                    +37
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-gray-400 dark:text-gray-300 hover:text-[#657ED4] dark:hover:text-[#5AD3AF]"
                            >
                                <span className="text-xl">+</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
