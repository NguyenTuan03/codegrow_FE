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
                <Button variant="outline" size="icon" aria-label="Toggle theme">
                    <Sun
                        className={clsx(
                            'h-[1.2rem] w-[1.2rem] transition-all',
                            'dark:rotate-90 dark:scale-0',
                            'rotate-0 scale-100',
                        )}
                    />
                    <Moon
                        className={clsx(
                            'absolute h-[1.2rem] w-[1.2rem] transition-all',
                            'dark:rotate-0 dark:scale-100',
                            'rotate-90 scale-0',
                        )}
                    />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => setTheme('light')}
                    aria-label="Switch to light theme"
                >
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme('dark')}
                    aria-label="Switch to dark theme"
                >
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme('system')}
                    aria-label="Switch to system theme"
                >
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
