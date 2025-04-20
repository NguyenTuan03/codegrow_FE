// @/components/UpcomingAssignment.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function UpcomingAssignment() {
    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Upcoming Assignment</h2>
                <Button variant="link" className="text-[#657ED4] dark:text-[#5AD3AF] text-xs p-0">
                    View All
                </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <Card className="shadow-sm border border-gray-200">
                    <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                            <div className="w-10 h-10 bg-gray-200 rounded-full mr-2"></div>
                            <div>
                                <div className="font-medium text-sm">Kristin Watson</div>
                                <div className="text-xs text-gray-500">Research at UI Design</div>
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 mb-2">WEDNESDAY, 10:00 AM</div>
                        <Button className="text-xs bg-[#657ED4] hover:bg-blue-600 text-white w-full">
                            15min
                        </Button>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border border-gray-200">
                    <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                            <div className="w-10 h-10 bg-gray-200 rounded-full mr-2"></div>
                            <div>
                                <div className="font-medium text-sm">Ronald Richards</div>
                                <div className="text-xs text-gray-500">
                                    Exploring Content Strategist
                                </div>
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 mb-2">WEDNESDAY, 01:00 PM</div>
                        <Button className="text-xs bg-[#657ED4] hover:bg-blue-600 text-white w-full">
                            15min
                        </Button>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border border-gray-200">
                    <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                            <div className="w-10 h-10 bg-gray-200 rounded-full mr-2"></div>
                            <div>
                                <div className="font-medium text-sm">Brooklyn Simmons</div>
                                <div className="text-xs text-gray-500">Visual Design System</div>
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 mb-2">WEDNESDAY, 12:30 PM</div>
                        <Button className="text-xs bg-[#657ED4] hover:bg-blue-600 text-white w-full">
                            30min
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
