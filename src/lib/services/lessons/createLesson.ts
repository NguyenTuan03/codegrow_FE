import httpRequest from '@/lib/util/HttpRequest';

interface CreateLessonParams {
    token: string;
    course: string;
    title: string;
    content: string;
    order: number;
    video?: File; // Optional video file for paid courses
    free_url?: string; // Optional video URL for free courses
    quiz?: string[]; // Optional quiz array
}

export const CreateLesson = async ({
    token,
    course,
    title,
    content,
    order,
    video,
    free_url,
    quiz,
}: CreateLessonParams) => {
    try {
        const formData = new FormData();
        formData.append('course', course);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('order', order.toString());
        if (video) {
            console.log('Uploading video:', video.name, video.type); // Debug log
            formData.append('video', video);
        }
        if (free_url) formData.append('free_url', free_url);
        if (quiz && quiz.length > 0) formData.append('quiz', JSON.stringify(quiz));

        const response = await httpRequest.post('/lesson', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from CreateLesson API:', error);
        throw error;
    }
};
