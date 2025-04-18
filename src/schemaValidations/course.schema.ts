import z from 'zod';

// Schema cho Course
export const CourseSchema = z.object({
    title: z
        .string()
        .min(1, { message: 'Tiêu đề khóa học là bắt buộc' })
        .max(100, { message: 'Tiêu đề không được vượt quá 100 ký tự' }),
    description: z.string().max(500, { message: 'Mô tả không được vượt quá 500 ký tự' }).optional(),
    price: z
        .number()
        .min(0, { message: 'Giá không được âm' })
        .refine((val) => val % 1 === 0, {
            message: 'Giá phải là số nguyên',
        }),
    author: z.string().min(1, { message: 'Tác giả là bắt buộc' }),
    category: z.string().min(1, { message: 'Danh mục là bắt buộc' }),
    createdAt: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), { message: 'Ngày tạo không hợp lệ' })
        .optional(),
});

// Schema cho tạo mới Course (không yêu cầu createdAt)
export const CreateCourseSchema = CourseSchema.omit({ createdAt: true });

// Schema cho cập nhật Course (tất cả trường optional)
export const UpdateCourseSchema = CourseSchema.partial();

// Type inference
export type CourseType = z.infer<typeof CourseSchema>;
export type CreateCourseType = z.infer<typeof CreateCourseSchema>;
export type UpdateCourseType = z.infer<typeof UpdateCourseSchema>;
