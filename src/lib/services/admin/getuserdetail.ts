import httpRequest from '@/lib/util/HttpRequest';

export const getUserDetail = async (id: string) => {
    try {
        const res = await httpRequest.get(`/users/${id}`, {
            // Added a slash before ${id}
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
