'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
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
import { Loader2, Eye, Edit, Save } from 'lucide-react';
import { viewDetailLesson } from '@/lib/services/lessons/getdetailllesson';
import { UpdateLesson } from '@/lib/services/lessons/updateLessonFeedback';

// Minimal router interface for App Router
interface Router {
    push: (href: string) => void;
    refresh: () => void;
}

interface Lesson {
    _id: string;
    title: string;
    content?: string;
    videoUrl?: string;
    videoKey?: string;
    quiz?: Quiz[];
    status: 'pending' | 'done';
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

interface UpdateLessonData {
    status: 'pending' | 'done';
    note: string;
    mark: 'A+' | 'A' | 'B' | 'C' | 'D';
}

export default function LessonDetail() {
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true);
    const [isUpdateLessonDialogOpen, setIsUpdateLessonDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [updateLessonData, setUpdateLessonData] = useState<UpdateLessonData>({
        status: 'pending',
        note: '',
        mark: 'A+',
    });

    const router = useRouter() as Router;
    const params = useParams();
    const lessonId = params.lessionid as string;
    const courseId = params.courseId as string;

    // Load lesson details
    const loadLessonDetails = async () => {
        try {
            setLoading(true);
            const response = await viewDetailLesson(lessonId);
            setLesson(response.metadata);
            setQuizzes(response.metadata.quiz || []);
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

    useEffect(() => {
        loadLessonDetails();
    }, [lessonId]);

    // Handle update lesson form input changes
    const handleUpdateLessonInputChange = (name: string, value: string) => {
        setUpdateLessonData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateLesson = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }
            if (typeof lessonId !== 'string') {
                throw new Error('Invalid lesson ID format');
            }
            if (!updateLessonData.note.trim()) {
                throw new Error('Please enter a note');
            }

            const res = await UpdateLesson(
                token,
                lessonId,
                updateLessonData.status,
                updateLessonData.mark,
                updateLessonData.note.trim(),
            );
            if (res.status === 200) {
                toast({
                    title: 'Success',
                    description: 'Lesson updated successfully',
                    variant: 'default',
                    className: 'bg-[#5AD3AF] text-black',
                });
                router.refresh();
            }

            setIsUpdateLessonDialogOpen(false);
            resetUpdateLessonForm();
            loadLessonDetails();
        } catch (error) {
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to update lesson',
                variant: 'destructive',
            });
        }
    };

    // Reset update lesson form
    const resetUpdateLessonForm = () => {
        setUpdateLessonData({
            status: 'pending',
            note: '',
            mark: 'A+',
        });
    };

    // Open view dialog with quiz data
    const openViewDialog = (quiz: Quiz) => {
        setSelectedQuiz(quiz);
        setIsViewDialogOpen(true);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-[#5AD3AF]" />
            </div>
        );
    }

    if (!lesson) {
        return (
            <div className="text-center text-gray-600 dark:text-gray-300 p-4">
                Lesson not found.
            </div>
        );
    }

    return (
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {lesson.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                        Lesson #{lesson.order}
                    </p>
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                    <Button
                        onClick={() => router.push(`/qaqc/courses/${courseId}`)}
                        variant="outline"
                        className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                        Back to Lessons
                    </Button>

                    <Dialog
                        open={isUpdateLessonDialogOpen}
                        onOpenChange={setIsUpdateLessonDialogOpen}
                    >
                        <DialogTrigger asChild>
                            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                <Edit className="h-4 w-4 mr-2" />
                                Update Lesson
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow-sm">
                            <DialogHeader>
                                <DialogTitle className="text-xl text-gray-900 dark:text-white">
                                    Update Lesson Status
                                </DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-500 dark:text-gray-200">
                                        Status
                                    </Label>
                                    <Select
                                        value={updateLessonData.status}
                                        onValueChange={(value) =>
                                            handleUpdateLessonInputChange('status', value)
                                        }
                                    >
                                        <SelectTrigger className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700">
                                            <SelectItem
                                                value="pending"
                                                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                Pending
                                            </SelectItem>
                                            <SelectItem
                                                value="done"
                                                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                Done
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-500 dark:text-gray-200">
                                        Mark
                                    </Label>
                                    <Select
                                        value={updateLessonData.mark}
                                        onValueChange={(value) =>
                                            handleUpdateLessonInputChange('mark', value)
                                        }
                                    >
                                        <SelectTrigger className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600">
                                            <SelectValue placeholder="Select mark" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700">
                                            {['A+', 'A', 'B', 'C', 'D'].map((mark) => (
                                                <SelectItem
                                                    key={mark}
                                                    value={mark}
                                                    className="hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
                                                >
                                                    {mark}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-500 dark:text-gray-200">
                                        Notes
                                    </Label>
                                    <Textarea
                                        value={updateLessonData.note}
                                        onChange={(e) =>
                                            handleUpdateLessonInputChange('note', e.target.value)
                                        }
                                        placeholder="Add your notes here..."
                                        className="min-h-[100px] bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                                    />
                                </div>

                                <Button
                                    onClick={handleUpdateLesson}
                                    className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Changes
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Lesson Content Section */}
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Lesson Content
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <Label className="text-sm font-medium text-gray-500 dark:text-gray-200">
                            Content
                        </Label>
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            {lesson.content || (
                                <p className="text-gray-400 dark:text-gray-300 italic">
                                    No content provided
                                </p>
                            )}
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            {lesson.status === 'done' ? (
                                <p className="text-green-500 dark:text-green-400 font-medium">
                                    Lesson is completed
                                </p>
                            ) : (
                                <p className="text-red-500 dark:text-red-400 font-medium">
                                    Lesson is pending
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-sm font-medium text-gray-500 dark:text-gray-200">
                            Video
                        </Label>
                        {lesson.videoUrl ? (
                            <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
                                <DialogTrigger asChild>
                                    <div className="relative group cursor-pointer">
                                        <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="rounded-full bg-white/90 hover:bg-white text-indigo-600 dark:text-indigo-400"
                                            >
                                                <Eye className="h-5 w-5" />
                                            </Button>
                                        </div>
                                        <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                            <span className="text-gray-500 dark:text-gray-300">
                                                Video Preview
                                            </span>
                                        </div>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
                                    <div className="relative aspect-video">
                                        <video
                                            className="w-full h-full rounded-lg"
                                            src={lesson.videoUrl}
                                            controls
                                            autoPlay
                                            onError={(e) => {
                                                console.error('Video error:', e);
                                                toast({
                                                    title: 'Error',
                                                    description: 'Failed to load video',
                                                    variant: 'destructive',
                                                });
                                            }}
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        ) : (
                            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                                <p className="text-gray-400 dark:text-gray-300 italic">
                                    No video available
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quizzes Section */}
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Lesson Quizzes
                    </h3>
                </div>

                {quizzes.length > 0 ? (
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader className="bg-gray-50 dark:bg-gray-800">
                                <TableRow>
                                    <TableHead className="w-[120px] text-gray-700 dark:text-gray-200">
                                        Type Type
                                    </TableHead>
                                    <TableHead className="text-gray-700 dark:text-gray-200">
                                        Question
                                    </TableHead>
                                    <TableHead className="text-gray-700 dark:text-gray-200">
                                        Details
                                    </TableHead>
                                    <TableHead className="text-right text-gray-700 dark:text-gray-200">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {quizzes.map((quiz) => (
                                    <TableRow
                                        key={quiz._id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        <TableCell>
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    quiz.type === 'multiple_choice'
                                                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                }`}
                                            >
                                                {quiz.type === 'multiple_choice'
                                                    ? 'Multiple Choice'
                                                    : 'Coding'}
                                            </span>
                                        </TableCell>
                                        <TableCell className="font-medium max-w-[200px] truncate text-gray-900 dark:text-white">
                                            {quiz.questionText}
                                        </TableCell>
                                        <TableCell>
                                            {quiz.type === 'multiple_choice' ? (
                                                <div className="flex items-center gap-1">
                                                    <span className="text-sm text-gray-500 dark:text-gray-300">
                                                        {
                                                            quiz.options?.filter((o) => o.isCorrect)
                                                                .length
                                                        }{' '}
                                                        correct option(s)
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md">
                                                        {quiz.language}
                                                    </span>
                                                    <span className="text-sm text-gray-500 dark:text-gray-300">
                                                        {quiz.testCases?.length} test case(s)
                                                    </span>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openViewDialog(quiz)}
                                                className="text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/20"
                                            >
                                                <Eye className="h-4 w-4 mr-1" />
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="p-8 text-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-300">
                            No quizzes available for this lesson
                        </p>
                    </div>
                )}
            </div>

            {/* Quiz Detail Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow-sm">
                    <DialogHeader>
                        <DialogTitle className="text-xl text-gray-900 dark:text-white">
                            Quiz Details
                        </DialogTitle>
                    </DialogHeader>
                    {selectedQuiz && (
                        <div className="space-y-6 py-2">
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-500 dark:text-gray-200">
                                    Question
                                </Label>
                                <p className="text-gray-900 dark:text-white font-medium">
                                    {selectedQuiz.questionText}
                                </p>
                            </div>

                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-500 dark:text-gray-200">
                                    Explanation
                                </Label>
                                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                                    <p className="text-gray-700 dark:text-gray-200">
                                        {selectedQuiz.explanation || 'No explanation provided'}
                                    </p>
                                </div>
                            </div>

                            {selectedQuiz.type === 'multiple_choice' ? (
                                <div className="space-y-3">
                                    <Label className="text-sm font-medium text-gray-500 dark:text-gray-200">
                                        Options
                                    </Label>
                                    <div className="space-y-2">
                                        {selectedQuiz.options?.map((option, index) => (
                                            <div
                                                key={index}
                                                className={`p-3 rounded-md border ${
                                                    option.isCorrect
                                                        ? 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20'
                                                        : 'border-gray-200 dark:border-gray-700'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                                                            option.isCorrect
                                                                ? 'border-green-500 bg-green-500 dark:border-green-400 dark:bg-green-400 text-white'
                                                                : 'border-gray-300 dark:border-gray-600'
                                                        }`}
                                                    >
                                                        {option.isCorrect && (
                                                            <svg
                                                                className="h-3 w-3"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M5 13l4 4L19 7"
                                                                />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-800 dark:text-gray-200">
                                                        {option.text}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <Label className="text-sm font-medium text-gray-500 dark:text-gray-200">
                                                Language
                                            </Label>
                                            <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                                                <p className="text-gray-800 dark:text-gray-200">
                                                    {selectedQuiz.language || 'Not specified'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <Label className="text-sm font-medium text-gray-500 dark:text-gray-200">
                                                Expected Output
                                            </Label>
                                            <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                                                <p className="text-gray-800 dark:text-gray-200">
                                                    {selectedQuiz.expectedOutput || 'Not specified'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <Label className="text-sm font-medium text-gray-500 dark:text-gray-200">
                                            Starter Code
                                        </Label>
                                        <pre className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md text-sm font-mono text-gray-800 dark:text-gray-200 overflow-x-auto">
                                            {selectedQuiz.starterCode || 'No starter code provided'}
                                        </pre>
                                    </div>

                                    <div className="space-y-1">
                                        <Label className="text-sm font-medium text-gray-500 dark:text-gray-200">
                                            Test Cases ({selectedQuiz.testCases?.length || 0})
                                        </Label>
                                        {selectedQuiz.testCases?.length ? (
                                            <div className="space-y-2">
                                                {selectedQuiz.testCases.map((testCase, index) => (
                                                    <div
                                                        key={index}
                                                        className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
                                                    >
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div>
                                                                <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                                                                    Input
                                                                </p>
                                                                <p className="text-sm font-mono text-gray-800 dark:text-gray-200">
                                                                    {testCase.input}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                                                                    Expected Output
                                                                </p>
                                                                <p className="text-sm font-mono text-gray-800 dark:text-gray-200">
                                                                    {testCase.expectedOutput}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                                No test cases provided
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
