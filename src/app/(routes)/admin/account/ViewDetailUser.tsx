'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function ViewDetailUser({
    account,
    onClose,
}: {
    account: {
        fullName: string;
        email: string;
        role: string;
        wallet: number;
        isVerified: boolean;
        createdAt: string;
        updatedAt: string;
        avatar?: string;
    };
    onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Detail Card */}
            <Card className="w-[400px] bg-white dark:bg-gray-800 dark:text-white relative z-10 pointer-events-auto rounded-lg shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Account Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {/* Avatar */}
                        <div className="flex justify-center">
                            <Avatar className="w-24 h-24">
                                <AvatarImage
                                    src={account.avatar}
                                    alt={`${account.fullName}'s avatar`}
                                />
                                <AvatarFallback>{account.fullName.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </div>

                        {/* Full Name */}
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Name
                            </p>
                            <p className="text-base font-semibold text-gray-800 dark:text-gray-100">
                                {account.fullName}
                            </p>
                        </div>

                        {/* Email */}
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Email
                            </p>
                            <p className="text-base font-semibold text-gray-800 dark:text-gray-100">
                                {account.email}
                            </p>
                        </div>

                        {/* Role */}
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Role
                            </p>
                            <p
                                className={`text-base font-semibold ${
                                    account.role === 'mentor'
                                        ? 'text-blue-800 dark:text-blue-400'
                                        : account.role === 'customer'
                                          ? 'text-green-800 dark:text-green-400'
                                          : 'text-yellow-800 dark:text-yellow-400'
                                }`}
                            >
                                {account.role}
                            </p>
                        </div>

                        {/* Wallet */}
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Wallet
                            </p>
                            <p className="text-base font-semibold text-gray-800 dark:text-gray-100">
                                ${account.wallet}
                            </p>
                        </div>

                        {/* Created At */}
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Created At
                            </p>
                            <p className="text-base font-semibold text-gray-800 dark:text-gray-100">
                                {new Date(account.createdAt).toLocaleString()}
                            </p>
                        </div>

                        {/* Updated At */}
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Updated At
                            </p>
                            <p className="text-base font-semibold text-gray-800 dark:text-gray-100">
                                {new Date(account.updatedAt).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* Close Button */}
                    <div className="flex justify-end gap-2 mt-6">
                        <Button
                            variant="outline"
                            className="bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                            onClick={onClose}
                        >
                            Close
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
