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
    disabled?: boolean;
}

const languages = Object.entries(LANGUAGE_VERSIONS) as [string, string][];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onSelect, disabled }) => {
    return (
        <div className="flex items-center space-x-4">
            <h3 className="text-xl font-medium text-gray-900">Language:</h3>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-48 justify-between bg-amber-300 hover:bg-amber-400"
                        disabled={disabled}
                        aria-label={`Select language, current: ${language}`}
                    >
                        {language}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-gray-50 border border-gray-200 shadow-lg">
                    {languages.map(([lang, version]) => (
                        <DropdownMenuItem
                            key={lang}
                            className={`${
                                lang === language
                                    ? 'bg-blue-100 text-base text-blue-600 font-semibold'
                                    : 'hover:bg-blue-50 text-base hover:text-blue-600'
                            } cursor-pointer`}
                            onClick={() => onSelect(lang)}
                        >
                            <div className="flex items-center justify-between w-full">
                                <span className="capitalize">{lang}</span>
                                <span className="text-base text-gray-500">({version})</span>
                            </div>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default LanguageSelector;
