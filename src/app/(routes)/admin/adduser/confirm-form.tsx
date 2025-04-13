// components/confirm-form.tsx

import { CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FormData } from './add-form';
import { CheckCircle2 } from 'lucide-react';

interface ConfirmFormProps {
    formData: FormData | null;
    onBack: () => void;
}

export default function ConfirmForm({ formData, onBack }: ConfirmFormProps) {
    const handleConfirm = () => {
        console.log('User confirmed:', formData);
        // Handle final submission logic here (e.g., API call)
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
                <h2 className="text-2xl font-bold text-gray-800">Review User Details</h2>
                <p className="text-gray-500">Please confirm the information before submitting</p>
            </div>

            <CardContent className="p-6 space-y-6">
                {/* User Summary Card */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    {/* Avatar and Name */}
                    <div className="flex items-center gap-4 mb-6">
                        <Avatar className="h-16 w-16 border-2 border-indigo-100">
                            <AvatarImage src={formData?.avatar || ''} />
                            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xl font-medium">
                                {formData?.firstName?.charAt(0)}
                                {formData?.lastName?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">
                                {formData?.firstName} {formData?.lastName}
                            </h3>
                            <p className="text-indigo-600 font-medium capitalize">
                                {formData?.accountType}
                            </p>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Email */}
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Email</p>
                            <p className="text-gray-800">{formData?.email}</p>
                        </div>

                        {/* Phone */}
                        {formData?.phone && (
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">
                                    Phone {formData?.phoneType && `(${formData.phoneType})`}
                                </p>
                                <p className="text-gray-800">{formData.phone}</p>
                            </div>
                        )}

                        {/* Organization */}
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Organization</p>
                            <p className="text-gray-800">{formData?.organization}</p>
                        </div>

                        {/* Department */}
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Department</p>
                            <p className="text-gray-800">{formData?.department}</p>
                        </div>
                    </div>
                </div>

                {/* Verification Note */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-start gap-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <p className="text-sm text-blue-700">
                            By confirming, you agree that all provided information is accurate and
                            complete. This action will create a new user account in the system.
                        </p>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 px-6 pb-6 pt-0 border-t-0">
                <Button
                    type="button"
                    variant="outline"
                    className="h-12 px-6 w-full sm:w-auto border-gray-300 text-gray-600 hover:bg-gray-50"
                    onClick={onBack}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Back to Edit
                </Button>
                <Button
                    type="button"
                    className="h-12 px-8 w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-sm text-white font-medium"
                    onClick={handleConfirm}
                >
                    Confirm and Create User
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Button>
            </CardFooter>
        </div>
    );
}
