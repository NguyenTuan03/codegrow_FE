import httpRequest from '@/lib/util/HttpRequest';
import { CreateClassBodyType } from '@/schemaValidations/class.schema';

export const CreateClass = async ({
    token,
    courseId,
    title,
    description,
    maxStudents,
    schedule,
    linkMeet, // Updated to linkMeet
}: CreateClassBodyType) => {
    try {
        const payload = {
            title,
            courseId,
            description,
            maxStudents,
            schedule: {
                startDate: schedule.startDate,
                endDate: schedule.endDate,
                daysOfWeek: schedule.daysOfWeek,
                time: schedule.time,
            },
            linkMeet, // Updated to linkMeet
        };

        const response = await httpRequest.post('/classrooms', payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('CreateClass service: Error occurred:', {
            error,
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
        });
        throw error;
    }
};
