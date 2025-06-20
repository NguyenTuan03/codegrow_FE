import { get } from '@/lib/util/HttpRequest';

export const getUser = async (page: number = 1, limit: number = 100) => {
    try {
        const res = await get(`/users?page=${page}&limit=${limit}`); // Add page and limit as query parameters

        if (!res || !res.metadata) {
            throw new Error('Invalid API response format');
        }

        return res;
    } catch (error) {
        console.error('❌ Error fetching users:', error);
        throw error; // Re-throw error for handling at the caller
    }
};
