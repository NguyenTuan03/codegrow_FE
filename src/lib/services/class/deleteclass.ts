import httpRequest from '@/lib/util/HttpRequest';

export const DeleteClass = async (id: string, token: string) => {
    try {
        const response = await httpRequest.delete(`/classrooms/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Gửi token trong header
            },
        });

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from DeleteClass API:', error);
        throw error;
    }
};
