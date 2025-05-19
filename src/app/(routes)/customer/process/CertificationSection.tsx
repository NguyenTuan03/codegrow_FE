// @/app/(routes)/customer/process/CertificationSection.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, Award } from 'lucide-react';

export default function CertificationSection() {
    return (
        <section>
            <div className="flex items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Award className="w-6 h-6 text-[#5AD3AF]" />
                    Certification
                </h2>
                <ChevronRight className="h-5 w-5 ml-1 text-gray-400" />
            </div>

            <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-xl hover:border-[#5AD3AF]">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 flex items-center justify-center rounded-md">
                                <Award className="h-8 w-8 text-[#5AD3AF]" />
                            </div>
                            <div>
                                <div className="font-semibold text-gray-800 dark:text-gray-200">
                                    You are missing out!
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Improve your chances of getting hired with an
                                    industry-recognized DataComp Certification.
                                </div>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            className="text-sm border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-[#5AD3AF] hover:text-white dark:hover:bg-[#5AD3AF] dark:hover:text-white rounded-full flex items-center gap-1 transition-all duration-200"
                        >
                            See All
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                        <Badge
                            variant="outline"
                            className="py-1 px-3 text-xs text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 rounded-full flex items-center gap-1"
                        >
                            <Award className="h-4 w-4 text-[#5AD3AF]" />
                            AI Engineer for Data Science
                        </Badge>
                        <Badge
                            variant="outline"
                            className="py-1 px-3 text-xs text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 rounded-full flex items-center gap-1"
                        >
                            <Award className="h-4 w-4 text-[#5AD3AF]" />
                            SQL Associate
                        </Badge>
                        <Badge
                            variant="outline"
                            className="py-1 px-3 text-xs text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 rounded-full flex items-center gap-1"
                        >
                            <Award className="h-4 w-4 text-[#5AD3AF]" />
                            Data Analyst Associate
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
