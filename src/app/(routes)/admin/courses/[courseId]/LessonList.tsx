'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from '@/components/ui/pagination';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Eye, Upload, PlusCircle } from 'lucide-react';
import { CreateLesson } from '@/lib/services/lessons/createLesson';
import { GetLessons } from '@/lib/services/lessons/getAllLessons';

interface Lesson {
    _id: string;
    title: string;
    content?: string;
    status?: string;
    free_url?: string;
    videoKey?: string;
    quiz?: string[];
    order: number;
    createdAt?: string;
    updatedAt?: string;
}

interface LessonListProps {
    courseId: string;
    coursePrice: number;
}

export default function LessonList({ courseId, coursePrice }: LessonListProps) {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        order: 0,
        free_url: '',
        quiz: [] as string[],
    });
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

    const router = useRouter();

    const isFreeCourse = coursePrice === 0;

    const loadLessons = async () => {
        try {
            setLoading(true);
            const data = await GetLessons(courseId);
            console.log('API Data:', data);

            if (data?.status === 200) {
                setLessons(
                    data.metadata.map((lesson: Lesson) => ({
                        _id: lesson._id,
                        title: lesson.title,
                        content: lesson.content,
                        status: lesson.status,
                        free_url: lesson.free_url,
                        videoKey: lesson.videoKey,
                        quiz: lesson.quiz,
                        order: lesson.order,
                        createdAt: lesson.createdAt,
                        updatedAt: lesson.updatedAt,
                    })),
                );
                setCurrentPage(1);
                setTotalPages(Math.ceil(data.metadata.length / 3));
            } else {
                setLessons([]);
            }
        } catch (error) {
            console.error('Failed to fetch lessons:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to load lessons',
                variant: 'destructive',
            });
            setLessons([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLessons();
    }, [courseId]);

    useEffect(() => {
        if (!isCreateDialogOpen) {
            setFormData({
                title: '',
                content: '',
                order: 0,
                free_url: '',
                quiz: [],
            });
            setSelectedVideo(null);
        }
    }, [isCreateDialogOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleVideoUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const validTypes = ['video/mp4', 'video/webm', 'video/ogg'];
            if (!validTypes.includes(file.type)) {
                toast({
                    title: '❌ Invalid File Type',
                    description: 'Please upload a video file (MP4, WebM, or OGG).',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
                return;
            }

            const maxSize = 50 * 1024 * 1024; // 50MB limit
            if (file.size > maxSize) {
                toast({
                    title: '❌ File Too Large',
                    description: 'Please upload a video smaller than 50MB.',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
                return;
            }

            setSelectedVideo(file);
        } else {
            setSelectedVideo(null);
        }
    };

    const handleCreateLesson = async () => {
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
            if (
                isFreeCourse &&
                formData.free_url &&
                !/^https?:\/\/(www\.)?(youtube\.com|player\.vimeo\.com|youtu\.be)/.test(
                    formData.free_url,
                )
            ) {
                toast({
                    title: 'Error',
                    description: 'Please enter a valid video URL (e.g., YouTube or Vimeo link).',
                    variant: 'destructive',
                });
                return;
            }

            if (!isFreeCourse && !selectedVideo) {
                toast({
                    title: 'Error',
                    description: 'Please upload a video for this paid course.',
                    variant: 'destructive',
                });
                return;
            }

            await CreateLesson({
                token: tokenuser,
                course: courseId,
                title: formData.title,
                content: formData.content,
                order: formData.order,
                video: !isFreeCourse ? (selectedVideo ?? undefined) : undefined,
                free_url: isFreeCourse ? formData.free_url : undefined,
                quiz: formData.quiz.length > 0 ? formData.quiz : undefined,
            });

            toast({
                title: 'Success',
                description: 'Lesson created successfully',
                variant: 'default',
                className: 'bg-[#657ED4] text-white',
            });

            setFormData({
                title: '',
                content: '',
                order: 0,
                free_url: '',
                quiz: [],
            });
            setSelectedVideo(null);
            setIsCreateDialogOpen(false);
            loadLessons();
        } catch (error) {
            console.error('Failed to create lesson:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to create lesson',
                variant: 'destructive',
            });
        }
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
        }
    };

    const handleViewDetails = (lessonId: string) => {
        console.log('Navigating to lesson details:', lessonId);
        router.push(`/admin/courses/${courseId}/${lessonId}`);
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Lessons</h1>
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full sm:w-auto">
                        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="w-full sm:w-auto bg-[#657ED4] hover:bg-[#424c70] text-white flex items-center gap-2 cursor-pointer">
                                    <PlusCircle className="h-5 w-5" />
                                    Create Lesson
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-lg bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                        Create New Lesson
                                    </DialogTitle>
                                </DialogHeader>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (!formData.title.trim()) {
                                            toast({
                                                title: 'Error',
                                                description: 'Lesson title is required.',
                                                variant: 'destructive',
                                            });
                                            return;
                                        }
                                        if (formData.order < 0) {
                                            toast({
                                                title: 'Error',
                                                description:
                                                    'Lesson order must be a non-negative number.',
                                                variant: 'destructive',
                                            });
                                            return;
                                        }
                                        handleCreateLesson();
                                    }}
                                    className="space-y-6 mt-4"
                                >
                                    <div>
                                        <Label
                                            htmlFor="title"
                                            className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Title <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="Enter lesson title..."
                                            className="mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#657ED4]"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label
                                            htmlFor="content"
                                            className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Content
                                        </Label>
                                        <Textarea
                                            id="content"
                                            name="content"
                                            value={formData.content}
                                            onChange={handleInputChange}
                                            placeholder="Enter lesson content (optional)..."
                                            className="mt-2 min-h-[100px] bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#657ED4]"
                                        />
                                    </div>
                                    <div>
                                        <Label
                                            htmlFor="order"
                                            className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Order <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="order"
                                            name="order"
                                            type="number"
                                            value={formData.order}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    order: parseInt(e.target.value) || 0,
                                                }))
                                            }
                                            placeholder="Enter lesson order..."
                                            className="mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#657ED4]"
                                            required
                                            min="0"
                                        />
                                    </div>
                                    {isFreeCourse ? (
                                        <div>
                                            <Label
                                                htmlFor="free_url"
                                                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                Video URL
                                            </Label>
                                            <Input
                                                id="free_url"
                                                name="free_url"
                                                value={formData.free_url}
                                                onChange={handleInputChange}
                                                placeholder="Enter video URL (e.g., YouTube link)..."
                                                className="mt-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-[#657ED4]"
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <Label
                                                htmlFor="video-upload"
                                                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                Video
                                            </Label>
                                            <div className="flex items-center gap-4">
                                                <label
                                                    htmlFor="video-upload"
                                                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                                                >
                                                    <Upload className="h-5 w-5 cursor-pointer text-[#657ED4] dark:text-[#5AD3AF]" />
                                                    <span className="text-gray-700 dark:text-gray-300">
                                                        Upload Video
                                                    </span>
                                                    <input
                                                        id="video-upload"
                                                        type="file"
                                                        accept="video/mp4,video/webm,video/ogg"
                                                        onChange={handleVideoUpload}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                Optional: Upload a video (MP4, WebM, OGG, max 50MB)
                                            </p>
                                            {selectedVideo && (
                                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                                    {selectedVideo.name}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                    <div className="flex justify-end gap-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setIsCreateDialogOpen(false)}
                                            className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="bg-[#657ED4] hover:bg-[#424c70] text-white cursor-pointer"
                                        >
                                            Create Lesson
                                        </Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Lessons Section */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                    <CardHeader className="p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-[#657ED4] rounded-full" />
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                Lesson List
                            </h2>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <Card
                                        key={index}
                                        className="animate-pulse bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                                    >
                                        <CardContent className="p-4 space-y-3">
                                            <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
                                            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full" />
                                            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : !lessons || lessons.length === 0 ? (
                            <div className="text-center py-12 text-gray-600 dark:text-gray-400">
                                <p className="text-lg">No lessons found for this course.</p>
                                <p className="mt-2">Start by creating a new lesson!</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {lessons.map((lesson) => (
                                        <Card
                                            key={lesson._id}
                                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl"
                                        >
                                            <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-600">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                                                        {lesson.title}
                                                    </h3>
                                                    <Badge
                                                        className={
                                                            lesson.status === 'done'
                                                                ? 'bg-[#657ED4] text-white'
                                                                : 'bg-gray-500 text-white'
                                                        }
                                                    >
                                                        {lesson.status || 'N/A'}
                                                    </Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-4 space-y-2">
                                                <p className="text-base text-gray-600 dark:text-gray-400 line-clamp-2">
                                                    {lesson.content
                                                        ? lesson.content.slice(0, 100) +
                                                          (lesson.content.length > 100 ? '...' : '')
                                                        : 'No content'}
                                                </p>
                                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                    <span>Order: {lesson.order}</span>
                                                </div>
                                                {lesson.free_url && (
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                        <a
                                                            href={lesson.free_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-[#657ED4] hover:underline truncate max-w-[150px] cursor-pointer"
                                                            title={lesson.free_url}
                                                        >
                                                            {lesson.free_url.slice(0, 20) +
                                                                (lesson.free_url.length > 20
                                                                    ? '...'
                                                                    : '')}
                                                        </a>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                    <span>
                                                        Created:{' '}
                                                        {lesson.createdAt
                                                            ? new Date(
                                                                  lesson.createdAt,
                                                              ).toLocaleDateString()
                                                            : 'N/A'}
                                                    </span>
                                                </div>
                                            </CardContent>
                                            <div className="p-4">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="w-full bg-[#657ED4] hover:bg-[#424c70] text-white border-none dark:bg-[#657ED4] dark:hover:bg-[#424c70] dark:text-white cursor-pointer"
                                                    onClick={() => handleViewDetails(lesson._id)}
                                                >
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    View Details
                                                </Button>
                                            </div>
                                        </Card>
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <div className="mt-8 flex justify-center">
                                        <Pagination>
                                            <PaginationContent>
                                                <PaginationItem>
                                                    <PaginationPrevious
                                                        onClick={() =>
                                                            handlePageChange(currentPage - 1)
                                                        }
                                                        className={
                                                            currentPage === 1
                                                                ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                                                : 'cursor-pointer text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700'
                                                        }
                                                        aria-disabled={currentPage === 1}
                                                    />
                                                </PaginationItem>

                                                {Array.from(
                                                    { length: totalPages },
                                                    (_, i) => i + 1,
                                                ).map((page) => (
                                                    <PaginationItem key={page}>
                                                        <PaginationLink
                                                            onClick={() => handlePageChange(page)}
                                                            isActive={currentPage === page}
                                                            className={
                                                                currentPage === page
                                                                    ? 'bg-[#657ED4] dark:bg-[#5AD3AF] text-white hover:bg-[#424c70] dark:hover:bg-[#4ac2a0] cursor-pointer'
                                                                    : 'cursor-pointer text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700'
                                                            }
                                                        >
                                                            {page}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                ))}

                                                <PaginationItem>
                                                    <PaginationNext
                                                        onClick={() =>
                                                            handlePageChange(currentPage + 1)
                                                        }
                                                        className={
                                                            currentPage === totalPages
                                                                ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                                                : 'cursor-pointer text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700'
                                                        }
                                                        aria-disabled={currentPage === totalPages}
                                                    />
                                                </PaginationItem>
                                            </PaginationContent>
                                        </Pagination>
                                    </div>
                                )}
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
