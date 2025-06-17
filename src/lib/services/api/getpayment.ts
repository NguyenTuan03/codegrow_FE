import httpRequest from '@/lib/util/HttpRequest';

export async function fetchPaymentHistory(token: string, user: string) {
    try {
        const response = await httpRequest.get(`/payment/${user}`, {
            params: {
                user,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching payment history:', error);
    }
}
