import { Users } from 'lucide-react';

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
    category: { _id: string; name: string };
    createdAt: string;
    author: {
        _id: string;
        fullName: string;
        role: string;
        email: string;
    };
    isDeleted?: boolean;
    enrolledCount?: number;
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

interface StudentsPanelProps {
    classData: ClassItem;
}

export default function StudentsPanel({ classData }: StudentsPanelProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-[#5AD3AF]" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    Students
                </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-base">
                Total: {classData.students.length} students
            </p>
            <div className="space-y-3 max-h-96 overflow-y-auto">
                {classData.students.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                        No students in this class yet.
                    </p>
                ) : (
                    classData.students.map((student) => (
                        <div
                            key={student._id}
                            className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
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
                    ))
                )}
            </div>
        </div>
    );
}
