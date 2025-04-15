import * as React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileForm from '@/components/profile-form';

export default function ProfileMentor() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6 md:p-10">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar (Vertical Tabs) */}
                    <div className="w-full md:w-[250px]">
                        <Tabs defaultValue="profile" orientation="vertical" className="space-y-2">
                            <TabsList className="flex md:flex-col w-full justify-start bg-gray-100 rounded-lg shadow-md p-2">
                                <TabsTrigger
                                    value="profile"
                                    className="flex items-center gap-2 px-4 py-3 text-gray-600 font-medium rounded-md data-[state=active]:bg-blue-50 data-[state=active]:text-blue-800 data-[state=active]:shadow-sm hover:bg-gray-200 transition-all"
                                >
                                    <span className="material-icons">My Profile</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="security"
                                    className="flex items-center gap-2 px-4 py-3 text-gray-600 font-medium rounded-md data-[state=active]:bg-blue-50 data-[state=active]:text-blue-800 data-[state=active]:shadow-sm hover:bg-gray-200 transition-all"
                                >
                                    <span className="material-icons">Security</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="billing"
                                    className="flex items-center gap-2 px-4 py-3 text-gray-600 font-medium rounded-md data-[state=active]:bg-blue-50 data-[state=active]:text-blue-800 data-[state=active]:shadow-sm hover:bg-gray-200 transition-all"
                                >
                                    <span className="material-icons">Billing</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="delete"
                                    className="flex items-center gap-2 px-4 py-3 text-red-500 font-medium rounded-md data-[state=active]:bg-red-50 data-[state=active]:text-red-600 data-[state=active]:shadow-sm hover:bg-red-100 transition-all"
                                >
                                    <span className="material-icons">Delete Account</span>
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                    {/* Profile Form */}
                    <ProfileForm />
                </div>
            </div>
        </div>
    );
}
