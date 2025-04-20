// @/app/(routes)/customer/courses/[courseId]/CourseHeader.tsx
interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    enrolledCount: number;
    author: {
        _id: string;
        fullName: string;
        email: string;
        role: string;
    };
    category: { _id: string; name: string } | null;
    createdAt: string;
}

interface CourseHeaderProps {
    course: Course | null;
}

export default function CourseHeader({ course }: CourseHeaderProps) {
    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-[#657ED4] dark:text-[#5AD3AF] mb-2">
                {course.title}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Category: {course.category?.name || 'Uncategorized'}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{course.description}</p>
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    Instructor: {course.author?.fullName || 'Unknown'}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    Enrolled: {course.enrolledCount} students
                </span>
            </div>
        </div>
    );
}
