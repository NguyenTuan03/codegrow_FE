'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Define the form schema using zod
const profileSchema = z.object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    role: z.string().min(1, { message: 'Role is required' }),
    country: z.string().min(1, { message: 'Country is required' }),
    city: z.string().min(1, { message: 'City/Region is required' }),
    postal: z.string().min(1, { message: 'Postal code is required' }),
    tel: z.string().min(1, { message: 'Phone number is required' }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileForm() {
    // Initialize the form with react-hook-form and zod validation
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: 'Rafiqul',
            lastName: 'Rahman',
            email: 'rafiqur.rahman@gmail.com',
            role: 'Team Manager',
            country: 'United Kingdom',
            city: 'Leeds, East London',
            postal: 'ERT 2354',
            tel: '+99 345 346 xxx',
        },
    });

    // Handle form submission
    const onSubmit = (data: ProfileFormValues) => {
        console.log('Profile updated:', data);
        // Add your form submission logic here (e.g., API call)
    };

    return (
        <div className="flex flex-col gap-8 p-6 bg-white shadow-md rounded-lg">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
                <p className="text-sm text-gray-600">Update your personal information below</p>
            </div>

            {/* Avatar + Basic Info */}
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-28 h-28 rounded-full overflow-hidden border border-gray-300 shadow-sm">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div className="text-center md:text-left">
                    <p className="text-lg font-medium text-gray-900">Rafiqul Rahman</p>
                    <p className="text-sm text-gray-600">Leeds, United Kingdom</p>
                </div>
            </div>

            {/* Personal Info */}
            <div className="space-y-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                        <Separator className="bg-gray-300" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700">
                                            First Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="firstName"
                                                placeholder="Rafiqul"
                                                className="mt-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700">
                                            Last Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="lastName"
                                                placeholder="Rahman"
                                                className="mt-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700">
                                            Email Address
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="email"
                                                placeholder="rafiqur.rahman@gmail.com"
                                                className="mt-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700">
                                            Role
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="role"
                                                placeholder="Team Manager"
                                                className="mt-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Separator className="bg-gray-300" />
                        {/* Address */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700">
                                            Country
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="country"
                                                placeholder="United Kingdom"
                                                className="mt-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700">
                                            City/Region
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="city"
                                                placeholder="Leeds, East London"
                                                className="mt-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="postal"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700">
                                            Postal Code
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="postal"
                                                placeholder="ERT 2354"
                                                className="mt-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tel"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700">
                                            Phone
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="tel"
                                                placeholder="+99 345 346 xxx"
                                                className="mt-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Save Changes Button */}
                        <div className="flex justify-end mt-6">
                            <Button
                                type="submit"
                                className="text-sm bg-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded-md"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
