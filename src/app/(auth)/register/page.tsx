'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
import PhoneInput from 'react-phone-input-2';
import GoogleButton from 'react-google-button';
import Link from 'next/link';
import { Routes } from '@/lib/config/Routes';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
const Register = () => {
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const { toast } = useToast();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: RegisterBodyType) => {
        if (loading) return;
        setLoading(true);

        try {
            console.log('User registered:', { ...data, phone });
            toast({ description: 'Registration successful!' });
            router.push('/');
        } catch (error: any) {
            toast({
                description: 'Registration failed. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card
                style={{ padding: '30px' }}
                className="w-full max-w-2xl rounded-[2rem] shadow-xl bg-white border-0"
            >
                <CardHeader>
                    <CardTitle className="text-2xl text-center font-semibold">Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                            noValidate
                        >
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
                                                className="!border-none !shadow-none  focus-visible:ring-0 focus:outline-none"
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
                                                    type={showPassword ? 'text' : 'password'}
                                                    {...field}
                                                    placeholder="Enter your password"
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

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? 'text' : 'password'}
                                                    {...field}
                                                    placeholder="Re-enter your password"
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

                            <div>
                                <PhoneInput
                                    country={'vn'}
                                    onlyCountries={['vn']}
                                    value={phone}
                                    onChange={setPhone}
                                    placeholder="Số điện thoại"
                                    inputClass="!w-full !rounded-md !shadow-sm !h-[42px] !pl-2"
                                    buttonClass="!border-none"
                                    containerClass="!w-full"
                                />
                            </div>

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
                                {loading ? 'Signing up...' : 'Sign Up'}
                            </Button>
                        </form>
                    </Form>

                    <div className="text-center mt-4">
                        <p className="text-sm mt-2">
                            Already have an account?{' '}
                            <Link href={Routes.login} className="underline font-medium">
                                Log in
                            </Link>
                        </p>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-center gap-2 pt-2">
                    <div className="flex items-center w-full px-6 gap-4">
                        <div className="border-t border-gray-300 flex-grow" />
                        <span className="text-sm text-muted-foreground">or</span>
                        <div className="border-t border-gray-300 flex-grow" />
                    </div>
                    <Button className="mt-2">
                        <GoogleButton
                            onClick={() => {
                                console.log('Google button clicked');
                            }}
                        />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Register;
