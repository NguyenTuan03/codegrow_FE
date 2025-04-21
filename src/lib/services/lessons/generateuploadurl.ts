import httpRequest from '@/lib/util/HttpRequest';

interface CreateLessonParams {
    token: string;
    fileName: string;
    fileType: string;
}

export const GenerateUploadUrl = async ({ token, fileName, fileType }: CreateLessonParams) => {
    try {
        const response = await httpRequest.post(
            '/lesson/media/generate-upload-url',
            {
                fileName,
                fileType,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from CreateLesson API:', error);
        throw error;
    }
};
