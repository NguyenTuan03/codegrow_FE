'use client';

import React from 'react';
import { Award, Calendar } from 'lucide-react';

interface User {
    _id: string;
    email: string;
    role: string;
    fullName: string;
}

// Mock grades and attendance data (replace with API call in production)
const mockGradesAttendance = [
    {
        studentId: '1',
        fullName: 'Student 1',
        grade: '85/100',
        attendance: '90%',
    },
    {
        studentId: '2',
        fullName: 'Student 2',
        grade: '78/100',
        attendance: '85%',
    },
    {
        studentId: '3',
        fullName: 'Student 3',
        grade: '92/100',
        attendance: '95%',
    },
];

interface MarksAttendanceProps {
    students: User[];
}

const MarksAttendance: React.FC<MarksAttendanceProps> = ({ students }) => {
    const gradesAttendance = students.map((student, index) => ({
        studentId: student._id,
        fullName: student.fullName,
        grade: mockGradesAttendance[index % mockGradesAttendance.length].grade,
        attendance: mockGradesAttendance[index % mockGradesAttendance.length].attendance,
    }));

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                <Award className="w-6 h-6 text-[#5AD3AF]" />
                Grades & Attendance
            </h2>
            <div className="space-y-6">
                {gradesAttendance.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-12 text-base">
                        No grades or attendance data available.
                    </p>
                ) : (
                    gradesAttendance.map((record, index) => (
                        <div
                            key={record.studentId}
                            className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md animate-fade-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                                        {record.fullName}
                                    </p>
                                    <div className="mt-2 flex items-center gap-3">
                                        <Award className="w-4 h-4 text-[#5AD3AF]" />
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Grade: {record.grade}
                                        </p>
                                    </div>
                                    <div className="mt-1 flex items-center gap-3">
                                        <Calendar className="w-4 h-4 text-[#5AD3AF]" />
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Attendance: {record.attendance}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MarksAttendance;
