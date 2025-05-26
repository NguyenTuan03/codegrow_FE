// @/components/CourseInformation.tsx
'use client';

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
    // author :  string;
    isDeleted?: boolean;
    enrolledCount?: number;
}

interface Mentor {
    _id: string;
    fullName: string;
    email: string;
    role: string;
}

interface Category {
    _id: string;
    name: string;
}

interface CourseInformationProps {
    courseData: Course;
    formData: Course | null;
    setFormData: React.Dispatch<React.SetStateAction<Course | null>>;
    categories: Category[];
    author: Mentor[];
}

export default function CourseInformation({ courseData }: CourseInformationProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 sm:p-8 transition-colors duration-300 border border-[#EEF1EF] dark:border-[#657ED4]/30">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#657ED4] dark:text-[#5AD3AF] mb-6">
                Course Information
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {courseData.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-medium text-[#657ED4] dark:text-[#5AD3AF]">Category</h3>
                    <p className="text-gray-600 dark:text-gray-400">{courseData.category.name}</p>
                </div>
                <div>
                    <h3 className="font-medium text-[#657ED4] dark:text-[#5AD3AF]">Price</h3>
                    <p className="text-gray-600 dark:text-gray-400">${courseData.price}</p>
                </div>
                <div>
                    <h3 className="font-medium text-[#657ED4] dark:text-[#5AD3AF]">Author</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        {courseData.author?.fullName}
                        {/* {courseData.author} */}
                    </p>
                </div>
                <div>
                    <h3 className="font-medium text-[#657ED4] dark:text-[#5AD3AF]">Created At</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        {new Date(courseData.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
}
