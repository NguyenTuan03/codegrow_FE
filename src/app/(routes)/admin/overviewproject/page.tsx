'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from '@/components/ui/pagination';
import { Filter, MoreVertical } from 'lucide-react';

const projects = [
    {
        name: 'Cloud computing web service',
        tasks: 120,
        members: ['A', 'B', 'C'],
        status: 'In progress',
        completion: 35,
        dueDate: '05 May',
        updated: '2 minutes ago',
    },
    {
        name: 'Improve profile UX',
        tasks: 28,
        members: [],
        status: 'Completed',
        completion: 100,
        dueDate: '01 May',
        updated: '1 month ago',
    },
    {
        name: 'Build stronger customer relationships',
        tasks: 1,
        members: ['A'],
        status: 'To do',
        completion: 0,
        dueDate: '-',
        updated: '1 month ago',
    },
    {
        name: 'Update social banners',
        tasks: 21,
        members: ['A', 'B', 'C'],
        status: 'In progress',
        completion: 5,
        dueDate: '21 May',
        updated: '2 weeks ago',
    },
    {
        name: 'Update subscription method',
        tasks: 0,
        members: ['A', 'B'],
        status: 'In progress',
        completion: 100,
        dueDate: '25 May',
        updated: '2 hours ago',
    },
    {
        name: 'Project 6',
        tasks: 12,
        members: ['A'],
        status: 'To do',
        completion: 0,
        dueDate: '10 May',
        updated: '4 days ago',
    },
    {
        name: 'Project 7',
        tasks: 56,
        members: ['B'],
        status: 'In progress',
        completion: 50,
        dueDate: '15 May',
        updated: '1 day ago',
    },
];

export default function ProjectsOverview() {
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(projects.length / itemsPerPage);

    const paginatedProjects = projects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
            {/* Breadcrumb */}
            <nav className="mb-4 text-base text-gray-600 dark:text-gray-400">
                <span>Pages / Projects / </span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">Overview</span>
            </nav>

            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">Overview</h1>

            {/* Summary */}
            <div className="mb-8">
                <div className="flex items-center space-x-4">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">24</h2>
                    <span className="text-sm text-red-500">2 late in due</span>
                </div>
                <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                            In progress (10)
                        </span>
                        <Progress
                            value={41.67}
                            className="w-24 h-2 bg-blue-200 dark:bg-blue-900 [&>div]:bg-blue-500 dark:[&>div]:bg-blue-400"
                        />
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                            Completed (8)
                        </span>
                        <Progress
                            value={33.33}
                            className="w-24 h-2 bg-green-200 dark:bg-green-900 [&>div]:bg-green-500 dark:[&>div]:bg-green-400"
                        />
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                            To do (6)
                        </span>
                        <Progress
                            value={25}
                            className="w-24 h-2 bg-gray-200 dark:bg-gray-800 [&>div]:bg-gray-400 dark:[&>div]:bg-gray-600"
                        />
                    </div>
                </div>
            </div>

            {/* Filter & Search */}
            <div className="flex justify-between items-center mb-6">
                <Input
                    placeholder="Search users"
                    className="w-1/3 h-12 text-base rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
                <div className="flex space-x-3">
                    <Button className="h-12 px-6 text-base rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                        Export
                    </Button>
                    <Button
                        variant="outline"
                        className="h-12 px-6 text-base rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <Filter className="h-5 w-5 mr-2" /> Filter{' '}
                        <span className="ml-2 text-gray-500 dark:text-gray-400">(2)</span>
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-gray-200 dark:border-gray-700">
                            <TableHead className="text-gray-600 dark:text-gray-400">
                                Project
                            </TableHead>
                            <TableHead className="text-gray-600 dark:text-gray-400">
                                Tasks
                            </TableHead>
                            <TableHead className="text-gray-600 dark:text-gray-400">
                                Members
                            </TableHead>
                            <TableHead className="text-gray-600 dark:text-gray-400">
                                Status
                            </TableHead>
                            <TableHead className="text-gray-600 dark:text-gray-400">
                                Completion
                            </TableHead>
                            <TableHead className="text-gray-600 dark:text-gray-400">
                                Due date
                            </TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedProjects.map((project, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3 text-lg font-medium text-purple-700 dark:text-purple-400">
                                            {project.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-gray-100">
                                                {project.name}
                                            </p>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                Updated {project.updated}
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-gray-900 dark:text-gray-100">
                                    {project.tasks}
                                </TableCell>
                                <TableCell>
                                    <div className="flex -space-x-2">
                                        {project.members.length > 0 ? (
                                            project.members.map((member, i) => (
                                                <Avatar
                                                    key={i}
                                                    className="h-8 w-8 border-2 border-white dark:border-gray-800"
                                                >
                                                    <AvatarFallback className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                                                        {member}
                                                    </AvatarFallback>
                                                </Avatar>
                                            ))
                                        ) : (
                                            <span className="text-sm text-gray-700 dark:text-gray-400">
                                                No assignee
                                            </span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span
                                        className={`font-medium ${
                                            project.status === 'In progress'
                                                ? 'text-blue-500 dark:text-blue-400'
                                                : project.status === 'Completed'
                                                  ? 'text-green-500 dark:text-green-400'
                                                  : 'text-gray-500 dark:text-gray-400'
                                        }`}
                                    >
                                        {project.status}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <Progress
                                            value={project.completion}
                                            className={`w-24 h-2 ${
                                                project.status === 'In progress'
                                                    ? 'bg-blue-200 dark:bg-blue-900 [&>div]:bg-blue-500 dark:[&>div]:bg-blue-400'
                                                    : project.status === 'Completed'
                                                      ? 'bg-green-200 dark:bg-green-900 [&>div]:bg-green-500 dark:[&>div]:bg-green-400'
                                                      : 'bg-gray-200 dark:bg-gray-800 [&>div]:bg-gray-400 dark:[&>div]:bg-gray-600'
                                            }`}
                                        />
                                        <span className="text-sm text-gray-900 dark:text-gray-100">
                                            {project.completion}%
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-gray-900 dark:text-gray-100">
                                    {project.dueDate}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                                    >
                                        <MoreVertical className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="mt-6">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    href="#"
                                    isActive={i + 1 === currentPage}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className="dark:text-gray-100 dark:hover:bg-gray-700"
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
