'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Pencil, Save, Trash2, X } from 'lucide-react';
import { viewDetailCourses } from '@/lib/services/course/viewdetailcourses';
import { DeleteCourse } from '@/lib/services/course/deletecourse';
import { UpdateCourse } from '@/lib/services/course/updatecourse';
import { GetListStudents } from '@/lib/services/course/getliststudents';
import { GetAllCategory } from '@/lib/services/category/getallcategory';

import StudentList from '@/app/(routes)/admin/courses/[courseId]/StudentList';
import CourseInformation from '@/app/(routes)/admin/courses/[courseId]/CourseInformation';
import DeleteConfirmationModal from '@/app/(routes)/admin/courses/[courseId]/DeleteModal';
import LessonList from '@/app/(routes)/admin/courses/[courseId]/LessonList';

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
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const router = useRouter();
    const [listStudents, setListStudents] = useState<Students[]>([]);
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
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
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
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourseDetail();
        fetchListStudents();
        fetchCategories();
    }, [courseId]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData(courseData);
    };

    const handleSave = async () => {
        if (!formData || !courseId) {
            toast({
                title: 'Error',
                description: 'Course data or ID is missing',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication token is missing');
            }

            await UpdateCourse(
                token,
                courseId,
                formData.title,
                formData.description,
                formData.price.toString(),
                formData.author,
                formData.category._id,
            );

            setCourseData(formData);
            setIsEditing(false);
            toast({
                title: 'Success',
                description: 'Course updated successfully',
                variant: 'default',
                className:
                    'bg-[#657ED4] dark:bg-[#5AD3AF] text-white dark:text-black font-semibold',
            });
            router.refresh();
        } catch (error: unknown) {
            console.error('Failed to update course:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to update course',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        }
    };

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication token is missing');
            }

            await DeleteCourse(courseId, token);
            toast({
                title: 'Success',
                description: 'Course deleted successfully',
                variant: 'default',
                className:
                    'bg-[#657ED4] dark:bg-[#5AD3AF] text-white dark:text-black font-semibold',
            });
            setIsDeleteModalOpen(false);
            router.push('/admin/courses');
        } catch (error) {
            console.error('Failed to delete course:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to delete course',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#657ED4] dark:border-[#5AD3AF]"></div>
            </div>
        );
    }

    if (!courseData) {
        return (
            <div className="text-center text-gray-600 dark:text-gray-400 p-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 font-medium">
                Course not found or invalid data
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto p-6 sm:p-8">
                {/* Header with Date and Time */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div className="flex items-center gap-3">
                        {isEditing ? (
                            <h1 className="text-2xl sm:text-4xl font-bold text-[#657ED4] dark:text-[#5AD3AF]">
                                Editing {formData?.title}
                            </h1>
                        ) : (
                            <h1 className="text-2xl sm:text-4xl font-bold text-[#657ED4] dark:text-[#5AD3AF]">
                                {courseData.title}
                            </h1>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mb-6">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                className="flex items-center px-4 py-2 bg-[#657ED4] dark:bg-[#5AD3AF] text-white rounded-lg hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] transition-all duration-200 shadow-md font-semibold"
                                aria-label="Save changes"
                            >
                                <Save className="h-5 w-5 mr-2" />
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 shadow-sm font-medium"
                            >
                                <X className="h-5 w-5 mr-2" />
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleEdit}
                                className="flex items-center px-4 py-2 bg-[#657ED4] dark:bg-[#5AD3AF] text-white rounded-lg hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] transition-all duration-200 shadow-md"
                            >
                                <Pencil className="h-5 w-5 mr-2" />
                                Update
                            </button>
                            <button
                                onClick={handleDeleteClick}
                                className="flex items-center px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition-all duration-200 shadow-md"
                            >
                                <Trash2 className="h-5 w-5 mr-2" />
                                Delete
                            </button>
                        </>
                    )}
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <CourseInformation
                            courseData={courseData}
                            isEditing={isEditing}
                            formData={formData}
                            setFormData={setFormData}
                            categories={categories}
                        />
                    </div>
                    <div>
                        <StudentList students={listStudents} />
                    </div>
                </div>

                {/* Lesson List */}
                <div className="mt-6">
                    <LessonList courseId={courseId} coursePrice={courseData?.price ?? 0} />
                </div>

                <DeleteConfirmationModal
                    isDeleteModalOpen={isDeleteModalOpen}
                    handleCancelDelete={handleCancelDelete}
                    handleDelete={handleDelete}
                />
            </div>
        </div>
    );
}
