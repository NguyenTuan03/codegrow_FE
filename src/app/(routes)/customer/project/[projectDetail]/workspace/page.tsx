// @/app/(routes)/customer/project/[projectId]/workspace/page.tsx
'use client';

import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, CheckCircle2, FileText, Link, Save, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';

// Static project data (same as in ProjectDetailPage; in a real app, this would be fetched from an API)
const projects = [
    {
        id: '1',
        title: 'Build a routing program to help Vancouver commuters',
        description:
            'Use Python data structures and algorithms to help people navigate around Vancouver.',
        isPremium: true,
        category: 'Python',
        difficulty: 'Intermediate',
        estimatedTime: '10 hours',
        prerequisites: ['Basic Python', 'Data Structures', 'Algorithms'],
        overview: `
            In this project, you will build a routing program to assist Vancouver commuters in navigating the city efficiently. 
            Using Python, you'll implement graph-based algorithms like Dijkstra's to find the shortest paths between locations. 
            The project includes creating a user-friendly interface to input starting points and destinations, and visualizing the routes on a map.
        `,
        objectives: [
            'Understand and implement graph-based algorithms in Python.',
            'Design a user interface for inputting commute details.',
            'Visualize routes using a simple map representation.',
            'Optimize the routing algorithm for performance.',
        ],
        technologies: [
            'Python',
            'Graph Algorithms',
            'Tkinter (for UI)',
            'Matplotlib (for visualization)',
        ],
        tasks: [
            'Set up a Python environment and install necessary libraries.',
            'Create a graph representation of Vancouver’s transit system.',
            'Implement Dijkstra’s algorithm to find the shortest path.',
            'Build a UI with Tkinter for user input.',
            'Visualize the route using Matplotlib.',
        ],
        resources: [
            { name: 'Python Graph Tutorial', url: 'https://example.com/python-graphs' },
            { name: 'Dijkstra’s Algorithm Guide', url: 'https://example.com/dijkstra' },
            { name: 'Tkinter Documentation', url: 'https://example.com/tkinter' },
        ],
    },
    {
        id: '2',
        title: 'Decrypt Secret Messages',
        description:
            'Practice decrypting intercepted data using the command line to thwart Evil Corp.',
        isPremium: true,
        category: 'Cybersecurity',
        difficulty: 'Advanced',
        estimatedTime: '8 hours',
        prerequisites: ['Linux Command Line', 'Cryptography Basics'],
        overview: `
            This project focuses on cybersecurity by challenging you to decrypt secret messages intercepted from a fictional Evil Corp. 
            You'll use command-line tools and cryptographic techniques to decode the messages and reveal their contents.
        `,
        objectives: [
            'Learn to use command-line tools for decryption.',
            'Understand basic cryptographic techniques.',
            'Analyze and decode encrypted messages.',
        ],
        technologies: ['Linux', 'Cryptography', 'Bash Scripting'],
        tasks: [
            'Set up a Linux environment for decryption.',
            'Analyze the encrypted message format.',
            'Use command-line tools to decrypt the message.',
            'Write a script to automate the decryption process.',
        ],
        resources: [
            { name: 'Linux Command Line Basics', url: 'https://example.com/linux-cli' },
            { name: 'Cryptography 101', url: 'https://example.com/cryptography' },
        ],
    },
    // Add other projects as in the previous responses...
];
interface Project {
    id: string;
    title: string;
    description: string;
    isPremium: boolean;
    category: string;
    difficulty: string;
    estimatedTime: string;
    prerequisites: string[];
    overview: string;
    objectives: string[];
    technologies: string[];
    tasks: string[]; // Added tasks property
    resources: { name: string; url: string }[]; // Added resources property
}

export default function WorkspacePage() {
    const router = useRouter();
    const { projectId } = useParams<{ projectId: string }>();
    // Removed unused searchParams variable
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [completedTasks, setCompletedTasks] = useState<boolean[]>([]);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'submitted'>(
        'idle',
    );

    useEffect(() => {
        // Fetch project details based on ID
        if (projectId) {
            const foundProject = projects.find((p) => p.id === projectId);
            if (foundProject) {
                setProject(foundProject);
                // Initialize completed tasks array based on the number of tasks
                setCompletedTasks(new Array(foundProject.tasks.length).fill(false));
            } else {
                // Handle case where project is not found
                router.push('/customer/project');
            }
        } else {
            router.push('/customer/project');
        }
        setLoading(false);
    }, [projectId, router]);

    useEffect(() => {
        // Calculate progress based on completed tasks
        if (project) {
            const totalTasks = project.tasks.length;
            const completedCount = completedTasks.filter(Boolean).length;
            setProgress((completedCount / totalTasks) * 100);
        }
    }, [completedTasks, project]);

    const handleBack = () => {
        // Navigate back to the project detail page with the project ID as a query parameter
        router.push(`/customer/project/detail?id=${projectId}`);
    };

    const toggleTaskCompletion = (index: number) => {
        setCompletedTasks((prev) => {
            const newTasks = [...prev];
            newTasks[index] = !newTasks[index];
            return newTasks;
        });
    };

    const handleSaveProgress = () => {
        // In a real app, this would save progress to a backend
        toast({
            title: 'Progress Saved',
            description: 'Your progress has been saved successfully.',
            variant: 'default',
        });
    };

    const handleSubmitProject = () => {
        setSubmissionStatus('submitting');
        // Simulate submission process
        setTimeout(() => {
            setSubmissionStatus('submitted');
            toast({
                title: 'Project Submitted',
                description: 'Your project has been submitted successfully!',
                variant: 'default',
            });
            // Redirect to project list or a completion page
            setTimeout(() => router.push('/customer/project'), 2000);
        }, 2000);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5AD3AF]"></div>
            </div>
        );
    }

    if (!project) {
        return null; // Redirect will handle this case
    }

    return (
        <div className="min-h-screen bg-[#EEF1EF] dark:bg-gray-900 transition-colors duration-300">
            {/* Header Section */}
            <header className="bg-white dark:bg-gray-800 shadow-md py-6 px-6 md:px-16 sticky top-0 z-10 border-b border-[#EEF1EF] dark:border-[#657ED4]/30">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            onClick={handleBack}
                            className="text-[#657ED4] dark:text-[#5AD3AF] hover:bg-[#EEF1EF] dark:hover:bg-gray-700"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Details
                        </Button>
                        <Badge
                            variant="outline"
                            className="text-xs font-normal text-[#657ED4] dark:text-[#5AD3AF] border-[#657ED4] dark:border-[#5AD3AF]"
                        >
                            {project.category}
                        </Badge>
                    </div>
                    <h1 className="text-xl md:text-2xl font-bold text-[#657ED4] dark:text-[#5AD3AF]">
                        Workspace: {project.title}
                    </h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="px-6 md:px-16 py-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Section: Instructions and Interactive Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Instructions/Tasks Section */}
                        <section>
                            <Tabs defaultValue="instructions" className="w-full">
                                <TabsList className="flex gap-2 mb-6 bg-transparent border-b border-gray-200 dark:border-gray-700">
                                    {['Instructions', 'Tasks'].map((tab, i) => (
                                        <TabsTrigger
                                            key={i}
                                            value={['instructions', 'tasks'][i]}
                                            className="py-3 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-t-lg transition-all data-[state=active]:bg-white data-[state=active]:dark:bg-gray-800 data-[state=active]:text-[#657ED4] data-[state=active]:dark:text-[#5AD3AF] data-[state=active]:shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            {tab}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>

                                <TabsContent value="instructions">
                                    <Card className="border-[#EEF1EF] dark:border-[#657ED4]/30 rounded-2xl shadow-xl">
                                        <CardHeader>
                                            <h2 className="text-xl font-semibold text-[#657ED4] dark:text-[#5AD3AF]">
                                                Project Instructions
                                            </h2>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                                                {project.overview}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="tasks">
                                    <Card className="border-[#EEF1EF] dark:border-[#657ED4]/30 rounded-2xl shadow-xl">
                                        <CardHeader>
                                            <h2 className="text-xl font-semibold text-[#657ED4] dark:text-[#5AD3AF]">
                                                Tasks to Complete
                                            </h2>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-4">
                                                {project.tasks.map(
                                                    (task: string, index: number) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-center gap-3"
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() =>
                                                                    toggleTaskCompletion(index)
                                                                }
                                                                className="p-0"
                                                            >
                                                                <CheckCircle2
                                                                    className={`w-5 h-5 ${
                                                                        completedTasks[index]
                                                                            ? 'text-green-500'
                                                                            : 'text-gray-400'
                                                                    }`}
                                                                />
                                                            </Button>
                                                            <span
                                                                className={`text-gray-700 dark:text-gray-300 ${
                                                                    completedTasks[index]
                                                                        ? 'line-through text-gray-500 dark:text-gray-400'
                                                                        : ''
                                                                }`}
                                                            >
                                                                {task}
                                                            </span>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </section>

                        {/* Interactive Area */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-[#EEF1EF] dark:border-[#657ED4]/30">
                            <h2 className="text-xl font-semibold text-[#657ED4] dark:text-[#5AD3AF] mb-4">
                                Work on Your Project
                            </h2>
                            <div className="space-y-4">
                                {/* Placeholder for a Code Editor */}
                                <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 h-64 flex items-center justify-center">
                                    <p className="text-gray-500 dark:text-gray-400">
                                        [Code Editor Placeholder] - Write your code here
                                    </p>
                                </div>
                                {/* File Upload for Submission */}
                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="outline"
                                        className="text-[#657ED4] dark:text-[#5AD3AF] border-[#657ED4] dark:border-[#5AD3AF] hover:bg-[#EEF1EF] dark:hover:bg-gray-700"
                                    >
                                        <Upload className="w-4 h-4 mr-2" />
                                        Upload File
                                    </Button>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Upload your project files (e.g., .py, .zip)
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Section: Sidebar */}
                    <aside className="lg:col-span-1 space-y-6">
                        {/* Progress Card */}
                        <Card className="border-[#EEF1EF] dark:border-[#657ED4]/30 rounded-2xl shadow-xl sticky top-24">
                            <CardHeader>
                                <h2 className="text-xl font-semibold text-[#657ED4] dark:text-[#5AD3AF]">
                                    Your Progress
                                </h2>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        Completion: {Math.round(progress)}%
                                    </p>
                                    <Progress value={progress} className="h-2" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Tasks Completed: {completedTasks.filter(Boolean).length} /{' '}
                                        {project.tasks.length}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Resources Card */}
                        <Card className="border-[#EEF1EF] dark:border-[#657ED4]/30 rounded-2xl shadow-xl">
                            <CardHeader>
                                <h2 className="text-xl font-semibold text-[#657ED4] dark:text-[#5AD3AF]">
                                    Resources
                                </h2>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {project.resources.map(
                                        (
                                            resource: { name: string; url: string },
                                            index: number,
                                        ) => (
                                            <li key={index}>
                                                <a
                                                    href={resource.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#657ED4] dark:text-[#5AD3AF] hover:underline flex items-center gap-2"
                                                >
                                                    <Link className="w-4 h-4" />
                                                    {resource.name}
                                                </a>
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Submission Card */}
                        <Card className="border-[#EEF1EF] dark:border-[#657ED4]/30 rounded-2xl shadow-xl">
                            <CardHeader>
                                <h2 className="text-xl font-semibold text-[#657ED4] dark:text-[#5AD3AF]">
                                    Submit Your Project
                                </h2>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    onClick={handleSubmitProject}
                                    disabled={submissionStatus !== 'idle' || progress < 100}
                                    className={`w-full rounded-full py-3 text-sm font-semibold flex items-center justify-center gap-2 ${
                                        submissionStatus === 'idle' && progress === 100
                                            ? 'bg-gradient-to-r from-[#5AD3AF] to-[#657ED4] hover:from-[#4AC2A0] hover:to-[#5A6BBE]'
                                            : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                                    } text-white transition-all duration-300`}
                                >
                                    {submissionStatus === 'submitting' ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                    ) : submissionStatus === 'submitted' ? (
                                        <>
                                            <CheckCircle2 className="w-4 h-4" />
                                            Submitted
                                        </>
                                    ) : (
                                        <>
                                            <FileText className="w-4 h-4" />
                                            Submit Project
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </main>

            {/* Sticky Footer Call-to-Action */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg py-4 px-6 md:px-16 border-t border-[#EEF1EF] dark:border-[#657ED4]/30">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <p className="text-gray-700 dark:text-gray-300">
                        Keep working on your project!
                    </p>
                    <div className="flex gap-3">
                        <Button
                            onClick={handleSaveProgress}
                            className="rounded-full py-3 px-6 text-sm font-semibold flex items-center gap-2 bg-gradient-to-r from-[#657ED4] to-[#F76F8E] hover:from-[#5A6BBE] hover:to-[#E56582] text-white transition-all duration-300"
                        >
                            <Save className="w-4 h-4" />
                            Save Progress
                        </Button>
                        <Button
                            onClick={handleSubmitProject}
                            disabled={submissionStatus !== 'idle' || progress < 100}
                            className={`rounded-full py-3 px-6 text-sm font-semibold flex items-center gap-2 ${
                                submissionStatus === 'idle' && progress === 100
                                    ? 'bg-gradient-to-r from-[#5AD3AF] to-[#657ED4] hover:from-[#4AC2A0] hover:to-[#5A6BBE]'
                                    : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                            } text-white transition-all duration-300`}
                        >
                            {submissionStatus === 'submitting' ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                            ) : submissionStatus === 'submitted' ? (
                                <>
                                    <CheckCircle2 className="w-4 h-4" />
                                    Submitted
                                </>
                            ) : (
                                <>
                                    <FileText className="w-4 h-4" />
                                    Submit Project
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </footer>
        </div>
    );
}
