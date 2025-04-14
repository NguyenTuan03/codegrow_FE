import z from 'zod';

export const RegisterBody = z
    .object({
        name: z.string().trim().min(2, 'Tên quá ngắn').max(256, 'Tên quá dài'),
        email: z.string().email('Email không hợp lệ'),
        password: z.string().min(6, 'Mật khẩu phải ít nhất 6 ký tự').max(100),
    })
    .strict();

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;

export const RegisterRes = z.object({
    data: z.object({
        token: z.string(),
        expiresAt: z.string(),
        account: z.object({
            id: z.number(),
            name: z.string(),
            email: z.string(),
        }),
    }),
    message: z.string(),
});

export type RegisterResType = z.TypeOf<typeof RegisterRes>;

export const LoginBody = z
    .object({
        email: z.string().email(),
        password: z.string().min(6).max(100),
    })
    .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const LoginRes = RegisterRes;
export type LoginResType = z.TypeOf<typeof LoginRes>;

export const SlideSessionBody = z.object({}).strict();
export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>;

export const SlideSessionRes = RegisterRes;
export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>;
