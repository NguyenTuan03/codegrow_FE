import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { CUSTOMER_HEADER } from '@/lib/enum/CustomerHeader';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Customerheader = () => {
    return (
        <div className="flex h-[80px]">
            <Image src="/Logo.png" alt="Logo" width={100} height={60} />
            <div className="flex items-center justify-between w-full h-full px-4">
                <div className="flex flex-row w-full gap-5">
                    {CUSTOMER_HEADER.map((item, index) => (
                        <Link href={item.href} key={index}>
                            <div className="font-semibold hover:underline cursor-pointer">
                                {item.name}
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="flex flex-row items-center min-w-[180px]">
                    <Button className="me-3 border-[#767676]">
                        <Link href="/login">LogIn</Link>
                    </Button>
                    <Button className="me-3">
                        <Link href="/register">Register</Link>
                    </Button>
                </div>
                <ModeToggle />
            </div>
        </div>
    );
};

export default Customerheader;
