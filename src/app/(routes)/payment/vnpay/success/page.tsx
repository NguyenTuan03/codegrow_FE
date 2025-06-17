'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export default function VNPaySuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const transactionId = searchParams.get('vnp_TxnRef');
    const amount = searchParams.get('vnp_Amount');
    const status = searchParams.get('vnp_TransactionStatus');
    const courseId = searchParams.get('courseId');

    useEffect(() => {
        if (status === '00') {
            toast({
                title: 'Thanh toán thành công',
                description: 'Khóa học của bạn đã được ghi danh thành công!',
                className:
                    'bg-[#5AD3AF] dark:bg-[#5AD3AF] text-white dark:text-black font-semibold',
            });
        } else {
            // Redirect to failure page if status is not success
            router.push('/payment/vnpay/failure');
        }
    }, [status, router]);

    const handleViewCourseDetail = () => {
        if (courseId) {
            router.push(`/customer/courses/${courseId}`);
        } else {
            router.push('/customer/courses');
            toast({
                title: 'Thông báo',
                description: 'Không tìm thấy ID khóa học. Chuyển hướng đến danh sách khóa học.',
                className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
            });
        }
    };

    const formattedAmount = amount
        ? new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
          }).format(Number(amount) / 100)
        : 'N/A';

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 flex items-center justify-center p-4">
            <Card className="max-w-md w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg">
                <CardHeader className="text-center border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-3xl font-semibold text-[#657ED4] dark:text-[#5AD3AF] flex items-center justify-center gap-2">
                        <CheckCircle className="w-8 h-8 text-[#5AD3AF]" />
                        Thanh toán thành công
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4 text-center">
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Cảm ơn bạn đã thanh toán qua VNPay! Khóa học của bạn đã được ghi danh thành
                        công.
                    </p>
                    <div className="space-y-2">
                        <p className="text-gray-800 dark:text-gray-200">
                            <strong>Mã giao dịch:</strong> {transactionId || 'N/A'}
                        </p>
                        <p className="text-gray-800 dark:text-gray-200">
                            <strong>Số tiền:</strong> {formattedAmount}
                        </p>
                    </div>
                </CardContent>
                <CardContent className="p-6 pt-0">
                    <Button
                        variant="default"
                        className="w-full bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#5A6BBE] dark:hover:bg-[#4ac2a0] text-white font-semibold py-3 rounded-full transition-all duration-200 shadow-md cursor-pointer"
                        onClick={handleViewCourseDetail}
                    >
                        Xem chi tiết khóa học
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
