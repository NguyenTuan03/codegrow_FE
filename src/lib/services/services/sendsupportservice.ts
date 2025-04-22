import httpRequest from '@/lib/util/HttpRequest';

interface SendSupportServiceParams {
    token: string;
    title: string;
    message: string; // Now accepts array of strings
    courseId: string;
    classId?: string; // Optional classId parameter
}

export const SendSupportService = async ({
    token,
    title,
    message,
    courseId,
    classId,
}: SendSupportServiceParams) => {
    try {
        console.log('Submitting support ticket with title:', title);
        const response = await httpRequest.post(
            `/services/ticket`,
            { title, message, courseId, classId }, // Send title, message, courseId, and classId
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        console.log('✅ Support ticket submitted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error submitting quiz:', error);
        throw error;
    }
};
