'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
    const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
    }, [searchParams]);

    if (isLoading || !params) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
                <Card className="w-full max-w-md shadow-sm rounded-lg">
                    <CardHeader className="text-center space-y-4">
                        <Loader2 className="w-12 h-12 mx-auto text-blue-600 animate-spin" />
                        <CardTitle className="text-2xl font-semibold">
                            Đang xử lý thanh toán...
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-gray-500">
                        <p>Vui lòng chờ trong khi chúng tôi xác nhận giao dịch của bạn</p>
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

    const statusColor = isSuccess
        ? 'bg-green-100 border-green-500 text-green-700 dark:bg-green-900/30 dark:text-green-300'
        : isError
          ? 'bg-red-100 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-300'
          : 'bg-yellow-100 border-yellow-500 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';

    const statusIcon = isSuccess ? (
        <CheckCircle2 className="w-6 h-6" />
    ) : isError ? (
        <XCircle className="w-6 h-6" />
    ) : (
        <AlertCircle className="w-6 h-6" />
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <Card className="overflow-hidden shadow-sm">
                    <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-semibold">
                                Kết quả thanh toán
                            </CardTitle>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Mã giao dịch:
                                </span>
                                <span className="text-sm font-mono">{params.transId || 'N/A'}</span>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6 p-6">
                        {/* Status Section */}
                        <div className={`flex items-start p-4 rounded-lg border ${statusColor}`}>
                            <div className="mr-4 mt-0.5">{statusIcon}</div>
                            <div>
                                <h3 className="text-lg font-semibold mb-1">
                                    {isSuccess
                                        ? 'Thanh toán thành công'
                                        : isError
                                          ? 'Thanh toán thất bại'
                                          : 'Thanh toán đang xử lý'}
                                </h3>
                                <p className="text-sm">{decodeURIComponent(params.message)}</p>
                                {result.recommendedActions && (
                                    <div className="mt-2 text-sm">
                                        <p className="font-medium">Hướng dẫn:</p>
                                        <p>{result.recommendedActions}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="space-y-4">
                            <h4 className="font-medium text-gray-700 dark:text-gray-300">
                                Chi tiết giao dịch
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center">
                                    <Package className="w-5 h-5 mr-2 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Mã đơn hàng</p>
                                        <p className="font-medium">{params.orderId}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <DollarSign className="w-5 h-5 mr-2 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Số tiền</p>
                                        <p className="font-medium">
                                            {new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            }).format(Number(params.amount))}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Info className="w-5 h-5 mr-2 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Thông tin</p>
                                        <p className="font-medium">
                                            {decodeURIComponent(params.orderInfo)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-5 h-5 mr-2 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Thời gian</p>
                                        <p className="font-medium">
                                            {new Date(Number(params.responseTime)).toLocaleString(
                                                'vi-VN',
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Technical Details */}
                        <div className="space-y-2">
                            <h4 className="font-medium text-gray-700 dark:text-gray-300">
                                Thông tin kỹ thuật
                            </h4>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-500">Mã kết quả</p>
                                        <p className="font-mono">{result.code}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Loại lỗi</p>
                                        <p>{result.type}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Phương thức</p>
                                        <p>{params.payType || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Đối tác</p>
                                        <p>{params.partnerCode}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                            {isError && (
                                <Button variant="outline" asChild>
                                    <Link href="/payment">Thử lại thanh toán</Link>
                                </Button>
                            )}
                            <Button asChild>
                                <Link href="/">Về trang chủ</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer Note */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>
                        Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ bộ phận hỗ trợ của chúng tôi
                    </p>
                </div>
            </div>
        </div>
    );
}
