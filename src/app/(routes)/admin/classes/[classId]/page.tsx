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

import { Pencil, Save, Trash2, X, BookOpen, Users, FileText, Award } from 'lucide-react';
import ClassInfo from '@/app/(routes)/admin/classes/[classId]/ClassInformation';
import StudentsPanel from '@/app/(routes)/admin/classes/[classId]/StudentList';
import Stream from './Stream';
import Assignments from './Assigment';
import MarksAttendance from './MarkAttendance';
import { GetListUserEnrollpedding } from '@/lib/services/class/getlistuserenrollpedding';

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

interface RawUser {
    _id: string;
    fullName: string;
    role: string;
    email?: string;
}

interface EnrollmentRecord {
    _id: string;
    user: RawUser;
    course: string;
    progress: number;
    completed: boolean;
    isConsulted: boolean;
    isDeleted: boolean;
    enrolledAt: string;
    fullName?: string; // Optional redundant fields
    email?: string;
    phone?: string;
    note?: string;
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
    const [activeTab, setActiveTab] = useState('Stream');
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
            const response = await GetListUserEnrollpedding(1, 10); // Fetch first page, 10 users

            if (!response?.metadata || !Array.isArray(response.metadata)) {
                throw new Error('Invalid or missing enrollment data');
            }

            const customers = response.metadata
                .filter((record: EnrollmentRecord) => !record.isConsulted && !record.isDeleted) // Keep only pending and non-deleted records
                .map((record: EnrollmentRecord) => {
                    const user = record.user;
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
            setIsDeleteModalOpen(false);
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
            // Check if student is already in the class
            const isAlreadyAssigned = classData?.students.some((student) => student._id === _id);
            if (isAlreadyAssigned) {
                toast({
                    title: 'Error',
                    description: 'This student is already assigned to the class.',
                    variant: 'destructive',
                });
                return;
            }

            const token = localStorage.getItem('token');
            console.log('Token:', token);
            if (!token) {
                throw new Error('Authentication token is missing');
            }

            console.log('Assigning student:', { studentId: _id, classId, fullName });
            const response = await AssignStudent(token, classId, _id);
            console.log('AssignStudent Response:', response);
            window.location.reload();
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

                setTimeout(() => {
                    setIsModalOpen(false);
                    router.refresh();

                    window.location.reload();
                }, 2000);
            } else {
                throw new Error(response.message || 'Failed to add student: Unknown error');
            }
        } catch (error: unknown) {
            console.error('Error in handleAddStudent:', error);
            const errorMessage =
                error instanceof Error ? error.message : 'Failed to add student. Please try again.';
            toast({
                title: 'Error',
                description: errorMessage,
                variant: 'destructive',
            });
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
            ? formData.schedule.daysOfWeek.filter((d) => d !== day)
            : [...formData.schedule.daysOfWeek, day];

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

    const tabs = [
        { name: 'Stream', icon: BookOpen },
        { name: 'Classwork', icon: FileText },
        { name: 'People', icon: Users },
        { name: 'Marks', icon: Award },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="relative bg-[#5AD3AF] rounded-xl p-6 text-white mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        {isEditing ? (
                            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                                Editing {classData.title}
                            </h1>
                        ) : (
                            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
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
                    <p className="mt-2 text-sm sm:text-base opacity-90">
                        Course: {classData.course.title || 'N/A'} | Mentor:{' '}
                        {classData.mentor.fullName || 'N/A'}
                    </p>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                    <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                                    activeTab === tab.name
                                        ? 'border-b-2 border-[#5AD3AF] text-[#5AD3AF]'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content */}
                {activeTab === 'Stream' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1 space-y-6">
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
                        </div>
                        <div className="lg:col-span-2">
                            <Stream />
                        </div>
                    </div>
                )}

                {activeTab === 'Classwork' && <Assignments />}

                {activeTab === 'People' && (
                    <div className="max-w-3xl mx-auto">
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
                )}

                {activeTab === 'Marks' && <MarksAttendance students={classData.students} />}
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
    );
}
