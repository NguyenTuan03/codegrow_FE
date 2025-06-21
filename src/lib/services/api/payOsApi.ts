import httpRequest from '@/lib/util/HttpRequest';
import axios from 'axios';

interface Data {
    token: string | null;
    courseId: string;
}

export const createPaymentLink = async ({ token, courseId }: Data) => {
    try {
        const response = await httpRequest.post(
            '/users/enroll',
            {
                courseId,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        console.log('payOsApi response:', response);
        return response;
    } catch (error) {
        console.error('Error payOsApi:', error);
        throw error;
    }
};

export const getListBank = async ({ token }: Data) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_LISTS_BANK_URL}`, {
            headers: {
                'x-api-key': token,
            },
            //     headers: {
            //     "Content-Type": "application/json",
            //   },
        });
        console.log('getListBank response:', response);
        return response;
    } catch (error) {
        console.error('Error getListBank:', error);
        throw error;
    }
};

export const getListPayment = async ({ token, courseId }: Data) => {
    try {
        const response = await httpRequest.get(`/payments/${courseId}`, {
            headers: {
                'x-api-key': token,
            },
        });
        console.log('getListPayment response:', response);
        return response;
    } catch (error) {
        console.error('Error getListPayment:', error);
        throw error;
    }
};

export const cancelPayment = async ({ token, courseId }: Data) => {
    try {
        const response = await httpRequest.delete(`/payments/${courseId}`, {
            headers: {
                'x-api-key': token,
            },
        });
        console.log('cancelPayment response:', response);
        return response;
    } catch (error) {
        console.error('Error cancelPayment:', error);
        throw error;
    }
};
