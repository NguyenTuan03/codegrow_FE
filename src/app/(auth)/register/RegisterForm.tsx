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

// Define the Email Validation API response interface
interface EmailValidationResponse {
    email: string;
    autocorrect?: string;
    deliverability: string;
    quality_score: number;
    is_valid_format: { value: boolean; text: string };
    is_free_email: { value: boolean; text: string };
    is_disposable_email: { value: boolean; text: string };
    is_role_email: { value: boolean; text: string };
    is_catchall_email: { value: boolean; text: string };
    is_mx_found: { value: boolean | null; text: string };
    is_smtp_valid: { value: boolean | null; text: string };
}

function httpGetAsync(
    url: string,
    callback: (error: string | null, result: EmailValidationResponse | null) => void,
) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                try {
                    const response = JSON.parse(xmlHttp.responseText) as EmailValidationResponse;
                    callback(null, response);
                } catch {
                    callback('Failed to parse response', null);
                }
            } else {
                callback(`Request failed with status ${xmlHttp.status}`, null);
            }
        }
    };
    xmlHttp.open('GET', url, true); // true for asynchronous
    xmlHttp.send(null);
}

const RegisterForm = () => {
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [emailValidationResult, setEmailValidationResult] =
        useState<EmailValidationResponse | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    // Không sử dụng useEffect, chỉ gọi validateEmailWithAPI trong onSubmit
    const validateEmailWithAPI = (email: string) => {
        const apiKey = process.env.NEXT_PUBLIC_ABSTRACT_API_KEY || ''; // Use env or fallback
        const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${encodeURIComponent(apiKey)}&email=${encodeURIComponent(email)}`;

        httpGetAsync(url, (error: string | null, result: EmailValidationResponse | null) => {
            if (error) {
                console.error('Error validating email:', error);
                setEmailValidationResult({
                    deliverability: 'UNKNOWN',
                    is_valid_format: { value: false, text: 'FALSE' },
                    is_free_email: { value: false, text: 'FALSE' },
                    is_disposable_email: { value: false, text: 'FALSE' },
                    is_role_email: { value: false, text: 'FALSE' },
                    is_catchall_email: { value: false, text: 'FALSE' },
                    is_mx_found: { value: null, text: 'UNKNOWN' },
                    is_smtp_valid: { value: null, text: 'UNKNOWN' },
                    email: email,
                    quality_score: 0.0,
                });
            } else {
                setEmailValidationResult(result);
            }
        });
    };

    const onSubmit = async (data: RegisterBodyType) => {
        if (loading) return;

        setLoading(true);

        // Gọi API kiểm tra email khi submit
        validateEmailWithAPI(data.email);

        // Chờ 500ms để đảm bảo kết quả email validation được cập nhật
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Kiểm tra email validation result
        if (emailValidationResult && emailValidationResult.deliverability !== 'DELIVERABLE') {
            toast({
                description: 'Please use a valid and deliverable email address.',
                className: 'bg-[#F76F8E] text-black',
            });
            setLoading(false);
            return;
        }

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
                className: 'bg-[#5AD3AF] text-black',
            });

            router.push('/register/verify');
        } catch (error) {
            console.log('❌ Registration error:', error);

            toast({
                description: 'Registration failed. Please try again.',
                className: 'bg-[#F76F8E] text-black',
            });
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
        }
    };

    return (
        <div className="w-full max-w-lg p-8 rounded-[1.5rem] shadow-lg bg-[#EEF1EF] dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-4xl font-bold text-[#657ED4] dark:text-[#5AD3AF] cursor-default">
                    Create an Account
                </h1>
            </div>

            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                    {/* Full Name Field */}
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xl font-medium text-gray-900 dark:text-gray-100 cursor-default">
                                    Full Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter your full name"
                                        className="mt-1 border-gray-300 dark:border-gray-600 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] focus:border-[#657ED4] dark:focus:border-[#5AD3AF] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg cursor-text"
                                    />
                                </FormControl>
                                <FormMessage className="text-base text-red-500 dark:text-red-400 font-medium cursor-default" />
                            </FormItem>
                        )}
                    />

                    {/* Email Field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xl font-medium text-gray-900 dark:text-gray-100 cursor-default">
                                    Email Address
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter your email"
                                        type="email"
                                        className="mt-1 border-gray-300 dark:border-gray-600 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] focus:border-[#657ED4] dark:focus:border-[#5AD3AF] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg cursor-text"
                                    />
                                </FormControl>
                                {emailValidationResult && (
                                    <FormMessage className="text-base text-red-500 dark:text-red-400 font-medium cursor-default">
                                        {emailValidationResult.deliverability !== 'DELIVERABLE' &&
                                            'Email is not deliverable or invalid.'}
                                    </FormMessage>
                                )}
                            </FormItem>
                        )}
                    />

                    {/* Password Field */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xl font-medium text-gray-900 dark:text-gray-100 cursor-default">
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter your password"
                                            className="mt-1 border-gray-300 dark:border-gray-600 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] focus:border-[#657ED4] dark:focus:border-[#5AD3AF] pr-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg cursor-text"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 cursor-pointer"
                                        >
                                            {showPassword ? (
                                                <EyeOffIcon size={18} />
                                            ) : (
                                                <EyeIcon size={18} />
                                            )}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage className="text-base text-red-500 dark:text-red-400 font-medium cursor-default" />
                            </FormItem>
                        )}
                    />

                    {/* Confirm Password Field */}
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xl font-medium text-gray-900 dark:text-gray-100 cursor-default">
                                    Confirm Password
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Confirm your password"
                                            className="mt-1 border-gray-300 dark:border-gray-600 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] focus:border-[#657ED4] dark:focus:border-[#5AD3AF] pr-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg cursor-text"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 cursor-pointer"
                                        >
                                            {showPassword ? (
                                                <EyeOffIcon size={18} />
                                            ) : (
                                                <EyeIcon size={18} />
                                            )}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage className="text-base text-red-500 dark:text-red-400 font-medium cursor-default" />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#424c70] dark:hover:bg-[#4ac2a0] text-white rounded-lg py-2 text-base font-medium cursor-pointer ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </Button>
                </form>
            </Form>

            {/* Links */}
            <div className="text-center mt-4">
                <p className="text-base text-gray-700 dark:text-gray-300 font-medium cursor-default">
                    Already have an account?{' '}
                    <Link
                        href={Routes.login}
                        className="text-[#657ED4] dark:text-[#5AD3AF] font-medium hover:text-[#424c70] dark:hover:text-[#4ac2a0] transition-colors duration-200 underline cursor-pointer"
                    >
                        Log in
                    </Link>
                </p>
            </div>

            {/* Divider */}
            <div className="flex items-center w-full px-6 gap-4 mt-6">
                <div className="border-t border-gray-300 dark:border-gray-600 flex-grow" />
                <span className="text-base text-gray-500 dark:text-gray-400 font-medium cursor-default">
                    or
                </span>
                <div className="border-t border-gray-300 dark:border-gray-600 flex-grow" />
            </div>

            {/* Google Login */}
            <div className="flex justify-center mt-4">
                <Button
                    onClick={handleGoogleLogin}
                    className={`w-full max-w-sm bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#424c70] dark:hover:bg-[#4ac2a0] text-white rounded-lg py-2 flex items-center justify-center gap-2 text-base font-medium cursor-pointer ${
                        googleLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
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
