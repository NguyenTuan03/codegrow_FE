import httpRequest from '../HttpRequest';
export const GetClass = async () => {
    try {
        const res = await httpRequest.get('mentor/getClass', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
