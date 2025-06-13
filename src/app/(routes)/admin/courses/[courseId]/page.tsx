'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Pencil, Save, Trash2, X, ImagePlus } from 'lucide-react';
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
    imgUrl?: string;
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
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [newImgUrl, setNewImgUrl] = useState<File | undefined>(undefined);
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
            setPreviewImage(course.imgUrl || null);
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
        setPreviewImage(courseData?.imgUrl || null);
        setNewImgUrl(undefined);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                toast({
                    title: '❌ Invalid File Type',
                    description: 'Please upload an image file (JPEG, PNG, or GIF).',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
                return;
            }

            const maxSize = 5 * 1024 * 1024; // 5MB in bytes
            if (file.size > maxSize) {
                toast({
                    title: '❌ File Too Large',
                    description: 'Please upload an image smaller than 5MB.',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
                return;
            }

            setNewImgUrl(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setNewImgUrl(undefined);
            setPreviewImage(courseData?.imgUrl || null);
        }
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
            console.log('Token user:', tokenuser);

            const response = await UpdateCourse(
                tokenuser,
                courseId,
                formData.title,
                formData.description,
                formData.price.toString(),
                formData.author,
                formData.category._id,
                newImgUrl,
            );

            // Log the response for debugging
            console.log('UpdateCourse Response in handleSave:', JSON.stringify(response, null, 2));

            // Update courseData with the new data from the response
            const updatedCourseData: Course = {
                ...formData,
                imgUrl: response.metadata?.imgUrl || previewImage || formData.imgUrl,
            };
            setCourseData(updatedCourseData);
            setFormData(updatedCourseData);
            setPreviewImage(
                typeof updatedCourseData.imgUrl === 'string' ? updatedCourseData.imgUrl : null,
            );

            setIsEditing(false);
            setNewImgUrl(undefined);
            toast({
                title: 'Success',
                description: 'Course updated successfully',
                variant: 'default',
                className:
                    'bg-[#657ED4] dark:bg-[#5AD3AF] text-white dark:text-black font-semibold',
            });
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
            console.log('Token user:', tokenuser);

            await DeleteCourse(courseId, tokenuser);
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
                {/* Header with Background Image */}
                <div
                    className="relative rounded-2xl p-6 text-white mb-8 shadow-lg overflow-hidden"
                    style={{
                        backgroundImage: previewImage
                            ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${previewImage})`
                            : 'linear-gradient(to right, #657ED4, #4a5da0)',
                        backgroundColor: previewImage ? 'transparent' : '#657ED4',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: '150px',
                    }}
                >
                    <div className="relative z-10">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                <div className="flex items-center gap-3">
                                    {isEditing ? (
                                        <div className="flex items-center gap-4">
                                            <h1 className="text-2xl sm:text-4xl font-bold">
                                                Editing {formData?.title}
                                            </h1>
                                            <label
                                                htmlFor="img-upload"
                                                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                                            >
                                                <ImagePlus className="h-5 w-5 text-[#657ED4] dark:text-[#5AD3AF]" />
                                                <span>Change Image</span>
                                                <input
                                                    id="img-upload"
                                                    type="file"
                                                    accept="image/jpeg,image/png,image/gif"
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    ) : (
                                        <h1 className="text-2xl sm:text-4xl font-bold">
                                            {courseData.title}
                                        </h1>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={handleSave}
                                            className="flex items-center px-4 py-2 bg-[#657ED4] dark:bg-[#5AD3AF] text-white rounded-lg hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] transition-all duration-200 shadow-md font-semibold cursor-pointer"
                                            aria-label="Save changes"
                                        >
                                            <Save className="h-5 w-5 mr-2" />
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 shadow-sm font-medium cursor-pointer"
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
                                            className="flex items-center px-4 py-2 bg-[#657ED4] dark:bg-[#5AD3AF] text-white rounded-lg hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] transition-all duration-200 shadow-md cursor-pointer"
                                            aria-label="Edit course"
                                        >
                                            <Pencil className="h-5 w-5 mr-2" />
                                            Update
                                        </button>
                                        <button
                                            onClick={handleDeleteClick}
                                            className="flex items-center px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition-all duration-200 shadow-md cursor-pointer"
                                            aria-label="Delete course"
                                        >
                                            <Trash2 className="h-5 w-5 mr-2" />
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
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
