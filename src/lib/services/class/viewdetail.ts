import httpRequest from '@/lib/util/HttpRequest';

export const viewDetail = async (id: string) => {
    try {
        const res = await httpRequest.get(`/classrooms/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
