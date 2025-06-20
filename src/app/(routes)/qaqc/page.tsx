'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2, Check } from 'lucide-react';

const data = [
    { month: 'Jan', hours: 200, salary: 10000 },
    { month: 'Feb', hours: 160, salary: 10800 },
    { month: 'Mar', hours: 120, salary: 12080 },
    { month: 'Apr', hours: 90, salary: 9500 },
];

const classes = [
    {
        id: 1,
        name: 'Master Figma from Zero to Hero',
        logo: '/figma.svg',
        totalTime: '29h 42m',
        timeLeft: '12h 20m',
        earning: '$2.980',
        status: 'Active',
    },
    {
        id: 2,
        name: 'Fundamental Android Studio 0 to 100',
        logo: '/android.svg',
        totalTime: '14h 42m',
        timeLeft: '8h 20m',
        earning: '$6.980',
        status: 'Active',
    },
];

const page = () => {
    return (
        <div className="p-6 space-y-6  dark:bg-gray-900 transition-colors duration-300 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Performance Analytics
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    <CardContent className="pt-6">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Total working hours
                        </p>
                        <p className="text-2xl font-bold">
                            120<span className="text-base font-normal">h</span> 56
                            <span className="text-base font-normal">m</span>
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total salary</p>
                        </div>
                        <p className="text-2xl font-bold">
                            $12.080{' '}
                            <span className="text-sm font-normal text-gray-400 dark:text-gray-500">
                                / March
                            </span>
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    <CardContent className="pt-6">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Working progress</p>
                        <p className="text-2xl font-bold">
                            82%{' '}
                            <span className="text-sm font-normal text-gray-400 dark:text-gray-500">
                                89h 24m left
                            </span>
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Line Chart */}
            <Card className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle>Your performance</CardTitle>
                    <Button variant="link" className="text-sm text-blue-600 dark:text-blue-400">
                        See tracker
                    </Button>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'black', color: 'white' }}
                                labelFormatter={() => ''}
                                formatter={(value) => [`$${value}`, 'Earnings']}
                            />
                            <Line
                                type="monotone"
                                dataKey="salary"
                                stroke="#4f46e5"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Class Table */}
            <Card className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                <CardHeader>
                    <CardTitle>My class</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="border-b dark:border-gray-700">
                                    <th className="py-2">Class</th>
                                    <th>Total time</th>
                                    <th>Time left</th>
                                    <th>Earning</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classes.map((cls) => (
                                    <tr
                                        key={cls.id}
                                        className="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        <td className="py-3 flex items-center gap-2">
                                            <img src={cls.logo} alt="" className="w-6 h-6" />
                                            {cls.name}
                                        </td>
                                        <td>{cls.totalTime}</td>
                                        <td>{cls.timeLeft}</td>
                                        <td>{cls.earning}</td>
                                        <td>
                                            <Badge
                                                variant="outline"
                                                className="text-green-600 border-green-600 dark:text-green-400 dark:border-green-400"
                                            >
                                                {cls.status}
                                            </Badge>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <Check className="w-4 h-4 text-green-600 dark:text-green-400 cursor-pointer" />
                                                <Edit2 className="w-4 h-4 text-blue-600 dark:text-blue-400 cursor-pointer" />
                                                <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400 cursor-pointer" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default page;
