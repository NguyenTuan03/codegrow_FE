// components/add-form.tsx
'use client';

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
import { CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// Define form schema
export const formSchema = z.object({
    avatar: z.string().optional(),
    firstName: z.string().min(2, {
        message: 'First name must be at least 2 characters.',
    }),
    lastName: z.string().min(2, {
        message: 'Last name must be at least 2 characters.',
    }),
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    phone: z.string().optional(),
    phoneType: z.string().optional(),
    organization: z.string().min(2, {
        message: 'Organization must be at least 2 characters.',
    }),
    department: z.string().min(2, {
        message: 'Department must be at least 2 characters.',
    }),
    accountType: z.enum(['customer', 'mentor'], {
        required_error: 'Please select an account type.',
    }),
});

export type FormData = z.infer<typeof formSchema>;

interface AddUserFormProps {
    onNext: (data: FormData) => void;
}

export default function AddUserForm({ onNext }: AddUserFormProps) {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: 'Clarice',
            lastName: 'Boone',
            email: 'clarice@site.com',
            phone: '+x(xxx)xxx-xx-xx',
            phoneType: 'mobile',
            organization: 'Htmlstream',
            department: 'Human resources',
            accountType: 'customer',
        },
    });

    function onSubmit(values: FormData) {
        onNext(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-6 p-6">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center gap-4 mb-6">
                        <Avatar className="h-24 w-24 border-2 border-indigo-100">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl font-medium">
                                CB
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"
                            >
                                Change Avatar
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="text-gray-500 hover:text-gray-700"
                            >
                                Remove
                            </Button>
                        </div>
                    </div>

                    {/* Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 font-medium">
                                        First name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="h-12 focus-visible:ring-2 focus-visible:ring-indigo-500"
                                            placeholder="Enter first name"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* Last Name */}
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 font-medium">
                                        Last name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="h-12 focus-visible:ring-2 focus-visible:ring-indigo-500"
                                            placeholder="Enter last name"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel className="text-gray-700 font-medium">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="h-12 focus-visible:ring-2 focus-visible:ring-indigo-500"
                                            placeholder="Enter email"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* Phone */}
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-gray-700 font-medium">Phone (optional)</label>
                            <div className="flex gap-3">
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className="h-12 focus-visible:ring-2 focus-visible:ring-indigo-500"
                                                    placeholder="+x(xxx)xxx-xx-xx"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phoneType"
                                    render={({ field }) => (
                                        <FormItem className="w-[120px]">
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="h-12 focus:ring-2 focus:ring-indigo-500">
                                                        <SelectValue placeholder="Type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="mobile">Mobile</SelectItem>
                                                    <SelectItem value="work">Work</SelectItem>
                                                    <SelectItem value="home">Home</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                type="button"
                                variant="link"
                                className="h-auto p-0 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                            >
                                + Add another phone
                            </Button>
                        </div>

                        {/* Organization */}
                        <FormField
                            control={form.control}
                            name="organization"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 font-medium">
                                        Organization
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="h-12 focus-visible:ring-2 focus-visible:ring-indigo-500"
                                            placeholder="Enter organization"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* Department */}
                        <FormField
                            control={form.control}
                            name="department"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 font-medium">
                                        Department
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="h-12 focus-visible:ring-2 focus-visible:ring-indigo-500"
                                            placeholder="Enter department"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* Account Type */}
                        <FormField
                            control={form.control}
                            name="accountType"
                            render={({ field }) => (
                                <FormItem className="space-y-3 md:col-span-2">
                                    <FormLabel className="text-gray-700 font-medium">
                                        Account Type
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex gap-6"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        value="customer"
                                                        className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-medium text-gray-700">
                                                    Customer
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        value="mentor"
                                                        className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-medium text-gray-700">
                                                    Mentor
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>
                </CardContent>

                <CardFooter className="flex justify-end px-6 pb-6 pt-4 border-t border-gray-100">
                    <Button
                        type="submit"
                        className="h-12 px-8 text-base font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-sm"
                    >
                        Continue to Confirmation
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 ml-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Button>
                </CardFooter>
            </form>
        </Form>
    );
}
