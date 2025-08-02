import { get } from '@/lib/util/HttpRequest';

interface Lesson {
    _id: string;
    title: string;
    content?: string;
    status?: string;
    videoUrl?: string;
    videoKey?: string;
    quiz?: string[];
    order: number;
    createdAt?: string;
    updatedAt?: string;
}

interface ApiResponse {
    status: number;
    metadata: Lesson[];
    page?: number;
    totalPages?: number;
    totalItems?: number;
}

export const GetLessons = async (
    courseId: string,
    page: number = 1,
    limit: number = 100,
): Promise<ApiResponse> => {
    try {
        const queryParams = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });
        const response = await get(`/course/${courseId}/lessons?${queryParams}`);

        if (!response || typeof response !== 'object') {
            throw new Error('Invalid response from server');
        }

        const data: ApiResponse = {
            status: response.status || 200,
            metadata: Array.isArray(response.metadata) ? response.metadata : [],
            page: response.page || page,
            totalPages: response.totalPages || 1,
            totalItems: response.totalItems || response.metadata?.length || 0,
        };

        if (data.status !== 200) {
            throw new Error(`API returned status ${data.status}`);
        }

        return data;
    } catch (error) {
        console.error('Error from GetLessons API:', {
            courseId,
            page,
            limit,
            error: error instanceof Error ? error.message : 'Unknown error',
        });
        throw error instanceof Error ? error : new Error('Failed to fetch lessons');
    }
};

// import { get } from '@/lib/util/HttpRequest';

// interface Lesson {
//   _id: string;
//   title: string;
//   content?: string;
//   status?: string;
//   videoUrl?: string; // For watching lessons
//   videoKey?: string;
//   quiz?: string[];
//   order: number;
//   createdAt?: string;
//   updatedAt?: string;
//   type?: 'reading' | 'watching'; // New field
//   urlMaterial?: string; // New field for reading lessons
//   description?: string; // New field for reading lessons
// }

// interface ApiResponse {
//   status: number;
//   metadata: Lesson[];
//   page?: number;
//   totalPages?: number;
//   totalItems?: number;
// }

// export const GetLessons = async (
//   courseId: string,
//   page: number = 1,
//   limit: number = 6,
// ): Promise<ApiResponse> => {
//   try {
//     const queryParams = new URLSearchParams({
//       page: page.toString(),
//       limit: limit.toString(),
//     });
//     const response = await get(`/course/${courseId}/lessons?${queryParams}`);

//     if (!response || typeof response !== 'object') {
//       throw new Error('Invalid response from server');
//     }

//     const data: ApiResponse = {
//       status: response.status || 200,
//       metadata: Array.isArray(response.metadata)
//         ? response.metadata.map((lesson: Lesson) => ({
//             _id: lesson._id,
//             title: lesson.title,
//             content: lesson.content,
//             status: lesson.status,
//             videoUrl: lesson.videoUrl,
//             videoKey: lesson.videoKey,
//             quiz: lesson.quiz,
//             order: lesson.order,
//             createdAt: lesson.createdAt,
//             updatedAt: lesson.updatedAt,
//             type: lesson.type, // Include new field
//             urlMaterial: lesson.urlMaterial, // Include new field
//             description: lesson.description, // Include new field
//           }))
//         : [],
//       page: response.page || page,
//       totalPages: response.totalPages || 1,
//       totalItems: response.totalItems || response.metadata?.length || 0,
//     };

//     if (data.status !== 200) {
//       throw new Error(`API returned status ${data.status}`);
//     }

//     return data;
//   } catch (error) {
//     console.error('Error from GetLessons API:', {
//       courseId,
//       page,
//       limit,
//       error: error instanceof Error ? error.message : 'Unknown error',
//     });
//     throw error instanceof Error ? error : new Error('Failed to fetch lessons');
//   }
// };
