import httpRequest from '../HttpRequest';

export const DeleteUser = async (token: string, id: string) => {
    try {
        const response = await httpRequest.delete(`/admin/user/${id}`, {
            headers: {
                token,
            },
        });

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from DeleteUser API:', error);
        throw error;
    }
};
