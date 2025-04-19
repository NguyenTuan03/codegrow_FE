'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Pencil, Save, Trash2, X } from 'lucide-react';
import { viewDetailCourses } from '@/lib/services/course/viewdetailcourses';
import { DeleteCourse } from '@/lib/services/course/deletecourse';
import { UpdateCourse } from '@/lib/services/course/updatecourse';
import { Input } from '@/components/ui/input';

interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
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

export default function CourseDetailPage() {
    const { courseId } = useParams<{ courseId: string }>();
    const [courseData, setCourseData] = useState<Course | null>(null);
    const [formData, setFormData] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const router = useRouter();

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

    useEffect(() => {
        fetchCourseDetail();
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
                formData.author._id,
                formData.category,
            );

            setCourseData(formData);
            setIsEditing(false);
            toast({
                title: 'Success',
                description: 'Course updated successfully',
                variant: 'default',
                className: 'bg-[#5AD3AF] text-black',
            });
            router.refresh();
        } catch (error: unknown) {
            console.error('Failed to update course:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to update course',
                variant: 'destructive',
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
                className: 'bg-[#5AD3AF] text-black',
            });
            setIsDeleteModalOpen(false);
            router.push('/admin/courses');
        } catch (error) {
            console.error('Failed to delete course:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to delete course',
                variant: 'destructive',
            });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400 transition-opacity duration-300"></div>
            </div>
        );
    }

    if (!courseData) {
        return (
            <div className="text-center text-gray-600 dark:text-gray-300 p-6">
                Course not found or invalid data
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    {isEditing ? (
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
                            Editing {formData?.title}
                        </h1>
                    ) : (
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
                            {courseData.title}
                        </h1>
                    )}
                    <div className="flex gap-3">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-colors duration-200"
                                    aria-label="Save changes"
                                >
                                    <Save className="h-5 w-5 mr-2" />
                                    Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 transition-colors duration-200"
                                    aria-label="Cancel editing"
                                >
                                    <X className="h-5 w-5 mr-2" />
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleEdit}
                                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
                                    aria-label="Edit course"
                                >
                                    <Pencil className="h-5 w-5 mr-2" />
                                    Update
                                </button>
                                <button
                                    onClick={handleDeleteClick}
                                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors duration-200"
                                    aria-label="Delete course"
                                >
                                    <Trash2 className="h-5 w-5 mr-2" />
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 transition-colors duration-300">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                                Course Information
                            </h2>
                            {isEditing ? (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                            Title
                                        </label>
                                        <Input
                                            type="text"
                                            value={formData?.title || ''}
                                            onChange={(e) =>
                                                setFormData((prev) =>
                                                    prev
                                                        ? { ...prev, title: e.target.value }
                                                        : prev,
                                                )
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                            Description
                                        </label>
                                        <Input
                                            type="text"
                                            value={formData?.description || ''}
                                            onChange={(e) =>
                                                setFormData((prev) =>
                                                    prev
                                                        ? { ...prev, description: e.target.value }
                                                        : prev,
                                                )
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                            Price
                                        </label>
                                        <Input
                                            type="number"
                                            value={formData?.price || ''}
                                            onChange={(e) =>
                                                setFormData((prev) =>
                                                    prev
                                                        ? {
                                                              ...prev,
                                                              price: parseFloat(e.target.value),
                                                          }
                                                        : prev,
                                                )
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                            Category
                                        </label>
                                        <Input
                                            type="text"
                                            value={formData?.category || ''}
                                            onChange={(e) =>
                                                setFormData((prev) =>
                                                    prev
                                                        ? { ...prev, category: e.target.value }
                                                        : prev,
                                                )
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                            Author Name
                                        </label>
                                        <Input
                                            type="text"
                                            value={formData?.author?.fullName || ''}
                                            onChange={(e) =>
                                                setFormData((prev) =>
                                                    prev
                                                        ? {
                                                              ...prev,
                                                              author: {
                                                                  ...prev.author,
                                                                  fullName: e.target.value, // Update only the fullName field
                                                              },
                                                          }
                                                        : prev,
                                                )
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                        {courseData.description}
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                                Category
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {courseData.category}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                                Price
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                ${courseData.price}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                                Enroll : {courseData.enrolledCount || 0}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                                Author
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {courseData.author?.fullName}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                                Created At
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {new Date(
                                                    courseData.createdAt,
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Delete Confirmation Modal */}
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full shadow-lg">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                                Confirm Deletion
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Are you sure you want to delete this course? This action cannot be
                                undone.
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={handleCancelDelete}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors duration-200"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
