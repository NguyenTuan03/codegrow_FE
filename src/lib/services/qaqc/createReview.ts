import httpRequest from '@/lib/util/HttpRequest';

interface CreateReviewParams {
    token: string;
    mentorId: string;
    rating: number;
    comment: string;
}

export const CreateReview = async ({ token, mentorId, rating, comment }: CreateReviewParams) => {
    try {
        const response = await httpRequest.post(
            '/classrooms/review/mentor',
            {
                mentorId,
                rating,
                comment,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from CreateReview API:', error);
        throw error;
    }
};
