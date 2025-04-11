'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

export default function PaymentPage() {
    return (
        <div className="min-h-screen p-8 space-y-8">
            <h1 className="text-2xl font-bold mb-4">Verify your student status</h1>

            <div className="grid md:grid-cols-2 gap-10">
                {/* Verify Student Form */}
                <Card className="border rounded-lg shadow-md p-4">
                    <CardHeader className="pb-2">
                        <h2 className="text-lg font-semibold">Verify you're a student</h2>
                        <p className="text-sm text-muted-foreground">
                            at a degree-granting educational institution
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Lớp, Major, Month/Year, Email */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Major</label>
                            <Input placeholder="Your Major" />
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1 flex flex-col">
                                <label className="text-sm font-medium">Month</label>
                                <Input placeholder="e.g. 05" />
                            </div>
                            <div className="flex-1 flex flex-col">
                                <label className="text-sm font-medium">Year</label>
                                <Input placeholder="e.g. 2025" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">School Email</label>
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
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                id="momo"
                                name="payment"
                                defaultChecked
                                className="mt-[2px]"
                            />
                            <label htmlFor="momo" className="text-sm font-medium">
                                Payment via MoMo
                            </label>
                            <Image
                                src="/momo-logo.png"
                                alt="Momo"
                                width={60}
                                height={30}
                                className="ml-auto"
                            />
                        </div>
                        <Separator />
                        <div className="flex items-center gap-2">
                            <input type="radio" id="vnpay" name="payment" className="mt-[2px]" />
                            <label htmlFor="vnpay" className="text-sm font-medium">
                                Payment via VNPay
                            </label>
                            <Image
                                src="/vnpay-logo.png"
                                alt="VNPay"
                                width={60}
                                height={30}
                                className="ml-auto"
                            />
                        </div>
                        <Separator />
                        <Button className="bg-pink-500 hover:bg-pink-600 text-white w-full mt-4">
                            Confirm Payment
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
