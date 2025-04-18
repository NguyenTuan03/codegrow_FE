'use client';
import { useEffect, useState } from 'react';
import { GetClass } from '@/lib/services/class/getclass';
import { format } from 'date-fns';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';

import { Badge } from '@/components/ui/badge';

export default function Classes() {
    interface ClassItem {
        _id: string;
        title: string;
        description: string;
        students: string[];
        schedule: {
            startDate: string;
            endDate: string;
            daysOfWeek: string[];
            time: string;
        };
        image?: string;
        bgColor?: string;
    }
    // const [selectClass, setSelectedAccount] = useState<ClassItem | null>(null);
    const [classesItems, setClassesItems] = useState<ClassItem[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchClasses = async () => {
        try {
            const data = await GetClass();
            setClassesItems(data.metadata.classes);
        } catch (error) {
            console.error('Failed to fetch classes:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch classes',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    return (
        <div className="container mx-auto py-8 bg-white dark:bg-gray-900">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Class Management
                </h1>
                <Button
                    onClick={() => router.push('/admin/classes/create')}
                    className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                    Create New Class
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : classesItems.length === 0 ? (
                <Card className="bg-gray-50 dark:bg-gray-800">
                    <CardHeader>
                        <CardTitle className="text-gray-900 dark:text-gray-100">
                            No classes found
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                            Create your first class to get started
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            onClick={() => router.push('/admin/classes/create')}
                            className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            Create Class
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classesItems.map((course) => (
                        <Card
                            key={course._id}
                            className="hover:shadow-lg transition-shadow bg-gray-50 dark:bg-gray-800"
                        >
                            {/* Header with image */}
                            <div
                                className={`h-40 ${course.bgColor || 'bg-blue-500'} relative overflow-hidden`}
                            ></div>

                            {/* Card Content */}
                            <CardHeader>
                                <CardTitle className="text-xl text-gray-900 dark:text-gray-100">
                                    {course.title}
                                </CardTitle>
                                <CardDescription className="line-clamp-2 text-gray-600 dark:text-gray-400">
                                    {course.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {course.students.length} students
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-1">
                                    {course.schedule.daysOfWeek.map((day) => (
                                        <Badge
                                            key={day}
                                            variant="outline"
                                            className="text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600"
                                        >
                                            {day}
                                        </Badge>
                                    ))}
                                    <Badge
                                        variant="outline"
                                        className="text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600"
                                    >
                                        {course.schedule.time}
                                    </Badge>
                                </div>

                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {format(new Date(course.schedule.startDate), 'MMM dd, yyyy')} -{' '}
                                    {format(new Date(course.schedule.endDate), 'MMM dd, yyyy')}
                                </div>
                            </CardContent>

                            <CardFooter className="flex justify-between">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                    onClick={() => router.push(`/admin/classes/${course._id}`)}
                                >
                                    View Details
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
