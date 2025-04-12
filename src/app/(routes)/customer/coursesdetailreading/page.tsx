'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CourseDetailReadingPage() {
    const router = useRouter();

    const handleMarkComplete = () => {
        // You might want to add API call here to mark as complete
        router.push('/customer/coursesdetail'); // Redirect back to course detail
    };

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12 md:px-24 lg:px-32">
            <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
                {/* Header with Back Button */}
                <div className="flex items-center justify-between">
                    <Button
                        variant="outline"
                        onClick={() => router.back()}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Course
                    </Button>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Reading: Test Driven Development Basics
                    </h1>
                    <div className="w-24"></div> {/* Spacer for alignment */}
                </div>

                <Separator />

                {/* Reading Content */}
                <div className="prose max-w-none">
                    <h2>What is Test Driven Development?</h2>
                    <p>
                        Test Driven Development (TDD) is a software development approach where tests
                        are written before the actual code. It follows a simple cycle: Red (write a
                        failing test), Green (write minimal code to pass the test), and Refactor
                        (improve the code while keeping tests passing).
                    </p>

                    <h2>The Three Laws of TDD</h2>
                    <ol>
                        <li>You must write a failing test before writing production code</li>
                        <li>You must only write enough test code to fail</li>
                        <li>
                            You must only write enough production code to pass the current failing
                            test
                        </li>
                    </ol>

                    <h2>Benefits of TDD</h2>
                    <ul>
                        <li>Higher code quality and fewer bugs</li>
                        <li>Better designed, more maintainable code</li>
                        <li>Comprehensive test suite that grows with the codebase</li>
                        <li>Faster debugging and easier refactoring</li>
                    </ul>
                </div>

                {/* Completion Button */}
                <div className="flex justify-end pt-6">
                    <Button
                        onClick={handleMarkComplete}
                        className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                    >
                        <CheckCircle className="w-4 h-4" /> Mark as Complete
                    </Button>
                </div>
            </div>
        </div>
    );
}
