// @/lib/services/course/getLessons.ts

import { get } from '@/lib/util/HttpRequest';

export const GetServicesTicket = async (page = 1, limit = 10) => {
    try {
        const token = localStorage.getItem('token');
        const res = await get(`/services/ticket?page=${page}&limit=${limit}&expand=sender`, {
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
