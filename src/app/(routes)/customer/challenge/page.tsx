'use client';

import { useState, useEffect, useRef } from 'react';
import { Clock, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import CodeEditor from '@/components/code-edit';
import LanguageSelector from '@/components/language-selector';
import Output from '@/components/output';
import type { editor } from 'monaco-editor';

export default function Challenge() {
    const [timeLeft, setTimeLeft] = useState(1799); // 29:59 in seconds
    const [language, setLanguage] = useState('java');
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleCopyCode = () => {
        const code = `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World!");\n  }\n}`;
        navigator.clipboard
            .writeText(code)
            .then(() => {
                toast({
                    title: 'Code copied!',
                    description: 'The code has been copied to your clipboard.',
                    duration: 3000,
                    className: 'bg-[#5AD3AF] text-black', // Custom color for success
                });
            })
            .catch(() => {
                toast({
                    title: 'Failed to copy',
                    description: 'Please try again.',
                    variant: 'destructive',
                    duration: 3000,
                });
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-8 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Sidebar */}
                    <Card className="w-full lg:w-1/4 bg-white dark:bg-gray-800 transition-colors duration-300">
                        <CardContent className="p-6">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                Hello World!
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed">
                                The `Hello World!` program is a simple code that outputs Hello
                                World! to the screen.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed">
                                It’s often used to introduce a new programming language to
                                beginners.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed">
                                Below is a Java `Hello World!` program:
                            </p>
                            <div className="bg-[#2D2D2D] text-white p-4 rounded-lg mb-4 relative">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                                    onClick={handleCopyCode}
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                                <pre>
                                    <code className="text-sm">
                                        <span className="text-orange-400">public class</span> Main{' '}
                                        {'{'}
                                        <br />
                                          
                                        <span className="text-orange-400">
                                            public static void
                                        </span>{' '}
                                        main(String[] args) {'{'}
                                        <br />
                                            <span className="text-white">System.out.println(</span>
                                        <span className="text-green-400">`Hello World!`</span>
                                        <span className="text-white">);</span>
                                        <br />
                                          {'}'}
                                        <br />
                                        {'}'}
                                    </code>
                                </pre>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                The third line outputs <code>Hello World!</code> to the console.
                            </p>
                            <div className="mt-8">
                                <h2 className="text-lg font-semibold flex items-center mb-3 text-gray-900 dark:text-gray-100">
                                    <span className="mr-2">💡</span> CHALLENGE
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    Use the code editor to write a program that outputs{' '}
                                    <code>Hello World!</code> to the console.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right Content */}
                    <Card className="w-full lg:w-3/4 bg-white dark:bg-gray-800 transition-colors duration-300">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center space-x-2">
                                    <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                                        Beginner
                                    </Badge>
                                    <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {formatTime(timeLeft)}
                                    </span>
                                </div>
                                <Button
                                    variant="outline"
                                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    Ask AI
                                </Button>
                            </div>

                            <div className="space-y-6">
                                <LanguageSelector language={language} onSelect={setLanguage} />
                                <div className="flex flex-col lg:flex-row gap-4">
                                    <Card className="w-full lg:w-1/2 bg-white dark:bg-gray-800 transition-colors duration-300">
                                        <CardContent className="p-4">
                                            <CodeEditor editorRef={editorRef} language={language} />
                                        </CardContent>
                                    </Card>
                                    <Card className="w-full lg:w-1/2 bg-white dark:bg-gray-800 transition-colors duration-300">
                                        <CardContent className="p-4">
                                            <Output editorRef={editorRef} language={language} />
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
