import { get } from '@/lib/util/HttpRequest';

export const GetAllCategory = async (page: number = 1, limit: number = 6) => {
    try {
        const token = localStorage.getItem('token');
        const response = get('/category', {
            params: { page, limit },
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
        });

        return response;
    } catch (error) {
        console.error('Lỗi từ API GetAllCategory:', error);

        throw error;
    }
};
