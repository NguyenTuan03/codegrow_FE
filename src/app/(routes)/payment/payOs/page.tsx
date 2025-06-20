'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import CustomerHeader from '@/lib/components/layout/header/Customerheader';
import { Skeleton } from '@/components/ui/skeleton';

interface PaymentData {
    id?: string;
    status?: string;
    items?: { name: string; quantity: number; price: number }[];
    amount?: number;
    webhook_snapshot?: {
        orderCode?: string;
        amount?: string;
        description?: string;
        accountNumber?: string;
        reference?: string;
        transactionDateTime?: string;
        paymentLinkId?: string;
        code?: string;
        desc?: string;
        counterAccountBankId?: string;
        counterAccountBankName?: string;
        counterAccountName?: string;
        counterAccountNumber?: string;
        virtualAccountName?: string;
        virtualAccountNumber?: string;
    };
}

const WEBHOOK_FIELD_DESC = {
    orderCode: 'Order Code',
    amount: 'Amount',
    description: 'Payment Description',
    accountNumber: 'Account Number',
    reference: 'Reference Code',
    transactionDateTime: 'Transaction Time',
    paymentLinkId: 'Payment Link ID',
    code: 'Status Code',
    desc: 'Status Description',
    counterAccountBankId: 'Counter Bank ID',
    counterAccountBankName: 'Counter Bank Name',
    counterAccountName: 'Counter Account Name',
    counterAccountNumber: 'Counter Account Number',
    virtualAccountName: 'Virtual Account Name',
    virtualAccountNumber: 'Virtual Account Number',
};

const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PaymentCallbackPage() {
    const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchPaymentData = async () => {
            try {
                setLoading(true);
                const params = Object.fromEntries(searchParams.entries());
                console.log('Callback params:', params);

                // Extract orderCode from query parameters or state
                const orderCode = params.orderCode;
                if (!orderCode) {
                    throw new Error('No order code found in callback.');
                }

                // Simulate fetching order data (replace with actual API call if needed)
                const data: PaymentData = {
                    id: params.id || orderCode,
                    status: params.status || 'PENDING', // Default to PENDING if not provided
                    amount: params.amount ? parseFloat(params.amount) : undefined,
                    items: params.items
                        ? JSON.parse(params.items)
                        : [
                              {
                                  name: 'Course',
                                  quantity: 1,
                                  price: parseFloat(params.amount || '0'),
                              },
                          ],
                    webhook_snapshot: Object.fromEntries(
                        Object.entries(params).filter(([key]) => key in WEBHOOK_FIELD_DESC),
                    ),
                };

                if (!data.id) {
                    throw new Error('No payment data received.');
                }

                setPaymentData(data);
            } catch (error) {
                console.error('Error fetching payment data:', error);
                toast({
                    title: 'Error',
                    description:
                        error instanceof Error ? error.message : 'Failed to load payment data.',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentData();
    }, [searchParams, router]);

    const handleBackToCourses = () => {
        router.push('/customer/courses');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <CustomerHeader />
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="container mx-auto p-4 sm:p-6"
            >
                <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
                    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                        <CardHeader className="flex flex-col items-center justify-center text-center p-6">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                Payment Status
                            </h1>
                            {loading ? (
                                <div className="flex items-center gap-2 mt-4">
                                    <Loader2 className="h-6 w-6 animate-spin text-[#657ED4] dark:text-[#5AD3AF]" />
                                    <span className="text-lg text-gray-600 dark:text-gray-300">
                                        Processing payment data...
                                    </span>
                                </div>
                            ) : paymentData?.status ? (
                                <Badge
                                    className={`mt-4 text-lg ${
                                        paymentData.status === 'PAID'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                            : paymentData.status === 'PENDING'
                                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
                                    }`}
                                >
                                    {paymentData.status === 'PAID'
                                        ? 'Paid'
                                        : paymentData.status === 'PENDING'
                                          ? 'Pending'
                                          : 'Unpaid'}
                                </Badge>
                            ) : null}
                        </CardHeader>
                        <CardContent className="p-6">
                            {loading ? (
                                <div className="space-y-4">
                                    <Skeleton className="h-10 w-full" />
                                    <Skeleton className="h-10 w-full" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            ) : paymentData ? (
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                                            Order ID
                                        </span>
                                        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                            #{paymentData.id}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                                            Status
                                        </span>
                                        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                            {paymentData.status === 'PAID'
                                                ? 'Paid'
                                                : paymentData.status === 'PENDING'
                                                  ? 'Pending'
                                                  : 'Unpaid'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                                            Items
                                        </span>
                                        <ul className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                            {paymentData.items?.map((item, index) => (
                                                <li key={index}>
                                                    {`Name: ${item.name}, Quantity: ${item.quantity}, Price: ${item.price} VND`}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                                            Total Amount
                                        </span>
                                        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                            {paymentData.amount || 0} VND
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-gray-500 dark:text-gray-400 text-lg font-medium">
                                    No payment information available.
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="p-6 flex justify-center">
                            <Button
                                onClick={handleBackToCourses}
                                className="bg-[#657ED4] dark:bg-[#5AD3AF] hover:bg-[#5A6BBE] dark:hover:bg-[#4ac2a0] text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
                            >
                                Back to Courses
                            </Button>
                        </CardFooter>
                    </Card>

                    {paymentData?.webhook_snapshot && (
                        <motion.div variants={itemVariants} className="mt-8">
                            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                                <CardHeader className="p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                        Payment Webhook Details
                                    </h2>
                                </CardHeader>
                                <CardContent className="p-6">
                                    {loading ? (
                                        <div className="space-y-4">
                                            <Skeleton className="h-10 w-full" />
                                            <Skeleton className="h-10 w-full" />
                                            <Skeleton className="h-10 w-full" />
                                        </div>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead>
                                                    <tr className="bg-gray-100 dark:bg-gray-700">
                                                        <th className="p-2 text-gray-900 dark:text-gray-100 font-semibold">
                                                            Field
                                                        </th>
                                                        <th className="p-2 text-gray-900 dark:text-gray-100 font-semibold">
                                                            Value
                                                        </th>
                                                        <th className="p-2 text-gray-900 dark:text-gray-100 font-semibold">
                                                            Description
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.entries(
                                                        paymentData.webhook_snapshot,
                                                    ).map(([key, value]) => (
                                                        <tr
                                                            key={key}
                                                            className="border-t border-gray-200 dark:border-gray-700"
                                                        >
                                                            <td className="p-2 text-gray-700 dark:text-gray-300 font-medium">
                                                                {key}
                                                            </td>
                                                            <td className="p-2 text-gray-900 dark:text-gray-100">
                                                                {value || 'N/A'}
                                                            </td>
                                                            <td className="p-2 text-gray-600 dark:text-gray-400">
                                                                {WEBHOOK_FIELD_DESC[
                                                                    key as keyof typeof WEBHOOK_FIELD_DESC
                                                                ] || 'N/A'}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
}
