import httpRequest from '@/lib/util/HttpRequest';

export const UpdateLesson = async (
    token: string,
    id: string,
    title: string,
    description: string,
    price: string,
    author: string,
    category: string,
) => {
    try {
        const response = await httpRequest.put(
            `/lesson/${id}`,
            {
                title,
                description,
                price,
                author,
                category,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from UpdateLesson API:', error);
        throw error;
    }
};
