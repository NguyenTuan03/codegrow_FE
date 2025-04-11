'use client';

import Link from 'next/link';
import { FaTwitter, FaInstagram, FaYoutube, FaLinkedin, FaGithub } from 'react-icons/fa';
import { Separator } from '@/components/ui/separator';

interface FooterSection {
    title: string;
    links: { label: string; href: string }[];
}

const footerSections: FooterSection[] = [
    {
        title: 'Use cases',
        links: [
            { label: 'UI design', href: '#' },
            { label: 'UX design', href: '#' },
            { label: 'Wireframing', href: '#' },
            { label: 'Diagramming', href: '#' },
            { label: 'Brainstorming', href: '#' },
            { label: 'Online whiteboard', href: '#' },
            { label: 'Team collaboration', href: '#' },
        ],
    },
    {
        title: 'Explore',
        links: [
            { label: 'Design', href: '#' },
            { label: 'Prototyping', href: '#' },
            { label: 'Development features', href: '#' },
            { label: 'Design systems', href: '#' },
            { label: 'Collaboration features', href: '#' },
            { label: 'Design process', href: '#' },
            { label: 'FigJam', href: '#' },
        ],
    },
    {
        title: 'Resources',
        links: [
            { label: 'Blog', href: '#' },
            { label: 'Best practices', href: '#' },
            { label: 'Colors', href: '#' },
            { label: 'Color wheel', href: '#' },
            { label: 'Support', href: '#' },
            { label: 'Developers', href: '#' },
            { label: 'Resource library', href: '#' },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="bg-muted py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {footerSections.map((section, idx) => (
                        <div key={idx}>
                            <h4 className="text-sm font-semibold text-foreground mb-4">
                                {section.title}
                            </h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <Link
                                            href={link.href}
                                            className="hover:text-foreground transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Social */}
                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-4">Follow us</h4>
                        <div className="flex gap-4 text-muted-foreground">
                            <Link href="#" className="hover:text-foreground">
                                <FaGithub className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="hover:text-foreground">
                                <FaTwitter className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="hover:text-foreground">
                                <FaInstagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="hover:text-foreground">
                                <FaYoutube className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="hover:text-foreground">
                                <FaLinkedin className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                <Separator className="my-8" />

                <p className="text-xs text-muted-foreground text-center">
                    © {new Date().getFullYear()} CODEGROW. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
