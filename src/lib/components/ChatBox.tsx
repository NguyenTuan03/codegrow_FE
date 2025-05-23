'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownCircleIcon, Loader2, MessageCircle, SendIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatBoxProps {
    apiEndpoint: string;
}

export default function ChatBox({ apiEndpoint }: ChatBoxProps) {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [showChatIcon, setShowChatIcon] = useState(true);
    const chatIconRef = useRef<HTMLButtonElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const { messages, input, handleInputChange, handleSubmit, isLoading, stop, reload, error } =
        useChat({
            api: apiEndpoint,
            onResponse: (response) => {
                console.log('Stream response received:', response);
            },
            onError: (err) => {
                console.error('Stream error:', err);
            },
            onFinish: (message) => {
                console.log('Stream finished with message:', message);
            },
        });

    useEffect(() => {
        console.log('ChatBox mounted, apiEndpoint:', apiEndpoint);
        console.log('Current messages:', messages);
        if (error) console.log('Chat error:', error);
    }, [apiEndpoint, messages, error]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
        if (!isChatOpen) {
            setShowChatIcon(false);
        } else {
            setShowChatIcon(true);
        }
    };

    return (
        <>
            <AnimatePresence>
                {showChatIcon && (
                    <motion.div
                        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg z-[1000]"
                        initial={{ opacity: 0, scale: 0, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0, y: 100 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Button
                            ref={chatIconRef}
                            variant="ghost"
                            onClick={toggleChat}
                            size="icon"
                            className="rounded-full size-14 p-2 shadow-lg"
                        >
                            {!isChatOpen ? (
                                <MessageCircle size={24} />
                            ) : (
                                <ArrowDownCircleIcon size={24} />
                            )}
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        className="fixed bottom-16 right-4 bg-white shadow-lg rounded-lg z-[1000] w-[95%] md:w-[500px]"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Card className="border-2">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle>Chat with us</CardTitle>
                                <Button
                                    variant="ghost"
                                    onClick={toggleChat}
                                    size="sm"
                                    className="absolute top-2 right-2 px-2 py-0"
                                >
                                    <X size={16} />
                                    <span className="sr-only">Close chat</span>
                                </Button>
                            </CardHeader>

                            <CardContent>
                                <ScrollArea key={messages.length} className="h-[300px] pr-4">
                                    {messages?.length === 0 && (
                                        <div className="w-full mt-32 text-gray-500 items-center justify-center flex gap-3">
                                            No messages yet
                                        </div>
                                    )}
                                    {messages?.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
                                        >
                                            <div
                                                className={`inline-block p-4 rounded-lg ${
                                                    message.role === 'user'
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'bg-muted'
                                                }`}
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
                                                                    className="bg-gray-200 px-1 rounded"
                                                                >
                                                                    {children}
                                                                </code>
                                                            ) : (
                                                                <pre
                                                                    {...rest}
                                                                    className="bg-gray-200 p-2 rounded"
                                                                >
                                                                    <code className={className}>
                                                                        {children}
                                                                    </code>
                                                                </pre>
                                                            );
                                                        },
                                                        ul: ({ children }) => (
                                                            <ul className="list-disc ml-4">
                                                                {children}
                                                            </ul>
                                                        ),
                                                        ol: ({ children }) => (
                                                            <ol className="list-decimal ml-4">
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
                                        <div className="w-full items-center flex justify-center gap-3">
                                            <Loader2 className="animate-spin h-5 w-5 text-primary" />
                                            <button
                                                className="underline"
                                                type="button"
                                                onClick={() => stop()}
                                            >
                                                Abort
                                            </button>
                                        </div>
                                    )}
                                    {error && (
                                        <div className="w-full items-center flex justify-center gap-3">
                                            <div>Error: {error.message || 'An error occurred'}</div>
                                            <pre className="text-xs text-red-500">
                                                {JSON.stringify(error, null, 2)}
                                            </pre>
                                            <button
                                                className="underline"
                                                type="button"
                                                onClick={() => reload()}
                                            >
                                                Retry
                                            </button>
                                        </div>
                                    )}
                                    <div ref={scrollRef} />
                                </ScrollArea>
                            </CardContent>

                            <CardFooter>
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex w-full items-center justify-center gap-3"
                                >
                                    <Input
                                        value={input}
                                        onChange={handleInputChange}
                                        className="flex-1"
                                        placeholder="Type your message..."
                                    />
                                    <Button
                                        variant="default"
                                        className="mt-2 size-9"
                                        disabled={isLoading}
                                        size="icon"
                                    >
                                        <SendIcon className="size-4" />
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
