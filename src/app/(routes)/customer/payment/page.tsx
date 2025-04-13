'use client';

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

export default function PaymentPage() {
    return (
        <div className="min-h-screen p-8 space-y-8">
            <h1 className="text-2xl font-bold mb-4">Verify your student status</h1>

            <div className="grid md:grid-cols-2 gap-10">
                {/* Verify Student Form */}
                <Card className="border rounded-lg shadow-md p-4">
                    <CardHeader className="pb-2">
                        <h2 className="text-lg font-semibold">Verify you are a student</h2>
                        <p className="text-sm text-muted-foreground">
                            at a degree-granting educational institution
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm font-medium">Major</Label>
                            <Input placeholder="Your Major" />
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1 flex flex-col">
                                <Label className="text-sm font-medium">Month</Label>
                                <Input placeholder="e.g. 05" />
                            </div>
                            <div className="flex-1 flex flex-col">
                                <Label className="text-sm font-medium">Year</Label>
                                <Input placeholder="e.g. 2025" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm font-medium">School Email</Label>
                            <Input placeholder="example@school.edu" />
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-2">
                            Verify My Student Status
                        </Button>
                    </CardContent>
                </Card>

                {/* Payment Method */}
                <Card className="border rounded-lg shadow-md p-4">
                    <CardHeader>
                        <h2 className="text-lg font-semibold">Payment Method</h2>
                        <p className="text-sm text-muted-foreground">
                            Add a new payment method to your account.
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Payment Options */}
                        <RadioGroup defaultValue="card" className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="card" id="card" />
                                <Label
                                    htmlFor="card"
                                    className="text-sm font-medium flex items-center gap-2"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 10h18M3 6h18M3 14h18m-6 4h6"
                                        />
                                    </svg>
                                    Card
                                </Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="paypal" id="paypal" />
                                <Label
                                    htmlFor="paypal"
                                    className="text-sm font-medium flex items-center gap-2"
                                >
                                    <Image
                                        src="data:image/png;base64,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"
                                        alt="Momo"
                                        width={24}
                                        height={24}
                                    />
                                    PayPal
                                </Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="applepay" id="applepay" />
                                <Label
                                    htmlFor="applepay"
                                    className="text-sm font-medium flex items-center gap-2"
                                >
                                    <Image
                                        src="data:image/png;base64,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"
                                        alt="VnPay"
                                        width={24}
                                        height={24}
                                    />
                                    Apple Pay
                                </Label>
                            </div>
                        </RadioGroup>

                        <Separator />

                        {/* Card Details Form */}
                        <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <Label className="text-sm font-medium">Name</Label>
                                <Input placeholder="First Last" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label className="text-sm font-medium">City</Label>
                                <Input placeholder="City" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label className="text-sm font-medium">Card Number</Label>
                                <Input placeholder="123 456 789 012" />
                            </div>
                            <div className="flex gap-2">
                                <div className="flex-1 flex flex-col gap-2">
                                    <Label className="text-sm font-medium">Expires</Label>
                                    <div className="flex gap-2">
                                        <Select defaultValue="month">
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Month" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {[...Array(12)].map((_, i) => (
                                                    <SelectItem key={i + 1} value={`${i + 1}`}>
                                                        {String(i + 1).padStart(2, '0')}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Select defaultValue="year">
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {[...Array(10)].map((_, i) => {
                                                    const year = new Date().getFullYear() + i;
                                                    return (
                                                        <SelectItem key={year} value={`${year}`}>
                                                            {year}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col gap-2">
                                    <Label className="text-sm font-medium">CVC</Label>
                                    <Input placeholder="CVC" />
                                </div>
                            </div>
                        </div>

                        <Button className="bg-blue-500 hover:bg-blue-600 text-white w-full mt-4">
                            Continue
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
