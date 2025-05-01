import { get } from '@/lib/util/HttpRequest';

interface GetAllReviewParams {
    page?: number;
    limit?: number;
}

interface GetAllReviewResponse {
    metadata: {
        reviews: ReviewItem[];
        totalItems?: number; // Optional: Total number of reviews
        totalPages?: number; // Optional: Total number of pages
    };
}

interface ReviewItem {
    _id: string;
    comment: string;
    createdAt: string;
    mentor: {
        fullName: string;
    };
    rating: number;
}

export const GetAllReview = async ({ page = 1, limit = 10 }: GetAllReviewParams = {}) => {
    try {
        const token = localStorage.getItem('token');
        const response: GetAllReviewResponse = await get(`/classrooms/review/mentor`, {
            params: {
                page,
                limit,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        console.error('Error from GetAllReview API:', error);
        throw error instanceof Error ? error : new Error('Failed to fetch reviews');
    }
};
