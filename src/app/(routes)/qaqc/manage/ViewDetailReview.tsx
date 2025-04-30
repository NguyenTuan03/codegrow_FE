'use client';

import { useState, useEffect } from 'react';
import { get } from '@/lib/util/HttpRequest';

type Review = {
    _id: string;
    mentor: string;
    qaqc: {
        _id: string;
        email: string;
        role: string;
        fullName: string;
    };
    rating: number;
    comment: string;
    createdAt: string;
};

export const GetReviewsByMentorId = async (mentorId: string, token: string) => {
    try {
        const response = await get(`/classrooms/review/mentor/${mentorId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log('✅ Reviews API Response:', response);
        return response.metadata;
    } catch (error) {
        console.error('❌ Error from GetReviewsByMentorId API:', error);
        throw error instanceof Error ? error : new Error('Failed to fetch reviews');
    }
};

export function ViewDetailReview({ mentorId }: { mentorId: string }) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);

            try {
                const token = localStorage.getItem('token') || '';
                const reviews = await GetReviewsByMentorId(mentorId, token);
                setReviews(reviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setError('Failed to load reviews. Please try again.');
                setReviews([]);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [mentorId]);

    return (
        <div className="space-y-4">
            {loading && <p>Loading reviews...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && reviews.length > 0 ? (
                <ul className="space-y-4">
                    {reviews.map((review) => (
                        <li key={review._id} className="p-4 border rounded-md">
                            <p>
                                <strong>Comment:</strong> {review.comment}
                            </p>
                            <p>
                                <strong>Rating:</strong> {review.rating}/5
                            </p>
                            <p>
                                <strong>Reviewed by:</strong> {review.qaqc.fullName} (
                                {review.qaqc.email})
                            </p>
                            <p>
                                <strong>Created At:</strong>{' '}
                                {new Date(review.createdAt).toLocaleString()}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                !loading && !error && <p>No reviews found for this mentor.</p>
            )}
        </div>
    );
}
