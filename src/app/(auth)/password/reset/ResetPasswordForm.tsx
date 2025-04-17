// app/password/reset/ResetPasswordForm.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { resetPassword } from '@/lib/services/auth/ResetPassword';
import { useToast } from '@/components/ui/use-toast';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const resetPasswordSchema = z.object({
    newpass: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function ResetPasswordForm({ token }: { token?: string }) {
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { newpass: '' },
    });

    const handleResetPassword = async (data: { newpass: string }) => {
        setLoading(true);
        try {
            if (!token) {
                toast({
                    title: 'Error',
                    description: 'Invalid or missing reset link. Please try again.',
                    variant: 'destructive',
                });
                return;
            }

            const response = await resetPassword(token, data.newpass);
            toast({
                title: 'Success',
                description: response?.message || 'Password reset successfully!',
                className: 'bg-green-500 text-white',
            });
            router.push('/login');
        } catch (error) {
            console.error('Error resetting password:', error);
            toast({
                title: 'Error',
                description: 'Password reset failed. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md bg-white">
            <h1 className="text-2xl font-semibold text-center mb-4 text-gray-800">
                Reset Password
            </h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleResetPassword)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="newpass"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="Enter new password"
                                        disabled={loading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </Button>
                </form>
            </Form>
            <div className="mt-4 text-center">
                <Button variant="link" onClick={() => router.push('/login')} disabled={loading}>
                    Back to Login
                </Button>
            </div>
        </div>
    );
}
