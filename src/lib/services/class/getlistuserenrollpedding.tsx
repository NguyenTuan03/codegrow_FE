import { get } from '@/lib/util/HttpRequest';

export const GetListUserEnrollpedding = async (page: number = 1, limit: number = 10) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authentication token is missing');
        }
        const res = await get(`/users/enroll-class/pending?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res || !res.metadata) {
            throw new Error('Invalid API response format');
        }
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
