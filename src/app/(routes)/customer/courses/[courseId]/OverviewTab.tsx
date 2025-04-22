'use client';

import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, PlayCircle, BookOpen, Code } from 'lucide-react';
import { GetLessons } from '@/lib/services/lessons/getAllLessons';
import { GetProgress } from '@/lib/services/api/progress';

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

interface ProgressData {
    completedLessons: string[];
    completedQuizzes: string[];
    lastLesson: string | null;
    progress: number;
}

interface OverviewTabProps {
    progressPercentage: number;
    completedModules: { [key: string]: boolean };
    onNavigate: (path: string) => void;
    courseId: string;
}

export default function OverviewTab({ onNavigate, courseId }: OverviewTabProps) {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [progressData, setProgressData] = useState<ProgressData>({
        completedLessons: [],
        completedQuizzes: [],
        lastLesson: null,
        progress: 0,
    });

    const loadData = async () => {
        try {
            setLoading(true);

            // Load lessons
            const lessonsData = await GetLessons(courseId);
            if (lessonsData?.status === 200 && Array.isArray(lessonsData.metadata)) {
                setLessons(lessonsData.metadata);
            }

            // Load progress
            const token = localStorage.getItem('token');
            if (token) {
                const progressResponse = await GetProgress(token, courseId);
                if (progressResponse?.status === 200) {
                    setProgressData({
                        completedLessons: progressResponse.metadata.completedLessons || [],
                        completedQuizzes: progressResponse.metadata.completedQuizzes || [],
                        lastLesson: progressResponse.metadata.lastLesson || null,
                        progress: progressResponse.metadata.progress || 0,
                    });
                }
            }
        } catch (error) {
            console.error('Error loading data:', error);
            toast({
                title: 'Error',
                description: 'Failed to load course data',
                variant: 'destructive',
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
        video: <PlayCircle className="w-5 h-5 text-[#657ED4]" />,
        reading: <BookOpen className="w-5 h-5 text-[#657ED4]" />,
        practice: <Code className="w-5 h-5 text-[#657ED4]" />,
    };

    const buttonTextMap = {
        video: 'Watch Video',
        reading: 'Start Reading',
        practice: 'Start Practice',
    };

    const isLessonCompleted = (lessonId: string) => {
        return progressData.completedLessons.includes(lessonId);
    };

    const isQuizCompleted = (quizId: string) => {
        return progressData.completedQuizzes.includes(quizId);
    };

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    Course Progress
                </h3>
                <div className="flex items-center gap-4 mt-2">
                    <Progress value={progressData.progress} className="h-2 w-64" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {Math.round(progressData.progress)}% Complete
                    </span>
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {progressData.completedLessons.length} of {lessons.length} lessons completed
                </div>
            </div>

            <Separator className="bg-gray-200 dark:bg-gray-700" />

            <div className="flex justify-between items-center">
                <Button
                    variant="outline"
                    onClick={() => onNavigate(`/customer/courses/${courseId}`)}
                    className="text-[#657ED4] border-[#657ED4] hover:bg-[#f0f4ff] dark:hover:bg-[#2c365e]"
                >
                    ← Back to Course
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <Loader2 className="h-8 w-8 animate-spin text-[#5AD3AF]" />
                </div>
            ) : lessons.length === 0 ? (
                <div className="text-center text-gray-600 dark:text-gray-400 p-4">
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
                                className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg ${
                                    completed || quizCompleted
                                        ? 'border-l-4 border-green-500'
                                        : 'border-l-4 border-[#657ED4]'
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
                                            <div className="font-medium text-gray-800 dark:text-gray-200">
                                                {lesson.title}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
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
                                        className="flex items-center gap-2 bg-[#5AD3AF] hover:bg-[#4f927e] text-white"
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
