'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Filter, MoreVertical } from 'lucide-react';

export default function OverviewUser() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-100 p-8">
            {/* Breadcrumb Navigation */}
            <nav className="mb-4 text-base text-gray-600 dark:text-gray-400">
                <span>Pages / Users / </span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">Overview</span>
            </nav>

            {/* Page Title */}
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">Users</h1>

            {/* Main Content: User Stats and Table */}
            <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                {/* User Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="border rounded-xl p-6 bg-gray-50 dark:bg-gray-700 hover:shadow-md transition-shadow">
                        <h3 className="text-sm text-gray-500 dark:text-gray-400 uppercase mb-2">
                            Total Users
                        </h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            24{' '}
                            <span className="text-base text-gray-500 dark:text-gray-400">
                                from 22
                            </span>
                        </p>
                        <p className="text-green-600 dark:text-green-400 text-base font-medium">
                            +5.0%
                        </p>
                    </div>
                    <div className="border rounded-xl p-6 bg-gray-50 dark:bg-gray-700 hover:shadow-md transition-shadow">
                        <h3 className="text-sm text-gray-500 dark:text-gray-400 uppercase mb-2">
                            Active Members
                        </h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            12{' '}
                            <span className="text-base text-gray-500 dark:text-gray-400">
                                from 11
                            </span>
                        </p>
                        <p className="text-green-600 dark:text-green-400 text-base font-medium">
                            +17.2%
                        </p>
                    </div>
                    <div className="border rounded-xl p-6 bg-gray-50 dark:bg-gray-700 hover:shadow-md transition-shadow">
                        <h3 className="text-sm text-gray-500 dark:text-gray-400 uppercase mb-2">
                            New/Returning
                        </h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            56%{' '}
                            <span className="text-base text-gray-500 dark:text-gray-400">
                                vs 48.7%
                            </span>
                        </p>
                        <p className="text-green-600 dark:text-green-400 text-base font-medium">
                            +2.8%
                        </p>
                    </div>
                    <div className="border rounded-xl p-6 bg-gray-50 dark:bg-gray-700 hover:shadow-md transition-shadow">
                        <h3 className="text-sm text-gray-500 dark:text-gray-400 uppercase mb-2">
                            Active Members
                        </h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            28%{' '}
                            <span className="text-base text-gray-500 dark:text-gray-400">
                                vs 28.8%
                            </span>
                        </p>
                        <p className="text-red-600 dark:text-red-400 text-base font-medium">0%</p>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="flex justify-between items-center mb-6">
                    <Input
                        placeholder="Search users"
                        className="w-1/3 h-12 text-base rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex space-x-3">
                        <Button className="h-12 px-6 text-base rounded-lg bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600">
                            Export
                        </Button>
                        <Button
                            variant="outline"
                            className="h-12 px-6 text-base rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                            <Filter className="h-5 w-5 mr-2" /> Filter{' '}
                            <span className="ml-2 text-gray-500 dark:text-gray-400">(2)</span>
                        </Button>
                    </div>
                </div>

                {/* User Table */}
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-gray-200 dark:border-gray-700">
                            <TableHead className="text-base text-gray-700 dark:text-gray-300">
                                Name
                            </TableHead>
                            <TableHead className="text-base text-gray-700 dark:text-gray-300">
                                Role
                            </TableHead>
                            <TableHead className="text-base text-gray-700 dark:text-gray-300">
                                Country
                            </TableHead>
                            <TableHead className="text-base text-gray-700 dark:text-gray-300">
                                Status
                            </TableHead>
                            <TableHead className="text-base text-gray-700 dark:text-gray-300">
                                Type
                            </TableHead>
                            <TableHead className="text-base text-gray-700 dark:text-gray-300">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <TableCell>
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center mr-3 text-lg font-medium text-purple-700 dark:text-purple-300">
                                        A
                                    </div>
                                    <div>
                                        <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                                            Anne Richard
                                        </p>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            anne@site.com
                                        </span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-base text-gray-700 dark:text-gray-300">
                                Seller
                            </TableCell>
                            <TableCell className="text-base text-gray-700 dark:text-gray-300">
                                Branding products
                            </TableCell>
                            <TableCell>
                                <span className="text-green-600 dark:text-green-400 text-base font-medium">
                                    Pending
                                </span>
                            </TableCell>
                            <TableCell className="text-base text-gray-700 dark:text-gray-300">
                                Employee
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="ghost"
                                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                                >
                                    <MoreVertical className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
