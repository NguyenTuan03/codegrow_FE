import httpRequest from '@/lib/util/HttpRequest';

export const sendUserMessage = async (
    id: string,
    messageData: { text: string; image?: File },
) => {
    try {
        const token = JSON.parse(localStorage.getItem('token') ?? '');

        const formData = new FormData();
        formData.append('content', messageData.text);
        if (messageData.image) {
            formData.append('image', messageData.image);
        }

        const res = await httpRequest.post(`/message/send/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return res;
    } catch (error) {
        console.log('❌ send message error:', error);
        return null;
    }
};
