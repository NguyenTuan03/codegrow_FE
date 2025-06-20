'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import QuizCode from './QuizCode';
import { Loader2 } from 'lucide-react';
import { viewDetaiQuiz } from '@/lib/services/quizs/getquizdetail';
import QuizChoice from '@/app/(routes)/customer/courses/[courseId]/[lessonid]/[quizId]/QuizChoice';

interface QuizOption {
    text: string;
    isCorrect: boolean;
}

interface Quiz {
    _id: string;
    type: 'multiple_choice' | 'code';
    questionText: string;
    options: QuizOption[];
    explanation?: string;
}

export default function QuizPage() {
    const params = useParams();
    const quizId = params.quizId as string;

    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await viewDetaiQuiz(quizId);
                const metadata = response.metadata as unknown;
                if (
                    metadata &&
                    typeof metadata === 'object' &&
                    '_id' in metadata &&
                    'type' in metadata &&
                    'questionText' in metadata &&
                    'options' in metadata
                ) {
                    const quizData = metadata as Quiz;
                    setQuiz({
                        _id: quizData._id,
                        type: quizData.type,
                        questionText: quizData.questionText,
                        options: quizData.options,
                        explanation: quizData.explanation,
                    });
                } else {
                    console.error('Invalid quiz data structure:', metadata);
                }
            } catch (error) {
                console.error('Failed to fetch quiz:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [quizId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <Loader2 className="h-8 w-8 animate-spin text-[#657ED4] dark:text-[#5AD3AF]" />
            </div>
        );
    }

    if (!quiz) {
        return (
            <div className="text-center text-gray-600 dark:text-gray-400 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 font-medium">
                Quiz not found.
            </div>
        );
    }

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mt-6">
            {quiz.type === 'multiple_choice' ? (
                <QuizChoice quiz={quiz} />
            ) : (
                <QuizCode quiz={quiz} />
            )}
        </div>
    );
}
