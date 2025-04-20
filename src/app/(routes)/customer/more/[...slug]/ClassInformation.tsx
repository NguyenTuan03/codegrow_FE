// @/app/(routes)/customer/more/[...slug]/ClassInformation.tsx
'use client';

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

interface ClassInfoProps {
    classData: ClassItem;
}

export default function ClassInfo({ classData }: ClassInfoProps) {
    return (
        <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 sm:p-8 transition-colors duration-300 border border-[#EEF1EF] dark:border-[#657ED4]/30">
                <h2 className="text-xl sm:text-2xl font-semibold text-[#657ED4] dark:text-[#5AD3AF] mb-6">
                    Class Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {classData.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-medium text-[#657ED4] dark:text-[#5AD3AF]">Course</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {classData.course.title || 'N/A'}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-medium text-[#657ED4] dark:text-[#5AD3AF]">
                            Course Description
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {classData.course.description || 'N/A'}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-medium text-[#657ED4] dark:text-[#5AD3AF]">
                            Course Price
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {classData.course.price ? `${classData.course.price} VND` : 'N/A'}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-medium text-[#657ED4] dark:text-[#5AD3AF]">
                            Course Category
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {classData.course.category || 'N/A'}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-medium text-[#657ED4] dark:text-[#5AD3AF]">
                            Course Created At
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {classData.course.createdAt
                                ? new Date(classData.course.createdAt).toLocaleDateString()
                                : 'N/A'}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-medium text-[#657ED4] dark:text-[#5AD3AF]">
                            Course Author
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {classData.course.author || 'N/A'}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-medium text-[#657ED4] dark:text-[#5AD3AF]">Mentor</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {classData.mentor.fullName || 'N/A'}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-medium text-[#657ED4] dark:text-[#5AD3AF]">
                            Max Students
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {classData.maxStudents || 'N/A'}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-medium text-[#657ED4] dark:text-[#5AD3AF]">Status</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {classData.status || 'N/A'}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-medium text-[#657ED4] dark:text-[#5AD3AF]">
                            Start Date
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {classData.schedule.startDate
                                ? new Date(classData.schedule.startDate).toLocaleDateString()
                                : 'N/A'}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-medium text-[#657ED4] dark:text-[#5AD3AF]">End Date</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {classData.schedule.endDate
                                ? new Date(classData.schedule.endDate).toLocaleDateString()
                                : 'N/A'}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-medium text-[#657ED4] dark:text-[#5AD3AF]">
                            Class Time
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {classData.schedule.time || 'N/A'}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-medium text-[#657ED4] dark:text-[#5AD3AF]">
                            Class Days
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {classData.schedule.daysOfWeek?.join(', ') || 'N/A'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
