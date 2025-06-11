'use client';

import { useParams, useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { viewDetailCourses } from '@/lib/services/course/viewdetailcourses';
import { toast } from '@/components/ui/use-toast';
import Breadcrumbs from '@/app/(routes)/customer/courses/[courseId]/Breadcrumbs';
import CourseHeader from '@/app/(routes)/customer/courses/[courseId]/CourseHeader';
import OverviewTab from '@/app/(routes)/customer/courses/[courseId]/OverviewTab';
import GradesTab from '@/app/(routes)/customer/courses/[courseId]/GradesTab';
import NotesTab from '@/app/(routes)/customer/courses/[courseId]/NotesTab';
import MessagesTab from '@/app/(routes)/customer/courses/[courseId]/MessagesTab';
import { GetProgress } from '@/lib/services/api/progress';

interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    enrolledCount: number;
    author: string;
    category: { _id: string; name: string };
    createdAt: string;
    imgUrl?: string;
}

export default function CourseLearningPage() {
    const router = useRouter();
    const { courseId } = useParams<{ courseId: string }>();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [completedLessons, setCompletedLessons] = useState<{ [key: string]: boolean }>({});
    const [completedQuizzes, setCompletedQuizzes] = useState<{ [key: string]: boolean }>({});
    const [lastLesson, setLastLesson] = useState<string | null>(null);

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    const fetchCourseData = async () => {
        try {
            setLoading(true);
            const courseRes = await viewDetailCourses(courseId);

            if (courseRes.status === 200) {
                const parsedCourse = {
                    ...courseRes.metadata,
                    category:
                        typeof courseRes.metadata.category === 'string'
                            ? JSON.parse(courseRes.metadata.category)
                            : courseRes.metadata.category,
                    imgUrl: courseRes.metadata.imgUrl || courseRes.metadata.image || undefined,
                };

                setCourse(parsedCourse);
                toast({
                    title: 'Thành công',
                    description: 'Tải dữ liệu khóa học thành công',
                    variant: 'default',
                    className:
                        'bg-[#5AD3AF] dark:bg-[#5AD3AF] text-white dark:text-black font-semibold',
                });
            } else {
                throw new Error('Không thể tải dữ liệu khóa học');
            }
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu khóa học:', error);
            toast({
                title: 'Lỗi',
                description:
                    error instanceof Error ? error.message : 'Không thể tải dữ liệu khóa học',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleProcess = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast({
                title: 'Lỗi',
                description: 'Token không tồn tại. Vui lòng đăng nhập lại.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
            router.push('/login');
            return;
        }
        const tokenuser = JSON.parse(token);

        console.log('token', tokenuser);
        const userId = localStorage.getItem('user');
        if (!userId) {
            throw new Error('User ID not found in localStorage');
        }
        const user = JSON.parse(userId);
        const id = user.id;
        try {
            const progress = await GetProgress(tokenuser, courseId, id || ''); // Keep original call
            console.log('Progress:', progress);

            if (progress?.status === 200 && progress.metadata) {
                setProgress(progress.metadata.progress || 0); // Set progress (0-100)
                setCompletedLessons(
                    progress.metadata.completedLessons.reduce(
                        (acc: { [key: string]: boolean }, lessonId: string) => ({
                            ...acc,
                            [lessonId]: true,
                        }),
                        {},
                    ),
                ); // Map completedLessons
                setCompletedQuizzes(
                    progress.metadata.completedQuizzes.reduce(
                        (acc: { [key: string]: boolean }, quizId: string) => ({
                            ...acc,
                            [quizId]: true,
                        }),
                        {},
                    ),
                ); // Map completedQuizzes
                setLastLesson(progress.metadata.lastLesson); // Set lastLesson
            } else {
                setProgress(0);
                setCompletedLessons({});
                setCompletedQuizzes({});
                setLastLesson(null);
            }
        } catch (error) {
            console.error('Không thể tải tiến độ:', error);
            toast({
                title: 'Lỗi',
                description: 'Không thể tải dữ liệu tiến độ.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        }
    };

    useEffect(() => {
        fetchCourseData();
        handleProcess();
    }, [courseId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#657ED4] dark:border-[#5AD3AF]"></div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <p className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
                    Không tìm thấy khóa học. Vui lòng thử lại.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 sm:px-6 md:px-12 lg:px-24 py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Breadcrumbs */}
                <Breadcrumbs
                    courseId={courseId}
                    category={course?.category?.name || 'Danh mục'}
                    title={course?.title || 'Khóa học'}
                />

                {/* Course Header */}
                <CourseHeader course={course} />

                {/* Tabs Navigation */}
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="flex cursor-pointer flex-wrap justify-start gap-4 mb-6 bg-transparent border-gray-200 dark:border-gray-700 p-5">
                        {['Tổng quan', 'Điểm số', 'Ghi chú', 'Thảo luận'].map((tab, i) => (
                            <TabsTrigger
                                key={i}
                                value={['overview', 'grades', 'notes', 'messages'][i]}
                                className="py-4 cursor-pointer px-4 text-base font-semibold text-gray-700 dark:text-gray-300 transition-all duration-200 border-b-2 border-transparent data-[state=active]:border-[#657ED4] dark:data-[state=active]:border-[#5AD3AF] data-[state=active]:text-[#657ED4] dark:data-[state=active]:text-[#5AD3AF] hover:text-[#657ED4] dark:hover:text-[#5AD3AF]"
                            >
                                {tab}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value="overview">
                        <OverviewTab
                            progress={progress}
                            completedLessons={completedLessons}
                            completedQuizzes={completedQuizzes}
                            lastLesson={lastLesson}
                            onNavigate={handleNavigation}
                            courseId={courseId}
                        />
                    </TabsContent>
                    <TabsContent value="grades">
                        <GradesTab />
                    </TabsContent>
                    <TabsContent value="notes">
                        <NotesTab />
                    </TabsContent>
                    <TabsContent value="messages">
                        <MessagesTab courseId={courseId} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
