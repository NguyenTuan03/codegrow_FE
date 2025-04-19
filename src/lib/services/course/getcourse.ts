import { get } from '@/lib/util/HttpRequest';

export const GetCourses = async (page: number = 1, limit: number = 6) => {
    try {
        const token = localStorage.getItem('token');
        const response = get('/course?expand=author', {
            params: { page, limit },
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
        });

        return response; // Phản hồi: { message: string, status: number, metadata: { courses: Course[], page: number, totalPages: number } }
    } catch (error) {
        console.error('Lỗi từ API GetCourses:', error);

        throw error;
    }
};
