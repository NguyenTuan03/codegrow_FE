// pages/user-profile.tsx
'use client';

import React, { useState } from 'react';
import AddUserForm from '@/app/(routes)/admin/adduser/add-form';
import ConfirmForm from '@/app/(routes)/admin/adduser/confirm-form';
import { FormData } from '@/app/(routes)/admin/adduser/add-form';

export default function UserProfile() {
    const [step, setStep] = useState(1); // 1 for Profile, 2 for Confirmation
    const [formData, setFormData] = useState<FormData | null>(null);

    const handleNext = (data: FormData) => {
        setFormData(data);
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb Navigation */}
                <nav className="flex items-center mb-6 text-sm text-gray-500">
                    <a href="#" className="hover:text-indigo-600 transition-colors">
                        Pages
                    </a>
                    <span className="mx-2">/</span>
                    <a href="#" className="hover:text-indigo-600 transition-colors">
                        Users
                    </a>
                    <span className="mx-2">/</span>
                    <span className="text-indigo-600 font-medium">Add User</span>
                </nav>

                {/* Page Title and Actions */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Add New User</h1>
                        <p className="text-gray-500 mt-1">
                            {step === 1
                                ? 'Fill in the user details'
                                : 'Review and confirm the information'}
                        </p>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Step Indicators */}
                    <div className="flex items-center justify-center p-6 border-b border-gray-100">
                        <div className="flex items-center w-full max-w-md">
                            {/* Step 1 Indicator */}
                            <div className="flex items-center flex-1">
                                <div
                                    className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center 
                                    ${step === 1 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'} 
                                    transition-colors duration-300`}
                                >
                                    <span className="font-medium text-sm">1</span>
                                </div>
                                <div
                                    className={`ml-2 text-sm font-medium ${step === 1 ? 'text-indigo-600' : 'text-gray-500'}`}
                                >
                                    Profile
                                </div>
                                <div
                                    className={`flex-1 h-px mx-4 ${step === 2 ? 'bg-indigo-600' : 'bg-gray-200'} transition-colors duration-300`}
                                ></div>
                            </div>

                            {/* Step 2 Indicator */}
                            <div className="flex items-center flex-shrink-0">
                                <div
                                    className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center 
                                    ${step === 2 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'} 
                                    transition-colors duration-300`}
                                >
                                    <span className="font-medium text-sm">2</span>
                                </div>
                                <div
                                    className={`ml-2 text-sm font-medium ${step === 2 ? 'text-indigo-600' : 'text-gray-500'}`}
                                >
                                    Confirmation
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="p-6 md:p-8">
                        {step === 1 ? (
                            <AddUserForm onNext={handleNext} />
                        ) : (
                            <ConfirmForm formData={formData} onBack={handleBack} />
                        )}
                    </div>
                </div>

                {/* Footer Note */}
                <p className="text-center text-gray-400 text-xs mt-6">
                    All user information will be securely stored and processed according to our
                    privacy policy.
                </p>
            </div>
        </div>
    );
}
