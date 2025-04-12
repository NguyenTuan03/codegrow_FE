'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LANGUAGE_VERSIONS } from '@/lib/services/constants';
import { ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
    language: string;
    onSelect: (lang: string) => void;
}

const languages = Object.entries(LANGUAGE_VERSIONS) as [string, string][];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onSelect }) => {
    return (
        <div className="flex items-center space-x-4">
            <h3 className="text-lg font-medium text-gray-900">Language:</h3>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-48 justify-between">
                        {language}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                    {languages.map(([lang, version]) => (
                        <DropdownMenuItem
                            key={lang}
                            className={`${
                                lang === language
                                    ? 'bg-gray-100 text-blue-600 font-semibold'
                                    : 'hover:bg-gray-100 hover:text-blue-600'
                            } cursor-pointer`}
                            onClick={() => onSelect(lang)}
                        >
                            <div className="flex items-center justify-between w-full">
                                <span className="capitalize">{lang}</span>
                                <span className="text-sm text-gray-500">({version})</span>
                            </div>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default LanguageSelector;
