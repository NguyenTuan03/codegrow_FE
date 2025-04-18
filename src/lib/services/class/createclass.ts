// @/lib/services/class/createclass.ts
import httpRequest from '@/lib/util/HttpRequest';
import { CreateClassBodyType } from '@/schemaValidations/class.schema';

export const CreateClass = async ({
    token,
    courseId,
    title,
    description,
    maxStudents,
    schedule,
}: CreateClassBodyType) => {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('courseId', courseId || '');
        formData.append('description', description || '');
        formData.append('maxStudents', maxStudents.toString());
        formData.append('schedule[startDate]', schedule.startDate);
        formData.append('schedule[endDate]', schedule.endDate);
        formData.append('schedule[daysOfWeek]', schedule.daysOfWeek.join(','));
        formData.append('schedule[time]', schedule.time);

        const response = await httpRequest.post('/classrooms', formData, {
            headers: { Authorization: `Bearer ${token}` },
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
