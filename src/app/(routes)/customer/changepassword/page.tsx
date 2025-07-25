'use client';

import * as React from 'react';

import ChangePasswordForm from '@/components/password-change-form';

export default function ChangePasswordPage() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-300">
            <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 md:p-12 transform transition-all duration-300 hover:shadow-2xl border border-gray-200 dark:border-gray-700">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[#657ED4] dark:text-[#5AD3AF]">
                        Change Password
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mt-4 font-medium">
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
