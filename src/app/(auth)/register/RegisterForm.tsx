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
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterBody, RegisterBodyType } from '@/schemaValidations/auth.schema';
import Link from 'next/link';
import { Routes } from '@/lib/config/Routes';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { signUp } from '@/lib/services/auth/SignUp';

const RegisterForm = () => {
    const [loading, setLoading] = useState(false);

    const [googleLoading, setGoogleLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const handleGoogleLogin = async () => {
        if (googleLoading) return;
        setGoogleLoading(true);
        try {
            router.push(process.env.NEXT_PUBLIC_API_URL + '/auth/login/google');
        } catch {
            toast({
                description: 'Google login failed. Please try again.',
                variant: 'destructive',
            });
            setGoogleLoading(false);
        }
    };
    const onSubmit = async (data: RegisterBodyType) => {
        if (loading) return;

        setLoading(true);

        try {
            const result = await signUp(
                data.fullName,
                data.email,
                data.password,
                data.confirmPassword,
            );
            console.log('✅ Registered user:', result);

            toast({
                description: 'Register successful!',
                className: 'bg-green-500 text-black',
            });

            router.push('/register/verify');
        } catch (error) {
            console.error('❌ Registration error:', error);

            toast({
                description: 'Registration failed. Please try again.',
                className: 'bg-red-500 text-black',
            });
        } finally {
            setLoading(false);
        }
        // catch (error: unknown) {
        //     let errorMessage = 'Registration failed. Please try again.';
        //     if (axios.isAxiosError(error)) {
        //         console.error('Axios Error:', error.response?.data); // Log chi tiết lỗi từ backend
        //         if (error.response?.status === 400) {
        //             errorMessage = error.response.data || 'Email already exists.';
        //         }
        //     } else if (error instanceof Error) {
        //         console.error('JS Error:', error.message); // Log lỗi JavaScript
        //         errorMessage = error.message;
        //     }

        //     toast({
        //         description: 'Login failed. Please check your credentials and try again.',
        //         className: 'bg-red-500 text-black', // Màu nền đỏ cho trạng thái thất bại
        //     });
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <div className="w-full max-w-lg p-8 rounded-[1.5rem] shadow-lg bg-[#EEF1EF] border border-gray-200">
            {/* Header */}
            <h1 className="text-3xl text-center font-bold text-[#5AD3AF] mb-6">
                Create an Account
            </h1>

            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                    {/* Full Name Field */}
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-[#000000]">
                                    Full Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter your full name"
                                        className="mt-1 border-gray-300 focus:ring-[#5AD3AF] focus:border-[#5AD3AF]"
                                    />
                                </FormControl>
                                <FormMessage className="text-sm text-red-500" />
                            </FormItem>
                        )}
                    />

                    {/* Email Field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-[#000000]">
                                    Email Address
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter your email"
                                        type="email"
                                        className="mt-1 border-gray-300 focus:ring-[#5AD3AF] focus:border-[#5AD3AF]"
                                    />
                                </FormControl>
                                <FormMessage className="text-sm text-red-500" />
                            </FormItem>
                        )}
                    />

                    {/* Password Field */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-[#000000]">
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter your password"
                                            className="mt-1 border-gray-300 focus:ring-[#5AD3AF] focus:border-[#5AD3AF] pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                                        >
                                            {showPassword ? (
                                                <EyeOffIcon size={18} />
                                            ) : (
                                                <EyeIcon size={18} />
                                            )}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage className="text-sm text-red-500" />
                            </FormItem>
                        )}
                    />

                    {/* Confirm Password Field */}
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-[#000000]">
                                    Confirm Password
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Confirm your password"
                                            className="mt-1 border-gray-300 focus:ring-[#5AD3AF] focus:border-[#5AD3AF] pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                                        >
                                            {showPassword ? (
                                                <EyeOffIcon size={18} />
                                            ) : (
                                                <EyeIcon size={18} />
                                            )}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage className="text-sm text-red-500" />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#5AD3AF] hover:bg-[#6bbea6] text-white rounded-lg py-2"
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </Button>
                </form>
            </Form>

            {/* Links */}
            <div className="text-center mt-4">
                <p className="text-sm">
                    Already have an account?{' '}
                    <Link
                        href={Routes.login}
                        className="text-[#657ED4] font-medium hover:text-[#7696ff] transition-colors duration-200 underline"
                    >
                        Log in
                    </Link>
                </p>
            </div>

            {/* Divider */}
            <div className="flex items-center w-full px-6 gap-4 mt-6">
                <div className="border-t border-gray-300 flex-grow" />
                <span className="text-sm text-gray-500">or</span>
                <div className="border-t border-gray-300 flex-grow" />
            </div>

            {/* Google Login */}
            <div className="flex justify-center mt-4">
                <Button
                    onClick={handleGoogleLogin}
                    className="w-full max-w-sm bg-[#657ED4] hover:bg-[#485b99] text-white rounded-lg py-2 flex items-center justify-center gap-2"
                    disabled={googleLoading}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                        <path
                            fill="#EA4335"
                            d="M24 9.5c3.5 0 6.4 1.2 8.7 3.2l6.5-6.5C34.7 2.5 29.7 0 24 0 14.6 0 6.4 5.8 2.4 14.1l7.7 6C12.4 13.2 17.7 9.5 24 9.5z"
                        />
                        <path
                            fill="#34A853"
                            d="M46.5 24c0-1.6-.2-3.2-.5-4.7H24v9h12.7c-.5 2.7-2 5-4.2 6.5l6.5 5c3.8-3.5 6-8.7 6-14.8z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M10.1 28.1c-.6-1.7-1-3.5-1-5.6s.4-3.9 1-5.6l-7.7-6C.5 15.3 0 19.5 0 24s.5 8.7 2.4 12.9l7.7-6c-.6-1.7-1-3.5-1-5.6z"
                        />
                        <path
                            fill="#4285F4"
                            d="M24 48c6.5 0 12-2.1 16-5.8l-6.5-5c-2.1 1.4-4.8 2.3-7.5 2.3-6.3 0-11.6-4.2-13.5-10l-7.7 6C6.4 42.2 14.6 48 24 48z"
                        />
                    </svg>
                    {googleLoading ? 'Logging in with Google...' : 'Log in with Google'}
                </Button>
            </div>
        </div>
    );
};

export default RegisterForm;
