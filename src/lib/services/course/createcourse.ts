import httpRequest from '@/lib/util/HttpRequest';

interface CreateCourseParams {
    token: string;
    title: string;
    description: string;
    price: number;
    author: string;
    category: string;
}
export const CreateCourse = async ({
    token,
    title,
    description,
    price,
    author,
    category,
}: CreateCourseParams) => {
    try {
        const response = await httpRequest.post(
            '/course',
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
        console.error('❌ Error from CreateUser API:', error);
        throw error;
    }
};
