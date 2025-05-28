'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LeaderboardCard() {
    return (
        <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Trophy className="w-6 h-6 text-[#657ED4] dark:text-[#5AD3AF]" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Leaderboard
                        </h3>
                    </div>
                    <span className="text-xs text-[#657ED4] dark:text-[#5AD3AF] font-medium">
                        7 DAYS LEFT TO JOIN
                    </span>
                </div>

                <div className="text-center mb-6">
                    <div className="flex items-center mb-2">
                        <div className="grid grid-cols-4 gap-1 w-full">
                            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-sm relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        1st
                                    </span>
                                </div>
                            </div>
                            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-sm relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        2nd
                                    </span>
                                </div>
                            </div>
                            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-sm relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        3rd
                                    </span>
                                </div>
                            </div>
                            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-sm relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        4th
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-sm mb-2 text-gray-600 dark:text-gray-400">
                        Gain 250XP to enter this weeks leaderboard
                    </div>
                    <Progress
                        value={0}
                        max={250}
                        className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full [&>div]:bg-[#657ED4] dark:[&>div]:bg-[#5AD3AF]"
                    />
                    <div className="flex justify-end text-xs text-gray-500 dark:text-gray-400 mt-1">
                        0 / 250 XP
                    </div>
                </div>

                <Button
                    variant="outline"
                    className="w-full border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-white rounded-full flex items-center justify-center gap-1 transition-all duration-200"
                >
                    Join Now
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </CardContent>
        </Card>
    );
}
