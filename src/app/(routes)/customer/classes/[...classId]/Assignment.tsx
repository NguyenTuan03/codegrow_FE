'use client';

import React, { useEffect, useState } from 'react';
import { FileText, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

// Mock assignment data (replace with API call in production)
const mockAssignments = [
    {
        id: '1',
        title: 'Học từ vựng Bài 4-5 via blm',
        postedBy: 'Nguyen Thuong Huyen (K16_HCM)',
        date: '14 Dec 2023',
        link: 'https://example.com/assignment1',
        dueDate: '20 Dec 2023',
        description: 'Complete the vocabulary exercises for lessons 4 and 5.',
    },
    {
        id: '2',
        title: 'Ôn tập cấu trúc 4 - Từ vựng',
        postedBy: 'Nguyen Thuong Huyen (K16_HCM)',
        date: '20 Dec 2023',
        link: 'https://example.com/assignment2',
        dueDate: '25 Dec 2023',
        description: 'Review grammar structures and vocabulary for lesson 4.',
    },
    {
        id: '3',
        title: 'Chỉ tín số tiết và thk',
        postedBy: 'Nguyen Thuong Huyen (K16_HCM)',
        date: '14 Dec 2023',
        link: 'https://example.com/assignment3',
        dueDate: '21 Dec 2023',
        description: 'Submit your answers for the specified lessons.',
    },
];

interface AssignmentsProps {
    classId: string;
}

const Assignments: React.FC<AssignmentsProps> = ({ classId }) => {
    const router = useRouter();
    const [assignments, setAssignments] = useState(mockAssignments);

    // In production, fetch assignments for the class
    useEffect(() => {
        // Example API call to fetch assignments
        const fetchAssignments = async () => {
            const response = await fetch(`/api/classes/${classId}/assignments`);
            const data = await response.json();
            setAssignments(data);
        };
        fetchAssignments();
    }, [classId]);

    const handleTakeAssignment = (assignmentId: string) => {
        // Navigate to a submission page for the assignment
        router.push(`/customer/classes/${classId}/assignments/${assignmentId}/submit`);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#657ED4] dark:text-[#5AD3AF]" />
                Assignments
            </h2>
            <div className="space-y-6">
                {assignments.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-12 text-base">
                        No assignments yet.
                    </p>
                ) : (
                    assignments.map((assignment, index) => (
                        <div
                            key={assignment.id}
                            className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md animate-fade-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <p className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                                        {assignment.postedBy}
                                    </p>
                                    <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
                                        Posted a new assignment: {assignment.title}
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-300 mt-2 text-base">
                                        {assignment.description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between flex-wrap gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-[#657ED4] dark:text-[#5AD3AF]" />
                                        <p className="text-base text-gray-600 dark:text-gray-400">
                                            Posted on: {assignment.date}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-[#657ED4] dark:text-[#5AD3AF]" />
                                        <p className="text-base text-gray-600 dark:text-gray-400">
                                            Due by: {assignment.dueDate}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <a
                                        href={assignment.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 dark:text-blue-400 hover:underline text-base flex items-center"
                                    >
                                        View Assignment
                                    </a>
                                    <Button
                                        onClick={() => handleTakeAssignment(assignment.id)}
                                        className="bg-[#657ED4] dark:bg-[#5AD3AF] rounded-lg hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0]  text-white px-4 py-1 text-sm transition-colors duration-200"
                                    >
                                        Take Assignment
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Assignments;
