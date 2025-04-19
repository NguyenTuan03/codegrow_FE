'use client';
import { FEedges, FEnodes } from '@/lib/enum/roadmap/FrontEnd';

import { Background, Controls, ReactFlow } from '@xyflow/react';
import { useParams } from 'next/navigation';
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

const roadmapData = {
    Frontend: {
        nodes: FEnodes,
        edges: FEedges,
        title: 'Frontend Developer',
    },
    Backend: {
        nodes: BENodes,
        edges: BEEdges,
        title: 'Backend Developer',
    },
    React: {
        nodes: ReactNodes,
        edges: ReactEdges,
        title: 'React Developer',
    },
    FullStack: {
        nodes: FSNodes,
        edges: FSEdges,
        title: 'Full Stack Developer',
    },
    Java: {
        nodes: JavaNodes,
        edges: JavaEdges,
        title: 'Java Developer',
    },
    Devops: {
        nodes: DevOpsNodes,
        edges: DevOpsEdges,
        title: 'DevOps Developer',
    },
    Android: {
        nodes: AndroidNodes,
        edges: AndroidEdges,
        title: 'Android Developer',
    },
    QA: {
        nodes: QANodes,
        edges: QAEdges,
        title: 'QA Developer',
    },
    IOS: {
        nodes: IOSNodes,
        edges: IOSEdges,
        title: 'IOS Developer',
    },
    AIDataScientist: {
        nodes: AIDataScientistNodes,
        edges: AIDataScientistEdges,
        title: 'AI and Data Scientist',
    },
};

const Page = () => {
    const params = useParams();
    const slug = params.slug as keyof typeof roadmapData;

    // Lấy dữ liệu roadmap tương ứng hoặc mặc định là frontend
    const currentRoadmap =
        roadmapData[slug] ||
        roadmapData['Frontend'] ||
        roadmapData['FullStack'] ||
        roadmapData['React'] ||
        roadmapData['Java'] ||
        roadmapData['Backend'] ||
        roadmapData['Devops'];

    return (
        <>
            <div className="text-center py-5 text-bold text-2xl">
                {currentRoadmap.title} Roadmap
            </div>
            <div style={{ width: '100%', height: '800px' }}>
                <ReactFlow
                    nodes={currentRoadmap.nodes}
                    edges={currentRoadmap.edges}
                    fitView
                    fitViewOptions={{ padding: 0.4 }}
                    defaultEdgeOptions={{
                        type: 'smoothstep',
                    }}
                    nodeTypes={nodeTypes}
                >
                    <Background color="#f0f0f0" gap={16} />
                    <Controls />
                </ReactFlow>
            </div>
        </>
    );
};

export default Page;
