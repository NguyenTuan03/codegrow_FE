'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { executeCode } from '@/lib/services/api';
import type { editor } from 'monaco-editor';

interface OutputProps {
    editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
    language: string;
}

const Output: React.FC<OutputProps> = ({ editorRef, language }) => {
    const [output, setOutput] = useState<string[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const runCode = async () => {
        const sourceCode = editorRef.current?.getValue();
        if (!sourceCode) {
            toast({
                title: 'No code to run',
                description: 'Please write some code before running.',
                variant: 'destructive',
                duration: 6000,
            });
            return;
        }

        try {
            setIsLoading(true);
            const result = await executeCode(language, sourceCode);
            setOutput(result.run.output.split('\n'));
            setIsError(!!result.run.stderr);
        } catch (error: unknown) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : 'Unable to run code';
            toast({
                title: 'An error occurred.',
                description: errorMessage,
                variant: 'destructive',
                duration: 6000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Output</h2>
                <Button
                    variant="outline"
                    className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                    onClick={runCode}
                    disabled={isLoading}
                >
                    {isLoading ? 'Running...' : 'Run Code'}
                </Button>
            </div>
            <div
                className={`h-[50vh] p-4 border rounded-md bg-gray-50 ${
                    isError ? 'border-red-500 text-red-400' : 'border-gray-200 text-foreground'
                } overflow-auto`}
            >
                {output ? (
                    output.map((line, i) => (
                        <p key={i} className="text-sm font-mono">
                            {line}
                        </p>
                    ))
                ) : (
                    <p className="text-sm text-gray-500 italic">
                        Click `Run Code` to see the output here
                    </p>
                )}
            </div>
        </div>
    );
};

export default Output;
