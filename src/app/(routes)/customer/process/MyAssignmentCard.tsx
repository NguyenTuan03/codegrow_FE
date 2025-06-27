'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Submissioned } from '@/lib/services/api/submissioned';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Loader2, FileText } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Props {
    user: {
        _id: string;
    };
}

interface Submission {
    _id: string;
    quiz: string;
    user: string;
    isPassed: boolean;
    results: { questionId: string; answer: string; isCorrect: boolean }[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const QUIZ_NAMES: Record<string, string> = {
    '6806386a11646d230439c052': 'Targeting Audience',
    '68063a0111646d230439c062': 'User Persona Research',
};

export default function MyAssignmentCard({ user }: Props) {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleSubmission = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast({
                title: 'Error',
                description: 'Token not found. Please log in again.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });

            return;
        }
        const tokenuser = JSON.parse(token);

        try {
            setLoading(true);
            const response = await Submissioned(tokenuser);
            console.log('Response:', response);
            const userSubmissions = response.metadata.filter(
                (submission: Submission) => submission.user === user._id,
            );
            setSubmissions(userSubmissions);
        } catch (error) {
            console.error('Error fetching submissions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?._id) {
            handleSubmission();
        }
    }, [user]);

    const totalPages = Math.ceil(submissions.length / itemsPerPage);
    const currentItems = submissions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    return (
        <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <CardHeader className="p-4">
                <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-[#657ED4] dark:text-[#5AD3AF]" />
                    My Assignments
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <Loader2 className="h-8 w-8 animate-spin text-[#657ED4] dark:text-[#5AD3AF]" />
                    </div>
                ) : submissions.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                        No assignments submitted yet
                    </p>
                ) : (
                    <>
                        <div className="space-y-4">
                            {currentItems.map((submission) => (
                                <div
                                    key={submission._id}
                                    className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                                                {QUIZ_NAMES[submission.quiz] ||
                                                    `Quiz ${submission.quiz.slice(0, 4)}`}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Submitted on{' '}
                                                {new Date(
                                                    submission.createdAt,
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <Badge
                                            variant={
                                                submission.isPassed ? 'default' : 'destructive'
                                            }
                                            className={`rounded-full px-2 py-1 text-xs ${
                                                submission.isPassed
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                                    : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                            }`}
                                        >
                                            {submission.isPassed ? 'Passed' : 'Failed'}
                                        </Badge>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Score:{' '}
                                            {submission.results.filter((r) => r.isCorrect).length}/
                                            {submission.results.length}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <Pagination className="mt-6">
                                <PaginationContent>
                                    <PaginationItem>
                                        {currentPage > 1 && (
                                            <PaginationPrevious
                                                onClick={() =>
                                                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                                                }
                                                className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300"
                                            />
                                        )}
                                    </PaginationItem>
                                    <PaginationItem>
                                        <span className="px-4 text-gray-600 dark:text-gray-300">
                                            Page {currentPage} of {totalPages}
                                        </span>
                                    </PaginationItem>
                                    <PaginationItem>
                                        {currentPage < totalPages && (
                                            <PaginationNext
                                                onClick={() =>
                                                    setCurrentPage((prev) =>
                                                        Math.min(prev + 1, totalPages),
                                                    )
                                                }
                                                className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300"
                                            />
                                        )}
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
}
