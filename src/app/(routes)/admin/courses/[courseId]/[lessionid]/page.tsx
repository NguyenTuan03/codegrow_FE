'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Loader2, Edit, Trash, Plus, Eye, ListChecks, Code } from 'lucide-react';
import { viewDetailLesson } from '@/lib/services/lessons/getdetailllesson';
import { CreateQuiz } from '@/lib/services/quizs/createquiz';
import { UpdateQuiz } from '@/lib/services/quizs/updatequiz';
import { DeleteQuiz } from '@/lib/services/quizs/deletequiz';
import { GetQuiz } from '@/lib/services/quizs/getquiz';

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

    // Load lesson details (without quizzes)
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

    // Load all quizzes for the lesson
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

    // Load lesson and quizzes on mount
    useEffect(() => {
        const fetchData = async () => {
            await loadLessonDetails();
            await loadAllQuiz();
        };
        fetchData();
    }, [lessonId]);

    // Log quizzes after state updates
    useEffect(() => {
        console.log('Quizzes updated:', quizzes);
    }, [quizzes]);

    // Handle quiz form input changes
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

    // Handle checkbox change for isCorrect
    const handleIsCorrectChange = (index: number, checked: boolean) => {
        setCurrentQuiz((prev) => ({
            ...prev,
            options: prev.options?.map((opt, i) =>
                i === index ? { ...opt, isCorrect: checked } : { ...opt, isCorrect: false },
            ),
        }));
    };

    // Add option or test case
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

    // Remove option or test case
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

    // Handle create quiz
    const handleCreateQuiz = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            // Validation
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
                await loadAllQuiz(); // Refresh quizzes
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

    // Handle edit quiz
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
            await loadAllQuiz(); // Refresh quizzes
        } catch (error) {
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to update quiz',
                variant: 'destructive',
            });
        }
    };
    // Mở dialog xác nhận xóa
    const openDeleteDialog = (quizId: string) => {
        setQuizIdToDelete(quizId);
        setIsDeleteDialogOpen(true);
    };
    // Handle delete quiz
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

                router.refresh(); // Refresh the page to reflect changes
                // Làm mới danh sách quiz sau khi xóa
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

    // Reset quiz form
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

    // Open edit dialog with quiz data
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
            <div className="text-center text-gray-600 dark:text-gray-400 p-4">
                Lesson not found.
            </div>
        );
    }

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[#657ED4] dark:text-[#5AD3AF]">
                    Lesson Details
                </h2>
            </div>

            {/* Lesson Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                    <Label className="text-gray-700 dark:text-gray-300">Title</Label>
                    <p className="mt-1 text-gray-900 dark:text-gray-100">{lesson.title}</p>
                </div>
                <div>
                    <Label className="text-gray-700 dark:text-gray-300">Order</Label>
                    <p className="mt-1 text-gray-900 dark:text-gray-100">{lesson.order}</p>
                </div>
                <div>
                    <Label className="text-gray-700 dark:text-gray-300">Content</Label>
                    <p className="mt-1 text-gray-900 dark:text-gray-100">
                        {lesson.content || 'No content'}
                    </p>
                </div>
                <div>
                    <Label className="text-gray-700 dark:text-gray-300">Video</Label>
                    {lesson.videoUrl ? (
                        <a
                            href={lesson.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 text-blue-600 hover:underline"
                        >
                            View Video
                        </a>
                    ) : (
                        <p className="mt-1 text-gray-900 dark:text-gray-100">No video</p>
                    )}
                </div>
            </div>

            {/* Quiz Section */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-[#657ED4] dark:text-[#5AD3AF]">
                    Quizzes
                </h3>

                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-800 dark:hover:bg-indigo-900">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Quiz
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl rounded-lg bg-white dark:bg-gray-900">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold text-gray-800 dark:text-white">
                                Create New Quiz
                            </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-6 py-4">
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <button
                                    onClick={() => setQuizType('multiple_choice')}
                                    className={`flex items-center justify-center p-4 rounded-lg border transition-all ${
                                        quizType === 'multiple_choice'
                                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-200 shadow-sm'
                                            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    <ListChecks className="h-5 w-5 mr-2" />
                                    Multiple Choice
                                </button>
                                <button
                                    onClick={() => setQuizType('code')}
                                    className={`flex items-center justify-center p-4 rounded-lg border transition-all ${
                                        quizType === 'code'
                                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-200 shadow-sm'
                                            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
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
                                    className="min-h-[100px] bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-gray-800 dark:text-gray-200"
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
                                    className="min-h-[80px] bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-gray-800 dark:text-gray-200"
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
                                            className="text-indigo-600 dark:text-indigo-400"
                                        >
                                            <Plus className="h-4 w-4 mr-1" />
                                            Add Option
                                        </Button>
                                    </div>

                                    <div className="space-y-3">
                                        {currentQuiz.options?.map((option, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <Checkbox
                                                    id={`option-${index}`}
                                                    checked={option.isCorrect}
                                                    onCheckedChange={(checked) =>
                                                        handleIsCorrectChange(index, !!checked)
                                                    }
                                                    className="h-5 w-5 rounded-full data-[state=checked]:bg-indigo-600 dark:data-[state=checked]:bg-indigo-500"
                                                />
                                                <Input
                                                    name="options"
                                                    value={option.text}
                                                    onChange={(e) =>
                                                        handleQuizInputChange(e, index)
                                                    }
                                                    placeholder={`Option ${index + 1}`}
                                                    className="flex-1 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-gray-800 dark:text-gray-200"
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
                                                <SelectTrigger className="bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                                                    <SelectValue placeholder="Select language" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-gray-50 dark:bg-gray-800">
                                                    <SelectItem value="javascript">
                                                        JavaScript
                                                    </SelectItem>
                                                    <SelectItem value="python">Python</SelectItem>
                                                    <SelectItem value="java">Java</SelectItem>
                                                    <SelectItem value="csharp">C#</SelectItem>
                                                    <SelectItem value="cpp">C++</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Expected Output
                                            </Label>
                                            <Input
                                                name="expectedOutput"
                                                value={currentQuiz.expectedOutput || ''}
                                                onChange={handleQuizInputChange}
                                                placeholder="Expected output"
                                                className="bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-gray-800 dark:text-gray-200"
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
                                            className="min-h-[150px] bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-gray-800 dark:text-gray-200"
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
                                                className="text-indigo-600 dark:text-indigo-400"
                                            >
                                                <Plus className="h-4 w-4 mr-1" />
                                                Add Test Case
                                            </Button>
                                        </div>

                                        {currentQuiz.testCases?.map((testCase, index) => (
                                            <div
                                                key={index}
                                                className="grid grid-cols-2 gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                                            >
                                                <div className="space-y-1">
                                                    <Label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                        Input
                                                    </Label>
                                                    <Input
                                                        name="testCases"
                                                        value={testCase.input}
                                                        onChange={(e) =>
                                                            handleQuizInputChange(e, index, 'input')
                                                        }
                                                        placeholder="Input"
                                                        className="bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-gray-800 dark:text-gray-200"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                        Expected Output
                                                    </Label>
                                                    <div className="flex gap-2">
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
                                                            className="bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-gray-800 dark:text-gray-200"
                                                        />
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => removeTestCase(index)}
                                                            disabled={
                                                                currentQuiz.testCases!.length <= 1
                                                            }
                                                            className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                        >
                                                            <Trash className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
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
                                    className="text-gray-800 dark:text-gray-200"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleCreateQuiz}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-800 dark:hover:bg-indigo-900"
                                >
                                    Create Quiz
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Quiz Table */}
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Question</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead>Explanation</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {quizzes.length > 0 ? (
                            quizzes.map((quiz) => (
                                <TableRow key={quiz._id}>
                                    <TableCell>
                                        {quiz.type === 'multiple_choice'
                                            ? 'Multiple Choice'
                                            : 'code'}
                                    </TableCell>
                                    <TableCell>{quiz.questionText}</TableCell>
                                    <TableCell>
                                        {quiz.type === 'multiple_choice' ? (
                                            <ul className="list-disc pl-4">
                                                {quiz.options?.map((option, index) => (
                                                    <li
                                                        key={index}
                                                        className={
                                                            option.isCorrect ? 'text-green-600' : ''
                                                        }
                                                    >
                                                        {option.text}{' '}
                                                        {option.isCorrect && '(Correct)'}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div>
                                                <p>
                                                    <strong>Language:</strong> {quiz.language}
                                                </p>
                                                <p>
                                                    <strong>Starter Code:</strong>{' '}
                                                    {quiz.starterCode?.substring(0, 50)}...
                                                </p>
                                                <p>
                                                    <strong>Test Cases:</strong>{' '}
                                                    {quiz.testCases?.length}
                                                </p>
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>{quiz.explanation}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openViewDialog(quiz)}
                                                className="text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                            >
                                                <Eye className="h-4 w-4 mr-1" />
                                                View
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openEditDialog(quiz)}
                                                className="text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                            >
                                                <Edit className="h-4 w-4 mr-1" />
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openDeleteDialog(quiz._id)}
                                                className="text-red-600 border-red-300 dark:border-red-600 dark:text-red-400"
                                            >
                                                <Trash className="h-4 w-4 mr-1" />
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    No quizzes available.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="max-w-sm bg-white dark:bg-gray-900">
                    <DialogHeader>
                        <DialogTitle className="text-gray-900 dark:text-white">
                            Confirm Deletion
                        </DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-gray-700 dark:text-gray-300">
                            Are you sure you want to delete this quiz? This action cannot be undone.
                        </p>
                    </div>
                    <div className="flex justify-end gap-3">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsDeleteDialogOpen(false);
                                setQuizIdToDelete(null);
                            }}
                            className="text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                if (quizIdToDelete) {
                                    handleDeleteQuiz(quizIdToDelete);
                                }
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-500 dark:hover:bg-red-600"
                        >
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* View Quiz Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="max-w-lg bg-white dark:bg-gray-900">
                    <DialogHeader>
                        <DialogTitle className="text-gray-900 dark:text-white">
                            Quiz Details
                        </DialogTitle>
                    </DialogHeader>
                    {selectedQuiz && (
                        <div className="space-y-4 mt-4">
                            <div>
                                <Label className="text-gray-700 dark:text-gray-300">
                                    Quiz Type
                                </Label>
                                <p className="mt-1 text-gray-900 dark:text-gray-100">
                                    {selectedQuiz.type === 'multiple_choice'
                                        ? 'Multiple Choice'
                                        : 'code'}
                                </p>
                            </div>
                            <div>
                                <Label className="text-gray-700 dark:text-gray-300">Question</Label>
                                <p className="mt-1 text-gray-900 dark:text-gray-100">
                                    {selectedQuiz.questionText}
                                </p>
                            </div>
                            <div>
                                <Label className="text-gray-700 dark:text-gray-300">
                                    Explanation
                                </Label>
                                <p className="mt-1 text-gray-900 dark:text-gray-100">
                                    {selectedQuiz.explanation || 'No explanation provided'}
                                </p>
                            </div>
                            {selectedQuiz.type === 'multiple_choice' && (
                                <div>
                                    <Label className="text-gray-700 dark:text-gray-300">
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
                                        <Label className="text-gray-700 dark:text-gray-300">
                                            Starter Code
                                        </Label>
                                        <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded text-gray-900 dark:text-gray-100">
                                            {selectedQuiz.starterCode || 'No starter code'}
                                        </pre>
                                    </div>
                                    <div>
                                        <Label className="text-gray-700 dark:text-gray-300">
                                            Expected Output
                                        </Label>
                                        <p className="mt-1 text-gray-900 dark:text-gray-100">
                                            {selectedQuiz.expectedOutput || 'No expected output'}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-700 dark:text-gray-300">
                                            Language
                                        </Label>
                                        <p className="mt-1 text-gray-900 dark:text-gray-100">
                                            {selectedQuiz.language || 'No language specified'}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-700 dark:text-gray-300">
                                            Test Cases
                                        </Label>
                                        {selectedQuiz.testCases?.length ? (
                                            <ul className="list-disc pl-4 mt-1">
                                                {selectedQuiz.testCases.map((testCase, index) => (
                                                    <li
                                                        key={index}
                                                        className="text-gray-900 dark:text-gray-100"
                                                    >
                                                        Input: {testCase.input}, Expected Output:{' '}
                                                        {testCase.expectedOutput}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="mt-1 text-gray-900 dark:text-gray-100">
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
                <DialogContent className="max-w-lg bg-white dark:bg-gray-900">
                    <DialogHeader>
                        <DialogTitle className="text-gray-900 dark:text-white">
                            Edit Quiz
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                        <div>
                            <Label htmlFor="quizType" className="text-gray-700 dark:text-gray-300">
                                Quiz Type
                            </Label>
                            <Select
                                name="quizType"
                                value={quizType}
                                onValueChange={(value) =>
                                    setQuizType(value as 'multiple_choice' | 'code')
                                }
                            >
                                <SelectTrigger
                                    id="quizType"
                                    className="w-full bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                                >
                                    <SelectValue placeholder="Select quiz type" />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-gray-800 dark:border-gray-700">
                                    <SelectItem
                                        value="multiple_choice"
                                        className="text-gray-900 dark:text-gray-100"
                                    >
                                        Multiple Choice
                                    </SelectItem>
                                    <SelectItem
                                        value="code"
                                        className="text-gray-900 dark:text-gray-100"
                                    >
                                        Code
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label
                                htmlFor="questionText"
                                className="text-gray-700 dark:text-gray-300"
                            >
                                Question
                            </Label>
                            <Textarea
                                id="questionText"
                                name="questionText"
                                value={currentQuiz.questionText}
                                onChange={handleQuizInputChange}
                                placeholder="Enter quiz question"
                                className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <Label
                                htmlFor="explanation"
                                className="text-gray-700 dark:text-gray-300"
                            >
                                Explanation
                            </Label>
                            <Textarea
                                id="explanation"
                                name="explanation"
                                value={currentQuiz.explanation}
                                onChange={handleQuizInputChange}
                                placeholder="Enter explanation"
                                className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
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
                                            className="border-gray-300 dark:border-gray-600 data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500"
                                        />
                                        <Input
                                            name="options"
                                            value={option.text}
                                            onChange={(e) => handleQuizInputChange(e, index)}
                                            placeholder={`Option ${index + 1}`}
                                            className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                                        />
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeOption(index)}
                                            disabled={currentQuiz.options!.length <= 2}
                                            className="text-red-600 dark:text-red-400 border-red-300 dark:border-red-600"
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    onClick={addOption}
                                    className="mt-2 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600"
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
                                        className="text-gray-700 dark:text-gray-300"
                                    >
                                        Starter Code
                                    </Label>
                                    <Textarea
                                        id="starterCode"
                                        name="starterCode"
                                        value={currentQuiz.starterCode}
                                        onChange={handleQuizInputChange}
                                        placeholder="Enter starter code"
                                        className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor="expectedOutput"
                                        className="text-gray-700 dark:text-gray-300"
                                    >
                                        Expected Output
                                    </Label>
                                    <Input
                                        id="expectedOutput"
                                        name="expectedOutput"
                                        value={currentQuiz.expectedOutput}
                                        onChange={handleQuizInputChange}
                                        placeholder="Enter expected output"
                                        className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor="language"
                                        className="text-gray-700 dark:text-gray-300"
                                    >
                                        Language
                                    </Label>
                                    <Input
                                        id="language"
                                        name="language"
                                        value={currentQuiz.language}
                                        onChange={handleQuizInputChange}
                                        placeholder="Enter programming language"
                                        className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                                    />
                                </div>
                                {currentQuiz.testCases?.map((testCase, index) => (
                                    <div key={index} className="space-y-2">
                                        <Label className="text-gray-700 dark:text-gray-300">
                                            Test Case {index + 1}
                                        </Label>
                                        <Input
                                            name="testCases"
                                            value={testCase.input}
                                            onChange={(e) =>
                                                handleQuizInputChange(e, index, 'input')
                                            }
                                            placeholder="Input"
                                            className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                                        />
                                        <Input
                                            name="testCases"
                                            value={testCase.expectedOutput}
                                            onChange={(e) =>
                                                handleQuizInputChange(e, index, 'expectedOutput')
                                            }
                                            placeholder="Expected Output"
                                            className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                                        />
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeTestCase(index)}
                                            disabled={currentQuiz.testCases!.length <= 1}
                                            className="text-red-600 dark:text-red-400 border-red-300 dark:border-red-600"
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    onClick={addTestCase}
                                    className="mt-2 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600"
                                >
                                    Add Test Case
                                </Button>
                            </>
                        )}
                        <Button
                            onClick={handleEditQuiz}
                            className="w-full bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600"
                        >
                            Update Quiz
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Back Button */}
            <Button
                onClick={() => router.push(`/admin/courses/${courseId}`)}
                className="mt-6 bg-gray-600 text-white hover:bg-gray-700"
            >
                Back to Lessons
            </Button>
        </div>
    );
}
