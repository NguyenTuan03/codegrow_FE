import httpRequest from '@/lib/util/HttpRequest';

export const GetComment = async (id: string) => {
    try {
        const res = await httpRequest.get(`/course/${id}/comment`);
        return res.data;
    } catch (error) {
        console.error('Error fetching comment details:', error);
        throw error;
    }
};
