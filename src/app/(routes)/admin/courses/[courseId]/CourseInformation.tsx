// @/components/CourseInformation.tsx
'use client';

import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

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
    isEditing: boolean;
    formData: Course | null;
    setFormData: React.Dispatch<React.SetStateAction<Course | null>>;
    categories: Category[];
    author: Mentor[];
    // author :  string;
}

export default function CourseInformation({
    courseData,
    isEditing,
    formData,
    setFormData,
    categories,
    author,
}: CourseInformationProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 sm:p-8 transition-colors duration-300 border border-[#EEF1EF] dark:border-[#657ED4]/30">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#657ED4] dark:text-[#5AD3AF] mb-6">
                Course Information
            </h2>
            {isEditing ? (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                            Title
                        </label>
                        <Input
                            type="text"
                            value={formData?.title || ''}
                            onChange={(e) =>
                                setFormData((prev) =>
                                    prev ? { ...prev, title: e.target.value } : prev,
                                )
                            }
                            className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-[#5AD3AF] dark:focus:border-[#5AD3AF] focus:ring-[#5AD3AF] dark:focus:ring-[#5AD3AF] sm:text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                            Description
                        </label>
                        <Input
                            type="text"
                            value={formData?.description || ''}
                            onChange={(e) =>
                                setFormData((prev) =>
                                    prev ? { ...prev, description: e.target.value } : prev,
                                )
                            }
                            className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-[#5AD3AF] dark:focus:border-[#5AD3AF] focus:ring-[#5AD3AF] dark:focus:ring-[#5AD3AF] sm:text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                            Price
                        </label>
                        <Input
                            type="number"
                            value={formData?.price || ''}
                            onChange={(e) =>
                                setFormData((prev) =>
                                    prev ? { ...prev, price: parseFloat(e.target.value) } : prev,
                                )
                            }
                            className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-[#5AD3AF] dark:focus:border-[#5AD3AF] focus:ring-[#5AD3AF] dark:focus:ring-[#5AD3AF] sm:text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                            Category
                        </label>
                        <Select
                            value={formData?.category?._id || ''}
                            onValueChange={(value) =>
                                setFormData((prev) =>
                                    prev
                                        ? {
                                              ...prev,
                                              category: {
                                                  ...prev.category,
                                                  _id: value,
                                                  name:
                                                      categories.find((c) => c._id === value)
                                                          ?.name || '',
                                              },
                                          }
                                        : prev,
                                )
                            }
                        >
                            <SelectTrigger className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-[#5AD3AF] dark:focus:border-[#5AD3AF] focus:ring-[#5AD3AF] dark:focus:ring-[#5AD3AF] sm:text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600">
                                {categories &&
                                    categories.map((category) => (
                                        <SelectItem
                                            key={category._id}
                                            value={category._id}
                                            className="hover:bg-[#EEF1EF] dark:hover:bg-gray-700"
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                            Author
                        </label>
                        <Select
                            value={formData?.author?._id || ''}
                            onValueChange={(value) =>
                                setFormData((prev) =>
                                    prev
                                        ? {
                                              ...prev,
                                              author: {
                                                  ...prev.author,
                                                  _id: value,
                                                  fullName:
                                                      author.find((a) => a._id === value)
                                                          ?.fullName || '',
                                              },
                                          }
                                        : prev,
                                )
                            }
                        >
                            <SelectTrigger className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-[#5AD3AF] dark:focus:border-[#5AD3AF] focus:ring-[#5AD3AF] dark:focus:ring-[#5AD3AF] sm:text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                <SelectValue placeholder="Select an author" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600">
                                {author.map((mentor) => (
                                    <SelectItem
                                        key={mentor._id}
                                        value={mentor._id}
                                        className="hover:bg-[#EEF1EF] dark:hover:bg-gray-700"
                                    >
                                        {mentor.fullName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            ) : (
                <>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        {courseData.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-medium text-[#657ED4] dark:text-[#5AD3AF]">
                                Category
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {courseData.category.name}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium text-[#657ED4] dark:text-[#5AD3AF]">
                                Price
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">${courseData.price}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-[#657ED4] dark:text-[#5AD3AF]">
                                Author
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {courseData.author?.fullName}
                                {/* {courseData.author} */}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium text-[#657ED4] dark:text-[#5AD3AF]">
                                Created At
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {new Date(courseData.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
