import httpRequest from './../HttpRequest';
export const resetPassword = async (token: string, newPassword: string) => {
    try {
        const res = await httpRequest.post('auth/reset-password', {
            token,
            newPassword,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
