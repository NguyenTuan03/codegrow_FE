'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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

export default function ResetPasswordPage() {
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
                throw new Error('Token is missing. Please check the reset link.');
            }
            console.log('Token being sent:', token);
            const response = await resetPassword(token, data.newpass);
            console.log('Reset password response:', response);

            toast({
                description: response?.message || 'Password reset successfully!',
            });
            router.push('/login'); // Redirect to login page
        } catch (error: any) {
            console.error('Error resetting password:', error);
            toast({
                description: error.message || 'Failed to reset password. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="w-full max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md bg-white">
            <h1 className="text-2xl font-semibold text-center mb-4">Reset Password</h1>
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
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="Enter new password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-lg py-2"
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </Button>
                </form>
            </Form>
            <p className="text-sm text-center mt-4">
                <a href="/login" className="text-pink-500 underline hover:text-pink-600">
                    Back to Login
                </a>
            </p>
        </div>
    );
}
