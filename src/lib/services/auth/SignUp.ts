import httpRequest from '../HttpRequest';

export const signUp = async (
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string,
) => {
    try {
        const response = await httpRequest.post('/auth/signup', {
            fullName,
            email,
            password,
            confirmPassword,
        });

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from signUp API:', error);
        throw error;
    }
};
