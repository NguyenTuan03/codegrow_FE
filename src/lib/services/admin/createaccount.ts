import httpRequest from '@/lib/util/HttpRequest';

export const CreateAccount = async (
    token: string,
    fullName: string,
    email: string,
    password: string,
    role: string,
) => {
    try {
        const response = await httpRequest.post(
            '/users',
            {
                fullName,
                email,
                password,
                role,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from CreateUser API:', error);
        throw error;
    }
};
