'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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
    const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        order: 0,
        videoUrl: '',
        videoKey: '',
        quiz: [] as string[],
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const limit = 8; // Number of lessons per page

    // Fetch lessons
    const loadLessons = async (page: number = 1) => {
        try {
            setLoading(true);
            const data = await GetLessons(courseId, page, limit);
            console.log('API Data:', data);

            if (data?.metadata?.lessons && data.metadata.lessons.length > 0) {
                setLessons(
                    data.metadata.lessons.map((lesson: Lesson) => ({
                        _id: lesson._id,
                        title: lesson.title,
                        content: lesson.content,
                        videoUrl: lesson.videoUrl,
                        videoKey: lesson.videoKey,
                        quiz: lesson.quiz,
                        order: lesson.order,
                        createdAt: lesson.createdAt,
                        updatedAt: lesson.updatedAt,
                    })),
                );
                setCurrentPage(data.metadata.page);
                setTotalPages(data.metadata.totalPages);
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
        loadLessons(currentPage);
    }, [courseId, currentPage]);

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle quiz input changes (treating quiz as a comma-separated string)
    // const handleQuizChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const quizItems = e.target.value
    //         .split(',')
    //         .map((item) => item.trim())
    //         .filter(Boolean);
    //     setFormData((prev) => ({ ...prev, quiz: quizItems }));
    // };

    // Handle file selection
    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    // Handle file upload
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

            // Generate upload URL
            const uploadData = await GenerateUploadUrl({
                token,
                fileName: selectedFile.name,
                fileType: selectedFile.type,
            });
            const uploadUrl = uploadData.metadata.uploadUrl;
            console.log('Upload URL:', uploadUrl);

            const videoKey = uploadData.metadata.key;

            if (uploadData.status === 201) {
                const response = await UploadVideo(uploadUrl, selectedFile.type);
                console.log('Upload Response:', response);

                if (response.status !== 201) {
                    throw new Error('Failed to upload video');
                }
            }

            // Extract the video URL from the response
            const baseUrl = uploadUrl.split('?')[0];

            // Update form data with video URL and key
            setFormData((prev) => ({
                ...prev,
                videoUrl: baseUrl,
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

    // Handle create lesson
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
                videoUrl: formData.videoUrl || undefined,
                videoKey: formData.videoKey || undefined,
                quiz: formData.quiz.length > 0 ? formData.quiz : undefined,
            });

            toast({
                title: 'Success',
                description: 'Lesson created successfully',
                variant: 'default',
                className: 'bg-[#5AD3AF] text-black',
            });

            setFormData({ title: '', content: '', order: 0, videoUrl: '', videoKey: '', quiz: [] });
            setIsCreateDialogOpen(false);
            loadLessons(currentPage);
        } catch (error) {
            console.error('Failed to create lesson:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to create lesson',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[#657ED4] dark:text-[#5AD3AF]">
                    Lessons
                </h2>
                <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 text-white hover:bg-blue-700">
                            Upload Video
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Upload Video</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                            <div>
                                <Label htmlFor="video-upload">Select Video</Label>
                                <Input
                                    id="video-upload"
                                    type="file"
                                    accept="video/*"
                                    onChange={handleFileSelect}
                                    className="dark:bg-gray-700 dark:text-gray-200"
                                />
                            </div>
                            <Button
                                onClick={async () => {
                                    const success = await handleFileUpload();
                                    if (success) {
                                        setIsUploadDialogOpen(false);
                                        setIsCreateDialogOpen(true);
                                    }
                                }}
                                disabled={!selectedFile || uploadLoading}
                                className="w-full"
                            >
                                {uploadLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="h-4 w-4 mr-2" />
                                        Upload Video
                                    </>
                                )}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Create New Lesson</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Lesson title"
                                    className="dark:bg-gray-700 dark:text-gray-200"
                                />
                            </div>
                            <div>
                                <Label htmlFor="content">Content</Label>
                                <Textarea
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    placeholder="Lesson content"
                                    className="dark:bg-gray-700 dark:text-gray-200"
                                />
                            </div>
                            <div>
                                <Label htmlFor="order">Order</Label>
                                <Input
                                    id="order"
                                    name="order"
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            order: parseInt(e.target.value),
                                        }))
                                    }
                                    placeholder="Lesson order"
                                    className="dark:bg-gray-700 dark:text-gray-200"
                                />
                            </div>
                            <Button
                                onClick={handleCreateLesson}
                                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Create Lesson
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <Loader2 className="h-8 w-8 animate-spin text-[#5AD3AF]" />
                </div>
            ) : lessons.length === 0 ? (
                <div className="text-center text-gray-600 dark:text-gray-400 p-4">
                    No lessons found for this course.
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {lessons.map((lesson) => (
                            <Card
                                key={lesson._id}
                                className="hover:shadow-lg transition-shadow overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                            >
                                <div className="h-36 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                    <span className="text-gray-700 dark:text-gray-300">
                                        Lesson {lesson.order}
                                    </span>
                                </div>
                                <CardContent className="p-4">
                                    <h4 className="font-medium mb-1 text-gray-900 dark:text-gray-100">
                                        {lesson.title}
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        {lesson.content
                                            ? lesson.content.length > 100
                                                ? `${lesson.content.substring(0, 100)}...`
                                                : lesson.content
                                            : 'No content'}
                                    </p>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-gray-900 dark:text-gray-100">
                                            Order: {lesson.order}
                                        </span>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between p-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                    >
                                        <Eye className="h-4 w-4 mr-1" />
                                        View
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-12 flex justify-center">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => setCurrentPage((prev) => prev - 1)}
                                            className={
                                                currentPage === 1
                                                    ? 'pointer-events-none opacity-50'
                                                    : 'cursor-pointer'
                                            }
                                        />
                                    </PaginationItem>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                        (page) => (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    onClick={() => setCurrentPage(page)}
                                                    isActive={currentPage === page}
                                                    className={
                                                        currentPage === page
                                                            ? 'bg-blue-600 text-white'
                                                            : 'cursor-pointer'
                                                    }
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ),
                                    )}

                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => setCurrentPage((prev) => prev + 1)}
                                            className={
                                                currentPage === totalPages
                                                    ? 'pointer-events-none opacity-50'
                                                    : 'cursor-pointer'
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
    );
}
