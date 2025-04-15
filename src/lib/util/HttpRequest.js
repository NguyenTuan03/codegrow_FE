import axios from 'axios';
console.log('✅ ENV Base URL:', process.env.NEXT_PUBLIC_API_URL);

const httpRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials:true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// // Add a request interceptor to check token expiration
// httpRequest.interceptors.request.use(
//     async (config) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             const decodedToken = jwtDecode(token); // Remove type annotation
//             const currentTime = Math.floor(Date.now() / 1000);

//             if (decodedToken.exp < currentTime) {
//                 const authContext = React.useContext(Auth);
//                 if (authContext) {
//                     authContext.logoutUser(); // Logout user if token is expired
//                 }
//                 throw new axios.Cancel('Token expired, user logged out');
//             }

//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     },
// );

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
