import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MyProfileForm from '@/app/(routes)/customer/profile/profile-form';

export default function AccountSettingsPage() {
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

                    {/* Main Content */}
                    <div className="flex-1">
                        <Tabs defaultValue="profile" orientation="vertical">
                            {/* Profile Tab */}
                            <TabsContent value="profile" className="space-y-6">
                                <Card className="border rounded-lg shadow-sm bg-white">
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold text-gray-900">
                                            My Profile
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <MyProfileForm />
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Security Tab */}
                            <TabsContent value="security">
                                <Card className="border rounded-lg shadow-sm bg-white">
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold text-gray-900">
                                            Security
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600">[Security Settings Here]</p>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Team Tab */}
                            <TabsContent value="team">
                                <Card className="border rounded-lg shadow-sm bg-white">
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold text-gray-900">
                                            Team Member
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600">[Team Member Settings Here]</p>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Notifications Tab */}
                            <TabsContent value="notify">
                                <Card className="border rounded-lg shadow-sm bg-white">
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold text-gray-900">
                                            Notifications
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600">
                                            [Notification Settings Here]
                                        </p>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Billing Tab */}
                            <TabsContent value="billing">
                                <Card className="border rounded-lg shadow-sm bg-white">
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold text-gray-900">
                                            Billing
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600">[Billing Settings Here]</p>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Delete Tab */}
                            <TabsContent value="delete">
                                <Card className="border rounded-lg shadow-sm bg-white">
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold text-red-600">
                                            Delete Account
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-red-600">
                                            [Delete Account Confirmation]
                                        </p>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}
