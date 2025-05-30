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
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    aria-label="Toggle theme"
                    className="rounded-full border-2 border-[#657ED4] dark:border-[#5AD3AF] hover:bg-[#424c70] dark:hover:bg-[#4ac2a0] transition-colors shadow-sm hover:shadow-md cursor-pointer"
                >
                    <Sun
                        className={clsx(
                            'h-[1.2rem] w-[1.2rem] transition-all text-[#657ED4] dark:text-[#5AD3AF]',
                            'dark:rotate-90 dark:scale-0',
                            'rotate-0 scale-100',
                        )}
                    />
                    <Moon
                        className={clsx(
                            'absolute h-[1.2rem] w-[1.2rem] transition-all text-[#657ED4] dark:text-[#5AD3AF]',
                            'dark:rotate-0 dark:scale-100',
                            'rotate-90 scale-0',
                        )}
                    />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-40 rounded-lg bg-white dark:bg-gray-800 border border-[#657ED4] dark:border-[#5AD3AF] shadow-lg p-1"
            >
                <DropdownMenuItem
                    onClick={() => setTheme('light')}
                    aria-label="Switch to light theme"
                    className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-[#424c70] dark:hover:bg-[#4ac2a0] hover:text-white dark:hover:text-white rounded-md transition-colors text-sm font-medium cursor-pointer"
                >
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme('dark')}
                    aria-label="Switch to dark theme"
                    className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-[#424c70] dark:hover:bg-[#4ac2a0] hover:text-white dark:hover:text-white rounded-md transition-colors text-sm font-medium cursor-pointer"
                >
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme('system')}
                    aria-label="Switch to system theme"
                    className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-[#424c70] dark:hover:bg-[#4ac2a0] hover:text-white dark:hover:text-white rounded-md transition-colors text-sm font-medium cursor-pointer"
                >
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
