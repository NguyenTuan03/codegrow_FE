import httpRequest from '@/lib/util/HttpRequest';

interface Message {
    id: string;
    content: string;
    senderId: string;
    receiverId: string;
    timestamp: string;
}

interface GetMessageResponse {
    data: {
        metadata: Message[]; // Updated to expect an array of messages
    };
    status: number;
}

export const getMessageById = async (id: string): Promise<GetMessageResponse | null> => {
    try {
        const token: string = JSON.parse(localStorage.getItem('token') ?? '');
        const res: GetMessageResponse = await httpRequest.get(`/message/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
        console.log('getUsersMessage error:', error);
        return null;
    }
};
