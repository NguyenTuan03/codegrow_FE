import httpRequest from './../HttpRequest';
export const forgotPassword = async (email: string) => {
    try {
        const res = await httpRequest.post('auth/forgot-password', {
            email,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
