import httpRequest from '@/lib/util/HttpRequest';

interface CreateCourseParams {
    token: string;
    title: string;
    description: string;
    price: number;
    author: string;
    category: string;
    imgUrl?: File; // Ensure this matches the backend expectation
}

export const CreateCourse = async ({
    token,
    title,
    description,
    price,
    author,
    category,
    imgUrl,
}: CreateCourseParams) => {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description || '');
        formData.append('price', price.toString());
        formData.append('author', author);
        formData.append('category', category);
        if (imgUrl) {
            formData.append('imgUrl', imgUrl); // Ensure this matches the backend expectation
        }

        // Log FormData entries for debugging
        const formDataEntries: { [key: string]: string | { name: string; size: number } } = {};
        for (const [key, value] of formData.entries()) {
            formDataEntries[key] = value;
        }
        console.log('CreateCourse FormData Entries:', JSON.stringify(formDataEntries, null, 2));

        const response = await httpRequest.post('/course', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from CreateCourse API:', error);
        throw error;
    }
};
