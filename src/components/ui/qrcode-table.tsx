'use client';
import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeTableProps {
    data: string; // QR code data (e.g., URL or JSON string)
    title?: string; // Optional title text
    subtitle?: string; // Optional subtitle text
    width?: number; // Canvas width
}

export default function QRCodeTable({
    data,
    title = '',
    subtitle = '',
    width = 250,
}: QRCodeTableProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set canvas dimensions
        canvas.height = width + (title || subtitle ? 70 : 20);
        canvas.width = width;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Draw background (dynamic for dark mode)
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        ctx.fillStyle = isDarkMode ? '#1f2937' : '#fff'; // Dark mode: gray-800, Light mode: white
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw text if provided
        if (title || subtitle) {
            ctx.font = 'bold 18px Arial';
            ctx.textAlign = 'center';
            ctx.fillStyle = isDarkMode ? '#f9fafb' : '#000'; // Dark mode: gray-100, Light mode: black
            if (title) ctx.fillText(title, canvas.width / 2, width + 25);
            ctx.font = '14px Arial';
            if (subtitle) ctx.fillText(subtitle, canvas.width / 2, width + 50);
        }

        // Create virtual canvas for QR code
        const virtualCanvas = document.createElement('canvas');

        QRCode.toCanvas(
            virtualCanvas,
            data,
            {
                width: width - 20,
                margin: 2,
                errorCorrectionLevel: 'H',
                color: {
                    dark: isDarkMode ? '#f9fafb' : '#000000', // QR code color
                    light: isDarkMode ? '#1f2937' : '#ffffff', // Background color
                },
            },
            (error) => {
                if (error) {
                    console.error('Error generating QR code:', error);
                    return;
                }
                // Center QR code
                const x = (canvas.width - virtualCanvas.width) / 2;
                const y = 10;
                ctx.drawImage(virtualCanvas, x, y);
            },
        );

        return () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, [data, title, subtitle, width]);

    return (
        <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-300">
            <canvas ref={canvasRef} className="mb-2" aria-label={title || 'QR Code'} />
            {(title || subtitle) && (
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    {title} {subtitle && ` • ${subtitle}`}
                </p>
            )}
        </div>
    );
}
