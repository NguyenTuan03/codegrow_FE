import httpRequest from '@/lib/util/HttpRequest';

export const updateProfile = async (
    fullName: string,
    password: string,
    confirmPassword: string,
    imgUrl: string,
    phone: string,
) => {
    try {
        const response = await httpRequest.put('/user/updateProfile', {
            fullName,
            password,
            confirmPassword,
            imgUrl,
            phone,
        });

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from updateProfile API:', error);
        throw error;
    }
};
