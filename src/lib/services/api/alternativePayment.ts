import httpRequest from '@/lib/util/HttpRequest';
interface IalternativePayment {
    token: string | null;
    paymentMethod: string;
    course: {
        _id: string;
    };
}
export const alternativePayment = async ({ token, paymentMethod, course }: IalternativePayment) => {
    try {
        const response = await httpRequest.post(
            '/users/enroll',
            {
                courseId: course._id,
                paymentMethod,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response;
    } catch (error) {
        console.error('Error marking alternative payment:', error);
        throw error;
    }
};
