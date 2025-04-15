import z from 'zod';

// Body gửi lên khi update profile
export const UpdateProfileBody = z
    .object({
        fullName: z.string().trim().min(2).max(256),
        password: z.string().min(6).optional(),
        confirmPassword: z.string().min(6).optional(),
        imgUrl: z.string().url().optional(),
        phone: z.string().min(9).max(15).optional(),
    })
    .refine(
        (data) => {
            if (data.password || data.confirmPassword) {
                return data.password === data.confirmPassword;
            }
            return true;
        },
        {
            message: 'Mật khẩu xác nhận không khớp',
            path: ['confirmPassword'],
        },
    );

export type UpdateProfileBodyType = z.infer<typeof UpdateProfileBody>;

// Response (tùy server trả gì, bạn có thể giữ nguyên hoặc sửa)
export const UpdateProfileRes = z.object({
    data: z.object({
        id: z.number(),
        fullName: z.string(),
        email: z.string(),
        imgUrl: z.string().nullable().optional(),
        phone: z.string().nullable().optional(),
    }),
    message: z.string(),
});

export type UpdateProfileResType = z.infer<typeof UpdateProfileRes>;
