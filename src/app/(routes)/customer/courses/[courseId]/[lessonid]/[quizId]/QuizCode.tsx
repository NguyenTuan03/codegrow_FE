'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Clock, Copy, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import CodeEditor from '@/components/code-edit';
import LanguageSelector from '@/components/language-selector';
import Output from '@/components/output';
import { submitQuizCode } from '@/lib/services/quizs/sumbitcode';
import { MarkQuiz } from '@/lib/services/api/markquiz';
import type { editor } from 'monaco-editor';
import ChatBox from '@/lib/components/ChatBox';

interface Quiz {
    _id: string;
    questionText: string;
    explanation?: string;
    difficulty?: string;
    language?: string;
    starterCode?: string;
    testCases?: { input: string; expectedOutput: string }[];
}

interface SubmissionResult {
    isCorrect: boolean;
    testCaseResults?: { input: string; output: string; expectedOutput: string; passed: boolean }[];
    message?: string;
}

export default function QuizCode({ quiz }: { quiz: Quiz }) {
    const [timeLeft, setTimeLeft] = useState(1799);
    const [language, setLanguage] = useState(quiz.language || 'java');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as string;
    const lessonId = params.lessonId as string;

    useEffect(() => {
        const startTime = localStorage.getItem(`quiz-timer-${quiz._id}`);
        const initialTime = startTime
            ? Math.max(1799 - Math.floor((Date.now() - parseInt(startTime)) / 1000), 0)
            : 1799;
        setTimeLeft(initialTime);
        if (!startTime) localStorage.setItem(`quiz-timer-${quiz._id}`, Date.now().toString());

        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [quiz._id]);

    const formatTime = useCallback((seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }, []);

    const handleCopyCode = async () => {
        const code = editorRef.current?.getValue() || '';
        try {
            await navigator.clipboard.writeText(code);
            toast({
                title: 'Code copied!',
                description: 'The code has been copied to your clipboard.',
                duration: 3000,
                className:
                    'bg-[#657ED4] dark:bg-[#5AD3AF] text-white dark:text-black font-semibold',
            });
        } catch {
            toast({
                title: 'Failed to copy',
                description: 'Please try again.',
                variant: 'destructive',
                duration: 3000,
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        }
    };

    const handleLanguageSelect = (newLanguage: string) => {
        if (editorRef.current?.getValue().trim()) {
            const confirmChange = window.confirm(
                'Changing language may reset your code. Continue?',
            );
            if (!confirmChange) return;
        }
        setLanguage(newLanguage);
    };

    const handleSubmitCode = async () => {
        const code = editorRef.current?.getValue() || '';
        if (!code.trim()) {
            toast({
                title: 'Error',
                description: 'Please write some code before submitting',
                variant: 'destructive',
                duration: 3000,
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
            return;
        }

        setIsSubmitting(true);
        setSubmissionResult(null);

        try {
            const token = localStorage.getItem('token') || '';
            const quizId = quiz._id;

            const response = await submitQuizCode({
                token,
                quizId,
                code,
            });

            setSubmissionResult(response);

            toast({
                title: response.isCorrect ? 'Correct!' : 'Incorrect',
                description: response.isCorrect
                    ? 'Your code passed all test cases!'
                    : 'Some test cases failed. Try again!',
                variant: response.isCorrect ? 'default' : 'destructive',
                duration: 3000,
                className: response.isCorrect
                    ? 'bg-[#657ED4] dark:bg-[#5AD3AF] text-white dark:text-black font-semibold'
                    : 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });

            if (response.isCorrect) {
                const res = await MarkQuiz({ token, quizId, courseId });
                console.log('API Response mark quiz:', res);
                toast({
                    title: 'Quiz Completed!',
                    description: 'This quiz has been marked as complete.',
                    duration: 3000,
                    className:
                        'bg-[#657ED4] dark:bg-[#5AD3AF] text-white dark:text-black font-semibold',
                });
            }
        } catch (error) {
            console.error('Error submitting code:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBackToLesson = () => {
        router.push(`/customer/courses/${courseId}/${lessonId}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <Button
                        variant="outline"
                        onClick={handleBackToLesson}
                        className="flex cursor-pointer items-center gap-2 bg-white text-base dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-[#657ED4] dark:text-[#5AD3AF] rounded-full px-4 py-2 shadow-sm transition-all duration-200"
                        aria-label="Back to lesson detail"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        Back to Lesson
                    </Button>
                    <div className="flex items-center gap-3">
                        <Badge className="bg-green-100 text-base text-green-800 dark:bg-green-900/30 dark:text-green-300 px-3 py-1 rounded-full  font-medium">
                            {quiz.difficulty || 'Beginner'}
                        </Badge>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <Clock className="h-5 w-5 text-[#657ED4] dark:text-[#5AD3AF]" />
                            <span className="text-base font-medium text-[#657ED4] dark:text-[#5AD3AF]">
                                {formatTime(timeLeft)}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Sidebar */}
                    <Card className="lg:col-span-1 bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                        <CardContent className="p-6">
                            <h1 className="text-2xl font-bold text-[#657ED4] dark:text-[#5AD3AF] mb-4 leading-tight">
                                {quiz.questionText}
                            </h1>
                            <p className="text-gray-600  dark:text-gray-400 text-base mb-6 leading-relaxed font-medium">
                                {quiz.explanation || 'Complete the coding challenge below.'}
                            </p>
                            {quiz.starterCode && (
                                <div className="mb-6">
                                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
                                        Starter Code
                                    </h3>
                                    <div className="relative bg-gray-900 text-white p-4 rounded-lg">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="absolute cursor-pointer top-3 right-3 text-gray-400 hover:text-white transition-colors duration-200"
                                            onClick={handleCopyCode}
                                            aria-label="Copy starter code"
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                        <pre className="text-base overflow-x-auto">
                                            <code>{quiz.starterCode}</code>
                                        </pre>
                                    </div>
                                </div>
                            )}
                            {quiz.testCases && quiz.testCases.length > 0 && (
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
                                        Test Cases
                                    </h3>
                                    <div className="space-y-3">
                                        {quiz.testCases.map((testCase, index) => (
                                            <div
                                                key={index}
                                                className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-base"
                                            >
                                                <p className="text-gray-800 dark:text-gray-200">
                                                    <span className="font-medium">Input:</span>{' '}
                                                    {testCase.input}
                                                </p>
                                                <p className="text-gray-800 dark:text-gray-200">
                                                    <span className="font-medium">
                                                        Expected Output:
                                                    </span>{' '}
                                                    {testCase.expectedOutput}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    {/* Right Content */}
                    <Card className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                        <CardContent className="p-6">
                            <div className="flex justify-end mb-6">
                                <div className="flex gap-3">
                                    <Button
                                        onClick={handleSubmitCode}
                                        disabled={isSubmitting}
                                        className="bg-[#657ED4] cursor-pointer dark:bg-[#5AD3AF] hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] text-white rounded-full px-6 py-2 shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                        aria-label={
                                            isSubmitting ? 'Submitting code' : 'Submit code'
                                        }
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            'Submit Code'
                                        )}
                                    </Button>
                                </div>
                            </div>
                            <div className="mb-6">
                                <LanguageSelector
                                    language={language}
                                    onSelect={handleLanguageSelect}
                                    disabled={isSubmitting}
                                />
                            </div>
                            <CodeEditor
                                editorRef={editorRef}
                                language={language}
                                initialValue={quiz.starterCode || ''}
                            />
                            <div className="mt-6">
                                <Output
                                    editorRef={editorRef}
                                    language={language}
                                    submissionResult={submissionResult}
                                    testCases={quiz.testCases || []}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            {/* Add ChatBox with apiEndpoint */}
            <ChatBox apiEndpoint="/api/gemini" />
        </div>
    );
}
