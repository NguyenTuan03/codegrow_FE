import { streamText, Message } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { initialMessage } from '@/lib/data';
import { NextResponse } from 'next/server';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY || '',
});

const generateId = () => Math.random().toString(36).slice(2, 15);

const buildGoogleGenAIPrompt = (messages: Message[]): Message[] => {
    if (!initialMessage || !initialMessage.content) {
        throw new Error('initialMessage is not properly defined in lib/data.ts');
    }
    return [
        {
            id: generateId(),
            role: 'user',
            content: initialMessage.content,
        },
        ...messages.map((message) => ({
            id: message.id || generateId(),
            role: message.role,
            content:
                message.content ||
                (message.parts
                    ? message.parts
                          .map((p) => ('text' in p && typeof p.text === 'string' ? p.text : ''))
                          .join('')
                    : ''), // Handle parts if present
        })),
    ];
};

export async function POST(request: Request) {
    try {
        console.log(' Starting /api/gemini POST request');
        const { messages } = await request.json();
        if (!Array.isArray(messages)) {
            return NextResponse.json(
                { error: 'Invalid request: messages must be an array' },
                { status: 400 },
            );
        }

        console.log(' Received messages:', messages);

        if (!process.env.GOOGLE_API_KEY) {
            return NextResponse.json(
                { error: 'Server configuration error: GOOGLE_API_KEY is not set in .env.local' },
                { status: 500 },
            );
        }

        const stream = await streamText({
            model: google('gemini-1.5-pro'),
            messages: buildGoogleGenAIPrompt(messages),
            temperature: 0.7,
            onFinish: (text) => {
                console.log(' Streamed text:', text);
            },
        });

        const response = stream?.toDataStreamResponse();
        if (response) {
            response.headers.set('Content-Type', 'text/event-stream'); // Ensure correct header
            console.log(' Response:', response);
            return response;
        } else {
            return NextResponse.json(
                { error: 'Failed to create stream response' },
                { status: 500 },
            );
        }
    } catch (error) {
        console.error(' Error in /api/gemini:', error);
        return NextResponse.json(
            {
                error: 'Internal server error',
                details:
                    typeof error === 'object' && error !== null && 'message' in error
                        ? (error as { message: string }).message
                        : String(error),
                stack:
                    process.env.NODE_ENV === 'development' &&
                    typeof error === 'object' &&
                    error !== null &&
                    'stack' in error
                        ? (error as { stack?: string }).stack
                        : undefined,
            },
            { status: 500 },
        );
    }
}

export async function GET() {
    return NextResponse.json({ message: 'Gemini API is running' });
}
