'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import clsx from 'clsx';

export function ModeToggle() {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    aria-label="Toggle theme"
                    className="rounded-full border-gray-200 hover:bg-gray-100 transition-colors shadow-sm hover:shadow-md"
                >
                    <Sun
                        className={clsx(
                            'h-[1.2rem] w-[1.2rem] transition-all text-gray-600 dark:text-gray-300',
                            'dark:rotate-90 dark:scale-0',
                            'rotate-0 scale-100',
                        )}
                    />
                    <Moon
                        className={clsx(
                            'absolute h-[1.2rem] w-[1.2rem] transition-all text-gray-600 dark:text-gray-300',
                            'dark:rotate-0 dark:scale-100',
                            'rotate-90 scale-0',
                        )}
                    />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-40 rounded-lg bg-white border border-gray-200 shadow-lg p-1"
            >
                <DropdownMenuItem
                    onClick={() => setTheme('light')}
                    aria-label="Switch to light theme"
                    className="px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors text-sm font-medium"
                >
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme('dark')}
                    aria-label="Switch to dark theme"
                    className="px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors text-sm font-medium"
                >
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme('system')}
                    aria-label="Switch to system theme"
                    className="px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors text-sm font-medium"
                >
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
