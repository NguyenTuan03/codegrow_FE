'use client';
import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

import Link from 'next/link';

// Import shadcn/ui components
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import dynamic from 'next/dynamic';
// Dynamically import Lucide icons
const Calendar = dynamic(() => import('lucide-react').then((mod) => mod.Calendar), { ssr: false });
const Clock = dynamic(() => import('lucide-react').then((mod) => mod.Clock), { ssr: false });
const ChevronRight = dynamic(() => import('lucide-react').then((mod) => mod.ChevronRight), {
    ssr: false,
});
const ChevronLeft = dynamic(() => import('lucide-react').then((mod) => mod.ChevronLeft), {
    ssr: false,
});
const Star = dynamic(() => import('lucide-react').then((mod) => mod.Star), { ssr: false });
const Users = dynamic(() => import('lucide-react').then((mod) => mod.Users), { ssr: false });
const ArrowUpRight = dynamic(() => import('lucide-react').then((mod) => mod.ArrowUpRight), {
    ssr: false,
});
const ArrowDownRight = dynamic(() => import('lucide-react').then((mod) => mod.ArrowDownRight), {
    ssr: false,
});

// Sample data for statistics
const revenueData = [
    { month: 'Jan', value: 40, lastYear: 25 },
    { month: 'Feb', value: 45, lastYear: 30 },
    { month: 'Mar', value: 35, lastYear: 25 },
    { month: 'Apr', value: 50, lastYear: 40 },
    { month: 'May', value: 45, lastYear: 35 },
    { month: 'Jun', value: 60, lastYear: 40 },
    { month: 'Jul', value: 40, lastYear: 30 },
    { month: 'Aug', value: 45, lastYear: 35 },
    { month: 'Sep', value: 50, lastYear: 40 },
];

// Sample tasks data
const upcomingTasks = [
    { id: 1, title: 'Web Design', date: '15-06-2023', timeStart: '10:00 am', timeEnd: '11:30 am' },
    {
        id: 2,
        title: 'Java Programming',
        date: '15-06-2023',
        timeStart: '01:00 pm',
        timeEnd: '02:30 pm',
    },
    {
        id: 3,
        title: 'Meeting with Yulian Sun',
        date: '16-06-2023',
        timeStart: '10:00 am',
        timeEnd: '11:00 am',
    },
    { id: 4, title: 'UX/UI', date: '20-06-2023', timeStart: '09:30 am', timeEnd: '10:30 am' },
    { id: 5, title: 'Front-end', date: '22-06-2023', timeStart: '10:30 am', timeEnd: '11:30 am' },
    {
        id: 6,
        title: 'Data Structures',
        date: '25-06-2023',
        timeStart: '01:00 pm',
        timeEnd: '02:30 pm',
    },
];

// Sample top categories data
const topCategories = [
    { id: 1, title: 'UX / UI Design', lessons: 8, price: '$199.99' },
    { id: 2, title: 'Digital Marketing', lessons: 12, price: '$109.99' },
    { id: 3, title: 'Web Development', lessons: 10, price: '$299.99' },
    { id: 4, title: 'Mobile & Trading', lessons: 8, price: '$399.99' },
    { id: 5, title: 'Popular Course', lessons: 15, price: '$209.99' },
    { id: 6, title: 'Full Stack Course', lessons: 12, price: '$179.99' },
];

// Sample top courses data
const topCourses = [
    {
        id: 1,
        title: 'Mastering CSS Pseudo-classes: From Basics to Advanced Techniques',
        author: 'Ricardo Till',
        avatar: '/avatar1.png',
        hours: 7.5,
        rating: 4.7,
        reviews: 125,
        students: 1200,
        price: '$127',
        category: 'Design',
        image: '/course1.png',
    },
    {
        id: 2,
        title: 'Marketing Essentials: Understanding to Scale in Business Success',
        author: 'Catherine Korra',
        avatar: '/avatar2.png',
        hours: 5.5,
        rating: 4.8,
        reviews: 98,
        students: 980,
        price: '$119',
        category: 'Marketing',
        image: '/course2.png',
    },
    {
        id: 3,
        title: 'Procreate Mastery - Sketching, Coloring, and Practical Techniques',
        author: 'Nataly Williams',
        avatar: '/avatar3.png',
        hours: 9.5,
        rating: 4.9,
        reviews: 145,
        students: 2100,
        price: '$149',
        category: 'Design',
        image: '/course3.png',
    },
];

// Sample latest courses data
const latestCourses = [
    {
        id: 1,
        title: 'Digital Marketing',
        image: '/course4.png',
        students: 2200,
        price: '$427',
        rating: 4.5,
        category: 'Marketing',
    },
    {
        id: 2,
        title: 'Java Programming',
        image: '/course5.png',
        students: 1850,
        price: '$378',
        rating: 4.3,
        category: 'Development',
    },
    {
        id: 3,
        title: 'Front-End Development',
        image: '/course6.png',
        students: 3100,
        price: '$644',
        rating: 4.7,
        category: 'Development',
    },
    {
        id: 4,
        title: 'Data Science',
        image: '/course7.png',
        students: 2800,
        price: '$587',
        rating: 4.6,
        category: 'Data',
    },
];

// Sample explore courses data
const engineeringCourses = [
    {
        id: 1,
        title: 'E-engineering',
        description: 'Education is one of the most powerful things in life',
        instructor: 'Sam Jenson',
        price: '$145',
        rating: 4.6,
        students: '44,874',
        image: '/engineering1.png',
    },
    {
        id: 2,
        title: 'Engineering Physics',
        description: 'Education is one of the most powerful things in life',
        instructor: 'Anik Deb',
        price: '$133',
        rating: 4.5,
        students: '44,974',
        image: '/engineering2.png',
    },
    {
        id: 3,
        title: 'Diploma in Engineering',
        description: 'Education is one of the most powerful things in life',
        instructor: 'Martin Jonsi',
        price: '$128',
        rating: 4.8,
        students: '44,974',
        image: '/engineering3.png',
    },
];

const Courses: React.FC = () => {
    return (
        <div className="p-6 bg-gray-50">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                {/* Total Revenue */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <div className="text-blue-500 text-xl font-bold">$</div>
                            </div>
                            <div>
                                <CardDescription>Total Revenue</CardDescription>
                                <CardTitle className="text-2xl">$25,378</CardTitle>
                                <div className="flex items-center mt-1">
                                    <Badge
                                        variant="outline"
                                        className="bg-green-50 text-green-600 flex items-center gap-1"
                                    >
                                        <ArrowUpRight className="w-3 h-3" /> +5.30%
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Total Students */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                                <div className="text-pink-500 text-xl font-bold">👥</div>
                            </div>
                            <div>
                                <CardDescription>Total Students</CardDescription>
                                <CardTitle className="text-2xl">78,565</CardTitle>
                                <div className="flex items-center mt-1">
                                    <Badge
                                        variant="outline"
                                        className="bg-green-50 text-green-600 flex items-center gap-1"
                                    >
                                        <ArrowUpRight className="w-3 h-3" /> +12.5%
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Total Instructors */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                                <div className="text-pink-500 text-xl font-bold">👨‍🏫</div>
                            </div>
                            <div>
                                <CardDescription>Total Instructors</CardDescription>
                                <CardTitle className="text-2xl">6,247</CardTitle>
                                <div className="flex items-center mt-1">
                                    <Badge
                                        variant="outline"
                                        className="bg-red-50 text-red-600 flex items-center gap-1"
                                    >
                                        <ArrowDownRight className="w-3 h-3" /> -10.21%
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Total Courses */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                <div className="text-orange-500 text-xl font-bold">📚</div>
                            </div>
                            <div>
                                <CardDescription>Total Courses</CardDescription>
                                <CardTitle className="text-2xl">2,467</CardTitle>
                                <div className="flex items-center mt-1">
                                    <Badge
                                        variant="outline"
                                        className="bg-green-50 text-green-600 flex items-center gap-1"
                                    >
                                        <ArrowUpRight className="w-3 h-3" /> +8.6%
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Middle Section - Tasks and Revenue Chart */}
            <div className="grid grid-cols-1 gap-5 mt-6 lg:grid-cols-2">
                {/* Upcoming Tasks */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-medium">Upcoming Tasks</CardTitle>
                            <Button variant="link" className="p-0 h-auto text-xs">
                                View All
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-64">
                            <div className="space-y-4">
                                {upcomingTasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className="flex border-l-4 border-blue-500 pl-3 py-1"
                                    >
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium">{task.title}</h4>
                                            <div className="flex items-center text-xs text-gray-500 mt-1">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                <span>{task.date}</span>
                                                <Clock className="w-3 h-3 ml-3 mr-1" />
                                                <span>
                                                    {task.timeStart} - {task.timeEnd}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Revenue Statistics */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-medium">
                                Revenue Statistics
                            </CardTitle>
                            <div className="flex space-x-4 text-xs">
                                <div className="flex items-center">
                                    <span className="w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
                                    <span>Last Year</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="w-3 h-3 rounded-full bg-pink-400 mr-1"></span>
                                    <span>This Year</span>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#4F46E5"
                                        strokeWidth={3}
                                        dot={{ stroke: '#4F46E5', strokeWidth: 2, r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="lastYear"
                                        stroke="#EC4899"
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                        dot={{ stroke: '#EC4899', strokeWidth: 2, r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Section - Categories and Courses */}
            <div className="grid grid-cols-1 gap-5 mt-6 lg:grid-cols-2">
                {/* Top Categories */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-medium">Top Categories</CardTitle>
                            <Button variant="link" className="p-0 h-auto text-xs">
                                View All
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-72">
                            <div className="space-y-2">
                                {topCategories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                                    >
                                        <div className="flex items-center">
                                            <div
                                                className={`w-8 h-8 rounded-md flex items-center justify-center mr-3 ${
                                                    category.id % 3 === 0
                                                        ? 'bg-blue-100'
                                                        : category.id % 3 === 1
                                                          ? 'bg-pink-100'
                                                          : 'bg-purple-100'
                                                }`}
                                            >
                                                <span
                                                    className={`text-lg ${
                                                        category.id % 3 === 0
                                                            ? 'text-blue-600'
                                                            : category.id % 3 === 1
                                                              ? 'text-pink-600'
                                                              : 'text-purple-600'
                                                    }`}
                                                >
                                                    {category.id}
                                                </span>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium">
                                                    {category.title}
                                                </h4>
                                                <p className="text-xs text-gray-500">
                                                    {category.lessons} Lessons
                                                </p>
                                            </div>
                                        </div>
                                        <span className="font-medium text-sm">
                                            {category.price}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Top Courses */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-medium">Top Courses</CardTitle>
                            <div className="flex space-x-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 rounded-full p-0"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 rounded-full p-0"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-72">
                            <div className="space-y-4">
                                {topCourses.map((course) => (
                                    <Link
                                        key={course.id}
                                        href={`/admin/report/courses/${course.id}`}
                                        passHref
                                    >
                                        <div
                                            key={course.id}
                                            className="flex items-start p-2 hover:bg-gray-50 rounded-lg"
                                        >
                                            <div className="w-12 h-12 bg-gray-200 rounded-md mr-3 flex items-center justify-center">
                                                <span className="text-xs">{course.category}</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center">
                                                    <Avatar className="h-5 w-5 mr-1">
                                                        <AvatarFallback>
                                                            {course.author[0]}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-xs text-gray-600">
                                                        {course.author}
                                                    </span>
                                                </div>
                                                <h4 className="text-sm font-medium line-clamp-2 mt-1">
                                                    {course.title}
                                                </h4>
                                                <div className="flex items-center mt-1">
                                                    <span className="text-xs text-gray-500 mr-2">
                                                        ⏱️ {course.hours} hours
                                                    </span>
                                                    <div className="flex items-center">
                                                        <div className="flex text-yellow-400 mr-1">
                                                            <Star className="h-3 w-3 fill-current" />
                                                            <Star className="h-3 w-3 fill-current" />
                                                            <Star className="h-3 w-3 fill-current" />
                                                            <Star className="h-3 w-3 fill-current" />
                                                            <Star className="h-3 w-3 fill-current" />
                                                        </div>
                                                        <span className="text-xs text-gray-600">
                                                            {course.rating} ({course.reviews})
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="pt-0">
                        <Button variant="link" className="w-full text-blue-600">
                            View All Courses
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            {/* Latest Courses */}
            <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Latest Courses</h3>
                    <Button variant="link" className="text-blue-600 p-0 h-auto">
                        View All
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {latestCourses.map((course) => (
                        <Link key={course.id} href={`/admin/report/courses/${course.id}`} passHref>
                            <Card key={course.id} className="overflow-hidden">
                                <div className="h-36 bg-gray-200 flex items-center justify-center">
                                    <span>{course.category}</span>
                                </div>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <Badge variant="secondary">+{course.rating}</Badge>
                                        <span className="font-medium">{course.price}</span>
                                    </div>
                                    <h4 className="font-medium mb-1">{course.title}</h4>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <Users className="h-3 w-3 mr-1" />
                                        <span>{course.students} students</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Explore Top Courses */}
            <div className="mt-10">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">Explore top courses</h2>
                    <p className="text-gray-500 text-sm">
                        Education is one of the most powerful things in life. It allows us to find
                        the meaning behind everything and helps improve lives in a massive way.
                    </p>
                </div>

                <Tabs defaultValue="engineering">
                    <TabsList className="mb-6 justify-center bg-transparent">
                        <TabsTrigger value="health">Health</TabsTrigger>
                        <TabsTrigger value="animation">Animation</TabsTrigger>
                        <TabsTrigger value="engineering">Engineering</TabsTrigger>
                        <TabsTrigger value="digital-media">Digital Media</TabsTrigger>
                        <TabsTrigger value="journalism">Journalism</TabsTrigger>
                        <TabsTrigger value="business">Business</TabsTrigger>
                        <TabsTrigger value="language-arts">Language Arts</TabsTrigger>
                    </TabsList>
                    <TabsContent value="engineering">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {engineeringCourses.map((course) => (
                                <Card key={course.id}>
                                    <Link
                                        key={course.id}
                                        href={`/admin/report/courses/${course.id}`}
                                        passHref
                                    >
                                        <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                                            <div className="text-center">
                                                <h3 className="text-xl font-bold mb-2">
                                                    {course.title}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {course.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                    <CardContent className="p-4">
                                        <div className="flex items-center mb-3">
                                            <Avatar className="h-8 w-8 mr-2">
                                                <AvatarFallback>
                                                    {course.instructor[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm">{course.instructor}</span>
                                            <span className="ml-auto font-bold">
                                                {course.price}
                                            </span>
                                        </div>
                                        <Separator className="my-3" />
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center">
                                                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                                                <span>{course.rating}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Users className="h-4 w-4 mr-1" />
                                                <span>{course.students} Students</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                    {/* Add other tab content as needed */}
                </Tabs>
            </div>
        </div>
    );
};

export default Courses;
