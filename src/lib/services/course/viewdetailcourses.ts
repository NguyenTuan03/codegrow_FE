import httpRequest from '@/lib/util/HttpRequest';
// interface CoursesDetailResponse {
//     message: string;
//     status: number;
//     metadata: Course;
// }

// interface Course {
//     _id: string;
//     title: string;
//     description: string;
//     price: number;
//     category: string;
//     createdAt: string;
//     author: string;
// }

export const viewDetailCourses = async (id: string) => {
    try {
        const res = await httpRequest.get(`/course/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error fetching course details:', error);
        throw error;
    }
};
