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
import { Lock, Eye, EyeOff } from 'lucide-react';

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
                className:
                    'bg-[#657ED4] dark:bg-[#5AD3AF] text-white dark:text-black font-semibold',
            });

            form.reset();
            router.refresh();
        } catch (error) {
            console.error('Error changing password:', error);
            toast({
                title: '❌ Password change failed',
                description: 'An error occurred while changing your password.',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        } finally {
            setLoading(false);
        }
    }

    const togglePasswordVisibility = (field: keyof typeof showPassword) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    return (
        <div className="max-w-lg mx-auto p-6 sm:p-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="bg-gradient-to-r from-[#657ED4] to-[#5AD3AF] dark:from-[#5A6BBE] dark:to-[#4AC2A0] p-6 flex items-center gap-3">
                    <Lock className="w-6 h-6 text-white" />
                    <h1 className="text-2xl font-bold text-white cursor-default">
                        Change Password
                    </h1>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="p-6 sm:p-8 space-y-6"
                        noValidate
                    >
                        {/* Current Password */}
                        <FormField
                            control={form.control}
                            name="oldPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#657ED4] dark:text-[#5AD3AF] font-semibold cursor-default">
                                        Old Password
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                                            <Input
                                                {...field}
                                                type={
                                                    showPassword.oldPassword ? 'text' : 'password'
                                                }
                                                className="pl-10 rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] text-gray-900 dark:text-gray-100 transition-all duration-200 cursor-text"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    togglePasswordVisibility('oldPassword')
                                                }
                                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-[#657ED4] dark:hover:text-[#5AD3AF] transition-colors duration-200 cursor-pointer"
                                                aria-label={
                                                    showPassword.oldPassword
                                                        ? 'Hide password'
                                                        : 'Show password'
                                                }
                                            >
                                                {showPassword.oldPassword ? (
                                                    <EyeOff className="w-5 h-5" />
                                                ) : (
                                                    <Eye className="w-5 h-5" />
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-[#F76F8E] text-base font-medium cursor-default" />
                                </FormItem>
                            )}
                        />

                        {/* New Password */}
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#657ED4] dark:text-[#5AD3AF] font-semibold cursor-default">
                                        New Password
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 text-base" />
                                            <Input
                                                {...field}
                                                type={
                                                    showPassword.newPassword ? 'text' : 'password'
                                                }
                                                className="pl-10 rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] text-gray-900 dark:text-gray-100 transition-all duration-200 cursor-text"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    togglePasswordVisibility('newPassword')
                                                }
                                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-[#657ED4] dark:hover:text-[#5AD3AF] transition-colors duration-200 cursor-pointer"
                                                aria-label={
                                                    showPassword.newPassword
                                                        ? 'Hide password'
                                                        : 'Show password'
                                                }
                                            >
                                                {showPassword.newPassword ? (
                                                    <EyeOff className="w-5 h-5" />
                                                ) : (
                                                    <Eye className="w-5 h-5" />
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-[#F76F8E] text-base font-medium cursor-default" />
                                </FormItem>
                            )}
                        />

                        {/* Confirm Password */}
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#657ED4] dark:text-[#5AD3AF] font-semibold cursor-default">
                                        Confirm Password
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                                            <Input
                                                {...field}
                                                type={
                                                    showPassword.confirmPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                className="pl-10 rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] text-gray-900 dark:text-gray-100 transition-all duration-200 cursor-text"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    togglePasswordVisibility('confirmPassword')
                                                }
                                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-[#657ED4] dark:hover:text-[#5AD3AF] transition-colors duration-200 cursor-pointer"
                                                aria-label={
                                                    showPassword.confirmPassword
                                                        ? 'Hide password'
                                                        : 'Show password'
                                                }
                                            >
                                                {showPassword.confirmPassword ? (
                                                    <EyeOff className="w-5 h-5" />
                                                ) : (
                                                    <Eye className="w-5 h-5" />
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-[#F76F8E] text-base font-medium cursor-default" />
                                </FormItem>
                            )}
                        />

                        {/* Action buttons */}
                        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex justify-end gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.back()}
                                    className="px-6 py-3 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg shadow-sm transition-colors duration-200 font-medium cursor-pointer"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className={`px-6 py-3 bg-[#657ED4] dark:bg-[#5AD3AF] text-white rounded-lg shadow-md transition-all duration-200 flex items-center gap-2 font-medium cursor-pointer ${
                                        loading
                                            ? 'opacity-70 cursor-not-allowed'
                                            : 'hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0]'
                                    }`}
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
                                        <>
                                            <Lock className="w-5 h-5" />
                                            Change Password
                                        </>
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
