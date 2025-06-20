import httpRequest from '@/lib/util/HttpRequest';
import axios from 'axios';

interface Data {
    token: string | null;

    courseid: string;

    price: number;
    description: string;
}

export const createPaymentLink = async ({ token, courseid, price, description }: Data) => {
    try {
        const response = await httpRequest.post(
            '/payments',
            {
                courseid,
                price,
                description,
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

export const getListPayment = async ({ token, courseid }: Data) => {
    try {
        const response = await httpRequest.get(`/payments/${courseid}`, {
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

export const cancelPayment = async ({ token, courseid }: Data) => {
    try {
        const response = await httpRequest.delete(`/payments/${courseid}`, {
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
