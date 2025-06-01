'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Users, Clock } from 'lucide-react';
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
    imgUrl?: string;
    bgColor?: string;
}

interface CourseCardProps {
    course: ClassItem;
}

export default function CourseCard({ course }: CourseCardProps) {
    const router = useRouter();

    return (
        <Card className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-[440px] flex flex-col">
            <div
                className="h-40 relative overflow-hidden rounded-t-xl flex items-center justify-center text-white"
                style={{
                    backgroundImage: course.imgUrl
                        ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${course.imgUrl})`
                        : course.bgColor
                          ? course.bgColor
                          : 'linear-gradient(to right, #5AD3AF, #4ac2a0)',
                    backgroundColor: course.imgUrl ? 'transparent' : '#5AD3AF',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <h3 className="text-xl font-semibold px-4 text-center line-clamp-2">
                    {course.title}
                </h3>
            </div>

            <CardContent className="p-4 space-y-4 flex-grow flex flex-col">
                <p className="text-base text-gray-600 dark:text-gray-400 line-clamp-2 min-h-[40px] text-left font-medium">
                    {course.description}
                </p>

                <div className="flex items-center justify-between text-base">
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-[#657ED4] dark:text-[#5AD3AF]" />
                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                            {course.students.length} students
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                            {course.mentor?.fullName || 'Unknown'} - Mentor
                        </span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 min-h-[40px] items-center">
                    {course.schedule.daysOfWeek.map((day) => (
                        <Badge
                            key={day}
                            variant="outline"
                            className="text-[#657ED4] dark:text-[#5AD3AF] border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-black transition-colors duration-300 rounded-full px-3 py-1 text-xs font-medium"
                        >
                            {day}
                        </Badge>
                    ))}
                    <Badge
                        variant="outline"
                        className="text-[#657ED4] dark:text-[#5AD3AF] border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-black transition-colors duration-300 rounded-full px-3 py-1 text-xs font-medium"
                    >
                        <Clock className="h-3 w-3 mr-1 inline" />
                        {course.schedule.time}
                    </Badge>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Button
                    size="sm"
                    className="w-full bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] text-white rounded-lg px-4 py-2 transition-colors duration-300 font-medium shadow-md cursor-pointer"
                    onClick={() => router.push(`/customer/classes`)}
                >
                    View Details
                </Button>
            </CardFooter>
        </Card>
    );
}
