import { get } from '@/lib/util/HttpRequest';

interface Lesson {
    _id: string;
    title: string;
    content?: string;
    videoUrl?: string;
    videoKey?: string;
    quiz?: Quiz[];
    order: number;
    status: 'pending' | 'done';
}
interface Option {
    text: string;
    isCorrect: boolean;
}

interface TestCase {
    input: string;
    expectedOutput: string;
}
interface Quiz {
    _id: string;
    lesson: string;
    type: 'multiple_choice' | 'coding';
    questionText: string;
    explanation: string;
    options?: Option[];
    starterCode?: string;
    expectedOutput?: string;
    language?: string;
    testCases?: TestCase[];
}
interface ApiResponse {
    status: string;
    metadata: Lesson;
}

export const viewDetaiQuiz = async (id: string): Promise<ApiResponse> => {
    try {
        const token = localStorage.getItem('token');
        const res = await get(`/quizzes/${id}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
        });

        return res;
    } catch (error) {
        console.error('Error fetching lesson details:', error);
        throw error instanceof Error ? error : new Error('Failed to fetch lesson details');
    }
};
