'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { viewDetail } from '@/lib/services/class/viewdetail';
import ClassInfo from '@/app/(routes)/customer/classes/[...classId]/ClassInformation';
import StudentsPanel from '@/app/(routes)/customer/classes/[...classId]/StudentList';
import Stream from './Stream';

import { BookOpen, Users, FileText, Award } from 'lucide-react';
import Assignments from './Assignment';
import MarksAttendance from './MarkAttendance';

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
    imgUrl?: string;
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

export default function ClassDetailPage() {
    const { classId } = useParams<{ classId: string }>();

    const [classData, setClassData] = useState<ClassItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Stream');

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
                    course: {
                        _id: metadata.course?._id || '',
                        title: metadata.course?.title || 'N/A',
                        description: metadata.course?.description || '',
                        price: metadata.course?.price ?? 0,

                        category: metadata.course?.category || { _id: '', name: '' },
                        createdAt: metadata.course?.createdAt || '',
                        author: metadata.course?.author || {
                            _id: '',
                            fullName: '',
                            email: '',
                            role: '',
                        },
                    },
                    mentor: metadata.mentor || {
                        _id: '',
                        fullName: 'N/A',
                        email: '',
                        role: '',
                    },
                };

                setClassData(normalizedData);
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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5AD3AF] transition-opacity duration-300"></div>
            </div>
        );
    }

    if (!classData || !classData.schedule) {
        return (
            <div className="text-center text-gray-600 dark:text-gray-300 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
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
                <div className="relative bg-[#657ED4] dark:bg-[#5AD3AF] rounded-xl p-6 text-white mb-8">
                    <h1 className="text-4xl sm:text-4xl font-bold tracking-tight">
                        {classData.title}
                    </h1>
                    <p className="mt-2 text-xl opacity-90">
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
                                        ? 'border-b-2 border-[#657ED4] text-[#657ED4] dark:text-[#5AD3AF] dark:border-[#5AD3AF]'
                                        : 'text-gray-500 dard:border-[#5AD3AF] dark:text-[#5AD3AF]  hover:text-gray-700 dark:hover:text-gray-300'
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
                            <ClassInfo classData={classData} />
                        </div>
                        <div className="lg:col-span-2">
                            <Stream />
                        </div>
                    </div>
                )}

                {activeTab === 'Classwork' && <Assignments classId={classData._id} />}

                {activeTab === 'People' && (
                    <div className="max-w-3xl mx-auto">
                        <StudentsPanel classData={classData} />
                    </div>
                )}

                {activeTab === 'Marks' && <MarksAttendance students={classData.students} />}
            </div>
        </div>
    );
}
