'use client';

import React, { useEffect, useState } from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { GetAllReview } from '@/lib/services/qaqc/getAllReview';

interface ReviewItem {
    _id: string;
    comment: string;
    createdAt: string;
    mentor: {
        fullName: string;
    };
    rating: number;
}

export default function Page() {
    const [reviews, setReviews] = useState<ReviewItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await GetAllReview();
                console.log('Fetched reviews:', data);

                setReviews(data.metadata);
            } catch (error) {
                console.error('Failed to load reviews:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">History Review</h1>
            <p className="mb-6">This page allows you to review the history of QAQC activities.</p>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Reviewer</TableHead>
                            <TableHead>Comment</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Rating</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reviews.map((review) => (
                            <TableRow key={review._id}>
                                <TableCell>{review.mentor?.fullName || 'N/A'}</TableCell>
                                <TableCell>{review.comment}</TableCell>
                                <TableCell>
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>{review.rating}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
