'use client';

import { Users } from 'lucide-react';

interface Student {
    _id: string;
    fullName: string;
}

interface StudentsPanelProps {
    students: Student[];
    classData: { students: Student[] };
}

export default function StudentsPanel({ classData }: StudentsPanelProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
                    <Users className="w-6 h-6 text-[#5AD3AF]" />
                    Students
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                    Total: {classData.students.length} students
                </p>
                <div className="space-y-3">
                    {classData.students.map((student, index) => (
                        <div
                            key={student._id}
                            className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 animate-fade-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="h-10 w-10 rounded-full bg-[#5AD3AF] flex items-center justify-center mr-3">
                                <span className="text-sm font-medium text-white">
                                    {student.fullName.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <span className="text-gray-900 dark:text-gray-100 text-base">
                                {student.fullName}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
