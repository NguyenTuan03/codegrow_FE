import z from 'zod';

// Schema cho thời khóa biểu (schedule)
const ScheduleSchema = z.object({
    startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Ngày bắt đầu không hợp lệ.',
    }),
    endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Ngày kết thúc không hợp lệ.',
    }),
    daysOfWeek: z.array(z.string()).min(1, { message: 'Phải có ít nhất một ngày học trong tuần.' }),
    time: z.string().min(1, { message: 'Thời gian học là bắt buộc.' }),
});

// Schema cho việc tạo lớp học
export const CreateClassBody = z.object({
    token: z.string().min(1, { message: 'Token là bắt buộc.' }),
    title: z
        .string()
        .min(1, { message: 'Tên lớp là bắt buộc. Vui lòng nhập tên lớp.' })
        .max(100, { message: 'Tên lớp không được vượt quá 100 ký tự.' }),
    courseId: z.string().min(1, { message: 'Course ID là bắt buộc.' }),
    description: z.string().max(500, { message: 'Mô tả không được vượt quá 500 ký tự.' }),
    maxStudents: z
        .number()
        .int({ message: 'Số học viên phải là số nguyên.' })
        .min(1, { message: 'Số học viên tối đa phải lớn hơn 0.' })
        .max(30, { message: 'Số học viên tối đa không được vượt quá 30.' }),
    schedule: ScheduleSchema,
});

export type CreateClassBodyType = z.infer<typeof CreateClassBody>;
