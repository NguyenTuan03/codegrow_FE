'use client';

import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, PlayCircle, BookOpen, Code, ChevronRight } from 'lucide-react';
import { GetLessons } from '@/lib/services/lessons/getAllLessons';

interface Lesson {
    _id: string;
    title: string;
    content?: string;
    status?: string;
    videoUrl?: string;
    videoKey?: string;
    quiz?: string[];
    order: number;
    createdAt?: string;
    updatedAt?: string;
}

interface OverviewTabProps {
    progress: number; // Replaced progressPercentage
    completedLessons: { [key: string]: boolean }; // Replaced completedModules
    completedQuizzes: { [key: string]: boolean };
    lastLesson: string | null;
    onNavigate: (path: string) => void;
    courseId: string;
}

export default function OverviewTab({
    progress,
    completedLessons,
    completedQuizzes,
    lastLesson,
    onNavigate,
    courseId,
}: OverviewTabProps) {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            setLoading(true);
            const lessonsData = await GetLessons(courseId);
            if (lessonsData?.status === 200 && Array.isArray(lessonsData.metadata)) {
                setLessons(lessonsData.metadata);
            }
        } catch (error) {
            console.error('Error loading data:', error);
            toast({
                title: 'Error',
                description: 'Failed to load course data',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [courseId]);

    const getLessonType = (lesson: Lesson) => {
        if (lesson.videoUrl || lesson.videoKey) return 'video';
        if (lesson.quiz && lesson.quiz.length > 0) return 'practice';
        return 'reading';
    };

    const iconMap = {
        video: <PlayCircle className="w-5 h-5" />,
        reading: <BookOpen className="w-5 h-5" />,
        practice: <Code className="w-5 h-5" />,
    };

    const buttonTextMap = {
        video: 'Watch Video',
        reading: 'Start Reading',
        practice: 'Start Practice',
    };

    const isLessonCompleted = (lessonId: string) => {
        return completedLessons[lessonId] || false;
    };

    const isQuizCompleted = (quizId: string) => {
        return completedQuizzes[quizId] || false;
    };

    return (
        <div className="space-y-8">
            {/* Progress Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-2xl font-semibold text-[#657ED4] dark:text-[#5AD3AF] mb-4">
                    Course Progress
                </h3>
                <div className="flex items-center gap-4 mb-2">
                    <Progress
                        value={progress}
                        className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full [&>div]:bg-[#657ED4] dark:[&>div]:bg-[#5AD3AF]"
                    />
                    <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                        {Math.round(progress)}%
                    </span>
                </div>
                <div className="text-base text-gray-600 dark:text-gray-400 font-medium">
                    {Object.keys(completedLessons).length} of {lessons.length} lessons completed
                </div>
            </div>

            <Separator className="bg-gray-200 dark:bg-gray-700" />

            {/* Back Button */}
            <div className="flex justify-between items-center">
                <Button
                    variant="outline"
                    onClick={() => onNavigate(`/customer/courses`)}
                    className="flex items-center cursor-pointer gap-2 text-[#657ED4] dark:text-[#5AD3AF] border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <ChevronRight className="w-5 h-5 rotate-180" />
                    Back to Courses
                </Button>
            </div>

            {/* Lessons List */}
            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <Loader2 className="h-8 w-8 animate-spin text-[#657ED4] dark:text-[#5AD3AF]" />
                </div>
            ) : lessons.length === 0 ? (
                <div className="text-center text-gray-600 dark:text-gray-400 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                    No lessons found for this course.
                </div>
            ) : (
                <div className="space-y-4">
                    {lessons.map((lesson) => {
                        const lessonType = getLessonType(lesson);
                        const completed = isLessonCompleted(lesson._id);
                        const isQuiz = lessonType === 'practice';
                        const quizCompleted =
                            isQuiz && lesson.quiz ? isQuizCompleted(lesson.quiz[0]) : false;

                        return (
                            <div
                                key={lesson._id}
                                className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:border-[#657ED4] dark:hover:border-[#5AD3AF] ${
                                    completed || quizCompleted ? 'border-l-4 border-green-500' : ''
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {completed || quizCompleted ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        ) : (
                                            iconMap[lessonType]
                                        )}
                                        <div>
                                            <div className="font-semibold text-gray-800 dark:text-gray-200 text-xl">
                                                {lesson.title}
                                            </div>
                                            <div className="text-base text-gray-500 dark:text-gray-400">
                                                {lessonType.charAt(0).toUpperCase() +
                                                    lessonType.slice(1)}
                                                {isQuiz &&
                                                    ` (${quizCompleted ? 'Completed' : 'Pending'})`}
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() =>
                                            onNavigate(
                                                `/customer/courses/${courseId}/${lesson._id}`,
                                            )
                                        }
                                        className="flex cursor-pointer items-center gap-2 bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] text-white rounded-full px-4 py-2 transition-all duration-200 shadow-sm"
                                    >
                                        {iconMap[lessonType]}
                                        {buttonTextMap[lessonType]}
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
