'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Classes from './classes/page';
// import Image from 'next/image';

export default function MentorDashboard() {
    return (
        <div className="space-y-8 p-6">
            {/* Banner */}
            <Card className="bg-blue-100 border-none shadow-lg">
                <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div>
                            <p className="font-semibold text-gray-900 text-2xl">
                                Introducing generative AI for educators
                            </p>
                            <p className="text-lg text-gray-600">
                                A new, no-cost online course for K-12 educators. Save time and
                                enhance lesson planning with generative AI.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="link" className="text-blue-600 text-lg">
                            Learn more
                        </Button>
                        <Button variant="link" className="text-blue-600 text-lg">
                            Get started
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-600">
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <Classes />
        </div>
    );
}
