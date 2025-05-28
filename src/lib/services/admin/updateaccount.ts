import httpRequest from '@/lib/util/HttpRequest';

export const UpdateAccount = async (
    token: string,
    id: string,
    fullName: string,
    email: string,
    role: string,
    avatar?: File, // Avatar is now a File
) => {
    try {
        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('role', role);
        if (avatar) {
            formData.append('avatar', avatar);
        }

        const response = await httpRequest.put(`/users/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from UpdateUser API:', error);
        throw error;
    }
};
