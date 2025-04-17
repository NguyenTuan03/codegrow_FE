'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { User, ChevronRight, ChevronLeft } from 'lucide-react';

const Process = () => {
    return (
        <div className="container mx-auto bg-gradient-to-r from-blue-50 px-4 py-8">
            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Content Area */}
                <div className="md:col-span-2 space-y-8">
                    {/* Course in Progress */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Course in Progress</h2>
                        </div>

                        <div className="space-y-4">
                            {/* First Course Card */}
                            <Card className="shadow-sm border border-gray-200">
                                <CardContent className="p-4">
                                    <div className="flex items-center text-xs text-gray-500 mb-2">
                                        <span>
                                            Introduction to Test and Behavior-Driven Development
                                        </span>
                                        <Badge variant="outline" className="ml-2 text-gray-500">
                                            IBM
                                        </Badge>
                                    </div>

                                    <div className="flex justify-between items-center my-3">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-xs">✓</span>
                                            </div>
                                            <Progress value={25} max={100} className="w-28 h-2" />
                                        </div>
                                        <div className="text-xs text-gray-500">Started</div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-1">
                                                <Badge className="bg-gray-200 text-gray-700 font-normal hover:bg-gray-300">
                                                    PRACTICE
                                                </Badge>
                                                <div className="text-xs text-gray-700">
                                                    Understanding Artificial Intelligence
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-1">
                                                <Badge className="bg-gray-200 text-gray-700 font-normal hover:bg-gray-300">
                                                    APPLY
                                                </Badge>
                                                <div className="text-xs text-gray-700">
                                                    Investigating Netflix Movies
                                                </div>
                                            </div>
                                        </div>

                                        <Button className="bg-[#5ad3af] hover:bg-emerald-600 text-white text-xs">
                                            Keep Making Process
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Second Course Card */}
                            <Card className="shadow-sm border border-gray-200">
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-gray-500">
                                            You are enrolled in the AI Fundamentals track
                                        </span>
                                        <span className="text-xs text-gray-500">In Progress</span>
                                    </div>
                                    <div className="font-medium">
                                        Understanding Artificial Intelligence
                                    </div>

                                    <div className="flex justify-between items-center my-3">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-xs">✓</span>
                                            </div>
                                            <Progress value={25} max={100} className="w-28 h-2" />
                                        </div>
                                        <div className="text-xs text-gray-500">Started</div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-1">
                                                <Badge className="bg-gray-200 text-gray-700 font-normal hover:bg-gray-300">
                                                    PRACTICE
                                                </Badge>
                                                <div className="text-xs text-gray-700">
                                                    Understanding Artificial Intelligence
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-1">
                                                <Badge className="bg-gray-200 text-gray-700 font-normal hover:bg-gray-300">
                                                    APPLY
                                                </Badge>
                                                <div className="text-xs text-gray-700">
                                                    Investigating Netflix Movies
                                                </div>
                                            </div>
                                        </div>

                                        <Button className="bg-[#657ed4] hover:bg-blue-600 text-white text-xs">
                                            Go To Course
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    {/* Upcoming Assignment */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Upcoming Assignment</h2>
                            <Button variant="link" className="text-[#657ed4] text-xs p-0">
                                View All
                            </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {/* Assignment 1 */}
                            <Card className="shadow-sm border border-gray-200">
                                <CardContent className="p-4">
                                    <div className="flex items-center mb-2">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full mr-2"></div>
                                        <div>
                                            <div className="font-medium text-sm">
                                                Kristin Watson
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                Research at UI Design
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500 mb-2">
                                        WEDNESDAY, 10:00 AM
                                    </div>
                                    <Button className="text-xs bg-[#657ed4] hover:bg-blue-600 text-white w-full">
                                        15min
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Assignment 2 */}
                            <Card className="shadow-sm border border-gray-200">
                                <CardContent className="p-4">
                                    <div className="flex items-center mb-2">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full mr-2"></div>
                                        <div>
                                            <div className="font-medium text-sm">
                                                Ronald Richards
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                Exploring Content Strategist
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500 mb-2">
                                        WEDNESDAY, 01:00 PM
                                    </div>
                                    <Button className="text-xs bg-[#657ed4] hover:bg-blue-600 text-white w-full">
                                        15min
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Assignment 3 */}
                            <Card className="shadow-sm border border-gray-200">
                                <CardContent className="p-4">
                                    <div className="flex items-center mb-2">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full mr-2"></div>
                                        <div>
                                            <div className="font-medium text-sm">
                                                Brooklyn Simmons
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                Visual Design System
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500 mb-2">
                                        WEDNESDAY, 12:30 PM
                                    </div>
                                    <Button className="text-xs bg-[#657ed4] hover:bg-blue-600 text-white w-full">
                                        30min
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    {/* Continue Watching */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Continue Watching</h2>
                            <div className="flex space-x-2">
                                <Button variant="outline" size="sm" className="p-1 h-8 w-8">
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="p-1 h-8 w-8">
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {/* Course 1 */}
                            <Card className="shadow-sm border border-gray-200">
                                <div className="h-40 bg-blue-500 relative">
                                    <div className="absolute inset-0 flex items-center justify-center text-white">
                                        <div className="text-center">
                                            <div className="text-xs uppercase mb-1">FRONTEND</div>
                                            <div className="font-medium">
                                                Beginners Guide To Becoming A Professional Frontend
                                                Developer
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <CardContent className="p-3">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-1">
                                            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                                            <div className="w-6 h-6 bg-gray-200 rounded-full -ml-2"></div>
                                            <div className="w-6 h-6 bg-gray-200 rounded-full -ml-2"></div>
                                            <div className="text-xs text-gray-500 ml-1">+24</div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <span className="sr-only">Save</span>
                                            <span className="text-gray-400">+</span>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Course 2 */}
                            <Card className="shadow-sm border border-gray-200">
                                <div className="h-40 bg-purple-500 relative">
                                    <div className="absolute inset-0 flex items-center justify-center text-white">
                                        <div className="text-center">
                                            <div className="text-xs uppercase mb-1">BACKEND</div>
                                            <div className="font-medium">
                                                Beginners Guide To Becoming A Professional Backend
                                                Developer
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <CardContent className="p-3">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-1">
                                            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                                            <div className="w-6 h-6 bg-gray-200 rounded-full -ml-2"></div>
                                            <div className="text-xs text-gray-500 ml-1">+15</div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <span className="sr-only">Save</span>
                                            <span className="text-gray-400">+</span>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Course 3 */}
                            <Card className="shadow-sm border border-gray-200">
                                <div className="h-40 bg-yellow-500 relative">
                                    <div className="absolute inset-0 flex items-center justify-center text-white">
                                        <div className="text-center">
                                            <div className="text-xs uppercase mb-1">FRONTEND</div>
                                            <div className="font-medium">
                                                How To Create Your Online Course Step 1
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <CardContent className="p-3">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-1">
                                            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                                            <div className="w-6 h-6 bg-gray-200 rounded-full -ml-2"></div>
                                            <div className="w-6 h-6 bg-gray-200 rounded-full -ml-2"></div>
                                            <div className="text-xs text-gray-500 ml-1">+37</div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <span className="sr-only">Save</span>
                                            <span className="text-gray-400">+</span>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    {/* Your Mentor */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Your Mentor</h2>
                            <Button variant="link" className="text-blue-500 text-xs p-0">
                                See All
                            </Button>
                        </div>

                        <Card className="shadow-sm border border-gray-200">
                            <CardContent className="p-4">
                                <div className="space-y-4">
                                    {/* Mentor 1 */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                                            <div>
                                                <div className="text-sm font-medium">
                                                    Alex Morgan
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    FRONTEND
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-sm">
                                            Understanding Concept Of React
                                        </div>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-1">
                                            <span className="sr-only">Contact</span>
                                            <span className="text-blue-500">✓</span>
                                        </Button>
                                    </div>

                                    {/* Mentor 2 */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                                            <div>
                                                <div className="text-sm font-medium">
                                                    Nicolas Helmet
                                                </div>
                                                <div className="text-xs text-gray-500">BACKEND</div>
                                            </div>
                                        </div>
                                        <div className="text-sm">Concept Of The Data Base</div>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-1">
                                            <span className="sr-only">Contact</span>
                                            <span className="text-blue-500">✓</span>
                                        </Button>
                                    </div>

                                    {/* Mentor 3 */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                                            <div>
                                                <div className="text-sm font-medium">
                                                    Josh Freakson
                                                </div>
                                                <div className="text-xs text-gray-500">BACKEND</div>
                                            </div>
                                        </div>
                                        <div className="text-sm">Core Development Approaches</div>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-1">
                                            <span className="sr-only">Contact</span>
                                            <span className="text-blue-500">✓</span>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Certification */}
                    <section>
                        <div className="flex items-center mb-4">
                            <h2 className="text-lg font-semibold">Certification</h2>
                            <ChevronRight className="h-5 w-5 ml-1" />
                        </div>

                        <Card className="shadow-sm border border-gray-200">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded-md">
                                            <div className="w-10 h-10 bg-blue-500 rounded-md flex items-center justify-center text-white">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-medium">You are missing out!</div>
                                            <div className="text-sm text-gray-500">
                                                Improve your chances of getting hired with an
                                                industry-recognized DataComp Certification.
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="text-sm">
                                        See All
                                        <ChevronRight className="h-4 w-4 ml-1" />
                                    </Button>
                                </div>

                                <div className="flex gap-4 mt-4">
                                    <Badge
                                        variant="outline"
                                        className="py-1 px-3 text-xs flex items-center"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                        AI Engineer for Data Science
                                    </Badge>

                                    <Badge
                                        variant="outline"
                                        className="py-1 px-3 text-xs flex items-center"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                        SQL Associate
                                    </Badge>

                                    <Badge
                                        variant="outline"
                                        className="py-1 px-3 text-xs flex items-center"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                        Data Analyst Associate
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* User Profile Card */}
                    <Card className="shadow-sm border border-gray-200">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-center mb-2">
                                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
                                    <User className="h-8 w-8" />
                                </div>
                            </div>
                            <div className="text-center mb-4">
                                <h3 className="font-medium text-lg">Hey, To Duy Hoang!</h3>
                                <p className="text-sm text-gray-500">Profile 30% complete</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Daily Streak</span>
                                    <span className="font-medium">0 days</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Total XP</span>
                                    <span className="font-medium">0 XP</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Leaderboard Card */}
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

                                <div className="text-sm mb-2">
                                    Gain 250XP to enter this weeks leaderboard
                                </div>
                                <Progress value={0} max={250} className="h-2" />
                                <div className="flex justify-end text-xs mt-1">0 / 250 XP</div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* My Assignment Card */}
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
                </div>
            </div>
        </div>
    );
};

export default Process;
