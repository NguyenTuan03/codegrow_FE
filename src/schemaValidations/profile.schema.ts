import { z } from 'zod';

export const ProfileRes = z
    .object({
        data: z.object({
            _id: z.string(),
            fullName: z.string(),
            email: z.string().email(),
            avatar: z.string().optional(),
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
    // Removed avatar from Zod validation since it's a file
});

export type UpdateMeBodyType = z.TypeOf<typeof UpdateMeBody>;
