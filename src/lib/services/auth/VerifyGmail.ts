import httpRequest from './../HttpRequest';

export const VerifyGmail = async (token: string) => {
    try {
        const res = await httpRequest.get('auth/verify', {
            params: { token },
        });
        return res.data;
    } catch (error) {
        console.error('Error verifying Gmail token:', error);
        throw error;
    }
};
