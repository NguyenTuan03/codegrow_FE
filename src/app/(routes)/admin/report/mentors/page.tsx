// DashboardPage.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    ChevronRight,
    Users,
    BookOpen,
    UserCheck,
    DollarSign,
    Trophy,
    Flag,
    Edit,
    FileText,
    ArrowUp,
    ArrowDown,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Define TypeScript interfaces for our data
interface Teacher {
    id: number;
    name: string;
    qualification: string;
    subject: string;
    subjectColor: string;
    avatar?: string;
}

interface Activity {
    user: string;
    time: string;
    action: string;
    link?: string;
    note?: string;
    avatar?: string;
}

interface Applicant {
    id: string;
    name: string;
    category: string;
    designation: string;
    location: string;
    date: string;
    type: string;
    avatar?: string;
}

interface Position {
    id: string;
    title: string;
    completion: string;
    candidates: string;
    bgColor: string;
}

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    color: string;
}

interface CandidateStatProps {
    label: string;
    count: string;
    percent: string;
    trending: 'up' | 'down';
}

export default function DashboardPage() {
    return (
        <div className="p-6 bg-gray-50">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm mb-6 text-gray-500">
                <span>Report</span>
                <ChevronRight className="w-4 h-4 mx-1" />
                <span>Mentors</span>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                <StatCard
                    icon={<Users className="w-6 h-6 text-white" />}
                    title="Students"
                    value="62,784"
                    color="bg-indigo-500"
                />
                <StatCard
                    icon={<BookOpen className="w-6 h-6 text-white" />}
                    title="Teachers"
                    value="3,765"
                    color="bg-pink-500"
                />
                <StatCard
                    icon={<UserCheck className="w-6 h-6 text-white" />}
                    title="Total Staff"
                    value="8,475"
                    color="bg-blue-500"
                />
                <StatCard
                    icon={<DollarSign className="w-6 h-6 text-white" />}
                    title="Revenue"
                    value="$27,987"
                    color="bg-orange-500"
                />
                <StatCard
                    icon={<Trophy className="w-6 h-6 text-white" />}
                    title="Awards"
                    value="855"
                    color="bg-amber-500"
                />
            </div>

            {/* Teachers Table */}
            <Card className="mb-8">
                <CardHeader className="py-4 px-6 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-medium">Teachers List</CardTitle>
                    <Button variant="ghost" size="sm" className="text-xs gap-1">
                        View All <ChevronRight className="w-3 h-3" />
                    </Button>
                </CardHeader>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[250px]">Teacher</TableHead>
                            <TableHead>Qualification</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {teachers.map((teacher) => (
                            <TableRow key={teacher.id}>
                                <TableCell className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={teacher.avatar} alt={teacher.name} />
                                        <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span>{teacher.name}</span>
                                </TableCell>
                                <TableCell>{teacher.qualification}</TableCell>
                                <TableCell>
                                    <span className={teacher.subjectColor}>{teacher.subject}</span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Activity Feed */}
                <Card className="lg:col-span-1">
                    <CardHeader className="py-4 px-6 flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-medium">Activity</CardTitle>
                        <Button variant="ghost" size="sm" className="text-xs gap-1">
                            View All <ChevronRight className="w-3 h-3" />
                        </Button>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="space-y-4">
                            {activities.map((activity, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={activity.avatar} alt={activity.user} />
                                        <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <span className="font-medium text-sm">
                                                {activity.user}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {activity.time}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {activity.action}{' '}
                                            {activity.link && (
                                                <span className="text-blue-500">
                                                    {activity.link}
                                                </span>
                                            )}
                                        </p>
                                        {activity.note && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                {activity.note}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Applicants */}
                <Card className="lg:col-span-2">
                    <CardHeader className="py-4 px-6">
                        <CardTitle className="text-lg font-medium">Recent Applicants</CardTitle>
                    </CardHeader>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12">#</TableHead>
                                    <TableHead>Candidate</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Designation</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {applicants.map((applicant) => (
                                    <TableRow key={applicant.id}>
                                        <TableCell>{applicant.id}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage
                                                        src={applicant.avatar}
                                                        alt={applicant.name}
                                                    />
                                                    <AvatarFallback>
                                                        {applicant.name.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span>{applicant.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{applicant.category}</TableCell>
                                        <TableCell>
                                            <span className="text-blue-500">
                                                {applicant.designation}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Flag className="w-3 h-3" />
                                                <span>{applicant.location}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{applicant.date}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={
                                                    applicant.type === 'Full-time'
                                                        ? 'text-blue-500 border-blue-200 bg-blue-50'
                                                        : applicant.type === 'Freelance'
                                                          ? 'text-green-500 border-green-200 bg-green-50'
                                                          : 'text-red-500 border-red-200 bg-red-50'
                                                }
                                            >
                                                {applicant.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-1">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <FileText className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex justify-between items-center p-4 border-t">
                        <div className="text-sm text-gray-500">
                            Showing 5 Entries <ChevronRight className="w-3 h-3 inline ml-1" />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Previous</span>
                            <Badge className="bg-blue-500 hover:bg-blue-600">1</Badge>
                            <span className="text-sm">next</span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                {/* Gender Chart */}
                <Card>
                    <CardHeader className="py-4 px-6">
                        <CardTitle className="text-lg font-medium">Candidates By Gender</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="flex justify-center mb-6">
                            {/* Donut chart representation */}
                            <div className="relative w-32 h-32">
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                    <circle cx="50" cy="50" r="40" fill="#e0e7ff" />
                                    <path
                                        d="M50,50 L50,10 A40,40 0 0,1 90,50 L50,50"
                                        fill="#6366f1"
                                    />
                                    <circle cx="50" cy="50" r="25" fill="white" />
                                    <text
                                        x="50"
                                        y="45"
                                        textAnchor="middle"
                                        fontSize="8"
                                        fontWeight="medium"
                                    >
                                        Total
                                    </text>
                                    <text
                                        x="50"
                                        y="55"
                                        textAnchor="middle"
                                        fontSize="10"
                                        fontWeight="bold"
                                    >
                                        2288
                                    </text>
                                </svg>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <CandidateStat
                                label="Male Candidates"
                                count="15,754"
                                percent="+1.5%"
                                trending="up"
                            />
                            <CandidateStat
                                label="Female Candidates"
                                count="4,872"
                                percent="+1.3%"
                                trending="down"
                            />
                            <CandidateStat
                                label="Total Candidates"
                                count="2.5k"
                                percent="+0.8%"
                                trending="up"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Need To Hire */}
                <Card>
                    <CardHeader className="py-4 px-6 flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-medium">Need To Hire</CardTitle>
                        <Button variant="ghost" size="sm" className="text-xs gap-1">
                            View All <ChevronRight className="w-3 h-3" />
                        </Button>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="space-y-4">
                            {positions.map((position) => (
                                <div
                                    key={position.id}
                                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-md"
                                >
                                    <div
                                        className={`w-10 h-10 flex items-center justify-center rounded-md text-white ${position.bgColor}`}
                                    >
                                        {position.id}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h4 className="font-medium text-sm">
                                                    {position.title}
                                                </h4>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    Status: {position.completion} completed
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-gray-500">
                                                    Candidates
                                                </div>
                                                <div className="font-medium">
                                                    {position.candidates}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// Components
function StatCard({ icon, title, value, color }: StatCardProps) {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-center gap-4">
                    <div
                        className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}
                    >
                        {icon}
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">{title}</div>
                        <div className="font-bold text-xl">{value}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function CandidateStat({ label, count, percent, trending }: CandidateStatProps) {
    return (
        <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">{label}</div>
            <div className="flex items-center gap-2">
                <span className="font-medium">{count}</span>
                <span
                    className={`text-xs ${trending === 'up' ? 'text-green-500' : 'text-red-500'} flex items-center gap-1`}
                >
                    {percent}
                    {trending === 'up' ? (
                        <ArrowUp className="w-3 h-3" />
                    ) : (
                        <ArrowDown className="w-3 h-3" />
                    )}
                </span>
            </div>
        </div>
    );
}

// Sample Data
const teachers: Teacher[] = [
    {
        id: 1,
        name: 'John Smith',
        qualification: 'M.Ed',
        subject: 'Mathematics',
        subjectColor: 'text-blue-500',
    },
    {
        id: 2,
        name: 'Mary Johnson',
        qualification: 'B.A. in English',
        subject: 'English',
        subjectColor: 'text-indigo-500',
    },
    {
        id: 3,
        name: 'Robert Davis',
        qualification: 'Ph.D. in Science',
        subject: 'Physics',
        subjectColor: 'text-red-500',
    },
    {
        id: 4,
        name: 'Sarah Thompson',
        qualification: 'M.A. in History',
        subject: 'History',
        subjectColor: 'text-orange-500',
    },
    {
        id: 5,
        name: 'Michael Brown',
        qualification: 'B.Ed',
        subject: 'Chemistry',
        subjectColor: 'text-purple-500',
    },
    {
        id: 6,
        name: 'Emily Wilson',
        qualification: 'M.A. in Geography',
        subject: 'Geography',
        subjectColor: 'text-pink-500',
    },
    {
        id: 7,
        name: 'Sarah Smith',
        qualification: 'M.A.',
        subject: 'Hindi',
        subjectColor: 'text-amber-500',
    },
];

const activities: Activity[] = [
    {
        user: 'Mr. Thomas Brown',
        time: '02:30PM',
        action: 'Liked a post from',
        link: 'Ms. Sarah Parker',
        note: 'about the upcoming school event',
    },
    {
        user: 'Mr. John Doe',
        time: '12:47PM',
        action: 'Updated class schedule',
    },
    {
        user: 'Ms. Jane Smith',
        time: '10:22AM',
        action: 'Posted a',
        link: 'new announcement',
        note: 'Reminder: Parent-Teacher meeting on Friday at 3 PM 📅',
    },
    {
        user: 'Mrs. Emily Davis',
        time: '11:30AM',
        action: "Commented on a student's project -",
        link: 'Excellent Work',
    },
    {
        user: 'Alice Johnson',
        time: '11:49AM',
        action: 'Submitted a report -',
        link: 'Science Project',
    },
    {
        user: 'Mr. Bob Anderson',
        time: '10:54AM',
        action: 'Reviewed a submission from',
        link: 'Jane Smith',
    },
];

const applicants: Applicant[] = [
    {
        id: '01',
        name: 'Mayra Kelly',
        category: 'Manufacture',
        designation: 'Team Lead',
        location: 'Germany',
        date: 'Sep 15 - Oct 12, 2023',
        type: 'Full-time',
    },
    {
        id: '02',
        name: 'Andrew Garfield',
        category: 'Development',
        designation: 'Sr UI Developer',
        location: 'Canada',
        date: 'Apr 15 - Dec 12, 2023',
        type: 'Full-time',
    },
    {
        id: '03',
        name: 'Simon Cowel',
        category: 'Service',
        designation: 'Sr UI Developer',
        location: 'Kenya',
        date: 'Sep 15 - Oct 12, 2023',
        type: 'Full-time',
    },
    {
        id: '04',
        name: 'Natalie Hars',
        category: 'Marketing',
        designation: 'Sales Executive',
        location: 'USA',
        date: 'Apr 15 - Dec 12, 2023',
        type: 'Remote',
    },
    {
        id: '05',
        name: 'Andrew Garfield',
        category: 'Development',
        designation: 'Sr UI Developer',
        location: 'London',
        date: 'Jun 15 - Dec 12, 2022',
        type: 'Freelance',
    },
];

const positions: Position[] = [
    {
        id: 'UD',
        title: 'UI/UX Designers',
        completion: '75%',
        candidates: '03',
        bgColor: 'bg-indigo-500',
    },
    {
        id: 'SD',
        title: 'Senior Developer',
        completion: '15%',
        candidates: '12',
        bgColor: 'bg-pink-500',
    },
    {
        id: 'MM',
        title: 'Marketing Manager',
        completion: '35%',
        candidates: '08',
        bgColor: 'bg-pink-600',
    },
    {
        id: 'CW',
        title: 'Content Writers',
        completion: '15%',
        candidates: '01',
        bgColor: 'bg-orange-500',
    },
    {
        id: 'RD',
        title: 'React Developer',
        completion: '45%',
        candidates: '03',
        bgColor: 'bg-amber-500',
    },
];
