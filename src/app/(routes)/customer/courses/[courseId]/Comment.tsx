'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

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

interface CommentProps {
    msg: Message;
    postMessage: (
        isReply: boolean,
        parentCommentId: string | null,
        replyContent?: string,
        replyRating?: number | null,
    ) => Promise<void>;
    loading: boolean;
    messages: Message[];
    depth?: number;
}

export default function Comment({ msg, postMessage, loading, messages, depth = 0 }: CommentProps) {
    const [isReplying, setIsReplying] = useState(false);
    const [replyMessage, setReplyMessage] = useState('');
    const [replyRating, setReplyRating] = useState<number | null>(null);

    const authorName = msg.user?.fullName || 'Anonymous User';
    const initials = authorName
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase();

    const handleReply = async () => {
        console.log('📢 Replying to comment with ID:', msg.id);
        if (!msg.id) {
            console.error('❌ Comment ID is missing!');
            toast({
                title: 'Error',
                description: 'Cannot submit reply: Invalid comment ID.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
            return;
        }

        await postMessage(true, msg.id, replyMessage, replyRating);
        setIsReplying(false);
        setReplyMessage('');
        setReplyRating(null);
    };

    return (
        <div className="space-y-4">
            <div
                className={`border border-gray-200 dark:border-gray-700 rounded-lg p-4 ${
                    depth > 0 ? `ml-${depth * 8}` : ''
                } bg-white dark:bg-gray-800`}
            >
                <div className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-800 dark:bg-gray-600 dark:text-gray-200 rounded-full w-10 h-10 flex items-center justify-center font-medium">
                        {initials || 'N/A'}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-base text-gray-800 dark:text-gray-200">
                                {authorName}
                            </h4>
                            <span className="text-xs text-gray-400 dark:text-gray-500">
                                {new Date(msg.createdAt).toLocaleString('en-US', {
                                    weekday: 'short',
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                })}
                            </span>
                        </div>
                        {msg.rating !== undefined && (
                            <div className="mt-1">
                                <StarRating rating={msg.rating} editable={false} size={16} />
                            </div>
                        )}
                        <p className="mt-1 text-gray-600 dark:text-gray-400">{msg.content}</p>
                        <div className="mt-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#4a5da0] dark:hover:text-[#4ac2a0] transition-colors duration-200"
                                onClick={() => {
                                    setIsReplying(!isReplying);
                                    setReplyMessage('');
                                    setReplyRating(null);
                                }}
                            >
                                {isReplying ? 'Cancel Reply' : 'Reply'}
                            </Button>
                        </div>
                        {isReplying && (
                            <div className="mt-3 border-t border-gray-200 dark:border-gray-700 pt-3">
                                <textarea
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] focus:border-[#657ED4] dark:focus:border-[#5AD3AF] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200"
                                    rows={2}
                                    placeholder="Write a reply..."
                                    value={replyMessage}
                                    onChange={(e) => setReplyMessage(e.target.value)}
                                />
                                <div className="mt-2 flex items-center gap-4">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Rating (optional):
                                    </span>
                                    <StarRating
                                        rating={replyRating ?? 0}
                                        setRating={(value) => setReplyRating(value)}
                                        editable={true}
                                    />
                                </div>
                                <div className="mt-2 flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        onClick={() => {
                                            setIsReplying(false);
                                            setReplyMessage('');
                                            setReplyRating(null);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] text-white transition-all duration-200"
                                        onClick={handleReply}
                                        disabled={loading}
                                    >
                                        {loading ? 'Submitting...' : 'Submit Reply'}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Render nested replies recursively */}
            {msg.replies && msg.replies.length > 0 && (
                <div className="space-y-4">
                    {msg.replies.map((reply) => (
                        <Comment
                            key={reply.id}
                            msg={reply}
                            postMessage={postMessage}
                            loading={loading}
                            messages={messages}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
