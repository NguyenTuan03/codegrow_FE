'use client';

import { useState, useEffect, useCallback } from 'react';
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
import { toast } from '@/components/ui/use-toast';
import { Eye, PlayCircle, FileText, BookOpen } from 'lucide-react';
import { GetLessons } from '@/lib/services/lessons/getAllLessons';
import { Badge } from '@/components/ui/badge';

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

interface LessonProps {
    courseId: string;
}

interface ApiResponse {
    status: number;
    metadata: Lesson[];
    page?: number;
    totalPages?: number;
    totalItems?: number;
}

export default function Lesson({ courseId }: LessonProps) {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 6;
    const router = useRouter();

    const loadLessons = useCallback(
        async (page: number = 1) => {
            try {
                setLoading(true);
                const data: ApiResponse = await GetLessons(courseId, page, limit);
                console.log('API Data:', data);

                if (data?.status === 200 && Array.isArray(data.metadata)) {
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
                    setCurrentPage(data.page || 1);
                    setTotalPages(data.totalPages || Math.ceil(data.metadata.length / limit));
                } else {
                    throw new Error('Invalid lesson data');
                }
            } catch (error) {
                console.error('Failed to fetch lessons:', error);
                toast({
                    title: 'Error',
                    description: error instanceof Error ? error.message : 'Failed to load lessons',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
                setLessons([]);
            } finally {
                setLoading(false);
            }
        },
        [courseId],
    );

    useEffect(() => {
        loadLessons(currentPage);
    }, [loadLessons, currentPage]);

    const handleViewDetails = (lessonId: string) => {
        console.log('Navigating to lesson details:', lessonId);
        router.push(`/qaqc/courses/${courseId}/${lessonId}`);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex items-center gap-3">
                <h2 className="text-4xl font-bold text-[#657ED4] dark:text-[#5AD3AF]">Lessons</h2>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: limit }).map((_, index) => (
                        <Card
                            key={index}
                            className="animate-pulse bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                            <CardContent className="p-4 space-y-3">
                                <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
                                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full" />
                                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : lessons.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                        <BookOpen className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                        No lessons available
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6 font-medium">
                        There are no lessons available for this course at the moment.
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lessons.map((lesson) => (
                            <Card
                                key={lesson._id}
                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 hover:shadow-xl"
                            >
                                <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-semibold text-[#657ED4] dark:text-[#5AD3AF] line-clamp-1">
                                            {lesson.title}
                                        </h3>
                                        <Badge
                                            className={
                                                lesson.status === 'done'
                                                    ? 'bg-[#657ED4] dark:bg-[#5AD3AF] text-white font-medium'
                                                    : 'bg-gray-500 dark:bg-gray-600 text-white font-medium'
                                            }
                                        >
                                            {lesson.status || 'Draft'}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 space-y-2">
                                    <p className="text-base text-gray-600 dark:text-gray-400 line-clamp-2 font-medium">
                                        {lesson.content
                                            ? lesson.content.slice(0, 100) +
                                              (lesson.content.length > 100 ? '...' : '')
                                            : 'No content available'}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
                                        <FileText className="h-4 w-4 text-base text-[#657ED4] dark:text-[#5AD3AF]" />
                                        <span>Order: {lesson.order}</span>
                                    </div>
                                    {lesson.videoUrl && (
                                        <div className="flex items-center gap-2 text-base text-gray-500 dark:text-gray-400 font-medium">
                                            <PlayCircle className="h-4 w-4 text-[#657ED4] dark:text-[#5AD3AF]" />
                                            <a
                                                href={lesson.videoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#657ED4] dark:text-[#5AD3AF] hover:underline truncate max-w-[150px]"
                                                title={lesson.videoUrl}
                                            >
                                                {lesson.videoUrl.slice(0, 20) +
                                                    (lesson.videoUrl.length > 20 ? '...' : '')}
                                            </a>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 text-base text-gray-500 dark:text-gray-400 font-medium">
                                        <span>
                                            Created:{' '}
                                            {lesson.createdAt
                                                ? new Date(lesson.createdAt).toLocaleDateString(
                                                      'en-US',
                                                      {
                                                          weekday: 'long',
                                                          year: 'numeric',
                                                          month: 'long',
                                                          day: 'numeric',
                                                      },
                                                  )
                                                : 'N/A'}
                                        </span>
                                    </div>
                                </CardContent>
                                <div className="p-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full text-[#657ED4] dark:text-[#5AD3AF] border-[#657ED4] dark:border-[#5AD3AF] hover:bg-[#657ED4] hover:text-white dark:hover:bg-[#5AD3AF] dark:hover:text-black rounded-lg font-medium transition-all duration-200 shadow-md"
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
                        <div className="mt-12 flex justify-center">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            className={
                                                currentPage === 1
                                                    ? 'pointer-events-none opacity-50'
                                                    : 'cursor-pointer text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#4a5da0] dark:hover:text-[#4ac2a0] rounded-lg font-medium transition-all duration-200'
                                            }
                                            aria-disabled={currentPage === 1}
                                        />
                                    </PaginationItem>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                        (page) => (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    onClick={() => handlePageChange(page)}
                                                    isActive={currentPage === page}
                                                    className={
                                                        currentPage === page
                                                            ? 'bg-[#657ED4] dark:bg-[#5AD3AF] text-white hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] rounded-lg font-semibold'
                                                            : 'cursor-pointer text-[#657ED4] dark:text-[#5AD3AF] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition-all duration-200'
                                                    }
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ),
                                    )}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            className={
                                                currentPage === totalPages
                                                    ? 'pointer-events-none opacity-50'
                                                    : 'cursor-pointer text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#4a5da0] dark:hover:text-[#4ac2a0] rounded-lg font-medium transition-all duration-200'
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
        </div>
    );
}
