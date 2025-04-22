interface Schedule {
    startDate: string;
    endDate: string;
    time: string;
    daysOfWeek: string[];
}

interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    createdAt: string;
    author: string;
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
    mentor: User; // Use User to match ClassDetailPage
    status: string;
    maxStudents: number;
    students: User[];
    schedule: Schedule;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface ClassInfoProps {
    classData: ClassItem;
}

export default function ClassInfo({ classData }: ClassInfoProps) {
    return (
        <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 transition-colors duration-300">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    Class Information
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {classData.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                    Course
                                </h3>

                                <p className="text-gray-600 dark:text-gray-300">
                                    {classData.course.title || 'N/A'}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                    Course Description
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {classData.course.description || 'N/A'}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                    Course Price
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {classData.course.price
                                        ? `${classData.course.price} VND`
                                        : 'N/A'}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                    Course Category
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {classData.course.category || 'N/A'}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                    Course Created At
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {classData.course.createdAt
                                        ? new Date(classData.course.createdAt).toLocaleDateString()
                                        : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-700 dark:text-gray-200">
                            Course Author
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {classData.course.author || 'N/A'}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-700 dark:text-gray-200">Mentor</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {classData.mentor.fullName || 'N/A'}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-700 dark:text-gray-200">
                            Max Students
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {classData.maxStudents || 'N/A'}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-700 dark:text-gray-200">Status</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {classData.status || 'N/A'}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-700 dark:text-gray-200">Start Date</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {classData.schedule.startDate
                                ? new Date(classData.schedule.startDate).toLocaleDateString()
                                : 'N/A'}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-700 dark:text-gray-200">End Date</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {classData.schedule.endDate
                                ? new Date(classData.schedule.endDate).toLocaleDateString()
                                : 'N/A'}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-700 dark:text-gray-200">Class Time</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {classData.schedule.time || 'N/A'}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-700 dark:text-gray-200">Class Days</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {classData.schedule.daysOfWeek?.join(', ') || 'N/A'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
