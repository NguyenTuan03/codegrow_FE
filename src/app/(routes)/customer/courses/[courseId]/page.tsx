'use client';
import { useParams, useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CheckCircle2, PlayCircle, BookOpen, Code, Video } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { viewDetailCourses } from '@/lib/services/course/viewdetailcourses';
import { toast } from '@/components/ui/use-toast';
import Link from 'next/link';

// interface EnrollmentMetadata {
//     user: string;
//     course: string;
//     progress: number;
//     completed: boolean;
//     isDeleted: boolean;
//     _id: string;
//     enrolledAt: string;
//     __v: number;
// }
interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    enrolledCount: number;
    author: {
        fullName: string;
    };
    category: string;
    createdAt: string;
}
const CourseLearningPage = () => {
    const [completedModules] = useState({
        'module-1': false,
        'module-2': false,
        'module-3': false,
        'module-4': false,
        'module-5': false,
    });
    const router = useRouter();
    const { courseId } = useParams<{ courseId: string }>();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);

    // Calculate progress percentage
    const progressPercentage =
        (Object.values(completedModules).filter(Boolean).length /
            Object.values(completedModules).length) *
        100;

    const handleNavigation = (path: string) => {
        router.push(path);
    };
    const fetchCourseData = async () => {
        try {
            setLoading(true);

            // Fetch course details
            const courseRes = await viewDetailCourses(courseId);
            console.log('Course data:', courseRes);
            setCourse(courseRes.metadata);
            if (courseRes.status === 200) {
                toast({
                    title: 'Thành công',
                    description: 'Tải dữ liệu khóa học thành công',
                    variant: 'default',
                });
            }
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu khóa học:', error);
            toast({
                title: 'Lỗi',
                description:
                    error instanceof Error ? error.message : 'Không thể tải dữ liệu khóa học',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourseData();
    }, [courseId]);
    if (loading) {
    }
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 px-6 py-12 md:px-24 lg:px-32 space-y-8">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-500 dark:text-gray-400 space-x-2">
                <Link href="/customer/courses">
                    <span className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer">
                        Courses
                    </span>
                </Link>

                <span>{'>'}</span>
                <Link href={`/customer/courses/${courseId}`}>
                    <span className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer">
                        {course?.category}
                    </span>
                </Link>

                <span>{'>'}</span>
                <Link href={`/customer/courses/${courseId}`}>
                    <span className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer">
                        {course?.title}
                    </span>
                </Link>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-6 gap-6">
                {/* Title & Description */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
                        {course?.title}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        By{' '}
                        <span className="font-medium text-blue-600 dark:text-blue-400">
                            {course?.author?.fullName}
                        </span>
                    </p>
                </div>

                {/* Course Stats */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Total Students:{' '}
                        <span className="text-blue-600 dark:text-blue-400">
                            {course?.enrolledCount}
                        </span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Created At:{' '}
                        <span className="font-medium">
                            {course?.createdAt
                                ? new Date(course.createdAt).toLocaleDateString()
                                : 'N/A'}
                        </span>
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        Price:{' '}
                        <span className="font-medium text-green-600 dark:text-green-400">
                            {course?.price} VND
                        </span>
                    </p>
                </div>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="flex flex-wrap gap-2 mb-8 bg-transparent border-b border-gray-200 dark:border-gray-700">
                    {['Tổng quan', 'Điểm số', 'Ghi chú', 'Thảo luận'].map((tab, i) => (
                        <TabsTrigger
                            key={i}
                            value={['overview', 'grades', 'notes', 'messages'][i]}
                            className="py-3 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-t-lg transition-all data-[state=active]:bg-white data-[state=active]:dark:bg-gray-800 data-[state=active]:text-blue-600 data-[state=active]:dark:text-blue-400 data-[state=active]:shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            {tab}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value="grades">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            Điểm số của bạn
                        </h3>

                        <div className="space-y-6">
                            {/* Grades Summary */}
                            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                                    Tổng quan điểm số
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Điểm trung bình
                                        </p>
                                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                            8.5
                                        </p>
                                    </div>
                                    <div className="bg-green-50 dark:bg-green-900 p-3 rounded-lg">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Bài tập đã hoàn thành
                                        </p>
                                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                            3/5
                                        </p>
                                    </div>
                                    <div className="bg-purple-50 dark:bg-purple-900 p-3 rounded-lg">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Xếp hạng
                                        </p>
                                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                            Top 20%
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Grades */}
                            <div>
                                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                                    Chi tiết điểm số
                                </h4>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                    Bài học
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                    Loại
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                    Điểm
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                    Trạng thái
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    Bài kiểm tra 1
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    Trắc nghiệm
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    9.0
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400">
                                                        Hoàn thành
                                                    </span>
                                                </td>
                                            </tr>
                                            {/* Add more rows as needed */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="notes">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-900">Ghi chú của bạn</h3>
                            <Button className="bg-[#5B83E0] hover:bg-[#4A6BBE] text-white">
                                + Thêm ghi chú mới
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {/* Note 1 */}
                            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-medium text-gray-800">
                                            Khái niệm TDD quan trọng
                                        </h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Module 1 - Introduction to TDD
                                        </p>
                                    </div>
                                    <span className="text-xs text-gray-400">2 ngày trước</span>
                                </div>
                                <p className="mt-2 text-gray-600">
                                    TDD là viết test trước khi viết code. Quy trình: Red - Green -
                                    Refactor. Đảm bảo code luôn được test và dễ bảo trì.
                                </p>
                                <div className="mt-3 flex gap-2">
                                    <Button variant="outline" size="sm">
                                        Chỉnh sửa
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-red-500 border-red-200 hover:bg-red-50"
                                    >
                                        Xóa
                                    </Button>
                                </div>
                            </div>

                            {/* Note 2 */}
                            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-medium text-gray-800">
                                            Các loại test trong TDD
                                        </h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Module 2 - TDD Principles
                                        </p>
                                    </div>
                                    <span className="text-xs text-gray-400">1 tuần trước</span>
                                </div>
                                <p className="mt-2 text-gray-600">
                                    1. Unit Test: Test từng hàm/class riêng lẻ 2. Integration Test:
                                    Test sự kết hợp giữa các component 3. End-to-End Test: Test toàn
                                    bộ luồng ứng dụng
                                </p>
                                <div className="mt-3 flex gap-2">
                                    <Button variant="outline" size="sm">
                                        Chỉnh sửa
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-red-500 border-red-200 hover:bg-red-50"
                                    >
                                        Xóa
                                    </Button>
                                </div>
                            </div>

                            {/* Empty State */}
                            {/* <div className="text-center py-12">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Chưa có ghi chú</h3>
                <p className="mt-1 text-sm text-gray-500">Bắt đầu thêm ghi chú của bạn.</p>
                <div className="mt-6">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        + Thêm ghi chú đầu tiên
                    </Button>
                </div>
            </div> */}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="messages">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6">Thảo luận</h3>

                        <div className="space-y-6">
                            {/* Discussion Form */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <textarea
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    rows={3}
                                    placeholder="Đặt câu hỏi hoặc tham gia thảo luận..."
                                ></textarea>
                                <div className="mt-3 flex justify-end">
                                    <Button className="bg-[#5B83E0] hover:bg-[#4A6BBE] text-white">
                                        Đăng câu hỏi
                                    </Button>
                                </div>
                            </div>

                            {/* Discussion List */}
                            <div className="space-y-4">
                                {/* Question 1 */}
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center font-medium">
                                            HT
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-medium text-gray-800">
                                                    Hoàng Trung
                                                </h4>
                                                <span className="text-xs text-gray-400">
                                                    3 giờ trước
                                                </span>
                                            </div>
                                            <p className="mt-1 text-gray-600">
                                                Ai có thể giải thích rõ hơn về khái niệm
                                                `Red-Green-Refactor` không? Mình chưa hiểu phần
                                                Refactor lắm.
                                            </p>
                                            <div className="mt-3 flex gap-3">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-gray-500"
                                                >
                                                    3 Trả lời
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-gray-500"
                                                >
                                                    Trả lời
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Question 2 */}
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-green-100 text-green-800 rounded-full w-10 h-10 flex items-center justify-center font-medium">
                                            LM
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-medium text-gray-800">
                                                    Linh Mai
                                                </h4>
                                                <span className="text-xs text-gray-400">
                                                    1 ngày trước
                                                </span>
                                            </div>
                                            <p className="mt-1 text-gray-600">
                                                Có công cụ nào hỗ trợ TDD cho JavaScript không? Mọi
                                                người có thể chia sẻ kinh nghiệm không?
                                            </p>
                                            <div className="mt-3 flex gap-3">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-gray-500"
                                                >
                                                    5 Trả lời
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-gray-500"
                                                >
                                                    Trả lời
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Empty State */}
                                {/* <div className="text-center py-12">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Chưa có thảo luận nào</h3>
                    <p className="mt-1 text-sm text-gray-500">Hãy là người đầu tiên đặt câu hỏi.</p>
                </div> */}
                            </div>
                        </div>
                    </div>
                </TabsContent>
                {/* Overview Content */}
                <TabsContent value="overview">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900">
                                Test Driven Development
                            </h3>
                            <div className="flex items-center gap-4 mt-2">
                                <Progress value={progressPercentage} className="h-2 w-64" />
                                <span className="text-sm text-gray-500">
                                    {Math.round(progressPercentage)}% Complete
                                </span>
                            </div>
                        </div>
                        <Separator className="bg-gray-200" />

                        {/* Module List */}
                        <div className="space-y-4">
                            {/* Module 1 */}
                            <div
                                className={`bg-white p-6 rounded-xl shadow-sm ${
                                    completedModules['module-1']
                                        ? 'border-l-4 border-green-500'
                                        : 'border-l-4 border-blue-500'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {completedModules['module-1'] ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <PlayCircle className="w-5 h-5 text-[#657ED4]" />
                                        )}
                                        <div className="font-medium text-gray-800">
                                            1. Introduction to TDD
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() =>
                                            handleNavigation('/customer/coursesdetailwatching')
                                        }
                                        className="flex items-center gap-2 bg-[#657ED4] hover:bg-[#354065] text-white"
                                    >
                                        <PlayCircle className="w-4 h-4" /> Start Learning
                                    </Button>
                                </div>
                            </div>

                            {/* Module 2 */}
                            <div
                                className={`bg-white p-6 rounded-xl shadow-sm ${
                                    completedModules['module-2']
                                        ? 'border-l-4 border-green-500'
                                        : 'border-l-4 border-blue-500'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {completedModules['module-2'] ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <BookOpen className="w-5 h-5 text-blue-500" />
                                        )}
                                        <div className="font-medium text-gray-800">
                                            2. TDD Principles
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() =>
                                            handleNavigation('/customer/coursesdetailreading')
                                        }
                                        className="flex items-center gap-2 bg-[#657ED4] hover:bg-[#354065] text-white"
                                    >
                                        <BookOpen className="w-4 h-4" /> Start Reading
                                    </Button>
                                </div>
                            </div>

                            {/* Module 3 */}
                            <div
                                className={`bg-white p-6 rounded-xl shadow-sm ${
                                    completedModules['module-3']
                                        ? 'border-l-4 border-green-500'
                                        : 'border-l-4 border-blue-500'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {completedModules['module-3'] ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <BookOpen className="w-5 h-5 text-blue-500" />
                                        )}
                                        <div className="font-medium text-gray-800">
                                            3. TDD Basics Reading
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() =>
                                            handleNavigation('/customer/coursesdetailreading')
                                        }
                                        className="flex items-center gap-2  bg-[#657ED4] hover:bg-[#354065] text-white"
                                    >
                                        <BookOpen className="w-4 h-4" /> Start Reading
                                    </Button>
                                </div>
                            </div>

                            {/* Module 4 */}
                            <div
                                className={`bg-white p-6 rounded-xl shadow-sm ${
                                    completedModules['module-4']
                                        ? 'border-l-4 border-green-500'
                                        : 'border-l-4 border-blue-500'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {completedModules['module-4'] ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <Video className="w-5 h-5 text-blue-500" />
                                        )}
                                        <div className="font-medium text-gray-800">
                                            4. Video Tutorial: TDD in Practice
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() =>
                                            handleNavigation('/customer/coursesdetailwatching')
                                        }
                                        className="flex items-center gap-2  bg-[#657ED4] hover:bg-[#354065] text-white"
                                    >
                                        <PlayCircle className="w-4 h-4" /> Watch Video
                                    </Button>
                                </div>
                            </div>

                            {/* Module 5 */}
                            <div
                                className={`bg-white p-6 rounded-xl shadow-sm ${
                                    completedModules['module-5']
                                        ? 'border-l-4 border-green-500'
                                        : 'border-l-4 border-blue-500'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {completedModules['module-5'] ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <Code className="w-5 h-5 text-blue-500" />
                                        )}
                                        <div className="font-medium text-gray-800">
                                            5. Hands-on Practice: Write TDD Tests
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() =>
                                            handleNavigation('/customer/coursesdetailpractice')
                                        }
                                        className="flex items-center gap-2  bg-[#657ED4] hover:bg-[#354065] text-white"
                                    >
                                        <Code className="w-4 h-4" /> Start Practice
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default CourseLearningPage;
