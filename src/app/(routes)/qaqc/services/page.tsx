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
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-3xl mx-auto space-y-6">
                <h2 className="text-3xl font-bold text-center">📨 Questions & Replies</h2>
                {questions.map((q) => (
                    <Card key={q.id}>
                        <CardContent className="space-y-4 pt-4">
                            <div>
                                <Label className="font-semibold mb-3">From</Label>
                                <Input value={`${q.name} (${q.email})`} readOnly />
                            </div>

                            <div>
                                <Label className="font-semibold mb-3">Question</Label>
                                <Textarea value={q.question} readOnly />
                            </div>

                            <div>
                                <Label className="font-semibold mb-3">Your Reply</Label>
                                <Textarea
                                    placeholder="Write your response..."
                                    value={q.reply}
                                    onChange={(e) => handleReplyChange(q.id, e.target.value)}
                                />
                            </div>

                            <div className="flex justify-end">
                                <Button onClick={() => handleSendReply(q.id)}>Send Reply</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
