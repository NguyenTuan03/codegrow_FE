// src/lib/socketClient.ts
'use client';

import { io } from 'socket.io-client';

// Define the Socket.IO server URL from environment variables or default to localhost
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000'; // Adjust based on your server

// Initialize the Socket.IO client with configuration options
export const socket = io(SOCKET_URL, {
    autoConnect: false, // Don't connect automatically; we'll connect manually in components
    reconnection: true, // Enable reconnection
    reconnectionAttempts: 5, // Retry 5 times before giving up
    reconnectionDelay: 1000, // Wait 1 second between reconnection attempts
    path: '/socket.io', // Default path; adjust if your server uses a different path
});

// Debug connection events
socket.on('connect', () => {
    console.log('Socket.IO: Connected to server', SOCKET_URL);
});

socket.on('connect_error', (error) => {
    console.error('Socket.IO: Connection error:', error.message);
});

socket.on('disconnect', (reason) => {
    console.log('Socket.IO: Disconnected from server. Reason:', reason);
});

socket.on('reconnect', (attempt) => {
    console.log('Socket.IO: Reconnected to server after', attempt, 'attempts');
});

socket.on('reconnect_failed', () => {
    console.error('Socket.IO: Reconnection failed after maximum attempts');
});
