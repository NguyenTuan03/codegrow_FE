import z from 'zod';

export const ProfileRes = z
    .object({
        data: z.object({
            _id: z.number(),
            fullName: z.string(),
            email: z.string().email(),
            imgUrl: z.string().url().optional(),
            wallet: z.string().optional(),
            role: z.string().optional(),
        }),
        message: z.string(),
    })
    .strict();

export type ProfileResType = z.TypeOf<typeof ProfileRes>;

export const UpdateMeBody = z.object({
    fullName: z.string().trim().min(2).max(256),
    email: z.string().email(),
    role: z.string().optional(),
});

export type UpdateMeBodyType = z.TypeOf<typeof UpdateMeBody>;
