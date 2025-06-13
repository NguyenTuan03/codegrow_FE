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

// List of a few provinces and cities in Vietnam
const cities = [
    { value: 'An Giang', label: 'An Giang' },
    { value: 'Bà Rịa - Vũng Tàu', label: 'Bà Rịa - Vũng Tàu' },
    { value: 'Bắc Giang', label: 'Bắc Giang' },
    { value: 'Bắc Kạn', label: 'Bắc Kạn' },
    { value: 'Bạc Liêu', label: 'Bạc Liêu' },
    { value: 'Bắc Ninh', label: 'Bắc Ninh' },
    { value: 'Bến Tre', label: 'Bến Tre' },
    { value: 'Bình Định', label: 'Bình Định' },
    { value: 'Bình Dương', label: 'Bình Dương' },
    { value: 'Bình Phước', label: 'Bình Phước' },
    { value: 'Bình Thuận', label: 'Bình Thuận' },
    { value: 'Cà Mau', label: 'Cà Mau' },
    { value: 'Cần Thơ', label: 'Cần Thơ' },
    { value: 'Cao Bằng', label: 'Cao Bằng' },
    { value: 'Đà Nẵng', label: 'Đà Nẵng' },
    { value: 'Đắk Lắk', label: 'Đắk Lắk' },
    { value: 'Đắk Nông', label: 'Đắk Nông' },
    { value: 'Điện Biên', label: 'Điện Biên' },
    { value: 'Đồng Nai', label: 'Đồng Nai' },
    { value: 'Đồng Tháp', label: 'Đồng Tháp' },
    { value: 'Gia Lai', label: 'Gia Lai' },
    { value: 'Hà Giang', label: 'Hà Giang' },
    { value: 'Hà Nam', label: 'Hà Nam' },
    { value: 'Hà Nội', label: 'Hà Nội' },
    { value: 'Hà Tĩnh', label: 'Hà Tĩnh' },
    { value: 'Hải Dương', label: 'Hải Dương' },
    { value: 'Hải Phòng', label: 'Hải Phòng' },
    { value: 'Hậu Giang', label: 'Hậu Giang' },
    { value: 'Hòa Bình', label: 'Hòa Bình' },
    { value: 'Hưng Yên', label: 'Hưng Yên' },
    { value: 'Khánh Hòa', label: 'Khánh Hòa' },
    { value: 'Kiên Giang', label: 'Kiên Giang' },
    { value: 'Kon Tum', label: 'Kon Tum' },
    { value: 'Lai Châu', label: 'Lai Châu' },
    { value: 'Lâm Đồng', label: 'Lâm Đồng' },
    { value: 'Lạng Sơn', label: 'Lạng Sơn' },
    { value: 'Lào Cai', label: 'Lào Cai' },
    { value: 'Long An', label: 'Long An' },
    { value: 'Nam Định', label: 'Nam Định' },
    { value: 'Nghệ An', label: 'Nghệ An' },
    { value: 'Ninh Bình', label: 'Ninh Bình' },
    { value: 'Ninh Thuận', label: 'Ninh Thuận' },
    { value: 'Phú Thọ', label: 'Phú Thọ' },
    { value: 'Phú Yên', label: 'Phú Yên' },
    { value: 'Quảng Bình', label: 'Quảng Bình' },
    { value: 'Quảng Nam', label: 'Quảng Nam' },
    { value: 'Quảng Ngãi', label: 'Quảng Ngãi' },
    { value: 'Quảng Ninh', label: 'Quảng Ninh' },
    { value: 'Quảng Trị', label: 'Quảng Trị' },
    { value: 'Sóc Trăng', label: 'Sóc Trăng' },
    { value: 'Sơn La', label: 'Sơn La' },
    { value: 'Tây Ninh', label: 'Tây Ninh' },
    { value: 'Thái Bình', label: 'Thái Bình' },
    { value: 'Thái Nguyên', label: 'Thái Nguyên' },
    { value: 'Thanh Hóa', label: 'Thanh Hóa' },
    { value: 'Thừa Thiên Huế', label: 'Thừa Thiên Huế' },
    { value: 'Tiền Giang', label: 'Tiền Giang' },
    { value: 'TP Hồ Chí Minh', label: 'TP Hồ Chí Minh' },
    { value: 'Trà Vinh', label: 'Trà Vinh' },
    { value: 'Tuyên Quang', label: 'Tuyên Quang' },
    { value: 'Vĩnh Long', label: 'Vĩnh Long' },
    { value: 'Vĩnh Phúc', label: 'Vĩnh Phúc' },
    { value: 'Yên Bái', label: 'Yên Bái' },
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

            const token = localStorage.getItem('token');

            if (!token) {
                toast({
                    title: 'Lỗi',
                    description: 'Token không tồn tại. Vui lòng đăng nhập lại.',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });

                return;
            }
            const tokenuser = JSON.parse(token);
            console.log('Token user:', tokenuser);

            const res = await RegisterClass(
                tokenuser,
                values.fullName.trim(),
                values.email.trim().toLowerCase(),
                values.phone.trim(),
                values.city.trim(),
                values.note?.trim() || '',
            );

            console.log('Registration successful:', res);

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
                                <FormLabel className="sr-only">Full Name</FormLabel>
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
                                    <div className="relative">
                                        <select
                                            value={field.value}
                                            onChange={field.onChange}
                                            disabled={isSubmitting}
                                            className="w-full rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-700 dark:border-gray-600 text-gray-500 dark:text-gray-200 font-semibold px-4 py-2 pr-10 focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer appearance-none"
                                            aria-label="Select City"
                                        >
                                            <option value="">Select City</option>
                                            {cities.map((city) => (
                                                <option key={city.value} value={city.value}>
                                                    {city.label}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                            <svg
                                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </span>
                                    </div>
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
                        className="rounded-full cursor-pointer bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] text-white w-full px-4 py-2 text-sm font-semibold transition-colors duration-300"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Processing...' : 'Register Now'}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
