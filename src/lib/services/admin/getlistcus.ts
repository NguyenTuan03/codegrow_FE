import { get } from '@/lib/util/HttpRequest';

export const getPendingEnrollments = async () => {
    try {
        const res = await get('/users/enroll-class/pending');

        return res;
    } catch (error) {
        console.error('Error fetching pending enrollments:', error);
        throw error;
    }
};
