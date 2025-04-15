import httpRequest from '../HttpRequest';

export const UpdateUser = async (
    token: string,
    id: string,
    fullName: string,
    password: string,
    confirmPassword: string,
) => {
    try {
        const response = await httpRequest.put(
            `/admin/user/${id}`,
            {
                fullName,
                password,
                confirmPassword,
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
