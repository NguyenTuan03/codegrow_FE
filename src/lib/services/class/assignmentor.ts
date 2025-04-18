// @/lib/services/class/assignstudent.ts
import { patch } from '@/lib/util/HttpRequest';

export const AssignMentor = async (token: string, classId: string, userId: string) => {
    try {
        const response = await patch(
            `/classrooms/${classId}/assign-mentor`,
            { userId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response;
    } catch (error) {
        console.error('AssignMentor: Error occurred:', {
            error,
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
        });
        throw error;
    }
};
