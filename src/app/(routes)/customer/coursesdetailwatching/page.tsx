'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CourseVideoPage() {
    const router = useRouter();

    const handleMarkComplete = () => {
        // You might want to add API call here to mark as complete
        router.push('/customer/coursesdetail'); // Redirect back to course detail
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-12 md:px-24 lg:px-32">
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
                        Video: Implementing TDD in Practice
                    </h1>
                    <div className="w-24"></div> {/* Spacer for alignment */}
                </div>

                <Separator />

                {/* Video Player */}
                <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                        <div className="text-2xl mb-2">Video Player</div>
                        <div className="text-gray-300">TDD Implementation Demo</div>
                    </div>
                </div>

                {/* Video Transcript */}
                <div className="prose max-w-none">
                    <h2>Video Transcript</h2>
                    <p>
                        In this video, we will walk through implementing a simple feature using TDD.
                        We will start by writing a failing test, then implement just enough code to
                        make it pass, and finally refactor our solution while keeping all tests
                        green.
                    </p>
                </div>

                {/* Completion Button */}
                <div className="flex justify-end pt-6">
                    <Button
                        onClick={handleMarkComplete}
                        className="bg-[#5AD3AF] hover:bg-[#4EB8A1] text-white flex items-center gap-2"
                    >
                        <CheckCircle className="w-4 h-4" /> Mark as Complete
                    </Button>
                </div>
            </div>
        </div>
    );
}
