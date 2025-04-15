import axios from 'axios';
console.log('✅ ENV Base URL:', process.env.NEXT_PUBLIC_API_URL);

const httpRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials:true,
    headers: {
        'Content-Type': 'application/json',
    },
});
export const get = async (url, option = {}) => {
    const res = await httpRequest.get(url, option);
    return res.data;
};
export const post = async (url, data = {}, option = {}) => {
    const res = await httpRequest.post(url, data, option);
    return res.data;
};
export const put = async (url, data = {}, option = {}) => {
    const res = await httpRequest.put(url, data, option);
    return res.data;
};
export const remove = async (url, option = {}) => {
    const res = await httpRequest.delete(url, option);
    return res.data;
};
export default httpRequest;
