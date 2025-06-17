import React, { useContext, useRef, useState } from 'react';
import { Auth } from '../context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Image, Send, X } from 'lucide-react';

const MessageInput = () => {
    const [text, setText] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [sendImage, setSendImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const authContext = useContext(Auth);
    if (!authContext) {
        throw new Error(
            'AuthContext is undefined. Make sure MessageInput is wrapped in AuthProvider.',
        );
    }
    const { sendMessage } = authContext;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(file);
        if (!file?.type.startsWith('image/')) {
            toast({
                title: '❌ Invalid File Type',
                description: 'Please select an image file',
                variant: 'destructive',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
            setSendImage(file);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        setSendImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await sendMessage({
                text: text.trim(),
                image: sendImage,
            });

            setText('');
            setImagePreview(null);
            setSendImage(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    return (
        <div className="p-4 w-full bg-white dark:bg-gray-800">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-red-500 dark:text-red-400 hover:bg-gray-300 dark:hover:bg-gray-500"
                            type="button"
                        >
                            <X className="size-3" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg input-sm sm:input-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF]"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />

                    <button
                        type="button"
                        className="hidden sm:flex btn btn-circle bg-gray-200 dark:bg-gray-600 text-emerald-500 dark:text-emerald-400 hover:bg-gray-300 dark:hover:bg-gray-500"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image size={20} />
                    </button>
                </div>
                <button
                    type="submit"
                    className="btn btn-sm btn-circle bg-[#657ED4] dark:bg-[#5AD3AF] text-white hover:bg-[#5A6BBE] dark:hover:bg-[#4ac2a0] disabled:opacity-50"
                    disabled={!text.trim() && !sendImage}
                >
                    <Send size={22} />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
