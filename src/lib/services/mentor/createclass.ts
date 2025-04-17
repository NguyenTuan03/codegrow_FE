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

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from CreateClass API:', error);
        throw error;
    }
};
