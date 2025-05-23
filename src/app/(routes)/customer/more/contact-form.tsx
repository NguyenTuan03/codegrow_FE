'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
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
import { RegisterClass } from '@/lib/services/api/registerclass';

const formSchema = z.object({
    fullName: z
        .string()
        .min(1, 'Full name is required')
        .max(50, 'Name cannot exceed 50 characters'),
    email: z.string().email('Invalid email address').max(100, 'Email cannot exceed 100 characters'),
    phone: z
        .string()
        .min(6, 'Phone number must be at least 6 characters')
        .max(15, 'Phone number cannot exceed 15 characters')
        .regex(/^[0-9+]+$/, 'Phone number can only contain numbers and +'),
    note: z.string().max(500, 'Note cannot exceed 500 characters').optional(),
    city: z.string().max(100, 'City cannot exceed 100 characters'),
});

type ContactFormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            city: '',
            note: '',
        },
    });

    async function onSubmit(values: ContactFormValues) {
        try {
            setIsSubmitting(true);

            // Safely get token from localStorage
            const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

            if (!token) {
                throw new Error('Authentication required. Please log in.');
            }

            const res = await RegisterClass(
                token,
                values.fullName.trim(),
                values.email.trim().toLowerCase(),
                values.phone.trim(),
                values.city.trim(),
                values.note?.trim() || '',
            );
            console.log('Registration response:', res);
            toast({
                title: 'Success!',
                description: 'Your registration was submitted successfully',
                variant: 'default',
            });

            form.reset();
        } catch (error) {
            console.error('Registration error:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const inputStyle =
        'rounded-full bg-[#6ee7b7] dark:bg-[#657ED4] placeholder-white dark:placeholder-gray-200 text-white dark:text-white font-semibold px-4 py-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4ade80] dark:focus-visible:ring-[#5AD3AF]';

    return (
        <div className="bg-[#EEF1EF] dark:bg-[#1f2937] p-6 md:p-10 rounded-xl grid md:grid-cols-2 items-center gap-10 transition-colors duration-300">
            <Image
                src="/image 14.png"
                alt="Contact illustration"
                width={500}
                height={400}
                className="object-contain mx-auto"
                priority
            />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 w-full max-w-md mx-auto"
                >
                    <h3 className="text-xl font-bold text-[#657ED4] dark:text-[#5AD3AF] text-center uppercase">
                        Register for consultation
                    </h3>

                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="sr-only">Full Name</FormLabel>
                                <FormControl>
                                    <Input
                                        className={inputStyle}
                                        placeholder="Full Name"
                                        {...field}
                                        disabled={isSubmitting}
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
                                <FormLabel className="sr-only">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        className={inputStyle}
                                        placeholder="Email"
                                        type="email"
                                        {...field}
                                        disabled={isSubmitting}
                                    />
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
                                <FormLabel className="sr-only">Phone Number</FormLabel>
                                <FormControl>
                                    <Input
                                        className={inputStyle}
                                        placeholder="Phone Number"
                                        type="tel"
                                        {...field}
                                        disabled={isSubmitting}
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
                                <FormLabel className="sr-only">City</FormLabel>
                                <FormControl>
                                    <Input
                                        className={inputStyle}
                                        placeholder="City"
                                        {...field}
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="note"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="sr-only">Additional Notes</FormLabel>
                                <FormControl>
                                    <Input
                                        className={inputStyle}
                                        placeholder="Additional Notes (Optional)"
                                        {...field}
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1" />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="rounded-full bg-[#f76f8e] dark:bg-[#5AD3AF] hover:bg-[#fc8498] dark:hover:bg-[#4ac2a0] text-white w-full px-4 py-2 text-sm font-semibold transition-colors duration-300"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Processing...' : 'Register Now'}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
