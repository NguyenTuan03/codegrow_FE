'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Edit, Trash, Plus, Eye, ListChecks, Code, ArrowLeft } from 'lucide-react';
import { viewDetailLesson } from '@/lib/services/lessons/getdetailllesson';
import { CreateQuiz } from '@/lib/services/quizs/createquiz';
import { UpdateQuiz } from '@/lib/services/quizs/updatequiz';
import { DeleteQuiz } from '@/lib/services/quizs/deletequiz';
import { GetQuiz } from '@/lib/services/quizs/getquiz';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface Lesson {
    _id: string;
    title: string;
    content?: string;
    videoUrl?: string;
    videoKey?: string;
    free_url?: string; // Added free_url to interface
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
    type: 'multiple_choice' | 'code';
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
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [quizIdToDelete, setQuizIdToDelete] = useState<string | null>(null);
    const [quizType, setQuizType] = useState<'multiple_choice' | 'code'>('multiple_choice');
    const [currentQuiz, setCurrentQuiz] = useState<Partial<Quiz>>({
        questionText: '',
        explanation: '',
        options: [
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
        ],
        starterCode: '',
        expectedOutput: '',
        language: '',
        testCases: [{ input: '', expectedOutput: '' }],
    });
    const [editingQuizId, setEditingQuizId] = useState<string | null>(null);

    const router = useRouter();
    const params = useParams();
    const lessonId = params.lessionid as string;
    const courseId = params.courseId as string;

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

    const loadLessonDetails = async () => {
        try {
            setLoading(true);
            const response = await viewDetailLesson(lessonId);
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

    const loadAllQuiz = async () => {
        try {
            const response = await GetQuiz(lessonId);
            console.log('get quiz :', response);
            const quizData = response.metadata || [];
            setQuizzes(quizData);
        } catch (error) {
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to load quizzes',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await loadLessonDetails();
            await loadAllQuiz();
        };
        fetchData();
    }, [lessonId]);

    useEffect(() => {
        console.log('Quizzes updated:', quizzes);
    }, [quizzes]);

    const handleQuizInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index?: number,
        field?: string,
    ) => {
        const { name, value } = e.target;
        if (name === 'options' && index !== undefined) {
            setCurrentQuiz((prev) => ({
                ...prev,
                options: prev.options?.map((opt, i) =>
                    i === index ? { ...opt, text: value } : opt,
                ),
            }));
        } else if (name === 'testCases' && index !== undefined && field) {
            setCurrentQuiz((prev) => ({
                ...prev,
                testCases: prev.testCases?.map((tc, i) =>
                    i === index ? { ...tc, [field]: value } : tc,
                ),
            }));
        } else {
            setCurrentQuiz((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleIsCorrectChange = (index: number, checked: boolean) => {
        setCurrentQuiz((prev) => ({
            ...prev,
            options: prev.options?.map((opt, i) =>
                i === index ? { ...opt, isCorrect: checked } : { ...opt, isCorrect: false },
            ),
        }));
    };

    const addOption = () => {
        setCurrentQuiz((prev) => ({
            ...prev,
            options: [...(prev.options || []), { text: '', isCorrect: false }],
        }));
    };

    const addTestCase = () => {
        setCurrentQuiz((prev) => ({
            ...prev,
            testCases: [...(prev.testCases || []), { input: '', expectedOutput: '' }],
        }));
    };

    const removeOption = (index: number) => {
        setCurrentQuiz((prev) => ({
            ...prev,
            options: prev.options?.filter((_, i) => i !== index),
        }));
    };

    const removeTestCase = (index: number) => {
        setCurrentQuiz((prev) => ({
            ...prev,
            testCases: prev.testCases?.filter((_, i) => i !== index),
        }));
    };

    const handleCreateQuiz = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                toast({
                    title: 'Lỗi',
                    description: 'Token không tồn tại. Vui lòng đăng nhập lại.',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });

                return;
            }
            const tokenuser = JSON.parse(token);
            console.log('Token user:', tokenuser);

            if (!currentQuiz.questionText?.trim()) {
                throw new Error('Question text cannot be empty');
            }

            const options = currentQuiz.options || [];
            if (quizType === 'multiple_choice') {
                if (options.length < 2) {
                    throw new Error(
                        'At least two options are required for multiple choice quizzes',
                    );
                }
                if (!options.some((opt) => opt.isCorrect)) {
                    throw new Error('At least one option must be marked as correct');
                }
                if (options.some((opt) => !opt.text.trim())) {
                    throw new Error('All options must have text');
                }
            }
            if (quizType === 'code' && !currentQuiz.language?.trim()) {
                throw new Error('Programming language is required for coding quizzes');
            }

            const quizData = {
                token: tokenuser,
                lesson: lessonId,
                type: quizType,
                questionText: currentQuiz.questionText || '',
                explanation: currentQuiz.explanation || '',
                options: quizType === 'multiple_choice' ? options : [],
                ...(quizType === 'code' && {
                    starterCode: currentQuiz.starterCode || undefined,
                    expectedOutput: currentQuiz.expectedOutput || undefined,
                    language: currentQuiz.language || undefined,
                    testCases: currentQuiz.testCases?.length ? currentQuiz.testCases : undefined,
                }),
            };

            const response = await CreateQuiz(quizData);
            if (response.status === 201) {
                toast({
                    title: 'Success',
                    description: 'Quiz created successfully',
                    variant: 'default',
                    className: 'bg-blue-600 text-white',
                });
                await loadAllQuiz();
                router.refresh();
            }

            setIsCreateDialogOpen(false);
            resetQuizForm();
        } catch (error) {
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to create quiz',
                variant: 'destructive',
            });
        }
    };

    const handleEditQuiz = async () => {
        if (!editingQuizId) return;
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
            console.log('Token user:', tokenuser);
            const quizData = {
                token: tokenuser,
                id: editingQuizId,
                questionText: currentQuiz.questionText || '',
                explanation: currentQuiz.explanation || undefined,
                options: quizType === 'multiple_choice' ? currentQuiz.options || [] : [],
                ...(quizType === 'code' && {
                    starterCode: currentQuiz.starterCode || undefined,
                    language: currentQuiz.language || undefined,
                    testCases: currentQuiz.testCases?.length ? currentQuiz.testCases : undefined,
                }),
            };

            await UpdateQuiz(quizData);
            toast({
                title: 'Success',
                description: 'Quiz updated successfully',
                variant: 'default',
                className: 'bg-blue-600 text-white',
            });
            setIsEditDialogOpen(false);
            resetQuizForm();
            setEditingQuizId(null);
            await loadAllQuiz();
        } catch (error) {
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to update quiz',
                variant: 'destructive',
            });
        }
    };

    const openDeleteDialog = (quizId: string) => {
        setQuizIdToDelete(quizId);
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteQuiz = async (quizId: string) => {
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
            console.log('Token user:', tokenuser);

            const response = await DeleteQuiz(tokenuser, quizId);
            console.log('DeleteQuiz response:', response);
            if (response.status === 201) {
                toast({
                    title: 'Success',
                    description: 'Quiz deleted successfully',
                    variant: 'default',
                    className: 'bg-blue-600 text-white',
                });
                console.log('Quiz deleted successfully:', quizzes);
                router.refresh();
                await loadAllQuiz();
            }
        } catch (error) {
            console.error('Error deleting quiz:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to delete quiz',
                variant: 'destructive',
            });
        } finally {
            setIsDeleteDialogOpen(false);
            setQuizIdToDelete(null);
        }
    };

    const resetQuizForm = () => {
        setCurrentQuiz({
            questionText: '',
            explanation: '',
            options: [
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
            ],
            starterCode: '',
            expectedOutput: '',
            language: '',
            testCases: [{ input: '', expectedOutput: '' }],
        });
        setQuizType('multiple_choice');
    };

    const openEditDialog = (quiz: Quiz) => {
        setCurrentQuiz({
            questionText: quiz.questionText,
            explanation: quiz.explanation,
            options: quiz.options || [
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
            ],
            starterCode: quiz.starterCode || '',
            expectedOutput: quiz.expectedOutput || '',
            language: quiz.language || '',
            testCases: quiz.testCases || [{ input: '', expectedOutput: '' }],
        });
        setQuizType(quiz.type);
        setEditingQuizId(quiz._id);
        setIsEditDialogOpen(true);
    };

    const openViewDialog = (quiz: Quiz) => {
        setSelectedQuiz(quiz);
        setIsViewDialogOpen(true);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-500 cursor-default" />
            </div>
        );
    }

    if (!lesson) {
        return (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-900">
                <p className="text-lg text-gray-600 dark:text-gray-400 cursor-default">
                    Lesson not found.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen  dark:bg-gray-900 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header with back button and title */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => router.push(`/admin/courses/${courseId}`)}
                        className="rounded-lg text-blue-600 dark:text-blue-400 border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors shadow-sm cursor-pointer"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white cursor-default">
                            Lesson Management
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mt-1 cursor-default">
                            Manage lesson content and quizzes
                        </p>
                    </div>
                </div>

                {/* Tab layout for lesson and quizzes */}
                <Tabs defaultValue="lesson" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 max-w-xs rounded-lg bg-gray-100 dark:bg-gray-800 mb-5 p-1">
                        <TabsTrigger
                            value="lesson"
                            className="rounded-md py-2 text-gray-700 dark:text-gray-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-colors cursor-pointer"
                        >
                            Lesson
                        </TabsTrigger>
                        <TabsTrigger
                            value="quizzes"
                            className="rounded-md py-2 text-gray-700 dark:text-gray-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-colors cursor-pointer"
                        >
                            Quizzes
                        </TabsTrigger>
                    </TabsList>

                    {/* Tab for lesson content */}
                    <TabsContent value="lesson">
                        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white cursor-default">
                                    Lesson Details
                                </CardTitle>
                                <CardDescription className="text-gray-600 text-base dark:text-gray-400 cursor-default">
                                    View detailed information about the lesson
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-xl font-medium text-gray-700 dark:text-gray-300 cursor-default">
                                            Title
                                        </Label>
                                        <p className="text-base font-medium text-gray-900 dark:text-gray-100 cursor-default">
                                            {lesson?.title || 'No data available'}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xl font-medium text-gray-700 dark:text-gray-300 cursor-default">
                                            Order
                                        </Label>
                                        <p className="text-base font-medium text-gray-900 dark:text-gray-100 cursor-default">
                                            {lesson?.order || 'No data available'}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xl font-medium text-gray-700 dark:text-gray-300 cursor-default">
                                        Content
                                    </Label>
                                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <p className="text-base text-gray-800 dark:text-gray-200 cursor-default">
                                            {lesson?.content || 'No content available'}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-default">
                                        Video
                                    </Label>
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
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Tab for quizzes */}
                    <TabsContent value="quizzes">
                        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white cursor-default">
                                        Quizzes
                                    </CardTitle>
                                    <CardDescription className="text-gray-600 text-base dark:text-gray-400 cursor-default">
                                        Manage quizzes and assessments for the lesson
                                    </CardDescription>
                                </div>
                                <Dialog
                                    open={isCreateDialogOpen}
                                    onOpenChange={setIsCreateDialogOpen}
                                >
                                    <DialogTrigger asChild>
                                        <Button
                                            size="sm"
                                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors cursor-pointer"
                                        >
                                            <Plus className="h-4 w-4" />
                                            Add Quiz
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
                                        <DialogHeader>
                                            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white cursor-default">
                                                Create New Quiz
                                            </DialogTitle>
                                        </DialogHeader>

                                        {/* Scrollable Form Content */}
                                        <div className="max-h-[70vh] overflow-y-auto px-1">
                                            <div className="space-y-6 py-4">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                                    <button
                                                        onClick={() =>
                                                            setQuizType('multiple_choice')
                                                        }
                                                        className={`flex items-center justify-center p-4 rounded-lg border transition-all cursor-pointer ${
                                                            quizType === 'multiple_choice'
                                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm'
                                                                : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                                                        }`}
                                                    >
                                                        <ListChecks className="h-5 w-5 mr-2" />
                                                        Multiple Choice
                                                    </button>
                                                    <button
                                                        onClick={() => setQuizType('code')}
                                                        className={`flex items-center justify-center p-4 rounded-lg border transition-all cursor-pointer ${
                                                            quizType === 'code'
                                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm'
                                                                : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                                                        }`}
                                                    >
                                                        <Code className="h-5 w-5 mr-2" />
                                                        Coding
                                                    </button>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-default">
                                                        Question
                                                    </Label>
                                                    <Textarea
                                                        id="questionText"
                                                        name="questionText"
                                                        value={currentQuiz.questionText}
                                                        onChange={handleQuizInputChange}
                                                        placeholder="Enter your question here..."
                                                        className="min-h-[100px] w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm cursor-text"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-default">
                                                        Explanation
                                                    </Label>
                                                    <Textarea
                                                        id="explanation"
                                                        name="explanation"
                                                        value={currentQuiz.explanation}
                                                        onChange={handleQuizInputChange}
                                                        placeholder="Provide an explanation for the answer..."
                                                        className="min-h-[80px] w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm cursor-text"
                                                    />
                                                </div>

                                                {quizType === 'multiple_choice' ? (
                                                    <div className="space-y-4">
                                                        <div className="flex justify-between items-center">
                                                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-default">
                                                                Answer Options
                                                            </Label>
                                                            <Button
                                                                onClick={addOption}
                                                                size="sm"
                                                                variant="outline"
                                                                className="flex items-center gap-1 text-blue-600 dark:text-blue-400 border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors rounded-lg cursor-pointer"
                                                            >
                                                                <Plus className="h-4 w-4" />
                                                                Add Option
                                                            </Button>
                                                        </div>

                                                        <div className="space-y-3">
                                                            {currentQuiz.options?.map(
                                                                (option, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className="flex items-center gap-3"
                                                                    >
                                                                        <Checkbox
                                                                            id={`option-${index}`}
                                                                            checked={
                                                                                option.isCorrect
                                                                            }
                                                                            onCheckedChange={(
                                                                                checked,
                                                                            ) =>
                                                                                handleIsCorrectChange(
                                                                                    index,
                                                                                    !!checked,
                                                                                )
                                                                            }
                                                                            className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500 cursor-pointer"
                                                                        />
                                                                        <Input
                                                                            name="options"
                                                                            value={option.text}
                                                                            onChange={(e) =>
                                                                                handleQuizInputChange(
                                                                                    e,
                                                                                    index,
                                                                                )
                                                                            }
                                                                            placeholder={`Option ${index + 1}`}
                                                                            className="flex-1 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm cursor-text"
                                                                        />
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            onClick={() =>
                                                                                removeOption(index)
                                                                            }
                                                                            disabled={
                                                                                currentQuiz.options!
                                                                                    .length <= 2
                                                                            }
                                                                            className={`text-red-500 rounded-lg transition-colors cursor-pointer ${
                                                                                currentQuiz.options!
                                                                                    .length <= 2
                                                                                    ? 'opacity-50 cursor-not-allowed'
                                                                                    : 'hover:bg-red-100 dark:hover:bg-red-900/30'
                                                                            }`}
                                                                        >
                                                                            <Trash className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-6">
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            <div className="space-y-2">
                                                                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-default">
                                                                    Programming Language
                                                                </Label>
                                                                <Select
                                                                    value={currentQuiz.language}
                                                                    onValueChange={(value) =>
                                                                        setCurrentQuiz({
                                                                            ...currentQuiz,
                                                                            language: value,
                                                                        })
                                                                    }
                                                                >
                                                                    <SelectTrigger className="w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm cursor-pointer">
                                                                        <SelectValue placeholder="Select language" />
                                                                    </SelectTrigger>
                                                                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
                                                                        <SelectItem
                                                                            value="javascript"
                                                                            className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                                                                        >
                                                                            JavaScript
                                                                        </SelectItem>
                                                                        <SelectItem
                                                                            value="python"
                                                                            className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                                                                        >
                                                                            Python
                                                                        </SelectItem>
                                                                        <SelectItem
                                                                            value="java"
                                                                            className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                                                                        >
                                                                            Java
                                                                        </SelectItem>
                                                                        <SelectItem
                                                                            value="csharp"
                                                                            className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                                                                        >
                                                                            C#
                                                                        </SelectItem>
                                                                        <SelectItem
                                                                            value="cpp"
                                                                            className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                                                                        >
                                                                            C++
                                                                        </SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-default">
                                                                    Expected Output
                                                                </Label>
                                                                <Input
                                                                    name="expectedOutput"
                                                                    value={
                                                                        currentQuiz.expectedOutput ||
                                                                        ''
                                                                    }
                                                                    onChange={handleQuizInputChange}
                                                                    placeholder="Enter expected output"
                                                                    className="w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm cursor-text"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-default">
                                                                Starter Code
                                                            </Label>
                                                            <Textarea
                                                                name="starterCode"
                                                                value={
                                                                    currentQuiz.starterCode || ''
                                                                }
                                                                onChange={handleQuizInputChange}
                                                                placeholder="Enter starter code..."
                                                                className="min-h-[150px] w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm resize-vertical cursor-text"
                                                            />
                                                        </div>

                                                        <div className="space-y-4">
                                                            <div className="flex justify-between items-center">
                                                                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-default">
                                                                    Test Cases
                                                                </Label>
                                                                <Button
                                                                    onClick={addTestCase}
                                                                    size="sm"
                                                                    variant="outline"
                                                                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors rounded-lg cursor-pointer"
                                                                >
                                                                    <Plus className="h-4 w-4" />
                                                                    Add Test Case
                                                                </Button>
                                                            </div>

                                                            <div className="space-y-3">
                                                                {currentQuiz.testCases?.map(
                                                                    (testCase, index) => (
                                                                        <div
                                                                            key={index}
                                                                            className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
                                                                        >
                                                                            <div className="space-y-1">
                                                                                <Label className="text-xs font-medium text-gray-600 dark:text-gray-400 cursor-default">
                                                                                    Input
                                                                                </Label>
                                                                                <Input
                                                                                    name="testCases"
                                                                                    value={
                                                                                        testCase.input
                                                                                    }
                                                                                    onChange={(e) =>
                                                                                        handleQuizInputChange(
                                                                                            e,
                                                                                            index,
                                                                                            'input',
                                                                                        )
                                                                                    }
                                                                                    placeholder="Enter input"
                                                                                    className="w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm cursor-text"
                                                                                />
                                                                            </div>
                                                                            <div className="space-y-1">
                                                                                <Label className="text-xs font-medium text-gray-600 dark:text-gray-400 cursor-default">
                                                                                    Expected Output
                                                                                </Label>
                                                                                <div className="flex gap-2">
                                                                                    <Input
                                                                                        name="testCases"
                                                                                        value={
                                                                                            testCase.expectedOutput
                                                                                        }
                                                                                        onChange={(
                                                                                            e,
                                                                                        ) =>
                                                                                            handleQuizInputChange(
                                                                                                e,
                                                                                                index,
                                                                                                'expectedOutput',
                                                                                            )
                                                                                        }
                                                                                        placeholder="Enter expected output"
                                                                                        className="w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm cursor-text"
                                                                                    />
                                                                                    <Button
                                                                                        variant="ghost"
                                                                                        size="icon"
                                                                                        onClick={() =>
                                                                                            removeTestCase(
                                                                                                index,
                                                                                            )
                                                                                        }
                                                                                        disabled={
                                                                                            currentQuiz
                                                                                                .testCases!
                                                                                                .length <=
                                                                                            1
                                                                                        }
                                                                                        className={`text-red-500 rounded-lg transition-colors cursor-pointer ${
                                                                                            currentQuiz
                                                                                                .testCases!
                                                                                                .length <=
                                                                                            1
                                                                                                ? 'opacity-50 cursor-not-allowed'
                                                                                                : 'hover:bg-red-100 dark:hover:bg-red-900/30'
                                                                                        }`}
                                                                                    >
                                                                                        <Trash className="h-4 w-4" />
                                                                                    </Button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ),
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-3 pt-4">
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setIsCreateDialogOpen(false);
                                                    resetQuizForm();
                                                }}
                                                className="rounded-lg text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={handleCreateQuiz}
                                                className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-md cursor-pointer"
                                            >
                                                Create Quiz
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </CardHeader>
                            <CardContent>
                                {quizzes.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12">
                                        <div className="text-center space-y-3">
                                            <Code className="h-8 w-8 mx-auto text-gray-400 dark:text-gray-500" />
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white cursor-default">
                                                No quizzes yet
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 cursor-default">
                                                Start by creating a new quiz
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-100 dark:bg-gray-800">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider cursor-default"
                                                    >
                                                        Quiz Type
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider cursor-default"
                                                    >
                                                        Question
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider cursor-default"
                                                    >
                                                        Details
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider cursor-default"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                {quizzes.map((quiz) => (
                                                    <tr
                                                        key={quiz._id}
                                                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-default"
                                                    >
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <Badge
                                                                className={
                                                                    quiz.type === 'multiple_choice'
                                                                        ? 'bg-blue-600 text-white dark:bg-blue-500'
                                                                        : 'bg-green-600 text-white dark:bg-green-500'
                                                                }
                                                            >
                                                                {quiz.type === 'multiple_choice'
                                                                    ? 'Multiple Choice'
                                                                    : 'Coding'}
                                                            </Badge>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                            <div className="line-clamp-2 cursor-default">
                                                                {quiz.questionText}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 cursor-default">
                                                            {quiz.type === 'multiple_choice' ? (
                                                                <div>
                                                                    {quiz.options?.length} options
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    {quiz.language} •{' '}
                                                                    {quiz.testCases?.length} test
                                                                    cases
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <div className="flex gap-2 justify-end">
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        openViewDialog(quiz)
                                                                    }
                                                                    className="text-blue-600 dark:text-blue-400 border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors rounded-lg cursor-pointer"
                                                                >
                                                                    <Eye className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        openEditDialog(quiz)
                                                                    }
                                                                    className="text-blue-600 dark:text-blue-400 border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors rounded-lg cursor-pointer"
                                                                >
                                                                    <Edit className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        openDeleteDialog(quiz._id)
                                                                    }
                                                                    className="text-red-500 border-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors rounded-lg cursor-pointer"
                                                                >
                                                                    <Trash className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Delete Confirmation Dialog */}
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogContent className="sm:max-w-sm bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white cursor-default">
                                Confirm Deletion
                            </DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                            <p className="text-gray-600 dark:text-gray-400 cursor-default">
                                Are you sure you want to delete this quiz? This action cannot be
                                undone.
                            </p>
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setIsDeleteDialogOpen(false);
                                    setQuizIdToDelete(null);
                                }}
                                className="rounded-lg text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    if (quizIdToDelete) {
                                        handleDeleteQuiz(quizIdToDelete);
                                    }
                                }}
                                className="rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors shadow-md cursor-pointer"
                            >
                                Delete
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* View Quiz Dialog */}
                <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                    <DialogContent className="sm:max-w-lg bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white cursor-default">
                                Quiz Details
                            </DialogTitle>
                        </DialogHeader>
                        {selectedQuiz && (
                            <div className="space-y-4 mt-4">
                                <div>
                                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-default">
                                        Quiz Type
                                    </Label>
                                    <p className="text-gray-900 dark:text-gray-100 cursor-default">
                                        {selectedQuiz.type === 'multiple_choice'
                                            ? 'Multiple Choice'
                                            : 'Coding'}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-default">
                                        Question
                                    </Label>
                                    <p className="text-gray-900 dark:text-gray-100 cursor-default">
                                        {selectedQuiz.questionText}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-default">
                                        Explanation
                                    </Label>
                                    <p className="text-gray-900 dark:text-gray-100 cursor-default">
                                        {selectedQuiz.explanation || 'No explanation provided'}
                                    </p>
                                </div>
                                {selectedQuiz.type === 'multiple_choice' && (
                                    <div>
                                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-default">
                                            Options
                                        </Label>
                                        <ul className="list-disc pl-4 mt-1">
                                            {selectedQuiz.options?.map((option, index) => (
                                                <li
                                                    key={index}
                                                    className={
                                                        option.isCorrect
                                                            ? 'text-green-600 dark:text-green-400'
                                                            : 'text-gray-900 dark:text-gray-100 cursor-default'
                                                    }
                                                >
                                                    {option.text}{' '}
                                                    {option.isCorrect && '(Correct Answer)'}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {selectedQuiz.type === 'code' && (
                                    <>
                                        <div>
                                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-default">
                                                Starter Code
                                            </Label>
                                            <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 cursor-default">
                                                {selectedQuiz.starterCode || 'No starter code'}
                                            </pre>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-default">
                                                Expected Output
                                            </Label>
                                            <p className="text-gray-900 dark:text-gray-100 cursor-default">
                                                {selectedQuiz.expectedOutput ||
                                                    'No expected output'}
                                            </p>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-default">
                                                Language
                                            </Label>
                                            <p className="text-gray-900 dark:text-gray-100 cursor-default">
                                                {selectedQuiz.language || 'No language specified'}
                                            </p>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-default">
                                                Test Cases
                                            </Label>
                                            {selectedQuiz.testCases?.length ? (
                                                <ul className="list-disc pl-4 mt-1">
                                                    {selectedQuiz.testCases.map(
                                                        (testCase, index) => (
                                                            <li
                                                                key={index}
                                                                className="text-gray-900 dark:text-gray-100 cursor-default"
                                                            >
                                                                Input: {testCase.input}, Expected
                                                                Output: {testCase.expectedOutput}
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            ) : (
                                                <p className="text-gray-900 dark:text-gray-100 cursor-default">
                                                    No test cases
                                                </p>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Edit Quiz Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="sm:max-w-lg bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white cursor-default">
                                Edit Quiz
                            </DialogTitle>
                        </DialogHeader>
                        <div className="max-h-[70vh] overflow-y-auto px-1">
                            <div className="space-y-4 mt-4">
                                <div>
                                    <Label
                                        htmlFor="quizType"
                                        className="text-gray-700 dark:text-gray-300 cursor-default"
                                    >
                                        Quiz Type
                                    </Label>
                                    <Select
                                        name="quizType"
                                        value={quizType}
                                        onValueChange={(value) =>
                                            setQuizType(value as 'multiple_choice' | 'code')
                                        }
                                    >
                                        <SelectTrigger className="w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm cursor-pointer">
                                            <SelectValue placeholder="Select quiz type" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
                                            <SelectItem
                                                value="multiple_choice"
                                                className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                                            >
                                                Multiple Choice
                                            </SelectItem>
                                            <SelectItem
                                                value="code"
                                                className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                                            >
                                                Coding
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label
                                        htmlFor="questionText"
                                        className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-default"
                                    >
                                        Question
                                    </Label>
                                    <Textarea
                                        id="questionText"
                                        name="questionText"
                                        value={currentQuiz.questionText}
                                        onChange={handleQuizInputChange}
                                        placeholder="Enter quiz question"
                                        className="min-h-[100px] w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm cursor-text"
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor="explanation"
                                        className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-default"
                                    >
                                        Explanation
                                    </Label>
                                    <Textarea
                                        id="explanation"
                                        name="explanation"
                                        value={currentQuiz.explanation}
                                        onChange={handleQuizInputChange}
                                        placeholder="Enter explanation"
                                        className="min-h-[80px] w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm cursor-text"
                                    />
                                </div>
                                {quizType === 'multiple_choice' && (
                                    <>
                                        {currentQuiz.options?.map((option, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <Checkbox
                                                    id={`option-${index}`}
                                                    checked={option.isCorrect}
                                                    onCheckedChange={(checked) =>
                                                        handleIsCorrectChange(index, !!checked)
                                                    }
                                                    className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500 cursor-pointer"
                                                />
                                                <Input
                                                    name="options"
                                                    value={option.text}
                                                    onChange={(e) =>
                                                        handleQuizInputChange(e, index)
                                                    }
                                                    placeholder={`Option ${index + 1}`}
                                                    className="flex-1 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm cursor-text"
                                                />
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeOption(index)}
                                                    disabled={currentQuiz.options!.length <= 2}
                                                    className={`text-red-500 rounded-lg transition-colors cursor-pointer ${
                                                        currentQuiz.options!.length <= 2
                                                            ? 'opacity-50 cursor-not-allowed'
                                                            : 'hover:bg-red-100 dark:hover:bg-red-900/30'
                                                    }`}
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button
                                            onClick={addOption}
                                            className="mt-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-md cursor-pointer"
                                        >
                                            Add Option
                                        </Button>
                                    </>
                                )}
                                {quizType === 'code' && (
                                    <>
                                        <div>
                                            <Label
                                                htmlFor="starterCode"
                                                className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-default"
                                            >
                                                Starter Code
                                            </Label>
                                            <Textarea
                                                id="starterCode"
                                                name="starterCode"
                                                value={currentQuiz.starterCode}
                                                onChange={handleQuizInputChange}
                                                placeholder="Enter starter code"
                                                className="min-h-[150px] w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm cursor-text"
                                            />
                                        </div>
                                        <div>
                                            <Label
                                                htmlFor="expectedOutput"
                                                className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-default"
                                            >
                                                Expected Output
                                            </Label>
                                            <Input
                                                id="expectedOutput"
                                                name="expectedOutput"
                                                value={currentQuiz.expectedOutput}
                                                onChange={handleQuizInputChange}
                                                placeholder="Enter expected output"
                                                className="w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm cursor-text"
                                            />
                                        </div>
                                        <div>
                                            <Label
                                                htmlFor="language"
                                                className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-default"
                                            >
                                                Language
                                            </Label>
                                            <Input
                                                id="language"
                                                name="language"
                                                value={currentQuiz.language}
                                                onChange={handleQuizInputChange}
                                                placeholder="Enter programming language"
                                                className="w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm cursor-text"
                                            />
                                        </div>
                                        {currentQuiz.testCases?.map((testCase, index) => (
                                            <div key={index} className="space-y-2">
                                                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-default">
                                                    Test Case {index + 1}
                                                </Label>
                                                <Input
                                                    name="testCases"
                                                    value={testCase.input}
                                                    onChange={(e) =>
                                                        handleQuizInputChange(e, index, 'input')
                                                    }
                                                    placeholder="Input"
                                                    className="w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm cursor-text"
                                                />
                                                <Input
                                                    name="testCases"
                                                    value={testCase.expectedOutput}
                                                    onChange={(e) =>
                                                        handleQuizInputChange(
                                                            e,
                                                            index,
                                                            'expectedOutput',
                                                        )
                                                    }
                                                    placeholder="Expected Output"
                                                    className="w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm cursor-text"
                                                />
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeTestCase(index)}
                                                    disabled={currentQuiz.testCases!.length <= 1}
                                                    className={`text-red-500 rounded-lg transition-colors cursor-pointer ${
                                                        currentQuiz.testCases!.length <= 1
                                                            ? 'opacity-50 cursor-not-allowed'
                                                            : 'hover:bg-red-100 dark:hover:bg-red-900/30'
                                                    }`}
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button
                                            onClick={addTestCase}
                                            className="mt-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-md cursor-pointer"
                                        >
                                            Add Test Case
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                        <Button
                            onClick={handleEditQuiz}
                            className="mt-4 w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-md cursor-pointer"
                        >
                            Update Quiz
                        </Button>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
