import { get } from '@/lib/util/HttpRequest';

export const getUser = async () => {
    try {
        const res = await get(`/users`); // Không cần truyền header

        if (!res || !res.metadata) {
            throw new Error('Invalid API response format');
        }

        return res;
    } catch (error) {
        console.error('❌ Error fetching users:', error);
        throw error; // Ném lỗi để xử lý ở nơi gọi hàm
    }
};

// import { get } from "../../utils/HttpRequest";

// export const getListUser = async ({ token, page, limit, role }) => {
//     try {
//         let queryParams = [];

//         if (page) queryParams.push(`page=${page}`);
//         if (limit) queryParams.push(`limit=${limit}`);
//         if (role) {
//             const filter = { role };
//             const encodedFilter = encodeURIComponent(JSON.stringify(filter));
//             queryParams.push(`filter=${encodedFilter}`);
//         }

//         const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

//         const res = await get(`/users${queryString}`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });

//         return res;
//     } catch (error) {
//         console.log(error);
//     }
// };
