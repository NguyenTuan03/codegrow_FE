import { CreateClassBodyType } from '@/schemaValidations/class.schema';
import httpRequest from '../HttpRequest';

export const CreateClass = async ({
    className,
    subject,
    topic,
    section,
    room,
    coverImage,
    bgColor,
}: CreateClassBodyType) => {
    try {
        const formData = new FormData();
        formData.append('className', className);
        formData.append('subject', subject || '');
        formData.append('topic', topic || '');
        formData.append('section', section || '');
        formData.append('room', room || '');
        formData.append('bgColor', bgColor || ''); // Thêm màu nền vào formData
        if (coverImage) {
            formData.append('coverImage', coverImage); // Gửi tệp hình ảnh
        }

        const response = await httpRequest.post('mentor/classes/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from CreateClass API:', error);
        throw error;
    }
};
