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
import { Loader2 } from 'lucide-react';

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
    // Thêm các quiz khác tại đây
};

export default function MyAssignmentCard({ user }: Props) {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleSubmission = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found');
            return;
        }

        try {
            setLoading(true);
            const response = await Submissioned(token);
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

    // Phân trang
    const totalPages = Math.ceil(submissions.length / itemsPerPage);
    const currentItems = submissions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg">My Assignments</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    </div>
                ) : submissions.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No assignments submitted yet</p>
                ) : (
                    <>
                        <div className="space-y-4">
                            {currentItems.map((submission) => (
                                <div
                                    key={submission._id}
                                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-medium">
                                                {QUIZ_NAMES[submission.quiz] ||
                                                    `Quiz ${submission.quiz.slice(0, 4)}`}
                                            </h3>
                                            <p className="text-sm text-gray-500">
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
                                        >
                                            {submission.isPassed ? 'Passed' : 'Failed'}
                                        </Badge>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm">
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
                                            />
                                        )}
                                    </PaginationItem>
                                    <PaginationItem>
                                        <span className="px-4">
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
