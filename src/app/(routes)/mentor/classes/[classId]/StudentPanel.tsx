'use client';

import { Users } from 'lucide-react';

interface Student {
    _id: string;
    fullName: string;
}

interface StudentsPanelProps {
    classData: { students: Student[] };
}

export default function StudentsPanel({ classData }: StudentsPanelProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Users className="w-6 h-6 text-[#657ED4] dark:text-[#5AD3AF]" />
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        Students
                    </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-base">
                    Total: {classData.students.length} students
                </p>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                    {classData.students.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                            No students in this class yet.
                        </p>
                    ) : (
                        classData.students.map((student, index) => (
                            <div
                                key={student._id}
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 animate-fade-in"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-[#657ED4] dark:bg-[#5AD3AF] flex items-center justify-center mr-3">
                                        <span className="text-base font-medium text-white">
                                            {student.fullName.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="text-gray-900 dark:text-gray-100 text-base">
                                        {student.fullName}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
