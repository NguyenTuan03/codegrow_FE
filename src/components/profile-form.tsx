'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
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
import { ProfileResType, UpdateMeBody, UpdateMeBodyType } from '@/schemaValidations/profile.schema';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UpdateAccount } from '@/lib/services/admin/updateaccount';
import { Edit } from 'lucide-react';
import { Card } from './ui/card';

type Profile = ProfileResType['data'];

const ProfileForm = ({ profile }: { profile: Profile }) => {
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined); // Changed from File | null to File | undefined
    const [avatarPreview, setAvatarPreview] = useState<string | null>(profile.avatar || null);
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<UpdateMeBodyType>({
        resolver: zodResolver(UpdateMeBody),
        defaultValues: {
            fullName: profile.fullName || '',
            email: profile.email || '',
            role: profile.role || '',
        },
    });

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                toast({
                    title: '❌ Invalid File Type',
                    description: 'Please upload an image file (JPEG, PNG, or GIF).',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
                return;
            }

            // Validate file size (e.g., max 5MB)
            const maxSize = 5 * 1024 * 1024; // 5MB in bytes
            if (file.size > maxSize) {
                toast({
                    title: '❌ File Too Large',
                    description: 'Please upload an image smaller than 5MB.',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
                return;
            }

            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setAvatarFile(undefined);
            setAvatarPreview(profile.avatar || null);
        }
    };

    async function onSubmit(values: UpdateMeBodyType) {
        if (loading) return;
        setLoading(true);

        try {
            const token = localStorage.getItem('token') || '';
            const id = profile._id;
            const result = await UpdateAccount(
                token,
                id,
                values.fullName,
                values.email,
                values.role || '',
                avatarFile, // Now correctly typed as File | undefined
            );

            setIsEditing(false);
            setAvatarFile(undefined);
            setAvatarPreview(result.data?.avatar || profile.avatar || null);
            router.refresh();
            window.location.reload(); // Full page reload
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto p-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-[#657ED4] dark:text-[#5AD3AF]">
                            Profile Management
                        </h1>
                        <p className="text-base text-gray-600 dark:text-gray-400 mt-2 font-medium">
                            Update your profile information below.
                        </p>
                    </div>
                </div>

                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
                    {/* Header with Avatar */}
                    <div className="bg-gradient-to-r from-[#657ED4] to-[#4a5da0] dark:from-[#5AD3AF] dark:to-[#4ac2a0] p-6 flex items-center space-x-6">
                        <div className="relative">
                            <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-700 shadow-lg">
                                <AvatarImage src={avatarPreview || '/default-avatar.png'} />
                                <AvatarFallback className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                                    {profile.fullName?.charAt(0) || 'U'}
                                </AvatarFallback>
                            </Avatar>
                            {isEditing && (
                                <label
                                    htmlFor="avatar-upload"
                                    className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md cursor-pointer"
                                >
                                    <Edit className="h-5 w-5 text-[#657ED4] dark:text-[#5AD3AF]" />
                                    <input
                                        id="avatar-upload"
                                        type="file"
                                        accept="image/jpeg,image/png,image/gif"
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">{profile.fullName}</h1>
                            <p className="text-white/80 font-medium">{profile.role}</p>
                        </div>
                    </div>

                    {/* Form Content */}
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="p-8 space-y-6"
                            noValidate
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 dark:text-gray-200 font-semibold">
                                                Full Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={!isEditing}
                                                    className={`rounded-lg ${
                                                        !isEditing
                                                            ? 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                                            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF]'
                                                    } transition-all duration-200`}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500 font-medium" />
                                        </FormItem>
                                    )}
                                />

                                {/* Email */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 dark:text-gray-200 font-semibold">
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={!isEditing}
                                                    className={`rounded-lg ${
                                                        !isEditing
                                                            ? 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                                            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF]'
                                                    } transition-all duration-200`}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500 font-medium" />
                                        </FormItem>
                                    )}
                                />

                                {/* Role */}
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 dark:text-gray-200 font-semibold">
                                                Role
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    readOnly
                                                    {...field}
                                                    disabled={!isEditing}
                                                    className={`rounded-lg ${
                                                        !isEditing
                                                            ? 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                                            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF]'
                                                    } transition-all duration-200`}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500 font-medium" />
                                        </FormItem>
                                    )}
                                />

                                {/* Wallet */}
                                <FormItem>
                                    <FormLabel className="text-gray-700 dark:text-gray-200 font-semibold">
                                        Wallet
                                    </FormLabel>
                                    <FormControl>
                                        <div className="flex items-center space-x-2">
                                            <Input
                                                value={profile.wallet}
                                                readOnly
                                                className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg"
                                            />
                                            <span className="text-gray-500 dark:text-gray-400 font-medium">
                                                VNĐ
                                            </span>
                                        </div>
                                    </FormControl>
                                </FormItem>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                                {!isEditing ? (
                                    <div className="flex justify-end">
                                        <Button
                                            type="button"
                                            onClick={() => setIsEditing(true)}
                                            className="bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md"
                                        >
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit Profile
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex justify-end space-x-4">
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                setIsEditing(false);
                                                setAvatarFile(undefined);
                                                setAvatarPreview(profile.avatar || null);
                                                form.reset();
                                            }}
                                            className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-md font-medium"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="px-6 py-3 bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#4a5da0] dark:hover:bg-[#4ac2a0] text-white rounded-lg transition-all duration-200 shadow-md font-medium disabled:opacity-70"
                                        >
                                            {loading ? (
                                                <span className="flex items-center">
                                                    <svg
                                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                    Saving...
                                                </span>
                                            ) : (
                                                'Save Changes'
                                            )}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </form>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default ProfileForm;
