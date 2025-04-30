// @/lib/services/course/getLessons.ts

import { get } from '@/lib/util/HttpRequest';

export const GetAllReview = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await get(`/classrooms/review/mentor`, {
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
