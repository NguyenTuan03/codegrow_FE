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
import { GetProgress } from '@/lib/services/api/progress'; // Import GetProgress

interface Lesson {
    _id: string;
    title: string;
    content?: string;
    videoUrl?: string; // For watching lessons
    free_url?: string; // For watching lessons
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

interface ProgressResponse {
    message: string;
    status: number;
    metadata: {
        progress?: number;
        completedLessons: string[];
        completedQuizzes: string[];
        lastLesson?: string;
    };
}

export default function LessonDetail() {
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true); // For lesson and quiz loading
    const [progressLoading, setProgressLoading] = useState(true); // For progress loading
    const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
    const [completedQuizIds, setCompletedQuizIds] = useState<string[]>([]);
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

            if (urlObj.hostname.includes('youtube.com') && urlObj.searchParams.has('v')) {
                videoId = urlObj.searchParams.get('v');
            } else if (urlObj.hostname.includes('youtu.be')) {
                videoId = urlObj.pathname.split('/')[1];
            }

            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }

            if (urlObj.pathname.includes('/embed/')) {
                return url;
            }

            return url;
        } catch (error) {
            console.error('Failed to transform YouTube URL:', error);
            return url;
        }
    };

    // Fetch progress to check if lesson is marked as completed
    const fetchProgress = async () => {
        try {
            setProgressLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                toast({
                    title: 'Lỗi',
                    description: 'Token không tồn tại. Vui lòng đăng nhập lại.',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
                router.push('/login');
                return;
            }
            const tokenuser = JSON.parse(token);

            const userId = localStorage.getItem('user');
            if (!userId) {
                toast({
                    title: 'Lỗi',
                    description: 'Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
                router.push('/login');
                return;
            }
            const user = JSON.parse(userId);
            const id = user.id;

            const response: ProgressResponse = await GetProgress(tokenuser, id, courseId);

            if (response?.status === 200 && response.metadata) {
                const { completedLessons, completedQuizzes } = response.metadata;
                setCompletedLessonIds(completedLessons);
                setCompletedQuizIds(completedQuizzes);
            }
        } catch (error) {
            console.error('Error fetching progress:', error);
            toast({
                title: 'Error',
                description: 'Failed to load progress data.',
                variant: 'destructive',
            });
        } finally {
            setProgressLoading(false);
        }
    };

    // Load lesson details (without quizzes)
    const loadLessonDetails = async () => {
        try {
            setLoading(true);
            const response = await viewDetailLesson(lessonId);

            const lessonData = response.metadata;
            setLesson(lessonData);
        } catch (error) {
            toast({
                title: 'Error',
                description:
                    error instanceof Error ? error.message : 'Failed to load lesson details',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    // Load all quizzes for the lesson
    const loadAllQuiz = async () => {
        try {
            const response = await GetQuiz(lessonId);

            const quizData = response.metadata || [];
            setQuizzes(quizData);
        } catch (error) {
            setQuizzes([]);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to load quizzes',
                variant: 'destructive',
            });
        }
    };

    const handleMarkAsCompleted = async () => {
        if (
            completedLessonIds.includes(lessonId) ||
            completedQuizIds.some((q) => quizzes.some((quiz) => quiz._id === q))
        )
            return;

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast({
                    title: 'Lỗi',
                    description: 'Token không tồn tại. Vui lòng đăng nhập lại.',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
                router.push('/login');
                return;
            }
            const tokenuser = JSON.parse(token);
            setIsMarking(true);
            await MarkLesson(tokenuser, lessonId, courseId);
            setCompletedLessonIds((prev) => [...prev, lessonId]);
            toast({
                title: 'Success',
                description: 'Lesson marked as completed!',
                variant: 'default',
                className:
                    'bg-[#657ED4] dark:bg-[#5AD3AF] text-white dark:text-black font-semibold',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description:
                    error instanceof Error ? error.message : 'Failed to mark lesson as completed',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        } finally {
            setIsMarking(false);
        }
    };

    // Load lesson, quizzes, and progress on mount
    useEffect(() => {
        console.log('Lesson ID:', lessonId);

        const fetchData = async () => {
            setLoading(true); // Start loading for all data
            await Promise.all([loadLessonDetails(), loadAllQuiz(), fetchProgress()]);
            setLoading(false); // End loading only when all data is fetched
        };
        fetchData();
    }, [lessonId]);

    // Handle "Take" quiz button
    const handleTakeQuiz = (quizId: string) => {
        router.push(`/customer/courses/${courseId}/${lessonId}/${quizId}`);
    };

    if (loading || progressLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <Loader2 className="h-12 w-12 animate-spin text-[#657ED4] dark:text-[#5AD3AF] mb-4" />
                <p className="text-[#657ED4] dark:text-[#5AD3AF] font-medium">
                    Loading lesson content...
                </p>
            </div>
        );
    }

    if (!lesson) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <Info className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">
                        Lesson Not Found
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400 font-medium">
                        The lesson you are looking for doesn’t seem to exist.
                    </p>
                    <Button
                        onClick={() => router.push(`/customer/courses/${courseId}`)}
                        className="mt-6 bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] text-white rounded-lg px-6 py-2 transition-all duration-200"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Course
                    </Button>
                </div>
            </div>
        );
    }

    const isCompleted =
        completedLessonIds.includes(lessonId) ||
        completedQuizIds.some((q) => quizzes.some((quiz) => quiz._id === q));

    return (
        <div className="container mx-auto px-4 py-12 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Lesson Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => router.push(`/customer/courses/${courseId}`)}
                            className="rounded-full cursor-pointer text-[#657ED4] border-[#657ED4] hover:bg-[#657ED4] hover:text-white dark:text-[#5AD3AF] dark:border-[#5AD3AF] dark:hover:bg-[#5AD3AF] dark:hover:text-white transition-all duration-200"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-8 bg-[#657ED4] dark:bg-[#5AD3AF] rounded-full" />
                            <div>
                                <div className="flex items-center gap-3">
                                    <Badge className="bg-[#657ED4]/10 text-base text-[#657ED4] dark:bg-[#5AD3AF]/20 dark:text-[#5AD3AF] font-medium">
                                        Lesson {lesson.order}
                                    </Badge>
                                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                                        {lesson.title}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 gap-8">
                    <Tabs defaultValue="content" className="w-full">
                        <TabsList className="grid grid-cols-2 gap-4 mb-6 bg-gray-100 cursor-pointer dark:bg-gray-800 p-2 rounded-lg">
                            <TabsTrigger
                                value="content"
                                className="flex items-center cursor-pointer gap-2 text-gray-700 dark:text-gray-300 data-[state=active]:bg-[#657ED4] dark:data-[state=active]:bg-[#5AD3AF] data-[state=active]:text-white rounded-lg transition-all duration-200 font-medium text-base"
                            >
                                <BookOpen className="h-4 w-4 text-base" />
                                Lesson Content
                            </TabsTrigger>
                            <TabsTrigger
                                value="quizzes"
                                className="flex items-center cursor-pointer gap-2 text-gray-700 dark:text-gray-300 data-[state=active]:bg-[#657ED4] dark:data-[state=active]:bg-[#5AD3AF] data-[state=active]:text-white rounded-lg transition-all duration-200 font-medium text-base"
                            >
                                <ListChecks className="h-4 w-4" />
                                Practice Quizzes ({quizzes.length})
                            </TabsTrigger>
                        </TabsList>

                        {/* Lesson Content Tab */}
                        <TabsContent value="content" className="space-y-6">
                            {/* Video Section */}
                            {lesson?.free_url ? (
                                <div className="relative aspect-video">
                                    <iframe
                                        src={transformYouTubeUrl(lesson.free_url)}
                                        title="Lesson Video"
                                        className="w-full h-full rounded-lg shadow-md"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        onError={(e) => {
                                            console.error('Iframe error:', e);
                                            toast({
                                                title: 'Error',
                                                description:
                                                    'Failed to load video. Please check the URL.',
                                                variant: 'destructive',
                                            });
                                        }}
                                    ></iframe>
                                </div>
                            ) : lesson?.videoUrl ? (
                                <div className="relative aspect-video">
                                    <iframe
                                        src={transformYouTubeUrl(lesson.videoUrl)}
                                        title="Lesson Video"
                                        className="w-full h-full rounded-lg shadow-md"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        onError={(e) => {
                                            console.error('Iframe error:', e);
                                            toast({
                                                title: 'Error',
                                                description:
                                                    'Failed to load video. Please check the URL.',
                                                variant: 'destructive',
                                            });
                                        }}
                                    ></iframe>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-600 dark:text-gray-400 cursor-default">
                                    No video available
                                </p>
                            )}

                            {/* Lesson Content */}
                            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-2xl text-[#657ED4] dark:text-[#5AD3AF] flex items-center gap-2">
                                        <BookOpen className="h-5 w-5" />
                                        Lesson Materials
                                    </CardTitle>
                                    <CardDescription className="text-gray-600 text-xl dark:text-gray-400 font-medium">
                                        Read through the content carefully to prepare for the
                                        practice quizzes
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="prose text-xl prose-slate dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed">
                                        {lesson.content ? (
                                            <div
                                                dangerouslySetInnerHTML={{ __html: lesson.content }}
                                            />
                                        ) : (
                                            <p className="text-gray-500 dark:text-gray-400 italic font-medium">
                                                No written content available for this lesson. Please
                                                refer to the video.
                                            </p>
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-4 p-6 gap-4">
                                    {isCompleted ? (
                                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 text-base font-medium px-6 py-2 rounded-lg">
                                            Completed
                                        </Badge>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            onClick={handleMarkAsCompleted}
                                            disabled={isMarking}
                                            className="text-[#657ED4] cursor-pointer border-[#657ED4] dark:text-[#5AD3AF] dark:border-[#5AD3AF] hover:bg-[#657ED4] hover:text-white dark:hover:bg-[#5AD3AF] dark:hover:text-white rounded-lg px-6 py-2 transition-all duration-200 font-medium text-base"
                                        >
                                            {isMarking ? (
                                                <>
                                                    <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-t-transparent border-current"></span>
                                                    Marking...
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                    Mark as Completed
                                                </>
                                            )}
                                        </Button>
                                    )}

                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            document.getElementById('quizzes-tab')?.click()
                                        }
                                        className="text-[#657ED4] border-[#657ED4] cursor-pointer dark:text-[#5AD3AF] dark:border-[#5AD3AF] hover:bg-[#657ED4] hover:text-white dark:hover:bg-[#5AD3AF] dark:hover:text-white rounded-lg px-6 py-2 transition-all duration-200 font-medium text-base"
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
                                            className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg shadow-md transition-shadow hover:shadow-lg"
                                        >
                                            <CardHeader className="bg-gray-50 dark:bg-gray-800/50 pb-4">
                                                <div className="flex justify-between items-start">
                                                    <Badge
                                                        className={`${
                                                            quiz.type === 'multiple_choice'
                                                                ? 'bg-purple-100 text-purple-800 text-base dark:bg-purple-900/20 dark:text-purple-300'
                                                                : 'bg-blue-100 text-blue-800 text-base dark:bg-blue-900/20 dark:text-blue-300'
                                                        } mb-2 font-medium`}
                                                    >
                                                        {quiz.type === 'multiple_choice' ? (
                                                            <>
                                                                <ListChecks className="h-3 w-3 mr-1" />{' '}
                                                                Multiple Choice
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Code className="h-3 w-3 mr-1" />{' '}
                                                                Coding Challenge
                                                            </>
                                                        )}
                                                    </Badge>
                                                </div>
                                                <CardTitle className="text-xl font-semibold line-clamp-2 text-gray-800 dark:text-gray-200">
                                                    {quiz.questionText}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="pt-4">
                                                {quiz.type === 'multiple_choice' ? (
                                                    <p className="text-gray-600 dark:text-gray-400 text-base font-medium">
                                                        Multiple choice quiz with{' '}
                                                        {quiz.options?.length || 0} options
                                                    </p>
                                                ) : (
                                                    <p className="text-gray-600 dark:text-gray-400 text-base font-medium">
                                                        Coding challenge in {quiz.language} with{' '}
                                                        {quiz.testCases?.length || 0} test cases
                                                    </p>
                                                )}
                                            </CardContent>
                                            <CardFooter className="flex justify-end pt-2 pb-4">
                                                <Button
                                                    onClick={() => handleTakeQuiz(quiz._id)}
                                                    className="bg-[#657ED4] cursor-pointer dark:bg-[#5AD3AF] text-base hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] text-white rounded-lg px-6 py-2 transition-all duration-200 font-medium"
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
                                    <Card className="col-span-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
                                        <CardHeader>
                                            <CardTitle className="text-center text-gray-500 dark:text-gray-400 font-semibold">
                                                No Quizzes Available
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-center text-gray-500 dark:text-gray-400 font-medium">
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
        </div>
    );
}
