// @/lib/services/course/getReviews.ts

import { get } from '@/lib/util/HttpRequest';

export const GetReviewsByMentorId = async (mentorId: string, token: string) => {
    try {
        const response = await get(`/classrooms/review/mentor?mentorId=${mentorId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log('✅ Reviews API Response:', response);
        return response.data; // Adjust based on your API response structure
    } catch (error) {
        console.error('❌ Error from GetReviewsByMentorId API:', error);
        throw error instanceof Error ? error : new Error('Failed to fetch reviews');
    }
};
