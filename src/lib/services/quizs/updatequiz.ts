import { put } from '@/lib/util/HttpRequest';

interface UpdateQuizParams {
    token: string;
    id: string; // Quiz ID
    questionText: string;
    options: {
        text: string;
        isCorrect: boolean;
    }[]; // Array of options
    starterCode?: string; // Optional starter code for coding quizzes
    explanation?: string; // Optional explanation for the quiz
    testCases?: {
        input: string;
        expectedOutput: string;
    }[]; // Optional test cases for coding quizzes
    language?: string; // Optional programming language for coding quizzes
}

export const UpdateQuiz = async ({
    token,
    id,
    questionText,
    options,
    starterCode,
    explanation,
    testCases,
    language,
}: UpdateQuizParams) => {
    try {
        const response = await put(
            `/quizzes/${id}`,
            {
                questionText,
                options,
                ...(starterCode && { starterCode }), // Only include if provided
                ...(explanation && { explanation }), // Only include if provided
                ...(testCases && { testCases }), // Only include if provided
                ...(language && { language }), // Only include if provided
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from UpdateQuiz API:', error);
        throw error;
    }
};
