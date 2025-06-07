import { MessageSquare } from 'lucide-react';
import React from 'react';

type Props = {};

const NoChatSelected = (props: Props) => {
    return (
        <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-white dark:bg-gray-800">
            <div className="max-w-md text-center space-y-6">
                <div className="flex justify-center gap-4 mb-4">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-[#657ED4] dark:bg-[#5AD3AF] flex items-center justify-center animate-bounce">
                            <MessageSquare className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Welcome to chat
                </h2>
                <p className="text-gray-600 dark:text-gray-300">Select a conversation !!</p>
            </div>
        </div>
    );
};

export default NoChatSelected;
