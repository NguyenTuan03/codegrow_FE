import httpRequest from '@/lib/util/HttpRequest';
interface ClassDetailResponse {
    message: string;
    status: number;
    metadata: ClassItem;
}
interface ClassItem {
    _id: string;
    title: string;
    course: Course;
    description: string;
    mentor: User;
    status: string;
    maxStudents: number;
    students: User[];
    schedule: Schedule;
    linkMeet?: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
interface User {
    _id: string;
    email: string;
    role: string;
    fullName: string;
}

interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: { _id: string; name: string };
    createdAt: string;
    author: {
        _id: string;
        fullName: string;
        role: string;
        email: string;
    };
}

interface Schedule {
    startDate: string;
    endDate: string;
    daysOfWeek: string[];
    time: string;
}
export const viewDetail = async (id: string): Promise<ClassDetailResponse> => {
    try {
        const res = await httpRequest.get(`/classrooms/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error fetching class details:', error);
        throw error;
    }
};
