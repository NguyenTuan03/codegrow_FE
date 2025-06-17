'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ResultCodeInfo {
    code: string;
    description: string;
    recommendedActions: string;
}

const resultCodes: ResultCodeInfo[] = [
    {
        code: '07',
        description:
            'Trừ tiền thành công nhưng giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).',
        recommendedActions: 'Vui lòng liên hệ ngân hàng hoặc hỗ trợ VNPay để xác minh giao dịch.',
    },
    {
        code: '09',
        description: 'Thẻ/Tài khoản của bạn chưa đăng ký dịch vụ InternetBanking tại ngân hàng.',
        recommendedActions: 'Vui lòng đăng ký dịch vụ InternetBanking và thử lại.',
    },
    {
        code: '10',
        description: 'Xác thực thông tin thẻ/tài khoản không đúng quá 3 lần.',
        recommendedActions: 'Vui lòng kiểm tra thông tin thẻ/tài khoản và thử lại.',
    },
    {
        code: '11',
        description: 'Đã hết hạn chờ thanh toán.',
        recommendedActions: 'Vui lòng thực hiện lại giao dịch.',
    },
    {
        code: '12',
        description: 'Thẻ/Tài khoản của bạn bị khóa.',
        recommendedActions: 'Vui lòng liên hệ ngân hàng để kiểm tra trạng thái thẻ/tài khoản.',
    },
    {
        code: '13',
        description: 'Nhập sai mật khẩu xác thực giao dịch (OTP).',
        recommendedActions: 'Vui lòng nhập đúng OTP và thực hiện lại giao dịch.',
    },
    {
        code: '24',
        description: 'Bạn đã hủy giao dịch.',
        recommendedActions: 'Vui lòng khởi tạo lại giao dịch nếu cần.',
    },
    {
        code: '51',
        description: 'Tài khoản của bạn không đủ số dư để thực hiện giao dịch.',
        recommendedActions: 'Vui lòng kiểm tra số dư tài khoản và thử lại.',
    },
    {
        code: '65',
        description: 'Tài khoản của bạn đã vượt quá hạn mức giao dịch trong ngày.',
        recommendedActions: 'Vui lòng kiểm tra hạn mức giao dịch hoặc thử lại vào ngày tiếp theo.',
    },
    {
        code: '75',
        description: 'Ngân hàng thanh toán đang bảo trì.',
        recommendedActions: 'Vui lòng thử lại sau khi ngân hàng hoàn tất bảo trì.',
    },
    {
        code: '79',
        description: 'Nhập sai mật khẩu thanh toán quá số lần quy định.',
        recommendedActions: 'Vui lòng thực hiện lại giao dịch và nhập đúng mật khẩu.',
    },
    {
        code: '99',
        description: 'Lỗi không xác định.',
        recommendedActions: 'Vui lòng liên hệ hỗ trợ VNPay để biết thêm chi tiết.',
    },
];

export default function VNPayFailurePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const transactionId = searchParams.get('vnp_TxnRef');
    const responseCode = searchParams.get('vnp_ResponseCode');
    const amount = searchParams.get('vnp_Amount');

    const errorInfo = resultCodes.find((rc) => rc.code === responseCode) || {
        code: responseCode || 'default',
        description: 'Đã xảy ra lỗi trong quá trình thanh toán.',
        recommendedActions: 'Vui lòng thử lại hoặc liên hệ hỗ trợ.',
    };

    useEffect(() => {
        toast({
            title: 'Thanh toán thất bại',
            description: errorInfo.description,
            variant: 'destructive',
            className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
        });
    }, [errorInfo.description]);

    const handleRetryPayment = () => {
        router.push('/customer/courses');
    };

    const handleBackToCourses = () => {
        router.push('/customer/courses');
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
                        <XCircle className="w-8 h-8 text-[#F76F8E]" />
                        Thanh toán thất bại
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4 text-center">
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        {errorInfo.description}
                    </p>
                    <div className="space-y-2">
                        <p className="text-gray-800 dark:text-gray-200">
                            <strong>Mã giao dịch:</strong> {transactionId || 'N/A'}
                        </p>
                        <p className="text-gray-800 dark:text-gray-200">
                            <strong>Số tiền:</strong> {formattedAmount}
                        </p>
                        <p className="text-gray-800 dark:text-gray-200">
                            <strong>Mã lỗi:</strong> {responseCode || 'N/A'}
                        </p>
                    </div>
                </CardContent>
                <CardContent className="p-6 pt-0 flex flex-col gap-3">
                    <Button
                        variant="default"
                        className="w-full bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#5A6BBE] dark:hover:bg-[#4ac2a0] text-white font-semibold py-3 rounded-full transition-all duration-200 shadow-md"
                        onClick={handleRetryPayment}
                    >
                        Thử lại thanh toán
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                        onClick={handleBackToCourses}
                    >
                        Quay lại danh sách khóa học
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
