'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import Image from 'next/image';

const formSchema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(6, 'Phone number must be at least 6 characters'),
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
        'rounded-full bg-[#6ee7b7] dark:bg-[#657ED4] placeholder-white dark:placeholder-gray-200 text-white dark:text-white font-semibold px-4 py-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4ade80] dark:focus-visible:ring-[#5AD3AF]';

    return (
        <div className="bg-[#EEF1EF] dark:bg-[#1f2937] p-6 md:p-10 rounded-xl grid md:grid-cols-2 items-center gap-10 transition-colors duration-300">
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
                    <h3 className="text-xl font-bold text-[#657ED4] dark:text-[#5AD3AF] text-center uppercase">
                        Register for consultation and receive detailed program
                    </h3>

                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className={inputStyle}
                                        placeholder="Full Name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1" />
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
                                <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1" />
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
                                        placeholder="Phone Number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1" />
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
                                        placeholder="Your City"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1" />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="rounded-full bg-[#f76f8e] dark:bg-[#5AD3AF] hover:bg-[#fc8498] dark:hover:bg-[#4ac2a0] text-white w-full px-4 py-2 text-sm font-semibold transition-colors duration-300"
                    >
                        Register Now
                    </Button>
                </form>
            </Form>
        </div>
    );
}
