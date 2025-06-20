'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Send, Tag, X } from 'lucide-react';
import { CreatePost } from '@/lib/services/blog/createpost';
import { GetCourses } from '@/lib/services/course/getcourse';
import { toast } from '@/components/ui/use-toast';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

// Interface for a course (based on typical GetCourses response)
interface Course {
    _id: string;
    title: string;
}

// Main Post Form component
const PostForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [attachment, setAttachment] = useState<File | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);
    const [courseId, setCourseId] = useState<string>(''); // State for selected course ID
    const [courseLoading, setCourseLoading] = useState(false); // State for loading courses
    const [open, setOpen] = useState(false); // State for modal visibility
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fetch courses when component mounts
    const fetchCourses = async () => {
        try {
            setCourseLoading(true);
            const data = await GetCourses();

            if (data?.metadata?.courses && data.metadata.courses.length > 0) {
                setCourses(data.metadata.courses);
                // Set the first course as default if available
                setCourseId(data.metadata.courses[0]._id);
            } else {
                throw new Error(
                    'No courses found. Please check your connection or try again later.',
                );
            }
        } catch (error: unknown) {
            console.error(`Failed to fetch courses:`, error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to fetch courses',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
            setCourses([]);
        } finally {
            setCourseLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // Handle form reset
    const handleReset = () => {
        setTitle('');
        setContent('');
        setTags('');
        setAttachment(null);
        setCourseId(courses.length > 0 ? courses[0]._id : ''); // Reset to first course
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

        if (!courseId) {
            toast({
                title: 'Missing Course',
                description: 'Please select a course.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
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

            return;
        }
        const tokenuser = JSON.parse(token);
        console.log('Token user:', tokenuser);

        const userData = localStorage.getItem('user');
        if (!userData) {
            toast({
                title: 'Authentication Error',
                description: 'User data is missing in localStorage.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
            return;
        }

        const user = JSON.parse(userData);
        console.log(` User data:`, user);

        const authorId = user._id;
        if (!authorId) {
            toast({
                title: 'Authentication Error',
                description: 'User ID is missing in user data.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
            return;
        }

        // Log form data for debugging
        console.log(` Form Data Before Sending:`, {
            title: title.trim(),
            content: content.trim(),
            courseId,
            author: authorId,
            tags: tags.trim() || 'None',
            attachments: attachment ? { name: attachment.name, size: attachment.size } : 'None',
        });

        try {
            const response = await CreatePost({
                token: tokenuser,
                title: title.trim(),
                content: content.trim(),
                courseId,
                author: authorId,
                tags: tags.trim() || undefined,
                attachments: attachment || undefined,
            });
            console.log(`Post created successfully:`, response);
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
            setCourseId(courses.length > 0 ? courses[0]._id : '');
            if (fileInputRef.current) fileInputRef.current.value = '';
            setOpen(false);
        } catch (error) {
            console.error(`Failed to create post:`, error);
            toast({
                title: 'Error',
                description: 'Failed to create post. Please try again.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        }
    };

    // Handle file attachment
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
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
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 cursor-default">
                                Select Course
                            </label>
                            {courseLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#657ED4] dark:border-[#5AD3AF] cursor-default"></div>
                                </div>
                            ) : courses.length === 0 ? (
                                <p className="text-gray-500 dark:text-gray-400 text-sm cursor-default">
                                    No courses available.
                                </p>
                            ) : (
                                <select
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm cursor-pointer"
                                    value={courseId}
                                    onChange={(e) => setCourseId(e.target.value)}
                                >
                                    {courses.map((course) => (
                                        <option key={course._id} value={course._id}>
                                            {course.title}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
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
                                    !title.trim() || (!content.trim() && !attachment) || !courseId
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:bg-[#424c70] dark:hover:bg-[#4ac2a0]'
                                }`}
                                onClick={handlePost}
                                disabled={
                                    !title.trim() || (!content.trim() && !attachment) || !courseId
                                }
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
