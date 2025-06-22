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
import ChatBox from '@/lib/components/ChatBox';

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
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
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
                        className:
                            'bg-[#657ED4] dark:bg-[#5AD3AF] text-white dark:text-black font-semibold',
                    });
                } catch (markError) {
                    console.error('Error marking quiz:', markError);
                }
            }

            toast({
                title: allCorrect ? 'Correct!' : 'Incorrect',
                description: allCorrect ? 'Well done!' : 'Try again!',
                variant: allCorrect ? 'default' : 'destructive',
                className: allCorrect
                    ? 'bg-[#657ED4] dark:bg-[#5AD3AF] text-white dark:text-black font-semibold'
                    : 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        } catch (error) {
            console.error('Error submitting quiz:', error);
            toast({
                title: 'Error',
                description: 'Failed to submit the quiz. Please try again.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-8xl mx-auto p-4 md:p-6 space-y-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <Button
                variant="ghost"
                className="flex cursor-pointer items-center gap-2 text-base text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#4a5da0] dark:hover:text-[#4ac2a0] transition-colors duration-200"
                onClick={() => router.back()}
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Lesson
            </Button>

            <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-[#657ED4] dark:text-[#5AD3AF]">
                        {quiz.questionText}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <Label className="text-xl font-medium text-gray-800 dark:text-gray-200">
                            Select your answers:
                        </Label>
                        <div className="space-y-3 ">
                            {quiz.options?.map((option: QuizOption, index: number) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-lg cursor-pointer border-2 text-base cursor-pointer transition-all
                                        ${
                                            selectedOptions.includes(option.text)
                                                ? 'border-[#657ED4]  bg-[#657ED4]/10 dark:border-[#5AD3AF] dark:bg-[#5AD3AF]/10'
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
                                    <div className="flex  items-center">
                                        <span className="flex-1 text-gray-800 dark:text-gray-200">
                                            {option.text}
                                        </span>
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
                            className="border-gray-300 cursor-pointer dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg px-6 py-2 transition-all duration-200 font-medium"
                        >
                            Clear
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="bg-[#657ED4] cursor-pointer dark:bg-[#5AD3AF] hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] text-white rounded-lg px-6 py-2 min-w-[120px] transition-all duration-200 font-medium"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <svg
                                        className="animate-spin h-4 w-4 text-white"
                                        viewBox="0 0 24 24"
                                    >
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
                            <Label className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                Explanation:
                            </Label>
                            <p className="mt-2 text-gray-700 dark:text-gray-300 font-medium">
                                {quiz.explanation}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
            {/* Add ChatBox with apiEndpoint */}
            <ChatBox apiEndpoint="/api/gemini" />
        </div>
    );
}
