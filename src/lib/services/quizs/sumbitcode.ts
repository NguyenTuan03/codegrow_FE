import httpRequest from '@/lib/util/HttpRequest';

interface SubmitQuizParams {
    token: string;
    quizId: string;
    code: string; // Code submitted for the quiz
}

export const submitQuizCode = async ({ token, quizId, code }: SubmitQuizParams) => {
    try {
        const response = await httpRequest.post(
            `/quizzes/submit/code`,
            { quizId, code },
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        console.log('✅ Quiz submitted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error submitting quiz:', error);
        throw error;
    }
};
