import httpRequest from '@/lib/util/HttpRequest';

export const getUsersMessage = async () => {
  try {
    const token =JSON.parse(localStorage.getItem('token') ?? '');
    const res = await httpRequest.get('/message/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log('getUsersMessage error:', error);
    return null;
  }
};