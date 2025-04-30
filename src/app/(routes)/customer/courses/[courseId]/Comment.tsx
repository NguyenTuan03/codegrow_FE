import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface Message {
    id: string;
    content: string;
    rating?: number;
    createdAt: string;
    parentComment?: string;
    user?: {
        fullName: string;
        email: string;
        role: string;
        id: string;
    };
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

interface CommentProps {
    msg: Message;
    postMessage: (
        isReply: boolean,
        parentCommentId?: string,
        replyContent?: string,
        replyRating?: number | null,
    ) => Promise<void>;
    loading: boolean;
    messages: Message[];
}

export default function Comment({ msg, postMessage, loading, messages }: CommentProps) {
    const [isReplying, setIsReplying] = useState(false);
    const [replyMessage, setReplyMessage] = useState('');
    const [replyRating, setReplyRating] = useState<number | null>(null);

    const authorName = msg.user?.fullName || 'Người dùng ẩn danh';
    const initials = authorName
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase();

    const isReply = msg.parentComment && messages.some((m) => m.id === msg.parentComment);

    const handleReply = async () => {
        console.log('📢 Replying to comment with ID:', msg.id);
        if (!msg.id) {
            console.error('❌ Comment ID is missing!');
            toast({
                title: 'Lỗi',
                description: 'Không thể gửi phản hồi: ID bình luận không hợp lệ.',
                variant: 'destructive',
            });
            return;
        }

        await postMessage(true, msg.id, replyMessage, replyRating);
        setIsReplying(false);
        setReplyMessage('');
        setReplyRating(null);
    };

    return (
        <div
            className={`border border-gray-200 dark:border-gray-700 rounded-lg p-4 ${
                isReply ? 'ml-8' : ''
            }`}
        >
            <div className="flex items-start gap-3">
                <div className="bg-blue-100 text-blue-800 dark:bg-gray-600 dark:text-white rounded-full w-10 h-10 flex items-center justify-center font-medium">
                    {initials || 'N/A'}
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">
                            {authorName}
                        </h4>
                        <span className="text-xs text-gray-400">
                            {new Date(msg.createdAt).toLocaleString()}
                        </span>
                    </div>
                    {msg.rating && (
                        <div className="mt-1">
                            <StarRating rating={msg.rating} editable={false} size={16} />
                        </div>
                    )}
                    <p className="mt-1 text-gray-600 dark:text-gray-400">{msg.content}</p>
                    <div className="mt-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-[#657ED4] hover:text-[#354065]"
                            onClick={() => {
                                setIsReplying(!isReplying);
                                setReplyMessage('');
                                setReplyRating(null);
                            }}
                        >
                            {isReplying ? 'Hủy phản hồi' : 'Phản hồi'}
                        </Button>
                    </div>
                    {isReplying && (
                        <div className="mt-3 border-t border-gray-200 dark:border-gray-700 pt-3">
                            <textarea
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-[#657ED4] focus:border-[#657ED4] dark:focus:ring-[#5AD3AF] dark:focus:border-[#5AD3AF] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                rows={2}
                                placeholder="Viết phản hồi..."
                                value={replyMessage}
                                onChange={(e) => setReplyMessage(e.target.value)}
                            />
                            <div className="mt-2 flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Đánh giá (tùy chọn):
                                </span>
                                <StarRating
                                    rating={replyRating || 0}
                                    setRating={(value) => setReplyRating(value)}
                                    editable={true}
                                />
                            </div>
                            <div className="mt-2 flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setIsReplying(false);
                                        setReplyMessage('');
                                        setReplyRating(null);
                                    }}
                                >
                                    Hủy
                                </Button>
                                <Button
                                    size="sm"
                                    className="bg-[#657ED4] hover:bg-[#354065] text-white"
                                    onClick={handleReply}
                                    disabled={loading}
                                >
                                    {loading ? 'Đang gửi...' : 'Gửi phản hồi - Đăng phản hồi'}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
