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
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Analytics</h1>

            {/* Top Section: Performance, Attendance, and To Do */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Average Group Performance */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Average Group Performance</h2>
                    <div className="flex items-center justify-center relative">
                        <div
                            className="h-32 w-32 rounded-full flex items-center justify-center bg-gray-100"
                            style={{
                                background: getPerformanceGradient(),
                            }}
                        >
                            <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold">{performance.average}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">
                        {performance.breakdown.map((segment, index) => (
                            <div key={index} className="flex items-center">
                                <div className={`h-4 w-4 rounded-full ${segment.color} mr-2`}></div>
                                <span className="text-sm">
                                    {segment.range}: {segment.count} students
                                </span>
                            </div>
                        ))}
                    </div>
                    <Button
                        variant="link"
                        className="mt-3 text-blue-600 hover:underline text-sm p-0"
                        aria-label="Export performance data as CSV"
                    >
                        Export CSV
                    </Button>
                </div>

                {/* Average Students Attendance */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Average Students Attendance</h2>
                    <div className="flex items-center justify-center relative">
                        <div
                            className="h-32 w-32 rounded-full flex items-center justify-center bg-gray-100"
                            style={{
                                background: `conic-gradient(#22c55e 0deg ${attendance.average * 3.6}deg, #e5e7eb ${attendance.average * 3.6}deg 360deg)`,
                            }}
                        >
                            <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold">{attendance.average}</span>
                            </div>
                        </div>
                    </div>
                    <Button
                        variant="link"
                        className="mt-3 text-blue-600 hover:underline text-sm p-0"
                        aria-label="Export attendance data"
                    >
                        Export
                    </Button>
                </div>

                {/* To Do */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">To Do</h2>
                    <div className="space-y-3">
                        {toDo.map((item, index) => (
                            <div key={index} className="flex items-center">
                                <Input
                                    type="checkbox"
                                    id={`todo-${index}`}
                                    checked={item.completed}
                                    onChange={() => {}}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                                <label htmlFor={`todo-${index}`} className="ml-3 text-sm">
                                    {item.task}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hometasks to Check */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Hometasks to Check</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="p-3">Progress</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Subject</th>
                                <th className="p-3">Grade</th>
                                <th className="p-3">Group</th>
                                <th className="p-3">Count</th>
                                <th className="p-3">Deadline</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hometasks.map((task, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="p-3">
                                        <div
                                            className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center relative"
                                            style={{
                                                background: `conic-gradient(#3b82f6 0deg ${task.progress * 3.6}deg, #e5e7eb ${task.progress * 3.6}deg 360deg)`,
                                            }}
                                        >
                                            <div className="h-6 w-6 bg-white rounded-full flex items-center justify-center text-xs">
                                                {task.progress}%
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-3">{task.name}</td>
                                    <td className="p-3">{task.subject}</td>
                                    <td className="p-3">{task.grade}</td>
                                    <td className="p-3">{task.group}</td>
                                    <td className="p-3">{task.count} of 30</td>
                                    <td className="p-3">{task.deadline}</td>
                                    <td className="p-3">
                                        <span
                                            className={`text-xs px-2 py-1 rounded ${
                                                task.status === 'Ready to check'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-orange-100 text-orange-800'
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
