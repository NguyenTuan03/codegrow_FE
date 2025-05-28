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
import { Loader2, Eye, Edit, Save, CheckCircle, ArrowLeft } from 'lucide-react';
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
    const lessonId = params.lessionid as string; // Fixed typo: lessionid to lessonId
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

    const loadLessonDetails = async () => {
        try {
            setLoading(true);
            const response = await viewDetailLesson(lessonId);
            console.log('respones', response);
            setLesson(response.metadata);
            setQuizzes(response.metadata.quiz || []);
        } catch (error) {
            toast({
                title: 'Error',
                description:
                    error instanceof Error ? error.message : 'Failed to load lesson details',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
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
                    className:
                        'bg-[#657ED4] dark:bg-[#5AD3AF] text-white dark:text-black font-semibold',
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
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
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
                <Loader2 className="h-8 w-8 animate-spin text-[#657ED4] dark:text-[#5AD3AF]" />
            </div>
        );
    }

    if (!lesson) {
        return (
            <div className="text-center py-12 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 font-medium">
                <p className="text-lg text-gray-600 dark:text-gray-400">Lesson not found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
                <CardHeader className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h2 className="text-4xl font-bold text-[#657ED4] dark:text-[#5AD3AF]">
                                {lesson.title}
                            </h2>
                            <div className="flex items-center gap-3 mt-2">
                                <Badge className="bg-[#657ED4] dark:bg-[#5AD3AF] text-white px-3 py-1 text-base rounded-md shadow-sm font-medium">
                                    Lesson #{lesson.order}
                                </Badge>
                                <Badge
                                    className={
                                        lesson.status === 'done'
                                            ? 'bg-[#657ED4] dark:bg-[#5AD3AF] text-white text-base font-medium'
                                            : 'bg-gray-500 dark:bg-gray-600 text-white font-medium'
                                    }
                                >
                                    {lesson.status === 'done' ? 'Completed' : 'Pending'}
                                </Badge>
                            </div>
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <Button
                                onClick={() => router.push(`/qaqc/courses/${courseId}`)}
                                variant="outline"
                                className="w-full sm:w-auto text-[#657ED4] dark:text-[#5AD3AF] border-[#657ED4] dark:border-[#5AD3AF] hover:bg-[#657ED4] hover:text-white dark:hover:bg-[#5AD3AF] dark:hover:text-black rounded-lg font-medium transition-all duration-200 shadow-md"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Lessons
                            </Button>
                            <Dialog
                                open={isUpdateLessonDialogOpen}
                                onOpenChange={setIsUpdateLessonDialogOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button className="w-full sm:w-auto bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] text-white rounded-lg font-medium transition-all duration-200 shadow-md">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Update Lesson
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
                                    <DialogHeader>
                                        <DialogTitle className="text-xl font-semibold text-[#657ED4] dark:text-[#5AD3AF]">
                                            Update Lesson Status
                                        </DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-6 py-4">
                                        <div className="space-y-2">
                                            <Label className="text-base font-semibold text-gray-700 dark:text-gray-200">
                                                Status
                                            </Label>
                                            <Select
                                                value={updateLessonData.status}
                                                onValueChange={(value) =>
                                                    handleUpdateLessonInputChange('status', value)
                                                }
                                            >
                                                <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] rounded-lg transition-all duration-200">
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
                                                    <SelectItem
                                                        value="pending"
                                                        className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 font-medium"
                                                    >
                                                        Pending
                                                    </SelectItem>
                                                    <SelectItem
                                                        value="done"
                                                        className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 font-medium"
                                                    >
                                                        Done
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-base font-semibold text-gray-700 dark:text-gray-200">
                                                Mark
                                            </Label>
                                            <Select
                                                value={updateLessonData.mark}
                                                onValueChange={(value) =>
                                                    handleUpdateLessonInputChange('mark', value)
                                                }
                                            >
                                                <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] rounded-lg transition-all duration-200">
                                                    <SelectValue placeholder="Select mark" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
                                                    {['A+', 'A', 'B', 'C', 'D'].map((mark) => (
                                                        <SelectItem
                                                            key={mark}
                                                            value={mark}
                                                            className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 font-medium"
                                                        >
                                                            {mark}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-base font-semibold text-gray-700 dark:text-gray-200">
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
                                                className="min-h-[100px] bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] rounded-lg transition-all duration-200"
                                            />
                                        </div>
                                        <Button
                                            onClick={handleUpdateLesson}
                                            className="w-full bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] text-white rounded-lg font-medium transition-all duration-200 shadow-md"
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
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
                <CardHeader className="p-6">
                    <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-bold text-[#657ED4] dark:text-[#5AD3AF]">
                            Lesson Content
                        </h3>
                    </div>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-base font-semibold text-gray-700 dark:text-gray-200">
                                    Content
                                </Label>
                                <Card className="p-4 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-lg">
                                    <p className="text-gray-800 dark:text-gray-200 line-clamp-4 leading-relaxed font-medium">
                                        {lesson.content || (
                                            <span className="italic text-gray-500 dark:text-gray-400">
                                                No content provided
                                            </span>
                                        )}
                                    </p>
                                </Card>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-base font-semibold text-gray-700 dark:text-gray-200">
                                    Status
                                </Label>
                                <Card className="p-4 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            className={
                                                lesson.status === 'done'
                                                    ? 'bg-[#657ED4] dark:bg-[#5AD3AF] text-white font-medium'
                                                    : 'bg-gray-500 dark:bg-gray-600 text-white font-medium'
                                            }
                                        >
                                            {lesson.status === 'done' ? 'Completed' : 'Pending'}
                                        </Badge>
                                    </div>
                                </Card>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-base font-semibold text-gray-700 dark:text-gray-200">
                                Video
                            </Label>
                            {lesson.videoUrl ? (
                                <Card className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
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
                                                    className:
                                                        'bg-[#F76F8E] text-white dark:text-black font-semibold',
                                                });
                                            }}
                                        ></iframe>
                                    </div>
                                </Card>
                            ) : (
                                <Card className="p-4 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-lg text-center">
                                    <p className="text-gray-500 dark:text-gray-400 italic font-medium">
                                        No video available
                                    </p>
                                </Card>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Quizzes Section */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
                <CardHeader className="p-6">
                    <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-bold text-[#657ED4] dark:text-[#5AD3AF]">
                            Lesson Quizzes
                        </h3>
                    </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                    {quizzes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {quizzes.map((quiz) => (
                                <Card
                                    key={quiz._id}
                                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl"
                                >
                                    <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-lg font-semibold text-[#657ED4] dark:text-[#5AD3AF] line-clamp-1">
                                                {quiz.questionText}
                                            </h4>
                                            <Badge
                                                className={
                                                    quiz.type === 'multiple_choice'
                                                        ? 'bg-[#657ED4] dark:bg-[#5AD3AF] text-white font-medium'
                                                        : 'bg-[#657ED4] dark:bg-[#5AD3AF] text-white font-medium'
                                                }
                                            >
                                                {quiz.type === 'multiple_choice'
                                                    ? 'Multiple Choice'
                                                    : 'Coding'}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4 space-y-2">
                                        <p className="text-base text-gray-600 dark:text-gray-400 line-clamp-2 font-medium">
                                            {quiz.explanation || 'No explanation provided'}
                                        </p>
                                        {quiz.type === 'multiple_choice' ? (
                                            <div className="text-base text-gray-500 dark:text-gray-400 font-medium">
                                                <span>
                                                    {
                                                        quiz.options?.filter((o) => o.isCorrect)
                                                            .length
                                                    }{' '}
                                                    correct option(s)
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
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
                                            className="w-full text-[#657ED4] dark:text-[#5AD3AF] border-[#657ED4] dark:border-[#5AD3AF] hover:bg-[#657ED4] hover:text-white dark:hover:bg-[#5AD3AF] dark:hover:text-black rounded-lg font-medium transition-all duration-200 shadow-md"
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
                            <p className="text-gray-500 dark:text-gray-400 font-medium">
                                No quizzes available for this lesson
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Quiz Detail Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-[#657ED4] dark:text-[#5AD3AF]">
                            Quiz Details
                        </DialogTitle>
                    </DialogHeader>
                    {selectedQuiz && (
                        <div className="space-y-6 py-4">
                            <div className="space-y-2">
                                <Label className="text-base font-semibold text-gray-700 dark:text-gray-200">
                                    Question
                                </Label>
                                <p className="text-gray-900 dark:text-gray-100 font-medium">
                                    {selectedQuiz.questionText}
                                </p>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-base font-semibold text-gray-700 dark:text-gray-200">
                                    Explanation
                                </Label>
                                <Card className="p-4 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-lg">
                                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                                        {selectedQuiz.explanation || 'No explanation provided'}
                                    </p>
                                </Card>
                            </div>
                            {selectedQuiz.type === 'multiple_choice' ? (
                                <div className="space-y-3">
                                    <Label className="text-base font-semibold text-gray-700 dark:text-gray-200">
                                        Options
                                    </Label>
                                    <div className="space-y-2">
                                        {selectedQuiz.options?.map((option, index) => (
                                            <Card
                                                key={index}
                                                className={`p-3 border ${
                                                    option.isCorrect
                                                        ? 'border-[#657ED4] dark:border-[#5AD3AF] bg-[#657ED4]/10 dark:bg-[#5AD3AF]/10'
                                                        : 'border-gray-200 dark:border-gray-600'
                                                } rounded-lg`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                                                            option.isCorrect
                                                                ? 'border-[#657ED4] dark:border-[#5AD3AF] bg-[#657ED4] dark:bg-[#5AD3AF] text-white'
                                                                : 'border-gray-300 dark:border-gray-600'
                                                        }`}
                                                    >
                                                        {option.isCorrect && (
                                                            <CheckCircle className="h-3 w-3" />
                                                        )}
                                                    </div>
                                                    <p className="text-gray-800 dark:text-gray-200 font-medium">
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
                                            <Label className="text-base font-semibold text-gray-700 dark:text-gray-200">
                                                Language
                                            </Label>
                                            <Card className="p-3 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-lg">
                                                <p className="text-gray-800 dark:text-gray-200 font-medium">
                                                    {selectedQuiz.language || 'Not specified'}
                                                </p>
                                            </Card>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-base font-semibold text-gray-700 dark:text-gray-200">
                                                Expected Output
                                            </Label>
                                            <Card className="p-3 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-lg">
                                                <p className="text-gray-800 dark:text-gray-200 font-medium">
                                                    {selectedQuiz.expectedOutput || 'Not specified'}
                                                </p>
                                            </Card>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-base font-semibold text-gray-700 dark:text-gray-200">
                                            Starter Code
                                        </Label>
                                        <Card className="p-4 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-lg">
                                            <pre className="text-base font-mono text-gray-800 dark:text-gray-200 overflow-x-auto font-medium">
                                                {selectedQuiz.starterCode ||
                                                    'No starter code provided'}
                                            </pre>
                                        </Card>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-base font-semibold text-gray-700 dark:text-gray-200">
                                            Test Cases ({selectedQuiz.testCases?.length || 0})
                                        </Label>
                                        {selectedQuiz.testCases?.length ? (
                                            <div className="space-y-2">
                                                {selectedQuiz.testCases.map((testCase, index) => (
                                                    <Card
                                                        key={index}
                                                        className="p-4 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-lg"
                                                    >
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            <div>
                                                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium">
                                                                    Input
                                                                </p>
                                                                <p className="text-base font-mono text-gray-800 dark:text-gray-200 font-medium">
                                                                    {testCase.input}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium">
                                                                    Expected Output
                                                                </p>
                                                                <p className="text-base font-mono text-gray-800 dark:text-gray-200 font-medium">
                                                                    {testCase.expectedOutput}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-base text-gray-500 dark:text-gray-400 font-medium">
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
