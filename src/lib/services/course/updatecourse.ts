import httpRequest from '@/lib/util/HttpRequest';

export const UpdateCourse = async (
    token: string,
    id: string,
    title: string,
    description: string,
    price: string,
    author: string,
    category: string,
    imgUrl?: File, // Optional, if you want to update the image
) => {
    try {
        const response = await httpRequest.put(
            `/course/${id}`,
            {
                title,
                description,
                price,
                author,
                category,
                imgUrl, // Ensure this matches the backend expectation
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from UpdateCourses API:', error);
        throw error;
    }
};
