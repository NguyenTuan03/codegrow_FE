// import { put } from '@/lib/util/HttpRequest';

import axios from 'axios';

export const UploadVideo = async (file: File, uploadUrl: string) => {
    try {
        const result = await axios.put(uploadUrl, file, {
            headers: {
                'Content-Type': file.type,
            },
        });

        return result;
    } catch (error) {
        console.error('❌ Error from CreateLesson API:', error);
        throw error;
    }
};
