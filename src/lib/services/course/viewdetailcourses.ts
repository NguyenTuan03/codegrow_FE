import httpRequest from '@/lib/util/HttpRequest';

export const viewDetailCourses = async (id: string) => {
    try {
        const res = await httpRequest.get(`/course/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error fetching course details:', error);
        throw error;
    }
};
