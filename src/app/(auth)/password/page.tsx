'use client';

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

import { forgotPassword } from '@/lib/services/auth/ForgotPassword';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
});

const PasswordPage = () => {
    const { toast } = useToast();

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
                description: response?.message || 'Send reset link successfully!',
                className: 'bg-green-500 text-white font-medium p-4 rounded-lg shadow-md', // TailwindCSS styles
            });
        } catch (error) {
            console.error('Error sending reset link:', error);
            toast({
                title: 'Error',
                description: 'Failed to send reset link. Please try again.',
                className: 'bg-red-500 text-white font-medium p-4 rounded-lg shadow-md', // TailwindCSS styles
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md bg-[#EEF1EF]">
            <>
                <h1 className="text-2xl font-semibold text-center mb-4 text-[#000000]">
                    Forgot Password
                </h1>
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
                                    <FormLabel className="text-[#000000]">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter your email"
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
                            className="w-full bg-[#5AD3AF] hover:bg-[#4ac2a0] text-white rounded-lg py-2"
                        >
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </Button>
                    </form>
                </Form>
                <p className="text-sm text-center mt-4">
                    <a href="/login" className="text-[#657ED4]  hover:text-[#7696ff]">
                        {'<---'} Back to Login
                    </a>
                </p>
            </>
        </div>
    );
};

export default PasswordPage;
