import httpRequest from '@/lib/util/HttpRequest';

export const GetProgress = async (token: string, userId: string, courseId: string) => {
    try {
        const res = await httpRequest.get(`/users/${userId}/progress`, {
            params: {
                userId,
                courseId,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

// import httpRequest from '@/lib/util/HttpRequest';

// export const GetProgress = async (token: string, courseId: string) => {
//     try {
//         const userId = localStorage.getItem('user');
//         if (!userId) {
//             throw new Error('User ID not found in localStorage');
//         }
//         const parsedUser = JSON.parse(userId);
//         const id = parsedUser.id;

//         const res = await httpRequest.get(`/users/${id}/progress`, {
//             params: {
//                 courseId, // Move courseId to query params
//             },
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         return res.data;
//     } catch (error) {
//         console.error('Error fetching progress:', error);
//         throw error;
//     }
// };
