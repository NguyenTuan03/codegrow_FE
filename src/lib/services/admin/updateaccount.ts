import httpRequest from '@/lib/util/HttpRequest';

export const UpdateAccount = async (
    token: string,
    id: number,
    fullName: string,
    email: string,
    role: string,
) => {
    try {
        const response = await httpRequest.put(
            `/users/${id}`,
            {
                fullName,
                email,
                role,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from UpdateUser API:', error);
        throw error;
    }
};
