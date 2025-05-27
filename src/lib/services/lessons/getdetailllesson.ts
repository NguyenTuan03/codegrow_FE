import { get } from '@/lib/util/HttpRequest';

interface Lesson {
    _id: string;
    title: string;
    content?: string;
    videoUrl?: string;
    videoKey?: string;
    quiz?: Quiz[];
    order: number;
    status: 'pending' | 'done';
}
interface Option {
    text: string;
    isCorrect: boolean;
}

interface TestCase {
    input: string;
    expectedOutput: string;
}
interface Quiz {
    _id: string;
    lesson: string;
    type: 'multiple_choice' | 'coding';
    questionText: string;
    explanation: string;
    options?: Option[];
    starterCode?: string;
    expectedOutput?: string;
    language?: string;
    testCases?: TestCase[];
}
interface ApiResponse {
    status: string;
    metadata: Lesson;
}

export const viewDetailLesson = async (id: string): Promise<ApiResponse> => {
    try {
        const token = localStorage.getItem('token');
        const res = await get(`/lesson/${id}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
        });

        return res;
    } catch (error) {
        console.error('Error fetching lesson details:', error);
        throw error instanceof Error ? error : new Error('Failed to fetch lesson details');
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
//   quiz?: Quiz[];
//   order: number;
//   type?: 'reading' | 'watching'; // New field
//   urlMaterial?: string; // New field for reading lessons
//   description?: string; // New field for reading lessons
// }

// interface Option {
//   text: string;
//   isCorrect: boolean;
// }

// interface TestCase {
//   input: string;
//   expectedOutput: string;
// }

// interface Quiz {
//   _id: string;
//   lesson: string;
//   type: 'multiple_choice' | 'coding';
//   questionText: string;
//   explanation: string;
//   options?: Option[];
//   starterCode?: string;
//   expectedOutput?: string;
//   language?: string;
//   testCases?: TestCase[];
// }

// interface ApiResponse {
//   status: string;
//   metadata: Lesson;
// }

// export const viewDetailLesson = async (id: string): Promise<ApiResponse> => {
//   try {
//     const token = localStorage.getItem('token');
//     const res = await get(`/lesson/${id}`, {
//       headers: {
//         Authorization: token ? `Bearer ${token}` : '',
//       },
//     });

//     if (!res || typeof res !== 'object') {
//       throw new Error('Invalid response from server');
//     }

//     const data: ApiResponse = {
//       status: res.status,
//       metadata: {
//         _id: res.metadata._id,
//         title: res.metadata.title,
//         content: res.metadata.content,
//         status: res.metadata.status,
//         videoUrl: res.metadata.videoUrl,
//         videoKey: res.metadata.videoKey,
//         quiz: res.metadata.quiz,
//         order: res.metadata.order,
//         type: res.metadata.type, // Include new field
//         urlMaterial: res.metadata.urlMaterial, // Include new field
//         description: res.metadata.description, // Include new field
//       },
//     };

//     return data;
//   } catch (error) {
//     console.error('Error fetching lesson details:', error);
//     throw error instanceof Error ? error : new Error('Failed to fetch lesson details');
//   }
// };
