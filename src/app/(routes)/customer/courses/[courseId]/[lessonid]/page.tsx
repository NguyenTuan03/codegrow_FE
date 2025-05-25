'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import {
    Loader2,
    BookOpen,
    CheckCircle,
    ArrowLeft,
    Play,
    Code,
    ListChecks,
    Info,
    PanelRightOpen,
} from 'lucide-react';
import { viewDetailLesson } from '@/lib/services/lessons/getdetailllesson';
import { GetQuiz } from '@/lib/services/quizs/getquiz';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MarkLesson } from '@/lib/services/api/markalesson';

interface Lesson {
    _id: string;
    title: string;
    content?: string;
    videoUrl?: string;
    videoKey?: string;
    order: number;
}

interface Option {
    text: string;
    isCorrect: boolean;
}

interface TestCase {
    input: string;
    expectedOutput: string;
}

interface Quiz {
    _id: string;
    lesson: string;
    type: 'multiple_choice' | 'coding';
    questionText: string;
    explanation: string;
    options?: Option[];
    starterCode?: string;
    expectedOutput?: string;
    language?: string;
    testCases?: TestCase[];
}

export default function LessonDetail() {
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true);
    const [isMarked, setIsMarked] = useState(false);
    const [isMarking, setIsMarking] = useState(false);
    const router = useRouter();
    const params = useParams();
    const lessonId = params.lessonid as string;
    const courseId = params.courseId as string;
    // Helper function to transform YouTube URL into embed format
    const transformYouTubeUrl = (url: string): string => {
        try {
            const urlObj = new URL(url);
            let videoId: string | null = null;

            // Handle standard YouTube URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)
            if (urlObj.hostname.includes('youtube.com') && urlObj.searchParams.has('v')) {
                videoId = urlObj.searchParams.get('v');
            }
            // Handle shortened YouTube URL (e.g., https://youtu.be/VIDEO_ID)
            else if (urlObj.hostname.includes('youtu.be')) {
                videoId = urlObj.pathname.split('/')[1];
            }

            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }

            // If URL is already in embed format or not a YouTube URL, return as-is
            if (urlObj.pathname.includes('/embed/')) {
                return url;
            }

            // Return original URL if transformation fails (e.g., for Vimeo or other providers)
            return url;
        } catch (error) {
            console.error('Failed to transform YouTube URL:', error);
            return url; // Fallback to original URL
        }
    };
    // Load lesson details (without quizzes)
    const loadLessonDetails = async () => {
        try {
            setLoading(true);
            const response = await viewDetailLesson(lessonId);
            console.log('viewDetailLesson response:', response);

            const lessonData = response.metadata;
            setLesson(lessonData);
            console.log('Lesson details loaded:', lessonData);
        } catch (error) {
            toast({
                title: 'Error',
                description:
                    error instanceof Error ? error.message : 'Failed to load lesson details',
                variant: 'destructive',
            });
        }
    };

    // Load all quizzes for the lesson
    const loadAllQuiz = async () => {
        try {
            const response = await GetQuiz(lessonId);
            console.log('GetQuiz response:', response);

            const quizData = response.metadata || [];
            setQuizzes(quizData);
        } catch (error) {
            setQuizzes([]);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to load quizzes',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsCompleted = async () => {
        try {
            const token = localStorage.getItem('token') || '';
            setIsMarking(true);
            await MarkLesson(token, lessonId, courseId);
            setIsMarked(true);
            toast({
                title: 'Success',
                description: 'Lesson marked as completed!',
                variant: 'default',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description:
                    error instanceof Error ? error.message : 'Failed to mark lesson as completed',
                variant: 'destructive',
            });
        } finally {
            setIsMarking(false);
        }
    };

    // Load lesson and quizzes on mount
    useEffect(() => {
        console.log('Lesson ID:', lessonId);

        const fetchData = async () => {
            await loadLessonDetails();
            await loadAllQuiz();
            // Removed handleMarkAsCompleted from here
        };
        fetchData();
    }, [lessonId]);

    // Handle "Take" quiz button
    const handleTakeQuiz = (quizId: string) => {
        router.push(`/customer/courses/${courseId}/${lessonId}/${quizId}`);
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <Loader2 className="h-12 w-12 animate-spin text-[#5AD3AF] mb-4" />
                <p className="text-[#657ED4] dark:text-[#5AD3AF] font-medium">
                    Loading lesson content...
                </p>
            </div>
        );
    }

    if (!lesson) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
                <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    <Info className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">
                        Lesson Not Found
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        The lesson you are looking for doesn’t seem to exist.
                    </p>
                    <Button
                        onClick={() => router.push(`/customer/courses/${courseId}`)}
                        className="mt-6 bg-[#657ED4] hover:bg-[#5068C2] text-white"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Course
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto px-4 py-8 max-w-6xl">
            {/* Lesson Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b dark:border-gray-700">
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/customer/courses/${courseId}`)}
                        className="mr-4 text-gray-500 hover:text-[#657ED4] dark:text-gray-400 dark:hover:text-[#5AD3AF]"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <div className="flex items-center">
                            <Badge className="mr-3 bg-[#657ED4]/10 text-[#657ED4] dark:bg-[#5AD3AF]/10 dark:text-[#5AD3AF] font-medium">
                                Lesson {lesson.order}
                            </Badge>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                                {lesson.title}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 gap-8">
                <Tabs defaultValue="content" className="w-full">
                    <TabsList className="grid grid-cols-2 gap-4 mb-6">
                        <TabsTrigger value="content" className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-2" />
                            Lesson Content
                        </TabsTrigger>
                        <TabsTrigger value="quizzes" className="flex items-center">
                            <ListChecks className="h-4 w-4 mr-2" />
                            Practice Quizzes ({quizzes.length})
                        </TabsTrigger>
                    </TabsList>

                    {/* Lesson Content Tab */}
                    <TabsContent value="content" className="space-y-6">
                        {/* Video Section */}
                        {lesson.videoUrl && (
                            <Card className="overflow-hidden border-none shadow-lg">
                                <div className="bg-gray-900 aspect-video relative flex items-center justify-center">
                                    <iframe
                                        src={transformYouTubeUrl(lesson.videoUrl)}
                                        title="Lesson Video"
                                        className="w-full h-full rounded-lg"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        onError={(e) => {
                                            console.error('Iframe error:', e);
                                            toast({
                                                title: 'Error',
                                                description:
                                                    'Failed to load video. Please ensure the URL is valid.',
                                                variant: 'destructive',
                                            });
                                        }}
                                    ></iframe>
                                </div>
                            </Card>
                        )}

                        {/* Lesson Content */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-xl text-[#657ED4] dark:text-[#5AD3AF] flex items-center">
                                    <BookOpen className="h-5 w-5 mr-2" />
                                    Lesson Materials
                                </CardTitle>
                                <CardDescription>
                                    Read through the content carefully to prepare for the practice
                                    quizzes
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    {lesson.content ? (
                                        <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
                                    ) : (
                                        <p className="text-gray-500 dark:text-gray-400 italic">
                                            No written content available for this lesson. Please
                                            refer to the video.
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between border-t pt-4 dark:border-gray-700">
                                <Button
                                    variant="outline"
                                    onClick={handleMarkAsCompleted}
                                    disabled={isMarked || isMarking}
                                    className={`${
                                        isMarked
                                            ? 'bg-green-50 text-green-700 border-green-300 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700/30'
                                            : 'text-[#657ED4] border-[#657ED4] dark:text-[#5AD3AF] dark:border-[#5AD3AF] hover:bg-[#657ED4]/10'
                                    }`}
                                >
                                    {isMarking ? (
                                        <>
                                            <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-t-transparent border-current"></span>
                                            Marking...
                                        </>
                                    ) : isMarked ? (
                                        <>
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                            Completed
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                            Mark as Completed
                                        </>
                                    )}
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={() => document.getElementById('quizzes-tab')?.click()}
                                    className="text-[#657ED4] border-[#657ED4] dark:text-[#5AD3AF] dark:border-[#5AD3AF] hover:bg-[#657ED4]/10"
                                >
                                    Continue to Quizzes
                                    <PanelRightOpen className="ml-2 h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* Quizzes Tab */}
                    <TabsContent value="quizzes" id="quizzes-tab" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {quizzes.length > 0 ? (
                                quizzes.map((quiz) => (
                                    <Card
                                        key={quiz._id}
                                        className="overflow-hidden border transition-shadow hover:shadow-md"
                                    >
                                        <CardHeader className="bg-gray-50 dark:bg-gray-800/50 pb-4">
                                            <div className="flex justify-between items-start">
                                                <Badge
                                                    className={`${
                                                        quiz.type === 'multiple_choice'
                                                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300'
                                                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                                                    } mb-2`}
                                                >
                                                    {quiz.type === 'multiple_choice' ? (
                                                        <>
                                                            <ListChecks className="h-3 w-3 mr-1" />{' '}
                                                            Multiple Choice
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Code className="h-3 w-3 mr-1" /> Coding
                                                            Challenge
                                                        </>
                                                    )}
                                                </Badge>
                                            </div>
                                            <CardTitle className="text-lg font-semibold line-clamp-2">
                                                {quiz.questionText}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="pt-4">
                                            {quiz.type === 'multiple_choice' ? (
                                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                    Multiple choice quiz with{' '}
                                                    {quiz.options?.length || 0} options
                                                </p>
                                            ) : (
                                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                    Coding challenge in {quiz.language} with{' '}
                                                    {quiz.testCases?.length || 0} test cases
                                                </p>
                                            )}
                                        </CardContent>
                                        <CardFooter className="flex justify-end pt-2 pb-4">
                                            <Button
                                                onClick={() => handleTakeQuiz(quiz._id)}
                                                className="bg-[#657ED4] hover:bg-[#4F65C0] text-white dark:bg-[#5AD3AF] dark:hover:bg-[#41B596] dark:text-gray-900"
                                            >
                                                {quiz.type === 'multiple_choice' ? (
                                                    <>
                                                        Take Quiz{' '}
                                                        <CheckCircle className="ml-2 h-4 w-4" />
                                                    </>
                                                ) : (
                                                    <>
                                                        Solve Challenge{' '}
                                                        <Play className="ml-2 h-4 w-4" />
                                                    </>
                                                )}
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))
                            ) : (
                                <Card className="col-span-full">
                                    <CardHeader>
                                        <CardTitle className="text-center text-gray-500 dark:text-gray-400">
                                            No Quizzes Available
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-center text-gray-500 dark:text-gray-400">
                                            There are no practice quizzes for this lesson yet.
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
