'use client';

import { FEedges, FEnodes } from '@/lib/enum/roadmap/FrontEnd';
import { Background, Controls, ReactFlow } from '@xyflow/react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from '@/lib/components/nodes/CustomsNode';
import { BEEdges, BENodes } from '@/lib/enum/roadmap/BackEnd';
import { ReactEdges, ReactNodes } from '@/lib/enum/roadmap/React';
import { FSEdges, FSNodes } from '@/lib/enum/roadmap/FullStack';
import { JavaEdges, JavaNodes } from '@/lib/enum/roadmap/Java';
import { DevOpsEdges, DevOpsNodes } from '@/lib/enum/roadmap/Devops';
import { AndroidEdges, AndroidNodes } from '@/lib/enum/roadmap/Android';
import { QAEdges, QANodes } from '@/lib/enum/roadmap/QA';
import { IOSEdges, IOSNodes } from '@/lib/enum/roadmap/IOS';
import { AIDataScientistEdges, AIDataScientistNodes } from '@/lib/enum/roadmap/AIDataScientist';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PostgreSQLEdges, PostgreSQLNodes } from '@/lib/enum/roadmap/PostgreSQL';
import { CybersecurityEdges, CybersecurityNodes } from '@/lib/enum/roadmap/CyberSecurity';
import { ProductManagerEdges, ProductManagerNodes } from '@/lib/enum/roadmap/ProductManager';
import { MLOpsEdges, MLOpsNodes } from '@/lib/enum/roadmap/MLOps';
import { BlockchainEdges, BlockchainNodes } from '@/lib/enum/roadmap/BlockChain';
import { TechnicalWriterEdges, TechnicalWriterNodes } from '@/lib/enum/roadmap/TechnicalWriter';
import { UIDesignEdges, UIDesignNodes } from '@/lib/enum/roadmap/UIDesign';
import {
    DeveloperRelationsEdges,
    DeveloperRelationsNodes,
} from '@/lib/enum/roadmap/DeveloperRelations';

const roadmapData = {
    Frontend: {
        nodes: FEnodes,
        edges: FEedges,
        title: 'Frontend Developer',
        description: 'Master the art of building interactive and responsive user interfaces.',
    },
    Backend: {
        nodes: BENodes,
        edges: BEEdges,
        title: 'Backend Developer',
        description: 'Learn to build robust server-side applications and APIs.',
    },
    React: {
        nodes: ReactNodes,
        edges: ReactEdges,
        title: 'React Developer',
        description: 'Become an expert in building modern web applications with React.',
    },
    FullStack: {
        nodes: FSNodes,
        edges: FSEdges,
        title: 'Full Stack Developer',
        description: 'Gain expertise in both frontend and backend development.',
    },
    Java: {
        nodes: JavaNodes,
        edges: JavaEdges,
        title: 'Java Developer',
        description: 'Dive deep into Java programming for enterprise applications.',
    },
    Devops: {
        nodes: DevOpsNodes,
        edges: DevOpsEdges,
        title: 'DevOps Developer',
        description: 'Master the tools and practices for efficient software deployment.',
    },
    Android: {
        nodes: AndroidNodes,
        edges: AndroidEdges,
        title: 'Android Developer',
        description: 'Build powerful mobile applications for Android devices.',
    },
    QA: {
        nodes: QANodes,
        edges: QAEdges,
        title: 'QA Developer',
        description: 'Ensure software quality through testing and automation.',
    },
    IOS: {
        nodes: IOSNodes,
        edges: IOSEdges,
        title: 'IOS Developer',
        description: 'Develop apps for Apple devices with Swift and iOS frameworks.',
    },
    AIDataScientist: {
        nodes: AIDataScientistNodes,
        edges: AIDataScientistEdges,
        title: 'AI and Data Scientist',
        description: 'Explore machine learning and data analysis techniques.',
    },
    GameDevloper: {
        nodes: AIDataScientistNodes,
        edges: AIDataScientistEdges,
        title: 'AI and Data Scientist',
        description: 'Explore machine learning and data analysis techniques.',
    },
    PostgreSQL: {
        nodes: PostgreSQLNodes,
        edges: PostgreSQLEdges,
        title: 'PostgreSQL Developer',
        description: 'Learn the basics of PostgreSQL and how to use it for database management.',
    },
    CyberSecurity: {
        nodes: CybersecurityNodes,
        edges: CybersecurityEdges,
        title: 'Cyber Security',
        description: 'Learn about cybersecurity and how to protect your systems and data.',
    },
    MLOps: {
        nodes: MLOpsNodes,
        edges: MLOpsEdges,
        title: 'MLOps',
        description: 'Learn about MLOps and how to deploy and manage machine learning models.',
    },
    ProductManager: {
        nodes: ProductManagerNodes,
        edges: ProductManagerEdges,
        title: 'Product Manager',
        description: 'Learn about product management and how to create successful products.',
    },
    BlockChain: {
        nodes: BlockchainNodes,
        edges: BlockchainEdges,
        title: 'Blockchain Developer',
        description:
            'Learn about blockchain technology and how to build decentralized applications.',
    },
    TechnicalWriter: {
        nodes: TechnicalWriterNodes,
        edges: TechnicalWriterEdges,
        title: 'Technical Writer',
        description: 'Learn about technical writing and how to communicate effectively.',
    },
    UIDesign: {
        nodes: UIDesignNodes,
        edges: UIDesignEdges,
        title: 'UI Designer',
        description:
            'Learn about user interface design and how to create visually appealing interfaces.',
    },
    DeveloperRelations: {
        nodes: DeveloperRelationsNodes,
        edges: DeveloperRelationsEdges,
        title: 'Developer Relations',
        description: 'Learn about community building and how to engage with developers.',
    },
};

const Page = () => {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as keyof typeof roadmapData;

    // Get the roadmap data or default to Frontend
    const currentRoadmap =
        roadmapData[slug] ||
        roadmapData['Frontend'] ||
        roadmapData['FullStack'] ||
        roadmapData['React'] ||
        roadmapData['Java'] ||
        roadmapData['Backend'] ||
        roadmapData['Devops'];

    const handleBackClick = () => {
        router.push('/customer/roadmap');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            {/* Header Section */}
            <div className="bg-white dark:bg-gray-800 shadow-md py-8 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto">
                    <Button
                        variant="outline"
                        className="mb-6 flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                        onClick={handleBackClick}
                        aria-label="Back to roadmaps"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Roadmaps
                    </Button>
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            {currentRoadmap.title} Roadmap
                        </h1>
                        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            {currentRoadmap.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* React Flow Diagram */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
                <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div style={{ width: '100%', height: '90vh' }}>
                        <ReactFlow
                            nodes={currentRoadmap.nodes}
                            edges={currentRoadmap.edges}
                            fitView
                            fitViewOptions={{ padding: 0.4 }}
                            defaultEdgeOptions={{
                                type: 'smoothstep',
                                style: {
                                    stroke: '#2e90fa',
                                    strokeWidth: 2,
                                },
                            }}
                            nodeTypes={nodeTypes}
                        >
                            <Background
                                color="#f0f0f0"
                                gap={16}
                                className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
                            />
                            <Controls className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700" />
                        </ReactFlow>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
