'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

// Define the form schema using Zod
const formSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    comments: z.string().min(10, { message: 'Comments must be at least 10 characters.' }),
});

interface FeedbackFormProps {
    initialData?: { name: string; email: string; rating: number; comments: string };
    onSubmit: (data: { name: string; email: string; rating: number; comments: string }) => void;
    onCancel: () => void;
}

export default function FeedbackForm({ initialData, onSubmit, onCancel }: FeedbackFormProps) {
    const [rating, setRating] = useState(initialData?.rating || 4);

    // Initialize the form with react-hook-form and zod validation
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name || '',
            email: initialData?.email || '',
            comments: initialData?.comments || '',
        },
    });

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        onSubmit({ ...values, rating });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                {/* Name Field */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500">
                                    👤
                                </span>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Your name"
                                        className="pl-10 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                    />
                                </FormControl>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />

                {/* Email Field */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500">
                                    📧
                                </span>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="Enter your email"
                                        className="pl-10 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                    />
                                </FormControl>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />

                {/* Rating Field */}
                <div>
                    <Label className="mb-3">Share your experience in scaling</Label>
                    <div className="flex space-x-1 mt-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                                key={index}
                                onClick={() => setRating(index + 1)}
                                className={cn(
                                    'w-6 h-6 cursor-pointer',
                                    index < rating
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : 'text-gray-300 dark:text-gray-600',
                                )}
                            />
                        ))}
                    </div>
                </div>

                {/* Comments Field */}
                <FormField
                    control={form.control}
                    name="comments"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="Add your comments..."
                                    className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Buttons */}
                <div className="flex justify-between items-center pt-2">
                    <Button
                        type="button"
                        variant="link"
                        className="text-blue-600 dark:text-blue-400"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
}
