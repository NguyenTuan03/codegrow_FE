'use client';

import { useState, useEffect } from 'react';

interface Lesson {
    _id: string;
    title: string;
    description: string;
    order: number;
    createdAt: string;
    updatedAt: string;
}
import { useRouter } from 'next/navigation';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
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
import { Loader2, Pencil, Trash2, Eye } from 'lucide-react';
import { CreateLesson } from '@/lib/services/lessons/createLesson';
import { UpdateLesson } from '@/lib/services/lessons/updateLessonFeedback';
import { DeleteLesson } from '@/lib/services/lessons/deleteLesson';

interface LessonListProps {
    courseId: string;
}

export default function LessonList({ courseId }: LessonListProps) {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const [formData, setFormData] = useState({ title: '', description: '', order: 0 });
    const router = useRouter();

    // Mock data for testing (remove this in production)
    const mockLessons: Lesson[] = [
        {
            _id: '1',
            title: 'Introduction to React',
            description: 'Learn the basics of React.',
            order: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            _id: '2',
            title: 'Advanced JavaScript',
            description: 'Deep dive into JavaScript concepts.',
            order: 2,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ];

    // Fetch lessons
    const loadLessons = async () => {
        try {
            setLoading(true);
            // const data = await fetchLessons(courseId);
            // setLessons(data);
            setLessons(mockLessons); // Use mock data for now
        } catch (error) {
            console.error('Failed to fetch lessons:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to load lessons',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLessons();
    }, [courseId]);

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
                title: formData.title,
                description: formData.description,
                order: formData.order,
            });

            toast({
                title: 'Success',
                description: 'Lesson created successfully',
                variant: 'default',
                className: 'bg-[#5AD3AF] text-black',
            });

            setFormData({ title: '', description: '', order: 0 });
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

    // Handle update lesson
    const handleUpdateLesson = async () => {
        if (!selectedLesson) return;

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication token is missing');
            }

            await UpdateLesson(
                courseId,
                selectedLesson._id,
                token,
                formData.title,
                formData.description,
                formData.order.toString(),
                'default-category', // Replace with the appropriate category value
            );

            toast({
                title: 'Success',
                description: 'Lesson updated successfully',
                variant: 'default',
                className: 'bg-[#5AD3AF] text-black',
            });

            setIsUpdateDialogOpen(false);
            setSelectedLesson(null);
            setFormData({ title: '', description: '', order: 0 });
            loadLessons();
        } catch (error) {
            console.error('Failed to update lesson:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to update lesson',
                variant: 'destructive',
            });
        }
    };

    // Handle delete lesson
    const handleDeleteLesson = async (lessonId: string) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication token is missing');
            }

            await DeleteLesson(courseId, lessonId);

            toast({
                title: 'Success',
                description: 'Lesson deleted successfully',
                variant: 'default',
                className: 'bg-[#5AD3AF] text-black',
            });

            loadLessons();
        } catch (error) {
            console.error('Failed to delete lesson:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to delete lesson',
                variant: 'destructive',
            });
        }
    };

    // Handle view details
    const handleViewDetails = (lessonId: string) => {
        router.push(`/admin/courses/${courseId}/lessons/${lessonId}`);
    };

    // Open update dialog with pre-filled data
    const openUpdateDialog = (lesson: Lesson) => {
        setSelectedLesson(lesson);
        setFormData({
            title: lesson.title,
            description: lesson.description,
            order: lesson.order,
        });
        setIsUpdateDialogOpen(true);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#657ED4] dark:text-[#5AD3AF]">
                    Lessons
                </h2>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-[#657ED4] hover:bg-[#5A6BBE] dark:bg-[#657ED4] dark:hover:bg-[#5A6BBE]">
                            Create Lesson
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Lesson</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
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
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Lesson description"
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
                            <Button onClick={handleCreateLesson}>Create</Button>
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
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Order</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {lessons.map((lesson) => (
                            <TableRow key={lesson._id}>
                                <TableCell>{lesson.title}</TableCell>
                                <TableCell>{lesson.description}</TableCell>
                                <TableCell>{lesson.order}</TableCell>
                                <TableCell>
                                    {new Date(lesson.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleViewDetails(lesson._id)}
                                        >
                                            <Eye className="h-4 w-4 mr-1" />
                                            View
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => openUpdateDialog(lesson)}
                                        >
                                            <Pencil className="h-4 w-4 mr-1" />
                                            Update
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDeleteLesson(lesson._id)}
                                            className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600"
                                        >
                                            <Trash2 className="h-4 w-4 mr-1" />
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            {/* Update Lesson Dialog */}
            <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Lesson</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
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
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Lesson description"
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
                        <Button onClick={handleUpdateLesson}>Update</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
