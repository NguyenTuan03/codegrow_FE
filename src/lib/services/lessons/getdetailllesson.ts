import httpRequest from '@/lib/util/HttpRequest';

export const viewDetailLesson = async (id: string) => {
    try {
        const res = await httpRequest.get(`/lesson/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error fetching lesson details:', error);
        throw error;
    }
};
