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
            </div>
        </>
    );
}
