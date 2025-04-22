import httpRequest from '../../util/HttpRequest';

export const RegisterClass = async (
    token: string,
    fullName: string,
    email: string,
    phone: string,
    note: string,
) => {
    try {
        const response = await httpRequest.post(
            '/users/enroll-class',
            {
                fullName,
                email,
                phone,
                note,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from register class API:', error);
        throw error;
    }
};
