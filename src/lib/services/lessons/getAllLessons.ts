// @/lib/services/course/getLessons.ts
import axios from 'axios';

interface Lesson {
    _id: string;
    title: string;
    content?: string;
    videoUrl?: string;
    videoKey?: string;
    quiz?: string[];
    order: number;
}

interface ApiResponse {
    status: string;
    metadata: {
        lessons: Lesson[];
        page: number;
        totalPages: number;
        totalCount: number;
    };
}

export const GetLessons = async (
    courseId: string,
    page: number = 1,
    limit: number = 8,
): Promise<ApiResponse> => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/courses/${courseId}/lessons`, {
            params: { page, limit },
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
            withCredentials: true,
        });

        if (response.data.status !== 'success') {
            throw new Error('Failed to fetch lessons');
        }

        return response.data;
    } catch (error) {
        console.error('Error from GetLessons API:', error);
        throw error instanceof Error ? error : new Error('Failed to fetch lessons');
    }
};
