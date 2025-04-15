import httpRequest from '../../util/HttpRequest';
export const resetPassword = async (token: string, newpass: string) => {
    try {
        const res = await httpRequest.post('auth/reset-password', {
            token,
            newpass,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
