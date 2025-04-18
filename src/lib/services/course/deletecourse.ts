import httpRequest from '@/lib/util/HttpRequest';

export const DeleteCourse = async (id: string, token: string) => {
    try {
        const response = await httpRequest.delete(`/course/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Gửi token trong header
            },
        });

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from DeleteCourse API:', error);
        throw error;
    }
};
