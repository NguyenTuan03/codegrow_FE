// lib/services/api/markquiz.ts
import httpRequest from '@/lib/util/HttpRequest';

interface MarkQuizParams {
    token: string;
    quizId: string;
    courseId: string;
}

export const MarkQuiz = async ({ token, quizId, courseId }: MarkQuizParams) => {
    try {
        const response = await httpRequest.post(
            '/users/progress/quizz-complete',
            {
                quizId,
                courseId,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return response;
    } catch (error) {
        console.error('Error marking quiz complete:', error);
        throw error;
    }
};
