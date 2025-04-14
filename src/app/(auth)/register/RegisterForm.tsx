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
import axios from 'axios';
import { RegisterBody, RegisterBodyType } from '@/schemaValidations/auth.schema';
import GoogleButton from 'react-google-button';
import Link from 'next/link';
import { Routes } from '@/lib/config/Routes';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { signUp } from '@/lib/services/auth/SignUp';
import { loginGoogle } from '@/lib/services/auth/LoginGoogle';
import VerifyGmailDialog from '@/lib/components/verify/VerifyPage';

const RegisterForm = () => {
    const [loading, setLoading] = useState(false);
    const [showVerifyDialog, setShowVerifyDialog] = useState(false);
    const [gmailToken, setGmailToken] = useState<string | null>(null);
    const [googleLoading, setGoogleLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
            email: '',
            name: '',
            password: '',
        },
    });
    const handleGoogleSignIn = async () => {
        if (googleLoading) return;
        setGoogleLoading(true);

        try {
            const result = await loginGoogle(); // Gọi API loginGoogle
            if (!result) throw new Error('Google Sign-In failed.');

            console.log('✅ Google Sign-In successful:', result);

            setShowVerifyDialog(true);
            const token = result.token;
            localStorage.setItem('token', token);
            setGmailToken(token);

            toast({
                title: 'Thành công',
                description: 'Đăng nhập bằng Google thành công!',
                variant: 'default',
            });
        } catch (error) {
            console.error('❌ Google Sign-In failed:', error);

            toast({
                title: 'Lỗi',
                description: error instanceof Error ? error.message : 'Đăng nhập Google thất bại',
                variant: 'destructive',
            });
        } finally {
            setGoogleLoading(false);
        }
    };
    const onSubmit = async (data: RegisterBodyType) => {
        if (loading) return;

        setLoading(true);

        try {            
            const result = await signUp(data.name, data.email, data.password);
            console.log(result);
            
            console.log('✅ Registered user:', result);

            toast({
                description: 'Registration successful!',
            });

            router.push('/register/verify');
        } catch (error: unknown) {
            let errorMessage = 'Registration failed. Please try again.';

            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                    errorMessage = error.response.data || 'Email already exists.';
                }
                console.error('Axios Error:', error.response?.data);
            } else if (error instanceof Error) {
                errorMessage = error.message;
                console.error('JS Error:', error.message);
            }

            toast({
                description: errorMessage,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl p-8 rounded-[2rem] shadow-xl bg-white border-0">
            <h1 className="text-2xl text-center font-semibold mb-6">Sign Up</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    {/* Name Field */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter your full name"
                                        className="!border-none !shadow-none focus-visible:ring-0 focus:outline-none"
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
                                <FormLabel>Email</FormLabel>
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
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter your password"
                                            className="!border-none !shadow-none focus-visible:ring-0 focus-visible:outline-none pr-10"
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

                    <p className="text-sm text-muted-foreground">
                        By continuing, you agree to the{' '}
                        <Link href={'/'} className="underline hover:text-primary">
                            Terms of use
                        </Link>{' '}
                        and{' '}
                        <Link href={'/'} className="underline hover:text-primary">
                            Privacy Policy
                        </Link>
                        .
                    </p>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-rose-400 hover:bg-rose-500 text-white rounded-full mt-2"
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </Button>
                </form>
            </Form>

            <div className="text-center mt-4">
                <p className="text-sm mt-2">
                    Already have an account?{' '}
                    <Link href={Routes.login} className="underline font-medium hover:text-primary">
                        Log in
                    </Link>
                </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 pt-6">
                <div className="flex items-center w-full px-6 gap-4">
                    <div className="border-t border-gray-300 flex-grow" />
                    <span className="text-sm text-muted-foreground">or</span>
                    <div className="border-t border-gray-300 flex-grow" />
                </div>
                <div className="mt-2 w-full flex justify-center">
                    <GoogleButton
                        onClick={handleGoogleSignIn}
                        disabled={googleLoading}
                        style={{
                            opacity: googleLoading ? 0.7 : 1,
                            pointerEvents: googleLoading ? 'none' : 'auto',
                        }}
                    />
                </div>
                {showVerifyDialog && (
                    <VerifyGmailDialog
                        token={gmailToken}
                        onClose={() => setShowVerifyDialog(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default RegisterForm;
