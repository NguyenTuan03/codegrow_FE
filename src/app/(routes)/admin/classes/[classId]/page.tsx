'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { viewDetail } from '@/lib/services/class/viewdetail';
import { Pencil, Trash2, Save, X, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DeleteClass } from '@/lib/services/class/deleteclass';
import { UpdateClass } from '@/lib/services/class/updateclass';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { AssignStudent } from '@/lib/services/class/assignstudent';
import { getUser } from '@/lib/services/admin/getuser';
import { GetCourses } from '@/lib/services/course/getcourse';

interface Schedule {
    startDate: string;
    endDate: string;
    time: string;
    daysOfWeek: string[];
}
interface Course {
    _id: string;
    title: string;
    description: string;
}
interface ClassItem {
    title: string;
    course: string;
    mentor: string;
    description: string;
    maxStudents: number;
    status: string;
    schedule: Schedule;
    students: string[];
}

interface Student {
    _id: string;
    fullName: string;
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

    useEffect(() => {
        fetchCourse();
    }, []);
    useEffect(() => {
        const fetchClassDetail = async () => {
            if (!classId) {
                toast({
                    title: 'Error',
                    description: 'Invalid class ID',
                    variant: 'destructive',
                });
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const data = await viewDetail(classId);
                console.log('API Response detail:', data);
                if (data?.metadata) {
                    const metadata: ClassItem = {
                        title: data.metadata.title,
                        course: data.metadata.course,
                        mentor: data.metadata.mentor,
                        description: data.metadata.description,
                        maxStudents: data.metadata.maxStudents,
                        status: data.metadata.status,
                        schedule: data.metadata.schedule,
                        students: data.metadata.students,
                    };
                    if (
                        !metadata.title ||
                        !metadata.course ||
                        !metadata.mentor ||
                        !metadata.schedule
                    ) {
                        throw new Error(
                            'Missing essential class data (title, course, mentor, or schedule)',
                        );
                    }
                    setClassData(metadata);
                    setFormData(metadata);
                } else {
                    throw new Error('Invalid class data');
                }
            } catch (error: unknown) {
                console.error('Failed to fetch class details:', error);
                toast({
                    title: 'Error',
                    description:
                        error instanceof Error ? error.message : 'Failed to load class details',
                    variant: 'destructive',
                });
                setClassData(null);
                setFormData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchClassDetail();
    }, [classId]);

    const fetchStudents = async () => {
        try {
            setStudentsLoading(true);

            const response = await getUser();
            console.log('getUser Response:', response.metadata.users);

            const customers = response.metadata.users
                .filter((user: { role: string }) => user.role === 'customer')
                .map((user: { _id: string; fullName: string; role: string }) => ({
                    _id: user._id,
                    fullName: user.fullName,
                }));
            setStudents(customers);
            console.log('Filtered students:', customers);
            // Lưu danh sách người dùng vào state
        } catch (error) {
            console.error('Failed to fetch students:', error);
            toast({
                title: 'Error',
                description:
                    error instanceof Error
                        ? error.message
                        : 'Failed to load student list. Please try again.',
                variant: 'destructive',
            });
            setStudents([]); // Đặt danh sách người dùng thành rỗng nếu có lỗi
        } finally {
            setStudentsLoading(false);
        }
    };

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
            !course ||
            !mentor ||
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
                course,
                mentor,
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
            });
            router.push('/classes');
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
            if (response.status === 'success') {
                setClassData((prev) =>
                    prev ? { ...prev, students: [...prev.students, fullName] } : prev,
                );
                setFormData((prev) =>
                    prev ? { ...prev, students: [...prev.students, fullName] } : prev,
                );
                setIsModalOpen(false);
                toast({
                    title: 'Success',
                    description: 'Student added successfully',
                    variant: 'default',
                });
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
        const days = formData.schedule.daysOfWeek.includes(day)
            ? formData.schedule.daysOfWeek.filter((d) => d !== day)
            : [...formData.schedule.daysOfWeek, day];
        setFormData({
            ...formData,
            schedule: { ...formData.schedule, daysOfWeek: days },
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

    const daysOfWeekOptions = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto p-6 sm:p-8">
                {/* Header with Buttons */}
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
                                    onClick={handleDelete}
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

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Class Information */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 transition-colors duration-300">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                                Class Information
                            </h2>
                            {isEditing ? (
                                <>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="title"
                                            className="block text-gray-700 dark:text-gray-200 font-medium mb-1"
                                        >
                                            Title
                                        </label>
                                        <Input
                                            id="title"
                                            type="text"
                                            value={formData?.title || ''}
                                            onChange={(e) => handleInputChange(e, 'title')}
                                            className="w-full"
                                            placeholder="Enter class title"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="course"
                                            className="block text-gray-700 dark:text-gray-200 font-medium mb-1"
                                        >
                                            Course
                                        </label>

                                        <select
                                            id="course"
                                            value={formData?.course || ''}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData!,
                                                    course: e.target.value,
                                                })
                                            }
                                            className="w-full border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                        >
                                            <option value="" disabled>
                                                Select a course
                                            </option>
                                            {courses.map((course) => (
                                                <option key={course._id} value={course._id}>
                                                    {course.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="mentor"
                                            className="block text-gray-700 dark:text-gray-200 font-medium mb-1"
                                        >
                                            Mentor
                                        </label>
                                        <Input
                                            id="mentor"
                                            type="text"
                                            value={formData?.mentor || ''}
                                            onChange={(e) => handleInputChange(e, 'mentor')}
                                            className="w-full"
                                            placeholder="Enter mentor name"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="description"
                                            className="block text-gray-700 dark:text-gray-200 font-medium mb-1"
                                        >
                                            Description
                                        </label>
                                        <Textarea
                                            id="description"
                                            value={formData?.description || ''}
                                            onChange={(e) => handleInputChange(e, 'description')}
                                            className="w-full"
                                            rows={4}
                                            placeholder="Enter class description"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="maxStudents"
                                            className="block text-gray-700 dark:text-gray-200 font-medium mb-1"
                                        >
                                            Max Students
                                        </label>
                                        <Input
                                            id="maxStudents"
                                            type="number"
                                            value={formData?.maxStudents || 0}
                                            onChange={(e) => handleInputChange(e, 'maxStudents')}
                                            className="w-full"
                                            placeholder="Enter maximum number of students"
                                            min="1"
                                            max="30"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="status"
                                            className="block text-gray-700 dark:text-gray-200 font-medium mb-1"
                                        >
                                            Status
                                        </label>
                                        <select
                                            id="status"
                                            value={formData?.status || ''}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData!,
                                                    status: e.target.value,
                                                })
                                            }
                                            className="w-full border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                        >
                                            <option value="open">Open</option>
                                            <option value="closed">Closed</option>
                                            <option value="in-progress">In Progress</option>
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                htmlFor="startDate"
                                                className="block text-gray-700 dark:text-gray-200 font-medium mb-1"
                                            >
                                                Start Date
                                            </label>
                                            <Input
                                                id="startDate"
                                                type="date"
                                                value={
                                                    formData?.schedule?.startDate?.split('T')[0] ||
                                                    ''
                                                }
                                                onChange={(e) => handleInputChange(e, 'startDate')}
                                                className="w-full"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="endDate"
                                                className="block text-gray-700 dark:text-gray-200 font-medium mb-1"
                                            >
                                                End Date
                                            </label>
                                            <Input
                                                id="endDate"
                                                type="date"
                                                value={
                                                    formData?.schedule?.endDate?.split('T')[0] || ''
                                                }
                                                onChange={(e) => handleInputChange(e, 'endDate')}
                                                className="w-full"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="time"
                                                className="block text-gray-700 dark:text-gray-200 font-medium mb-1"
                                            >
                                                Class Time
                                            </label>
                                            <Select
                                                value={formData?.schedule?.time || '19:00-21:00'}
                                                onValueChange={(value) => {
                                                    if (formData) {
                                                        setFormData({
                                                            ...formData,
                                                            schedule: {
                                                                ...formData.schedule,
                                                                time: value,
                                                            },
                                                        });
                                                    }
                                                }}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select time" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white dark:bg-gray-800">
                                                    {[
                                                        {
                                                            value: '07:00-09:00',
                                                            label: '7:00 - 9:00',
                                                        },
                                                        {
                                                            value: '09:00-11:00',
                                                            label: '9:00 - 11:00',
                                                        },
                                                        {
                                                            value: '11:00-13:00',
                                                            label: '11:00 - 13:00',
                                                        },
                                                        {
                                                            value: '13:00-15:00',
                                                            label: '13:00 - 15:00',
                                                        },
                                                        {
                                                            value: '15:00-17:00',
                                                            label: '15:00 - 17:00',
                                                        },
                                                        {
                                                            value: '17:00-19:00',
                                                            label: '17:00 - 19:00',
                                                        },
                                                        {
                                                            value: '19:00-21:00',
                                                            label: '19:00 - 21:00',
                                                        },
                                                    ].map((time) => (
                                                        <SelectItem
                                                            key={time.value}
                                                            value={time.value}
                                                        >
                                                            {time.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <fieldset>
                                                <legend className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
                                                    Class Days
                                                </legend>
                                                <div className="flex flex-wrap gap-2">
                                                    {daysOfWeekOptions.map((day) => (
                                                        <label
                                                            key={day}
                                                            htmlFor={`day-${day.toLowerCase()}`}
                                                            className="flex items-center gap-1"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                id={`day-${day.toLowerCase()}`}
                                                                checked={
                                                                    formData?.schedule?.daysOfWeek.includes(
                                                                        day,
                                                                    ) || false
                                                                }
                                                                onChange={() =>
                                                                    handleDayChange(day)
                                                                }
                                                                className="h-4 w-4 text-blue-600 dark:text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                                                            />
                                                            <span className="text-gray-700 dark:text-gray-200">
                                                                {day}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                        {classData.description}
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                                Course
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {classData.course || 'N/A'}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                                Mentor
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {classData.mentor || 'N/A'}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                                Max Students
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {classData.maxStudents || 'N/A'}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                                Status
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {classData.status || 'N/A'}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                                Start Date
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {classData.schedule.startDate
                                                    ? new Date(
                                                          classData.schedule.startDate,
                                                      ).toLocaleDateString()
                                                    : 'N/A'}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                                End Date
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {classData.schedule.endDate
                                                    ? new Date(
                                                          classData.schedule.endDate,
                                                      ).toLocaleDateString()
                                                    : 'N/A'}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                                Class Time
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {classData.schedule.time || 'N/A'}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                                Class Days
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {classData.schedule.daysOfWeek?.join(', ') || 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Students */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 transition-colors duration-300">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                            Students
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Total: {classData.students.length} students
                        </p>
                        <div className="space-y-3">
                            {classData.students.map((student: string | Student, index) => (
                                <div
                                    key={index}
                                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                >
                                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mr-3">
                                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {typeof student === 'string'
                                                ? student.charAt(0).toUpperCase()
                                                : student.fullName.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="text-gray-900 dark:text-gray-100">
                                        {typeof student === 'string' ? student : student.fullName}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6">
                            <Button
                                onClick={handleOpenModal}
                                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200 w-full"
                            >
                                <UserPlus className="h-5 w-5 mr-2" />
                                Add Student
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Modal for Student Selection */}

                {isModalOpen && (
                    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                    Select Student
                                </h2>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                                    title="Close Modal"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                            {studentsLoading ? (
                                <div className="flex justify-center items-center h-32">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
                                </div>
                            ) : students.length === 0 ? (
                                <p className="text-gray-600 dark:text-gray-300 text-center">
                                    No students available
                                </p>
                            ) : (
                                <div className="max-h-96 overflow-y-auto">
                                    <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
                                        <thead>
                                            <tr className="bg-gray-100 dark:bg-gray-700">
                                                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-800 dark:text-gray-100">
                                                    Full Name
                                                </th>
                                                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-800 dark:text-gray-100">
                                                    Role
                                                </th>
                                                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center text-gray-800 dark:text-gray-100">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {students.map((student) => (
                                                <tr
                                                    key={student._id}
                                                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                                >
                                                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                                                        {student.fullName}
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                                                        Customer
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">
                                                        <button
                                                            onClick={() =>
                                                                handleAddStudent(
                                                                    student._id,
                                                                    student.fullName,
                                                                )
                                                            }
                                                            className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
                                                        >
                                                            Add
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
