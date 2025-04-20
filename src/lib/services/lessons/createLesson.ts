import httpRequest from '@/lib/util/HttpRequest';

interface CreateLessonParams {
    token: string;
    title: string;
    description: string;
    order: number;
}

export const CreateLesson = async ({ token, title, description, order }: CreateLessonParams) => {
    try {
        const response = await httpRequest.post(
            '/lesson',
            {
                title,
                description,
                order,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from CreateLesson API:', error);
        throw error;
    }
};
