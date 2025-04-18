import httpRequest from '@/lib/util/HttpRequest';

export const UpdateClass = async (
    token: string,
    classId: string,
    title: string,
    course: string, // Changed from courseId to course
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
) => {
    try {
        const response = await httpRequest.put(
            `/classrooms/${classId}`,
            {
                title,
                course, // Changed from courseId to course
                mentor,
                description,
                maxStudents,
                status,
                schedule,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from UpdateClass API:', error);
        throw error;
    }
};
