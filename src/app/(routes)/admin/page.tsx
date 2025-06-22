'use client';

import React, { useEffect, useState } from 'react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { Activity, Users } from 'lucide-react';

import { getUser } from '@/lib/services/admin/getuser'; // Sử dụng getUser thay vì getUserDetail
import { GetCourses } from '@/lib/services/course/getcourse';
import { GetClass } from '@/lib/services/class/getclass';
import { toast } from '@/components/ui/use-toast';

// Sample data for charts (kept for reference, can be replaced with API data)
const userActivityData = [
    { name: 'Jan', users: 4000 },
    { name: 'Feb', users: 3000 },
    { name: 'Mar', users: 5000 },
    { name: 'Apr', users: 4500 },
    { name: 'May', users: 6000 },
    { name: 'Jun', users: 5500 },
];

const revenueData = [
    { name: 'Week 1', revenue: 3400 },
    { name: 'Week 2', revenue: 2100 },
    { name: 'Week 3', revenue: 4300 },
    { name: 'Week 4', revenue: 3800 },
];

interface Class {
    _id: string;
    title: string;
    description: string;
}

interface ApiResponse {
    message: string;
    status: number;
    metadata: {
        totalUsers?: number;
        classes?: Class[];
        totalClasses?: number;
        courses?: Course[];
        totalCourses?: number;
        totalPages?: number;
    };
}

interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    enrolledCount: number;
    author: { _id: string; fullName: string; email: string; role: string };
    category: string | { _id: string; name: string };
    createdAt: string;
    imgUrl?: string;
}

const Page: React.FC = () => {
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [totalClasses, setTotalClasses] = useState<number>(0);
    const [totalCourses, setTotalCourses] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchTotals = async () => {
        try {
            setLoading(true);

            // Fetch total users
            const token = localStorage.getItem('token');
            if (!token) {
                toast({
                    title: 'Lỗi',
                    description: 'Token không tồn tại. Vui lòng đăng nhập lại.',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
                return;
            }
            const tokenuser = JSON.parse(token);
            const userResponse: ApiResponse = await getUser(1, 1); // Lấy trang 1, giới hạn 1 để lấy tổng
            console.log(' User response:', userResponse);
            setTotalUsers(userResponse.metadata?.totalPages || 0); // Giả định totalUsers trong metadata

            // Fetch total classes
            const classesResponse: ApiResponse = await GetClass(tokenuser); // Giả định API này
            console.log(' Classes response:', classesResponse);
            setTotalClasses(
                classesResponse.metadata?.totalClasses ||
                    classesResponse.metadata?.classes?.length ||
                    0,
            );

            // Fetch total courses
            const coursesResponse: ApiResponse = await GetCourses(1, 10); // Lấy 10 khóa học đầu tiên
            console.log(' Courses response:', coursesResponse);
            setTotalCourses(
                coursesResponse.metadata?.totalCourses ||
                    coursesResponse.metadata?.courses?.length ||
                    0,
            );
        } catch (error) {
            console.error(' Error fetching totals:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch dashboard totals. Please try again later.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTotals();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100 p-6 items-center justify-center">
                <p className="text-lg text-gray-600 dark:text-gray-400">Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100 p-6">
            <div className="flex-1">
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                        <span className="text-xl font-semibold">Dashboard</span>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
                        {/* Total Users Card */}
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                TOTAL USERS
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold">
                                        {totalUsers.toLocaleString()}
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <span className="px-2 py-0.5 text-green-700 bg-green-100 dark:bg-green-800 dark:text-green-200 rounded">
                                            ↑ 12.5%
                                        </span>
                                        <span className="ml-2 text-gray-500 dark:text-gray-400">
                                            from 70,104
                                        </span>
                                    </div>
                                </div>
                                <div className="w-24 h-12">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={userActivityData}>
                                            <Line
                                                type="monotone"
                                                dataKey="users"
                                                stroke="#4f46e5"
                                                strokeWidth={2}
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Total Classes Card */}
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                TOTAL CLASSES
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold">
                                        {totalClasses.toLocaleString()}
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <span className="px-2 py-0.5 text-green-700 bg-green-100 dark:bg-green-800 dark:text-green-200 rounded">
                                            ↑ 5.0%
                                        </span>
                                        <span className="ml-2 text-gray-500 dark:text-gray-400">
                                            from previous month
                                        </span>
                                    </div>
                                </div>
                                <div className="w-24 h-12">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={userActivityData}>
                                            <Line
                                                type="monotone"
                                                dataKey="users"
                                                stroke="#4f46e5"
                                                strokeWidth={2}
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Total Courses Card */}
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                TOTAL COURSES
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold">
                                        {totalCourses.toLocaleString()}
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <span className="px-2 py-0.5 text-green-700 bg-green-100 dark:bg-green-800 dark:text-green-200 rounded">
                                            ↑ 8.0%
                                        </span>
                                        <span className="ml-2 text-gray-500 dark:text-gray-400">
                                            from last update
                                        </span>
                                    </div>
                                </div>
                                <div className="w-24 h-12">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={userActivityData}>
                                            <Line
                                                type="monotone"
                                                dataKey="users"
                                                stroke="#4f46e5"
                                                strokeWidth={2}
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-medium">
                                    Import data into Front Dashboard
                                </h3>
                            </div>
                            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                                See and talk to your users and leads immediately by importing your
                                data into the Front Dashboard platform.
                            </p>

                            <div className="mb-3 text-sm font-medium">Import users from:</div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 mr-3 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                                            <Users className="w-4 h-4 text-green-600 dark:text-green-200" />
                                        </div>
                                        <div>
                                            <div className="font-medium">Capsule</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                Users
                                            </div>
                                        </div>
                                    </div>
                                    <button className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-800 rounded-md hover:bg-blue-200 dark:hover:bg-blue-700">
                                        Launch Importer
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 mr-3 bg-yellow-100 dark:bg-yellow-800 rounded-full flex items-center justify-center">
                                            <Activity className="w-4 h-4 text-yellow-600 dark:text-yellow-200" />
                                        </div>
                                        <div>
                                            <div className="font-medium">Mailchimp</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                Users
                                            </div>
                                        </div>
                                    </div>
                                    <button className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-800 rounded-md hover:bg-blue-200 dark:hover:bg-blue-700">
                                        Launch Importer
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 mr-3 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                                            <Activity className="w-4 h-4 text-blue-600 dark:text-blue-200" />
                                        </div>
                                        <div>
                                            <div className="font-medium">Webdev</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                Users
                                            </div>
                                        </div>
                                    </div>
                                    <button className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-800 rounded-md hover:bg-blue-200 dark:hover:bg-blue-700">
                                        Launch Importer
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-medium">Monthly expenses</h3>
                                <div className="flex items-center text-sm">
                                    <span className="mr-3">This week</span>
                                    <span className="text-gray-400 dark:text-gray-500">
                                        Last week
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center mb-4">
                                <div className="text-xl font-bold">35%</div>
                                <span className="px-2 py-0.5 ml-2 text-green-700 bg-green-100 dark:bg-green-800 dark:text-green-200 rounded">
                                    ↑ 25.3%
                                </span>
                            </div>

                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={revenueData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                        <YAxis axisLine={false} tickLine={false} />
                                        <Tooltip />
                                        <Bar
                                            dataKey="revenue"
                                            fill="#4f46e5"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
