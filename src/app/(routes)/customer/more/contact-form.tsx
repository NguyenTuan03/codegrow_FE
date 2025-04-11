'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import Image from 'next/image';

const formSchema = z.object({
    fullName: z.string().min(1, 'Please enter your full name'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(6, 'Invalid phone number'),
    city: z.string().min(1, 'City is required'),
});

type ContactFormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
    const form = useForm<ContactFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            city: '',
        },
    });

    function onSubmit(values: ContactFormValues) {
        console.log(values);
        // TODO: replace with actual API call or toast
    }

    const inputStyle =
        'rounded-full bg-[#6ee7b7] placeholder-white text-white font-semibold px-4 py-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4ade80]';

    return (
        <div className="bg-[#f8fafc] p-6 md:p-10 rounded-xl grid md:grid-cols-2 items-center gap-10">
            <Image
                src="/image 14.png"
                alt="contact"
                width={500}
                height={400}
                className="object-contain mx-auto"
            />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 w-full max-w-md mx-auto"
                >
                    <h3 className="text-xl font-bold text-[#6366f1] text-center uppercase">
                        Đăng ký tư vấn và nhận chương trình chi tiết
                    </h3>

                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className={inputStyle}
                                        placeholder="FullName"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input className={inputStyle} placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className={inputStyle}
                                        placeholder="Phone number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className={inputStyle}
                                        placeholder="Your city"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="rounded-full bg-[#fb7185] hover:bg-[#f43f5e] text-white w-full px-4 py-2 text-sm font-semibold"
                    >
                        Register
                    </Button>
                </form>
            </Form>
        </div>
    );
}
