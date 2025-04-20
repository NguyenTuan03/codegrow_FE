'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function PaymentCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const vnp_ResponseCode = searchParams.get('vnp_ResponseCode'); // For VNPay
        const resultCode = searchParams.get('resultCode'); // For MoMo

        if (vnp_ResponseCode) {
            // VNPay callback
            if (vnp_ResponseCode === '00') {
                alert('Payment Successful with VNPay!');
                router.push('/customer/project');
            } else {
                alert('Payment Failed with VNPay.');
                router.push('/customer/project/payment');
            }
        } else if (resultCode) {
            // MoMo callback
            if (resultCode === '0') {
                alert('Payment Successful with MoMo!');
                router.push('/customer/project');
            } else {
                alert('Payment Failed with MoMo.');
                router.push('/customer/project/payment');
            }
        }
    }, [searchParams, router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
    );
}
