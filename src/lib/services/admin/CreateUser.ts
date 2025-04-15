import httpRequest from '../HttpRequest';

export const CreateUser = async (
    token: string,
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string,
) => {
    try {
        const response = await httpRequest.post(
            '/admin/user',
            {
                fullName,
                email,
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
        console.error('❌ Error from signUp API:', error);
        throw error;
    }
};
