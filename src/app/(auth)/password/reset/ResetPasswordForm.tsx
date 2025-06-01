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
                    className: 'bg-[#F76F8E] text-black font-medium p-4 rounded-lg shadow-md',
                });
                return;
            }

            const response = await resetPassword(token, data.newpass);
            toast({
                title: 'Success',
                description: response?.message || 'Password reset successfully!',
                className: 'bg-[#5AD3AF] text-black font-medium p-4 rounded-lg shadow-md',
            });
            router.push('/login');
        } catch (error) {
            console.error('Error resetting password:', error);
            toast({
                title: 'Error',
                description: 'Password reset failed. Please try again.',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-black font-medium p-4 rounded-lg shadow-md',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md bg-[#EEF1EF] dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
                <h1 className="text-4xl font-semibold text-[#657ED4] dark:text-[#5AD3AF] cursor-default">
                    Reset Password
                </h1>
            </div>
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
                                <FormLabel className="text-xl font-medium text-gray-900 dark:text-gray-100 cursor-default">
                                    New Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="Enter new password"
                                        aria-label="New Password"
                                        className="border-gray-300 dark:border-gray-600 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] focus:border-[#657ED4] dark:focus:border-[#5AD3AF] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg cursor-text"
                                    />
                                </FormControl>
                                <FormMessage className="text-base text-red-500 dark:text-red-400 font-medium cursor-default" />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={loading}
                        aria-label="Reset Password"
                        className={`w-full bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#424c70] dark:hover:bg-[#4ac2a0] text-white rounded-lg py-2 text-base font-medium cursor-pointer ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </Button>
                </form>
            </Form>
            <p className="text-base text-center mt-4 font-medium cursor-default">
                <button
                    onClick={() => router.push('/login')}
                    className="text-[#657ED4] dark:text-[#5AD3AF] underline hover:text-[#424c70] dark:hover:text-[#4ac2a0] cursor-pointer"
                >
                    Back to Login
                </button>
            </p>
        </div>
    );
}
