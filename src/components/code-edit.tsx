'use client';

import { useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { CODE_SNIPPETS } from '@/lib/services/constants';
import type { editor } from 'monaco-editor';

interface CodeEditorProps {
    editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
    language: string;
    initialValue: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ editorRef, language, initialValue }) => {
    const handleEditorMount = (editor: editor.IStandaloneCodeEditor) => {
        editorRef.current = editor;
    };

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.setValue(
                initialValue ||
                    CODE_SNIPPETS[language as keyof typeof CODE_SNIPPETS] ||
                    '// Start coding here',
            );
        }
    }, [language, editorRef, initialValue]);

    return (
        <div className="rounded-md overflow-hidden border border-gray-200">
            <Editor
                height="50vh"
                language={language}
                defaultValue={
                    initialValue ||
                    CODE_SNIPPETS[language as keyof typeof CODE_SNIPPETS] ||
                    '// Start coding here'
                }
                theme="vs-dark"
                onMount={handleEditorMount}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
            />
        </div>
    );
};

export default CodeEditor;
