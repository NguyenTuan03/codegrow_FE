'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Users, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface ClassItem {
    _id: string;
    title: string;
    description: string;
    students: string[];
    mentor: {
        _id: string;
        fullName: string;
        email: string;
        phone: string;
        image?: string;
    };
    schedule: {
        startDate: string;
        endDate: string;
        daysOfWeek: string[];
        time: string;
    };
    image?: string;
    bgColor?: string;
}

interface CourseCardProps {
    course: ClassItem;
}

export default function CourseCard({ course }: CourseCardProps) {
    const router = useRouter();

    return (
        <Card className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div
                className={`h-40 ${course.bgColor || 'bg-gradient-to-r from-[#5AD3AF] to-[#4ac2a0]'} relative overflow-hidden rounded-t-xl flex items-center justify-center text-white`}
            >
                {course.image ? (
                    <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover opacity-80"
                    />
                ) : (
                    <div className="absolute inset-0 bg-opacity-50 bg-black flex items-center justify-center">
                        <h3 className="text-lg font-semibold px-4 text-center line-clamp-2">
                            {course.title}
                        </h3>
                    </div>
                )}
            </div>

            <CardContent className="p-4 space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {course.description}
                </p>

                <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-[#5AD3AF]" />
                        <span className="text-gray-600 dark:text-gray-400">
                            {course.students.length} students
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-gray-600 dark:text-gray-400">
                            {course.mentor?.fullName || 'Unknown'} - Mentor
                        </span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                    {course.schedule.daysOfWeek.map((day) => (
                        <Badge
                            key={day}
                            variant="outline"
                            className="text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 hover:bg-[#5AD3AF] hover:text-white dark:hover:bg-[#5AD3AF] dark:hover:text-white transition-colors duration-300 rounded-full px-2.5 py-0.5 text-xs"
                        >
                            {day}
                        </Badge>
                    ))}
                    <Badge
                        variant="outline"
                        className="text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 hover:bg-[#5AD3AF] hover:text-white dark:hover:bg-[#5AD3AF] dark:hover:text-white transition-colors duration-300 rounded-full px-2.5 py-0.5 text-xs"
                    >
                        <Clock className="h-3 w-3 mr-1 inline" />
                        {course.schedule.time}
                    </Badge>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4 text-[#5AD3AF]" />
                    <span>
                        {format(new Date(course.schedule.startDate), 'MMM dd, yyyy')} -{' '}
                        {format(new Date(course.schedule.endDate), 'MMM dd, yyyy')}
                    </span>
                </div>
            </CardContent>

            <CardFooter className="flex justify-end p-4 pt-0">
                <Button
                    size="sm"
                    className="bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white rounded-lg px-4 py-2 transition-colors duration-300"
                    onClick={() => router.push(`/customer/classes`)}
                >
                    View Details
                </Button>
            </CardFooter>
        </Card>
    );
}
