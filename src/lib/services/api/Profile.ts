import httpRequest from '@/lib/util/HttpRequest';

export const profile = async () => {
    try {
        const response = await httpRequest.get('/user/getprofile', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from profile API:', error);
        throw error;
    }
};
