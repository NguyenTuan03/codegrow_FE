'use client';
import { useParams, usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { MoreVertical, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ClassPage() {
    const { classId } = useParams<{ classId: string }>();
    const pathname = usePathname();
    const [tab, setTab] = useState('stream'); // Default tab is "stream"

    // Debug: Log the classId and pathname to ensure they are correct
    console.log('classId:', classId);
    console.log('pathname:', pathname);

    // Set the default tab to "stream" if the user lands on /mentor/classes/[classId]
    useEffect(() => {
        if (pathname === `/mentor/classes/${classId}`) {
            setTab('stream');
        }
    }, [pathname, classId]);

    if (!classId) {
        return <div>Error: Class ID is missing. Please provide a valid class ID in the URL.</div>;
    }

    // Mock data for shared header info - replace with API call in a real app
    const classData = {
        title: classId.toUpperCase(),
        code: '312',
        instructor: 'Nguyen Thuong Huyen',
        assignments: [
            {
                id: 1,
                title: 'Học từ vựng Bài 4-5 và làm bài tập ngữ pháp',
                date: '1 Jan 2024',
                dueDate: null, // No due date
                edited: '2 Jan 2024',
                type: 'assignment',
            },
            {
                id: 2,
                title: 'Làm bài tập chương 4 - Từ vựng, ngữ pháp',
                date: '20 Dec 2023',
                dueDate: '2023-12-22T23:59:00Z', // Due 22 Dec 2023, 23:59
                type: 'assignment',
            },
            {
                id: 3,
                title: 'Chia tính từ sang thì và thể khác nhau',
                date: '16 Dec 2023',
                dueDate: '2023-12-19T23:59:00Z', // Due 19 Dec 2023
                edited: '19 Dec 2023',
                type: 'assignment',
            },
            {
                id: 4,
                title: 'Quiz',
                date: '28 Nov 2023',
                dueDate: '2023-11-28T23:59:00Z', // Due 28 Nov 2023
                type: 'quiz',
            },
        ],
        resources: [
            {
                id: 1,
                title: 'YouTube Playlist',
                url: 'https://youtube.com/playlist?list=',
                type: 'link',
            },
            {
                id: 2,
                title: 'JPD123 | Quizlet',
                url: 'https://quizlet.com/class/26388',
                type: 'link',
            },
            {
                id: 3,
                title: 'JPD123 SP24 - Google Sheets',
                url: '',
                type: 'sheet',
            },
        ],
        teachers: [
            {
                name: 'Nguyen Thuong Huyen',
                classCode: 'K16, HCM',
            },
        ],
        classmates: [
            { name: 'Nguyen Manh Tien', classCode: '' },
            { name: 'Tran Huy Hoang', classCode: '' },
            { name: 'Phan Nguyen Doan Vu', classCode: 'K16, HCM' },
            { name: 'Nguyen Le Viet Huy', classCode: 'K17 DN' },
            { name: 'Bui Viet Quy', classCode: 'K17 HCM' },
            { name: 'Chau Duc Thien', classCode: 'K17 HCM' },
            { name: 'Duong Ngoc Quynh Khu', classCode: 'K17 HCM' },
            { name: 'Hoang Van An', classCode: 'K17 HCM' },
            { name: 'Mai That Tan', classCode: 'K17 HCM' },
            { name: 'Nguyen Phuong My Thuan', classCode: 'K17 HCM' },
            { name: 'Nguyen Quoc Khanh', classCode: 'K18L' },
            { name: 'Pham Thanh Long', classCode: 'K18 HL' },
            { name: 'Trieu Nghia Hieu', classCode: 'K18 HL' },
            { name: 'Trinh Minh Chau', classCode: 'K18 HL' },
            { name: 'Quang Trung Do', classCode: '' },
            { name: 'Nguyen Xuan Loc', classCode: 'K17 HL' },
            { name: 'Nguyen Quang Hiy', classCode: 'K17 HL' },
            { name: 'Guyet Minh', classCode: '' },
            { name: 'Phung Ngoc Son', classCode: '' },
            { name: 'Hoang Viet Nguyen', classCode: '' },
        ],
        performance: {
            average: 90,
            breakdown: [
                { range: '90 - 100', count: 70, color: 'bg-green-500' },
                { range: '75 - 89', count: 30, color: 'bg-yellow-500' },
                { range: '60 - 74', count: 15, color: 'bg-orange-500' },
                { range: 'Less 60', count: 5, color: 'bg-red-500' },
            ],
        },
        attendance: {
            average: 90,
        },
        toDo: [
            { task: 'To upload marks', completed: false },
            { task: 'To upload learning materials', completed: false },
            { task: 'To check homework', completed: false },
            { task: 'To conduct additional classes', completed: false },
        ],
        hometasks: [
            {
                name: 'Pythagorean theorem',
                subject: 'Geometry',
                grade: '8th',
                group: 'C',
                count: 30,
                deadline: '30 Apr',
                status: 'Ready to check',
                progress: 80,
            },
            {
                name: 'Matrices',
                subject: 'Linear Algebra',
                grade: '11th',
                group: 'B',
                count: 20,
                deadline: '30 Apr',
                status: 'In progress',
                progress: 50,
            },
            {
                name: 'Fractions',
                subject: 'Mathematics',
                grade: '6th',
                group: 'A',
                count: 15,
                deadline: '30 Apr',
                status: 'In progress',
                progress: 30,
            },
        ],
    };

    // Function to determine if a tab is active
    const isActive = (tabName: string) => tab === tabName;

    // Function to get initials from a name
    const getInitials = (name: string) => {
        const nameParts = name.split(' ');
        if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
        return (
            nameParts[0].charAt(0).toUpperCase() +
            nameParts[nameParts.length - 1].charAt(0).toUpperCase()
        );
    };

    // Function to get a random background color for the avatar
    const getRandomColor = () => {
        const colors = [
            'bg-red-500',
            'bg-blue-500',
            'bg-green-500',
            'bg-purple-500',
            'bg-orange-500',
            'bg-teal-500',
            'bg-pink-500',
            'bg-indigo-500',
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    // Stream Tab Content
    const StreamTab = () => (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
                {/* Meet Section */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Meet</h2>
                    <div className="flex items-center mb-4">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                            <span className="text-sm">JH</span>
                        </div>
                        <span className="font-medium">{classData.instructor}</span>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                        <h3 className="font-medium text-blue-800">Upcoming</h3>
                        <p className="text-gray-600">Nothing due soon!</p>
                    </div>
                    <Button
                        variant="link"
                        className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium p-0"
                        aria-label="View all upcoming assignments"
                    >
                        View all
                    </Button>
                </div>

                {/* Assignments Section */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Assignments</h2>
                    <div className="space-y-4">
                        {classData.assignments.map((assignment) => (
                            <div key={assignment.id} className="border-b pb-4 last:border-0">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-medium">
                                            {classData.instructor} posted a new {assignment.type}:{' '}
                                            {assignment.title}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {assignment.date}
                                            {assignment.edited && (
                                                <span className="ml-2">
                                                    (Edited {assignment.edited})
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                    {assignment.type === 'quiz' && (
                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                            Quiz
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
                {/* Resources Section */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Class Resources</h2>
                    <div className="space-y-3">
                        {classData.resources.map((resource) => (
                            <div key={resource.id} className="flex items-center">
                                <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                                    {resource.type === 'link' && (
                                        <svg
                                            className="h-4 w-4 text-gray-500"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                    {resource.type === 'sheet' && (
                                        <svg
                                            className="h-4 w-4 text-gray-500"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                </div>
                                <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {resource.title}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add Comment Section */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <textarea
                        placeholder="Add class comment..."
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                        rows={3}
                        aria-label="Class comment input"
                    />
                    <div className="flex justify-end mt-2">
                        <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                            Post
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

    // Classwork Tab Content
    const ClassworkTab = () => {
        // Function to format the due date
        const formatDueDate = (dueDate: string | null) => {
            if (!dueDate) return 'No due date';
            const date = new Date(dueDate);
            const options: Intl.DateTimeFormatOptions = {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            };
            const formattedDate = date.toLocaleDateString('en-US', options);
            const formattedTime = date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            });
            return `Due ${formattedDate}${formattedTime !== '00:00' ? `, ${formattedTime}` : ''}`;
        };

        // Function to determine if the assignment is past due
        const isPastDue = (dueDate: string | null) => {
            if (!dueDate) return false; // No due date means not past due
            const now = new Date();
            const due = new Date(dueDate);
            return now > due;
        };

        return (
            <div>
                {/* View Your Work Button */}
                <div className="mb-4">
                    <Button
                        variant="link"
                        onClick={() => alert('Implement "View your work" functionality')}
                        className="text-blue-600 hover:underline flex items-center text-sm font-medium p-0"
                        aria-label="View your work"
                    >
                        <svg
                            className="h-4 w-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                        </svg>
                        View your work
                    </Button>
                </div>

                {/* Assignments List */}
                <div className="space-y-4">
                    {classData.assignments.map((assignment) => {
                        const pastDue = isPastDue(assignment.dueDate);
                        return (
                            <div
                                key={assignment.id}
                                className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50"
                            >
                                <div className="flex items-center">
                                    {/* Status Indicator */}
                                    <div
                                        className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                                            pastDue ? 'bg-gray-200' : 'bg-blue-100'
                                        }`}
                                    >
                                        <svg
                                            className={`h-4 w-4 ${
                                                pastDue ? 'text-gray-500' : 'text-blue-600'
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                            />
                                        </svg>
                                    </div>
                                    {/* Assignment Details */}
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">
                                            {assignment.title}
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            {formatDueDate(assignment.dueDate)}
                                        </p>
                                    </div>
                                </div>
                                {/* More Button */}
                                <Button
                                    variant="ghost"
                                    className="text-gray-500 hover:text-gray-700"
                                    aria-label={`More options for ${assignment.title}`}
                                    title={`More options for ${assignment.title}`}
                                >
                                    <MoreVertical className="h-5 w-5" aria-hidden="true" />
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    // People Tab Content
    const PeopleTab = () => (
        <div>
            {/* Teachers Section */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">Teachers</h2>
                {classData.teachers.map((teacher, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between p-3 hover:bg-gray-50"
                    >
                        <div className="flex items-center">
                            <div
                                className={`h-10 w-10 rounded-full ${getRandomColor()} flex items-center justify-center mr-3 text-white font-medium`}
                            >
                                <span>{getInitials(teacher.name)}</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium">{teacher.name}</p>
                                {teacher.classCode && (
                                    <p className="text-xs text-gray-500">{teacher.classCode}</p>
                                )}
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            onClick={() => alert(`Email ${teacher.name}`)}
                            className="text-gray-500 hover:text-gray-700"
                            aria-label={`Email ${teacher.name}`}
                            title={`Email ${teacher.name}`}
                        >
                            <Mail className="h-5 w-5" aria-hidden="true" />
                        </Button>
                    </div>
                ))}
            </div>

            {/* Classmates Section */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Classmates</h2>
                    <p className="text-sm text-gray-500">{classData.classmates.length} students</p>
                </div>
                {classData.classmates.map((classmate, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between p-3 hover:bg-gray-50"
                    >
                        <div className="flex items-center">
                            <div
                                className={`h-10 w-10 rounded-full ${getRandomColor()} flex items-center justify-center mr-3 text-white font-medium`}
                            >
                                <span>{getInitials(classmate.name)}</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium">{classmate.name}</p>
                                {classmate.classCode && (
                                    <p className="text-xs text-gray-500">{classmate.classCode}</p>
                                )}
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            onClick={() => alert(`Email ${classmate.name}`)}
                            className="text-gray-500 hover:text-gray-700"
                            aria-label={`Email ${classmate.name}`}
                            title={`Email ${classmate.name}`}
                        >
                            <Mail className="h-5 w-5" aria-hidden="true" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );

    // Marks Tab Content
    const MarksTab = () => {
        // Mock data for marks
        const marksData = [
            {
                id: 1,
                name: 'Nguyen Manh Tien',
                scores: [
                    { test: 'Quiz 1', score: 85, status: 'Completed' },
                    { test: 'Assignment 1', score: 90, status: 'Completed' },
                    { test: 'Quiz 2', score: null, status: 'Not Submitted' },
                ],
            },
            {
                id: 2,
                name: 'Tran Huy Hoang',
                scores: [
                    { test: 'Quiz 1', score: 70, status: 'Completed' },
                    { test: 'Assignment 1', score: null, status: 'Not Submitted' },
                    { test: 'Quiz 2', score: 80, status: 'Completed' },
                ],
            },
            {
                id: 3,
                name: 'Phan Nguyen Doan Vu',
                scores: [
                    { test: 'Quiz 1', score: 95, status: 'Completed' },
                    { test: 'Assignment 1', score: 88, status: 'Completed' },
                    { test: 'Quiz 2', score: 92, status: 'Completed' },
                ],
            },
        ];

        // Extract unique test names
        const testNames = Array.from(
            new Set(marksData.flatMap((student) => student.scores.map((score) => score.test))),
        );

        return (
            <div>
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold">Marks Overview</h2>
                    <p className="text-gray-600">
                        Detailed scores and submission status for each student.
                    </p>
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-white p-4 rounded-lg shadow">
                    <table className="min-w-full text-left text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="p-3">Student Name</th>
                                {testNames.map((test, index) => (
                                    <th key={index} className="p-3">
                                        {test}
                                    </th>
                                ))}
                                <th className="p-3">Completed</th>
                                <th className="p-3">Not Submitted</th>
                            </tr>
                        </thead>
                        <tbody>
                            {marksData.map((student) => {
                                const completedCount = student.scores.filter(
                                    (score) => score.status === 'Completed',
                                ).length;
                                const notSubmittedCount = student.scores.filter(
                                    (score) => score.status === 'Not Submitted',
                                ).length;

                                return (
                                    <tr key={student.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3 font-medium">{student.name}</td>
                                        {student.scores.map((score, index) => (
                                            <td
                                                key={index}
                                                className={`p-3 ${
                                                    score.status === 'Completed'
                                                        ? 'text-green-600'
                                                        : 'text-red-600'
                                                }`}
                                            >
                                                {score.score !== null
                                                    ? `${score.score}/100`
                                                    : score.status}
                                            </td>
                                        ))}
                                        <td className="p-3 text-green-600">{completedCount}</td>
                                        <td className="p-3 text-red-600">{notSubmittedCount}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Summary Section */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Total Submissions */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">Total Submissions</h3>
                        <p className="text-gray-600">
                            {marksData.reduce(
                                (total, student) =>
                                    total +
                                    student.scores.filter((score) => score.status === 'Completed')
                                        .length,
                                0,
                            )}{' '}
                            completed submissions out of {marksData.length * testNames.length}.
                        </p>
                    </div>

                    {/* Not Submitted */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">Not Submitted</h3>
                        <p className="text-gray-600">
                            {marksData.reduce(
                                (total, student) =>
                                    total +
                                    student.scores.filter(
                                        (score) => score.status === 'Not Submitted',
                                    ).length,
                                0,
                            )}{' '}
                            submissions are still pending.
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    // Array of tabs for better management
    const tabs = [
        { id: 'stream', label: 'Stream', content: <StreamTab /> },
        { id: 'classwork', label: 'Classwork', content: <ClassworkTab /> },
        { id: 'people', label: 'People', content: <PeopleTab /> },
        { id: 'marks', label: 'Marks', content: <MarksTab /> },
    ];

    // Handle keyboard navigation for tabs
    const handleKeyDown = (e: React.KeyboardEvent, tabId: string) => {
        const currentIndex = tabs.findIndex((t) => t.id === tabId);
        let newIndex = currentIndex;

        if (e.key === 'ArrowRight') {
            newIndex = (currentIndex + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft') {
            newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setTab(tabId);
            return;
        } else {
            return;
        }

        setTab(tabs[newIndex].id);
        const nextTab = document.getElementById(`${tabs[newIndex].id}-tab-button`);
        if (nextTab) nextTab.focus();
    };

    return (
        <div className="flex-1 p-6">
            {/* Header Section */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold">
                    CODEGROW {'>'} {classData.title}
                </h1>
                <div className="flex items-center mt-2">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-4 py-2 border rounded-lg w-full max-w-md"
                        aria-label="Search classes"
                    />
                    <span className="ml-4 text-gray-600">
                        {classData.title} - {classData.code}
                    </span>
                </div>
            </div>

            {/* Navigation Tabs - Accessible Version */}
            <div className="mb-6">
                <div className="border-b">
                    <div role="tablist" className="flex space-x-4">
                        {tabs.map((tabItem) => (
                            <button
                                key={tabItem.id}
                                role="tab"
                                aria-selected={isActive(tabItem.id)}
                                aria-controls={`${tabItem.id}-panel`}
                                id={`${tabItem.id}-tab`}
                                tabIndex={isActive(tabItem.id) ? 0 : -1}
                                onClick={() => setTab(tabItem.id)}
                                onKeyDown={(e) => handleKeyDown(e, tabItem.id)}
                                className={`px-3 py-2 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                                    isActive(tabItem.id)
                                        ? 'text-blue-600 border-b-2 border-blue-600'
                                        : 'text-gray-600 hover:text-blue-600'
                                }`}
                            >
                                {tabItem.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            {tabs.map((tabItem) => (
                <div
                    key={tabItem.id}
                    id={`${tabItem.id}-panel`}
                    role="tabpanel"
                    aria-labelledby={`${tabItem.id}-tab`}
                    hidden={!isActive(tabItem.id)}
                >
                    {/* Nội dung của tab */}
                    {tabItem.content}
                </div>
            ))}
        </div>
    );
}
