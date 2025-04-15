'use client';

import { useState, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { handleErrorApi } from '@/lib/utils';
import { CreateClass } from '@/lib/services/mentor/createclass';
import { CreateClassBody, CreateClassBodyType } from '@/schemaValidations/class.schema';
import { useRouter } from 'next/navigation';

const backgroundColors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-red-500',
];

export default function CreateClassForm() {
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [bgColor, setBgColor] = useState('bg-blue-500');
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();
    // Initialize form with react-hook-form and zod
    const form = useForm<CreateClassBodyType>({
        resolver: zodResolver(CreateClassBody),
        defaultValues: {
            className: '',
            subject: '',
            topic: '',
            section: '',
            room: '',
            image: '',
        },
    });
    //preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCoverImage(file);
            setImagePreview(URL.createObjectURL(file));
            form.setValue('image', file.name); // Lưu tên tệp vào form
        }
    };

    const handleSubmit = async (data: CreateClassBodyType) => {
        setLoading(true);
        try {
            const response = await CreateClass({
                className: data.className,
                subject: data.subject || '',
                topic: data.topic || '',
                section: data.section || '',
                room: data.room || '',
                coverImage,
                bgColor,
            });

            console.log('API Response:', response);

            router.push('/classes');
            router.refresh();
        } catch (error) {
            handleErrorApi({
                error,
                setError: form.setError,
                duration: 5000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form tạo lớp */}
            <Card className="w-full shadow-md">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Tạo lớp học mới</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                            {/* Class Name */}
                            <FormField
                                control={form.control}
                                name="className"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel htmlFor="className">Tên lớp</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="className"
                                                {...field}
                                                placeholder="Nhập tên lớp"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                    </FormItem>
                                )}
                            />

                            {/* Subject */}
                            <FormField
                                control={form.control}
                                name="subject"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel htmlFor="subject">Môn học</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="subject"
                                                {...field}
                                                placeholder="Toán, Lý, Hóa..."
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                    </FormItem>
                                )}
                            />

                            {/* Topic */}
                            <FormField
                                control={form.control}
                                name="topic"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel htmlFor="topic">Chủ đề</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="topic"
                                                {...field}
                                                placeholder="Chủ đề hoặc nội dung chính"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                    </FormItem>
                                )}
                            />

                            {/* Section */}
                            <FormField
                                control={form.control}
                                name="section"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel htmlFor="section">Section</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="section"
                                                {...field}
                                                placeholder="Ví dụ: Nhóm 1, Khối 10"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                    </FormItem>
                                )}
                            />

                            {/* Room */}
                            <FormField
                                control={form.control}
                                name="room"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel htmlFor="room">Phòng học</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="room"
                                                {...field}
                                                placeholder="A101, B202..."
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                    </FormItem>
                                )}
                            />

                            {/* Cover Image */}
                            <FormItem className="space-y-2">
                                <FormLabel>Ảnh bìa lớp học</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        ref={inputRef}
                                        onChange={handleImageChange}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm" />
                            </FormItem>

                            {/* Background Color */}
                            <FormItem className="space-y-2">
                                <FormLabel>Màu nền lớp</FormLabel>
                                <FormControl>
                                    <div className="flex gap-2 flex-wrap">
                                        {backgroundColors.map((color) => (
                                            <div
                                                key={color}
                                                className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                                                    bgColor === color
                                                        ? 'border-black'
                                                        : 'border-transparent'
                                                } ${color}`}
                                                onClick={() => setBgColor(color)}
                                            />
                                        ))}
                                    </div>
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm" />
                            </FormItem>

                            {/* Submit Button */}
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Đang tạo lớp...' : 'Tạo lớp học'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {/* Preview lớp học */}
            <div className="flex items-center justify-center">
                <Card className="w-full max-w-md shadow-lg overflow-hidden">
                    <div className={`h-36 ${bgColor} relative`}>
                        {imagePreview && (
                            <Image
                                src={imagePreview}
                                alt="Cover"
                                width={500} // Thêm thuộc tính width
                                height={200} // Thêm thuộc tính height
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        )}
                    </div>
                    <CardContent className="space-y-1 py-4">
                        <h2 className="text-lg font-bold">
                            {form.watch('className') || 'Tên lớp'}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {form.watch('subject') || 'Môn học'} •{' '}
                            {form.watch('section') || 'Section'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {form.watch('room') || 'Phòng học'}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
