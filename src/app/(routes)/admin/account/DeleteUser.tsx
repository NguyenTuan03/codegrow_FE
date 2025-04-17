'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DeleteUser({
    account,
    onDelete,
    onClose,
}: {
    account: { id: string; name: string } | null;
    onDelete: () => void;
    onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Delete Confirmation Card */}
            <Card className="w-[400px] bg-white dark:bg-gray-800 dark:text-white relative z-10 pointer-events-auto rounded-lg shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-red-600 dark:text-red-400">
                        Delete Account
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-700 dark:text-gray-300">
                        Are you sure you want to delete the account for{' '}
                        <strong className="text-gray-900 dark:text-gray-100">
                            {account?.name || 'this user'}
                        </strong>
                        ?
                    </p>
                    <div className="flex justify-end gap-2 mt-6">
                        <Button
                            variant="outline"
                            className="bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="bg-red-500 dark:bg-red-700 text-white hover:bg-red-600 dark:hover:bg-red-600"
                            onClick={onDelete} // Gọi callback onDelete
                        >
                            Delete
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
