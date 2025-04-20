'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function QaqcSettingsPage() {
    const [notifications, setNotifications] = useState(true);
    const [qaqcType, setQaqcType] = useState('random');
    const [approver, setApprover] = useState('');

    const handleSave = () => {
        console.log('Saving QAQC Settings...', {
            notifications,
            qaqcType,
            approver,
        });
        alert('Settings saved successfully!');
    };

    const options = [
        { label: 'Random Check', value: 'random' },
        { label: 'Manual Approval', value: 'manual' },
        { label: 'Full Inspection', value: 'full' },
    ];

    const currentLabel =
        options.find((option) => option.value === qaqcType)?.label ?? 'Select QAQC Mode';

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4 transition-colors duration-300">
            <div className="max-w-2xl mx-auto space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
                    ⚙️ QAQC Settings
                </h2>

                <Card className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    <CardContent className="space-y-6 pt-6">
                        <div className="flex items-center justify-between">
                            <Label className="text-base">Enable Notifications</Label>
                            <Switch checked={notifications} onCheckedChange={setNotifications} />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-base">QAQC Mode</Label>
                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                                    >
                                        {currentLabel}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-full bg-white dark:bg-gray-800">
                                    {options.map((option) => (
                                        <DropdownMenuItem
                                            key={option.value}
                                            onClick={() => setQaqcType(option.value)}
                                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            {option.label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-base">Approver Email</Label>
                            <Input
                                placeholder="approver@example.com"
                                value={approver}
                                onChange={(e) => setApprover(e.target.value)}
                                className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                            />
                        </div>

                        <div className="flex justify-end pt-2">
                            <Button
                                onClick={handleSave}
                                className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
                            >
                                Save Settings
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
