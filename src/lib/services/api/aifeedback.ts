import httpRequest from '@/lib/util/HttpRequest';

export async function chatAIFeedback(promt: string, token: string) {
    try {
        const response = await httpRequest.post(
            `/users/auto-feedback`,
            {
                promt,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching AI chat:', error);
    }
}
