'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Award, Briefcase, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
const plans = [
    {
        title: 'Start',
        price: 'Free',
        details: '1 Project',
        icon: <Award className="w-6 h-6 text-blue-500" />,
        variant: 'outline',
    },
    {
        title: 'Basic',
        price: '$19.99',
        details: '5 Users, 20 Projects',
        icon: <Briefcase className="w-6 h-6 text-blue-500" />,
        variant: 'default',
    },
    {
        title: 'Medium',
        price: '$49.99',
        details: '10 Users, 100 Projects',
        icon: <Crown className="w-6 h-6 text-blue-500" />,
        variant: 'default',
    },
    {
        title: 'Expert',
        price: '$129.99',
        details: 'Unlimited Users, Unlimited Projects',
        icon: <Crown className="w-6 h-6 text-blue-500" />,
        variant: 'default',
    },
];

export default function UpgradePage() {
    const router = useRouter();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-gradient-to-r from-blue-50 to-purple-50">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">Pricing Plans</h1>
                <p className="text-lg text-muted-foreground">
                    Choose the right plan to unlock premium courses and features.
                </p>
            </div>

            <Separator className="mb-10" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
                {plans.map((plan, index) => (
                    <Card
                        key={index}
                        className={cn(
                            'rounded-xl border border-gray-200 p-6 shadow-md transition-all hover:shadow-xl',
                        )}
                    >
                        <CardHeader className="flex justify-between items-center pb-3">
                            <div className="flex items-center gap-2">
                                {plan.icon}
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {plan.title}
                                </h2>
                            </div>
                            {plan.variant === 'default' && (
                                <Badge
                                    variant="secondary"
                                    className="text-yellow-600 bg-yellow-100 border border-yellow-200"
                                >
                                    Premium
                                </Badge>
                            )}
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-2xl font-bold text-gray-900">{plan.price}</p>
                            <p className="text-sm text-gray-600">{plan.details}</p>
                        </CardContent>
                        <div className="pt-4">
                            <Button
                                variant={plan.variant === 'outline' ? 'outline' : 'default'}
                                className="w-full bg-rose-400 hover:bg-rose-500 text-white rounded-full py-2 text-sm font-semibold"
                                onClick={() => router.push('/customer/payment')}
                                // ...
                            >
                                Buy Now
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="flex flex-col items-center mt-12 gap-4">
                <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-lg font-semibold rounded-full">
                    Developing
                </Button>
                <a href="#" className="text-lg underline text-blue-500">
                    Explore all projects
                </a>
            </div>
        </div>
    );
}
