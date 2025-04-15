'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
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
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const mentors = [
    { id: 'mentor1', name: 'Nguyễn Văn A' },
    { id: 'mentor2', name: 'Trần Thị B' },
    { id: 'mentor3', name: 'Lê Văn C' },
];

const backgroundColors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-red-500',
];

// Define validation schema with Zod
const formSchema = z.object({
    className: z.string().min(1, { message: 'Tên lớp là bắt buộc' }),
    subject: z.string().optional(),
    topic: z.string().optional(),
    section: z.string().optional(),
    room: z.string().optional(),
    mentorId: z.string().optional(),
});

export default function CreateClassPage() {
    const [coverImage, setCoverImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [bgColor, setBgColor] = useState('bg-blue-500');

    // Initialize form with react-hook-form and zod
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            className: '',
            subject: '',
            topic: '',
            section: '',
            room: '',
            mentorId: '',
        },
    });

    // Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setCoverImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Handle form submission
    const handleSubmit = (values) => {
        const mentor = mentors.find((m) => m.id === values.mentorId)?.name;
        console.log({ ...values, mentor, coverImage, bgColor });
        alert('Class created successfully!');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                        <FormMessage />
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
                                        <FormMessage />
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
                                        <FormMessage />
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
                                        <FormMessage />
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Mentor */}
                            <FormField
                                control={form.control}
                                name="mentorId"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel htmlFor="mentor">Mentor / Chủ nhiệm</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Chọn mentor" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {mentors.map((mentor) => (
                                                        <SelectItem
                                                            key={mentor.id}
                                                            value={mentor.id}
                                                        >
                                                            {mentor.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
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
                                        onChange={handleImageChange}
                                    />
                                </FormControl>
                                <FormMessage />
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
                                <FormMessage />
                            </FormItem>

                            {/* Submit Button */}
                            <Button type="submit" className="w-full">
                                Tạo lớp học
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
                            <img
                                src={imagePreview}
                                alt="Cover"
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
                        <p className="text-sm">
                            {mentors.find((m) => m.id === form.watch('mentorId'))?.name ||
                                'Mentor chưa chọn'}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
