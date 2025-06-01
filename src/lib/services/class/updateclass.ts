import httpRequest from '@/lib/util/HttpRequest';

export const UpdateClass = async (
    token: string,
    classId: string,
    title: string,
    course: string,
    mentor: string,
    description: string,
    maxStudents: number,
    status: string,
    schedule: {
        startDate: string;
        endDate: string;
        daysOfWeek: string[];
        time: string;
    },
    linkMeet: string,
    imgUrl?: File,
) => {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('course', course);
        formData.append('mentor', mentor);
        formData.append('description', description);
        formData.append('maxStudents', maxStudents.toString());
        formData.append('status', status);
        formData.append('schedule[startDate]', schedule.startDate);
        formData.append('schedule[endDate]', schedule.endDate);
        schedule.daysOfWeek.forEach((day) => {
            formData.append('schedule[daysOfWeek][]', day);
        });
        formData.append('schedule[time]', schedule.time);
        formData.append('linkMeet', linkMeet);
        if (imgUrl) {
            formData.append('imgUrl', imgUrl);
        }

        // Log FormData entries for debugging
        const formDataEntries: { [key: string]: string | { name: string; size: number } } = {};
        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                formDataEntries[key] = { name: value.name, size: value.size };
            } else {
                formDataEntries[key] = value;
            }
        }
        console.log('FormData Entries:', JSON.stringify(formDataEntries, null, 2));

        const response = await httpRequest.put(`/classrooms/${classId}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from UpdateClass API:', error);
        throw error;
    }
};
