import { get } from '@/lib/util/HttpRequest';

export const GetCourses = async (page: number = 1, limit: number = 100) => {
    try {
        const response = get(`/course?page=${page}&limit=${limit}`);

        return response; // Phản hồi: { message: string, status: number, metadata: { courses: Course[], page: number, totalPages: number } }
    } catch (error) {
        console.error('Lỗi từ API GetCourses:', error);

        throw error;
    }
};
