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
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
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
const formSchema = z.object({
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

export default function UserProfile() {
    // Initialize form
    const form = useForm<z.infer<typeof formSchema>>({
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

    // Handle form submission
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        // Handle form submission logic here
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            {/* Breadcrumb Navigation */}
            <nav className="mb-4 text-base text-gray-600">
                <span>Pages / Users / </span>
                <span className="font-semibold text-gray-900">Add User</span>
            </nav>

            {/* Page Title */}
            <h1 className="text-4xl font-bold mb-8 text-gray-900">Users</h1>

            {/* Main Content */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold text-gray-900">
                                Users
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-8">
                            {/* Step Indicators */}
                            <div className="flex items-center justify-start space-x-4">
                                <div className="flex items-center">
                                    <div className="h-8 w-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-medium">
                                        1
                                    </div>
                                    <span className="ml-2 text-base font-medium text-gray-900">
                                        Profile
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <div className="h-8 w-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-medium">
                                        2
                                    </div>
                                    <span className="ml-2 text-base font-medium text-gray-600">
                                        Billing address
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <div className="h-8 w-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-medium">
                                        3
                                    </div>
                                    <span className="ml-2 text-base font-medium text-gray-600">
                                        Confirmation
                                    </span>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="space-y-6">
                                {/* Avatar */}
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-600">Avatar</label>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src="" />
                                            <AvatarFallback className="bg-blue-500 text-white text-lg">
                                                CB
                                            </AvatarFallback>
                                        </Avatar>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="border-gray-300 text-gray-600 hover:bg-gray-100"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>

                                {/* Full Name */}
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm text-gray-600">
                                                    First name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className="h-12 text-base"
                                                        placeholder="Enter first name"
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
                                                <FormLabel className="text-sm text-gray-600">
                                                    Last name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className="h-12 text-base"
                                                        placeholder="Enter last name"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Email */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm text-gray-600">
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className="h-12 text-base"
                                                    placeholder="Enter email"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-600">
                                        Phone (optional)
                                    </label>
                                    <div className="flex gap-3">
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className="h-12 text-base"
                                                            placeholder="+x(xxx)xxx-xx-xx"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="phoneType"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className="w-[120px] h-12 text-base">
                                                                <SelectValue placeholder="Type" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="mobile">
                                                                Mobile
                                                            </SelectItem>
                                                            <SelectItem value="work">
                                                                Work
                                                            </SelectItem>
                                                            <SelectItem value="home">
                                                                Home
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="link"
                                        className="h-auto p-0 text-blue-600 hover:text-blue-700 text-base"
                                    >
                                        + Add Phone
                                    </Button>
                                </div>

                                {/* Organization */}
                                <FormField
                                    control={form.control}
                                    name="organization"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm text-gray-600">
                                                Organization
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className="h-12 text-base"
                                                    placeholder="Enter organization"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Department */}
                                <FormField
                                    control={form.control}
                                    name="department"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm text-gray-600">
                                                Department
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className="h-12 text-base"
                                                    placeholder="Enter department"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Account Type */}
                                <FormField
                                    control={form.control}
                                    name="accountType"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel className="text-sm text-gray-600">
                                                Account Type
                                            </FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="customer" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal text-base text-gray-900">
                                                            Customer
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="mentor" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal text-base text-gray-900">
                                                            Mentor
                                                        </FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>

                        <CardFooter className="flex justify-end">
                            <Button
                                type="submit"
                                className="h-12 px-6 text-base bg-teal-500 hover:bg-teal-600"
                            >
                                Next <span className="ml-2">→</span>
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </div>
    );
}
