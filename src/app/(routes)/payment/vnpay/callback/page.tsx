'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Info, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

const iconsMap = {
    Success: <CheckCircle2 className="text-green-500 w-6 h-6" />,
    'System error': <AlertCircle className="text-yellow-500 w-6 h-6" />,
    'Merchant error': <XCircle className="text-red-500 w-6 h-6" />,
    'User error': <Info className="text-orange-500 w-6 h-6" />,
    Pending: <Loader2 className="animate-spin text-blue-500 w-6 h-6" />,
};

// const resultCodes = new Map([
//     [
//         '0',
//         {
//             description: 'Thành công.',
//             finalStatus: true,
//             recommendedActions: '',
//             type: 'Success',
//         },
//     ],
//     [
//         '10',
//         {
//             description: 'Hệ thống đang được bảo trì.',
//             finalStatus: false,
//             recommendedActions: 'Vui lòng quay lại sau.',
//             type: 'System error',
//         },
//     ],
//     [
//         '1000',
//         {
//             description: 'Đang chờ người dùng xác nhận thanh toán.',
//             finalStatus: false,
//             recommendedActions: 'Vui lòng chờ hoặc quay lại sau.',
//             type: 'Pending',
//         },
//     ],
//     [
//         '1006',
//         {
//             description: 'Người dùng đã từ chối thanh toán.',
//             finalStatus: true,
//             recommendedActions: 'Vui lòng thử lại.',
//             type: 'User error',
//         },
//     ],
//     // Add more result codes as needed
// ]);

export default function MoMoCallback() {
    const params = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [resultCodeInfo] = useState<{
        description: string;
        finalStatus: boolean;
        recommendedActions: string;
        type: keyof typeof iconsMap;
    } | null>(null);

    useEffect(() => {
        const resultCode = params.get('resultCode');
        if (resultCode) {
            // const info = resultCodes.get(resultCode) || {
            //     description: 'Không xác định.',
            //     finalStatus: true,
            //     recommendedActions: 'Vui lòng liên hệ MoMo.',
            //     type: 'System error' as keyof typeof iconsMap,
            // };
            // setResultCodeInfo(info);
        }
        setLoading(false);
    }, [params]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="animate-spin w-8 h-8 text-blue-500 mb-4" />
                <p>Đang xử lý thông tin thanh toán...</p>
            </div>
        );
    }

    if (!resultCodeInfo) {
        return (
            <Alert variant="destructive">
                <AlertTitle>Lỗi!</AlertTitle>
                <AlertDescription>Không thể xác định kết quả giao dịch.</AlertDescription>
            </Alert>
        );
    }

    const Icon = iconsMap[resultCodeInfo.type];

    return (
        <div className="max-w-xl mx-auto mt-10">
            <Card>
                <CardHeader className="flex flex-row items-center space-x-4">
                    {Icon}
                    <CardTitle>Kết quả giao dịch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p>
                        <strong>Trạng thái:</strong> {resultCodeInfo.description}
                    </p>
                    {resultCodeInfo.recommendedActions && (
                        <p>
                            <strong>Hành động đề xuất:</strong> {resultCodeInfo.recommendedActions}
                        </p>
                    )}
                    <Link href="/" passHref>
                        <Button className="mt-4">Quay lại trang chủ</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
