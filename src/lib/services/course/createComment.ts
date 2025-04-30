import httpRequest from '@/lib/util/HttpRequest';

interface CreateCommentParams {
    token: string;
    courseId: string;
    rating: number;
    comment: string;
    parentComment: string | null;
}

export const CreateComment = async ({
    token,
    courseId,
    rating,
    comment,
    parentComment,
}: CreateCommentParams) => {
    try {
        // Validate rating (must be between 1 and 5)
        if (rating < 1 || rating > 5) {
            throw new Error('Rating must be between 1 and 5');
        }

        // Validate comment (must not be empty)
        if (!comment.trim()) {
            throw new Error('Comment cannot be empty');
        }

        // Construct the URL with the courseId
        const url = `/course/${courseId}/comment`;
        console.log('📤 Sending request to:', url);

        // Prepare the payload with field names matching backend expectations
        const payload = {
            rating,
            comment, // Use "comment" as the backend expects
            parentComment, // Use "parentComment" to match the interface
        };
        console.log('📤 Request payload:', payload);

        const response = await httpRequest.post(url, payload, {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log('✅ API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error from CreateComment API:', error);
        throw error;
    }
};
