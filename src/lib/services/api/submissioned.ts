import httpRequest from '@/lib/util/HttpRequest';

export const Submissioned = async (token: string) => {
    try {
        const res = await httpRequest.get(`/quizzes/submission`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
