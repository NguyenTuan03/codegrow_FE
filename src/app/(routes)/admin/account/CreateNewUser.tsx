'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

type FormValues = {
    fullName: string;
    email: string;
    role: string;
    password: string;
};

export default function CreateNewUser({
    onClose,
    onCreate,
}: {
    onClose: () => void;
    onCreate: (
        newData: Partial<{ fullName: string; email: string; role: string; password: string }>,
    ) => void;
}) {
    const form = useForm<FormValues>({
        defaultValues: {
            fullName: '',
            email: '',
            role: '',
            password: '',
        },
    });
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay with blur effect */}
            <div
                className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Form Card */}
            <Card className="w-[500px] bg-gray-200 dark:bg-gray-800 dark:text-white relative z-10 gap-10 pointer-events-auto rounded-lg shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Create Account</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form className="space-y-4" onSubmit={form.handleSubmit(onCreate)}>
                            {/* Name Field */}
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter full name"
                                                className="bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
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
                                                placeholder="Enter email"
                                                type="email"
                                                className="bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password Field */}
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
                                                    placeholder="Enter password"
                                                    className="bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 dark:text-gray-400"
                                                    tabIndex={-1}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="w-5 h-5" />
                                                    ) : (
                                                        <Eye className="w-5 h-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Role Field */}
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 rounded-lg">
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-lg">
                                                    <SelectItem
                                                        value="mentor"
                                                        className="hover:bg-blue-100 dark:hover:bg-blue-700"
                                                    >
                                                        Mentor
                                                    </SelectItem>
                                                    <SelectItem
                                                        value="customer"
                                                        className="hover:bg-blue-100 dark:hover:bg-blue-700"
                                                    >
                                                        Customer
                                                    </SelectItem>
                                                    <SelectItem
                                                        value="qaqc"
                                                        className="hover:bg-blue-100 dark:hover:bg-blue-700"
                                                    >
                                                        QAQC
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-2 mt-6">
                                <Button
                                    variant="outline"
                                    type="button"
                                    className="bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-blue-500 dark:bg-blue-700 text-white hover:bg-blue-600 dark:hover:bg-blue-600"
                                >
                                    Create
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
