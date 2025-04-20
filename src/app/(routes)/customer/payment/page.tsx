'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { CreditCard, GraduationCap, CheckCircle } from 'lucide-react';
import axios from 'axios';

export default function PaymentPage() {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [loading, setLoading] = useState(false);

    const handleContinue = async () => {
        setLoading(true);
        try {
            if (paymentMethod === 'card') {
                // Process card payment (implement your card payment logic here)
                alert('Card payment processed!');
            } else if (paymentMethod === 'vnpay' || paymentMethod === 'momo') {
                const orderId = Date.now().toString();
                const amount = 500000; // Example amount (500,000 VND)
                const orderInfo = 'Thanh toan khoa hoc EduTech';

                const endpoint =
                    paymentMethod === 'vnpay' ? '/api/payment/vnpay' : '/api/payment/momo';
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}${endpoint}`,
                    {
                        amount,
                        orderId,
                        orderInfo,
                    },
                );

                const { paymentUrl } = response.data;
                if (paymentUrl) {
                    window.location.href = paymentUrl;
                } else {
                    throw new Error('Failed to get payment URL');
                }
            } else {
                alert('Payment method not supported yet.');
            }
        } catch (error) {
            console.error('Payment Error:', error);
            alert('Failed to initiate payment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-6 sm:p-10 bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-700 dark:text-indigo-300 mb-8 flex items-center justify-center gap-3">
                <CreditCard className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                Payment Information
            </h1>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Verify Student Form */}
                <Card className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-indigo-200 dark:border-indigo-700 transition-transform hover:scale-105">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />
                    <CardHeader className="pb-4">
                        <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                            <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                            Student Verification
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Unlock exclusive discounts by verifying your student status
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                                <GraduationCap className="w-4 h-4 text-indigo-500" />
                                Major
                            </Label>
                            <Input
                                placeholder="e.g., Computer Science"
                                className="bg-indigo-50 dark:bg-gray-700 border-indigo-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg transition-all"
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1 flex flex-col gap-2">
                                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Month
                                </Label>
                                <Input
                                    placeholder="e.g., 05"
                                    className="bg-indigo-50 dark:bg-gray-700 border-indigo-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg transition-all"
                                />
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Year
                                </Label>
                                <Input
                                    placeholder="e.g., 2025"
                                    className="bg-indigo-50 dark:bg-gray-700 border-indigo-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg transition-all"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                                <GraduationCap className="w-4 h-4 text-indigo-500" />
                                School Email
                            </Label>
                            <Input
                                placeholder="example@school.edu"
                                className="bg-indigo-50 dark:bg-gray-700 border-indigo-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg transition-all"
                            />
                        </div>
                        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white w-full mt-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            Verify Student Status
                        </Button>
                    </CardContent>
                </Card>

                {/* Payment Method */}
                <Card className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-indigo-200 dark:border-indigo-700 transition-transform hover:scale-105">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />
                    <CardHeader>
                        <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                            <CreditCard className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                            Payment Method
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Select your preferred payment method
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Payment Options */}
                        <RadioGroup
                            value={paymentMethod}
                            onValueChange={setPaymentMethod}
                            className="grid grid-cols-2 gap-4"
                        >
                            <div className="flex items-center gap-3 p-3 bg-indigo-50 dark:bg-gray-700 rounded-lg border border-indigo-300 dark:border-gray-600 hover:bg-indigo-100 dark:hover:bg-gray-600 transition-colors">
                                <RadioGroupItem
                                    value="card"
                                    id="card"
                                    className="h-5 w-5 text-indigo-600"
                                />
                                <Label
                                    htmlFor="card"
                                    className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 cursor-pointer"
                                >
                                    <CreditCard className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                    Credit Card
                                </Label>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-indigo-50 dark:bg-gray-700 rounded-lg border border-indigo-300 dark:border-gray-600 hover:bg-indigo-100 dark:hover:bg-gray-600 transition-colors">
                                <RadioGroupItem
                                    value="momo"
                                    id="momo"
                                    className="h-5 w-5 text-indigo-600"
                                />
                                <Label
                                    htmlFor="momo"
                                    className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 cursor-pointer"
                                >
                                    <Image src="/momo.png" alt="MoMo" width={24} height={24} />
                                    MoMo
                                </Label>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-indigo-50 dark:bg-gray-700 rounded-lg border border-indigo-300 dark:border-gray-600 hover:bg-indigo-100 dark:hover:bg-gray-600 transition-colors">
                                <RadioGroupItem
                                    value="vnpay"
                                    id="vnpay"
                                    className="h-5 w-5 text-indigo-600"
                                />
                                <Label
                                    htmlFor="vnpay"
                                    className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 cursor-pointer"
                                >
                                    <Image src="/vnpay.png" alt="VNPay" width={24} height={24} />
                                    VNPay
                                </Label>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-indigo-50 dark:bg-gray-700 rounded-lg border border-indigo-300 dark:border-gray-600 hover:bg-indigo-100 dark:hover:bg-gray-600 transition-colors">
                                <RadioGroupItem
                                    value="zalopay"
                                    id="zalopay"
                                    className="h-5 w-5 text-indigo-600"
                                />
                                <Label
                                    htmlFor="zalopay"
                                    className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 cursor-pointer"
                                >
                                    <Image
                                        src="/zalopay.png"
                                        alt="ZaloPay"
                                        width={24}
                                        height={24}
                                    />
                                    ZaloPay
                                </Label>
                            </div>
                        </RadioGroup>

                        <Separator className="my-4 bg-indigo-200 dark:bg-gray-600" />

                        {/* Card Details Form (only shown for card payment) */}
                        {paymentMethod === 'card' && (
                            <div className="space-y-6">
                                <div className="flex flex-col gap-2">
                                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                                        <CreditCard className="w-4 h-4 text-indigo-500" />
                                        Cardholder Name
                                    </Label>
                                    <Input
                                        placeholder="First Last"
                                        className="bg-indigo-50 dark:bg-gray-700 border-indigo-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg transition-all"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                                        <CreditCard className="w-4 h-4 text-indigo-500" />
                                        Card Number
                                    </Label>
                                    <Input
                                        placeholder="1234 5678 9012 3456"
                                        className="bg-indigo-50 dark:bg-gray-700 border-indigo-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg transition-all"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1 flex flex-col gap-2">
                                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Expiry Date
                                        </Label>
                                        <div className="flex gap-2">
                                            <Select defaultValue="01">
                                                <SelectTrigger className="w-full bg-indigo-50 dark:bg-gray-700 border-indigo-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg">
                                                    <SelectValue placeholder="Month" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white dark:bg-gray-800 border-indigo-300 dark:border-gray-600">
                                                    {Array.from({ length: 12 }, (_, i) => (
                                                        <SelectItem
                                                            key={i}
                                                            value={String(i + 1).padStart(2, '0')}
                                                            className="hover:bg-indigo-100 dark:hover:bg-gray-700"
                                                        >
                                                            {String(i + 1).padStart(2, '0')}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <Select defaultValue="2025">
                                                <SelectTrigger className="w-full bg-indigo-50 dark:bg-gray-700 border-indigo-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg">
                                                    <SelectValue placeholder="Year" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white dark:bg-gray-800 border-indigo-300 dark:border-gray-600">
                                                    {Array.from({ length: 10 }, (_, i) => {
                                                        const year = new Date().getFullYear() + i;
                                                        return (
                                                            <SelectItem
                                                                key={year}
                                                                value={String(year)}
                                                                className="hover:bg-indigo-100 dark:hover:bg-gray-700"
                                                            >
                                                                {year}
                                                            </SelectItem>
                                                        );
                                                    })}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="flex-1 flex flex-col gap-2">
                                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            CVV
                                        </Label>
                                        <Input
                                            placeholder="123"
                                            className="bg-indigo-50 dark:bg-gray-700 border-indigo-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <Button
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white w-full mt-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                            onClick={handleContinue}
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                            ) : (
                                <>
                                    <CheckCircle className="w-5 h-5" />
                                    Continue to Payment
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
