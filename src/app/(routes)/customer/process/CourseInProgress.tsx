'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    author: {
        fullName: string;
    };
    category?: Category[] | Category | null; // Make optional and allow single category
    createdAt: string;
    enrolledCount: number;
}

interface Category {
    _id: string;
    name: string;
}

interface CourseInProgressProps {
    enrollCourse: Course[];
}

export default function CourseInProgress({ enrollCourse }: CourseInProgressProps) {
    const renderCategories = (category: Course['category']) => {
        if (!category) return null;

        // Handle single category object
        if (!Array.isArray(category)) {
            return (
                <Badge variant="outline" className="ml-2 text-gray-500">
                    {category.name}
                </Badge>
            );
        }

        // Handle array of categories
        return category.map((cat) => (
            <Badge key={cat._id} variant="outline" className="ml-2 text-gray-500">
                {cat.name}
            </Badge>
        ));
    };

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Course in Progress</h2>
            </div>

            <div className="space-y-4">
                {enrollCourse.length > 0 ? (
                    enrollCourse.map((course) => (
                        <Card key={course._id} className="shadow-sm border border-gray-200">
                            <CardContent className="p-4">
                                <div className="flex items-center text-xs text-gray-500 mb-2">
                                    <span>{course.title}</span>
                                    {renderCategories(course.category)}
                                </div>

                                <div className="flex justify-between items-center my-3">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-xs">✓</span>
                                        </div>
                                        <Progress value={25} max={100} className="w-28 h-2" />
                                    </div>
                                    <div className="text-xs text-gray-500">Started</div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-1">
                                            <Badge className="bg-gray-200 text-gray-700 font-normal hover:bg-gray-300">
                                                PRACTICE
                                            </Badge>
                                            <div className="text-xs text-gray-700 line-clamp-1">
                                                {course.description}
                                            </div>
                                        </div>
                                    </div>
                                    <Link href={`/customer/courses/${course._id}`}>
                                        <Button className="bg-[#5AD3AF] hover:bg-emerald-600 text-white text-xs">
                                            Go To Course
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        No courses enrolled yet.
                    </p>
                )}
            </div>
        </section>
    );
}
