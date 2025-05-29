'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPassword } from '@/lib/services/auth/ForgotPassword';

const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
});

const PasswordPage = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const forgotPasswordForm = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: '' },
    });

    const handleForgetPassword = async (data: { email: string }) => {
        setLoading(true);
        try {
            const response = await forgotPassword(data.email);
            console.log('Forgot password response:', response);
            toast({
                description: response?.message || 'Reset link sent successfully!',
                className: 'bg-[#5AD3AF] text-black font-medium p-4 rounded-lg shadow-md',
            });
            router.push('/login');
        } catch (error) {
            console.error('Error sending reset link:', error);
            toast({
                title: 'Error',
                description: 'Failed to send reset link. Please try again.',
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
                    Forgot Password
                </h1>
            </div>
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
                                <FormLabel className="text-xl font-medium text-gray-900 dark:text-gray-100 cursor-default">
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter your email"
                                        aria-label="Email"
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
                        aria-label="Send Reset Link"
                        className={`w-full bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#424c70] dark:hover:bg-[#4ac2a0] text-white rounded-lg py-2 text-base font-medium cursor-pointer ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                </form>
            </Form>
            <p className="text-base text-center mt-4 font-medium cursor-default">
                <button
                    onClick={() => router.push('/login')}
                    className="text-[#657ED4] dark:text-[#5AD3AF] underline hover:text-[#424c70] dark:hover:text-[#4ac2a0] cursor-pointer"
                >
                    {'<---'} Back to Login
                </button>
            </p>
        </div>
    );
};

export default PasswordPage;
