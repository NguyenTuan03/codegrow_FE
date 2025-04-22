import httpRequest from '@/lib/util/HttpRequest';

interface SubmitQuizParams {
    token: string;
    quizId: string;
    selectedOptions: string[]; // Now accepts array of strings
}

export const submitQuizChoice = async ({ token, quizId, selectedOptions }: SubmitQuizParams) => {
    try {
        console.log('Submitting quiz with ID:', quizId);
        const response = await httpRequest.post(
            `/quizzes/submit/mc`,
            { quizId, selectedOptions }, // Send array of selected options
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
