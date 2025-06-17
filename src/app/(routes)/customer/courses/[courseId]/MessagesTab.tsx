'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { CreateComment } from '@/lib/services/course/createComment';
import { GetComment } from '@/lib/services/course/getComment';
import Comment from './Comment';
import { MessageCircle } from 'lucide-react';

// Define interfaces for better type safety
interface User {
    fullName: string;
    email: string;
    role: string;
    id: string;
}

interface Message {
    id: string;
    content: string;
    rating?: number;
    createdAt: string;
    parentComment?: string | null;
    user: User;
    replies?: Message[];
}

interface MessagesTabProps {
    courseId: string;
}

interface StarRatingProps {
    rating: number;
    setRating?: (rating: number) => void;
    editable?: boolean;
    size?: number;
}

function StarRating({ rating, setRating, editable = false, size = 20 }: StarRatingProps) {
    const stars = [1, 2, 3, 4, 5];
    return (
        <div className="flex gap-1">
            {stars.map((star) => (
                <svg
                    key={star}
                    className={`w-${size / 4} h-${size / 4} ${
                        star <= rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300 dark:text-gray-500 fill-gray-300 dark:fill-gray-500'
                    } ${editable ? 'cursor-pointer' : ''}`}
                    viewBox="0 0 24 24"
                    onClick={() => editable && setRating && setRating(star)}
                >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
            ))}
        </div>
    );
}

export default function MessagesTab({ courseId }: MessagesTabProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [rating, setRating] = useState(5);
    const [loading, setLoading] = useState(false);

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                toast({
                    title: 'Lỗi',
                    description: 'Token không tồn tại. Vui lòng đăng nhập lại.',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });

                return;
            }
            const tokenuser = JSON.parse(token);
            console.log('Token user:', tokenuser);

            const response = await GetComment(courseId);
            if (!response || !response.metadata) {
                throw new Error('Failed to fetch messages');
            }
            console.log('Fetched messages (raw):', response.metadata);

            const mappedMessages: Message[] = response.metadata.map(
                (comment: {
                    _id?: string;
                    id?: string;
                    content: string;
                    rating?: number;
                    createdAt: string;
                    parentComment?: string;
                    author?: User;
                    user?: User;
                }) => ({
                    id: comment._id ?? comment.id ?? '',
                    content: comment.content,
                    rating: comment.rating,
                    createdAt: comment.createdAt,
                    parentComment: comment.parentComment ?? null,
                    user: comment.author ??
                        comment.user ?? {
                            fullName: 'Anonymous User',
                            email: '',
                            role: '',
                            id: '',
                        },
                    replies: [],
                }),
            );

            const nestedMessages = buildCommentTree(mappedMessages);
            console.log('Nested messages:', nestedMessages);
            setMessages(nestedMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const buildCommentTree = (flatMessages: Message[]): Message[] => {
        const messageMap: { [key: string]: Message } = {};
        const tree: Message[] = [];

        flatMessages.forEach((message) => {
            message.replies = [];
            messageMap[message.id] = message;
        });

        flatMessages.forEach((message) => {
            if (message.parentComment) {
                const parent = messageMap[message.parentComment];
                if (parent) {
                    parent.replies!.push(message);
                } else {
                    tree.push(message);
                }
            } else {
                tree.push(message);
            }
        });

        const sortByDate = (a: Message, b: Message) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

        tree.sort(sortByDate);
        tree.forEach((message) => {
            if (message.replies) {
                message.replies.sort(sortByDate);
            }
        });

        return tree;
    };

    const postMessage = async (
        isReply: boolean,
        parentCommentId: string | null = null,
        replyContent?: string,
        replyRating?: number | null,
    ) => {
        const content = isReply && replyContent !== undefined ? replyContent : newMessage;
        const commentRating = isReply && replyRating !== undefined ? replyRating : rating;

        if (!content.trim()) {
            toast({
                title: 'Error',
                description: 'Please enter comment content',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
            return;
        }

        if (!isReply && commentRating === null) {
            toast({
                title: 'Error',
                description: 'Please select a rating for the main comment',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                toast({
                    title: 'Lỗi',
                    description: 'Token không tồn tại. Vui lòng đăng nhập lại.',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });

                return;
            }
            const tokenuser = JSON.parse(token);
            console.log('Token user:', tokenuser);

            console.log('📢 postMessage called with:', {
                isReply,
                parentCommentId,
                content,
                rating: commentRating,
            });

            await CreateComment({
                token: tokenuser,
                courseId,
                rating: commentRating ?? 0,
                comment: content,
                parentComment: parentCommentId,
            });

            if (!isReply) {
                setNewMessage('');
                setRating(5);
            }

            await fetchMessages();
            toast({
                title: 'Success',
                description: isReply
                    ? 'Reply submitted successfully'
                    : 'Comment submitted successfully',
                variant: 'default',
                className:
                    'bg-[#5AD3AF] dark:bg-[#5AD3AF] text-white dark:text-black font-semibold',
            });
        } catch (error) {
            console.error('Error posting message:', error);
            toast({
                title: 'Error',
                description: 'Failed to submit comment',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [courseId]);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 space-y-6">
            <h3 className="text-2xl font-semibold text-[#657ED4] dark:text-[#5AD3AF] flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-[#657ED4] dark:text-[#5AD3AF]" />
                Discussion
            </h3>

            {/* Comment Form */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                <Textarea
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] focus:border-[#657ED4] dark:focus:border-[#5AD3AF] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200"
                    rows={4}
                    placeholder="Ask a question or join the discussion..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <div className="mt-3 flex items-center gap-4">
                    <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                        Rating:
                    </span>
                    <StarRating rating={rating} setRating={setRating} editable={true} />
                </div>
                <div className="mt-4 flex justify-end">
                    <Button
                        className="bg-[#657ED4] cursor-pointer dark:bg-[#5AD3AF] hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] text-white rounded-full px-6 py-2 transition-all duration-200 shadow-sm"
                        onClick={() => postMessage(false)}
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Post Comment'}
                    </Button>
                </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
                {messages.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center font-medium">
                        No comments yet. Be the first to discuss!
                    </p>
                ) : (
                    messages.map((msg) => (
                        <Comment
                            key={msg.id}
                            msg={msg}
                            postMessage={postMessage}
                            loading={loading}
                            messages={messages}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
