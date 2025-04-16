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
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

            {/* Delete Confirmation Card */}
            <Card className="w-[400px] bg-white relative z-10 pointer-events-auto">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-red-600">Delete Account</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-700">
                        Are you sure you want to delete the account for{' '}
                        <strong className="text-gray-900">{account?.name || 'this user'}</strong>?
                    </p>
                    <div className="flex justify-end gap-2 mt-6">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            className="bg-red-500 text-white hover:bg-red-600"
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
