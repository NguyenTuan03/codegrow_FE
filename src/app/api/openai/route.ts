import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { initialMessage } from '@/lib/data';

const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
    compatibility: 'strict',
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        if (!messages || !Array.isArray(messages)) {
            return new Response(
                JSON.stringify({ error: 'Invalid request: messages must be an array' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } },
            );
        }

        if (!process.env.OPENAI_API_KEY) {
            return new Response(
                JSON.stringify({ error: 'Server configuration error: OPENAI_API_KEY is not set' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } },
            );
        }

        if (!initialMessage || !initialMessage.content || !initialMessage.role) {
            return new Response(
                JSON.stringify({
                    error: 'Initial message is not defined or missing required fields (content, role)',
                }),
                { status: 500, headers: { 'Content-Type': 'application/json' } },
            );
        }

        console.log('Messages to be sent:', [initialMessage, ...messages]);

        const { text } = await generateText({
            model: openai('gpt-4o'),
            messages: [initialMessage, ...messages],
            temperature: 1,
        });

        return new Response(JSON.stringify({ message: text }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error in /api/openai:', error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        const errorStack = error instanceof Error ? error.stack : undefined;

        if (errorMessage.includes('exceeded your current quota')) {
            return new Response(
                JSON.stringify({
                    error: 'Quota exceeded',
                    details:
                        'You have exceeded your OpenAI API quota. Please check your plan and billing details at https://platform.openai.com/.',
                }),
                { status: 429, headers: { 'Content-Type': 'application/json' } },
            );
        }

        return new Response(
            JSON.stringify({
                error: 'Internal server error',
                details: errorMessage,
                stack: errorStack,
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } },
        );
    }
}
