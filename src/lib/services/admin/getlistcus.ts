import { get } from '@/lib/util/HttpRequest';
interface Enrollment {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    note?: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
    updatedAt: string;
}

interface EnrollmentResponse {
    success: boolean;
    message?: string;
    metadata: {
        enrollments: Enrollment[];
        total: number;
    };
}

export const getPendingEnrollments = async (): Promise<EnrollmentResponse> => {
    try {
        const res = await get('/users/enroll-class/pending');

        return res;
    } catch (error) {
        console.error('Error fetching pending enrollments:', error);
        throw error;
    }
};
