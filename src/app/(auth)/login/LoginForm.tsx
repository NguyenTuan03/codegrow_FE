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
import { z } from 'zod';
import GoogleButton from 'react-google-button';
import Link from 'next/link';
import { Routes } from '@/lib/config/Routes';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { login } from '@/lib/services/auth/Login';
import { loginGoogle } from '@/lib/services/auth/LoginGoogle';

// Define the schema for login form validation
const LoginBody = z.object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginBodyType = z.infer<typeof LoginBody>;

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { toast } = useToast();
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
            console.log('Login response:', response); // Use response to avoid TS6133
            toast({ description: 'Login successful!' });
            router.push('/');
        } catch {
            toast({
                description: 'Login failed. Please check your credentials and try again.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await loginGoogle();
            console.log('Google login response:', response); // Use response
            toast({ description: 'Google login successful!' });
            router.push('/');
        } catch {
            toast({
                description: 'Google login failed. Please try again.',
                variant: 'destructive',
            });
        } finally {
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

                        <p className="text-sm text-muted-foreground">
                            By continuing, you agree to the{' '}
                            <a href="#" className="underline">
                                Terms of use
                            </a>{' '}
                            and{' '}
                            <a href="#" className="underline">
                                Privacy Policy
                            </a>
                            .
                        </p>

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
