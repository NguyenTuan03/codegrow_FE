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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 transition-colors duration-300">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Enrolled Students
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
                Total Students: <span className="font-medium">{students.length}</span>
            </p>
            {students.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-300">
                    No students enrolled in this course.
                </p>
            ) : (
                <ul className="space-y-4">
                    {students.map((student) => (
                        <li
                            key={student._id}
                            className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-lg p-4"
                        >
                            <div>
                                <p className="text-gray-800 dark:text-gray-100 font-medium">
                                    {student.fullName}
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    {student.email}
                                </p>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
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
