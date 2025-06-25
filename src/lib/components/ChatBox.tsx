'use client';
// Auto scroll to bottom when messages change
// eslint-disable-next-line react-hooks/exhaustive-deps
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownCircleIcon, Loader2, MessageCircle, SendIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { chatAI } from '../services/api/aichatbox';

interface Message {
    content: string;
    role: 'user' | 'ai';
}

export default function ChatBox() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [showChatIcon, setShowChatIcon] = useState(true);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const chatIconRef = useRef<HTMLButtonElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        if (!input.trim()) return;

        // Add user message
        setMessages((prev) => [...prev, { content: input, role: 'user' }]);
        setIsLoading(true);

        try {
            const response = await chatAI(input);
            // response.metadata là câu trả lời AI trả về
            setMessages((prev) => [
                ...prev,
                { content: response?.metadata || 'No response from AI.', role: 'ai' },
            ]);
            setInput('');
        } catch {
            setError('Failed to get response from AI.');
        } finally {
            setIsLoading(false);
        }
    };

    const stop = () => {
        setIsLoading(false);
    };

    const reload = () => {
        setError(null);
    };

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
        if (!isChatOpen) {
            setShowChatIcon(false);
        } else {
            setShowChatIcon(true);
        }
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isLoading]);

    return (
        <>
            <AnimatePresence>
                {showChatIcon && (
                    <motion.div
                        className="fixed bottom-6 right-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-full shadow-xl z-[1000] hover:shadow-2xl transition-shadow duration-300"
                        initial={{ opacity: 0, scale: 0, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0, y: 100 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <Button
                            ref={chatIconRef}
                            variant="ghost"
                            onClick={toggleChat}
                            size="icon"
                            className="rounded-full size-16 p-3 focus:outline-none"
                        >
                            {!isChatOpen ? (
                                <MessageCircle size={28} />
                            ) : (
                                <ArrowDownCircleIcon size={28} />
                            )}
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        className="fixed bottom-24 right-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-[1000] w-[95%] max-w-[550px] max-h-[80vh]"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <Card className="w-full h-full border-0 rounded-xl overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between p-4 bg-gray-100 dark:bg-gray-800">
                                <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                    Chat with us
                                </CardTitle>
                                <Button
                                    variant="ghost"
                                    onClick={toggleChat}
                                    size="sm"
                                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <X size={20} />
                                    <span className="sr-only">Close chat</span>
                                </Button>
                            </CardHeader>

                            <CardContent className="p-4">
                                <ScrollArea className="h-[400px] pr-4">
                                    {messages.length === 0 && (
                                        <div className="w-full mt-20 text-gray-500 dark:text-gray-400 flex items-center justify-center text-lg font-medium">
                                            No messages yet
                                        </div>
                                    )}
                                    {messages.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`mb-6 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
                                        >
                                            <div
                                                className={`inline-block p-4 rounded-xl ${
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
                                                            const {
                                                                inline,
                                                                className,
                                                                children,
                                                                ...rest
                                                            } = props;
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
                                    ))}
                                    {isLoading && (
                                        <div className="w-full flex items-center justify-center gap-3 text-lg font-medium">
                                            <Loader2 className="animate-spin h-6 w-6 text-blue-600 dark:text-blue-400" />
                                            <span>Typing...</span>
                                            <button
                                                className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
                                                type="button"
                                                onClick={stop}
                                            >
                                                Abort
                                            </button>
                                        </div>
                                    )}
                                    {error && (
                                        <div className="w-full flex items-center justify-center gap-3 text-lg font-medium text-red-600 dark:text-red-400">
                                            <span>Error: {error}</span>
                                            <button
                                                className="underline hover:text-red-800 dark:hover:text-red-300"
                                                type="button"
                                                onClick={reload}
                                            >
                                                Retry
                                            </button>
                                        </div>
                                    )}
                                    <div ref={scrollRef} />
                                </ScrollArea>
                            </CardContent>

                            <CardFooter className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex w-full items-center gap-4"
                                >
                                    <Input
                                        value={input}
                                        onChange={handleInputChange}
                                        className="flex-1 p-3 text-lg rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-md placeholder-gray-500 dark:placeholder-gray-400"
                                        placeholder="Type your message..."
                                    />
                                    <Button
                                        variant="default"
                                        size="lg"
                                        className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all disabled:opacity-50"
                                        disabled={isLoading}
                                    >
                                        <SendIcon className="size-5" />
                                        <span className="sr-only">Send message</span>
                                    </Button>
                                </form>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
