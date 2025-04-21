// @/lib/services/lessons/viewDetailLesson.ts
import httpRequest from '@/lib/util/HttpRequest';

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
    metadata: Lesson;
}

export const viewDetailLesson = async (id: string): Promise<ApiResponse> => {
    try {
        const token = localStorage.getItem('token');
        const res = await httpRequest.get(`/lessons/${id}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
        });

        if (res.data.status !== 'success') {
            throw new Error('Failed to fetch lesson details');
        }

        return res.data;
    } catch (error) {
        console.error('Error fetching lesson details:', error);
        throw error instanceof Error ? error : new Error('Failed to fetch lesson details');
    }
};
