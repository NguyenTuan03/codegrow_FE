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
import { handleErrorApi } from '@/lib/utils';
import { useState } from 'react';
import { updateProfile } from '@/lib/services/api/UpdateProfile';
import { UpdateProfileBody, UpdateProfileBodyType } from '@/schemaValidations/account.schema';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Import Avatar từ shadcn

interface Profile {
    fullName: string;
    email: string;
    imgUrl?: string;
    phone?: string;
}

const ProfileForm = ({ profile }: { profile: Profile }) => {
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState(profile.imgUrl || '/default-avatar.png'); // Avatar mặc định
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<UpdateProfileBodyType>({
        resolver: zodResolver(UpdateProfileBody),
        defaultValues: {
            fullName: profile.fullName || '',
            password: '',
            confirmPassword: '',
            imgUrl: profile.imgUrl || '',
            phone: profile.phone || '',
        },
    });

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatar(reader.result as string); // Hiển thị ảnh mới
                form.setValue('imgUrl', reader.result as string); // Cập nhật giá trị imgUrl
            };
            reader.readAsDataURL(file);
        }
    };

    async function onSubmit(values: UpdateProfileBodyType) {
        if (loading) return;
        setLoading(true);

        try {
            const result = await updateProfile(
                values.fullName,
                values.password || '',
                values.confirmPassword || '',
                values.imgUrl || '',
                values.phone || '',
            );

            toast({
                title: '🎉 Cập nhật thành công',
                description: result.message || 'Thông tin đã được lưu.',
                className: 'bg-green-500 text-white',
            });

            router.refresh();
        } catch (error: any) {
            handleErrorApi({
                error,
                setError: form.setError,
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 max-w-xl w-full bg-white p-6 rounded-xl shadow-sm"
                noValidate
            >
                {/* Avatar */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                        <Avatar className="w-32 h-32">
                            <AvatarImage src={avatar} alt="Avatar" />
                            <AvatarFallback>AV</AvatarFallback>
                        </Avatar>
                        <label
                            htmlFor="avatar-upload"
                            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-blue-600 transition"
                        >
                            <span className="material-icons">edit</span>
                        </label>
                        <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                    </div>
                </div>

                {/* Email read-only */}
                <div className="space-y-1">
                    <FormLabel>Email</FormLabel>
                    <Input
                        value={profile.email}
                        readOnly
                        className="bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* Full Name */}
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Họ và tên</FormLabel>
                            <FormControl>
                                <Input placeholder="Nguyễn Văn A" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Phone */}
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Số điện thoại</FormLabel>
                            <FormControl>
                                <Input placeholder="0123456789" type="tel" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Password */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mật khẩu mới</FormLabel>
                            <FormControl>
                                <Input placeholder="********" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Confirm Password */}
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nhập lại mật khẩu</FormLabel>
                            <FormControl>
                                <Input placeholder="********" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit */}
                <Button type="submit" disabled={loading} className="w-full mt-4">
                    {loading ? 'Đang cập nhật...' : 'Cập nhật thông tin'}
                </Button>
            </form>
        </Form>
    );
};

export default ProfileForm;
