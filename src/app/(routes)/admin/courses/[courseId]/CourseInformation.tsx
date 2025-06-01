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
    author: string;
    isDeleted?: boolean;
    enrolledCount?: number;
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
}

export default function CourseInformation({
    courseData,
    isEditing,
    formData,
    setFormData,
    categories,
}: CourseInformationProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 transition-colors duration-300 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl sm:text-2xl font-bold text-[#657ED4] dark:text-[#5AD3AF] mb-6">
                Course Information
            </h2>
            {isEditing ? (
                <div className="space-y-6">
                    <div>
                        <label className="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-2">
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
                            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-[#657ED4] dark:focus:border-[#5AD3AF] focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] sm:text-base bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200"
                        />
                    </div>
                    <div>
                        <label className="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-2">
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
                            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-[#657ED4] dark:focus:border-[#5AD3AF] focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] sm:text-base bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200"
                        />
                    </div>
                    <div>
                        <label className="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-2">
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
                            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-[#657ED4] dark:focus:border-[#5AD3AF] focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] sm:text-base bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200"
                        />
                    </div>
                    <div>
                        <label className="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-2">
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
                            <SelectTrigger className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-[#657ED4] dark:focus:border-[#5AD3AF] focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] sm:text-base bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg">
                                {categories &&
                                    categories.map((category) => (
                                        <SelectItem
                                            key={category._id}
                                            value={category._id}
                                            className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 font-medium"
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-2">
                            Author
                        </label>
                        <Input
                            type="text"
                            value={formData?.author || ''}
                            onChange={(e) =>
                                setFormData((prev) =>
                                    prev ? { ...prev, author: e.target.value } : prev,
                                )
                            }
                            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-[#657ED4] dark:focus:border-[#5AD3AF] focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] sm:text-base bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200"
                        />
                    </div>
                </div>
            ) : (
                <>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed font-medium">
                        {courseData.description}
                    </p>
                    <div className="grid grid-cols-1  sm:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold text-xl ">Category</h3>
                            <p className="text-gray-600 text-base dark:text-gray-400 font-medium">
                                {courseData.category.name}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-xl ">Price</h3>
                            <p className="text-gray-600 text-base font-bold dark:text-gray-400 ">
                                ${courseData.price.toFixed(2)}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-xl ">Author</h3>
                            <p className="text-gray-600 text-base dark:text-gray-400 font-medium">
                                {courseData.author}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-xl ">Created At</h3>
                            <p className="text-gray-600 text-base dark:text-gray-400 font-medium">
                                {new Date(courseData.createdAt).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
