'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function MentorDashboard() {
    return (
        <div className="space-y-8">
            {/* Banner */}
            <Card className="bg-blue-50 border-none shadow-lg">
                <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <img
                            src="https://randomuser.me/api/portraits/women/20.jpg"
                            alt="Instructor"
                            className="h-16 w-16 rounded-full shadow-lg"
                        />
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

            {/* Course Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { title: 'Java 312', instructor: 'Tớ Duy Hương' },
                    { title: 'React JS', instructor: 'Tớ Duy Hương' },
                    { title: 'Node JS', instructor: 'Tớ Duy Hương' },
                ].map((course, index) => (
                    <Card key={index} className="border-none shadow-lg bg-white rounded-xl">
                        <CardHeader className="bg-gray-900 text-white p-6 rounded-t-xl">
                            <CardTitle className="text-xl">{course.title}</CardTitle>
                            <p className="text-sm">{course.instructor}</p>
                        </CardHeader>
                        <CardContent className="p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <img
                                    src="https://randomuser.me/api/portraits/women/30.jpg"
                                    alt="Instructor"
                                    className="h-16 w-16 rounded-full shadow-lg"
                                />
                                <div className="h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center shadow-md">
                                    <span className="text-xl text-gray-600">📊</span>
                                </div>
                                <div className="h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center shadow-md">
                                    <span className="text-xl text-gray-600">📂</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
