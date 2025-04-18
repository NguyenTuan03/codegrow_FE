import { get } from '@/lib/util/HttpRequest';

export const GetClass = async () => {
    try {
        const res = await get('/classrooms');
        if (!res || !res.metadata) {
            throw new Error('Invalid API response format');
        }

        return res;
    } catch (error) {
        console.log(error);
    }
};
