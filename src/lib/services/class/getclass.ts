import { get } from '@/lib/util/HttpRequest';

export const GetClass = async (page: number = 1, limit: number = 6) => {
    try {
        const res = await get(`/classrooms?page=${page}&limit=${limit}`);
        if (!res || !res.metadata) {
            throw new Error('Invalid API response format');
        }

        return res;
    } catch (error) {
        console.log(error);
    }
};
