// @/app/(routes)/customer/more/[...slug]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { viewDetail } from '@/lib/services/class/viewdetail';
import ClassInfo from '@/app/(routes)/customer/more/[...slug]/ClassInformation';

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
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5AD3AF]"></div>
            </div>
        );
    }

    if (!classData || !classData.schedule) {
        return (
            <div className="text-center text-gray-600 dark:text-gray-400 p-6">
                Class not found or invalid data
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#EEF1EF] dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#657ED4] dark:text-[#5AD3AF]">
                        {classData.title}
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <ClassInfo classData={classData} />
                </div>
            </div>
        </div>
    );
}
