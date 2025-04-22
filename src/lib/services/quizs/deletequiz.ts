import httpRequest from '@/lib/util/HttpRequest';

export const DeleteQuiz = async (token: string, quizId: string) => {
    try {
        const response = await httpRequest.delete(`/quizzes/${quizId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log('✅ Quiz deleted successfully:', response.data);
        return response;
    } catch (error) {
        console.error('❌ Error deleting quiz:', error);
        throw error;
    }
};
