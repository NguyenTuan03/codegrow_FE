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
        <div className="flex min-h-screen bg-gray-50 p-6">
            {/* Main Content */}
            <div className="flex-1">
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
                    <div className="flex items-center">
                        <span className="text-xl font-semibold">Dashboard</span>
                        <div className="ml-8 space-x-1 text-sm text-gray-500">
                            <span>Upvex</span>
                            <span>/</span>
                            <span>Dashboards</span>
                            <span>/</span>
                            <span className="text-gray-400">Dashboard</span>
                        </div>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6">
                    <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
                        {/* Total Users Card */}
                        <div className="p-4 bg-white rounded-lg shadow">
                            <div className="text-sm font-medium text-gray-500">TOTAL USERS</div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold">72,540</div>
                                    <div className="flex items-center text-sm">
                                        <span className="px-2 py-0.5 text-green-700 bg-green-100 rounded">
                                            ↑ 12.5%
                                        </span>
                                        <span className="ml-2 text-gray-500">from 70,104</span>
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
                        <div className="p-4 bg-white rounded-lg shadow">
                            <div className="text-sm font-medium text-gray-500">SESSIONS</div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold">29.4%</div>
                                    <div className="flex items-center text-sm">
                                        <span className="px-2 py-0.5 text-green-700 bg-green-100 rounded">
                                            ↑ 1.7%
                                        </span>
                                        <span className="ml-2 text-gray-500">from 29.1%</span>
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
                        <div className="p-4 bg-white rounded-lg shadow">
                            <div className="text-sm font-medium text-gray-500">AVG. CLICK RATE</div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold">56.8%</div>
                                    <div className="flex items-center text-sm">
                                        <span className="px-2 py-0.5 text-red-700 bg-red-100 rounded">
                                            ↓ 4.4%
                                        </span>
                                        <span className="ml-2 text-gray-500">from 61.2%</span>
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
                        <div className="p-4 bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-medium">
                                    Import data into Front Dashboard
                                </h3>
                            </div>
                            <p className="mb-4 text-sm text-gray-600">
                                See and talk to your users and leads immediately by importing your
                                data into the Front Dashboard platform.
                            </p>

                            <div className="mb-3 text-sm font-medium">Import users from:</div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-2 border border-gray-200 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 mr-3 bg-green-100 rounded-full flex items-center justify-center">
                                            <Users className="w-4 h-4 text-green-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium">Capsule</div>
                                            <div className="text-xs text-gray-500">Users</div>
                                        </div>
                                    </div>
                                    <button className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200">
                                        Launch Importer
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-2 border border-gray-200 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 mr-3 bg-yellow-100 rounded-full flex items-center justify-center">
                                            <Activity className="w-4 h-4 text-yellow-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium">Mailchimp</div>
                                            <div className="text-xs text-gray-500">Users</div>
                                        </div>
                                    </div>
                                    <button className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200">
                                        Launch Importer
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-2 border border-gray-200 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 mr-3 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Activity className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium">Webdev</div>
                                            <div className="text-xs text-gray-500">Users</div>
                                        </div>
                                    </div>
                                    <button className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200">
                                        Launch Importer
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Monthly Expenses Chart */}
                        <div className="p-4 bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-medium">Monthly expenses</h3>
                                <div className="flex items-center text-sm">
                                    <span className="mr-3">This week</span>
                                    <span className="text-gray-400">Last week</span>
                                </div>
                            </div>

                            <div className="flex items-center mb-4">
                                <div className="text-xl font-bold">35%</div>
                                <span className="px-2 py-0.5 ml-2 text-green-700 bg-green-100 rounded">
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

                    <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
                        {/* Transactions */}
                        <div className="p-4 bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-medium">Transactions</h3>
                                <div className="text-xs text-gray-500">Feb 28 - Feb 28, 2023</div>
                            </div>

                            <div className="flex items-center justify-center h-64">
                                <div className="relative">
                                    {/* Blue Circle */}
                                    <div
                                        className="absolute w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-2xl"
                                        style={{ top: '-40px', left: '30px', zIndex: 2 }}
                                    >
                                        99
                                    </div>

                                    {/* Purple Circle */}
                                    <div
                                        className="absolute w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xl"
                                        style={{ top: '0px', left: '-30px', zIndex: 1 }}
                                    >
                                        65
                                    </div>

                                    {/* Small Blue Circle */}
                                    <div
                                        className="absolute w-16 h-16 rounded-full bg-blue-300 flex items-center justify-center text-white font-bold"
                                        style={{ top: '20px', left: '20px', zIndex: 3 }}
                                    >
                                        38
                                    </div>

                                    {/* Indigo Circle */}
                                    <div
                                        className="absolute w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xl"
                                        style={{ top: '10px', left: '100px', zIndex: 1 }}
                                    >
                                        61
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center space-x-4 text-sm">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 mr-2 bg-blue-500 rounded-full"></div>
                                    <span>New</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 mr-2 bg-purple-500 rounded-full"></div>
                                    <span>Pending</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 mr-2 bg-gray-400 rounded-full"></div>
                                    <span>Failed</span>
                                </div>
                            </div>
                        </div>

                        {/* Reports Overview */}
                        <div className="p-4 bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-medium">Reports overview</h3>
                            </div>

                            <div className="mb-4">
                                <div className="text-xl font-bold">$7,431.14 USD</div>
                                <div className="w-full h-2 mt-2 bg-gray-200 rounded-full">
                                    <div
                                        className="h-2 bg-blue-500 rounded-full"
                                        style={{ width: '65%' }}
                                    ></div>
                                </div>
                                <div className="flex justify-between mt-1 text-xs text-gray-500">
                                    <span>0%</span>
                                    <span>100%</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 mr-2 bg-blue-500 rounded-full"></div>
                                        <span>Gross value</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="mr-2">$3,500.71</span>
                                        <span className="text-green-500">+12.4%</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 mr-2 bg-blue-300 rounded-full"></div>
                                        <span>Net volume from sales</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="mr-2">$2,980.45</span>
                                        <span className="text-red-500">-6.8%</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 mr-2 bg-blue-200 rounded-full"></div>
                                        <span>New volume from sales</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="mr-2">$950.00</span>
                                        <span className="text-red-500">-1.9%</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 mr-2 bg-gray-300 rounded-full"></div>
                                        <span>Other</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="mr-2">32</span>
                                        <span className="text-green-500">+8.2%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
