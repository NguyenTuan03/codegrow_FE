'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type Question = {
    id: number;
    name: string;
    email: string;
    question: string;
    reply: string;
};

export default function Page() {
    const [questions, setQuestions] = useState<Question[]>([
        {
            id: 1,
            name: 'Bách',
            email: 'bach@example.com',
            question: 'I do not know',
            reply: '',
        },
        {
            id: 2,
            name: 'Mentor Linh',
            email: 'linh@example.com',
            question: 'I do not know reactjs',
            reply: '',
        },
    ]);

    const handleReplyChange = (id: number, text: string) => {
        setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, reply: text } : q)));
    };

    const handleSendReply = (id: number) => {
        const q = questions.find((q) => q.id === id);
        if (q) {
            console.log('Sending reply to:', q.email, '\nMessage:', q.reply);
            alert(`Reply sent to ${q.name}: "${q.reply}"`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4 transition-colors duration-300">
            <div className="max-w-3xl mx-auto space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
                    📨 Questions & Replies
                </h2>
                {questions.map((q) => (
                    <Card key={q.id} className="bg-white dark:bg-gray-800 shadow-md">
                        <CardContent className="space-y-4 pt-4 text-gray-800 dark:text-gray-200">
                            <div>
                                <Label className="font-semibold mb-3">From</Label>
                                <Input
                                    value={`${q.name} (${q.email})`}
                                    readOnly
                                    className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                />
                            </div>

                            <div>
                                <Label className="font-semibold mb-3">Question</Label>
                                <Textarea
                                    value={q.question}
                                    readOnly
                                    className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                />
                            </div>

                            <div>
                                <Label className="font-semibold mb-3">Your Reply</Label>
                                <Textarea
                                    placeholder="Write your response..."
                                    value={q.reply}
                                    onChange={(e) => handleReplyChange(q.id, e.target.value)}
                                    className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                />
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    onClick={() => handleSendReply(q.id)}
                                    className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
                                >
                                    Send Reply
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
