'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { CreateComment } from '@/lib/services/course/createComment';
import { GetComment } from '@/lib/services/course/getComment';
import Comment from './Comment';

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
    replies?: Message[]; // Add replies field for nested structure
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
                            : 'text-gray-300 fill-gray-300'
                    }`}
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

    // Fetch comments from the API
    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication required');
            }

            const response = await GetComment(courseId);
            if (!response || !response.metadata) {
                throw new Error('Failed to fetch messages');
            }
            console.log('Fetched messages (raw):', response.metadata);

            // Map the API response to match the Message interface
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
                            fullName: 'Người dùng ẩn danh',
                            email: '',
                            role: '',
                            id: '',
                        },
                    replies: [], // Initialize replies array
                }),
            );

            // Transform flat messages into a nested structure
            const nestedMessages = buildCommentTree(mappedMessages);
            console.log('Nested messages:', nestedMessages);
            setMessages(nestedMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
            toast({
                title: 'Lỗi',
                description: 'Không thể tải bình luận',
                variant: 'destructive',
            });
        }
    };

    // Build a tree structure from flat messages
    const buildCommentTree = (flatMessages: Message[]): Message[] => {
        const messageMap: { [key: string]: Message } = {};
        const tree: Message[] = [];

        // Create a map of messages by ID
        flatMessages.forEach((message) => {
            message.replies = []; // Ensure replies array exists
            messageMap[message.id] = message;
        });

        // Build the tree by assigning replies to their parent
        flatMessages.forEach((message) => {
            if (message.parentComment) {
                const parent = messageMap[message.parentComment];
                if (parent) {
                    parent.replies!.push(message);
                } else {
                    // If parent is not found, treat as top-level comment
                    tree.push(message);
                }
            } else {
                // Top-level comment
                tree.push(message);
            }
        });

        // Sort comments by createdAt (newest first)
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

    // Post a new comment or reply
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
                title: 'Lỗi',
                description: 'Vui lòng nhập nội dung bình luận',
                variant: 'destructive',
            });
            return;
        }

        if (!isReply && commentRating === null) {
            toast({
                title: 'Lỗi',
                description: 'Vui lòng chọn đánh giá cho bình luận chính',
                variant: 'destructive',
            });
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication required');
            }

            console.log('📢 postMessage called with:', {
                isReply,
                parentCommentId,
                content,
                rating: commentRating,
            });

            await CreateComment({
                token,
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
                title: 'Thành công',
                description: isReply ? 'Đã gửi phản hồi' : 'Đã gửi bình luận',
            });
        } catch (error) {
            console.error('Error posting message:', error);
            toast({
                title: 'Lỗi',
                description: 'Không thể gửi bình luận',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    // Fetch messages on component mount or when courseId changes
    useEffect(() => {
        fetchMessages();
    }, [courseId]);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-[#EEF1EF] dark:border-[#657ED4]/30">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Thảo luận
            </h3>

            <div className="space-y-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <textarea
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-[#657ED4] focus:border-[#657ED4] dark:focus:ring-[#5AD3AF] dark:focus:border-[#5AD3AF] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        rows={3}
                        placeholder="Đặt câu hỏi hoặc tham gia thảo luận..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <div className="mt-3 flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Đánh giá:
                        </span>
                        <StarRating rating={rating} setRating={setRating} editable={true} />
                    </div>
                    <div className="mt-3 flex justify-end">
                        <Button
                            className="bg-[#657ED4] hover:bg-[#354065] text-white"
                            onClick={() => postMessage(false)}
                            disabled={loading}
                        >
                            {loading ? 'Đang gửi...' : 'Đăng bình luận'}
                        </Button>
                    </div>
                </div>

                <div className="space-y-4">
                    {messages.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400">Chưa có bình luận nào.</p>
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
        </div>
    );
}
