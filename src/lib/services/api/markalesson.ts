import httpRequest from '@/lib/util/HttpRequest';

export const MarkLesson = async (token: string, lessonId: string, courseId: string) => {
    try {
        const response = await httpRequest.post(
            '/users/progress/lesson-complete',
            {
                lessonId,
                courseId,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from CreateUser API:', error);
        throw error;
    }
};
