'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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
        description: 'Success.',
        finalStatus: true,
        recommendedActions: '',
        type: 'Success',
    },
    {
        code: '10',
        description: 'System is under maintenance.',
        finalStatus: false,
        recommendedActions: 'Please try again after maintenance is complete.',
        type: 'System error',
    },
    {
        code: '11',
        description: 'Access denied.',
        finalStatus: false,
        recommendedActions:
            'Your business account configuration does not allow access. Please review your registration and configuration details on M4B, or contact MoMo directly for adjustments.',
        type: 'System error',
    },
    {
        code: '12',
        description: 'API version not supported for this request.',
        finalStatus: false,
        recommendedActions:
            'Please upgrade to the latest version of the payment gateway, as the version you are accessing is no longer supported.',
        type: 'System error',
    },
    {
        code: '13',
        description: 'Business authentication failed.',
        finalStatus: false,
        recommendedActions:
            'Please check your connection details, including the signature you are using, and verify them against the information provided by M4B.',
        type: 'Merchant error',
    },
    {
        code: '20',
        description: 'Invalid request format.',
        finalStatus: false,
        recommendedActions:
            'Please check the format of your request, including any missing variables or parameters.',
        type: 'Merchant error',
    },
    {
        code: '21',
        description: 'Request rejected due to invalid transaction amount.',
        finalStatus: false,
        recommendedActions: 'Please verify the transaction amount and resubmit the request.',
        type: 'Merchant error',
    },
    {
        code: '22',
        description: 'Invalid transaction amount.',
        finalStatus: false,
        recommendedActions:
            'Please ensure the payment amount is within the allowed limits for this transaction. For capture requests, verify that the capture amount matches the previously confirmed amount.',
        type: 'Merchant error',
    },
    {
        code: '40',
        description: 'Duplicate RequestId.',
        finalStatus: false,
        recommendedActions: 'Please try again with a different RequestId.',
        type: 'Merchant error',
    },
    {
        code: '41',
        description: 'Duplicate OrderId.',
        finalStatus: false,
        recommendedActions:
            'Please check the status of this OrderId or try again with a different OrderId.',
        type: 'Merchant error',
    },
    {
        code: '42',
        description: 'OrderId is invalid or not found.',
        finalStatus: false,
        recommendedActions: 'Please try again with a different OrderId.',
        type: 'Merchant error',
    },
    {
        code: '43',
        description: 'Request rejected due to conflict during transaction processing.',
        finalStatus: false,
        recommendedActions:
            'Before retrying, please check if another transaction in progress might be restricting this request, or if the OrderId is not suitable for this request.',
        type: 'Merchant error',
    },
    {
        code: '45',
        description: 'Duplicate ItemId.',
        finalStatus: false,
        recommendedActions: 'Please verify and resubmit the request with a unique ItemId.',
        type: 'Merchant error',
    },
    {
        code: '47',
        description: 'Request rejected due to invalid information in the available data list.',
        finalStatus: false,
        recommendedActions: 'Please verify and resubmit with a different request.',
        type: 'System error',
    },
    {
        code: '98',
        description: 'Failed to generate QR Code. Please try again later.',
        finalStatus: true,
        recommendedActions: 'Please try again with a different request.',
        type: 'System error',
    },
    {
        code: '99',
        description: 'Unknown error.',
        finalStatus: true,
        recommendedActions: 'Please contact MoMo for more details.',
        type: 'System error',
    },
    {
        code: '1000',
        description: 'Transaction initiated, awaiting user payment confirmation.',
        finalStatus: false,
        recommendedActions:
            'The transaction is still pending user confirmation; the transaction status will automatically update once the user confirms or cancels the payment.',
        type: 'Pending',
    },
    {
        code: '1001',
        description: 'Payment transaction failed due to insufficient funds in the user’s account.',
        finalStatus: true,
        recommendedActions: '',
        type: 'Merchant error',
    },
    {
        code: '1002',
        description: 'Transaction rejected by the payment account issuer.',
        finalStatus: true,
        recommendedActions:
            'The rejection occurs when the card used for payment is no longer valid, or the connection to the issuer’s system is interrupted. Please use a different payment method temporarily.',
        type: 'User error',
    },
    {
        code: '1003',
        description: 'Transaction has been canceled.',
        finalStatus: true,
        recommendedActions:
            'The transaction was canceled by the merchant or by MoMo’s timeout process. Please mark this transaction as canceled (failed transaction).',
        type: 'Merchant error',
    },
    {
        code: '1004',
        description: 'Transaction failed due to exceeding the user’s payment limit.',
        finalStatus: true,
        recommendedActions: 'Please mark this transaction as failed and try again later.',
        type: 'User error',
    },
    {
        code: '1005',
        description: 'Transaction failed due to expired URL or QR code.',
        finalStatus: true,
        recommendedActions: 'Please submit a new payment request.',
        type: 'System error',
    },
    {
        code: '1006',
        description: 'Transaction failed because the user declined to confirm the payment.',
        finalStatus: true,
        recommendedActions: 'Please submit a new payment request.',
        type: 'User error',
    },
    {
        code: '1007',
        description: 'Transaction rejected because the account does not exist or is inactive.',
        finalStatus: true,
        recommendedActions:
            'Please ensure the account is activated/verified before retrying, or contact MoMo for support.',
        type: 'System error',
    },
    {
        code: '1017',
        description: 'Transaction canceled by the partner.',
        finalStatus: true,
        recommendedActions: '',
        type: 'Merchant error',
    },
    {
        code: '1026',
        description: 'Transaction restricted due to promotional program rules.',
        finalStatus: true,
        recommendedActions: 'Please contact MoMo for more details.',
        type: 'System error',
    },
    {
        code: '1080',
        description:
            'Refund transaction failed during processing. Please try again shortly, preferably after an hour.',
        finalStatus: true,
        recommendedActions:
            'Please verify if the OrderId or TransId used in this request is correct, then retry the refund request (preferably after an hour for transactions older than one month).',
        type: 'Merchant error',
    },
    {
        code: '1081',
        description:
            'Refund transaction rejected. The original payment may have already been refunded.',
        finalStatus: true,
        recommendedActions:
            'Please check if the original payment was successfully refunded, or if the refund amount exceeds the allowable refund amount for the original payment.',
        type: 'Merchant error',
    },
    {
        code: '1088',
        description: 'Refund transaction rejected. The original payment does not support refunds.',
        finalStatus: true,
        recommendedActions: 'Please contact MoMo for more details.',
        type: 'Merchant error',
    },
    {
        code: '2019',
        description: 'Request rejected due to invalid OrderGroupId.',
        finalStatus: true,
        recommendedActions: 'Please contact MoMo for more details.',
        type: 'Merchant error',
    },
    {
        code: '4001',
        description: 'Transaction rejected because the user’s account is restricted.',
        finalStatus: true,
        recommendedActions: 'Please contact MoMo for more details.',
        type: 'User error',
    },
    {
        code: '4002',
        description: 'Transaction rejected because the user’s account is not verified with C06.',
        finalStatus: true,
        recommendedActions:
            'The user needs to update biometrics via NFC to proceed with transactions.',
        type: 'User error',
    },
    {
        code: '4100',
        description: 'Transaction failed because the user did not log in successfully.',
        finalStatus: true,
        recommendedActions: '',
        type: 'User error',
    },
    {
        code: '7000',
        description: 'Transaction is being processed.',
        finalStatus: false,
        recommendedActions: 'Please wait for the transaction to complete processing.',
        type: 'Pending',
    },
    {
        code: '7002',
        description: 'Transaction is being processed by the payment method provider.',
        finalStatus: false,
        recommendedActions:
            'Please wait for the transaction to be processed. The transaction result will be notified once processing is complete.',
        type: 'Pending',
    },
    {
        code: '9000',
        description: 'Transaction successfully confirmed.',
        finalStatus: false,
        recommendedActions:
            'For one-step payments (autoCapture=1), this can be considered a successful payment. For two-step payments (autoCapture=0), please proceed with a capture or cancel request. For tokenization, please proceed with a recurring token request.',
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
                <Card className="w-full max-w-md shadow-md rounded-xl border border-gray-200 dark:border-gray-700">
                    <CardHeader className="text-center space-y-4">
                        <Loader2 className="w-12 h-12 mx-auto text-blue-600 animate-spin" />
                        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                            Processing Payment...
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-gray-600 dark:text-gray-400">
                        <p>Please wait while we confirm your transaction.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const result = resultCodes.find((rc) => rc.code === params.resultCode) || {
        code: params.resultCode,
        description: 'Unknown error code.',
        finalStatus: true,
        recommendedActions: 'Please contact MoMo for more details.',
        type: 'Unknown',
    };

    const isSuccess = result.code === '0' || result.code === '9000';
    const isPending = ['1000', '7000', '7002', '9000'].includes(result.code);
    const isError = !isSuccess && !isPending;

    const statusColor = isSuccess
        ? 'bg-green-50 border-green-500 text-green-800 dark:bg-green-900/30 dark:border-green-600 dark:text-green-300'
        : isError
          ? 'bg-red-50 border-red-500 text-red-800 dark:bg-red-900/30 dark:border-red-600 dark:text-red-300'
          : 'bg-yellow-50 border-yellow-500 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-600 dark:text-yellow-300';

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
                <Card className="overflow-hidden shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
                    <CardHeader className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                                Payment Result
                            </CardTitle>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Transaction ID:
                                </span>
                                <span className="text-sm font-mono text-gray-900 dark:text-gray-100">
                                    {params.transId || 'N/A'}
                                </span>
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
                                        ? 'Payment Successful'
                                        : isError
                                          ? 'Payment Failed'
                                          : 'Payment Processing'}
                                </h3>
                                <p className="text-sm">{decodeURIComponent(params.message)}</p>
                                {result.recommendedActions && (
                                    <div className="mt-2 text-sm">
                                        <p className="font-medium">Recommended Actions:</p>
                                        <p>{result.recommendedActions}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                Transaction Details
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center">
                                    <Package className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Order ID
                                        </p>
                                        <p className="font-medium text-gray-900 dark:text-gray-100">
                                            {params.orderId}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <DollarSign className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Amount
                                        </p>
                                        <p className="font-medium text-gray-900 dark:text-gray-100">
                                            {new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'VND',
                                            }).format(Number(params.amount))}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Info className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Information
                                        </p>
                                        <p className="font-medium text-gray-900 dark:text-gray-100">
                                            {decodeURIComponent(params.orderInfo)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Time
                                        </p>
                                        <p className="font-medium text-gray-900 dark:text-gray-100">
                                            {new Date(Number(params.responseTime)).toLocaleString(
                                                'en-US',
                                                {
                                                    dateStyle: 'medium',
                                                    timeStyle: 'short',
                                                },
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Technical Details */}
                        <div className="space-y-2">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                Technical Information
                            </h4>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Result Code
                                        </p>
                                        <p className="font-mono text-gray-900 dark:text-gray-100">
                                            {result.code}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Error Type
                                        </p>
                                        <p className="text-gray-900 dark:text-gray-100">
                                            {result.type}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Payment Method
                                        </p>
                                        <p className="text-gray-900 dark:text-gray-100">
                                            {params.payType || 'N/A'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 dark:text-gray-400">Partner</p>
                                        <p className="text-gray-900 dark:text-gray-100">
                                            {params.partnerCode}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                            {isError && (
                                <Button
                                    variant="outline"
                                    asChild
                                    className="rounded-lg text-blue-600 dark:text-blue-400 border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors"
                                >
                                    <Link href="/payment">Retry Payment</Link>
                                </Button>
                            )}
                            <Button
                                asChild
                                className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-md"
                            >
                                <Link href="/">Back to Home</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer Note */}
                <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    <p>
                        If you have any questions, please contact our support team at{' '}
                        <a
                            href="mailto:support@example.com"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            admin@example.com
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
