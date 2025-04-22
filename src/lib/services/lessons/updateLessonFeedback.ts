import httpRequest from '@/lib/util/HttpRequest';

export const UpdateLesson = async (
    token: string,
    id: string,
    status: string,
    mark: string,
    note: string, // Đảm bảo note được sử dụng
) => {
    try {
        const response = await httpRequest.put(
            `/lesson/${id}/review`,
            {
                status,
                mark,
                note, // Thêm note vào payload
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );

        console.log('✅ API Response:', response.data);
        return response;
    } catch (error) {
        console.error('❌ Error from UpdateLesson API:', error);
        throw error;
    }
};
