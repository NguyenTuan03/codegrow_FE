import httpRequest from '@/lib/util/HttpRequest';

export const getMessageById = async (id) => {
  try {
    const token =JSON.parse(localStorage.getItem('token') ?? '');
    const res = await httpRequest.get(`/message/${id}`, {
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