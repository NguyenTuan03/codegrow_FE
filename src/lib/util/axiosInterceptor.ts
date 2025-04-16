import axios from 'axios';
import httpRequest from './HttpRequest';

export const setupAxiosInterceptor = () => {
    httpRequest.interceptors.request.use((config) => {
        const tokenStr = localStorage.getItem('token');
        const token = tokenStr ? JSON.parse(tokenStr) : null;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    });

    httpRequest.interceptors.response.use(
        (res) => res,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const res = await axios.get(
                        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
                        {
                            withCredentials: true,
                        },
                    );

                    const newAccessToken = res.data.accessToken;
                    localStorage.setItem('token', JSON.stringify(newAccessToken));

                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return httpRequest(originalRequest);
                } catch (err) {
                    localStorage.clear();
                    // window.location.href = '/login'; // nếu như để customer thì login failed là bay về home
                    return Promise.reject(err);
                }
            }

            return Promise.reject(error);
        },
    );
};
