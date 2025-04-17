'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GetClass } from '@/lib/services/mentor/getclass';
import { format } from 'date-fns'; // Import date-fns for consistent date formatting

export default function Classes() {
    interface ClassItem {
        _id: string;
        title: string;
        description: string;
        students: string[];
        schedule: {
            startDate: string;
            endDate: string;
            daysOfWeek: string[];
            time: string;
        };
    }

    const [classesItems, setClassesItems] = useState<ClassItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchClasses = async () => {
        try {
            const data = await GetClass();
            console.log('Fetched classes:', data);

            setClassesItems(data.metadata.classes); // Adjusted to match the provided data structure
            if (data.metadata.classes.length === 0) {
                console.log('No classes found');
            } else {
                console.log('Classes fetched successfully:', data.metadata.classes);
            }
        } catch (error) {
            console.error('Failed to fetch classes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                List of Classes
            </h1>
            {loading ? (
                <div className="text-center text-gray-600 dark:text-gray-400">Loading...</div>
            ) : (
                <div className="grid gap-6">
                    {classesItems.map((course) => (
                        <Link
                            key={course._id}
                            href={`/admin/classes/${course._id}`}
                            className="block border rounded-lg overflow-hidden hover:shadow-md transition border-gray-200 dark:border-gray-700"
                        >
                            {/* Course Details */}
                            <div className="p-4">
                                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                                    {course.title}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-2">
                                    {course.description}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 mb-2">
                                    Students: {course.students.length}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 mb-2">
                                    Schedule: {course.schedule.daysOfWeek.join(', ')} |{' '}
                                    {course.schedule.time}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Start Date:{' '}
                                    {format(new Date(course.schedule.startDate), 'MM/dd/yyyy')}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    End Date:{' '}
                                    {format(new Date(course.schedule.endDate), 'MM/dd/yyyy')}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
