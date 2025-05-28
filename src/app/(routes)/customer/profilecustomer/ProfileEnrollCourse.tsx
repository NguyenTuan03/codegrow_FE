'use client';

import Link from 'next/link';

type EnrolledCoursesProps = {
    courses: {
        _id: string;
        title: string;
        category: { _id: string; name: string } | null;
        price: number;
    }[];
};

const ProfileEnrollCourse = ({ courses }: EnrolledCoursesProps) => {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Enrolled Courses
            </h2>
            {courses.length > 0 ? (
                <ul className="space-y-4">
                    {courses.map((course) => (
                        <li
                            key={course._id}
                            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm flex justify-between items-center"
                        >
                            <div>
                                <h3 className="text-base font-medium text-gray-800 dark:text-gray-100">
                                    {course.title}
                                </h3>
                                <p className="text-base text-gray-600 dark:text-gray-400">
                                    {course?.category?.name} - {course.price.toLocaleString()} VNĐ
                                </p>
                            </div>
                            <Link
                                href={`/customer/courses/${course._id}`}
                                className="text-blue-600 text-base dark:text-blue-400 hover:underline"
                            >
                                View detail
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600 text-base dark:text-gray-400">
                    You have not registered for any course yet.
                </p>
            )}
        </div>
    );
};

export default ProfileEnrollCourse;
