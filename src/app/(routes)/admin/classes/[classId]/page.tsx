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
import { Pencil, Save, Trash2, X, BookOpen, Users, Edit } from 'lucide-react';
import ClassInfo from '@/app/(routes)/admin/classes/[classId]/ClassInformation';
import StudentsPanel from '@/app/(routes)/admin/classes/[classId]/StudentList';

import Assignments from './Assigment';
import MarksAttendance from './MarkAttendance';
import { GetListUserEnrollpedding } from '@/lib/services/class/getlistuserenrollpedding';
import ViewPosts from '@/components/ViewPost';

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
    linkMeet?: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    imgUrl?: string | File;
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
    fullName?: string;
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
    const [imgUrl, setImgUrl] = useState<File | undefined>(undefined);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

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
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
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

            const mentorsList = response.metadata.users
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

            console.log('Fetched mentors:', JSON.stringify(mentorsList, null, 2));
            setMentors(mentorsList);
        } catch (error) {
            console.error('Failed to fetch mentors:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to load mentor list.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
            setMentors([]);
        } finally {
            setStudentsLoading(false);
        }
    };

    const fetchStudents = async () => {
        try {
            setStudentsLoading(true);
            const response = await GetListUserEnrollpedding(1, 10);

            if (!response?.metadata || !Array.isArray(response.metadata)) {
                throw new Error('Invalid or missing enrollment data');
            }

            // Get the IDs of students already in the class
            const enrolledStudentIds =
                classData?.students.map((student: User) => student._id) || [];

            // Process the response data
            const uniqueStudents = response.metadata
                // Filter out deleted and consulted records
                .filter((record: EnrollmentRecord) => !record.isConsulted && !record.isDeleted)
                // Map to student objects
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
                // Remove null entries
                .filter((user: Student | null): user is Student => user !== null)
                // Filter out students already enrolled
                .filter((student: Student) => !enrolledStudentIds.includes(student._id))
                // Remove duplicates by creating a map keyed by _id
                .reduce((acc: Student[], current: Student) => {
                    const existing = acc.find((student: Student) => student._id === current._id);
                    if (!existing) {
                        acc.push(current);
                    }
                    return acc;
                }, []);

            setStudents(uniqueStudents);
            console.log('Filtered unique students:', JSON.stringify(uniqueStudents, null, 2));
        } catch (error) {
            console.error('Failed to fetch students:', error);
            toast({
                title: 'Error',
                description:
                    error instanceof Error ? error.message : 'Failed to load student list.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
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
                    linkMeet: metadata.linkMeet || '',
                    students,
                    course: metadata.course
                        ? {
                              ...metadata.course,
                              category:
                                  typeof metadata.course.category === 'object' &&
                                  typeof metadata.course.category._id === 'object'
                                      ? {
                                            _id: metadata.course.category._id,
                                            name: metadata.course.category.name,
                                        }
                                      : typeof metadata.course.category === 'object'
                                        ? {
                                              _id: metadata.course.category._id,
                                              name: metadata.course.category.name,
                                          }
                                        : { _id: '', name: 'N/A' },
                              author:
                                  typeof metadata.course.author === 'string'
                                      ? {
                                            _id: metadata.course.author,
                                            fullName: 'N/A',
                                            role: '',
                                            email: '',
                                        }
                                      : metadata.course.author,
                          }
                        : {
                              _id: '',
                              title: 'N/A',
                              description: '',
                              price: 0,
                              category: { _id: '', name: 'N/A' },
                              createdAt: '',
                              author: {
                                  _id: '',
                                  fullName: '',
                                  role: '',
                                  email: '',
                              },
                          },
                    mentor: metadata.mentor || {
                        _id: '',
                        fullName: 'N/A',
                        email: '',
                        role: '',
                    },
                };
                console.log('Normalized class data:', JSON.stringify(normalizedData, null, 2));
                setClassData(normalizedData);
                setFormData(normalizedData);
                setAvatarPreview(
                    typeof normalizedData.imgUrl === 'string' ? normalizedData.imgUrl : null,
                );
            } catch (error) {
                console.error('Failed to fetch class details:', error);
                toast({
                    title: 'Error',
                    description:
                        error instanceof Error ? error.message : 'Failed to load class details',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
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
        setImgUrl(undefined);
        setAvatarPreview(typeof classData?.imgUrl === 'string' ? classData.imgUrl : null);
    };

    const handleSave = async () => {
        if (!formData || !classId) {
            toast({
                title: 'Error',
                description: 'Class data or ID is missing',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
            return;
        }

        const { title, course, mentor, description, maxStudents, status, schedule, linkMeet } =
            formData;
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
            !schedule.daysOfWeek.length ||
            !linkMeet
        ) {
            toast({
                title: 'Error',
                description: 'Please fill in all required fields correctly',
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

            const formattedSchedule = {
                ...schedule,
                startDate: new Date(schedule.startDate).toISOString(),
                endDate: new Date(schedule.endDate).toISOString(),
            };

            const response = await UpdateClass(
                tokenuser,
                classId,
                title,
                course._id,
                mentor._id,
                description,
                maxStudents,
                status,
                formattedSchedule,
                linkMeet,
                imgUrl,
            );

            // Update classData with the new data from the response
            const updatedClassData: ClassItem = {
                ...formData,
                schedule: formattedSchedule,
                imgUrl: response.metadata?.imgUrl || avatarPreview || formData.imgUrl, // Use the returned imgUrl if available
            };
            setClassData(updatedClassData);
            setFormData(updatedClassData);
            setAvatarPreview(
                typeof updatedClassData.imgUrl === 'string' ? updatedClassData.imgUrl : null,
            );
            setIsEditing(false);
            setImgUrl(undefined);
            toast({
                title: 'Success',
                description: 'Class updated successfully',
                variant: 'default',
                className:
                    'bg-[#657ED4] dark:bg-[#5AD3AF] text-white dark:text-black font-semibold',
            });
            router.refresh();
        } catch (error: unknown) {
            console.error('Failed to update class:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to update class',
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

            await DeleteClass(classId, tokenuser);
            toast({
                title: 'Success',
                description: 'Class deleted successfully',
                variant: 'default',
                className:
                    'bg-[#657ED4] dark:bg-[#5AD3AF] text-white dark:text-black font-semibold',
            });
            setIsDeleteModalOpen(false);
            router.push('/admin/classes');
        } catch (error) {
            console.error('Failed to delete class:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to delete class',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        }
    };

    const handleAddStudent = async (_id: string, fullName: string) => {
        try {
            const isAlreadyAssigned = classData?.students.some((student) => student._id === _id);
            if (isAlreadyAssigned) {
                toast({
                    title: 'Error',
                    description: 'This student is already assigned to the class.',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
                return;
            }

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

            console.log('Assigning student:', { studentId: _id, classId, fullName });
            const response = await AssignStudent(tokenuser, classId, _id);
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
                    className:
                        'bg-[#657ED4] dark:bg-[#5AD3AF] text-white dark:text-black font-semibold',
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
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
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

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                toast({
                    title: '❌ File Too Large',
                    description: 'Please upload an image smaller than 5MB.',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
                return;
            }

            setImgUrl(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            setFormData((prev) => (prev ? { ...prev, imgUrl: file } : prev));
        } else {
            setImgUrl(undefined);
            setAvatarPreview(typeof classData?.imgUrl === 'string' ? classData.imgUrl : null);
            setFormData((prev) => (prev ? { ...prev, imgUrl: classData?.imgUrl } : prev));
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
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#657ED4] dark:border-[#5AD3AF] transition-opacity duration-300"></div>
            </div>
        );
    }

    if (!classData || !classData.schedule) {
        return (
            <div className="text-center text-gray-600 dark:text-gray-400 p-6 font-medium">
                Class not found or invalid data
            </div>
        );
    }

    const tabs = [
        { name: 'Stream', icon: BookOpen },
        // { name: 'Classwork', icon: FileText },
        { name: 'People', icon: Users },
        // { name: 'Marks', icon: Award },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div
                    className="relative rounded-2xl p-6 text-white mb-8 shadow-lg overflow-hidden"
                    style={{
                        backgroundImage: avatarPreview
                            ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${avatarPreview})`
                            : 'linear-gradient(to right, #657ED4, #4a5da0)',
                        backgroundColor: avatarPreview ? 'transparent' : '#657ED4',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: '150px',
                    }}
                >
                    <div className="relative z-10">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                <div>
                                    {isEditing ? (
                                        <div className="flex items-center gap-4">
                                            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                                                Editing {classData.title}
                                            </h1>
                                            <label
                                                htmlFor="avatar-upload"
                                                className="bg-white dark:bg-gray-700 p-2 rounded-full shadow-md cursor-pointer"
                                            >
                                                <Edit className="h-5 w-5 text-[#657ED4] dark:text-[#5AD3AF]" />
                                                <input
                                                    id="avatar-upload"
                                                    type="file"
                                                    accept="image/jpeg,image/png,image/gif"
                                                    onChange={handleAvatarChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    ) : (
                                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                                            {classData.title}
                                        </h1>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={handleSave}
                                            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-colors duration-200 font-medium shadow-md cursor-pointer"
                                            aria-label="Save changes"
                                        >
                                            <Save className="h-5 w-5 mr-2" />
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 transition-colors duration-200 font-medium shadow-md cursor-pointer"
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
                                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200 font-medium shadow-md cursor-pointer"
                                            aria-label="Edit class"
                                        >
                                            <Pencil className="h-5 w-5 mr-2" />
                                            Update
                                        </button>
                                        <button
                                            onClick={handleDeleteClick}
                                            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors duration-200 font-medium shadow-md cursor-pointer"
                                            aria-label="Delete class"
                                        >
                                            <Trash2 className="h-5 w-5 mr-2" />
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        <p className="mt-2 text-xl opacity-90 font-medium">
                            Course: {classData.course.title || 'N/A'} | Mentor:{' '}
                            {classData.mentor.fullName || 'N/A'}
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                    <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                                    activeTab === tab.name
                                        ? 'border-b-2 border-[#657ED4] dark:border-[#5AD3AF] text-[#657ED4] dark:text-[#5AD3AF]'
                                        : 'text-gray-500 hover:text-[#657ED4] dark:hover:text-[#5AD3AF]'
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
                            <ViewPosts classId={classId} />
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
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-lg border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-[#657ED4] dark:text-[#5AD3AF] mb-4">
                            Confirm Deletion
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 font-medium">
                            Are you sure you want to delete this class? This action cannot be
                            undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleCancelDelete}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 font-medium cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors duration-200 font-medium cursor-pointer"
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
