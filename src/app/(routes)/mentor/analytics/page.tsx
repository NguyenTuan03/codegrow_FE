'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const mockAnalyticsData = {
    performance: {
        average: 85,
        breakdown: [
            { range: '90 - 100', count: 50, color: 'bg-green-500' },
            { range: '75 - 89', count: 30, color: 'bg-yellow-500' },
            { range: '60 - 74', count: 15, color: 'bg-orange-500' },
            { range: 'Less 60', count: 5, color: 'bg-red-500' },
        ],
    },
    attendance: {
        average: 92,
    },
    toDo: [
        { task: 'Review assignments', completed: false },
        { task: 'Prepare next lecture', completed: true },
        { task: 'Check attendance', completed: false },
    ],
    hometasks: [
        {
            name: 'Algebra Homework',
            subject: 'Mathematics',
            grade: '10th',
            group: 'A',
            count: 25,
            deadline: '30 Apr',
            status: 'Ready to check',
            progress: 80,
        },
        {
            name: 'Physics Lab Report',
            subject: 'Physics',
            grade: '11th',
            group: 'B',
            count: 20,
            deadline: '28 Apr',
            status: 'In progress',
            progress: 50,
        },
        {
            name: 'Essay on Climate Change',
            subject: 'English',
            grade: '9th',
            group: 'C',
            count: 15,
            deadline: '25 Apr',
            status: 'In progress',
            progress: 30,
        },
    ],
};

export default function AnalyticsPage() {
    const { performance, attendance, toDo, hometasks } = mockAnalyticsData;

    const getPerformanceGradient = () => {
        let total = 0;
        const segments = performance.breakdown.map((segment) => {
            const start = total;
            total += segment.count;
            return `${segment.color} ${start}deg ${total}deg`;
        });
        return `conic-gradient(${segments.join(', ')})`;
    };

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Analytics</h1>

            {/* Top Section: Performance, Attendance, and To Do */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Average Group Performance */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                        Average Group Performance
                    </h2>
                    <div className="flex items-center justify-center relative">
                        <div
                            className="h-32 w-32 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700"
                            style={{
                                background: getPerformanceGradient(),
                            }}
                        >
                            <div className="h-24 w-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {performance.average}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">
                        {performance.breakdown.map((segment, index) => (
                            <div key={index} className="flex items-center">
                                <div className={`h-4 w-4 rounded-full ${segment.color} mr-2`}></div>
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    {segment.range}: {segment.count} students
                                </span>
                            </div>
                        ))}
                    </div>
                    <Button
                        variant="link"
                        className="mt-3 text-blue-600 dark:text-blue-400 hover:underline text-sm p-0"
                        aria-label="Export performance data as CSV"
                    >
                        Export CSV
                    </Button>
                </div>

                {/* Average Students Attendance */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                        Average Students Attendance
                    </h2>
                    <div className="flex items-center justify-center relative">
                        <div
                            className="h-32 w-32 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700"
                            style={{
                                background: `conic-gradient(#22c55e 0deg ${attendance.average * 3.6}deg, #e5e7eb 0deg ${attendance.average * 3.6}deg 360deg)`,
                            }}
                        >
                            <div className="h-24 w-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {attendance.average}
                                </span>
                            </div>
                        </div>
                    </div>
                    <Button
                        variant="link"
                        className="mt-3 text-blue-600 dark:text-blue-400 hover:underline text-sm p-0"
                        aria-label="Export attendance data"
                    >
                        Export
                    </Button>
                </div>

                {/* To Do */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                        To Do
                    </h2>
                    <div className="space-y-3">
                        {toDo.map((item, index) => (
                            <div key={index} className="flex items-center">
                                <Input
                                    type="checkbox"
                                    id={`todo-${index}`}
                                    checked={item.completed}
                                    onChange={() => {}}
                                    className="h-4 w-4 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-600 rounded"
                                />
                                <label
                                    htmlFor={`todo-${index}`}
                                    className="ml-3 text-sm text-gray-700 dark:text-gray-300"
                                >
                                    {item.task}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hometasks to Check */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    Hometasks to Check
                </h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-600">
                                <th className="p-3 text-gray-900 dark:text-gray-100">Progress</th>
                                <th className="p-3 text-gray-900 dark:text-gray-100">Name</th>
                                <th className="p-3 text-gray-900 dark:text-gray-100">Subject</th>
                                <th className="p-3 text-gray-900 dark:text-gray-100">Grade</th>
                                <th className="p-3 text-gray-900 dark:text-gray-100">Group</th>
                                <th className="p-3 text-gray-900 dark:text-gray-100">Count</th>
                                <th className="p-3 text-gray-900 dark:text-gray-100">Deadline</th>
                                <th className="p-3 text-gray-900 dark:text-gray-100">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hometasks.map((task, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    <td className="p-3">
                                        <div
                                            className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center relative"
                                            style={{
                                                background: `conic-gradient(#3b82f6 0deg ${task.progress * 3.6}deg, #e5e7eb 0deg ${task.progress * 3.6}deg 360deg)`,
                                            }}
                                        >
                                            <div className="h-6 w-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-xs text-gray-900 dark:text-gray-100">
                                                {task.progress}%
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-3 text-gray-700 dark:text-gray-300">
                                        {task.name}
                                    </td>
                                    <td className="p-3 text-gray-700 dark:text-gray-300">
                                        {task.subject}
                                    </td>
                                    <td className="p-3 text-gray-700 dark:text-gray-300">
                                        {task.grade}
                                    </td>
                                    <td className="p-3 text-gray-700 dark:text-gray-300">
                                        {task.group}
                                    </td>
                                    <td className="p-3 text-gray-700 dark:text-gray-300">
                                        {task.count} of 30
                                    </td>
                                    <td className="p-3 text-gray-700 dark:text-gray-300">
                                        {task.deadline}
                                    </td>
                                    <td className="p-3">
                                        <span
                                            className={`text-xs px-2 py-1 rounded ${
                                                task.status === 'Ready to check'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                    : 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100'
                                            }`}
                                        >
                                            {task.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
