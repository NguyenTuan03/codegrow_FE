'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { viewDetailCourses } from '@/lib/services/course/viewdetailcourses';
import { GetListStudents } from '@/lib/services/course/getliststudents';
import { GetAllCategory } from '@/lib/services/category/getallcategory';
import StudentList from '@/app/(routes)/admin/courses/[courseId]/StudentList';
import Lesson from '@/app/(routes)/qaqc/courses/[courseId]/Lesson';
import CourseInformation from '@/app/(routes)/qaqc/courses/[courseId]/CourseInformation';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, Users, BookOpen } from 'lucide-react';

interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: { _id: string; name: string };
    createdAt: string;
    author: string;
    isDeleted?: boolean;
    enrolledCount?: number;
}

interface Students {
    _id: string;
    fullName: string;
    email: string;
    role: string;
}

interface Category {
    _id: string;
    name: string;
}

export default function CourseDetailPage() {
    const { courseId } = useParams<{ courseId: string }>();
    const [courseData, setCourseData] = useState<Course | null>(null);
    const [formData, setFormData] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [listStudents, setListStudents] = useState<Students[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeTab, setActiveTab] = useState('information');

    const tabs = [
        { name: 'Information', icon: Info },
        { name: 'Students', icon: Users },
        { name: 'Lessons', icon: BookOpen },
    ];

    const fetchCourseDetail = useCallback(async () => {
        try {
            setLoading(true);
            const res = await viewDetailCourses(courseId);
            if (!res || res.status !== 200) {
                throw new Error('Invalid course data');
            }

            const course = {
                ...res.metadata,
                category:
                    typeof res.metadata.category === 'string'
                        ? JSON.parse(res.metadata.category)
                        : res.metadata.category,
            };

            setCourseData(course);
            setFormData(course);
        } catch (error) {
            console.error('Failed to fetch course details:', error);
            toast({
                title: 'Error',
                description:
                    error instanceof Error ? error.message : 'Failed to load course details',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    }, [courseId]);

    const fetchCategories = useCallback(async () => {
        try {
            const data = await GetAllCategory(1, 100);
            setCategories(data?.metadata?.categories || []);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch categories',
                variant: 'destructive',
            });
        }
    }, []);

    const fetchListStudents = useCallback(async () => {
        try {
            const res = await GetListStudents(courseId);
            if (!res || res.status !== 200) {
                throw new Error('Invalid student data');
            }
            setListStudents(res.metadata || []);
        } catch (error) {
            console.error('Failed to fetch students:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to load student list',
                variant: 'destructive',
            });
        }
    }, [courseId]);

    useEffect(() => {
        Promise.all([fetchCourseDetail(), fetchListStudents(), fetchCategories()]);
    }, [fetchCourseDetail, fetchListStudents, fetchCategories]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5AD3AF]"></div>
            </div>
        );
    }

    if (!courseData) {
        return (
            <div className="text-center py-12 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Course not found or invalid data
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 sm:px-6 md:px-12 lg:px-24 py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Breadcrumbs */}
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                href="/qaqc"
                                className="text-gray-600 text-base dark:text-gray-400 hover:text-[#657ED4] dark:hover:text-[#5AD3AF]"
                            >
                                Home
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                href="/qaqc/courses"
                                className="text-gray-600 text-base dark:text-gray-400 hover:text-[#657ED4] dark:hover:text-[#5AD3AF]"
                            >
                                Courses
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <span className="text-gray-900 text-base dark:text-gray-100">
                                {courseData.title}
                            </span>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Course Header */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                    <CardHeader className="p-6">
                        <h1 className="text-4xl font-bold tracking-tight text-[#657ED4] dark:text-[#5AD3AF]">
                            {courseData.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 mt-2">
                            <Badge className="bg-[#657ED4] dark:bg-[#5AD3AF] text-white px-3 py-1 text-base rounded-full shadow-sm">
                                {courseData.category.name}
                            </Badge>
                            <span className="text-base text-gray-600 dark:text-gray-400">
                                Created by {courseData.author}
                            </span>
                            <span className="text-base text-gray-600 dark:text-gray-400">
                                {courseData.enrolledCount || 0} students enrolled
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                        <p className="text-gray-600 text-base dark:text-gray-400 line-clamp-3">
                            {courseData.description}
                        </p>
                        <div className="mt-4 flex items-center gap-4">
                            <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                ${courseData.price.toFixed(2)}
                            </span>
                            <span className="text-base text-gray-600 dark:text-gray-400">
                                Created on{' '}
                                {new Date(courseData.createdAt).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </span>
                            <span className="text-base text-gray-600 dark:text-gray-400">
                                Last updated{' '}
                                {new Date('2025-05-28T23:19:00+07:00').toLocaleString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                    timeZone: 'Asia/Bangkok',
                                })}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabs Navigation */}
                <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                    <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name.toLowerCase())}
                                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                                    activeTab === tab.name.toLowerCase()
                                        ? 'border-b-2 border-[#657ED4] text-[#657ED4]'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                {activeTab === 'information' && (
                    <CourseInformation
                        courseData={courseData}
                        formData={formData}
                        setFormData={setFormData}
                        categories={categories}
                    />
                )}
                {activeTab === 'students' && <StudentList students={listStudents} />}
                {activeTab === 'lessons' && <Lesson courseId={courseId} />}
            </div>
        </div>
    );
}
