import { get } from '@/lib/util/HttpRequest';

export const getUser = async () => {
    try {
        const res = await get(`/users`); // Không cần truyền header

        if (!res || !res.metadata) {
            throw new Error('Invalid API response format');
        }

        return res;
    } catch (error) {
        console.error('❌ Error fetching users:', error);
        throw error; // Ném lỗi để xử lý ở nơi gọi hàm
    }
};
