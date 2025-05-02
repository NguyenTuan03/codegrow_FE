'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    AlertCircle,
    CheckCircle2,
    XCircle,
    Loader2,
    Package,
    DollarSign,
    Info,
    Clock,
} from 'lucide-react';
import Link from 'next/link';

interface MoMoCallbackParams {
    partnerCode: string;
    orderId: string;
    requestId: string;
    amount: string;
    orderInfo: string;
    orderType: string;
    transId: string;
    resultCode: string;
    message: string;
    payType: string;
    responseTime: string;
    extraData: string;
    signature: string;
}

interface ResultCodeInfo {
    code: string;
    description: string;
    finalStatus: boolean;
    recommendedActions: string;
    type: string;
}

const resultCodes: ResultCodeInfo[] = [
    {
        code: '0',
        description: 'Thành công.',
        finalStatus: true,
        recommendedActions: '',
        type: 'Success',
    },
    {
        code: '10',
        description: 'Hệ thống đang được bảo trì.',
        finalStatus: false,
        recommendedActions: 'Vui lòng quay lại sau khi bảo trì được hoàn tất.',
        type: 'System error',
    },
    {
        code: '11',
        description: 'Truy cập bị từ chối.',
        finalStatus: false,
        recommendedActions:
            'Cấu hình tài khoản doanh nghiệp không cho phép truy cập. Vui lòng xem lại các thông tin đăng ký và cấu hình trên M4B, hoặc liên hệ trực tiếp với MoMo để được điều chỉnh.',
        type: 'System error',
    },
    {
        code: '12',
        description: 'Phiên bản API không được hỗ trợ cho yêu cầu này.',
        finalStatus: false,
        recommendedActions:
            'Vui lòng nâng cấp lên phiên bản mới nhất của cổng thanh toán, vì phiên bản bạn đang truy cập hiện không còn được hỗ trợ.',
        type: 'System error',
    },
    {
        code: '13',
        description: 'Xác thực doanh nghiệp thất bại.',
        finalStatus: false,
        recommendedActions:
            'Vui lòng kiểm tra thông tin kết nối, bao gồm cả chữ ký mà bạn đang sử dụng, và đối chiếu với các thông tin được cung cấp từ M4B.',
        type: 'Merchant error',
    },
    {
        code: '20',
        description: 'Yêu cầu sai định dạng.',
        finalStatus: false,
        recommendedActions:
            'Vui lòng kiểm tra định dạng của yêu cầu, các biến thể, hoặc tham số còn thiếu.',
        type: 'Merchant error',
    },
    {
        code: '21',
        description: 'Yêu cầu bị từ chối vì số tiền giao dịch không hợp lệ.',
        finalStatus: false,
        recommendedActions: 'Vui lòng kiểm tra số tiền hợp lệ và thực hiện lại yêu cầu.',
        type: 'Merchant error',
    },
    {
        code: '22',
        description: 'Số tiền giao dịch không hợp lệ.',
        finalStatus: false,
        recommendedActions:
            'Vui lòng kiểm tra nếu số tiền thanh toán nằm trong giới hạn quy định của yêu cầu thanh toán này. Đối với yêu cầu dạng capture, hãy kiểm tra số tiền capture có bằng với số tiền đã được xác nhận trước đó hay không.',
        type: 'Merchant error',
    },
    {
        code: '40',
        description: 'RequestId bị trùng.',
        finalStatus: false,
        recommendedActions: 'Vui lòng thử lại với một requestId khác.',
        type: 'Merchant error',
    },
    {
        code: '41',
        description: 'OrderId bị trùng.',
        finalStatus: false,
        recommendedActions:
            'Vui lòng truy vấn trạng thái của orderId này, hoặc thử lại với một orderId khác.',
        type: 'Merchant error',
    },
    {
        code: '42',
        description: 'OrderId không hợp lệ hoặc không được tìm thấy.',
        finalStatus: false,
        recommendedActions: 'Vui lòng thử lại với một orderId khác.',
        type: 'Merchant error',
    },
    {
        code: '43',
        description: 'Yêu cầu bị từ chối vì xung đột trong quá trình xử lý giao dịch.',
        finalStatus: false,
        recommendedActions:
            'Trước khi thử lại, vui lòng kiểm tra nếu có một giao dịch khác đang được xử lý có thể hạn chế yêu cầu này được tiếp nhận, hoặc orderId được sử dụng không phù hợp với yêu cầu này.',
        type: 'Merchant error',
    },
    {
        code: '45',
        description: 'Trùng ItemId.',
        finalStatus: false,
        recommendedActions: 'Vui lòng kiểm tra và thử lại yêu cầu với ItemId duy nhất.',
        type: 'Merchant error',
    },
    {
        code: '47',
        description:
            'Yêu cầu bị từ chối vì thông tin không hợp lệ trong danh sách dữ liệu khả dụng.',
        finalStatus: false,
        recommendedActions: 'Vui lòng kiểm tra và thử lại với yêu cầu khác.',
        type: 'System error',
    },
    {
        code: '98',
        description: 'QR Code tạo không thành công. Vui lòng thử lại sau.',
        finalStatus: true,
        recommendedActions: 'Vui lòng thử lại với yêu cầu khác.',
        type: 'System error',
    },
    {
        code: '99',
        description: 'Lỗi không xác định.',
        finalStatus: true,
        recommendedActions: 'Vui lòng liên hệ MoMo để biết thêm chi tiết.',
        type: 'System error',
    },
    {
        code: '1000',
        description: 'Giao dịch đã được khởi tạo, chờ người dùng xác nhận thanh toán.',
        finalStatus: false,
        recommendedActions:
            'Giao dịch vẫn đang chờ người dùng xác nhận thanh toán; trạng thái của giao dịch sẽ được tự động thay đổi ngay sau khi người dùng xác nhận hoặc hủy thanh toán.',
        type: 'Pending',
    },
    {
        code: '1001',
        description: 'Giao dịch thanh toán thất bại do tài khoản người dùng không đủ tiền.',
        finalStatus: true,
        recommendedActions: '',
        type: 'Merchant error',
    },
    {
        code: '1002',
        description: 'Giao dịch bị từ chối do nhà phát hành tài khoản thanh toán.',
        finalStatus: true,
        recommendedActions:
            'Sự từ chối xảy ra khi thẻ được dùng để thanh toán hiện không còn khả dụng, hoặc kết nối đến hệ thống của nhà phát hành thẻ bị gián đoạn. Vui lòng tạm thời sử dụng phương thức thanh toán khác.',
        type: 'User error',
    },
    {
        code: '1003',
        description: 'Giao dịch bị đã bị hủy.',
        finalStatus: true,
        recommendedActions:
            'Giao dịch bị hủy bởi doanh nghiệp hoặc bởi trình xử lý timeout của MoMo. Vui lòng đánh dấu giao dịch này đã bị hủy (giao dịch thất bại).',
        type: 'Merchant error',
    },
    {
        code: '1004',
        description:
            'Giao dịch thất bại do số tiền thanh toán vượt quá hạn mức thanh toán của người dùng.',
        finalStatus: true,
        recommendedActions:
            'Vui lòng đánh dấu giao dịch này thất bại, và thử lại vào một khoảng thời gian khác.',
        type: 'User error',
    },
    {
        code: '1005',
        description: 'Giao dịch thất bại do url hoặc QR code đã hết hạn.',
        finalStatus: true,
        recommendedActions: 'Vui lòng gửi lại một yêu cầu thanh toán khác.',
        type: 'System error',
    },
    {
        code: '1006',
        description: 'Giao dịch thất bại do người dùng đã từ chối xác nhận thanh toán.',
        finalStatus: true,
        recommendedActions: 'Vui lòng gửi lại một yêu cầu thanh toán khác.',
        type: 'User error',
    },
    {
        code: '1007',
        description:
            'Giao dịch bị từ chối vì tài khoản không tồn tại hoặc đang ở trạng thái ngưng hoạt động.',
        finalStatus: true,
        recommendedActions:
            'Vui lòng đảm bảo trạng thái tài khoản phải được kích hoạt/ đã xác thực trước khi thực hiện lại hoặc liên hệ MoMo để được hỗ trợ.',
        type: 'System error',
    },
    {
        code: '1017',
        description: 'Giao dịch bị hủy bởi đối tác.',
        finalStatus: true,
        recommendedActions: '',
        type: 'Merchant error',
    },
    {
        code: '1026',
        description: 'Giao dịch bị hạn chế theo thể lệ chương trình khuyến mãi.',
        finalStatus: true,
        recommendedActions: 'Vui lòng liên hệ MoMo để biết thêm chi tiết.',
        type: 'System error',
    },
    {
        code: '1080',
        description:
            'Giao dịch hoàn tiền thất bại trong quá trình xử lý. Vui lòng thử lại trong khoảng thời gian ngắn, tốt hơn là sau một giờ.',
        finalStatus: true,
        recommendedActions:
            'Vui lòng kiểm tra nếu orderId hoặc transId được dùng trong yêu cầu này là chính xác, sau đó thử lại yêu cầu hoàn tiền (khuyến khích thử lại sau một giờ đối với giao dịch thanh toán được thực hiện hơn một tháng trước).',
        type: 'Merchant error',
    },
    {
        code: '1081',
        description:
            'Giao dịch hoàn tiền bị từ chối. Giao dịch thanh toán ban đầu có thể đã được hoàn.',
        finalStatus: true,
        recommendedActions:
            'Vui lòng kiểm tra nếu giao dịch thanh toán ban đầu đã được hoàn thành công, hoặc số tiền hoàn vượt quá số tiền cho phép hoàn của giao dịch thanh toán ban đầu.',
        type: 'Merchant error',
    },
    {
        code: '1088',
        description:
            'Giao dịch hoàn tiền bị từ chối. Giao dịch thanh toán ban đầu không được hỗ trợ hoàn tiền.',
        finalStatus: true,
        recommendedActions: 'Vui lòng liên hệ MoMo để biết thêm chi tiết.',
        type: 'Merchant error',
    },
    {
        code: '2019',
        description: 'Yêu cầu bị từ chối vì orderGroupId không hợp lệ.',
        finalStatus: true,
        recommendedActions: 'Vui lòng liên hệ MoMo để biết thêm chi tiết.',
        type: 'Merchant error',
    },
    {
        code: '4001',
        description: 'Giao dịch bị từ chối do tài khoản người dùng đang bị hạn chế.',
        finalStatus: true,
        recommendedActions: 'Vui lòng liên hệ MoMo để biết thêm chi tiết.',
        type: 'User error',
    },
    {
        code: '4002',
        description: 'Giao dịch bị từ chối do tài khoản người dùng chưa được xác thực với C06.',
        finalStatus: true,
        recommendedActions: 'Người dùng cần cập nhật sinh trắc học qua NFC để được phép giao dịch.',
        type: 'User error',
    },
    {
        code: '4100',
        description: 'Giao dịch thất bại do người dùng không đăng nhập thành công.',
        finalStatus: true,
        recommendedActions: '',
        type: 'User error',
    },
    {
        code: '7000',
        description: 'Giao dịch đang được xử lý.',
        finalStatus: false,
        recommendedActions: 'Vui lòng chờ giao dịch được xử lý hoàn tất.',
        type: 'Pending',
    },
    {
        code: '7002',
        description: 'Giao dịch đang được xử lý bởi nhà cung cấp loại hình thanh toán.',
        finalStatus: false,
        recommendedActions:
            'Vui lòng chờ giao dịch được xử lý. Kết quả giao dịch sẽ được thông báo ngay khi được xử lý hoàn tất.',
        type: 'Pending',
    },
    {
        code: '9000',
        description: 'Giao dịch đã được xác nhận thành công.',
        finalStatus: false,
        recommendedActions:
            'Đối với thanh toán 1 bước (autoCapture=1), đây có thể xem như giao dịch thanh toán đã thành công. Đối với thanh toán 2 bước (autoCapture=0), vui lòng thực hiện tiếp yêu cầu capture hoặc cancel. Đối với liên kết, vui lòng tiến hành yêu cầu lấy recurring token.',
        type: 'Pending',
    },
];

export default function MoMoCallbackPage() {
    const searchParams = useSearchParams();
    const [params, setParams] = useState<MoMoCallbackParams | null>(null);

    useEffect(() => {
        const parsedParams: MoMoCallbackParams = {
            partnerCode: searchParams.get('partnerCode') || '',
            orderId: searchParams.get('orderId') || '',
            requestId: searchParams.get('requestId') || '',
            amount: searchParams.get('amount') || '',
            orderInfo: searchParams.get('orderInfo') || '',
            orderType: searchParams.get('orderType') || '',
            transId: searchParams.get('transId') || '',
            resultCode: searchParams.get('resultCode') || '',
            message: searchParams.get('message') || '',
            payType: searchParams.get('payType') || '',
            responseTime: searchParams.get('responseTime') || '',
            extraData: searchParams.get('extraData') || '',
            signature: searchParams.get('signature') || '',
        };
        setParams(parsedParams);
    }, [searchParams]);

    if (!params) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                <Card className="w-full max-w-md shadow-lg rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                            Đang xử lý...
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center space-y-4">
                        <Loader2 className="w-12 h-12 text-blue-500 dark:text-blue-400 animate-spin" />
                        <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                            Vui lòng chờ trong khi chúng tôi xử lý yêu cầu của bạn.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const result = resultCodes.find((rc) => rc.code === params.resultCode) || {
        code: params.resultCode,
        description: 'Mã lỗi không xác định.',
        finalStatus: true,
        recommendedActions: 'Vui lòng liên hệ MoMo để biết thêm chi tiết.',
        type: 'Unknown',
    };

    const isSuccess = result.code === '0' || result.code === '9000';
    const isPending = ['1000', '7000', '7002', '9000'].includes(result.code);
    const isError = !isSuccess && !isPending;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4">
            <Card className="w-full max-w-lg shadow-lg rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Kết quả thanh toán MoMo
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Status Alert */}
                    <Alert
                        variant={isSuccess ? 'default' : isError ? 'destructive' : 'default'}
                        className={`${
                            isPending
                                ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200'
                                : isSuccess
                                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                                  : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                        } flex items-start space-x-3 p-4 rounded-lg`}
                    >
                        {isSuccess ? (
                            <CheckCircle2 className="h-5 w-5 mt-0.5 text-green-600 dark:text-green-400" />
                        ) : isError ? (
                            <XCircle className="h-5 w-5 mt-0.5 text-red-600 dark:text-red-400" />
                        ) : (
                            <AlertCircle className="h-5 w-5 mt-0.5 text-yellow-600 dark:text-yellow-400" />
                        )}
                        <div>
                            <AlertTitle className="text-lg font-semibold">
                                {isSuccess ? 'Thành công' : isError ? 'Lỗi' : 'Đang xử lý'}
                            </AlertTitle>
                            <AlertDescription className="text-sm space-y-1">
                                <p className="font-medium">{decodeURIComponent(params.message)}</p>
                                <p>Mã kết quả: {result.code}</p>
                                <p>Loại lỗi: {result.type}</p>
                                {result.recommendedActions && (
                                    <p>Hành động đề nghị: {result.recommendedActions}</p>
                                )}
                            </AlertDescription>
                        </div>
                    </Alert>

                    {/* Payment Details */}
                    <div className="space-y-3 rounded-lg bg-gray-50 dark:bg-gray-700 p-4">
                        <div className="flex items-center space-x-2">
                            <Package className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                                Mã đơn hàng:
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">
                                {params.orderId}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                                Số tiền:
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">
                                {new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                }).format(Number(params.amount))}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Info className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                                Thông tin đơn hàng:
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">
                                {decodeURIComponent(params.orderInfo)}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                                Thời gian phản hồi:
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">
                                {new Date(Number(params.responseTime)).toLocaleString('vi-VN')}
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3">
                        {isError && result.recommendedActions?.includes('thử lại') && (
                            <Button
                                variant="outline"
                                asChild
                                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                                <Link href="/payment">Thử lại thanh toán</Link>
                            </Button>
                        )}
                        <Button
                            asChild
                            className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            <Link href="/">Quay về trang chủ</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
