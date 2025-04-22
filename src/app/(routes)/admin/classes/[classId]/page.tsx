'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { viewDetail } from '@/lib/services/class/viewdetail';
import { DeleteClass } from '@/lib/services/class/deleteclass';
import { UpdateClass } from '@/lib/services/class/updateclass';
import { AssignStudent } from '@/lib/services/class/assignstudent';
import { getUser } from '@/lib/services/admin/getuser';
import { GetCourses } from '@/lib/services/course/getcourse';
import { Pencil, Save, Trash2, X } from 'lucide-react';
import ClassInfo from '@/app/(routes)/admin/classes/[classId]/ClassInformation';
import StudentsPanel from '@/app/(routes)/admin/classes/[classId]/StudentList';

interface Schedule {
    startDate: string;
    endDate: string;
    daysOfWeek: string[];
    time: string;
}

interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    createdAt: string;
    author: string;
}

interface User {
    _id: string;
    email: string;
    role: string;
    fullName: string;
}

interface Mentor {
    _id: string;
    fullName: string;
    email: string;
    role: string;
}

interface ClassItem {
    _id: string;
    title: string;
    course: Course;
    description: string;
    mentor: User;
    status: string;
    maxStudents: number;
    students: User[];
    schedule: Schedule;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface Student {
    _id: string;
    fullName: string;
}

// Interface for raw user data from getUser API
interface RawUser {
    _id: string;
    fullName: string;
    role: string;
    email?: string;
}

export default function ClassDetailPage() {
    const { classId } = useParams<{ classId: string }>();
    const [classData, setClassData] = useState<ClassItem | null>(null);
    const [formData, setFormData] = useState<ClassItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [students, setStudents] = useState<Student[]>([]);
    const [studentsLoading, setStudentsLoading] = useState(false);
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([]);
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const fetchCourse = async () => {
        try {
            const data = await GetCourses();
            if (data?.metadata?.courses && data.metadata.courses.length > 0) {
                setCourses(data.metadata.courses);
            } else {
                throw new Error(
                    'No courses found. Please check your connection or try again later.',
                );
            }
        } catch (error: unknown) {
            console.error('Failed to fetch courses:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to fetch courses',
                variant: 'destructive',
            });
            setCourses([]);
        }
    };

    const fetchMentors = async () => {
        try {
            setStudentsLoading(true);
            const response = await getUser();
            console.log('getUser Response:', JSON.stringify(response.metadata.users, null, 2));

            if (!response?.metadata?.users || !Array.isArray(response.metadata.users)) {
                throw new Error('Invalid or missing users data');
            }

            const mentors = response.metadata.users
                .filter((user: RawUser) => user.role === 'mentor')
                .map((user: RawUser) => {
                    if (!user._id || !user.fullName) {
                        console.warn('Invalid user data:', user);
                        return null;
                    }
                    return {
                        _id: user._id,
                        fullName: user.fullName,
                        email: user.email || '',
                        role: user.role,
                    };
                })
                .filter((mentor: Mentor | null): mentor is Mentor => mentor !== null);

            setMentors(mentors);
            console.log('Filtered mentors:', JSON.stringify(mentors, null, 2));
        } catch (error) {
            console.error('Failed to fetch mentors:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to load mentor list.',
                variant: 'destructive',
            });
            setMentors([]);
        } finally {
            setStudentsLoading(false);
        }
    };

    const fetchStudents = async () => {
        try {
            setStudentsLoading(true);
            const response = await getUser();
            console.log('getUser Response:', JSON.stringify(response.metadata.users, null, 2));

            if (!response?.metadata?.users || !Array.isArray(response.metadata.users)) {
                throw new Error('Invalid or missing users data');
            }

            const customers = response.metadata.users
                .filter((user: RawUser) => user.role === 'customer')
                .map((user: RawUser) => {
                    if (!user._id || !user.fullName) {
                        console.warn('Invalid user data:', user);
                        return null;
                    }
                    return {
                        _id: user._id,
                        fullName: user.fullName,
                    };
                })
                .filter((user: Student | null): user is Student => user !== null);

            setStudents(customers);
            console.log('Filtered students:', JSON.stringify(customers, null, 2));
        } catch (error) {
            console.error('Failed to fetch students:', error);
            toast({
                title: 'Error',
                description:
                    error instanceof Error ? error.message : 'Failed to load student list.',
                variant: 'destructive',
            });
            setStudents([]);
        } finally {
            setStudentsLoading(false);
        }
    };

    useEffect(() => {
        fetchCourse();
        fetchMentors();
    }, []);

    useEffect(() => {
        const fetchClassDetail = async () => {
            try {
                setLoading(true);
                const { metadata } = await viewDetail(classId);
                console.log('API Response detail:', JSON.stringify(metadata, null, 2));

                if (!metadata) {
                    throw new Error('Invalid class data');
                }

                const students = Array.isArray(metadata.students)
                    ? metadata.students.map((student: User) => ({
                          _id: student._id || '',
                          fullName: student.fullName || 'Unknown',
                          email: student.email || '',
                          role: student.role || 'customer',
                      }))
                    : [];

                const normalizedData: ClassItem = {
                    ...metadata,
                    students,
                    course: metadata.course || {
                        _id: '',
                        title: 'N/A',
                        description: '',
                        price: 0,
                        category: '',
                        createdAt: '',
                        author: '',
                    },
                    mentor: metadata.mentor || {
                        _id: '',
                        fullName: 'N/A',
                        email: '',
                        role: '',
                    },
                };

                setClassData(normalizedData);
                setFormData(normalizedData);
            } catch (error) {
                console.error('Failed to fetch class details:', error);
                toast({
                    title: 'Error',
                    description:
                        error instanceof Error ? error.message : 'Failed to load class details',
                    variant: 'destructive',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchClassDetail();
    }, [classId]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData(classData);
    };

    const handleSave = async () => {
        if (!formData || !classId) {
            toast({
                title: 'Error',
                description: 'Class data or ID is missing',
                variant: 'destructive',
            });
            return;
        }

        const { title, course, mentor, description, maxStudents, status, schedule } = formData;
        if (
            !title ||
            !course._id ||
            !mentor._id ||
            maxStudents < 1 ||
            maxStudents > 30 ||
            !status ||
            !schedule.startDate ||
            !schedule.endDate ||
            !schedule.time ||
            !schedule.daysOfWeek.length
        ) {
            toast({
                title: 'Error',
                description: 'Please fill in all required fields correctly',
                variant: 'destructive',
            });
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication token is missing');
            }

            const formattedSchedule = {
                ...schedule,
                startDate: new Date(schedule.startDate).toISOString(),
                endDate: new Date(schedule.endDate).toISOString(),
            };

            await UpdateClass(
                token,
                classId,
                title,
                course._id,
                mentor._id,
                description,
                maxStudents,
                status,
                formattedSchedule,
            );

            setClassData({ ...formData, schedule: formattedSchedule });
            setIsEditing(false);
            toast({
                title: 'Success',
                description: 'Class updated successfully',
                variant: 'default',
                className: 'bg-[#5AD3AF] text-black',
            });
            router.refresh();
        } catch (error: unknown) {
            console.error('Failed to update class:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to update class',
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

            await DeleteClass(classId, token);
            toast({
                title: 'Success',
                description: 'Class deleted successfully',
                variant: 'default',
                className: 'bg-[#5AD3AF] text-black',
            });
            setIsDeleteModalOpen(false); // Đóng modal sau khi xóa thành công
            router.push('/admin/classes');
        } catch (error) {
            console.error('Failed to delete class:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to delete class',
                variant: 'destructive',
            });
        }
    };
    const handleAddStudent = async (_id: string, fullName: string) => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
            if (!token) {
                throw new Error('Authentication token is missing');
            }
            const response = await AssignStudent(token, classId, _id);
            if (response.status === '200') {
                const newStudent: User = {
                    _id,
                    fullName,
                    email: '',
                    role: 'customer',
                };
                setClassData((prev) =>
                    prev ? { ...prev, students: [...prev.students, newStudent] } : prev,
                );
                setFormData((prev) =>
                    prev ? { ...prev, students: [...prev.students, newStudent] } : prev,
                );
                toast({
                    title: 'Success',
                    className: 'bg-[#5AD3AF] text-black',
                    description: 'Student added successfully',
                    variant: 'default',
                });

                // Tắt modal sau 2 giây và làm mới trang
                setTimeout(() => {
                    setIsModalOpen(false);
                    router.refresh();
                }, 2000);
            } else {
                throw new Error(response.message || 'Failed to add student');
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast({
                    title: 'Error',
                    description: error.message || 'Failed to add student. Please try again.',
                    variant: 'destructive',
                });
            } else {
                toast({
                    title: 'Error',
                    description: 'An unknown error occurred. Please try again.',
                    variant: 'destructive',
                });
            }
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
        fetchStudents();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setStudents([]);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: keyof ClassItem | keyof Schedule,
    ) => {
        if (!formData) return;

        if (field in formData) {
            setFormData({
                ...formData,
                [field]: field === 'maxStudents' ? parseInt(e.target.value) || 0 : e.target.value,
            });
        } else if (formData.schedule) {
            setFormData({
                ...formData,
                schedule: { ...formData.schedule, [field]: e.target.value },
            });
        }
    };

    const handleDayChange = (day: string) => {
        if (!formData?.schedule) return;

        const updatedDays = formData.schedule.daysOfWeek.includes(day)
            ? formData.schedule.daysOfWeek.filter((d) => d !== day) // Xóa ngày nếu đã tồn tại
            : [...formData.schedule.daysOfWeek, day]; // Thêm ngày nếu chưa tồn tại

        setFormData({
            ...formData,
            schedule: { ...formData.schedule, daysOfWeek: updatedDays },
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400 transition-opacity duration-300"></div>
            </div>
        );
    }

    if (!classData || !classData.schedule) {
        return (
            <div className="text-center text-gray-600 dark:text-gray-300 p-6">
                Class not found or invalid data
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    {isEditing ? (
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
                            Editing {classData.title}
                        </h1>
                    ) : (
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
                            {classData.title}
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
                                    aria-label="Edit class"
                                >
                                    <Pencil className="h-5 w-5 mr-2" />
                                    Update
                                </button>
                                <button
                                    onClick={handleDeleteClick}
                                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors duration-200"
                                    aria-label="Delete class"
                                >
                                    <Trash2 className="h-5 w-5 mr-2" />
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <ClassInfo
                        classData={classData}
                        formData={formData}
                        isEditing={isEditing}
                        courses={courses}
                        mentors={mentors}
                        handleInputChange={handleInputChange}
                        handleDayChange={handleDayChange}
                        setFormData={setFormData}
                    />
                    <StudentsPanel
                        classData={classData}
                        students={students}
                        studentsLoading={isModalOpen && studentsLoading}
                        isModalOpen={isModalOpen}
                        handleOpenModal={handleOpenModal}
                        handleCloseModal={handleCloseModal}
                        handleAddStudent={handleAddStudent}
                    />
                </div>
                {/* Delete Confirmation Modal */}
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full shadow-lg">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                                Confirm Deletion
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Are you sure you want to delete this class? This action cannot be
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
