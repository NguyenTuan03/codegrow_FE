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
import { useContext, useState } from 'react';
import Link from 'next/link';
import { Routes } from '@/lib/config/Routes';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { login } from '@/lib/services/auth/Login';
import { useRouter } from 'next/navigation';

import { LoginBody } from '@/schemaValidations/auth.schema';
import { LoginBodyType } from '@/schemaValidations/auth.schema';
import { jwtDecode } from 'jwt-decode';
import { Auth } from '@/lib/components/context/AuthContext';
const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { toast } = useToast();
    const userAuth = useContext(Auth);
    const router = useRouter();
    const [googleLoading, setGoogleLoading] = useState(false);
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginBodyType) => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await login(data.email, data.password);
            console.log('Login response:', response);
            const token = response.metadata; // Lấy token từ response
            localStorage.setItem('token', JSON.stringify(token)); // Lưu token vào localStorage
            const decoded = jwtDecode(token); // Giải mã token
            userAuth?.loginUser(decoded); // Lưu thông tin user và token vào AuthContext
            toast({
                description: 'Login successful!',
                className: 'bg-green-500 text-black',
                duration: 1000,
            });
            router.push('/');
        } catch (error) {
            toast({
                description: 'Login failed. Please check your credentials.',
                className: 'bg-red-500 text-black',
                variant: 'destructive',
                duration: 1000,
            });
            console.log('Login error:', error);
        } finally {
            setLoading(false);
        }
    };
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
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <div
            style={{ padding: '30px' }}
            className="w-full max-w-lg rounded-[1.5rem] shadow-lg bg-white border border-gray-200"
        >
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-pink-500">Welcome Back</h1>
                <p className="text-sm text-gray-500">Log in to your account</p>
            </div>

            {/* Form */}
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                        {/* Email Field */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">
                                        Email Address
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter your email"
                                            type="email"
                                            className="mt-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
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
                                    <FormLabel className="text-sm font-medium text-gray-700">
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                placeholder="Enter your password"
                                                type={showPassword ? 'text' : 'password'}
                                                className="mt-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500 pr-10"
                                            />
                                            <div
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                                            >
                                                {showPassword ? (
                                                    <EyeOffIcon size={18} />
                                                ) : (
                                                    <EyeIcon size={18} />
                                                )}
                                            </div>
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
                            className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-lg py-2"
                        >
                            {loading ? 'Logging in...' : 'Log in'}
                        </Button>
                    </form>
                </Form>

                {/* Links */}
                <div className="flex justify-between items-center mt-4">
                    <p className="text-sm">
                        Don’t have an account?{' '}
                        <Link
                            href={Routes.register}
                            className="text-pink-500 font-medium hover:text-pink-600"
                        >
                            Sign up
                        </Link>
                    </p>
                    <p className="text-sm">
                        <Link
                            href="/password"
                            className="text-pink-500 underline font-medium hover:text-pink-600"
                        >
                            Forget your password?
                        </Link>
                    </p>
                </div>
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
                    className="w-full max-w-sm bg-pink-500 hover:bg-pink-600 text-white rounded-lg py-2 flex items-center justify-center gap-2"
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

export default LoginForm;
