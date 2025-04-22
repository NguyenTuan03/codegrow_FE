'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
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
import { toast } from '@/components/ui/use-toast';
import { Loader2, Eye, Upload } from 'lucide-react';
import { CreateLesson } from '@/lib/services/lessons/createLesson';
import { GetLessons } from '@/lib/services/lessons/getAllLessons';
import { GenerateUploadUrl } from '@/lib/services/lessons/generateuploadurl';
import { UploadVideo } from '@/lib/services/lessons/uploadvideo';

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

interface LessonListProps {
    courseId: string;
}

export default function LessonList({ courseId }: LessonListProps) {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [videoKey, setVideoKey] = useState(localStorage.getItem('videoKey') || '');
    const [videoUrl, setVideoUrl] = useState(localStorage.getItem('videoUrl') || '');
    const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        order: 0,
        videoUrl: localStorage.getItem('videoUrl') || '',
        videoKey: localStorage.getItem('videoKey') || '',
        quiz: [] as string[],
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const router = useRouter();

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
                        videoUrl: lesson.videoUrl,
                        videoKey: lesson.videoKey,
                        quiz: lesson.quiz,
                        order: lesson.order,
                        createdAt: lesson.createdAt,
                        updatedAt: lesson.updatedAt,
                    })),
                );
                setCurrentPage(1);
                setTotalPages(Math.ceil(data.metadata.length / 10));
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
        if (!isUploadDialogOpen) {
            setSelectedFile(null);
            setUploadLoading(false);
        }
    }, [isUploadDialogOpen]);

    useEffect(() => {
        if (!isCreateDialogOpen) {
            setFormData({
                title: '',
                content: '',
                order: 0,
                videoUrl: videoUrl,
                videoKey: videoKey,
                quiz: [],
            });
        }
    }, [isCreateDialogOpen, videoUrl, videoKey]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleFileUpload = async (): Promise<boolean> => {
        if (!selectedFile) {
            toast({
                title: 'Error',
                description: 'Please select a file to upload',
                variant: 'destructive',
            });
            return false;
        }

        try {
            setUploadLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication token is missing');
            }

            const uploadData = await GenerateUploadUrl({
                token,
                fileName: selectedFile.name,
                fileType: selectedFile.type,
            });
            console.log('Upload Data:', uploadData);

            if (!uploadData || !uploadData.metadata || !uploadData.metadata.uploadUrl) {
                throw new Error('Failed to generate upload URL');
            }

            const uploadUrl = uploadData.metadata.uploadUrl;
            const videoKey = uploadData.metadata.key;
            const publicUrl = uploadData.metadata.publicUrl;

            if (uploadData.status === 201) {
                const response = await UploadVideo(selectedFile.type, uploadUrl);
                console.log('Upload Response:', response);
                if (response.status !== 200) {
                    throw new Error('Failed to upload video');
                }
            } else {
                throw new Error('Failed to generate upload URL with status 201');
            }

            setVideoUrl(publicUrl);
            setVideoKey(videoKey);
            localStorage.setItem('videoUrl', publicUrl);
            localStorage.setItem('videoKey', videoKey);

            setFormData((prev) => ({
                ...prev,
                videoUrl: publicUrl,
                videoKey: videoKey,
            }));

            toast({
                title: 'Success',
                description: 'Video uploaded successfully',
                variant: 'default',
                className: 'bg-[#5AD3AF] text-black',
            });

            setSelectedFile(null);
            return true;
        } catch (error) {
            console.error('Failed to upload file:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to upload video',
                variant: 'destructive',
            });
            return false;
        } finally {
            setUploadLoading(false);
        }
    };

    const handleCreateLesson = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication token is missing');
            }

            await CreateLesson({
                token,
                course: courseId,
                title: formData.title,
                content: formData.content,
                order: formData.order,
                videoUrl: formData.videoUrl,
                videoKey: formData.videoKey,
                quiz: formData.quiz.length > 0 ? formData.quiz : undefined,
            });

            toast({
                title: 'Success',
                description: 'Lesson created successfully',
                variant: 'default',
                className: 'bg-[#5AD3AF] text-black',
            });

            setVideoUrl('');
            setVideoKey('');
            localStorage.removeItem('videoUrl');
            localStorage.removeItem('videoKey');

            setFormData({
                title: '',
                content: '',
                order: 0,
                videoUrl: '',
                videoKey: '',
                quiz: [],
            });
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

    const handleViewDetails = (lessionid: string) => {
        console.log('Navigating to lesson details:', lessionid);
        router.push(`/admin/courses/${courseId}/${lessionid}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 dark:from-indigo-400 dark:to-purple-400">
                        Lessons
                    </h1>
                    <div className="flex gap-3">
                        {!videoUrl ? (
                            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg px-4 py-2 transition-all duration-200">
                                        <Upload className="h-5 w-5" />
                                        Upload Video
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-md bg-white dark:bg-gray-900 rounded-xl p-6">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-indigo-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                                />
                                            </svg>
                                            Upload Video
                                        </DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4 mt-4">
                                        <div>
                                            <Label
                                                htmlFor="video-upload"
                                                className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-indigo-500"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m-6 0l-4.553 2.276A1 1 0 013 15.382V8.618a1 1 0 011.447-.894L9 10m6 0V6a3 3 0 00-3-3H6a3 3 0 00-3 3v12a3 3 0 003 3h6a3 3 0 003-3v-4"
                                                    />
                                                </svg>
                                                Select Video
                                            </Label>
                                            <Input
                                                id="video-upload"
                                                type="file"
                                                accept="video/*"
                                                onChange={handleFileSelect}
                                                className="mt-1 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                            />
                                        </div>
                                        <Button
                                            onClick={async () => {
                                                const success = await handleFileUpload();
                                                if (success) {
                                                    setIsUploadDialogOpen(false);
                                                }
                                            }}
                                            disabled={!selectedFile || uploadLoading}
                                            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg px-4 py-2 transition-all duration-200"
                                        >
                                            {uploadLoading ? (
                                                <>
                                                    <Loader2 className="h-5 w-5 animate-spin" />
                                                    Uploading...
                                                </>
                                            ) : (
                                                <>
                                                    <Upload className="h-5 w-5" />
                                                    Upload Video
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        ) : (
                            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg px-4 py-2 transition-all duration-200">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                        Create Lesson
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="w-[90vw] max-w-md sm:max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl overflow-x-hidden">
                                    <DialogHeader className="relative">
                                        <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 sm:h-7 w-6 sm:w-7 text-indigo-600 dark:text-indigo-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                />
                                            </svg>
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
                                        className="space-y-5 mt-5"
                                    >
                                        <div>
                                            <Label
                                                htmlFor="title"
                                                className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-indigo-600 dark:text-indigo-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                    />
                                                </svg>
                                                Title <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="title"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                placeholder="Enter lesson title..."
                                                className="mt-2 w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 rounded-lg shadow-sm hover:border-indigo-400"
                                                required
                                                aria-required="true"
                                            />
                                        </div>
                                        <div>
                                            <Label
                                                htmlFor="content"
                                                className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-indigo-600 dark:text-indigo-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                    />
                                                </svg>
                                                Content
                                            </Label>
                                            <Textarea
                                                id="content"
                                                name="content"
                                                value={formData.content}
                                                onChange={handleInputChange}
                                                placeholder="Enter lesson content (optional)..."
                                                className="mt-2 w-full min-h-[100px] sm:min-h-[120px] bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 rounded-lg shadow-sm hover:border-indigo-400 resize-y"
                                            />
                                        </div>
                                        <div>
                                            <Label
                                                htmlFor="order"
                                                className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-indigo-600 dark:text-indigo-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                                                    />
                                                </svg>
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
                                                className="mt-2 w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 rounded-lg shadow-sm hover:border-indigo-400"
                                                required
                                                aria-required="true"
                                                min="0"
                                            />
                                        </div>
                                        {formData.videoUrl && (
                                            <div>
                                                <Label className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-indigo-600 dark:text-indigo-400"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m-6 0l-4.553 2.276A1 1 0 013 15.382V8.618a1 1 0 011.447-.894L9 10m6 0V6a3 3 0 00-3-3H6a3 3 0 00-3 3v12a3 3 0 003 3h6a3 3 0 003-3v-4"
                                                        />
                                                    </svg>
                                                    Video URL
                                                </Label>
                                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 break-all">
                                                    <a
                                                        href={formData.videoUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                                                    >
                                                        {formData.videoUrl}
                                                    </a>
                                                </p>
                                            </div>
                                        )}
                                        <div className="flex justify-end gap-3 pt-5">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setIsCreateDialogOpen(false)}
                                                className="flex items-center gap-2 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-400 px-4 py-2"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg px-4 py-2 transition-all duration-300 shadow-sm focus:ring-2 focus:ring-indigo-400"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                                Create Lesson
                                            </Button>
                                        </div>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                </div>

                {/* Lessons Table */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                    {loading ? (
                        <div className="flex justify-center items-center h-32">
                            <Loader2 className="h-10 w-10 animate-spin text-indigo-600 dark:text-indigo-400" />
                        </div>
                    ) : !lessons || lessons.length === 0 ? (
                        <div className="text-center text-gray-600 dark:text-gray-400 p-6">
                            <p className="text-lg">No lessons found for this course.</p>
                            <p className="mt-2">
                                Start by uploading a video and creating a new lesson!
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50 dark:bg-gray-700">
                                            <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">
                                                Title
                                            </TableHead>
                                            <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">
                                                Content
                                            </TableHead>
                                            <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">
                                                Order
                                            </TableHead>
                                            <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">
                                                Status
                                            </TableHead>
                                            <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">
                                                Video URL
                                            </TableHead>
                                            <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">
                                                Created At
                                            </TableHead>
                                            <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">
                                                Updated At
                                            </TableHead>
                                            <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {lessons.map((lesson) => (
                                            <TableRow
                                                key={lesson._id}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                                            >
                                                <TableCell className="text-gray-900 dark:text-gray-100">
                                                    {lesson.title}
                                                </TableCell>
                                                <TableCell className="text-gray-900 dark:text-gray-100">
                                                    {lesson.content
                                                        ? lesson.content.length > 50
                                                            ? `${lesson.content.substring(0, 50)}...`
                                                            : lesson.content
                                                        : 'No content'}
                                                </TableCell>
                                                <TableCell className="text-gray-900 dark:text-gray-100">
                                                    {lesson.order}
                                                </TableCell>
                                                <TableCell className="text-gray-900 dark:text-gray-100">
                                                    <span
                                                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                                            lesson.status === 'active'
                                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                                                        }`}
                                                    >
                                                        {lesson.status || 'N/A'}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-gray-900 dark:text-gray-100">
                                                    {lesson.videoUrl ? (
                                                        <a
                                                            href={lesson.videoUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-2"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                                />
                                                            </svg>
                                                            Watch Video
                                                        </a>
                                                    ) : (
                                                        'No video'
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-gray-900 dark:text-gray-100">
                                                    {lesson.createdAt
                                                        ? new Date(
                                                              lesson.createdAt,
                                                          ).toLocaleString()
                                                        : 'N/A'}
                                                </TableCell>
                                                <TableCell className="text-gray-900 dark:text-gray-100">
                                                    {lesson.updatedAt
                                                        ? new Date(
                                                              lesson.updatedAt,
                                                          ).toLocaleString()
                                                        : 'N/A'}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleViewDetails(lesson._id)
                                                        }
                                                        className="flex items-center gap-2 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        View
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {totalPages > 1 && (
                                <div className="mt-12 flex justify-center">
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    onClick={() =>
                                                        setCurrentPage((prev) => prev - 1)
                                                    }
                                                    className={
                                                        currentPage === 1
                                                            ? 'pointer-events-none opacity-50'
                                                            : 'cursor-pointer text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200'
                                                    }
                                                />
                                            </PaginationItem>

                                            {Array.from(
                                                { length: totalPages },
                                                (_, i) => i + 1,
                                            ).map((page) => (
                                                <PaginationItem key={page}>
                                                    <PaginationLink
                                                        onClick={() => setCurrentPage(page)}
                                                        isActive={currentPage === page}
                                                        className={
                                                            currentPage === page
                                                                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                                                : 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200'
                                                        }
                                                    >
                                                        {page}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            ))}

                                            <PaginationItem>
                                                <PaginationNext
                                                    onClick={() =>
                                                        setCurrentPage((prev) => prev + 1)
                                                    }
                                                    className={
                                                        currentPage === totalPages
                                                            ? 'pointer-events-none opacity-50'
                                                            : 'cursor-pointer text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200'
                                                    }
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
