import axios from 'axios';
import { LANGUAGE_VERSIONS } from '@/lib/services/constants';

const API = axios.create({
    baseURL: 'https://emkc.org/api/v2/piston',
});

export const executeCode = async (language: string, sourceCode: string) => {
    try {
        const response = await API.post('/execute', {
            language,
            version: LANGUAGE_VERSIONS[language],
            files: [{ content: sourceCode }],
        });
        return {
            run: {
                output: response.data.run.output || '',
                stderr: response.data.run.stderr || '',
            },
        };
    } catch (error) {
        throw error;
    }
};
