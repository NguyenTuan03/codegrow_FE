import httpRequest from '@/lib/util/HttpRequest';

interface UpdatePostParams {
    token: string;
    postId: string;
    title: string;
    content: string;
    courseId: string;
    author: string;
    tags?: string;
    attachments?: File;
}

interface UpdatePostResponse {
    message: string;
    status: number;
    data: {
        _id: string;
        title: string;
        content: string;
        course: string;
        author: string;
        tags?: string;
        attachments?: Array<{
            fileName: string;
            fileUrl: string;
            fileType: string;
        }>;
        createdAt: string;
    };
}

export const UpdatePost = async ({
    token,
    postId,
    title,
    content,
    courseId,
    author,
    tags,
    attachments,
}: UpdatePostParams): Promise<UpdatePostResponse> => {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('course', courseId);
        formData.append('author', author);
        if (tags) {
            formData.append('tags', tags);
        }
        if (attachments) {
            formData.append('attachments', attachments);
        }

        const response = await httpRequest.put(`/post/${postId}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error(
            `[Saturday, May 31, 2025, 11:48 AM +07] ❌ Error from UpdatePost API:`,
            error,
        );
        throw error;
    }
};
