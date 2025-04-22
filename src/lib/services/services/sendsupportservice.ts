import httpRequest from '@/lib/util/HttpRequest';

interface SendSupportServiceParams {
    token: string;
    title: string;
    message: string; // Now accepts array of strings
    courseId: string;
}

export const SendSupportService = async ({
    token,
    title,
    message,
    courseId,
}: SendSupportServiceParams) => {
    try {
        console.log('Submitting support ticket with title:', title);
        const response = await httpRequest.post(
            `/services/ticket`,
            { title, message, courseId }, // Send title, message, and courseId
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
