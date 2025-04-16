'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <div
            style={{
                minHeight: '100vh',
                width: '100vw',
                background: 'linear-gradient(90deg, #7ECFAF 0%, #C7E6D7 32%, #6C7ED0 100%)',
            }}
            className="relative flex items-center justify-center"
        >
            {/* Nút ở góc trên trái */}
            <Link href="/" passHref>
                <Button className="absolute top-4 left-4 bg-[#657ED4] text-white hover:bg-[#7696ff] rounded-full shadow-lg px-4 py-2">
                    ← Back to Homepage
                </Button>
            </Link>

            <div className="w-full max-w-2xl">{children}</div>
        </div>
    );
};

export default layout;
