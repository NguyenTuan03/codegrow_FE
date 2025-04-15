import httpRequest from '../HttpRequest';

export const GetDetailUser = async (id: string, token: string) => {
    try {
        const res = await httpRequest.get(`/admin/user/${id}`, {
            // Added a slash before ${id}
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
