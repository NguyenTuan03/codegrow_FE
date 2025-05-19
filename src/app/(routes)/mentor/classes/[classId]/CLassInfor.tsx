'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, Clock, Users, BookOpen, PlayCircle } from 'lucide-react';

interface Schedule {
    startDate: string;
    endDate: string;
    time: string;
    daysOfWeek: string[];
}

interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    createdAt: string;
    author: string;
}

interface User {
    _id: string;
    email: string;
    role: string;
    fullName: string;
}

interface ClassItem {
    _id: string;
    title: string;
    course: Course;
    description: string;
    mentor: User;
    status: string;
    maxStudents: number;
    students: User[];
    schedule: Schedule;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface ClassInfoProps {
    classData: ClassItem;
}

export default function ClassInfo({ classData }: ClassInfoProps) {
    return (
        <div className="lg:col-span-2">
            <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-200">
                <CardHeader className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-[#5AD3AF]" />
                        Class Information
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-4 sm:p-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
                        {classData.description || 'No description available.'}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="flex items-start gap-2">
                            <BookOpen className="w-5 h-5 text-[#5AD3AF] mt-1" />
                            <div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                    Course
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {classData.course.title || 'N/A'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <Users className="w-5 h-5 text-[#5AD3AF] mt-1" />
                            <div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                    Mentor
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {classData.mentor.fullName || 'N/A'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <Users className="w-5 h-5 text-[#5AD3AF] mt-1" />
                            <div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                    Max Students
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {classData.maxStudents || 'N/A'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <Badge
                                className={`rounded-full px-2 py-0.5 text-xs ${
                                    classData.status === 'Active'
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                                }`}
                            >
                                {classData.status || 'N/A'}
                            </Badge>
                            <div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                    Status
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {classData.status || 'N/A'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <Calendar className="w-5 h-5 text-[#5AD3AF] mt-1" />
                            <div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                    Start Date
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {classData.schedule.startDate
                                        ? new Date(classData.schedule.startDate).toLocaleDateString(
                                              'en-US',
                                              {
                                                  year: 'numeric',
                                                  month: 'long',
                                                  day: 'numeric',
                                              },
                                          )
                                        : 'N/A'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <Calendar className="w-5 h-5 text-[#5AD3AF] mt-1" />
                            <div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                    End Date
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {classData.schedule.endDate
                                        ? new Date(classData.schedule.endDate).toLocaleDateString(
                                              'en-US',
                                              {
                                                  year: 'numeric',
                                                  month: 'long',
                                                  day: 'numeric',
                                              },
                                          )
                                        : 'N/A'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <Clock className="w-5 h-5 text-[#5AD3AF] mt-1" />
                            <div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                    Class Time
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {classData.schedule.time || 'N/A'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <Calendar className="w-5 h-5 text-[#5AD3AF] mt-1" />
                            <div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                    Class Days
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {classData.schedule.daysOfWeek?.join(', ') || 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Join Meeting Button */}
                    <div className="mt-6">
                        <Link href={`/mentor/meeting`}>
                            <Button className="w-full sm:w-auto rounded-full px-6 py-2 transition-all duration-200 shadow-sm flex items-center gap-2 bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white">
                                <PlayCircle className="w-5 h-5" />
                                Join Meeting
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
