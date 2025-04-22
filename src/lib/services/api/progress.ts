import httpRequest from '@/lib/util/HttpRequest';

export const GetProgress = async (token: string, courseId: string) => {
    try {
        const res = await httpRequest.get(`/users/${courseId}/progress`, {
            params: {
                courseId,
            },
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
