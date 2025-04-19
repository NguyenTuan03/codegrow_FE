// lib/services/course/enrollcourse.ts
import { post } from '@/lib/util/HttpRequest';

export const EnrollCourse = async ({ courseId, token }: { courseId: string; token: string }) => {
    try {
        const response = await post(
            '/users/enroll',
            { courseId },
            { headers: { Authorization: `Bearer ${token}` } },
        );

        return response;
    } catch (error) {
        console.error('Error from EnrollCourse API:', error);
        throw error;
    }
};
