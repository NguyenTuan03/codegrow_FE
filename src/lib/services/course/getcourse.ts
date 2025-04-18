import { get } from '@/lib/util/HttpRequest';

export const GetCourses = async () => {
    try {
        const res = await get('/course');
        if (!res || !res.metadata) {
            throw new Error('Invalid API response format');
        }

        return res;
    } catch (error) {
        console.log(error);
    }
};
