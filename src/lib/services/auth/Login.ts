import httpRequest from './../HttpRequest';
export const login = async (email:string, password:string) => {
    try {
        const res = await httpRequest.post("auth/login", {
            email,
            password,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
