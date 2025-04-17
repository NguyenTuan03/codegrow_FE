'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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

// Validation schema for resetting password
const resetPasswordSchema = z.object({
    newpass: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const resetPasswordForm = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { newpass: '' },
    });

    const token = searchParams.get('token');

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
        <div className="w-full max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md bg-[#EEF1EF]">
            <h1 className="text-2xl font-semibold text-center mb-4 text-[#000000]">
                Reset Password
            </h1>
            <Form {...resetPasswordForm}>
                <form
                    onSubmit={resetPasswordForm.handleSubmit(handleResetPassword)}
                    className="space-y-4"
                >
                    <FormField
                        control={resetPasswordForm.control}
                        name="newpass"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#000000]">New Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="Enter new password"
                                        aria-label="New Password"
                                        className="border-gray-300 focus:ring-[#5AD3AF] focus:border-[#5AD3AF]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={loading}
                        aria-label="Reset Password"
                        className="w-full bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white rounded-lg py-2"
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </Button>
                </form>
            </Form>
            <p className="text-sm text-center mt-4">
                <button
                    onClick={() => router.push('/login')}
                    className="text-[#657ED4] underline hover:text-[#7696ff]"
                >
                    Back to Login
                </button>
            </p>
        </div>
    );
}
