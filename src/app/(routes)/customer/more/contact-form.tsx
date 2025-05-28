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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import { RegisterClass } from '@/lib/services/api/registerclass';

// List of a few provinces and cities in Vietnam
const cities = [
    { value: 'Hà Nội', label: 'Hà Nội' },
    { value: 'Hồ Chí Minh', label: 'Hồ Chí Minh' },
    { value: 'Đà Nẵng', label: 'Đà Nẵng' },
    { value: 'Hải Phòng', label: 'Hải Phòng' },
    { value: 'Cần Thơ', label: 'Cần Thơ' },
    { value: 'Nha Trang', label: 'Nha Trang' },
];

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
    city: z.string().min(1, 'City is required').max(100, 'City cannot exceed 100 characters'),
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

            toast({
                title: 'Success!',
                description: res.message || 'Your registration was submitted successfully',
                variant: 'default',
                className: 'bg-[#657ED4] dark:bg-[#5AD3AF] text-white dark:text-black',
            });

            form.reset();
        } catch (error) {
            console.error('Registration error:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'An unknown error occurred',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black',
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    const inputStyle =
        'rounded-full bg-gray-100 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-gray-200 font-semibold px-4 py-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#657ED4] dark:focus-visible:ring-[#5AD3AF]';

    return (
        <div className="p-6 md:p-10 rounded-xl grid md:grid-cols-2 items-center gap-10 transition-colors duration-300">
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
                        Register for Consultation
                    </h3>

                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="sr-only ">Full Name</FormLabel>
                                <FormControl>
                                    <Input
                                        className={inputStyle}
                                        placeholder="Full Name"
                                        {...field}
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 dark:text-red-400 text-base mt-1" />
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
                                <FormMessage className="text-red-500 dark:text-red-400 text-base mt-1" />
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
                                <FormMessage className="text-red-500 dark:text-red-400 text-base mt-1" />
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
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        disabled={isSubmitting}
                                    >
                                        <SelectTrigger
                                            className="w-full rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold px-4 py-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#657ED4] dark:focus-visible:ring-[#5AD3AF]"
                                            aria-label="Select City"
                                        >
                                            <SelectValue placeholder="Select City" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                            {cities.map((city) => (
                                                <SelectItem key={city.value} value={city.value}>
                                                    {city.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="text-red-500 dark:text-red-400 text-base mt-1" />
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
                                <FormMessage className="text-red-500 dark:text-red-400 text-base mt-1" />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="rounded-full bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] text-white w-full px-4 py-2 text-sm font-semibold transition-colors duration-300"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Processing...' : 'Register Now'}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
