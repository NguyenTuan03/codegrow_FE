import httpRequest from '@/lib/util/HttpRequest';

export const UpdateCourse = async (
    token: string,
    id: string,
    title: string,
    description: string,
    price: string,
    author: string,
    category: string,
    imgUrl?: File,
) => {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('author', author);
        formData.append('category', category);
        if (imgUrl) {
            formData.append('imgUrl', imgUrl);
        }

        // Log FormData entries for debugging
        const formDataEntries: { [key: string]: string | { name: string; size: number } } = {};
        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                formDataEntries[key] = { name: value.name, size: value.size };
            } else {
                formDataEntries[key] = value;
            }
        }
        console.log('FormData Entries:', JSON.stringify(formDataEntries, null, 2));

        const response = await httpRequest.put(`/course/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from UpdateCourse API:', error);
        throw error;
    }
};
