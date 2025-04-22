// @/app/(routes)/admin/courses/[courseId]/LessonList.tsx
'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'; // Import table components
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
    const router = useRouter(); // Initialize useRouter for navigation

    const loadLessons = async () => {
        try {
            setLoading(true);
            const data = await GetLessons(courseId);
            console.log('API Data:', data);

            if (data?.status === 200) {
                // The metadata is an array of lessons directly
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

                // If you still need pagination:
                // These might need to be adjusted if they're provided differently
                setCurrentPage(1); // Or however the current page is provided in the response
                setTotalPages(Math.ceil(data.metadata.length / 10)); // Or however your pagination works
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

    // Reset form and upload states when the upload dialog closes
    useEffect(() => {
        if (!isUploadDialogOpen) {
            setSelectedFile(null);
            setUploadLoading(false);
        }
    }, [isUploadDialogOpen]);

    // Reset form when the create dialog closes
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

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

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
            console.log('Upload Data:', uploadData);

            if (!uploadData || !uploadData.metadata || !uploadData.metadata.uploadUrl) {
                throw new Error('Failed to generate upload URL');
            }

            const uploadUrl = uploadData.metadata.uploadUrl;
            const videoKey = uploadData.metadata.key;
            const publicUrl = uploadData.metadata.publicUrl;

            if (uploadData.status === 201) {
                const response = await UploadVideo(selectedFile.name, uploadUrl);
                console.log('Upload Response:', response);
                if (response.status !== 200) {
                    throw new Error('Failed to upload video');
                }
            } else {
                throw new Error('Failed to generate upload URL with status 201');
            }

            // Update video URL and key
            setVideoUrl(publicUrl);
            setVideoKey(videoKey);
            localStorage.setItem('videoUrl', publicUrl);
            localStorage.setItem('videoKey', videoKey);

            // Update form data with video URL and key
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

            // Clear videoUrl and videoKey after successful lesson creation
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

    // Handle view details with navigation
    const handleViewDetails = (lessionid: string) => {
        console.log('Navigating to lesson details:', lessionid);
        router.push(`/admin/courses/${courseId}/${lessionid}`);
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[#657ED4] dark:text-[#5AD3AF]">
                    Lessons
                </h2>
                <div className="space-x-2">
                    {!videoUrl ? (
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
                    ) : (
                        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                                    Create Lesson
                                </Button>
                            </DialogTrigger>
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
                                    {formData.videoUrl && (
                                        <div>
                                            <Label>Video URL</Label>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                {formData.videoUrl}
                                            </p>
                                        </div>
                                    )}
                                    <Button
                                        onClick={handleCreateLesson}
                                        className="w-full bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        Create Lesson
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <Loader2 className="h-8 w-8 animate-spin text-[#5AD3AF]" />
                </div>
            ) : !lessons ? (
                <div className="text-center text-gray-600 dark:text-gray-400 p-4">
                    No lessons found for this course.
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title </TableHead>
                                    <TableHead>Content</TableHead>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Video URL</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead>Updated At</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {lessons.map((lesson) => (
                                    <TableRow key={lesson._id}>
                                        <TableCell>{lesson.title}</TableCell>
                                        <TableCell>
                                            {lesson.content
                                                ? lesson.content.length > 50
                                                    ? `${lesson.content.substring(0, 50)}...`
                                                    : lesson.content
                                                : 'No content'}
                                        </TableCell>
                                        <TableCell>{lesson.order}</TableCell>
                                        <TableCell>{lesson.status || 'N/A'}</TableCell>
                                        <TableCell>
                                            {lesson.videoUrl ? (
                                                <a
                                                    href={lesson.videoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    View Video
                                                </a>
                                            ) : (
                                                'No video'
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {lesson.createdAt
                                                ? new Date(lesson.createdAt).toLocaleString()
                                                : 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            {lesson.updatedAt
                                                ? new Date(lesson.updatedAt).toLocaleString()
                                                : 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleViewDetails(lesson._id)}
                                                className="text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
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
