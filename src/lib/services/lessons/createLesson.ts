import httpRequest from '@/lib/util/HttpRequest';

interface CreateLessonParams {
    token: string;
    course: string; // Added course ID
    title: string;
    content: string; // Changed from description to content
    order: number;
    videoKey?: string; // Optional video key
    videoUrl?: string; // Optional video URL
    quiz?: string[]; // Optional quiz array
}

export const CreateLesson = async ({
    token,
    course,
    title,
    content,
    order,
    videoKey,
    videoUrl,
    quiz,
}: CreateLessonParams) => {
    try {
        const response = await httpRequest.post(
            '/lesson',
            {
                course,
                title,
                content,
                order,
                ...(videoKey && { videoKey }), // Only include if provided
                ...(videoUrl && { videoUrl }), // Only include if provided
                ...(quiz && { quiz }), // Only include if provided
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
