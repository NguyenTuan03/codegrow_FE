'use client';

import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { toast } from '@/components/ui/use-toast';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ReplyService } from '@/lib/services/services/repplyservice';

const replySchema = z.object({
    qaqcReply: z.string().min(1, 'Reply is required'),
    status: z.enum(['resolved', 'rejected']),
});

interface ServiceTicketReplyFormProps {
    ticketId: string;
    initialReply?: string;
    onReplySuccess: (ticketId: string, qaqcReply: string) => void;
}

export default function ServiceTicketReplyForm({
    ticketId,
    initialReply = '',
    onReplySuccess,
}: ServiceTicketReplyFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof replySchema>>({
        resolver: zodResolver(replySchema),
        defaultValues: {
            qaqcReply: initialReply,
            status: 'resolved', // Default to "resolved"
        },
    });

    const onSubmit = async (values: z.infer<typeof replySchema>) => {
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication token not found');
            }

            await ReplyService(token, ticketId, values.qaqcReply, values.status);
            toast({
                title: 'Success',
                description: 'Reply sent successfully',
            });
            onReplySuccess(ticketId, values.qaqcReply);
            form.reset();
        } catch (error) {
            console.error('Failed to send reply:', error);
            toast({
                title: 'Error',
                description: 'Failed to send reply',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="qaqcReply"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-gray-800 dark:text-gray-200">
                                Your Reply
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Write your response..."
                                    className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                    disabled={isSubmitting}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-gray-800 dark:text-gray-200">
                                Status
                            </FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={isSubmitting}
                            >
                                <FormControl>
                                    <SelectTrigger className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="resolved">Resolved</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
                    >
                        {isSubmitting ? 'Sending...' : 'Send Reply'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
