// @/components/BenefitsSection.tsx
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Award, Rocket, Globe, Briefcase } from 'lucide-react';

export default function BenefitsSection() {
    const benefits = [
        {
            title: 'Certified Completion',
            desc: 'Official certificate to boost your resume',
            icon: <Award className="w-12 h-12 text-[#657ED4] dark:text-[#5AD3AF] mx-auto" />,
        },
        {
            title: 'Job-Ready Skills',
            desc: 'Gain practical skills employers value',
            icon: <Rocket className="w-12 h-12 text-[#657ED4] dark:text-[#5AD3AF] mx-auto" />,
        },
        {
            title: 'Lifetime Access',
            desc: 'Revisit course materials anytime',
            icon: <Globe className="w-12 h-12 text-[#657ED4] dark:text-[#5AD3AF] mx-auto" />,
        },
        {
            title: 'Career Support',
            desc: 'Resume building & job recommendations',
            icon: <Briefcase className="w-12 h-12 text-[#657ED4] dark:text-[#5AD3AF] mx-auto" />,
        },
    ];

    return (
        <div>
            <h2 className="text-4xl font-bold text-center mb-12 text-[#657ED4] dark:text-[#5AD3AF]">
                Benefits After Completion
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {benefits.map((item, idx) => (
                    <Card
                        key={idx}
                        className="text-center rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-[#EEF1EF] dark:border-[#657ED4]/30 bg-white dark:bg-gray-800"
                    >
                        <CardHeader>
                            {item.icon}
                            <CardTitle className="text-2xl font-semibold mt-4">
                                {item.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-400 text-xl">{item.desc}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
