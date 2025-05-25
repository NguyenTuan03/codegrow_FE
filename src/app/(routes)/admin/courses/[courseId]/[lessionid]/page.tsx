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
                throw new Error('No authentication token found');
            }

            if (!currentQuiz.questionText?.trim()) {
                throw new Error('Question text is required');
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
                token,
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
                    className: 'bg-[#5AD3AF] text-black',
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
                throw new Error('No authentication token found');
            }
            const quizData = {
                token,
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
                className: 'bg-[#5AD3AF] text-black',
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
                throw new Error('No authentication token found');
            }

            const response = await DeleteQuiz(token, quizId);
            console.log('DeleteQuiz response:', response);
            if (response.status === 201) {
                toast({
                    title: 'Success',
                    description: 'Quiz deleted successfully',
                    variant: 'default',
                    className: 'bg-[#5AD3AF] text-black',
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
            <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <Loader2 className="h-8 w-8 animate-spin text-[#5AD3AF]" />
            </div>
        );
    }

    if (!lesson) {
        return (
            <div className="text-center py-12 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <p className="text-lg text-gray-600 dark:text-gray-400">Lesson not found.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header with back button and title */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => router.push(`/admin/courses/${courseId}`)}
                        className="rounded-full text-[#5AD3AF] border-[#5AD3AF] hover:bg-[#5AD3AF] hover:text-white dark:text-[#5AD3AF] dark:border-[#5AD3AF] dark:hover:bg-[#5AD3AF] dark:hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                            Lesson Management
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Manage lesson content and quizzes
                        </p>
                    </div>
                </div>

                {/* Tab layout for lesson and quizzes */}
                <Tabs defaultValue="lesson" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 max-w-xs">
                        <TabsTrigger
                            value="lesson"
                            className="data-[state=active]:bg-[#5AD3AF] data-[state=active]:text-white"
                        >
                            Lesson
                        </TabsTrigger>
                        <TabsTrigger
                            value="quizzes"
                            className="data-[state=active]:bg-[#5AD3AF] data-[state=active]:text-white"
                        >
                            Quizzes
                        </TabsTrigger>
                    </TabsList>

                    {/* Tab for lesson content */}
                    <TabsContent value="lesson">
                        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                    Lesson Details
                                </CardTitle>
                                <CardDescription className="text-gray-600 dark:text-gray-400">
                                    View lesson information
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Title
                                        </Label>
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {lesson?.title || 'N/A'}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Order
                                        </Label>
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {lesson?.order || 'N/A'}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Content
                                    </Label>
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <p className="text-sm text-gray-800 dark:text-gray-200">
                                            {lesson?.content || 'No content available'}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Video
                                    </Label>
                                    {lesson?.videoUrl ? (
                                        <div className="relative aspect-video">
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
                                    ) : (
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
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
                                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                        Quizzes
                                    </CardTitle>
                                    <CardDescription className="text-gray-600 dark:text-gray-400">
                                        Manage lesson quizzes and assessments
                                    </CardDescription>
                                </div>
                                <Dialog
                                    open={isCreateDialogOpen}
                                    onOpenChange={setIsCreateDialogOpen}
                                >
                                    <DialogTrigger asChild>
                                        <Button
                                            size="sm"
                                            className="bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white gap-2"
                                        >
                                            <Plus className="h-4 w-4" />
                                            Add Quiz
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
                                        <DialogHeader>
                                            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                                Create New Quiz
                                            </DialogTitle>
                                        </DialogHeader>

                                        <div className="space-y-6 py-4">
                                            <div className="grid grid-cols-2 gap-4 mb-6">
                                                <button
                                                    onClick={() => setQuizType('multiple_choice')}
                                                    className={`flex items-center justify-center p-4 rounded-lg border transition-all ${
                                                        quizType === 'multiple_choice'
                                                            ? 'border-[#5AD3AF] bg-[#5AD3AF]/10 text-[#5AD3AF] shadow-sm'
                                                            : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                    }`}
                                                >
                                                    <ListChecks className="h-5 w-5 mr-2" />
                                                    Multiple Choice
                                                </button>
                                                <button
                                                    onClick={() => setQuizType('code')}
                                                    className={`flex items-center justify-center p-4 rounded-lg border transition-all ${
                                                        quizType === 'code'
                                                            ? 'border-[#5AD3AF] bg-[#5AD3AF]/10 text-[#5AD3AF] shadow-sm'
                                                            : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                    }`}
                                                >
                                                    <Code className="h-5 w-5 mr-2" />
                                                    Coding Quiz
                                                </button>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Question
                                                </Label>
                                                <Textarea
                                                    id="questionText"
                                                    name="questionText"
                                                    value={currentQuiz.questionText}
                                                    onChange={handleQuizInputChange}
                                                    placeholder="Enter your question here..."
                                                    className="min-h-[100px] bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF]"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Explanation
                                                </Label>
                                                <Textarea
                                                    id="explanation"
                                                    name="explanation"
                                                    value={currentQuiz.explanation}
                                                    onChange={handleQuizInputChange}
                                                    placeholder="Provide an explanation for the answer..."
                                                    className="min-h-[80px] bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF]"
                                                />
                                            </div>

                                            {quizType === 'multiple_choice' ? (
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-center">
                                                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            Answer Options
                                                        </Label>
                                                        <Button
                                                            onClick={addOption}
                                                            size="sm"
                                                            variant="outline"
                                                            className="text-[#5AD3AF] border-[#5AD3AF] hover:bg-[#5AD3AF] hover:text-white dark:text-[#5AD3AF] dark:border-[#5AD3AF] dark:hover:bg-[#5AD3AF] dark:hover:text-white"
                                                        >
                                                            <Plus className="h-4 w-4 mr-1" />
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
                                                                        checked={option.isCorrect}
                                                                        onCheckedChange={(
                                                                            checked,
                                                                        ) =>
                                                                            handleIsCorrectChange(
                                                                                index,
                                                                                !!checked,
                                                                            )
                                                                        }
                                                                        className="h-5 w-5 rounded-full border-gray-300 dark:border-gray-600 data-[state=checked]:bg-[#5AD3AF] dark:data-[state=checked]:bg-[#5AD3AF]"
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
                                                                        className="flex-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF]"
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
                                                                        className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                                    >
                                                                        <Trash className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                Language
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
                                                                <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF]">
                                                                    <SelectValue placeholder="Select language" />
                                                                </SelectTrigger>
                                                                <SelectContent className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700">
                                                                    <SelectItem value="javascript">
                                                                        JavaScript
                                                                    </SelectItem>
                                                                    <SelectItem value="python">
                                                                        Python
                                                                    </SelectItem>
                                                                    <SelectItem value="java">
                                                                        Java
                                                                    </SelectItem>
                                                                    <SelectItem value="csharp">
                                                                        C#
                                                                    </SelectItem>
                                                                    <SelectItem value="cpp">
                                                                        C++
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                Expected Output
                                                            </Label>
                                                            <Input
                                                                name="expectedOutput"
                                                                value={
                                                                    currentQuiz.expectedOutput || ''
                                                                }
                                                                onChange={handleQuizInputChange}
                                                                placeholder="Expected output"
                                                                className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF]"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            Starter Code
                                                        </Label>
                                                        <Textarea
                                                            name="starterCode"
                                                            value={currentQuiz.starterCode || ''}
                                                            onChange={handleQuizInputChange}
                                                            placeholder="Enter starter code..."
                                                            className="min-h-[150px] bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF]"
                                                        />
                                                    </div>

                                                    <div className="space-y-3">
                                                        <div className="flex justify-between items-center">
                                                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                Test Cases
                                                            </Label>
                                                            <Button
                                                                onClick={addTestCase}
                                                                size="sm"
                                                                variant="outline"
                                                                className="text-[#5AD3AF] border-[#5AD3AF] hover:bg-[#5AD3AF] hover:text-white dark:text-[#5AD3AF] dark:border-[#5AD3AF] dark:hover:bg-[#5AD3AF] dark:hover:text-white"
                                                            >
                                                                <Plus className="h-4 w-4 mr-1" />
                                                                Add Test Case
                                                            </Button>
                                                        </div>

                                                        {currentQuiz.testCases?.map(
                                                            (testCase, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="grid grid-cols-2 gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                                                >
                                                                    <div className="space-y-1">
                                                                        <Label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                                            Input
                                                                        </Label>
                                                                        <Input
                                                                            name="testCases"
                                                                            value={testCase.input}
                                                                            onChange={(e) =>
                                                                                handleQuizInputChange(
                                                                                    e,
                                                                                    index,
                                                                                    'input',
                                                                                )
                                                                            }
                                                                            placeholder="Input"
                                                                            className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF]"
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <Label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                                            Expected Output
                                                                        </Label>
                                                                        <div className="flex gap-2">
                                                                            <Input
                                                                                name="testCases"
                                                                                value={
                                                                                    testCase.expectedOutput
                                                                                }
                                                                                onChange={(e) =>
                                                                                    handleQuizInputChange(
                                                                                        e,
                                                                                        index,
                                                                                        'expectedOutput',
                                                                                    )
                                                                                }
                                                                                placeholder="Expected Output"
                                                                                className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF]"
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
                                                                                        .length <= 1
                                                                                }
                                                                                className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
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
                                            )}

                                            <div className="flex justify-end gap-3 pt-4">
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        setIsCreateDialogOpen(false);
                                                        resetQuizForm();
                                                    }}
                                                    className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    onClick={handleCreateQuiz}
                                                    className="bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white"
                                                >
                                                    Create Quiz
                                                </Button>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </CardHeader>
                            <CardContent>
                                {quizzes.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12">
                                        <div className="text-center space-y-2">
                                            <Code className="h-8 w-8 mx-auto text-gray-500 dark:text-gray-400" />
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                                No quizzes yet
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Start by creating a new quiz
                                            </p>
                                            <Button
                                                className="mt-4 bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white"
                                                onClick={() => setIsCreateDialogOpen(true)}
                                            >
                                                Create Quiz
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="border rounded-lg overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                                            <thead className="bg-gray-50 dark:bg-gray-700">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                                                    >
                                                        Type
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                                                    >
                                                        Question
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                                                    >
                                                        Details
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                                {quizzes.map((quiz) => (
                                                    <tr
                                                        key={quiz._id}
                                                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                                    >
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <Badge
                                                                className={
                                                                    quiz.type === 'multiple_choice'
                                                                        ? 'bg-[#657ED4] text-white'
                                                                        : 'bg-[#5AD3AF] text-white'
                                                                }
                                                            >
                                                                {quiz.type === 'multiple_choice'
                                                                    ? 'Multiple Choice'
                                                                    : 'Coding'}
                                                            </Badge>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                                            <div className="line-clamp-2">
                                                                {quiz.questionText}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
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
                                                                    className="text-[#5AD3AF] border-[#5AD3AF] hover:bg-[#5AD3AF] hover:text-white dark:text-[#5AD3AF] dark:border-[#5AD3AF] dark:hover:bg-[#5AD3AF] dark:hover:text-white"
                                                                >
                                                                    <Eye className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        openEditDialog(quiz)
                                                                    }
                                                                    className="text-[#5AD3AF] border-[#5AD3AF] hover:bg-[#5AD3AF] hover:text-white dark:text-[#5AD3AF] dark:border-[#5AD3AF] dark:hover:bg-[#5AD3AF] dark:hover:text-white"
                                                                >
                                                                    <Edit className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        openDeleteDialog(quiz._id)
                                                                    }
                                                                    className="text-red-500 border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
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
                            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                Confirm Deletion
                            </DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                            <p className="text-gray-600 dark:text-gray-400">
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
                                className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    if (quizIdToDelete) {
                                        handleDeleteQuiz(quizIdToDelete);
                                    }
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white"
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
                            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                Quiz Details
                            </DialogTitle>
                        </DialogHeader>
                        {selectedQuiz && (
                            <div className="space-y-4 mt-4">
                                <div>
                                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Quiz Type
                                    </Label>
                                    <p className="text-gray-900 dark:text-gray-100">
                                        {selectedQuiz.type === 'multiple_choice'
                                            ? 'Multiple Choice'
                                            : 'Coding'}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Question
                                    </Label>
                                    <p className="text-gray-900 dark:text-gray-100">
                                        {selectedQuiz.questionText}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Explanation
                                    </Label>
                                    <p className="text-gray-900 dark:text-gray-100">
                                        {selectedQuiz.explanation || 'No explanation provided'}
                                    </p>
                                </div>
                                {selectedQuiz.type === 'multiple_choice' && (
                                    <div>
                                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Options
                                        </Label>
                                        <ul className="list-disc pl-4 mt-1">
                                            {selectedQuiz.options?.map((option, index) => (
                                                <li
                                                    key={index}
                                                    className={
                                                        option.isCorrect
                                                            ? 'text-green-600 dark:text-green-400'
                                                            : 'text-gray-900 dark:text-gray-100'
                                                    }
                                                >
                                                    {option.text} {option.isCorrect && '(Correct)'}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {selectedQuiz.type === 'code' && (
                                    <>
                                        <div>
                                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Starter Code
                                            </Label>
                                            <pre className="mt-1 p-2 bg-gray-50 dark:bg-gray-700 rounded text-gray-900 dark:text-gray-100">
                                                {selectedQuiz.starterCode || 'No starter code'}
                                            </pre>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Expected Output
                                            </Label>
                                            <p className="text-gray-900 dark:text-gray-100">
                                                {selectedQuiz.expectedOutput ||
                                                    'No expected output'}
                                            </p>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Language
                                            </Label>
                                            <p className="text-gray-900 dark:text-gray-100">
                                                {selectedQuiz.language || 'No language specified'}
                                            </p>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Test Cases
                                            </Label>
                                            {selectedQuiz.testCases?.length ? (
                                                <ul className="list-disc pl-4 mt-1">
                                                    {selectedQuiz.testCases.map(
                                                        (testCase, index) => (
                                                            <li
                                                                key={index}
                                                                className="text-gray-900 dark:text-gray-100"
                                                            >
                                                                Input: {testCase.input}, Expected
                                                                Output: {testCase.expectedOutput}
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            ) : (
                                                <p className="text-gray-900 dark:text-gray-100">
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
                            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                Edit Quiz
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                            <div>
                                <Label
                                    htmlFor="quizType"
                                    className="text-gray-700 dark:text-gray-300"
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
                                    <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF]">
                                        <SelectValue placeholder="Select quiz type" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700">
                                        <SelectItem value="multiple_choice">
                                            Multiple Choice
                                        </SelectItem>
                                        <SelectItem value="code">Coding</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label
                                    htmlFor="questionText"
                                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Question
                                </Label>
                                <Textarea
                                    id="questionText"
                                    name="questionText"
                                    value={currentQuiz.questionText}
                                    onChange={handleQuizInputChange}
                                    placeholder="Enter quiz question"
                                    className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF]"
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="explanation"
                                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Explanation
                                </Label>
                                <Textarea
                                    id="explanation"
                                    name="explanation"
                                    value={currentQuiz.explanation}
                                    onChange={handleQuizInputChange}
                                    placeholder="Enter explanation"
                                    className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF]"
                                />
                            </div>
                            {quizType === 'multiple_choice' && (
                                <>
                                    {currentQuiz.options?.map((option, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`option-${index}`}
                                                checked={option.isCorrect}
                                                onCheckedChange={(checked) =>
                                                    handleIsCorrectChange(index, !!checked)
                                                }
                                                className="h-5 w-5 rounded-full border-gray-300 dark:border-gray-600 data-[state=checked]:bg-[#5AD3AF] dark:data-[state=checked]:bg-[#5AD3AF]"
                                            />
                                            <Input
                                                name="options"
                                                value={option.text}
                                                onChange={(e) => handleQuizInputChange(e, index)}
                                                placeholder={`Option ${index + 1}`}
                                                className="flex-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF]"
                                            />
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeOption(index)}
                                                disabled={currentQuiz.options!.length <= 2}
                                                className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                            >
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        onClick={addOption}
                                        className="mt-2 bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white"
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
                                            className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Starter Code
                                        </Label>
                                        <Textarea
                                            id="starterCode"
                                            name="starterCode"
                                            value={currentQuiz.starterCode}
                                            onChange={handleQuizInputChange}
                                            placeholder="Enter starter code"
                                            className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF]"
                                        />
                                    </div>
                                    <div>
                                        <Label
                                            htmlFor="expectedOutput"
                                            className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Expected Output
                                        </Label>
                                        <Input
                                            id="expectedOutput"
                                            name="expectedOutput"
                                            value={currentQuiz.expectedOutput}
                                            onChange={handleQuizInputChange}
                                            placeholder="Enter expected output"
                                            className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF]"
                                        />
                                    </div>
                                    <div>
                                        <Label
                                            htmlFor="language"
                                            className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Language
                                        </Label>
                                        <Input
                                            id="language"
                                            name="language"
                                            value={currentQuiz.language}
                                            onChange={handleQuizInputChange}
                                            placeholder="Enter programming language"
                                            className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF]"
                                        />
                                    </div>
                                    {currentQuiz.testCases?.map((testCase, index) => (
                                        <div key={index} className="space-y-2">
                                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Test Case {index + 1}
                                            </Label>
                                            <Input
                                                name="testCases"
                                                value={testCase.input}
                                                onChange={(e) =>
                                                    handleQuizInputChange(e, index, 'input')
                                                }
                                                placeholder="Input"
                                                className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF]"
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
                                                className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#5AD3AF]"
                                            />
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeTestCase(index)}
                                                disabled={currentQuiz.testCases!.length <= 1}
                                                className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                            >
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        onClick={addTestCase}
                                        className="mt-2 bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white"
                                    >
                                        Add Test Case
                                    </Button>
                                </>
                            )}
                            <Button
                                onClick={handleEditQuiz}
                                className="w-full bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white"
                            >
                                Update Quiz
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
