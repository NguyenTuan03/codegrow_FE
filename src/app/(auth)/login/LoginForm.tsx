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
import GoogleButton from 'react-google-button';
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
            // const { token, user } = response;
            // localStorage.setItem('token', token);
            // localStorage.setItem('user', JSON.stringify(user));
            const token = response.metadata;
            const decoded = jwtDecode(token);
            userAuth?.loginUser(decoded);
            console.log('Login response:', response);
            toast({
                description: 'Login successful!',
                className: 'bg-green-500 text-black', // Màu nền xanh lá cho trạng thái thành công
            });
            router.push('/');
        } catch (error) {
            console.log(error);
            toast({
                description: 'Login failed. Please check your credentials and try again.',
                className: 'bg-red-500 text-black', // Màu nền đỏ cho trạng thái thất bại
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        if (loading) return;
        setLoading(true);
        try {
            router.push(process.env.NEXT_PUBLIC_API_URL + '/auth/login/google');
        } catch {
            toast({
                description: 'Google login failed. Please try again.',
                variant: 'destructive',
            });
            setLoading(false);
        }
    };

    return (
        <div
            style={{ padding: '30px' }}
            className="w-full max-w-2xl rounded-[2rem] shadow-xl bg-white border-0"
        >
            <div className="text-2xl text-center font-semibold">Log in</div>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username / Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter your email"
                                            type="email"
                                            className="!border-none !shadow-none focus-visible:ring-0 focus:outline-none"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-sm text-red-500" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                placeholder="Enter your password"
                                                type={showPassword ? 'text' : 'password'}
                                                className="!border-none !shadow-none focus-visible:ring-0 focus-visible:outline-none pr-10"
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

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-rose-400 hover:bg-rose-500 text-white rounded-full mt-2"
                        >
                            {loading ? 'Logging in...' : 'Log in'}
                        </Button>
                    </form>
                </Form>

                <div className="text-center mt-4">
                    <p className="text-sm text-blue-500 text-right">
                        <Link href="/password" className="underline font-medium">
                            Forget your password
                        </Link>
                    </p>
                    <p className="text-sm mt-2">
                        Don’t have an account?{' '}
                        <Link href={Routes.register} className="underline font-medium">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 pt-2">
                <div className="flex items-center w-full px-6 gap-4">
                    <div className="border-t border-gray-300 flex-grow" />
                    <span className="text-sm text-muted-foreground">or</span>
                    <div className="border-t border-gray-300 flex-grow" />
                </div>
                <Button className="mt-2" disabled={loading}>
                    <GoogleButton onClick={handleGoogleLogin} />
                </Button>
            </div>
        </div>
    );
};

export default LoginForm;
