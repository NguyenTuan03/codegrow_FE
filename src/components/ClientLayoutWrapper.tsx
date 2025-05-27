// components/ClientLayoutWrapper.tsx
'use client';

import { usePathname } from 'next/navigation';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminRoute = pathname.startsWith('/admin');

    return <div className={isAdminRoute ? 'pt-[64px]' : ''}>{children}</div>;
}
