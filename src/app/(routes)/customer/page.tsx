'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { HOME_INTRODUCTION } from '@/lib/enum/home/Introduction';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
// import { useTheme } from 'next-themes';

const COURSES = [
    {
        img: '/courses.png',
        title: 'Kiến thức nhập môn IT',
        description: '50% learning',
        learners: '500.000',
        learnerIcon: '/learners.png',
        module: '3h12p',
        moduleIcon: '/module.png',
        timer: '3',
        timerIcon: '/timer.png',
    },
    {
        img: '/courses.png',
        title: 'Kiến thức nhập môn IT',
        description: '50% learning',
        learners: '500.000',
        learnerIcon: '/learners.png',
        module: '3h12p',
        moduleIcon: '/module.png',
        timer: '3',
        timerIcon: '/timer.png',
    },
    {
        img: '/courses.png',
        title: 'Kiến thức nhập môn IT',
        description: '50% learning',
        learners: '500.000',
        learnerIcon: '/learners.png',
        module: '3h12p',
        moduleIcon: '/module.png',
        timer: '3',
        timerIcon: '/timer.png',
    },
];

const HomePage = () => {
    const [progress, setProgress] = useState<number>(13);
    // const { resolvedTheme } = useTheme();

    useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="  px-4 py-8 w-full bg-[var(--sidebar-background)] text-[var(--sidebar-foreground)]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10">
                <div className="md:col-span-8">
                    <h3 className="text-3xl mb-3">Welcome back, customer</h3>
                    <p className="mb-2">
                        Solve coding exercises and get mentored to develop fluency in your chosen
                        programming languages.
                    </p>
                    <div className="font-bold text-[18px] mt-5 mb-3">Where to start...</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8">
                        {HOME_INTRODUCTION.map((item, index) => (
                            <Card key={index} className="shadow-md bg-white dark:bg-gray-700">
                                <CardHeader className="flex justify-center">
                                    <div className="relative w-[100px] h-[100px]">
                                        <Image
                                            src={item.img}
                                            alt="Courses"
                                            fill
                                            className="object-contain"
                                            priority={index < 2} // Prioritize loading first 2 images
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <p className="text-[#657ED4] dark:text-blue-300 font-medium">
                                        {item.name}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
                <div className="md:col-span-4">
                    <div className="text-xl font-bold mb-4">Your track</div>
                    <div className="flex flex-row items-center">
                        <Image src={'/C.png'} width={40} height={40} alt="C" />
                        <div className="flex flex-col ml-4">
                            <Progress value={progress} className="w-[60%] bg-[#657ED4]" />
                            <div>{progress} exercises completed</div>
                        </div>
                    </div>
                    <Card className="bg-[#EEF1EF] dark:bg-gray-700 border-none text-center mt-7 p-6 w-full max-w-sm mx-auto shadow-lg">
                        <CardHeader className="flex justify-center">
                            <div className="relative w-[120px] h-[120px]">
                                <Image
                                    src="/mentor.png"
                                    alt="Mentor"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h2 className="text-xl font-bold mb-2">Become a mentor</h2>
                            <p className="text-[#657ED4] dark:text-blue-300 mb-6 text-sm">
                                Mentoring is a great way to reinforce your own learning, and help
                                students learn and discover the things they dont know.
                            </p>
                            <div className="flex justify-center gap-4">
                                <Button className="bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white font-semibold px-6">
                                    Apply
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-[#657ED4] text-[#657ED4] dark:text-blue-300 dark:border-blue-300 px-6 hover:bg-[#EEF1EF] dark:hover:bg-gray-600"
                                >
                                    Read
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Card className="dark:bg-gray-700">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold mb-2 text-center my-3">
                        All courses in CODEGROW
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {COURSES.map((item, index) => (
                            <Card key={index} className="bg-white dark:bg-gray-600 shadow-md">
                                <CardHeader>
                                    <Image
                                        src={item.img}
                                        alt="Course"
                                        width={420}
                                        height={200}
                                        className="w-full h-auto"
                                    />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-[#657ED4] dark:text-blue-300 text-2xl">
                                        {item.title}
                                    </div>
                                    <div className="text-[#5AD3AF] dark:text-green-400">
                                        {item.description}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={item.learnerIcon}
                                            width={30}
                                            height={30}
                                            alt="Learners"
                                        />
                                        {item.learners}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={item.moduleIcon}
                                            width={30}
                                            height={30}
                                            alt="Module"
                                        />
                                        {item.module}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={item.timerIcon}
                                            width={30}
                                            height={30}
                                            alt="Timer"
                                        />
                                        {item.timer}
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Link href="/customer/courses" legacyBehavior>
                        <Button className="text-center p-3 bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white text-xl transition-colors duration-300">
                            View all courses
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
            <div className="mt-8">
                <h3 className="text-center font-bold text-2xl mb-6">What you get from CODEGROW</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {['1', '2', '3', '4'].map((_, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300"
                        >
                            <div className="relative w-full h-[140px] mb-4">
                                <Image
                                    src="/learning_path.png"
                                    alt="Learning Path"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="text-[#657ED4] dark:text-blue-300 font-bold mb-3 text-lg">
                                GOOD LEARNING PATH
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                The learning path is designed methodically, in detail, and in
                                accordance with learning goals. A good roadmap will help make
                                learning effective, not wasteful, not going down the wrong path, and
                                wherever you learn, it will be useful.
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
