'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { submitQuizChoice } from '@/lib/services/quizs/submitmc';
import { MarkQuiz } from '@/lib/services/api/markquiz';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QuizOption {
    text: string;
    isCorrect: boolean;
}

interface Quiz {
    _id: string;
    questionText: string;
    options: QuizOption[];
    explanation?: string;
}

interface QuizChoiceProps {
    quiz: Quiz;
}

export default function QuizChoice({ quiz }: QuizChoiceProps) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as string;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOptionSelect = (optionText: string) => {
        setSelectedOptions((prev) => {
            if (prev.includes(optionText)) {
                return prev.filter((opt) => opt !== optionText);
            } else {
                return [...prev, optionText];
            }
        });
        setSubmitted(false);
    };

    const handleSubmit = async () => {
        if (selectedOptions.length === 0) {
            toast({
                title: 'Error',
                description: 'Please select at least one answer',
                variant: 'destructive',
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('token') || '';
            const quizId = quiz._id;

            await submitQuizChoice({ token, quizId, selectedOptions });

            const correctOptions = quiz.options
                .filter((opt) => opt.isCorrect)
                .map((opt) => opt.text);

            const allCorrect =
                selectedOptions.every((opt) => correctOptions.includes(opt)) &&
                correctOptions.every((opt) => selectedOptions.includes(opt));

            setSubmitted(true);

            if (allCorrect && courseId) {
                try {
                    const res = await MarkQuiz({ token, quizId: quiz._id, courseId });
                    console.log('Quiz marked as complete successfully!', res);

                    toast({
                        title: 'Quiz Completed!',
                        description: 'This quiz has been marked as complete.',
                        className: 'bg-green-500 text-white',
                    });
                } catch (markError) {
                    console.error('Error marking quiz:', markError);
                }
            }

            toast({
                title: allCorrect ? 'Correct!' : 'Incorrect',
                description: allCorrect ? 'Well done!' : 'Try again!',
                variant: allCorrect ? 'default' : 'destructive',
            });
        } catch (error) {
            console.error('Error submitting quiz:', error);
            toast({
                title: 'Error',
                description: 'Failed to submit the quiz. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-6">
            <Button
                variant="ghost"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                onClick={() => router.back()}
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Lesson
            </Button>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-[#657ED4] dark:text-[#5AD3AF]">
                        {quiz.questionText}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <Label className="text-lg font-medium">Select your answers:</Label>
                        <div className="space-y-3">
                            {quiz.options?.map((option: QuizOption, index: number) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all
                                        ${
                                            selectedOptions.includes(option.text)
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                                                : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                                        }
                                        ${
                                            submitted && option.isCorrect
                                                ? 'bg-green-50 dark:bg-green-900/30 border-green-500'
                                                : ''
                                        }
                                        ${
                                            submitted &&
                                            !option.isCorrect &&
                                            selectedOptions.includes(option.text)
                                                ? 'bg-red-50 dark:bg-red-900/30 border-red-500'
                                                : ''
                                        }
                                    `}
                                    onClick={() => handleOptionSelect(option.text)}
                                >
                                    <div className="flex items-center">
                                        <span className="flex-1">{option.text}</span>
                                        {submitted && option.isCorrect && (
                                            <span className="ml-2 text-green-600 dark:text-green-400">
                                                ✓
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSelectedOptions([]);
                                setSubmitted(false);
                            }}
                            disabled={isSubmitting}
                        >
                            Clear
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="bg-blue-600 hover:bg-blue-700 min-w-[120px]"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Submitting...
                                </span>
                            ) : (
                                'Submit'
                            )}
                        </Button>
                    </div>

                    {submitted && (
                        <div
                            className={`p-4 rounded-lg border-2 ${
                                selectedOptions.every(
                                    (opt) =>
                                        quiz.options.find((o: QuizOption) => o.text === opt)
                                            ?.isCorrect,
                                ) &&
                                quiz.options
                                    .filter((opt: QuizOption) => opt.isCorrect)
                                    .every((opt) => selectedOptions.includes(opt.text))
                                    ? 'bg-green-100 dark:bg-green-900/30 border-green-500'
                                    : 'bg-red-100 dark:bg-red-900/30 border-red-500'
                            }`}
                        >
                            <div className="font-medium">
                                {selectedOptions.every(
                                    (opt) =>
                                        quiz.options.find((o: QuizOption) => o.text === opt)
                                            ?.isCorrect,
                                ) &&
                                quiz.options
                                    .filter((opt: QuizOption) => opt.isCorrect)
                                    .every((opt) => selectedOptions.includes(opt.text)) ? (
                                    <span className="text-green-800 dark:text-green-200">
                                        ✓ All correct! Well done!
                                    </span>
                                ) : (
                                    <span className="text-red-800 dark:text-red-200">
                                        ✗ Not all answers are correct. Please try again.
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {quiz.explanation && submitted && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <Label className="text-lg font-medium">Explanation:</Label>
                            <p className="mt-2 text-gray-700 dark:text-gray-300">
                                {quiz.explanation}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
