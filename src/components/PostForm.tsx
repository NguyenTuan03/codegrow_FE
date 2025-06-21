'use client';

import { useParams } from 'next/navigation'; // Import useParams
import React, { useState, useRef } from 'react';
import { Paperclip, Send, Tag, X } from 'lucide-react';
import { CreatePost } from '@/lib/services/blog/createpost';
import { toast } from '@/components/ui/use-toast';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

// Main Post Form component
const PostForm: React.FC = () => {
    const { classId } = useParams<{ classId: string }>(); // Get classId from URL
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [attachment, setAttachment] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false); // State for modal visibility

    // Handle form reset
    const handleReset = () => {
        setTitle('');
        setContent('');
        setTags('');
        setAttachment(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        toast({
            title: 'Form Reset',
            description: 'Form has been reset.',
            variant: 'default',
            className: 'bg-[#5AD3AF] text-black font-medium',
        });
    };

    // Handle post submission
    const handlePost = async () => {
        // Validation
        if (!title.trim()) {
            toast({
                title: 'Missing Title',
                description: 'Please provide a title for your post.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
            return;
        }

        if (!content.trim() && !attachment) {
            toast({
                title: 'Missing Content',
                description: 'Please provide either content or an attachment.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
            return;
        }

        if (!classId) {
            toast({
                title: 'Missing Class',
                description: 'Class ID is required. Please ensure you are on a valid class page.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
            console.log('Validation Error - Missing classId:', { classId });
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            toast({
                title: 'Lỗi',
                description: 'Token không tồn tại. Vui lòng đăng nhập lại.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
            console.log('Validation Error - Missing token:', { token });
            return;
        }
        const tokenuser = JSON.parse(token);
        console.log('Token user parsed:', tokenuser);

        try {
            const response = await CreatePost({
                token: tokenuser,
                title: title.trim(),
                content: content.trim(),
                classId,
                tags: tags.trim() || undefined,
                attachments: attachment || undefined,
            });

            console.log('CreatePost Response Received:', response);
            toast({
                title: 'Success',
                description: 'Post created successfully!',
                variant: 'default',
                className: 'bg-[#5AD3AF] text-black font-medium',
            });

            // Reset form and close modal
            setTitle('');
            setContent('');
            setTags('');
            setAttachment(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            setOpen(false);
        } catch (error) {
            console.error('Failed to create post:', error);
        }
    };

    // Handle file attachment
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.size > 10 * 1024 * 1024) {
            toast({
                title: 'File Too Large',
                description: 'File size must be less than 10MB.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
            return;
        }
        console.log(
            'File selected:',
            file ? { name: file.name, size: file.size, type: file.type } : 'No file',
        );
        setAttachment(file || null);
    };

    return (
        <div className="mt-4">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-[#657ED4] dark:bg-[#5AD3AF] text-white rounded-lg flex items-center space-x-2 transition-colors duration-200 text-base font-medium cursor-pointer hover:bg-[#424c70] dark:hover:bg-[#4ac2a0] px-4 py-2">
                        <Paperclip className="w-5 h-5" />
                        <span>Create a Post</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-white dark:bg-gray-900 rounded-xl max-w-lg w-full p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-3 cursor-default">
                            <Paperclip className="w-6 h-6 text-[#657ED4] dark:text-[#5AD3AF]" />
                            Create a Post
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <input
                            type="text"
                            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-base cursor-text"
                            placeholder="Post title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-y text-base cursor-text"
                            rows={5}
                            placeholder="Share something with your class..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center space-x-2">
                                <Tag className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm cursor-text"
                                    placeholder="Tags (e.g., programming, javascript)"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-[#657ED4] dark:hover:text-[#5AD3AF] transition-colors duration-200">
                                    <Paperclip className="w-5 h-5" />
                                    <span className="text-sm font-medium">Attach file</span>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden cursor-pointer"
                                        onChange={handleFileChange}
                                    />
                                </label>
                                {attachment && (
                                    <span className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs cursor-default">
                                        {attachment.name}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <Button
                                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg flex items-center space-x-2 transition-colors duration-200 text-base font-medium cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
                                onClick={handleReset}
                            >
                                <X className="w-4 h-4" />
                                <span>Cancel</span>
                            </Button>
                            <Button
                                className={`px-4 py-2 bg-[#657ED4] dark:bg-[#5AD3AF] text-white rounded-lg flex items-center space-x-2 transition-colors duration-200 text-base font-medium cursor-pointer ${
                                    !title.trim() || (!content.trim() && !attachment)
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:bg-[#424c70] dark:hover:bg-[#4ac2a0]'
                                }`}
                                onClick={handlePost}
                                disabled={!title.trim() || (!content.trim() && !attachment)}
                            >
                                <Send className="w-4 h-4" />
                                <span>Post</span>
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PostForm;
