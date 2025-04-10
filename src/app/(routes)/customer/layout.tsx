import Footer from '@/lib/components/layout/footer/Page';
import Customerheader from '@/lib/components/layout/header/Customerheader';
import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <div>
            <Customerheader />
            <div>{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
