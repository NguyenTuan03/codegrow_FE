'use client';

import { useToast } from '@/components/ui/use-toast';
import { CreateReview } from '@/lib/services/qaqc/createReview';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const reviewSchema = z.object({
    rating: z
        .number({ invalid_type_error: 'Rating must be a number' })
        .min(1, 'Rating must be at least 1')
        .max(5, 'Rating cannot exceed 5'),
    comment: z.string().min(1, 'Comment is required'),
});

export function CreateReviewForm({ mentorId }: { mentorId: string }) {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof reviewSchema>>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            rating: 1,
            comment: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof reviewSchema>) => {
        try {
            const token = localStorage.getItem('token') || '';
            await CreateReview({
                token,
                mentorId,
                rating: values.rating,
                comment: values.comment,
            });
            toast({
                title: 'Success',
                description: 'Review submitted successfully!',
            });
            form.reset();
        } catch (error) {
            console.error('Error submitting review:', error);
            toast({
                title: 'Error',
                description: 'Failed to submit review. Please try again.',
                variant: 'destructive',
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xl font-semibold text-gray-900 dark:text-gray-100 cursor-default">
                                Rating (1-5)
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min="1"
                                    max="5"
                                    className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] focus:border-transparent transition-all duration-200 cursor-text"
                                    {...field}
                                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage className="text-red-500 dark:text-red-400 text-base cursor-default" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xl font-semibold text-gray-900 dark:text-gray-100 cursor-default">
                                Comment
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] focus:border-transparent transition-all duration-200 resize-none h-32 cursor-text"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-red-500 dark:text-red-400 text-base cursor-default" />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className={`bg-[#657ED4] dark:bg-[#5AD3AF] text-white rounded-lg px-6 py-2 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] focus:outline-none transition-all duration-200 cursor-pointer hover:bg-[#424c70] dark:hover:bg-[#4ac2a0] text-base font-medium ${
                        form.formState.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {form.formState.isSubmitting ? 'Submitting...' : 'Submit Review'}
                </Button>
            </form>
        </Form>
    );
}
