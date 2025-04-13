import Customerheader from '@/lib/components/layout/header/Customerheader';
import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <div className="w-full">
            <Customerheader />
            <div className="bg-[#EEF1EF]">{children}</div>
            {/* <Footer /> */}
        </div>
    );
};

export default Layout;
