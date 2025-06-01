'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

// Interface for an instructor
interface Instructor {
    value: string;
    name: string;
}

const MentorCalendar: React.FC = () => {
    const [selectedInstructor, setSelectedInstructor] = useState<string>(''); // State for selected instructor

    // List of instructors
    const instructors: Instructor[] = [
        { value: 'darlene', name: 'Darlene Robertson' },
        { value: 'marvin', name: 'Marvin McKinney' },
        { value: 'albert', name: 'Albert Flores' },
    ];

    // Handle instructor selection
    const handleInstructorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedInstructor(value);
        console.log(
            `[Sunday, June 01, 2025, 09:57 PM +07] Selected instructor:`,
            instructors.find((instructor) => instructor.value === value)?.name || 'None',
        );
    };

    return (
        <div className="min-h-screen bg-[#f5f6fa] dark:bg-gray-900 p-6 transition-colors duration-300">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Daily Weekly List Calendar Attendance
                </h1>
                <div className="flex space-x-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="px-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Daily
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="px-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Weekly
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="px-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        List
                    </Button>
                    <Button
                        variant="default"
                        size="sm"
                        className="px-3 bg-[#657ED4] dark:bg-[#5AD3AF] text-white hover:bg-[#424c70] dark:hover:bg-[#4ac2a0]"
                    >
                        Calendar
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="px-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Attendance
                    </Button>
                </div>
            </div>

            <div className="flex gap-6">
                {/* Main content */}
                <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    {/* Public/Private toggle */}
                    <div className="flex space-x-2 mb-4">
                        <Button
                            variant="outline"
                            size="sm"
                            className="px-4 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            Public
                        </Button>
                        <Button
                            variant="default"
                            size="sm"
                            className="px-4 bg-[#657ED4] dark:bg-[#5AD3AF] text-white hover:bg-[#424c70] dark:hover:bg-[#4ac2a0]"
                        >
                            Private
                        </Button>
                    </div>

                    {/* Instructor dropdown */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 cursor-default">
                            Select Instructor
                        </label>
                        <div className="relative w-[200px]">
                            <select
                                value={selectedInstructor}
                                onChange={handleInstructorChange}
                                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] rounded-lg shadow-sm px-3 py-2 pr-8 appearance-none cursor-pointer"
                            >
                                <option value="" className="text-gray-500 dark:text-gray-400">
                                    No Instructor
                                </option>
                                {instructors.map((instructor) => (
                                    <option
                                        key={instructor.value}
                                        value={instructor.value}
                                        className="text-gray-900 dark:text-gray-100"
                                    >
                                        {instructor.name}
                                    </option>
                                ))}
                            </select>
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>

                    {/* Time slots */}
                    <div className="space-y-4">
                        {/* 9:00 AM */}
                        <div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                9:00 AM
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center p-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                                    <span className="text-gray-900 dark:text-gray-100">
                                        Private Lesson
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                                    <span className="text-gray-900 dark:text-gray-100">
                                        Adult LTF
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-300">
                                        8:4
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                                    <span className="text-gray-900 dark:text-gray-100">
                                        Private Lesson
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 9:30 AM */}
                        <div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                9:30 AM
                            </div>
                            <div className="flex justify-between items-center p-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                                <span className="text-gray-900 dark:text-gray-100">
                                    Private Lesson
                                </span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0]"
                                >
                                    Add Private Lesson
                                </Button>
                            </div>
                        </div>

                        {/* 10:00 AM */}
                        <div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                10:00 AM
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center p-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                                    <span className="text-gray-900 dark:text-gray-100">
                                        Private Lesson
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0]"
                                    >
                                        Add Private Lesson
                                    </Button>
                                </div>
                                <div className="flex justify-between items-center p-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                                    <span className="text-gray-900 dark:text-gray-100">
                                        Kids Learn-to-Fence
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-300">
                                        8:4 0/10
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                                    <span className="text-gray-900 dark:text-gray-100">
                                        Youth Learn-to-Fence
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-300">
                                        8:4 0/10
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 10:30 AM */}
                        <div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                10:30 AM
                            </div>
                            <div className="flex justify-between items-center p-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                                <span className="text-gray-900 dark:text-gray-100">
                                    Private Lesson
                                </span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0]"
                                >
                                    Add Private Lesson
                                </Button>
                            </div>
                        </div>

                        {/* 11:00 AM */}
                        <div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                11:00 AM
                            </div>
                            <div className="flex justify-between items-center p-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                                <span className="text-gray-900 dark:text-gray-100">
                                    Private Lesson
                                </span>
                            </div>
                        </div>

                        {/* 11:30 AM */}
                        <div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                11:30 AM
                            </div>
                            <div className="flex justify-between items-center p-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                                <span className="text-gray-900 dark:text-gray-100">
                                    Private Lesson
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MentorCalendar;
