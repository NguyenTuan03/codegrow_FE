'use client';

import Link from 'next/link';

type EnrolledCoursesProps = {
    courses: {
        _id: string;
        title: string;
        category: string;
        price: number;
    }[];
};

const ProfileEnrollCourse = ({ courses }: EnrolledCoursesProps) => {
    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Các khóa học đã đăng ký
            </h2>
            {courses.length > 0 ? (
                <ul className="space-y-4">
                    {courses.map((course) => (
                        <li
                            key={course._id}
                            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm flex justify-between items-center"
                        >
                            <div>
                                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                                    {course.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {course.category} - {course.price.toLocaleString()} VNĐ
                                </p>
                            </div>
                            <Link
                                href={`/customer/courses/${course._id}`}
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Xem chi tiết
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600 dark:text-gray-400">Bạn chưa đăng ký khóa học nào.</p>
            )}
        </div>
    );
};

export default ProfileEnrollCourse;
