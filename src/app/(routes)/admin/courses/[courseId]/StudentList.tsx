import React from 'react';

interface Student {
    _id: string;
    fullName: string;
    email: string;
    role: string;
}

interface StudentListProps {
    students: Student[];
}

const StudentList: React.FC<StudentListProps> = ({ students }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 transition-colors duration-300 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-[#657ED4] dark:text-[#5AD3AF] mb-4">
                Enrolled Students
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 font-medium">
                Total Students: <span className="font-semibold">{students.length}</span>
            </p>
            {students.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                    No students enrolled in this course.
                </p>
            ) : (
                <ul className="space-y-4">
                    {students.map((student) => (
                        <li
                            key={student._id}
                            className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200"
                        >
                            <div>
                                <p className="text-gray-800 dark:text-gray-100 font-semibold">
                                    {student.fullName}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                                    {student.email}
                                </p>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                {student.role}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default StudentList;
