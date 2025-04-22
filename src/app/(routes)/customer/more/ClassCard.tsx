// @/components/CourseCard.tsx
'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Users } from 'lucide-react';
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
        <Card className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800 border border-[#EEF1EF] dark:border-[#657ED4]/30">
            <div
                className={`h-40 ${course.bgColor || 'bg-[#5AD3AF]'} relative overflow-hidden rounded-t-2xl flex items-center justify-center text-white`}
            >
                <div className="absolute inset-0 bg-opacity-50 bg-black flex items-center justify-center">
                    <h3 className="text-lg font-semibold px-4 text-center">{course.title}</h3>
                </div>
            </div>

            <CardContent className="p-5 space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {course.description}
                </p>

                <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-[#657ED4] dark:text-[#5AD3AF]" />
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
                            className="text-[#657ED4] dark:text-[#5AD3AF] border-[#657ED4] dark:border-[#5AD3AF] bg-[#EEF1EF] dark:bg-gray-700 hover:bg-[#5AD3AF] dark:hover:bg-[#657ED4] hover:text-white transition-colors duration-300 rounded-full px-2.5 py-0.5 text-xs"
                        >
                            {day}
                        </Badge>
                    ))}
                    <Badge
                        variant="outline"
                        className="text-[#657ED4] dark:text-[#5AD3AF] border-[#657ED4] dark:border-[#5AD3AF] bg-[#EEF1EF] dark:bg-gray-700 hover:bg-[#5AD3AF] dark:hover:bg-[#657ED4] hover:text-white transition-colors duration-300 rounded-full px-2.5 py-0.5 text-xs"
                    >
                        {course.schedule.time}
                    </Badge>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-400">
                    {format(new Date(course.schedule.startDate), 'MMM dd, yyyy')} -{' '}
                    {format(new Date(course.schedule.endDate), 'MMM dd, yyyy')}
                </div>
            </CardContent>

            <CardFooter className="flex justify-end p-5 pt-0">
                <Button
                    variant="outline"
                    size="sm"
                    className="bg-[#5AD3AF] hover:bg-[#4AC2A0] text-white border-none rounded-lg transition-all duration-300"
                    onClick={() => router.push(`/customer/classes`)}
                >
                    View Details
                </Button>
            </CardFooter>
        </Card>
    );
}
