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
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-2xl mx-auto space-y-6">
                <h2 className="text-3xl font-bold text-center">⚙️ QAQC Settings</h2>

                <Card>
                    <CardContent className="space-y-6 pt-6">
                        <div className="flex items-center justify-between">
                            <Label className="text-base">Enable Notifications</Label>
                            <Switch checked={notifications} onCheckedChange={setNotifications} />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-base">QAQC Mode</Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start">
                                        {currentLabel}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-full">
                                    {options.map((option) => (
                                        <DropdownMenuItem
                                            key={option.value}
                                            onClick={() => setQaqcType(option.value)}
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
                            />
                        </div>

                        <div className="flex justify-end pt-2">
                            <Button onClick={handleSave}>Save Settings</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
