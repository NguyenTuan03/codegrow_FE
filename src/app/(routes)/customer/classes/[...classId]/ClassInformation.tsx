'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
    category: { _id: string; name: string };
    createdAt: string;
    author: {
        _id: string;
        fullName: string;
        role: string;
        email: string;
    };
    isDeleted?: boolean;
    enrolledCount?: number;
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
    linkMeet?: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
interface ClassInfoProps {
    classData: ClassItem;
}

export default function ClassInfo({ classData }: ClassInfoProps) {
    const handleJoinMeeting = () => {
        if (classData.linkMeet) {
            window.open(classData.linkMeet, '_blank', 'noopener,noreferrer');
        }
    };
    return (
        <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="p-6 border-b border-gray-200 dark:border-gray-700">
                <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-[#5AD3AF]" />
                    Class Information
                </CardTitle>
            </CardHeader>

            <CardContent className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-base">
                    {classData.description || 'No description available.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                        <BookOpen className="w-5 h-5 text-[#5AD3AF] mt-1" />
                        <div>
                            <h3 className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                                Course
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-base">
                                {classData.course.title || 'N/A'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-[#5AD3AF] mt-1" />
                        <div>
                            <h3 className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                                Mentor
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-base">
                                {classData.mentor.fullName || 'N/A'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-[#5AD3AF] mt-1" />
                        <div>
                            <h3 className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                                Max Students
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-base">
                                {classData.maxStudents || 'N/A'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div>
                            <h3 className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                                Status
                            </h3>
                            <Badge
                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                    classData.status === 'Active'
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                                }`}
                            >
                                {classData.status || 'N/A'}
                            </Badge>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-[#5AD3AF] mt-1" />
                        <div>
                            <h3 className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                                Start Date
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-base">
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

                    <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-[#5AD3AF] mt-1" />
                        <div>
                            <h3 className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                                End Date
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-base">
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

                    <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-[#5AD3AF] mt-1" />
                        <div>
                            <h3 className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                                Class Time
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-base">
                                {classData.schedule.time || 'N/A'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-[#5AD3AF] mt-1" />
                        <div>
                            <h3 className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                                Class Days
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-base">
                                {classData.schedule.daysOfWeek?.join(', ') || 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <Button
                        className="w-full sm:w-auto rounded-lg px-6 py-3 bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white font-medium flex items-center gap-2 transition-all duration-200 shadow-sm"
                        onClick={handleJoinMeeting}
                        aria-label={
                            classData.linkMeet ? 'Join meeting' : 'No meeting link available'
                        }
                    >
                        <PlayCircle className="w-5 h-5" />
                        Join Meeting
                    </Button>
                </div>
                {/* <div className="mt-8">
                    <Link href={`/mentor/meeting`}>
                        <Button className="w-full sm:w-auto rounded-lg px-6 py-3 bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white font-medium flex items-center gap-2 transition-all duration-200 shadow-sm">
                            <PlayCircle className="w-5 h-5" />
                            Join Meeting
                        </Button>
                    </Link>
                </div> */}
            </CardContent>
        </Card>
    );
}
