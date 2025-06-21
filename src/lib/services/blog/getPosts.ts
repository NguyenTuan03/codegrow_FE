import httpRequest from '@/lib/util/HttpRequest';

// Interface for a post (based on typical API response)
interface Post {
    _id: string;
    title: string;
    content: string;
    class: ClassItem;
    author: string;
    tags?: string[];
    attachments?: Array<{
        fileName: string;
        fileUrl: string;
        fileType: string;
    }>;
    createdAt: string;
}

interface ClassItem {
    _id: string;
    title: string;
    description: string;
    students: string[];
    schedule: {
        startDate: string;
        endDate: string;
        daysOfWeek: string[];
        time: string;
    };
    imgUrl?: string;
    bgColor?: string;
    mentor?: {
        _id: string;
        fullName: string;
        email: string;
    } | null;
}

interface GetPostsResponse {
    message: string;
    status: number;
    metadata: {
        posts: Post[];
    };
}

export const GetPosts = async (token: string, classId: string): Promise<GetPostsResponse> => {
    try {
        const response = await httpRequest.get(`/post?classId=${classId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('GetPosts response data:', response.data); // Log data instead of full response
        if (response.data.status !== 200) {
            throw new Error(
                `API returned status ${response.data.status}: ${response.data.message}`,
            );
        }
        return response.data;
    } catch (error) {
        console.error(`❌ Error from GetPosts API for classId ${classId}:`, error);
        throw error instanceof Error
            ? error
            : new Error('Unknown error occurred while fetching posts');
    }
};
