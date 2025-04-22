// @/lib/services/course/getLessons.ts

import { get } from '@/lib/util/HttpRequest';

export const GetQuiz = async (lessonId: string) => {
    try {
        const response = await get(`/quizzes/${lessonId}/lessons`);

        return response;
    } catch (error) {
        console.error('Error from GetQuiz API:', error);
        throw error instanceof Error ? error : new Error('Failed to fetch lessons');
    }
};
