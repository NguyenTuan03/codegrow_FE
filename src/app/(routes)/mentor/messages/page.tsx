'use client';
import { useState, useEffect, useRef } from 'react';

interface Message {
    id: string;
    sender: string;
    status: string;
    time: string;
    content?: string;
    isCurrentUser?: boolean;
    unread?: boolean;
}

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', sender: 'Fabrice Édouard', status: 'Initressé', time: '03:23', unread: true },
        { id: '2', sender: 'Michel Lertle', status: 'Diminace contact', time: '13:54' },
        {
            id: '3',
            sender: 'Gabrielle Dujardin',
            status: 'Attente de vidéo',
            time: '16:17',
            unread: true,
        },
        { id: '4', sender: 'Daniel Yu', status: 'Attente de vidéo', time: 'Nov' },
        { id: '5', sender: 'Sarah Vidal', status: 'Diminace contact', time: 'Nov', unread: true },
        { id: '6', sender: 'Francis Laffemard', status: 'Initressé', time: '10 week' },
        { id: '7', sender: 'Megan Rose', status: 'Initressé', time: '10 week' },
        { id: '8', sender: 'Anthony Da Silva', status: 'Initressé', time: '10 week' },
    ]);

    const [activeMessage, setActiveMessage] = useState<Message | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter messages based on search term
    const filteredMessages = messages.filter(
        (message) =>
            message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.status.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Mark as read when selecting a conversation
    const handleSelectConversation = (message: Message) => {
        setActiveMessage(message);
        setMessages(
            messages.map((msg) => (msg.id === message.id ? { ...msg, unread: false } : msg)),
        );
    };

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, activeMessage]);

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const message: Message = {
            id: Date.now().toString(),
            sender: 'You',
            status: 'Sent',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            content: newMessage,
            isCurrentUser: true,
        };

        console.log('[Sunday, June 01, 2025, 10:01 PM +07] Sending message:', message);

        setMessages([...messages, message]);
        setNewMessage('');
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Left sidebar - Conversation list */}
            <div className="w-1/3 border-r border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 flex flex-col">
                <div className="p-4 border-b border-gray-300 dark:border-gray-600">
                    <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                        Messages
                    </h1>
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex-1 overflow-y-auto">
                    {filteredMessages.map((message) => (
                        <div
                            key={message.id}
                            className={`p-4 border-b border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                                activeMessage?.id === message.id
                                    ? 'bg-blue-50 dark:bg-blue-900'
                                    : ''
                            } ${message.unread ? 'bg-blue-50/50 dark:bg-blue-900/50' : ''}`}
                            onClick={() => handleSelectConversation(message)}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1 min-w-0">
                                    <h2 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                                        {message.sender}
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                                        {message.status}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                        {message.time}
                                    </span>
                                    {message.unread && (
                                        <span className="mt-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right side - Chat area */}
            <div className="flex-1 flex flex-col">
                {activeMessage ? (
                    <>
                        {/* Chat header */}
                        <div className="p-4 border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 flex justify-between items-center">
                            <div>
                                <h2 className="font-semibold text-gray-900 dark:text-gray-100">
                                    {activeMessage.sender}
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {activeMessage.status}
                                </p>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                {activeMessage.time}
                            </div>
                        </div>

                        {/* Chat messages */}
                        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-700 space-y-3">
                            <div className="mb-4">
                                <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-lg max-w-xs">
                                    <p className="text-gray-900 dark:text-gray-100">
                                        Bonjour, je suis intéressé par votre propriété.
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        03:23
                                    </p>
                                </div>
                            </div>

                            <div className="mb-4 flex justify-end">
                                <div className="bg-green-100 dark:bg-green-700 p-3 rounded-lg max-w-xs">
                                    <p className="text-gray-900 dark:text-gray-100">
                                        Merci pour votre intérêt. Que souhaitez-vous savoir ?
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        03:25
                                    </p>
                                </div>
                            </div>

                            {messages
                                .filter(
                                    (msg) =>
                                        msg.isCurrentUser || msg.sender === activeMessage.sender,
                                )
                                .map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`mb-4 ${msg.isCurrentUser ? 'flex justify-end' : ''}`}
                                    >
                                        <div
                                            className={`p-3 rounded-lg max-w-xs ${
                                                msg.isCurrentUser
                                                    ? 'bg-green-100 dark:bg-green-700'
                                                    : 'bg-blue-100 dark:bg-blue-800'
                                            }`}
                                        >
                                            <p className="text-gray-900 dark:text-gray-100">
                                                {msg.content}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {msg.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message input */}
                        <div className="p-4 border-t border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                    placeholder="Type your message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                />
                                <button
                                    className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:opacity-50"
                                    onClick={handleSendMessage}
                                    disabled={!newMessage.trim()}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-700">
                        <div className="text-center text-gray-500 dark:text-gray-400">
                            <p>Select a conversation to start chatting</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Right sidebar - Contact info */}
            {activeMessage && (
                <div className="w-1/4 border-l border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 overflow-y-auto p-4">
                    <h3 className="font-bold mb-4 text-gray-900 dark:text-gray-100">
                        Contact Information
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                                TEBIA
                            </h4>
                            <p className="text-sm text-gray-900 dark:text-gray-100">
                                18 rue de la Fontaine au Roi 75010 RMSS
                            </p>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                                Dossier locatif
                            </h4>
                            <p className="text-sm text-gray-900 dark:text-gray-100">
                                Tél: +33 80 55 53 57
                            </p>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                                E-mail
                            </h4>
                            <p className="text-sm text-gray-900 dark:text-gray-100">
                                gisty.dujardin@gmail.com
                            </p>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                                Situat
                            </h4>
                            <p className="text-sm text-gray-900 dark:text-gray-100">
                                Attente de vidéo
                            </p>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                                Agents
                            </h4>
                            <p className="text-sm text-gray-900 dark:text-gray-100">
                                Maniés Désouds
                            </p>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                                Dossier
                            </h4>
                            <div className="space-y-1">
                                <p className="text-sm text-gray-900 dark:text-gray-100">
                                    Hénotique
                                </p>
                                <p className="text-sm text-gray-900 dark:text-gray-100">
                                    Questionnaire
                                </p>
                                <p className="text-sm text-gray-900 dark:text-gray-100">
                                    Rendez-vous
                                </p>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                                Pièce didentité
                            </h4>
                            <p className="text-sm text-gray-900 dark:text-gray-100">Sérieurs</p>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                                Justificatifs de données
                            </h4>
                            <p className="text-sm text-gray-900 dark:text-gray-100">Sérieurs</p>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                                Documentation par
                            </h4>
                            <p className="text-sm text-gray-900 dark:text-gray-100">
                                806 16 oct et 17h25 - 4h05
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
