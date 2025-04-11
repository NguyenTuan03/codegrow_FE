'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Crown } from 'lucide-react';

const projects = [
    {
        title: 'Build a routing program to help Vancouver commuters',
        description:
            'Use Python data structures and algorithms to help people navigate around Vancouver.',
        isPremium: true,
    },
    {
        title: 'Decrypt Secret Messages',
        description:
            'Practice decrypting intercepted data using the command line to thwart Evil Corp.',
        isPremium: true,
    },
    {
        title: 'Analyze and Visualize Netflix Stock Data',
        description:
            'Act as a "Yahoo Finance" data analyst to generate a stock profile for Netflix.',
        isPremium: true,
    },
    {
        title: 'Analyze Hacker News Trends',
        description: 'Query Hacker News data using SQL to discover trends.',
        isPremium: true,
    },
    {
        title: 'Create a E-Commerce App (Part Two)',
        description:
            'Make a full-stack e-commerce app that lets users register accounts, browse products, and make purchases.',
        isPremium: true,
    },
    {
        title: 'Predict Baseball Strike Zones With Machine Learning',
        description: 'Calculate and visualize MLB player strike zones based on their real data.',
        isPremium: true,
    },
];

export default function ProjectPage() {
    return (
        <section className="px-6 md:px-16 py-12">
            <div className="text-center space-y-2 mb-10">
                <h2 className="text-xl md:text-2xl font-semibold italic">
                    Projects help you build your tech portfolio
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    With a Plus or Pro account, you can work on real-world projects to apply your
                    learning and showcase your skills. Get started with one of our handpicked
                    options.
                </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <Card key={index} className="relative transition shadow-md hover:shadow-lg">
                        {project.isPremium && (
                            <div className="absolute top-3 right-3 z-10">
                                <Badge
                                    variant="secondary"
                                    className="text-yellow-600 bg-yellow-100 flex items-center gap-1"
                                >
                                    <Crown className="w-4 h-4" /> Premium
                                </Badge>
                            </div>
                        )}
                        <CardHeader className="pb-0">
                            <p className="text-sm text-muted-foreground">Practice Project</p>
                            <h3 className="text-lg font-semibold text-blue-800 leading-snug">
                                {project.title}
                            </h3>
                        </CardHeader>
                        <CardContent className="text-sm text-teal-600 pt-2">
                            {project.description}
                        </CardContent>
                        <CardFooter>
                            <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                                Enroll
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div className="flex flex-col items-center mt-12 gap-4">
                <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 text-sm">
                    Developing
                </Button>
                <a href="#" className="text-sm underline text-blue-500">
                    Explore all project
                </a>
            </div>
        </section>
    );
}
