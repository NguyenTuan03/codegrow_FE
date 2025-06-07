import { MessageSquare } from 'lucide-react';
import React from 'react';

type Props = {};

const NoChatSelected = (props: Props) => {
    return (
        <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-amber-100">
            <div className="max-w-md text-center space-y-6">
                <div className="flex justify-center gap-4 mb-4">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-purple-200 flex items-center justify-center animate-bounce">
                            <MessageSquare className="w-8 h-8 text-purple-200" />
                        </div>
                    </div>
                </div>
                <h2 className="text-2xl font-bold">Welcome to chat</h2>
                <p className="text-amber-900">Select a conversation !!</p>
            </div>
        </div>
    );
};

export default NoChatSelected;
