// @/components/LeaderboardCard.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronRight } from 'lucide-react';

export default function LeaderboardCard() {
    return (
        <Card className="shadow-sm border border-gray-200">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                        <h3 className="font-medium">Leaderboard</h3>
                        <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                    <span className="text-xs text-blue-500">7 DAYS LEFT TO JOIN</span>
                </div>

                <div className="text-center mb-6">
                    <div className="flex items-center mb-2">
                        <div className="grid grid-cols-4 gap-1 w-full">
                            <div className="h-4 w-full bg-gray-100 rounded-sm relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs text-gray-400">1st</span>
                                </div>
                            </div>
                            <div className="h-4 w-full bg-gray-100 rounded-sm relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs text-gray-400">2nd</span>
                                </div>
                            </div>
                            <div className="h-4 w-full bg-gray-100 rounded-sm relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs text-gray-400">3rd</span>
                                </div>
                            </div>
                            <div className="h-4 w-full bg-gray-100 rounded-sm relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs text-gray-400">4th</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-sm mb-2">Gain 250XP to enter this weeks leaderboard</div>
                    <Progress value={0} max={250} className="h-2" />
                    <div className="flex justify-end text-xs mt-1">0 / 250 XP</div>
                </div>
            </CardContent>
        </Card>
    );
}
