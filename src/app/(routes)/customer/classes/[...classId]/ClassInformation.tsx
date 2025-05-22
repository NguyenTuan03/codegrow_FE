import { BookOpen, User, Users, Calendar, Clock, Award, FileText } from 'lucide-react';

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
        <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="w-6 h-6 text-[#5AD3AF]" />
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        Class Information
                    </h2>
                </div>
                <div className="space-y-6">
                    <div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                            {classData.description || 'No description available.'}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex items-start gap-3">
                            <BookOpen className="w-5 h-5 text-[#5AD3AF] mt-1" />
                            <div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                                    Course
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-base">
                                    {classData.course.title || 'N/A'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <FileText className="w-5 h-5 text-[#5AD3AF] mt-1" />
                            <div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                                    Course Description
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-base">
                                    {classData.course.description || 'N/A'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Award className="w-5 h-5 text-[#5AD3AF] mt-1" />
                            <div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                                    Course Price
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-base">
                                    {classData.course.price
                                        ? `${classData.course.price} VND`
                                        : 'N/A'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <BookOpen className="w-5 h-5 text-[#5AD3AF] mt-1" />
                            <div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                                    Course Category
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-base">
                                    {classData.course.category || 'N/A'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-[#5AD3AF] mt-1" />
                            <div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                                    Course Created At
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-base">
                                    {classData.course.createdAt
                                        ? new Date(classData.course.createdAt).toLocaleDateString()
                                        : 'N/A'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <User className="w-5 h-5 text-[#5AD3AF] mt-1" />
                            <div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                                    Course Author
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-base">
                                    {classData.course.author || 'N/A'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <User className="w-5 h-5 text-[#5AD3AF] mt-1" />
                            <div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                                    Mentor
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-base">
                                    {classData.mentor.fullName || 'N/A'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Users className="w-5 h-5 text-[#5AD3AF] mt-1" />
                            <div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                                    Max Students
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-base">
                                    {classData.maxStudents || 'N/A'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Award className="w-5 h-5 text-[#5AD3AF] mt-1" />
                            <div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                                    Status
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-base">
                                    {classData.status || 'N/A'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-[#5AD3AF] mt-1" />
                            <div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                                    Start Date
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-base">
                                    {classData.schedule.startDate
                                        ? new Date(
                                              classData.schedule.startDate,
                                          ).toLocaleDateString()
                                        : 'N/A'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-[#5AD3AF] mt-1" />
                            <div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                                    End Date
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-base">
                                    {classData.schedule.endDate
                                        ? new Date(classData.schedule.endDate).toLocaleDateString()
                                        : 'N/A'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Clock className="w-5 h-5 text-[#5AD3AF] mt-1" />
                            <div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                                    Class Time
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-base">
                                    {classData.schedule.time || 'N/A'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-[#5AD3AF] mt-1" />
                            <div>
                                <h3 className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                                    Class Days
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-base">
                                    {classData.schedule.daysOfWeek?.join(', ') || 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
