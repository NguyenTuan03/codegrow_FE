import httpRequest from '@/lib/util/HttpRequest';

export async function chatAI(promt: string) {
    try {
        const response = await httpRequest.post(`/users/chat`, {
            promt,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching AI chat:', error);
    }
}
