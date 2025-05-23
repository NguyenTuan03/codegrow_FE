'use client'
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
interface IUserRef {
    current?: any;
}
const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [sendMessage, setSendMessage] = useState('');
    const [socketId, setSocketId] = useState('');
    const socketRef = useRef<IUserRef>(null);

    useEffect(() => {
        socketRef.current = io('http://localhost:8888');

        socketRef.current.on('connect', () => {
            setSocketId(socketRef.current.id);
            console.log('🟢 Connected:', socketRef.current.id);
        });

        socketRef.current.on('receive_message', (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);
    const handleSendMessage = () => {
        if (sendMessage.trim() === '') return;

        const messageData = {
            id: socketId,
            text: sendMessage,
            time: new Date(),
        };

        socketRef.current.emit('send_message', messageData);
        setMessages((prev) => [...prev, messageData]);
        setSendMessage('');
  };
    return (
        <div>
      <div>
        <h3>Socket ID: {socketId}</h3>
        <div style={{ border: '1px solid gray', padding: 8, height: 200, overflowY: 'scroll' }}>
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.id === socketId ? 'Me' : 'User'}:</strong> {msg.text}
            </div>
          ))}
        </div>
      </div>
      <input
        value={sendMessage}
        onChange={(e) => setSendMessage(e.target.value)}
        placeholder="Nhập tin nhắn..."
      />
      <button onClick={handleSendMessage}>Gửi</button>
    </div>
    )
};

export default Chat;
