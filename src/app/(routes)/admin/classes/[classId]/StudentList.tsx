import { Button } from '@/components/ui/button';
import { UserPlus, X } from 'lucide-react';

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

interface Student {
    _id: string;
    fullName: string;
}

interface StudentsPanelProps {
    classData: ClassItem;
    students: Student[];
    studentsLoading: boolean;
    isModalOpen: boolean;
    handleOpenModal: () => void;
    handleCloseModal: () => void;
    handleAddStudent: (_id: string, fullName: string) => void;
}

export default function StudentsPanel({
    classData,
    students,
    studentsLoading,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    handleAddStudent,
}: StudentsPanelProps) {
    return (
        <>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 transition-colors duration-300">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    Students
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Total: {classData.students.length} students
                </p>
                <div className="space-y-3">
                    {classData.students.map((student) => (
                        <div
                            key={student._id}
                            className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mr-3">
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {student.fullName.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <span className="text-gray-900 dark:text-gray-100">
                                {student.fullName}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="mt-6">
                    <Button
                        onClick={handleOpenModal}
                        className="flex cursor-pointer items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200 w-full"
                    >
                        <UserPlus className="h-5 w-5  mr-2" />
                        Add Student
                    </Button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                Select Student
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                                title="Close Modal"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        {studentsLoading ? (
                            <div className="flex justify-center items-center h-32">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
                            </div>
                        ) : students.length === 0 ? (
                            <p className="text-gray-600 dark:text-gray-300 text-center">
                                No students available
                            </p>
                        ) : (
                            <div className="max-h-96 overflow-y-auto">
                                <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
                                    <thead>
                                        <tr className="bg-gray-100 dark:bg-gray-700">
                                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-800 dark:text-gray-100">
                                                Full Name
                                            </th>
                                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-800 dark:text-gray-100">
                                                Role
                                            </th>
                                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center text-gray-800 dark:text-gray-100">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student) => (
                                            <tr
                                                key={student._id}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                            >
                                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                                                    {student.fullName}
                                                </td>
                                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                                                    Customer
                                                </td>
                                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">
                                                    <button
                                                        onClick={() =>
                                                            handleAddStudent(
                                                                student._id,
                                                                student.fullName,
                                                            )
                                                        }
                                                        className="px-3 py-1 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
                                                    >
                                                        Add
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
