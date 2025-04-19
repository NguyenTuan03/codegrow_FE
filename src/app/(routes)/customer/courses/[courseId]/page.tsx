// 'use client';

// import { useParams, useRouter } from 'next/navigation';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
// import { Button } from '@/components/ui/button';
// import { CheckCircle2, PlayCircle, BookOpen, Code } from 'lucide-react';
// import { Separator } from '@/components/ui/separator';
// import { Progress } from '@/components/ui/progress';
// import { useState, useEffect } from 'react';
// import { toast } from '@/components/ui/use-toast';
// import { viewDetailCourses } from '@/lib/services/course/viewdetailcourses';
// import { EnrollCourse } from '@/lib/services/course/enrollcourse';
// import { CalendarDays, Users, Tag } from 'lucide-react';
// interface Course {
//     _id: string;
//     title: string;
//     description: string;
//     price: number;
//     enrolledCount: number;
//     author: {
//         fullName: string;
//     };
//     category: string;
//     createdAt: string;
// }

// interface Module {
//     id: string;
//     title: string;
//     type: 'video' | 'reading' | 'practice';
//     completed: boolean;
// }

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

// export default function CourseLearningPage() {
//     const router = useRouter();
//     const { courseId } = useParams<{ courseId: string }>();
//     const [course, setCourse] = useState<Course | null>(null);
//     const [isEnrolled, setIsEnrolled] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [isEnrolling, setIsEnrolling] = useState(false);
//     const [enroll, setEnroll] = useState<EnrollmentMetadata | null>(null);

//     const [modules] = useState<Module[]>([
//         { id: 'module-1', title: 'Introduction to TDD', type: 'video', completed: false },
//         { id: 'module-2', title: 'TDD Principles', type: 'reading', completed: false },
//         { id: 'module-3', title: 'TDD Basics Reading', type: 'reading', completed: false },
//         {
//             id: 'module-4',
//             title: 'Video Tutorial: TDD in Practice',
//             type: 'video',
//             completed: false,
//         },
//         {
//             id: 'module-5',
//             title: 'Hands-on Practice: Write TDD Tests',
//             type: 'practice',
//             completed: false,
//         },
//     ]);

//     const fetchCourseData = async () => {
//         try {
//             setLoading(true);

//             // Fetch course details
//             const courseRes = await viewDetailCourses(courseId);
//             if (!courseRes || courseRes.status !== 200) {
//                 throw new Error(courseRes?.message || 'Không thể tải thông tin khóa học');
//             }
//             setCourse(courseRes.metadata);

//             // Check if user is already enrolled
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 setIsEnrolled(false);
//                 return;
//             }
//         } catch (error) {
//             console.error('Lỗi khi tải dữ liệu khóa học:', error);
//             toast({
//                 title: 'Lỗi',
//                 description:
//                     error instanceof Error ? error.message : 'Không thể tải dữ liệu khóa học',
//                 variant: 'destructive',
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleEnroll = async () => {
//         try {
//             setIsEnrolling(true);
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 toast({
//                     title: 'Lỗi',
//                     description: 'Bạn cần đăng nhập để đăng ký khóa học này',
//                     variant: 'destructive',
//                 });
//                 router.push('/login');
//                 return;
//             }

//             const enrollmentRes = await EnrollCourse({ courseId, token });
//             if (enrollmentRes && enrollmentRes.success) {
//                 setIsEnrolled(true);
//                 setEnroll(enrollmentRes.metadata);
//                 toast({
//                     title: 'Thành công',
//                     description: 'Bạn đã đăng ký khóa học thành công!',
//                     variant: 'default',
//                 });
//             } else {
//                 throw new Error(enrollmentRes?.message || 'Không thể đăng ký khóa học');
//             }
//         } catch (error) {
//             console.error('Lỗi khi đăng ký khóa học:', error);
//             toast({
//                 title: 'Lỗi',
//                 description: error instanceof Error ? error.message : 'Không thể đăng ký khóa học',
//                 variant: 'destructive',
//             });
//         } finally {
//             setIsEnrolling(false);
//         }
//     };

//     useEffect(() => {
//         fetchCourseData();
//     }, [courseId]);

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex justify-center items-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//         );
//     }

//     if (!course) {
//         return (
//             <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex justify-center items-center">
//                 <p className="text-gray-600">Không tìm thấy khóa học</p>
//             </div>
//         );
//     }

//     const progressPercentage = (modules.filter((m) => m.completed).length / modules.length) * 100;

//     return (
//         <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-12 md:px-24 lg:px-32 space-y-8">
//             {/* Breadcrumbs */}
//             <div className="text-sm text-gray-500 space-x-2">
//                 <span
//                     className="hover:text-gray-700 transition-colors cursor-pointer"
//                     onClick={() => router.push('/customer/courses')}
//                 >
//                     Khóa học
//                 </span>
//                 <span>{'>'}</span>
//                 <span className="hover:text-gray-700 transition-colors cursor-pointer">
//                     {course.category}
//                 </span>
//                 <span>{'>'}</span>
//                 <span className="text-blue-600 font-medium hover:underline cursor-pointer">
//                     {course.title}
//                 </span>
//             </div>

//             {/* Course Header */}
//             <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
//                 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                     <div>
//                         <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
//                         <p className="text-gray-600">Bởi {course.author.fullName}</p>
//                     </div>
//                     {!isEnrolled && (
//                         <Button
//                             onClick={handleEnroll}
//                             disabled={isEnrolling}
//                             className="md:self-start bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white px-6 py-2"
//                         >
//                             {isEnrolling ? 'Đang đăng ký...' : 'Đăng ký ngay'}
//                         </Button>
//                     )}
//                 </div>

//                 <p className="text-gray-600">{course.description}</p>

//                 <div className="flex flex-wrap gap-4 text-sm text-gray-500">
//                     <div className="flex items-center gap-1">
//                         <CalendarDays className="w-4 h-4" />
//                         <span>Tạo: {new Date(course.createdAt).toLocaleDateString()}</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                         <Users className="w-4 h-4" />
//                         <span>{course.enrolledCount} học viên</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                         <Tag className="w-4 h-4" />
//                         <span>{course.category}</span>
//                     </div>
//                 </div>
//             </div>

//             {/* Enrollment Information */}
//             {isEnrolled && enroll && (
//                 <div className="bg-white rounded-xl shadow-md overflow-hidden">
//                     <div className="bg-[#657ED4] px-6 py-3">
//                         <h3 className="text-lg font-semibold text-white">Thông tin đăng ký</h3>
//                     </div>
//                     <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                             <p className="text-gray-600">
//                                 <span className="font-medium text-gray-800">
//                                     Thời gian đăng ký:
//                                 </span>{' '}
//                                 {new Date(enroll.enrolledAt).toLocaleString()}
//                             </p>
//                             <p className="text-gray-600">
//                                 <span className="font-medium text-gray-800">Tiến độ:</span>
//                                 <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                                     {enroll.progress}%
//                                 </span>
//                             </p>
//                             <p className="text-gray-600">
//                                 <span className="font-medium text-gray-800">Trạng thái:</span>
//                                 <span
//                                     className={`ml-2 px-2 py-1 rounded-full text-sm ${
//                                         enroll.completed
//                                             ? 'bg-green-100 text-green-800'
//                                             : 'bg-yellow-100 text-yellow-800'
//                                     }`}
//                                 >
//                                     {enroll.completed ? 'Đã hoàn thành' : 'Đang học'}
//                                 </span>
//                             </p>
//                         </div>
//                         <div className="space-y-2">
//                             <p className="text-gray-600">
//                                 <span className="font-medium text-gray-800">ID đăng ký:</span>
//                                 <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-mono">
//                                     {enroll._id.substring(0, 8)}...
//                                 </span>
//                             </p>
//                             <p className="text-gray-600">
//                                 <span className="font-medium text-gray-800">Ngày bắt đầu:</span>{' '}
//                                 {new Date(enroll.enrolledAt).toLocaleDateString()}
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Tabs Section */}
//             {isEnrolled && (
//                 <div className="bg-white rounded-xl shadow-md overflow-hidden">
//                     <Tabs defaultValue="overview" className="w-full">
//                         <TabsList className="flex flex-wrap bg-transparent border-b border-gray-200 px-6">
//                             {['Tổng quan', 'Điểm số', 'Ghi chú', 'Thảo luận'].map((tab, i) => (
//                                 <TabsTrigger
//                                     key={i}
//                                     value={['overview', 'grades', 'notes', 'messages'][i]}
//                                     className="py-4 px-6 text-sm font-medium text-gray-700 rounded-t-lg transition-all data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm hover:bg-gray-100"
//                                 >
//                                     {tab}
//                                 </TabsTrigger>
//                             ))}
//                         </TabsList>

//                         {/* Overview Tab */}
//                         <TabsContent value="overview" className="p-6">
//                             <div className="space-y-8">
//                                 <div>
//                                     <h3 className="text-2xl font-semibold text-gray-900 mb-4">
//                                         Tiến độ khóa học
//                                     </h3>
//                                     <div className="flex items-center gap-4">
//                                         <Progress
//                                             value={progressPercentage}
//                                             className="h-3 w-full"
//                                         />
//                                         <span className="text-sm font-medium text-gray-700 min-w-[60px]">
//                                             {Math.round(progressPercentage)}%
//                                         </span>
//                                     </div>
//                                 </div>

//                                 <Separator className="bg-gray-200" />

//                                 {/* Module List */}
//                                 <div className="space-y-4">
//                                     <h4 className="text-xl font-semibold text-gray-800">
//                                         Nội dung khóa học
//                                     </h4>
//                                     {modules.map((module) => (
//                                         <div
//                                             key={module.id}
//                                             className={`group p-6 rounded-lg transition-all ${
//                                                 module.completed
//                                                     ? 'bg-green-50 border-l-4 border-green-500'
//                                                     : 'bg-white hover:bg-gray-50 border-l-4 border-blue-500'
//                                             } shadow-sm`}
//                                         >
//                                             <div className="flex items-center justify-between">
//                                                 <div className="flex items-center gap-4">
//                                                     <div
//                                                         className={`p-3 rounded-full ${
//                                                             module.completed
//                                                                 ? 'bg-green-100 text-green-600'
//                                                                 : 'bg-blue-100 text-blue-600'
//                                                         }`}
//                                                     >
//                                                         {module.completed ? (
//                                                             <CheckCircle2 className="w-5 h-5" />
//                                                         ) : module.type === 'video' ? (
//                                                             <PlayCircle className="w-5 h-5" />
//                                                         ) : module.type === 'reading' ? (
//                                                             <BookOpen className="w-5 h-5" />
//                                                         ) : (
//                                                             <Code className="w-5 h-5" />
//                                                         )}
//                                                     </div>
//                                                     <div>
//                                                         <h4 className="font-medium text-gray-800">
//                                                             {module.title}
//                                                         </h4>
//                                                         <p className="text-sm text-gray-500">
//                                                             {module.type === 'video'
//                                                                 ? 'Video bài giảng'
//                                                                 : module.type === 'reading'
//                                                                   ? 'Tài liệu đọc'
//                                                                   : 'Bài tập thực hành'}
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                                 <Button
//                                                     onClick={() =>
//                                                         router.push(
//                                                             `/customer/courses/${courseId}/${module.type}/${module.id}`,
//                                                         )
//                                                     }
//                                                     variant={
//                                                         module.completed ? 'outline' : 'default'
//                                                     }
//                                                     className={`flex items-center gap-2 ${
//                                                         module.completed
//                                                             ? 'border-green-500 text-green-600 hover:bg-green-50'
//                                                             : 'bg-[#657ED4] hover:bg-[#354065] text-white'
//                                                     }`}
//                                                 >
//                                                     {module.type === 'video' && (
//                                                         <>
//                                                             <PlayCircle className="w-4 h-4" /> Xem
//                                                         </>
//                                                     )}
//                                                     {module.type === 'reading' && (
//                                                         <>
//                                                             <BookOpen className="w-4 h-4" /> Đọc
//                                                         </>
//                                                     )}
//                                                     {module.type === 'practice' && (
//                                                         <>
//                                                             <Code className="w-4 h-4" /> Thực hành
//                                                         </>
//                                                     )}
//                                                 </Button>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </TabsContent>
//                     </Tabs>
//                 </div>
//             )}
//         </div>
//     );
// }

'use client';

import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CheckCircle2, PlayCircle, BookOpen, Code, Video } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';

const CourseLearningPage = () => {
    const router = useRouter();
    const [completedModules] = useState({
        'module-1': false,
        'module-2': false,
        'module-3': false,
        'module-4': false,
        'module-5': false,
    });

    // Calculate progress percentage
    const progressPercentage =
        (Object.values(completedModules).filter(Boolean).length /
            Object.values(completedModules).length) *
        100;

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-12 md:px-24 lg:px-32 space-y-8">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-500 space-x-2">
                <span className="hover:text-gray-700 transition-colors cursor-pointer">
                    Courses
                </span>
                <span>{'>'}</span>
                <span className="hover:text-gray-700 transition-colors cursor-pointer">
                    Programming
                </span>
                <span>{'>'}</span>
                <span className="text-blue-600 font-medium hover:underline cursor-pointer">
                    Introduction to Test and Behavior Driven Development
                </span>
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">
                    Introduction to Test and Behavior Driven Development
                </h1>
                <p className="text-gray-600">by IBM</p>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="flex flex-wrap gap-2 mb-8 bg-transparent border-b border-gray-200">
                    {['Tổng quan', 'Điểm số', 'Ghi chú', 'Thảo luận'].map((tab, i) => (
                        <TabsTrigger
                            key={i}
                            value={['overview', 'grades', 'notes', 'messages'][i]}
                            className="py-3 px-6 text-sm font-medium text-gray-700 rounded-t-lg transition-all data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm hover:bg-gray-100"
                        >
                            {tab}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value="grades">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            Điểm số của bạn
                        </h3>

                        <div className="space-y-6">
                            {/* Grades Summary */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h4 className="font-medium text-gray-800 mb-3">
                                    Tổng quan điểm số
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-blue-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-600">Điểm trung bình</p>
                                        <p className="text-2xl font-bold text-blue-600">8.5</p>
                                    </div>
                                    <div className="bg-green-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-600">
                                            Bài tập đã hoàn thành
                                        </p>
                                        <p className="text-2xl font-bold text-green-600">3/5</p>
                                    </div>
                                    <div className="bg-purple-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-600">Xếp hạng</p>
                                        <p className="text-2xl font-bold text-purple-600">
                                            Top 20%
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Grades */}
                            <div>
                                <h4 className="font-medium text-gray-800 mb-3">Chi tiết điểm số</h4>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Bài học
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Loại
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Điểm
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Trạng thái
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    Bài kiểm tra 1
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    Trắc nghiệm
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    9.0
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Hoàn thành
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    Bài thực hành 1
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    Thực hành
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    8.5
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Hoàn thành
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    Bài kiểm tra 2
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    Trắc nghiệm
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    -
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                        Chưa làm
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    Dự án cuối khóa
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    Dự án
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    -
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                        Chưa nộp
                                                    </span>
                                                </td>
                                            </tr>
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
