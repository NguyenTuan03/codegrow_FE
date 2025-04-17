'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="relative flex items-center justify-center min-h-screen w-full bg-gradient-to-r from-[#7ECFAF] via-[#C7E6D7] to-[#6C7ED0] dark:from-gray-700 dark:via-gray-700 dark:to-gray-900 transition-colors duration-300">
            {/* Button in the top-left corner */}
            <Link href="/" passHref>
                <Button className="absolute top-4 left-4 bg-[#657ED4] text-white hover:bg-[#7696ff] dark:bg-gray-800 dark:hover:bg-gray-600 rounded-full shadow-lg px-4 py-2 transition-colors duration-300">
                    ← Back to Homepage
                </Button>
            </Link>

            <div className="w-full max-w-2xl">{children}</div>
        </div>
    );
};

export default layout;
