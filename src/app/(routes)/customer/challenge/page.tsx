'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function Challenge() {
    const [timeLeft, setTimeLeft] = useState(1799); // 29:59 in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="border-b py-3 px-4 flex items-center justify-between bg-white shadow-sm">
                <Button variant="ghost" size="icon">
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                </Button>
                <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-800">
                        {formatTime(timeLeft)}
                    </span>
                </div>
                <Button variant="ghost" size="icon">
                    <div className="w-6 h-6 bg-gray-200 rounded-full border border-gray-300"></div>
                </Button>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
                {/* Left Sidebar */}
                <div className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-sm">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Hello World!</h1>
                    <p className="text-gray-600 text-sm mb-3">
                        `Hello World! program is a simple code that outputs Hello World! to the
                        screen.``
                    </p>
                    <p className="text-gray-600 text-sm mb-3">
                        It`s often used to introduce a new programming language to a beginner.
                    </p>
                    <p className="text-gray-600 text-sm mb-3">
                        Let`s see Java `Hello World!`` program,
                    </p>
                    <div className="bg-[#2D2D2D] text-white p-4 rounded-lg mb-4">
                        <pre>
                            <code className="text-sm">
                                <span className="text-orange-400">public class</span> Main {'{'}
                                <br />
                                &nbsp;&nbsp;
                                <span className="text-orange-400">public static void</span>{' '}
                                main(String[] args) {'{'}
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="text-white">System.out.println(</span>
                                <span className="text-green-400">`Hello world!`</span>
                                <span className="text-white">);</span>
                                <br />
                                &nbsp;&nbsp;{'}'}
                                <br />
                                {'}'}
                            </code>
                        </pre>
                    </div>
                    <p className="text-gray-600 text-sm">The third line outputs Hello World!.</p>
                </div>

                {/* Right Content */}
                <div className="w-full lg:w-3/4 bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-2">
                            <Badge className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                                Beginner
                            </Badge>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="flex items-center space-x-1 border-gray-300 text-gray-700 text-sm"
                                    >
                                        <span>Java</span>
                                        <ChevronDown className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Python</DropdownMenuItem>
                                    <DropdownMenuItem>JavaScript</DropdownMenuItem>
                                    <DropdownMenuItem>SQL</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="flex space-x-2">
                            <Button
                                variant="outline"
                                className="border-gray-300 text-gray-700 text-sm px-3 py-1"
                            >
                                Ask AI
                            </Button>
                            <Button className="bg-blue-600 text-white text-sm px-3 py-1">
                                Run Code
                            </Button>
                        </div>
                    </div>

                    {/* Code Editor */}
                    <div className="bg-[#2D2D2D] text-white rounded-lg mb-4 overflow-hidden">
                        <div className="flex">
                            <div className="bg-gray-700 text-gray-400 text-sm p-4 border-r border-gray-600">
                                <div>1</div>
                                <div>2</div>
                                <div>3</div>
                                <div>4</div>
                                <div>5</div>
                            </div>
                            <pre className="p-4 text-sm">
                                <code>
                                    <span className="text-orange-400">class</span> Main {'{'}
                                    <br />
                                    <span className="text-orange-400">public static void</span>{' '}
                                    main(String[] args) {'{'}
                                    <br />
                                    <span className="text-gray-500"> `write code here` </span>
                                    <br />
                                    {'}'}
                                    <br />
                                    {'}'}
                                </code>
                            </pre>
                        </div>
                    </div>

                    {/* Test Cases and Console */}
                    <Tabs defaultValue="test-cases" className="w-full">
                        <TabsList className="mb-4 border-b border-gray-200 flex">
                            <TabsTrigger
                                value="test-cases"
                                className="w-1/2 text-center py-2 text-sm font-medium text-gray-600 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
                            >
                                TEST CASES
                            </TabsTrigger>
                            <TabsTrigger
                                value="console"
                                className="w-1/2 text-center py-2 text-sm font-medium text-gray-600 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
                            >
                                CONSOLE
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="test-cases">
                            <div className="bg-[#2D2D2D] text-white p-4 rounded-lg">
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-xs text-gray-400">Output</p>
                                        <p className="text-sm text-gray-300">Hello world!</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Expected Output</p>
                                        <p className="text-sm text-gray-300">Hello world!</p>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="console">
                            <div className="bg-[#2D2D2D] text-white p-4 rounded-lg">
                                <p className="text-sm text-gray-400">
                                    Run the code to see the output here.
                                </p>
                            </div>
                        </TabsContent>
                    </Tabs>

                    {/* Challenge Section */}
                    <div className="mt-6">
                        <h2 className="text-lg font-medium flex items-center mb-3 text-gray-900">
                            <span className="mr-2">💡</span> CHALLENGE
                        </h2>
                        <p className="text-gray-600 text-sm mb-3">
                            Use the code view to write a program that outputs Hello World!
                        </p>
                        <div className="bg-[#E6F0FA] p-4 rounded-lg">
                            <p className="text-sm text-gray-600">
                                <strong>
                                    Note that anything inside quotation marks is case sensitive:
                                </strong>{' '}
                                For example:
                            </p>
                            <div className="bg-[#2D2D2D] text-white p-2 rounded-lg mt-2">
                                <pre>
                                    <code>System.out.println(`Hello world!``);</code>
                                </pre>
                            </div>
                            <div className="bg-[#2D2D2D] text-white p-2 rounded-lg mt-2">
                                <pre>
                                    <code>System.out.println(`HELLO WORLD!``);</code>
                                </pre>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                                are different (notice the capital letters in the first line).
                            </p>
                        </div>
                    </div>

                    {/* Solution Section */}
                    <div className="mt-6">
                        <h2 className="text-lg font-medium flex items-center text-gray-900">
                            <span className="mr-2">🔍</span> SOLUTION
                            <Badge className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                                +1
                            </Badge>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="ml-2 text-pink-600 text-sm"
                            >
                                Ask AI
                            </Button>
                        </h2>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t py-6 px-6 bg-white">
                <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm text-gray-600">
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">USE CASES</h4>
                        <ul className="space-y-1">
                            <li>
                                <Link href="#" className="hover:text-gray-900">
                                    UI design
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-900">
                                    UX design
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-900">
                                    Wireframing
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-900">
                                    Diagramming
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-900">
                                    Brainstorming
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-900">
                                    Online whiteboard
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-900">
                                    Team collaboration
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">EXPLORE</h4>
                        <ul className="space-y-1">
                            <li>
                                <Link href="#" className="hover:text-gray-900">
                                    Design
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-900">
                                    Prototyping
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-900">
                                    Development features
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-900">
                                    Design systems
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-900">
                                    Collaboration features
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-900">
                                    Design process
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-900">
                                    FIGJam
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">RESOURCES</h4>
                        <ul className="space-y-1">
                            <li>
                                <Link href="#" className="hover:text-gray-900">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-900">
                                    Best practices
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-900">
                                    Colors
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-900">
                                    Color wheel
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-900">
                                    Support
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-900">
                                    Developers
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gray-900">
                                    Resource library
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}
