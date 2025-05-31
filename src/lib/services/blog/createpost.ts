import httpRequest from '@/lib/util/HttpRequest';

// Interface for creating a post
interface CreatePostParams {
    token: string;
    title: string;
    content: string;
    courseId: string; // Course ID
    author: string; // Author ID
    tags?: string; // Optional tags
    attachments?: File; // Optional file for attachments
}

export const CreatePost = async ({
    token,
    title,
    content,
    courseId,
    author,
    tags,
    attachments,
}: CreatePostParams) => {
    try {
        // Create FormData object
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('course', courseId); // Match backend field name
        formData.append('author', author);
        if (tags) {
            formData.append('tags', tags);
        }
        if (attachments) {
            formData.append('attachments', attachments);
        }

        // Log FormData entries for debugging
        const formDataEntries: { [key: string]: string | { name: string; size: number } } = {};
        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                formDataEntries[key] = { name: value.name, size: value.size };
            } else {
                formDataEntries[key] = value as string;
            }
        }
        console.log(`CreatePost FormData Entries:`, JSON.stringify(formDataEntries, null, 2));

        // Send request to the backend
        const response = await httpRequest.post('/post', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log(` ✅ CreatePost API Response:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`❌ Error from CreatePost API:`, error);
        throw error;
    }
};
