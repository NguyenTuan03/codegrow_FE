import * as React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileForm from '@/components/profile-form';

export default function ProfileAdmin() {
    return (
        <div className="py-10 px-6 md:px-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar (Vertical Tabs) */}
                    <div className="w-full md:w-[250px]">
                        <Tabs defaultValue="profile" orientation="vertical" className="space-y-2">
                            <TabsList className="flex md:flex-col w-full justify-start bg-transparent">
                                <TabsTrigger
                                    value="profile"
                                    className="justify-start px-4 py-2 text-gray-600 font-medium rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm hover:bg-gray-100 transition-colors"
                                >
                                    My Profile
                                </TabsTrigger>
                                <TabsTrigger
                                    value="security"
                                    className="justify-start px-4 py-2 text-gray-600 font-medium rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm hover:bg-gray-100 transition-colors"
                                >
                                    Security
                                </TabsTrigger>
                                <TabsTrigger
                                    value="team"
                                    className="justify-start px-4 py-2 text-gray-600 font-medium rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm hover:bg-gray-100 transition-colors"
                                >
                                    Team Member
                                </TabsTrigger>
                                <TabsTrigger
                                    value="notify"
                                    className="justify-start px-4 py-2 text-gray-600 font-medium rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm hover:bg-gray-100 transition-colors"
                                >
                                    Notifications
                                </TabsTrigger>
                                <TabsTrigger
                                    value="billing"
                                    className="justify-start px-4 py-2 text-gray-600 font-medium rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm hover:bg-gray-100 transition-colors"
                                >
                                    Billing
                                </TabsTrigger>
                                <TabsTrigger
                                    value="delete"
                                    className="justify-start px-4 py-2 text-red-500 font-medium rounded-md data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm hover:bg-gray-100 transition-colors"
                                >
                                    Delete Account
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                    <ProfileForm />
                </div>
            </div>
        </div>
    );
}
