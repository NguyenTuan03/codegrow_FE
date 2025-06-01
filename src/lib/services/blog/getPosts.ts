import httpRequest from '@/lib/util/HttpRequest';

// Interface for a post (based on typical API response)
interface Post {
    _id: string;
    title: string;
    content: string;
    course: {
        _id: string;
        title: string;
        description: string;
        price: number;
        enrolledCount: number;
    }; // Updated to match API response
    author: string;
    tags?: string[]; // Fixed: Changed to string[] to match API response
    attachments?: Array<{
        fileName: string;
        fileUrl: string;
        fileType: string;
    }>;
    createdAt: string;
}

interface GetPostsResponse {
    message: string;
    status: number;
    metadata: {
        posts: Post[];
    };
}

export const GetPosts = async (token: string): Promise<GetPostsResponse> => {
    try {
        const response = await httpRequest.get('/post?expand=author', {
            // Fixed endpoint
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`❌ Error from GetPosts API:`, error);
        throw error;
    }
};
