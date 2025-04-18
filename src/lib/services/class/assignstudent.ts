// @/lib/services/class/assignstudent.ts
import { patch } from '@/lib/util/HttpRequest';

export const AssignStudent = async (token: string, classId: string, userId: string) => {
    try {
        const response = await patch(
            `/classrooms/${classId}/add-student`,
            { userId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            },
        );

        return response;
    } catch (error) {
        console.error('AssignStudent: Error occurred:', {
            error,
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
        });
        throw error;
    }
};
