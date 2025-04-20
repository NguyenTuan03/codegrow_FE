'use client';

import * as React from 'react';

import ChangePasswordForm from '@/components/password-change-form';

export default function ChangePasswordPage() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 md:p-12 transform transition-all duration-300 hover:shadow-3xl">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100">
                        Change Password
                    </h1>
                    <p className="text-xl text-gray-700 dark:text-gray-300 mt-4">
                        Update your account password securely
                    </p>
                </div>
                <div className="flex justify-center">
                    <div className="w-full">
                        <ChangePasswordForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
