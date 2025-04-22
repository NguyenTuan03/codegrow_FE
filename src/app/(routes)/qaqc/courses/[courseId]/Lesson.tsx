// @/app/(routes)/admin/courses/[courseId]/LessonList.tsx
'use client';

import { useState, useEffect } from 'react';
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

import { toast } from '@/components/ui/use-toast';
import { Loader2, Eye } from 'lucide-react';

import { GetLessons } from '@/lib/services/lessons/getAllLessons';

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

export default function Lesson({ courseId }: LessonListProps) {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

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

    // Handle view details with navigation
    const handleViewDetails = (lessionid: string) => {
        console.log('Navigating to lesson details:', lessionid);
        router.push(`/qaqc/courses/${courseId}/${lessionid}`);
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[#657ED4] dark:text-[#5AD3AF]">
                    Lessons
                </h2>
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
