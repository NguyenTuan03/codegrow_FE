'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';

import { viewDetailCourses } from '@/lib/services/course/viewdetailcourses';

import { getUser } from '@/lib/services/admin/getuser';
import { GetListStudents } from '@/lib/services/course/getliststudents';
import { GetAllCategory } from '@/lib/services/category/getallcategory';

import StudentList from '@/app/(routes)/admin/courses/[courseId]/StudentList';

import Lesson from '@/app/(routes)/qaqc/courses/[courseId]/Lesson';
import CourseInformation from '@/app/(routes)/qaqc/courses/[courseId]/CourseInformation';

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

interface Mentor {
    _id: string;
    fullName: string;
    email: string;
    role: string;
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
    const [author, setAuthors] = useState<Mentor[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchCourseDetail = async () => {
        try {
            setLoading(true);
            const res = await viewDetailCourses(courseId);
            if (!res || res.status !== 200) {
                throw new Error('Invalid course data');
            }

            const course = {
                ...res.metadata,
                author:
                    typeof res.metadata.author === 'string'
                        ? JSON.parse(res.metadata.author)
                        : res.metadata.author,
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
    };

    const fetchCategories = async () => {
        try {
            const data = await GetAllCategory();
            setCategories(data.metadata.categories);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    const fetchListStudents = async () => {
        try {
            setLoading(true);
            const res = await GetListStudents(courseId);
            if (!res || res.status !== 200) {
                throw new Error('Invalid course data');
            }
            setListStudents(res.metadata);
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
    };

    const fetchAuthor = async () => {
        try {
            const response = await getUser();
            if (!response?.metadata?.users || !Array.isArray(response.metadata.users)) {
                throw new Error('Invalid or missing users data');
            }
            setAuthors(response.metadata.users);
        } catch (error) {
            console.error('Failed to fetch authors:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to load author list',
                variant: 'destructive',
            });
        }
    };

    useEffect(() => {
        fetchCourseDetail();
        fetchListStudents();
        fetchAuthor();
        fetchCategories();
    }, [courseId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5AD3AF]"></div>
            </div>
        );
    }

    if (!courseData) {
        return (
            <div className="text-center text-gray-600 dark:text-gray-400 p-6">
                Course not found or invalid data
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#EEF1EF] dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <CourseInformation
                            courseData={courseData}
                            formData={formData}
                            setFormData={setFormData}
                            categories={categories}
                            author={author}
                        />
                    </div>
                    <div>
                        <StudentList students={listStudents} />
                    </div>
                </div>

                {/* Add the LessonList component below */}
                <div className="mt-6">
                    <Lesson courseId={courseId} />
                </div>
            </div>
        </div>
    );
}
