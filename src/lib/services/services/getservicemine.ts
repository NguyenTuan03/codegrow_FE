// @/lib/services/course/getLessons.ts

import { get } from '@/lib/util/HttpRequest';

export const GetServicesTicketMine = async (page = 1, limit = 10) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            return;
        }
        const tokenuser = JSON.parse(token);

        const res = await get(
            `/services/ticket/mine?page=${page}&limit=${limit}&expand=repliedBy`,
            {
                headers: {
                    Authorization: token ? `Bearer ${tokenuser}` : '',
                },
            },
        );

        return res;
    } catch (error) {
        console.error('Error from GetServicesTicket API:', error);
        throw error instanceof Error ? error : new Error('Failed to fetch services ticket');
    }
};
