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

type Profile = ProfileResType['data'];

const ProfileForm = ({ profile }: { profile: Profile }) => {
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
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

    // Giữ nguyên hàm onSubmit của bạn
    async function onSubmit(values: UpdateMeBodyType) {
        if (loading) return;
        setLoading(true);

        console.log('Dữ liệu gửi đến API:', values);

        try {
            const token = localStorage.getItem('token') || '';
            const id = profile._id.toString();
            const result = await UpdateAccount(
                token,
                id,
                values.fullName,
                values.email,
                values.role || '',
            );
            console.log('Kết quả từ API:', result);

            toast({
                title: '🎉 Cập nhật thành công',
                description: result.message || 'Thông tin đã được cập nhật.',
                className: 'bg-green-500 text-white',
            });

            setIsEditing(false);
            router.refresh();
        } catch (error) {
            console.error('Lỗi từ API:', error);
            toast({
                title: '❌ Cập nhật thất bại',
                description: 'Có lỗi xảy ra trong quá trình cập nhật thông tin.',
                className: 'bg-red-500 text-white',
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Header với avatar */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 flex items-center space-x-6">
                    <div className="relative">
                        <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                            <AvatarImage src={profile.imgUrl || '/default-avatar.png'} />
                            <AvatarFallback className="text-2xl font-semibold">
                                {profile.fullName?.charAt(0) || 'U'}
                            </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                            <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-blue-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">{profile.fullName}</h1>
                        <p className="text-blue-100">{profile.role}</p>
                    </div>
                </div>

                {/* Form content */}
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="p-8 space-y-6"
                        noValidate
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-medium">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={!isEditing}
                                                className={`rounded-lg ${!isEditing ? 'bg-gray-50 text-gray-600' : 'bg-white border-gray-300'}`}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                    </FormItem>
                                )}
                            />

                            {/* Full Name */}
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-medium">
                                            Họ và tên
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={!isEditing}
                                                className={`rounded-lg ${!isEditing ? 'bg-gray-50 text-gray-600' : 'bg-white border-gray-300'}`}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                    </FormItem>
                                )}
                            />

                            {/* Role */}
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-medium">
                                            Vai trò
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                readOnly
                                                {...field}
                                                disabled={!isEditing}
                                                className={`rounded-lg ${!isEditing ? 'bg-gray-50 text-gray-600' : 'bg-white border-gray-300'}`}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                    </FormItem>
                                )}
                            />

                            {/* Wallet */}
                            <FormItem>
                                <FormLabel className="text-gray-700 font-medium">
                                    Số dư ví
                                </FormLabel>
                                <FormControl>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            value={profile.wallet}
                                            readOnly
                                            className="bg-gray-50 text-gray-600 rounded-lg"
                                        />
                                        <span className="text-gray-500">VNĐ</span>
                                    </div>
                                </FormControl>
                            </FormItem>
                        </div>

                        {/* Action buttons */}
                        <div className="pt-6 border-t border-gray-200">
                            {!isEditing ? (
                                <div className="flex justify-end">
                                    <Button
                                        type="button"
                                        onClick={() => setIsEditing(true)}
                                        className="bg-[#657ED4] hover:bg-[#5A6BBE] text-white px-6 py-3 rounded-lg shadow-sm transition-colors"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-2"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                        Chỉnh sửa thông tin
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex justify-end space-x-4">
                                    <Button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
                                    >
                                        Hủy bỏ
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="px-6 py-3 bg-[#657ED4] hover:bg-[#5A6BBE] text-white rounded-lg shadow-sm transition-colors disabled:opacity-70"
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
                                                Đang lưu...
                                            </span>
                                        ) : (
                                            'Lưu thay đổi'
                                        )}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default ProfileForm;
