// @/lib/services/course/getLessons.ts

import { get } from '@/lib/util/HttpRequest';

export const GetLessons = async (courseId: string) => {
    try {
        const response = await get(`/course/${courseId}/lessons`);

        return response;
    } catch (error) {
        console.error('Error from GetLessons API:', error);
        throw error instanceof Error ? error : new Error('Failed to fetch lessons');
    }
};
