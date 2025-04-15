import z from 'zod';

// Schema cho việc tạo lớp học
export const CreateClassBody = z.object({
    className: z
        .string()
        .min(1, { message: 'Tên lớp là bắt buộc. Vui lòng nhập tên lớp.' })
        .max(100, { message: 'Tên lớp không được vượt quá 100 ký tự.' }),
    subject: z.string().max(50, { message: 'Môn học không được vượt quá 50 ký tự.' }).optional(),
    topic: z.string().max(100, { message: 'Chủ đề không được vượt quá 100 ký tự.' }).optional(),
    section: z.string().max(50, { message: 'Section không được vượt quá 50 ký tự.' }).optional(),
    room: z.string().max(20, { message: 'Phòng học không được vượt quá 20 ký tự.' }).optional(),
    image: z.string().optional(), // Cho phép cả URL hoặc tệp
    bgColor: z.string().optional(), // Thêm thuộc tính bgColor
    coverImage: z.instanceof(File).nullable().optional(), // Thêm thuộc tính coverImage
});
export type CreateClassBodyType = z.infer<typeof CreateClassBody>;

// Schema cho thông tin lớp học
export const ClassSchema = z.object({
    id: z.number(),
    name: z
        .string()
        .min(1, { message: 'Tên không được để trống.' })
        .max(100, { message: 'Tên không được vượt quá 100 ký tự.' }),
    price: z.number().min(0, { message: 'Giá phải là một số dương.' }),
    description: z.string().max(500, { message: 'Mô tả không được vượt quá 500 ký tự.' }),
    image: z.string().url({ message: 'Hình ảnh phải là một URL hợp lệ.' }),
});

// Schema cho phản hồi của API khi trả về một lớp học
export const ProductRes = z.object({
    data: ClassSchema,
    message: z.string(),
});
export type ProductResType = z.infer<typeof ProductRes>;

// Schema cho phản hồi của API khi trả về danh sách lớp học
export const ProductListRes = z.object({
    data: z.array(ClassSchema),
    message: z.string(),
});
export type ProductListResType = z.infer<typeof ProductListRes>;

// Schema cho việc cập nhật lớp học (giống với tạo lớp học)
export const UpdateClassBody = CreateClassBody;
export type UpdateClassBodyType = CreateClassBodyType;

// Schema cho tham số của lớp học (ví dụ: ID)
export const ClassParams = z.object({
    id: z.coerce.number({ message: 'ID phải là một số hợp lệ.' }),
});
export type ClassParamsType = z.infer<typeof ClassParams>;
