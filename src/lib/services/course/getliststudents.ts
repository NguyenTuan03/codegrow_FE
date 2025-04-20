import httpRequest from '@/lib/util/HttpRequest';

export const GetListStudents = async (id: string) => {
    try {
        const res = await httpRequest.get(`/course/${id}/students`);
        return res.data;
    } catch (error) {
        console.error('Error fetching course students:', error);
        throw error;
    }
};
