import httpRequest from "@/lib/util/HttpRequest";
interface Ipayment {
    token: string | null,
    course: {
        _id:string
    }
}
export const makePayment = async ({ token, course }:Ipayment) => {
    try {
        const response = await httpRequest.post(
            '/users/enroll',
            {
                courseId: course._id,
                paymentMethod: 'wallet',
              }, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
        );
        return response;
    } catch (error) {
        console.error('Error making payment complete:', error);
        throw error;
    }
};