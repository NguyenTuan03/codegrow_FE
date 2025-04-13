// ProjectDetailPage.tsx
'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, ChevronDown, Clock, FileText } from 'lucide-react';

interface TeamMember {
    id: number;
    name: string;
    avatar?: string;
}

interface StatCard {
    label: string;
    value: string;
    percentage: string;
    color: string;
}

interface Event {
    id: number;
    title: string;
    time: string;
    date: string;
    type: string;
    attendees: TeamMember[];
}

interface ExpenseCategory {
    name: string;
    amount: string;
    color: string;
}

interface TeamMemberStats {
    id: number;
    name: string;
    avatar?: string;
    days: number;
    hours: string;
    tasks: number;
}

export default function ProjectDetailPage() {
    const [activeTab, setActiveTab] = useState('overview');

    const statCards: StatCard[] = [
        { label: 'Spent', value: '$14,815.00 USD', percentage: '51%', color: 'bg-blue-500' },
        { label: 'Progress', value: '17%', percentage: '60%', color: 'bg-green-500' },
        { label: 'Tasks closed', value: '75', percentage: '75%', color: 'bg-indigo-500' },
        { label: 'Goals', value: '41/100', percentage: '41%', color: 'bg-amber-500' },
    ];

    const teamMembers: TeamMember[] = [
        { id: 1, name: 'Amanda', avatar: '/avatars/amanda.png' },
        { id: 2, name: 'David', avatar: '/avatars/david.png' },
        { id: 3, name: 'Sara', avatar: '/avatars/sara.png' },
        { id: 4, name: 'Mike', avatar: '/avatars/mike.png' },
        { id: 5, name: 'Ella', avatar: '/avatars/ella.png' },
    ];

    const events: Event[] = [
        {
            id: 1,
            title: 'Weekly overview',
            time: '12:00 - 03:00 PM',
            date: '24 Mar, 2023',
            type: 'weekly',
            attendees: teamMembers.slice(0, 4),
        },
        {
            id: 2,
            title: 'Project tasks',
            time: '04:30 - 04:50 PM',
            date: '25 Mar, 2023',
            type: 'tasks',
            attendees: teamMembers.slice(1, 4),
        },
        {
            id: 3,
            title: 'Monthly reports',
            time: '12:00 - 03:00 PM',
            date: '27 Mar, 2023',
            type: 'monthly',
            attendees: teamMembers.slice(0, 5),
        },
    ];

    const expenseCategories: ExpenseCategory[] = [
        { name: 'Marketing', amount: '$2,332.00', color: 'bg-blue-500' },
        { name: 'Bills', amount: '$10,452.00', color: 'bg-red-500' },
        { name: 'Others', amount: '$56,856.00', color: 'bg-cyan-500' },
    ];

    const teamMemberStats: TeamMemberStats[] = [
        {
            id: 1,
            name: 'Amanda Harvey',
            avatar: '/avatars/amanda.png',
            days: 28,
            hours: '45:12',
            tasks: 35,
        },
        {
            id: 2,
            name: 'Sara Ivans',
            avatar: '/avatars/sara.png',
            days: 15,
            hours: '24:06',
            tasks: 31,
        },
        {
            id: 3,
            name: 'David Harrison',
            avatar: '/avatars/david.png',
            days: 22,
            hours: '67:38',
            tasks: 76,
        },
        {
            id: 4,
            name: 'Ella Laudia',
            avatar: '/avatars/ella.png',
            days: 35,
            hours: '53:31',
            tasks: 42,
        },
        {
            id: 5,
            name: 'Bob Dixon',
            avatar: '/avatars/bob.png',
            days: 18,
            hours: '32:15',
            tasks: 28,
        },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Project Header */}
                <div className="bg-white border-b px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h1 className="text-lg font-medium">Cloud computing web service</h1>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                    <span>Client: MonsterTeam</span>
                                    <span className="mx-3">•</span>
                                    <span>Due date: 25/06/2023</span>
                                    <span className="mx-3">•</span>
                                    <div className="flex items-center">
                                        <Avatar className="h-5 w-5">
                                            <AvatarImage
                                                src="/avatars/mark.png"
                                                alt="Mark Williams"
                                            />
                                            <AvatarFallback>MW</AvatarFallback>
                                        </Avatar>
                                        <span className="ml-1">Mark Williams</span>
                                        <ChevronDown className="h-4 w-4 ml-1" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="text-xs uppercase font-medium text-gray-500 mr-2">
                                Team members:
                            </div>
                            <div className="flex -space-x-2 mr-4">
                                {teamMembers.slice(0, 4).map((member) => (
                                    <Avatar
                                        key={member.id}
                                        className="border-2 border-white h-8 w-8"
                                    >
                                        <AvatarImage src={member.avatar} alt={member.name} />
                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                ))}
                                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 border-2 border-white text-xs font-medium">
                                    +2
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="rounded-full bg-gray-100 h-8 w-8 p-0"
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H7.50003C7.22389 8 7.00003 7.77614 7.00003 7.5V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </Button>
                        </div>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
                        <TabsList className="border-b w-full justify-start bg-transparent p-0">
                            <TabsTrigger
                                value="overview"
                                className={`pb-2 px-4 border-b-2 transition-colors ${
                                    activeTab === 'overview'
                                        ? 'border-blue-500 text-blue-500'
                                        : 'border-transparent hover:border-gray-300'
                                }`}
                            >
                                Overview
                            </TabsTrigger>
                            <TabsTrigger
                                value="files"
                                className={`pb-2 px-4 border-b-2 transition-colors ${
                                    activeTab === 'files'
                                        ? 'border-blue-500 text-blue-500'
                                        : 'border-transparent hover:border-gray-300'
                                }`}
                            >
                                Files
                            </TabsTrigger>
                            <TabsTrigger
                                value="activity"
                                className={`pb-2 px-4 border-b-2 transition-colors ${
                                    activeTab === 'activity'
                                        ? 'border-blue-500 text-blue-500'
                                        : 'border-transparent hover:border-gray-300'
                                }`}
                            >
                                Activity
                            </TabsTrigger>
                            <TabsTrigger
                                value="teams"
                                className={`pb-2 px-4 border-b-2 transition-colors ${
                                    activeTab === 'teams'
                                        ? 'border-blue-500 text-blue-500'
                                        : 'border-transparent hover:border-gray-300'
                                }`}
                            >
                                Teams
                            </TabsTrigger>
                            <TabsTrigger
                                value="settings"
                                className={`pb-2 px-4 border-b-2 transition-colors ${
                                    activeTab === 'settings'
                                        ? 'border-blue-500 text-blue-500'
                                        : 'border-transparent hover:border-gray-300'
                                }`}
                            >
                                Settings
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-auto p-6">
                    <Tabs>
                        <TabsContent value="overview" className="mt-0">
                            {/* Stats Row */}
                            <div className="grid grid-cols-4 gap-6 mb-6">
                                {statCards.map((stat, index) => (
                                    <Card key={index} className="overflow-hidden">
                                        <CardContent className="p-4 flex items-center">
                                            <div className="flex-1">
                                                <div className="text-sm text-gray-500">
                                                    {stat.label}
                                                </div>
                                                <div className="font-medium mt-1">{stat.value}</div>
                                            </div>
                                            <div className="relative h-12 w-12">
                                                <svg
                                                    viewBox="0 0 36 36"
                                                    className="h-12 w-12 rotate-[-90deg]"
                                                >
                                                    <circle
                                                        cx="18"
                                                        cy="18"
                                                        r="16"
                                                        fill="none"
                                                        stroke="#e9ecef"
                                                        strokeWidth="2"
                                                    ></circle>
                                                    <circle
                                                        cx="18"
                                                        cy="18"
                                                        r="16"
                                                        fill="none"
                                                        stroke={stat.color}
                                                        strokeWidth="2"
                                                        strokeDasharray={`${parseFloat(stat.percentage) * 100.53} 100`}
                                                        strokeLinecap="round"
                                                    ></circle>
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                                                    {stat.percentage}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Project Budget */}
                            <div className="flex justify-between items-center mb-6">
                                <div className="text-sm text-gray-500">PROJECT BUDGET</div>
                                <div className="text-lg font-medium">$150,000.00 USD</div>
                                <Button variant="ghost" size="sm" className="text-xs">
                                    <FileText className="h-3 w-3 mr-1" /> Export
                                </Button>
                            </div>

                            {/* Chart */}
                            <div className="bg-white border rounded-md p-6 mb-6">
                                <div className="h-48 w-full">
                                    <svg
                                        width="100%"
                                        height="100%"
                                        viewBox="0 0 800 200"
                                        preserveAspectRatio="none"
                                    >
                                        <path
                                            d="M0,150 C100,120 150,180 200,150 C250,120 300,80 350,100 C400,120 450,180 500,130 C550,80 600,120 650,100 C700,80 750,40 800,60"
                                            fill="none"
                                            stroke="#69c0ff"
                                            strokeWidth="2"
                                        />
                                        <path
                                            d="M0,120 C50,100 100,140 150,130 C200,120 250,90 300,110 C350,130 400,150 450,140 C500,130 550,100 600,110 C650,120 700,140 750,130 C800,120"
                                            fill="none"
                                            stroke="#36cfc9"
                                            strokeWidth="2"
                                        />
                                    </svg>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <div>Feb</div>
                                    <div>Jan</div>
                                    <div>Mar</div>
                                    <div>Apr</div>
                                    <div>May</div>
                                    <div>Jun</div>
                                    <div>Jul</div>
                                    <div>Aug</div>
                                    <div>Sep</div>
                                    <div>Oct</div>
                                    <div>Nov</div>
                                    <div>Dec</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {/* Expenses */}
                                <div className="bg-white border rounded-md p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="font-medium">Expenses</div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-xs h-6"
                                            >
                                                This week
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-xs h-6"
                                            >
                                                Last week
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex justify-center mb-6">
                                        <div className="relative h-40 w-40">
                                            <svg viewBox="0 0 36 36" className="h-40 w-40">
                                                <circle
                                                    cx="18"
                                                    cy="18"
                                                    r="15.915"
                                                    fill="none"
                                                    stroke="#e9ecef"
                                                    strokeWidth="1"
                                                ></circle>
                                                <circle
                                                    cx="18"
                                                    cy="18"
                                                    r="15.915"
                                                    fill="none"
                                                    stroke="#3b82f6"
                                                    strokeWidth="3.5"
                                                    strokeDasharray="30 100"
                                                    strokeLinecap="round"
                                                ></circle>
                                                <circle
                                                    cx="18"
                                                    cy="18"
                                                    r="15.915"
                                                    fill="none"
                                                    stroke="#ef4444"
                                                    strokeWidth="3.5"
                                                    strokeDasharray="20 100"
                                                    strokeDashoffset="-30"
                                                    strokeLinecap="round"
                                                ></circle>
                                                <circle
                                                    cx="18"
                                                    cy="18"
                                                    r="15.915"
                                                    fill="none"
                                                    stroke="#06b6d4"
                                                    strokeWidth="3.5"
                                                    strokeDasharray="50 100"
                                                    strokeDashoffset="-50"
                                                    strokeLinecap="round"
                                                ></circle>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {expenseCategories.map((category, index) => (
                                            <div key={index} className="flex items-center">
                                                <div
                                                    className={`h-3 w-3 rounded-full ${category.color} mr-2`}
                                                ></div>
                                                <div className="text-sm">{category.name}</div>
                                                <div className="ml-auto font-medium">
                                                    {category.amount}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Events */}
                                <div className="bg-white border rounded-md p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="font-medium">Events</div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-xs h-6"
                                            >
                                                This week
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-xs h-6"
                                            >
                                                Next week
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {events.map((event) => (
                                            <div key={event.id} className="flex gap-3">
                                                <div className="w-1 self-stretch rounded-full bg-blue-500"></div>
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <div className="flex items-center gap-1 text-blue-500">
                                                                <Clock className="h-3 w-3" />
                                                                <span className="text-sm">
                                                                    {event.time}
                                                                </span>
                                                            </div>
                                                            <div className="font-medium mt-1">
                                                                {event.title}
                                                            </div>
                                                            <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                                                <Calendar className="h-3 w-3" />
                                                                {event.date}
                                                            </div>
                                                        </div>
                                                        <div className="flex -space-x-2">
                                                            {event.attendees.map((attendee) => (
                                                                <Avatar
                                                                    key={attendee.id}
                                                                    className="border-2 border-white h-6 w-6"
                                                                >
                                                                    <AvatarImage
                                                                        src={attendee.avatar}
                                                                        alt={attendee.name}
                                                                    />
                                                                    <AvatarFallback>
                                                                        {attendee.name.charAt(0)}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Hours spent */}
                            <div className="bg-white border rounded-md p-6 mt-6">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center">
                                        <div className="font-medium">Hours spent</div>
                                        <div className="ml-2 h-2 w-2 rounded-full bg-blue-500"></div>
                                    </div>
                                    <div className="text-sm text-gray-500">Mar 2 - Mar 2, 2025</div>
                                </div>

                                <div className="h-32 w-full overflow-hidden">
                                    {/* Heatmap placeholder */}
                                    <div className="grid grid-cols-30 gap-0.5">
                                        {Array.from({ length: 60 }).map((_, index) => (
                                            <div
                                                key={index}
                                                className={`h-4 w-4 rounded-sm ${Math.random() > 0.5 ? 'bg-blue-100' : Math.random() > 0.7 ? 'bg-blue-300' : 'bg-gray-100'}`}
                                            ></div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between text-xs text-gray-500 mt-8">
                                    <div>Feb 25</div>
                                    <div>Mar 13</div>
                                    <div>Jul 23</div>
                                    <div>Oct 17</div>
                                    <div>Dec 30</div>
                                </div>

                                <div className="flex justify-between text-xs text-gray-500 mt-4">
                                    <div>0</div>
                                    <div>24</div>
                                </div>

                                {/* Team members stats */}
                                <div className="mt-6 border-t pt-6">
                                    <div className="grid grid-cols-4 gap-6 mb-4">
                                        <div></div>
                                        <div className="text-xs text-gray-500 uppercase">Days</div>
                                        <div className="text-xs text-gray-500 uppercase">Hours</div>
                                        <div className="text-xs text-gray-500 uppercase">Tasks</div>
                                    </div>

                                    {teamMemberStats.map((member) => (
                                        <div
                                            key={member.id}
                                            className="grid grid-cols-4 gap-6 py-4 border-b"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage
                                                        src={member.avatar}
                                                        alt={member.name}
                                                    />
                                                    <AvatarFallback>
                                                        {member.name.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="font-medium">{member.name}</div>
                                            </div>
                                            <div className="text-sm">{member.days}</div>
                                            <div className="text-sm">{member.hours}</div>
                                            <div className="text-sm">{member.tasks}</div>
                                        </div>
                                    ))}

                                    {/* Total hours */}
                                    <div className="mt-8 flex items-center justify-center">
                                        <div className="flex flex-col items-center">
                                            <div className="font-bold text-4xl">256.4</div>
                                            <div className="text-sm text-gray-500 flex items-center gap-2 mt-2">
                                                <span>Total hours</span>
                                                <Badge className="bg-blue-100 text-blue-700 font-normal">
                                                    Hourly
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
