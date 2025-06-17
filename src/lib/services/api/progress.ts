// src/lib/services/api/progress.ts
import httpRequest from '@/lib/util/HttpRequest';
import { AxiosError } from 'axios';

export const GetProgress = async (token: string, userId: string, courseId: string) => {
    try {
        const res = await httpRequest.get(`/users/${userId}/progress`, {
            params: {
                userId,
                courseId,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || 'Không thể tải tiến độ khóa học.');
        }
        throw new Error('Đã xảy ra lỗi không xác định khi tải tiến độ.');
    }
};
