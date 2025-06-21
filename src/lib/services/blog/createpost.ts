import httpRequest from '@/lib/util/HttpRequest';

// Interface for creating a post
interface CreatePostParams {
    token: string;
    title: string;
    content: string;
    classId: string; // Changed from courseId to classId

    tags?: string; // Optional tags
    attachments?: File; // Optional file for attachments
}

export const CreatePost = async ({
    token,
    title,
    content,
    classId,

    tags,
    attachments,
}: CreatePostParams) => {
    try {
        // Create FormData object
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('classId', classId); // Changed from 'course' to 'classId' to match backend

        if (tags) {
            formData.append('tags', tags);
        }
        if (attachments) {
            formData.append('attachments', attachments);
        }

        // Send request to the backend
        const response = await httpRequest.post('/post', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(` ✅ CreatePost API Response:`, response);
        return response.data;
    } catch (error) {
        console.error(`❌ Error from CreatePost API:`, error);
        throw error;
    }
};
