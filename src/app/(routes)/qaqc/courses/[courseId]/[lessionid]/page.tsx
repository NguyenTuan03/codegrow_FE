'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Eye, Edit, Save, CheckCircle } from 'lucide-react';
import { viewDetailLesson } from '@/lib/services/lessons/getdetailllesson';
import { UpdateLesson } from '@/lib/services/lessons/updateLessonFeedback';

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

    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [updateLessonData, setUpdateLessonData] = useState<UpdateLessonData>({
        status: 'pending',
        note: '',
        mark: 'A+',
    });

    const router = useRouter() as Router;
    const params = useParams();
    const lessonId = params.lessionid as string; // Note: Should be fixed to lessonId
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

    const resetUpdateLessonForm = () => {
        setUpdateLessonData({
            status: 'pending',
            note: '',
            mark: 'A+',
        });
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
                {/* Header Section */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                    <CardHeader className="p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                    {lesson.title}
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    Lesson #{lesson.order} •{' '}
                                    <Badge
                                        className={
                                            lesson.status === 'done'
                                                ? 'bg-[#5AD3AF] text-white'
                                                : 'bg-red-500 text-white'
                                        }
                                    >
                                        {lesson.status === 'done' ? 'Completed' : 'Pending'}
                                    </Badge>
                                </p>
                            </div>
                            <div className="flex gap-3 w-full sm:w-auto">
                                <Button
                                    onClick={() => router.push(`/qaqc/courses/${courseId}`)}
                                    variant="outline"
                                    className="w-full sm:w-auto text-[#5AD3AF] border-[#5AD3AF] hover:bg-[#5AD3AF] hover:text-white dark:text-[#5AD3AF] dark:border-[#5AD3AF] dark:hover:bg-[#5AD3AF] dark:hover:text-white"
                                >
                                    Back to Lessons
                                </Button>
                                <Dialog
                                    open={isUpdateLessonDialogOpen}
                                    onOpenChange={setIsUpdateLessonDialogOpen}
                                >
                                    <DialogTrigger asChild>
                                        <Button className="w-full sm:w-auto bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white">
                                            <Edit className="h-4 w-4 mr-2" />
                                            Update Lesson
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
                                        <DialogHeader>
                                            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                                Update Lesson Status
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-6 py-4">
                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Status
                                                </Label>
                                                <Select
                                                    value={updateLessonData.status}
                                                    onValueChange={(value) =>
                                                        handleUpdateLessonInputChange(
                                                            'status',
                                                            value,
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-[#5AD3AF]">
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700">
                                                        <SelectItem value="pending">
                                                            Pending
                                                        </SelectItem>
                                                        <SelectItem value="done">Done</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Mark
                                                </Label>
                                                <Select
                                                    value={updateLessonData.mark}
                                                    onValueChange={(value) =>
                                                        handleUpdateLessonInputChange('mark', value)
                                                    }
                                                >
                                                    <SelectTrigger className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-[#5AD3AF]">
                                                        <SelectValue placeholder="Select mark" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700">
                                                        {['A+', 'A', 'B', 'C', 'D'].map((mark) => (
                                                            <SelectItem key={mark} value={mark}>
                                                                {mark}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Notes
                                                </Label>
                                                <Textarea
                                                    value={updateLessonData.note}
                                                    onChange={(e) =>
                                                        handleUpdateLessonInputChange(
                                                            'note',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Add your notes here..."
                                                    className="min-h-[100px] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-[#5AD3AF]"
                                                />
                                            </div>
                                            <Button
                                                onClick={handleUpdateLesson}
                                                className="w-full bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white"
                                            >
                                                <Save className="h-4 w-4 mr-2" />
                                                Save Changes
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                {/* Lesson Content Section */}
                <Card className="bg-white dark:bg-gray-800 border  border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                    <CardHeader className="p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-[#5AD3AF] rounded-full" />
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                Lesson Content
                            </h3>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Content
                                </Label>
                                <Card className="p-4 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                                    <p className="text-gray-800 dark:text-gray-200 line-clamp-4">
                                        {lesson.content || (
                                            <span className="italic text-gray-500 dark:text-gray-400">
                                                No content provided
                                            </span>
                                        )}
                                    </p>
                                </Card>
                                <Card className="p-4 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            className={
                                                lesson.status === 'done'
                                                    ? 'bg-[#5AD3AF] text-white'
                                                    : 'bg-red-500 text-white'
                                            }
                                        >
                                            {lesson.status === 'done' ? 'Completed' : 'Pending'}
                                        </Badge>
                                    </div>
                                </Card>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Video
                                </Label>
                                {lesson.videoUrl ? (
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
                                ) : (
                                    <Card className="p-4 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-center">
                                        <p className="text-gray-500 dark:text-gray-400 italic">
                                            No video available
                                        </p>
                                    </Card>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quizzes Section */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                    <CardHeader className="p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-[#5AD3AF] rounded-full" />
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                Lesson Quizzes
                            </h3>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                        {quizzes.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {quizzes.map((quiz) => (
                                    <Card
                                        key={quiz._id}
                                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl"
                                    >
                                        <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-600">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                                                    {quiz.questionText}
                                                </h4>
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
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-4 space-y-2">
                                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                                {quiz.explanation || 'No explanation provided'}
                                            </p>
                                            {quiz.type === 'multiple_choice' ? (
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    <span>
                                                        {
                                                            quiz.options?.filter((o) => o.isCorrect)
                                                                .length
                                                        }{' '}
                                                        correct option(s)
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                    <span>{quiz.language || 'N/A'}</span>
                                                    <span>
                                                        • {quiz.testCases?.length || 0} test case(s)
                                                    </span>
                                                </div>
                                            )}
                                        </CardContent>
                                        <div className="p-4">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full text-[#5AD3AF] border-[#5AD3AF] hover:bg-[#5AD3AF] hover:text-white dark:text-[#5AD3AF] dark:border-[#5AD3AF] dark:hover:bg-[#5AD3AF] dark:hover:text-white"
                                                onClick={() => openViewDialog(quiz)}
                                            >
                                                <Eye className="h-4 w-4 mr-2" />
                                                View Details
                                            </Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-lg">
                                <p className="text-gray-500 dark:text-gray-400">
                                    No quizzes available for this lesson
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Quiz Detail Dialog */}
                <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                    <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                Quiz Details
                            </DialogTitle>
                        </DialogHeader>
                        {selectedQuiz && (
                            <div className="space-y-6 py-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Question
                                    </Label>
                                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                                        {selectedQuiz.questionText}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Explanation
                                    </Label>
                                    <Card className="p-4 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                                        <p className="text-gray-800 dark:text-gray-200">
                                            {selectedQuiz.explanation || 'No explanation provided'}
                                        </p>
                                    </Card>
                                </div>
                                {selectedQuiz.type === 'multiple_choice' ? (
                                    <div className="space-y-3">
                                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Options
                                        </Label>
                                        <div className="space-y-2">
                                            {selectedQuiz.options?.map((option, index) => (
                                                <Card
                                                    key={index}
                                                    className={`p-3 border ${
                                                        option.isCorrect
                                                            ? 'border-[#5AD3AF] bg-[#5AD3AF]/10'
                                                            : 'border-gray-200 dark:border-gray-600'
                                                    } rounded-lg`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                                                                option.isCorrect
                                                                    ? 'border-[#5AD3AF] bg-[#5AD3AF] text-white'
                                                                    : 'border-gray-300 dark:border-gray-600'
                                                            }`}
                                                        >
                                                            {option.isCorrect && (
                                                                <CheckCircle className="h-3 w-3" />
                                                            )}
                                                        </div>
                                                        <p className="text-gray-800 dark:text-gray-200">
                                                            {option.text}
                                                        </p>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Language
                                                </Label>
                                                <Card className="p-3 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                                                    <p className="text-gray-800 dark:text-gray-200">
                                                        {selectedQuiz.language || 'Not specified'}
                                                    </p>
                                                </Card>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Expected Output
                                                </Label>
                                                <Card className="p-3 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                                                    <p className="text-gray-800 dark:text-gray-200">
                                                        {selectedQuiz.expectedOutput ||
                                                            'Not specified'}
                                                    </p>
                                                </Card>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Starter Code
                                            </Label>
                                            <Card className="p-4 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                                                <pre className="text-sm font-mono text-gray-800 dark:text-gray-200 overflow-x-auto">
                                                    {selectedQuiz.starterCode ||
                                                        'No starter code provided'}
                                                </pre>
                                            </Card>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Test Cases ({selectedQuiz.testCases?.length || 0})
                                            </Label>
                                            {selectedQuiz.testCases?.length ? (
                                                <div className="space-y-2">
                                                    {selectedQuiz.testCases.map(
                                                        (testCase, index) => (
                                                            <Card
                                                                key={index}
                                                                className="p-4 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-lg"
                                                            >
                                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                    <div>
                                                                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                                                            Input
                                                                        </p>
                                                                        <p className="text-sm font-mono text-gray-800 dark:text-gray-200">
                                                                            {testCase.input}
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                                                            Expected Output
                                                                        </p>
                                                                        <p className="text-sm font-mono text-gray-800 dark:text-gray-200">
                                                                            {
                                                                                testCase.expectedOutput
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </Card>
                                                        ),
                                                    )}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
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
        </div>
    );
}
