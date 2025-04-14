import httpRequest from './../HttpRequest';

export const loginGoogle = async () => {
    try {
        const res = await httpRequest.get('/auth/login/google'); // Sử dụng đúng endpoint
        return res.data;
    } catch (error) {
        console.error('❌ Error in loginGoogle:', error);
        throw new Error('Google Sign-In failed. Please try again.');
    }
};
