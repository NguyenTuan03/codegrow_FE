'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { User, Trophy, Clock } from 'lucide-react';

const Dashboard = () => {
    return (
        <div className="container mx-auto px-4 md:px-10 py-10 space-y-12">
            {/* Sidebar & Main layout */}
            <div className="grid grid-cols-12 gap-6">
                {/* Sidebar Right */}
                <aside className="col-span-12 md:col-span-3 space-y-6">
                    {/* User Info */}
                    <Card className="shadow-sm">
                        <CardContent className="p-4 text-center">
                            <User className="mx-auto mb-2 w-10 h-10 text-blue-500" />
                            <p className="font-medium text-lg">Hey, To Duy Hoang!</p>
                            <p className="text-xs text-gray-500">Profile 30% complete</p>
                            <div className="mt-3 flex justify-between text-sm">
                                <span>Daily Streak</span>
                                <span>0 days</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Total XP</span>
                                <span>0 XP</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Leaderboard */}
                    <Card className="shadow-sm">
                        <CardContent className="p-4">
                            <div className="flex justify-between mb-2">
                                <p className="font-semibold text-gray-800">Leaderboard</p>
                                <span className="text-xs text-blue-500">7 days left</span>
                            </div>
                            <Progress value={0} max={250} className="mb-1" />
                            <p className="mt-1 text-xs text-gray-500">Gain 250 XP to enter</p>
                        </CardContent>
                    </Card>

                    {/* My Assignment */}
                    <Card className="shadow-sm">
                        <CardContent className="p-4">
                            <p className="font-semibold mb-2">My Assignment</p>
                            <ul className="space-y-1 text-sm">
                                <li className="flex justify-between">
                                    Target Audience{' '}
                                    <span className="text-green-600">Completed</span>
                                </li>
                                <li className="flex justify-between">
                                    User Persona Research{' '}
                                    <span className="text-orange-500">Pending</span>
                                </li>
                                <li className="flex justify-between">
                                    UX Problem Validation{' '}
                                    <span className="text-green-600">Completed</span>
                                </li>
                                <li className="flex justify-between">
                                    Wireframe Design <span className="text-red-500">Overdue</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </aside>

                {/* Main Area */}
                <main className="col-span-12 md:col-span-9 space-y-10">
                    {/* Course in Progress */}
                    <section>
                        <h2 className="text-lg font-semibold mb-4">Course in Progress</h2>
                        <div className="space-y-6">
                            {[1, 2].map((item) => (
                                <Card key={item} className="shadow-sm">
                                    <CardContent className="p-4 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium text-base">
                                                    Understanding Artificial Intelligence
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Introduction to TDD
                                                </p>
                                            </div>
                                            <Button variant="outline" className="text-sm">
                                                {item === 1
                                                    ? 'Keep Making Process'
                                                    : 'Go To Course'}
                                            </Button>
                                        </div>
                                        <div className="flex gap-4 text-xs text-gray-600">
                                            <span>🛠 PRACTICE: AI Concepts</span>
                                            <span>📽 APPLY: Netflix Project</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    <hr className="border-t border-gray-300" />

                    {/* Upcoming Assignments */}
                    <section>
                        <h2 className="text-lg font-semibold mb-4">Upcoming Assignment</h2>
                        <Card className="shadow-sm">
                            <CardContent className="p-4 space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <p>Kristin Watson - UI Research</p>
                                    <span className="text-gray-500">Apr 14, 10:00 AM</span>
                                </div>
                                <div className="flex justify-between">
                                    <p>Ronald Richards - UX Flow</p>
                                    <span className="text-gray-500">Apr 15, 2:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <p>Brooklyn Simmons - Design Feedback</p>
                                    <span className="text-gray-500">Apr 16, 4:30 PM</span>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    <hr className="border-t border-gray-300" />

                    {/* Continue Watching */}
                    <section>
                        <h2 className="text-lg font-semibold mb-4">Continue Watching</h2>
                        <div className="flex gap-4 overflow-x-auto pb-4">
                            {[1, 2, 3].map((item) => (
                                <Card key={item} className="min-w-[250px] shadow-sm">
                                    <CardContent className="p-4 space-y-2">
                                        <Badge
                                            variant="secondary"
                                            className="bg-blue-100 text-blue-600"
                                        >
                                            PRO
                                        </Badge>
                                        <p className="font-medium text-sm">
                                            Frontend Development Basics
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    <hr className="border-t border-gray-300" />

                    {/* Your Mentor */}
                    <section>
                        <h2 className="text-lg font-semibold mb-4">Your Mentor</h2>
                        <Card className="shadow-sm">
                            <CardContent className="p-4 space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <p>Alex Morgan</p>
                                    <span className="text-gray-500">Understanding React</span>
                                </div>
                                <div className="flex justify-between">
                                    <p>Nicolas Helmet</p>
                                    <span className="text-gray-500">Database Concepts</span>
                                </div>
                                <div className="flex justify-between">
                                    <p>Josh Freakson</p>
                                    <span className="text-gray-500">Core Dev Approaches</span>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    <hr className="border-t border-gray-300" />

                    {/* Certification Suggestion */}
                    <section>
                        <h2 className="text-lg font-semibold mb-4">Certifications</h2>
                        <Card className="shadow-sm">
                            <CardContent className="p-4 text-sm flex items-center justify-between">
                                <div>
                                    <p className="font-medium">You're missing out!</p>
                                    <p className="text-gray-500 text-xs">
                                        Improve your chance with certified DataComp
                                    </p>
                                </div>
                                <Button variant="outline" className="text-sm">
                                    See All
                                </Button>
                            </CardContent>
                        </Card>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
