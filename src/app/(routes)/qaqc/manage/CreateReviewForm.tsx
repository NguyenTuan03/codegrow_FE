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
                            <FormLabel>Rating (1-5)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min="1"
                                    max="5"
                                    {...field}
                                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Comment</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Submitting...' : 'Submit Review'}
                </Button>
            </form>
        </Form>
    );
}
