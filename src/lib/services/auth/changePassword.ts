import httpRequest from '../../util/HttpRequest';
export const ChangePassword = async (token: string, oldPassword: string, newPassword: string) => {
    try {
        const res = await httpRequest.post(
            '/auth/change-password',
            {
                oldPassword,
                newPassword,
            },
            { headers: { Authorization: `Bearer ${token}` } },
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
