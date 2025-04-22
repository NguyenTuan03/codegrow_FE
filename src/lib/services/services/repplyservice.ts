import httpRequest from '@/lib/util/HttpRequest';

export const ReplyService = async (
    token: string,
    ticket_id: string,
    qaqcReply: string,
    status: string,
) => {
    try {
        const response = await httpRequest.put(
            `/services/ticket/${ticket_id}/reply`,
            { qaqcReply, status },
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from UpdateLesson API:', error);
        throw error instanceof Error ? error : new Error('Failed to update lesson');
    }
};
