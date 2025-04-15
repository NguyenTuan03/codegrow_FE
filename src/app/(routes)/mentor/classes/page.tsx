'use client';
// import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Star } from 'lucide-react';
// import { GetClass } from '@/lib/services/mentor/getclass';
export default function Classes() {
    // const [classesItems, setClassesItems] = useState<any[]>([]); // State để lưu danh sách lớp học
    // const [loading, setLoading] = useState(true);
    const classesItems = [
        {
            id: 'java',
            icon: BookOpen,
            label: 'Java',
            totalStudent: 100,
            totalRating: 4.5,
            totalReviews: 50,
        },
        {
            id: 'javascript',
            icon: BookOpen,
            label: 'JavaScript',
            totalStudent: 200,
            totalRating: 4.7,
            totalReviews: 100,
        },
        {
            id: 'react',
            icon: BookOpen,
            label: 'ReactJS',
            totalStudent: 150,
            totalRating: 4.2,
            totalReviews: 75,
        },
        {
            id: 'python',
            icon: BookOpen,
            label: 'Python',
            totalStudent: 120,
            totalRating: 4.3,
            totalReviews: 60,
        },
    ];
    // useEffect(() => {
    //     const fetchClasses = async () => {
    //         try {
    //             const data = await GetClass(); // Gọi API để lấy danh sách lớp học
    //             setClassesItems(data); // Lưu dữ liệu vào state
    //         } catch (error) {
    //             console.error('Failed to fetch classes:', error);
    //         } finally {
    //             setLoading(false); // Tắt trạng thái tải
    //         }
    //     };

    //     fetchClasses();
    // }, []);

    // if (loading) {
    //     return <div className="text-center mt-10">Loading classes...</div>; // Hiển thị trạng thái tải
    // }
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            <h1 className="text-3xl font-bold mb-6">List of Classes</h1>
            <div className="grid gap-6">
                {classesItems.map((course) => (
                    <Link
                        key={course.id}
                        href={`/mentor/classes/${course.id}`}
                        className="block border rounded-lg overflow-hidden hover:shadow-md transition"
                    >
                        {/* Course Icon */}
                        <div className="relative h-40 flex items-center justify-center bg-gray-100">
                            <course.icon className="w-16 h-16 text-gray-500" />
                        </div>

                        {/* Course Details */}
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-2">{course.label}</h2>
                            <p className="text-gray-600 mb-2">Students: {course.totalStudent}</p>
                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${
                                                i < Math.round(course.totalRating)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-600 font-medium">
                                    {course.totalRating.toFixed(1)} ({course.totalReviews} reviews)
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
