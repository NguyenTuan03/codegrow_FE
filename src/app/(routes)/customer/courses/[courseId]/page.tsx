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
    author: {
        _id: string;
        fullName: string;
        email: string;
        role: string;
    };
    category: { _id: string; name: string } | null;
    createdAt: string;
}

export default function CourseLearningPage() {
    const router = useRouter();
    const { courseId } = useParams<{ courseId: string }>();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    // const [completedModules] = useState({
    //     '1': false,
    //     '2': false,
    //     '3': false,
    //     '4': false,
    // });
    const [progressPercentage, setProgressPercentage] = useState(0);
    const [completedModules, setCompletedModules] = useState<{ [key: string]: boolean }>({});

    // const progressPercentage =
    //     (Object.values(completedModules).filter(Boolean).length /
    //         Object.values(completedModules).length) *
    //     100;

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    const fetchCourseData = async () => {
        try {
            setLoading(true);
            const courseRes = await viewDetailCourses(courseId);
            console.log('Course data:', courseRes);

            if (courseRes.status === 200) {
                const parsedCourse = {
                    ...courseRes.metadata,
                    author:
                        typeof courseRes.metadata.author === 'string'
                            ? JSON.parse(courseRes.metadata.author)
                            : courseRes.metadata.author,
                    category:
                        typeof courseRes.metadata.category === 'string'
                            ? JSON.parse(courseRes.metadata.category)
                            : courseRes.metadata.category,
                };

                setCourse(parsedCourse);
                toast({
                    title: 'Thành công',
                    description: 'Tải dữ liệu khóa học thành công',
                    variant: 'default',
                });
            } else {
                throw new Error('Failed to load course data');
            }
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu khóa học:', error);
            toast({
                title: 'Lỗi',
                description:
                    error instanceof Error ? error.message : 'Không thể tải dữ liệu khóa học',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };
    const handleProcess = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast({
                title: 'Error',
                description: 'Token not found. Please log in again.',
                variant: 'destructive',
            });
            return;
        }

        try {
            const progress = await GetProgress(token, courseId);
            console.log('Progress:', progress);

            if (progress?.percentage !== undefined) {
                setProgressPercentage(progress.percentage);
            }

            if (progress?.completedModules) {
                setCompletedModules(progress.completedModules);
            }
        } catch (error) {
            console.error('Failed to fetch progress:', error);
            toast({
                title: 'Error',
                description: 'Failed to load progress data.',
                variant: 'destructive',
            });
        }
    };

    useEffect(() => {
        fetchCourseData();
        handleProcess();
    }, [courseId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5AD3AF]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#EEF1EF] dark:bg-gray-900 px-6 py-12 md:px-24 lg:px-32 space-y-8 transition-colors duration-300">
            <Breadcrumbs
                courseId={courseId}
                category={course?.category?.name || 'Category'}
                title={course?.title || 'Course'}
            />
            <CourseHeader course={course} />

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="flex flex-wrap gap-2 mb-8 bg-transparent border-b border-gray-200 dark:border-gray-700">
                    {['Tổng quan', 'Điểm số', 'Ghi chú', 'Thảo luận'].map((tab, i) => (
                        <TabsTrigger
                            key={i}
                            value={['overview', 'grades', 'notes', 'messages'][i]}
                            className="py-3 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-t-lg transition-all data-[state=active]:bg-white data-[state=active]:dark:bg-gray-800 data-[state=active]:text-[#657ED4] data-[state=active]:dark:text-[#5AD3AF] data-[state=active]:shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            {tab}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="overview">
                    <OverviewTab
                        progressPercentage={progressPercentage}
                        completedModules={completedModules}
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
    );
}
