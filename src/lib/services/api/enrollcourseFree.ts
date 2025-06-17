import httpRequest from '@/lib/util/HttpRequest';
interface enrollcoursefree {
    token: string | null;

    course: {
        _id: string;
    };
}
export const enrollCourseFree = async ({ token, course }: enrollcoursefree) => {
    try {
        const response = await httpRequest.post(
            '/users/enroll-free',
            {
                courseId: course._id,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response;
    } catch (error) {
        console.error('Error enrolling in free course:', error);
        throw error;
    }
};
