'use client';

import { Button } from '@/components/ui/button';
import { useState, FormEvent } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

type Account = {
    _id: string;
    fullName: string;
    email: string;
    role: 'mentor' | 'customer' | 'admin';
    avatar?: string; // Added avatar field to the Account type
};

export default function UpdateUser({
    account,
    onUpdate,
    onClose,
}: {
    account: Account;
    onUpdate: (updatedData: Partial<Account>) => void;
    onClose: () => void;
}) {
    const [formData, setFormData] = useState<Partial<Account>>({
        fullName: account.fullName,
        email: account.email,
        role: account.role,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onUpdate(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm cursor-pointer"
                onClick={onClose}
            />

            {/* Update Form */}
            <form
                onSubmit={handleSubmit}
                className="relative bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-md w-[400px] z-10"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4 cursor-default">Update Account</h2>
                <div className="space-y-6">
                    {/* Avatar Section */}
                    <div className="flex justify-center mb-4">
                        <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-700 shadow-lg">
                            <AvatarImage
                                src={account.avatar || '/default-avatar.png'}
                                alt={`${account.fullName}'s avatar`}
                                className="cursor-default"
                            />
                            <AvatarFallback className="text-2xl font-semibold text-gray-800 dark:text-gray-100 cursor-default">
                                {account.fullName.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    {/* Full Name Field */}
                    <input
                        type="text"
                        value={formData.fullName || ''}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Full Name"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 cursor-text"
                        required
                    />

                    {/* Email Field */}
                    <input
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 cursor-text"
                        required
                    />

                    {/* Role Field */}
                    <div className="space-y-2">
                        <label
                            htmlFor="role-select"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 cursor-default"
                        >
                            Role
                        </label>
                        <select
                            id="role-select"
                            value={formData.role || 'customer'}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    role: e.target.value as 'mentor' | 'customer' | 'admin',
                                })
                            }
                            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white cursor-pointer"
                            required
                        >
                            <option value="mentor">Mentor</option>
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 mt-6">
                    <Button
                        type="button"
                        variant="outline"
                        className="bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="bg-blue-500 dark:bg-blue-700 text-white hover:bg-blue-600 dark:hover:bg-blue-600 cursor-pointer"
                    >
                        Update
                    </Button>
                </div>
            </form>
        </div>
    );
}
