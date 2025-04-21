import { post } from '@/lib/util/HttpRequest';

interface CreateQuizParams {
    token: string;
    lesson: string; // Lesson ID
    type: string; // Quiz type (e.g., "multiple_choice")
    questionText: string; // Question text
    options: {
        text: string;
        isCorrect: boolean;
    }[]; // Array of options
    starterCode?: string; // Optional starter code for coding quizzes
    expectedOutput?: string; // Optional expected output for coding quizzes
    language?: string; // Optional programming language for coding quizzes
    testCases?: {
        input: string;
        expectedOutput: string;
    }[]; // Optional test cases for coding quizzes
    explanation?: string; // Optional explanation for the quiz
}

export const CreateQuiz = async ({
    token,
    lesson,
    type,
    questionText,
    options,
    starterCode,
    expectedOutput,
    language,
    testCases,
    explanation,
}: CreateQuizParams) => {
    try {
        const response = await post(
            '/quizzes',
            {
                lesson,
                type,
                questionText,
                options,
                ...(starterCode && { starterCode }), // Only include if provided
                ...(expectedOutput && { expectedOutput }), // Only include if provided
                ...(language && { language }), // Only include if provided
                ...(testCases && { testCases }), // Only include if provided
                ...(explanation && { explanation }), // Only include if provided
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from CreateQuiz API:', error);
        throw error;
    }
};
