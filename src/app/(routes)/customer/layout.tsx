import Customerheader from '@/lib/components/layout/header/Customerheader';
import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <div className="w-full">
            <Customerheader />
            <div className="bg-gradient-to-r from-blue-50 to-purple-50">
                <main>{children}</main>
            </div>
        </div>
    );
};

export default Layout;
