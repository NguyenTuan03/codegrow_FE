// @/lib/services/course/getLessons.ts

import { get } from '@/lib/util/HttpRequest';

export const GetServicesTicketMine = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await get(`/services/ticket/mine`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
        });

        return res;
    } catch (error) {
        console.error('Error from GetServicesTicket API:', error);
        throw error instanceof Error ? error : new Error('Failed to fetch services ticket');
    }
};
