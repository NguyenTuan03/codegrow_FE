'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Send, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { chatAIFeedback } from '@/lib/services/api/aifeedback';

interface Message {
    content: string;
    role: 'user' | 'ai';
}

interface ChatAIPageProps {
    onClose: () => void; // Hàm đóng page
}

export default function ChatAIPage({ onClose }: ChatAIPageProps) {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            toast({
                title: 'Error',
                description: 'Token not found. Please log in again.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
            return;
        }
        const tokenuser = JSON.parse(token as string);
        if (!input.trim() || !tokenuser) return;

        const userMessage: Message = { content: input, role: 'user' };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const response = await chatAIFeedback(input, tokenuser);
            console.log('check', response);
            if (response && response.metadata) {
                setMessages((prev) => [...prev, { content: response.metadata, role: 'ai' }]);
            } else {
                setError('No valid response from AI.');
            }
        } catch (err) {
            setError('Failed to get response from AI.');
            console.error('[11:40 AM +07, 27/06/2025] Error in chatAIFeedback:', err);
            toast({
                title: 'Lỗi',
                description: 'Không thể kết nối với AI',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearChat = () => {
        if (window.confirm('Are you sure you want to clear the chat history?')) {
            setMessages([]);
            onClose(); // Đóng page khi xóa lịch sử
        }
    };

    useEffect(() => {
        // Chỉ scroll khi có nội dung mới và không ảnh hưởng đến toàn bộ trang
        if (scrollRef.current && messages.length > 0) {
            scrollRef.current.scrollIntoView({ behavior: 'auto', block: 'end' });
        }
    }, [messages, isLoading]);

    return (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center overflow-hidden">
            <Card className="w-full max-w-4xl h-[90vh] border-0 rounded-xl shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between p-2 bg-gray-100 dark:bg-gray-800">
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        AI Learning Insights
                    </CardTitle>
                    <div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClearChat}
                            className="text-red-600 dark:text-red-400 mr-2 hover:text-red-800 dark:hover:text-red-300"
                        >
                            Clear History
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 p-1 rounded-full"
                        >
                            <X size={16} />
                            <span className="sr-only">Close</span>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-4 flex-1">
                    <ScrollArea className="h-full pr-4">
                        {messages.length === 0 ? (
                            <div className="w-full mt-20 text-gray-500 dark:text-gray-400 flex items-center justify-center text-lg font-medium">
                                No chat history yet
                            </div>
                        ) : (
                            messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`mb-6 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
                                >
                                    <div
                                        className={`inline-block p-3 rounded-xl ${
                                            message.role === 'user'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                                        } shadow-md`}
                                    >
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                code(
                                                    props: React.HTMLAttributes<HTMLElement> & {
                                                        inline?: boolean;
                                                        className?: string;
                                                        children?: React.ReactNode;
                                                    },
                                                ) {
                                                    const { inline, className, children, ...rest } =
                                                        props;
                                                    return inline ? (
                                                        <code
                                                            {...rest}
                                                            className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono"
                                                        >
                                                            {children}
                                                        </code>
                                                    ) : (
                                                        <pre
                                                            {...rest}
                                                            className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-sm font-mono overflow-x-auto"
                                                        >
                                                            <code className={className}>
                                                                {children}
                                                            </code>
                                                        </pre>
                                                    );
                                                },
                                                ul: ({ children }) => (
                                                    <ul className="list-disc ml-6 mt-2">
                                                        {children}
                                                    </ul>
                                                ),
                                                ol: ({ children }) => (
                                                    <ol className="list-decimal ml-6 mt-2">
                                                        {children}
                                                    </ol>
                                                ),
                                            }}
                                        >
                                            {message.content}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            ))
                        )}
                        {isLoading && (
                            <div className="w-full flex items-center justify-center gap-3 text-lg font-medium">
                                <Loader2 className="animate-spin h-6 w-6 text-blue-600 dark:text-blue-400" />
                                <span className="text-gray-700 dark:text-gray-300">Loading...</span>
                            </div>
                        )}
                        {error && (
                            <div className="w-full flex items-center justify-center gap-3 text-lg font-medium text-red-600 dark:text-red-400">
                                <span>Error: {error}</span>
                                <button
                                    className="underline hover:text-red-800 dark:hover:text-red-300"
                                    type="button"
                                    onClick={() => setError(null)}
                                >
                                    Retry
                                </button>
                            </div>
                        )}
                        <div ref={scrollRef} />
                    </ScrollArea>
                </CardContent>
                <CardFooter className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
                        <Input
                            value={input}
                            onChange={handleInputChange}
                            className="flex-1 p-2 text-md rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-md placeholder-gray-500 dark:placeholder-gray-400"
                            placeholder="Ask about your learning progress..."
                        />
                        <Button
                            variant="default"
                            size="sm"
                            className="p-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg shadow-md disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin h-4 w-4" />
                            ) : (
                                <>
                                    <Send size={16} />
                                    <span className="sr-only">Send message</span>
                                </>
                            )}
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    );
}
