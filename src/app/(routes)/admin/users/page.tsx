'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartConfig,
} from '@/components/ui/chart'; // Import ChartConfig
import * as RechartsPrimitive from 'recharts'; // Import recharts components directly

// Sample earnings data
const earningsData = [
    { name: 'Mon', value: 8000 },
    { name: 'Tue', value: 6000 },
    { name: 'Wed', value: 11000 },
    { name: 'Thu', value: 9000 },
    { name: 'Fri', value: 14000 },
    { name: 'Sat', value: 7500 },
    { name: 'Sun', value: 9500 },
];

// Chart configuration for shadcn/ui ChartContainer
const chartConfig = {
    value: {
        label: 'Earnings',
        color: 'hsl(var(--primary))',
    },
} satisfies ChartConfig;

export default function UsersPage() {
    return (
        <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Users</h1>

            {/* Row 1: Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: 'Income Status', value: '$12,145', progress: 60 },
                    { title: "Jonathon's Sales", value: '1576', progress: 49 },
                    { title: 'Payouts', value: '$8947', progress: 18 },
                    { title: 'Available Stores', value: '178', progress: 74 },
                ].map((item, index) => (
                    <Card key={index} className="bg-white dark:bg-gray-800">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {item.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                {item.value}
                            </div>
                            <Progress value={item.progress} className="mt-2" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Row 2: User Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { name: 'Chadengle', email: 'coderthemes@gmail.com' },
                    { name: 'Michael Zenaty', email: 'coderthemes@gmail.com' },
                    { name: 'Stillnotdavid', email: 'coderthemes@gmail.com' },
                    { name: 'Tomaslau', email: 'coderthemes@gmail.com' },
                ].map((user, index) => (
                    <Card key={index} className="bg-white dark:bg-gray-800">
                        <CardContent className="flex items-center gap-4 p-4">
                            <Avatar>
                                <AvatarImage
                                    src={`https://randomuser.me/api/portraits/men/${index + 10}.jpg`}
                                />
                                <AvatarFallback className="text-gray-900 dark:text-gray-100">
                                    {user.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-gray-100">
                                    {user.name}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {user.email}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Row 3: Analytics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: 'Total Revenue', value: '256', badge: '5%' },
                    { title: 'Statistics', value: '8715', badge: '80' },
                    { title: 'Sales Analytics', value: '925', badge: '??' },
                    { title: 'Daily Sales', value: '3541', badge: '2%' },
                ].map((item, index) => (
                    <Card key={index} className="bg-white dark:bg-gray-800">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {item.title}
                                    </p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                        {item.value}
                                    </p>
                                </div>
                                <Badge
                                    variant="outline"
                                    className="text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                >
                                    {item.badge}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Row 4: Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Earnings report */}
                <Card className="col-span-2 bg-white dark:bg-gray-800">
                    <CardHeader>
                        <CardTitle className="text-gray-900 dark:text-gray-100">
                            Earning Reports
                        </CardTitle>
                        <CardDescription className="text-gray-500 dark:text-gray-400">
                            1 Mar - 31 Mar Reporting Data
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between mb-4">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">This Month</p>
                                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                    $120,254
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Last Month</p>
                                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                    $98,741
                                </p>
                            </div>
                        </div>
                        <div className="h-[200px]">
                            <ChartContainer config={chartConfig} className="h-full w-full">
                                <RechartsPrimitive.BarChart data={earningsData}>
                                    <RechartsPrimitive.XAxis
                                        dataKey="name"
                                        tick={{ fill: 'var(--color-text)' }}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <RechartsPrimitive.Bar
                                        dataKey="value"
                                        fill="var(--color-value)"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </RechartsPrimitive.BarChart>
                            </ChartContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Activity feed */}
                <Card className="bg-white dark:bg-gray-800">
                    <CardHeader>
                        <CardTitle className="text-gray-900 dark:text-gray-100">
                            Recent Activities
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-1">
                            <p className="text-gray-900 dark:text-gray-100">You sold an item</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-gray-900 dark:text-gray-100">
                                Robert Delivery: `Are you there?`
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-gray-900 dark:text-gray-100">
                                Audrey Tobey uploaded a photo
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">15 hours ago</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
