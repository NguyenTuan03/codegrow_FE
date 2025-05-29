import httpRequest from '@/lib/util/HttpRequest';
import { CreateClassBody } from '@/schemaValidations/class.schema';
import { z } from 'zod';

type CreateClassFormBodyType = z.infer<typeof CreateClassBody>;

export const CreateClass = async (
    token: string,
    title: string,
    courseId: string,
    description: string,
    maxStudents: number,
    schedule: CreateClassFormBodyType['schedule'],
    linkMeet: string,
    imgUrl?: File,
) => {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('courseId', courseId);
        formData.append('description', description || '');
        formData.append('maxStudents', maxStudents.toString());
        formData.append('schedule[startDate]', schedule.startDate);
        formData.append('schedule[endDate]', schedule.endDate);
        // Send daysOfWeek as individual entries
        schedule.daysOfWeek.forEach((day) => {
            formData.append('schedule[daysOfWeek][]', day);
        });
        formData.append('schedule[time]', schedule.time);
        formData.append('linkMeet', linkMeet);
        if (imgUrl) {
            formData.append('imgUrl', imgUrl);
        }

        // Define a type for FormData entries
        const formDataEntries: { [key: string]: string | { name: string; size: number } } = {};
        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                // For File objects, log the name and size to avoid serialization issues
                formDataEntries[key] = { name: value.name, size: value.size };
            } else {
                formDataEntries[key] = value as string;
            }
        }
        console.log('FormData Entries:', JSON.stringify(formDataEntries, null, 2));

        const response = await httpRequest.post('/classrooms', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('CreateClass service: Error occurred:', {
            error,
        });
        throw error;
    }
};
