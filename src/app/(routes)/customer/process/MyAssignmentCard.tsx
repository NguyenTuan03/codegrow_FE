// @/components/MyAssignmentCard.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';

export default function MyAssignmentCard() {
    return (
        <Card className="shadow-sm border border-gray-200">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <h3 className="font-medium">My Assignment</h3>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm border-b pb-3">
                        <div className="flex items-center">
                            <div className="w-6 h-6 bg-red-100 text-red-500 rounded-full flex items-center justify-center mr-2 text-xs">
                                1
                            </div>
                            <span>Targeting Audience</span>
                        </div>
                        <span className="text-green-500">Completed</span>
                    </div>

                    <div className="flex items-center justify-between text-sm border-b pb-3">
                        <div className="flex items-center">
                            <div className="w-6 h-6 bg-red-100 text-red-500 rounded-full flex items-center justify-center mr-2 text-xs">
                                2
                            </div>
                            <span>User Persona Research</span>
                        </div>
                        <span className="text-amber-500">Pending</span>
                    </div>

                    <div className="flex items-center justify-between text-sm border-b pb-3">
                        <div className="flex items-center">
                            <div className="w-6 h-6 bg-red-100 text-red-500 rounded-full flex items-center justify-center mr-2 text-xs">
                                3
                            </div>
                            <span>User Research & Strategies</span>
                        </div>
                        <span className="text-green-500">Completed</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <div className="w-6 h-6 bg-red-100 text-red-500 rounded-full flex items-center justify-center mr-2 text-xs">
                                4
                            </div>
                            <span>Web User Interface Design</span>
                        </div>
                        <span className="text-red-500">Overdue</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
