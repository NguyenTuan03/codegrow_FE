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
import { AssignMentor } from '@/lib/services/class/assignmentor';

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
        mentor?: {
            _id: string;
            fullName: string;
            email: string;
        } | null; // Mentor có thể là null nếu chưa được gán
    }

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

    const handleAssignMentor = async (classId: string) => {
        try {
            const token = localStorage.getItem('token');
            console.log('token:', token); // Ensure token is retrieved
            const user = localStorage.getItem('user'); // Lấy chuỗi JSON từ localStorage
            if (!token || !user) {
                throw new Error('Authentication token or user ID is missing');
            }

            const parsedUser = JSON.parse(user); // Phân tích chuỗi JSON thành đối tượng
            const userId = parsedUser.id; // Truy xuất `id` từ đối tượng
            console.log('User ID:', userId);

            const response = await AssignMentor(token, classId, userId);
            console.log('Response:', response);

            // Hiển thị thông báo thành công
            toast({
                title: 'Success',
                description: 'Mentor assigned successfully',
                variant: 'default',
            });

            // Chuyển hướng đến trang chi tiết lớp học
            router.push(`/mentor/classes/${classId}`);
        } catch (error) {
            console.error('Error assigning mentor:', error);

            // Hiển thị thông báo lỗi
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to assign mentor',
                variant: 'destructive',
            });
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    return (
        <div className="container mx-auto py-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Class Management
                </h1>
            </div>

            {loading ? (
                <div className="text-center text-gray-600 dark:text-gray-400">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classesItems.map((course) => (
                        <Card
                            key={course._id}
                            className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
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
                                {course.mentor ? (
                                    // Nếu đã có mentor, hiển thị nút "View detail"
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                        onClick={() => router.push(`/mentor/classes/${course._id}`)}
                                    >
                                        View detail
                                    </Button>
                                ) : (
                                    // Nếu chưa có mentor, hiển thị nút "Assign mentor"
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                        onClick={() => handleAssignMentor(course._id)}
                                    >
                                        Assign mentor
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
