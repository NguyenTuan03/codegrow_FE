// @/components/ContinueWatching.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ContinueWatching() {
    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Continue Watching</h2>
                <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="p-1 h-8 w-8">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="p-1 h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <Card className="shadow-sm border border-gray-200">
                    <div className="h-40 bg-blue-500 relative">
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                            <div className="text-center">
                                <div className="text-xs uppercase mb-1">FRONTEND</div>
                                <div className="font-medium">
                                    Beginners Guide To Becoming A Professional Frontend Developer
                                </div>
                            </div>
                        </div>
                    </div>
                    <CardContent className="p-3">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-1">
                                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                                <div className="w-6 h-6 bg-gray-200 rounded-full -ml-2"></div>
                                <div className="w-6 h-6 bg-gray-200 rounded-full -ml-2"></div>
                                <div className="text-xs text-gray-500 ml-1">+24</div>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Save</span>
                                <span className="text-gray-400">+</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border border-gray-200">
                    <div className="h-40 bg-purple-500 relative">
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                            <div className="text-center">
                                <div className="text-xs uppercase mb-1">BACKEND</div>
                                <div className="font-medium">
                                    Beginners Guide To Becoming A Professional Backend Developer
                                </div>
                            </div>
                        </div>
                    </div>
                    <CardContent className="p-3">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-1">
                                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                                <div className="w-6 h-6 bg-gray-200 rounded-full -ml-2"></div>
                                <div className="text-xs text-gray-500 ml-1">+15</div>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Save</span>
                                <span className="text-gray-400">+</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border border-gray-200">
                    <div className="h-40 bg-yellow-500 relative">
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                            <div className="text-center">
                                <div className="text-xs uppercase mb-1">FRONTEND</div>
                                <div className="font-medium">
                                    How To Create Your Online Course Step 1
                                </div>
                            </div>
                        </div>
                    </div>
                    <CardContent className="p-3">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-1">
                                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                                <div className="w-6 h-6 bg-gray-200 rounded-full -ml-2"></div>
                                <div className="w-6 h-6 bg-gray-200 rounded-full -ml-2"></div>
                                <div className="text-xs text-gray-500 ml-1">+37</div>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Save</span>
                                <span className="text-gray-400">+</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
