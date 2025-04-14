'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { forgotPassword } from '@/lib/services/auth/ForgotPassword';
import { resetPassword } from '@/lib/services/auth/ResetPassword';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
});

const resetPasswordSchema = z
    .object({
        password: z.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

const PasswordPage = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token'); // Lấy token từ URL
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const forgotPasswordForm = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: '' },
    });

    const resetPasswordForm = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { password: '', confirmPassword: '' },
    });

    const handleForgetPassword = async (data: { email: string }) => {
        setLoading(true);
        try {
            const response = await forgotPassword(data.email);
            console.log('Forgot password response:', response);
            toast({
                description: 'Reset password email sent successfully!',
            });
        } catch (error) {
            toast({
                description: 'Failed to send reset password email. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (data: { password: string; confirmPassword: string }) => {
        setLoading(true);
        try {
            const response = await resetPassword(token as string, data.password);
            console.log('Reset password response:', response);
            toast({
                description: 'Password reset successfully!',
            });
            router.push('/login'); // Chuyển hướng về trang login
        } catch (error) {
            toast({
                description: 'Failed to reset password. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md bg-white">
            {!token ? (
                <>
                    <h1 className="text-2xl font-semibold text-center mb-4">Forgot Password</h1>
                    <Form {...forgotPasswordForm}>
                        <form
                            onSubmit={forgotPasswordForm.handleSubmit(handleForgetPassword)}
                            className="space-y-4"
                        >
                            <FormField
                                control={forgotPasswordForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter your email" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-500 text-white"
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </Button>
                        </form>
                    </Form>
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-semibold text-center mb-4">Reset Password</h1>
                    <Form {...resetPasswordForm}>
                        <form
                            onSubmit={resetPasswordForm.handleSubmit(handleResetPassword)}
                            className="space-y-4"
                        >
                            <FormField
                                control={resetPasswordForm.control}
                                name="password"
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
                            <FormField
                                control={resetPasswordForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="password"
                                                placeholder="Confirm new password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-500 text-white"
                            >
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </Button>
                        </form>
                    </Form>
                </>
            )}
        </div>
    );
};

export default PasswordPage;
