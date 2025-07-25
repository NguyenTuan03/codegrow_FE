'use client';

import React from 'react';
import { FileText, Calendar } from 'lucide-react';

// Mock assignment data (replace with API call in production)
const mockAssignments = [
    {
        id: '1',
        title: 'Học từ vựng Bài 4-5 via blm',
        postedBy: 'Nguyen Thuong Huyen (K16_HCM)',
        date: '14 Dec 2023',
        link: 'https://example.com/assignment1',
    },
    {
        id: '2',
        title: 'Ôn tập cấu trúc 4 - Từ vựng',
        postedBy: 'Nguyen Thuong Huyen (K16_HCM)',
        date: '20 Dec 2023',
        link: 'https://example.com/assignment2',
    },
    {
        id: '3',
        title: 'Chỉ tín số tiết và thk',
        postedBy: 'Nguyen Thuong Huyen (K16_HCM)',
        date: '14 Dec 2023',
        link: 'https://example.com/assignment3',
    },
];

const Assignments: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#657ED4] dark:text-[#5AD3AF]" />
                Assignments
            </h2>
            <div className="space-y-6">
                {mockAssignments.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-12 text-base">
                        No assignments yet.
                    </p>
                ) : (
                    mockAssignments.map((assignment, index) => (
                        <div
                            key={assignment.id}
                            className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md animate-fade-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                                        {assignment.postedBy}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        Posted a new assignment: {assignment.title}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-3">
                                <Calendar className="w-4 h-4 text-[#657ED4] dark:text-[#5AD3AF]" />
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {assignment.date}
                                </p>
                            </div>
                            <div className="mt-4">
                                <a
                                    href={assignment.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 dark:text-blue-400 hover:underline text-sm"
                                >
                                    View Assignment
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Assignments;
