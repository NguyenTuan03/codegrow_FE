import httpRequest from '@/lib/util/HttpRequest';

interface DeletePostResponse {
    message: string;
    status: number;
}

export const DeletePost = async (token: string, postId: string): Promise<DeletePostResponse> => {
    try {
        const response = await httpRequest.delete(`/post/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(
            `[Saturday, May 31, 2025, 11:47 AM +07] ❌ Error from DeletePost API:`,
            error,
        );
        throw error;
    }
};
