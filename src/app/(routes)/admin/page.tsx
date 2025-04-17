'use client';

import React from 'react';

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

// Sample data for charts
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

const Page: React.FC = () => {
    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100 p-6">
            {/* Main Content */}
            <div className="flex-1">
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                        <span className="text-xl font-semibold">Dashboard</span>
                        <div className="ml-8 space-x-1 text-sm text-gray-500 dark:text-gray-400">
                            <span>Upvex</span>
                            <span>/</span>
                            <span>Dashboards</span>
                            <span>/</span>
                            <span className="text-gray-400 dark:text-gray-500">Dashboard</span>
                        </div>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6">
                    <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
                        {/* Total Users Card */}
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                TOTAL USERS
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold">72,540</div>
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

                        {/* Sessions Card */}
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                SESSIONS
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold">29.4%</div>
                                    <div className="flex items-center text-sm">
                                        <span className="px-2 py-0.5 text-green-700 bg-green-100 dark:bg-green-800 dark:text-green-200 rounded">
                                            ↑ 1.7%
                                        </span>
                                        <span className="ml-2 text-gray-500 dark:text-gray-400">
                                            from 29.1%
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

                        {/* Avg. Click Rate Card */}
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                AVG. CLICK RATE
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold">56.8%</div>
                                    <div className="flex items-center text-sm">
                                        <span className="px-2 py-0.5 text-red-700 bg-red-100 dark:bg-red-800 dark:text-red-200 rounded">
                                            ↓ 4.4%
                                        </span>
                                        <span className="ml-2 text-gray-500 dark:text-gray-400">
                                            from 61.2%
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
                        {/* Import Data Section */}
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

                        {/* Monthly Expenses Chart */}
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
