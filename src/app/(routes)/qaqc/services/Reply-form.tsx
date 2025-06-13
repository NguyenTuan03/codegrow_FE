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
            status: 'resolved',
        },
    });

    const onSubmit = async (values: z.infer<typeof replySchema>) => {
        setIsSubmitting(true);
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

            await ReplyService(tokenuser, ticketId, values.qaqcReply, values.status);
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
                            <FormLabel className="text-xl font-semibold text-gray-900 dark:text-gray-100 cursor-default">
                                Your Reply
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Write your response..."
                                    className={`bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] focus:border-transparent transition-all duration-200 resize-none h-32 cursor-text ${
                                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                    disabled={isSubmitting}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-red-500 dark:text-red-400 text-base cursor-default" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xl font-semibold text-gray-900 dark:text-gray-100 cursor-default">
                                Status
                            </FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={isSubmitting}
                            >
                                <FormControl>
                                    <SelectTrigger
                                        className={`bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] focus:border-transparent transition-all duration-200 cursor-pointer ${
                                            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-lg">
                                    <SelectItem
                                        value="resolved"
                                        className="text-gray-900 dark:text-gray-100 hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-black transition-colors font-medium text-base cursor-pointer"
                                    >
                                        Resolved
                                    </SelectItem>
                                    <SelectItem
                                        value="rejected"
                                        className="text-gray-900 dark:text-gray-100 hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-black transition-colors font-medium text-base cursor-pointer"
                                    >
                                        Rejected
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage className="text-red-500 dark:text-red-400 text-base cursor-default" />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={`bg-[#657ED4] dark:bg-[#5AD3AF] text-white rounded-lg px-6 py-2 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] focus:outline-none transition-all duration-200 cursor-pointer hover:bg-[#424c70] dark:hover:bg-[#4ac2a0] text-base font-medium ${
                            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Reply'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
