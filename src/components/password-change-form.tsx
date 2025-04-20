'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { z } from 'zod';
import { ChangePassword } from '@/lib/services/auth/changePassword';
import { useRouter } from 'next/navigation';

const ChangePasswordSchema = z
    .object({
        oldPassword: z.string().min(6, 'Current password must be at least 6 characters'),
        newPassword: z.string().min(6, 'New password must be at least 6 characters'),
        confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'New password and confirm password do not match',
        path: ['confirmPassword'],
    });

type ChangePasswordFormValues = z.infer<typeof ChangePasswordSchema>;

const ChangePasswordForm = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });
    const { toast } = useToast();

    const form = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    async function onSubmit(values: ChangePasswordFormValues) {
        if (loading) return;
        setLoading(true);

        try {
            const token = localStorage.getItem('token') || '';
            const result = await ChangePassword(token, values.oldPassword, values.newPassword);

            toast({
                title: '🎉 Password changed successfully',
                description: result.message || 'Your password has been updated.',
                className: 'bg-green-500 text-white',
            });

            form.reset();
            router.refresh(); // Refresh the page to reflect changes
        } catch (error) {
            console.error('Error changing password:', error);
            toast({
                title: '❌ Password change failed',
                description: 'An error occurred while changing your password.',
                className: 'bg-red-500 text-white',
            });
        } finally {
            setLoading(false);
        }
    }

    const togglePasswordVisibility = (field: keyof typeof showPassword) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800 p-6">
                    <h1 className="text-2xl font-bold text-white">Change Password</h1>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="p-8 space-y-6"
                        noValidate
                    >
                        {/* Current Password */}
                        <FormField
                            control={form.control}
                            name="oldPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                                        Old Password
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                type={
                                                    showPassword.oldPassword ? 'text' : 'password'
                                                }
                                                className="rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    togglePasswordVisibility('oldPassword')
                                                }
                                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400"
                                            >
                                                {showPassword.oldPassword ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0 10-4.477 10-10S6.477 0 12 0c1.875 0 3.625.525 5.125 1.425M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M3.98 8.223A10.05 10.05 0 0112 5c5.523 0 10 4.477 10 10s-4.477 10-10 10c-1.875 0-3.625-.525-5.125-1.425M9 12a3 3 0 116 0 3 3 0 01-6 0z"
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-sm" />
                                </FormItem>
                            )}
                        />

                        {/* New Password */}
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                                        New Password
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                type={
                                                    showPassword.newPassword ? 'text' : 'password'
                                                }
                                                className="rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    togglePasswordVisibility('newPassword')
                                                }
                                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400"
                                            >
                                                {showPassword.newPassword ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0 10-4.477 10-10S6.477 0 12 0c1.875 0 3.625.525 5.125 1.425M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M3.98 8.223A10.05 10.05 0 0112 5c5.523 0 10 4.477 10 10s-4.477 10-10 10c-1.875 0-3.625-.525-5.125-1.425M9 12a3 3 0 116 0 3 3 0 01-6 0z"
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-sm" />
                                </FormItem>
                            )}
                        />

                        {/* Confirm Password */}
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                                        Confirm Password
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                type={
                                                    showPassword.confirmPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                className="rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    togglePasswordVisibility('confirmPassword')
                                                }
                                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400"
                                            >
                                                {showPassword.confirmPassword ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0 10-4.477 10-10S6.477 0 12 0c1.875 0 3.625.525 5.125 1.425M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M3.98 8.223A10.05 10.05 0 0112 5c5.523 0 10 4.477 10 10s-4.477 10-10 10c-1.875 0-3.625-.525-5.125-1.425M9 12a3 3 0 116 0 3 3 0 01-6 0z"
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-sm" />
                                </FormItem>
                            )}
                        />

                        {/* Action buttons */}
                        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-3 bg-[#657ED4] hover:bg-[#5A6BBE] text-white rounded-lg shadow-sm transition-colors disabled:opacity-70"
                                >
                                    {loading ? (
                                        <span className="flex items-center">
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Saving...
                                        </span>
                                    ) : (
                                        'Change Password'
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default ChangePasswordForm;
