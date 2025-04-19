// lib/enum/roadmap/QA.ts
import { Edge, Node } from '@xyflow/react';

type CustomNodeData = {
    label: string;
    category?: string;
    recommendation?: 'essential' | 'important' | 'optional';
};

export const QANodes: Node<Partial<CustomNodeData>>[] = [
    // Main QA Node
    {
        id: 'qa-engineer',
        position: { x: 400, y: 50 },
        data: {
            label: 'QA Engineer',
            category: 'main',
            recommendation: 'essential',
        },
        style: {
            background: '#4f46e5',
            color: '#fff',
            padding: 10,
            borderRadius: 12,
            border: '2px solid #000',
            fontWeight: 'bold',
            boxShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            textAlign: 'center',
            width: 180,
        },
    },

    // QA Fundamentals
    {
        id: 'qa-fundamentals',
        position: { x: 200, y: 150 },
        data: {
            label: 'QA Fundamentals',
            category: 'foundation',
            recommendation: 'essential',
        },
        style: {
            background: '#6366f1',
            color: '#fff',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 180,
            textAlign: 'center',
        },
    },
    {
        id: 'tester-mindset',
        position: { x: 50, y: 200 },
        data: {
            label: 'Tester Mindset',
            category: 'foundation',
            recommendation: 'essential',
        },
        style: {
            background: '#818cf8',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 150,
            textAlign: 'center',
        },
    },
    {
        id: 'testing-approaches',
        position: { x: 50, y: 250 },
        data: {
            label: 'Testing Approaches',
            category: 'foundation',
            recommendation: 'essential',
        },
        style: {
            background: '#a5b4fc',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 180,
            textAlign: 'center',
        },
    },
    {
        id: 'white-box',
        position: { x: 50, y: 300 },
        data: {
            label: 'White Box Testing',
            category: 'technique',
            recommendation: 'important',
        },
        style: {
            background: '#c7d2fe',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 150,
            textAlign: 'center',
        },
    },
    {
        id: 'black-box',
        position: { x: 50, y: 350 },
        data: {
            label: 'Black Box Testing',
            category: 'technique',
            recommendation: 'important',
        },
        style: {
            background: '#c7d2fe',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 150,
            textAlign: 'center',
        },
    },

    // Test Process
    {
        id: 'test-process',
        position: { x: 400, y: 150 },
        data: {
            label: 'Test Process',
            category: 'process',
            recommendation: 'essential',
        },
        style: {
            background: '#10b981',
            color: '#fff',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 180,
            textAlign: 'center',
        },
    },
    {
        id: 'test-planning',
        position: { x: 300, y: 200 },
        data: {
            label: 'Test Planning',
            category: 'process',
            recommendation: 'essential',
        },
        style: {
            background: '#34d399',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 150,
            textAlign: 'center',
        },
    },
    {
        id: 'test-cases',
        position: { x: 500, y: 200 },
        data: {
            label: 'Test Cases',
            category: 'process',
            recommendation: 'essential',
        },
        style: {
            background: '#34d399',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 150,
            textAlign: 'center',
        },
    },
    {
        id: 'test-automation',
        position: { x: 400, y: 250 },
        data: {
            label: 'Test Automation',
            category: 'process',
            recommendation: 'important',
        },
        style: {
            background: '#6ee7b7',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 180,
            textAlign: 'center',
        },
    },

    // Automation Tools
    {
        id: 'automation-tools',
        position: { x: 600, y: 150 },
        data: {
            label: 'Automation Tools',
            category: 'tools',
            recommendation: 'important',
        },
        style: {
            background: '#f59e0b',
            color: '#fff',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 180,
            textAlign: 'center',
        },
    },
    {
        id: 'selenium',
        position: { x: 550, y: 200 },
        data: {
            label: 'Selenium',
            category: 'tools',
            recommendation: 'essential',
        },
        style: {
            background: '#fbbf24',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 150,
            textAlign: 'center',
        },
    },
    {
        id: 'cypress',
        position: { x: 550, y: 250 },
        data: {
            label: 'Cypress',
            category: 'tools',
            recommendation: 'important',
        },
        style: {
            background: '#fcd34d',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 150,
            textAlign: 'center',
        },
    },
    {
        id: 'postman',
        position: { x: 550, y: 300 },
        data: {
            label: 'Postman/Newman',
            category: 'tools',
            recommendation: 'important',
        },
        style: {
            background: '#fcd34d',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 150,
            textAlign: 'center',
        },
    },

    // CI/CD
    {
        id: 'ci-cd',
        position: { x: 750, y: 150 },
        data: {
            label: 'CI/CD Pipelines',
            category: 'devops',
            recommendation: 'important',
        },
        style: {
            background: '#8b5cf6',
            color: '#fff',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 180,
            textAlign: 'center',
        },
    },
    {
        id: 'jenkins',
        position: { x: 700, y: 200 },
        data: {
            label: 'Jenkins',
            category: 'devops',
            recommendation: 'important',
        },
        style: {
            background: '#a78bfa',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 150,
            textAlign: 'center',
        },
    },
    {
        id: 'github-actions',
        position: { x: 700, y: 250 },
        data: {
            label: 'GitHub Actions',
            category: 'devops',
            recommendation: 'important',
        },
        style: {
            background: '#a78bfa',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 150,
            textAlign: 'center',
        },
    },

    // External Resources
    {
        id: 'qa-resources',
        position: { x: 400, y: 400 },
        data: {
            label: 'QA Resources',
            category: 'resources',
        },
        style: {
            background: '#ec4899',
            color: '#fff',
            border: '2px dashed #000',
            borderRadius: 12,
            padding: 10,
            width: 180,
            textAlign: 'center',
        },
    },
];

export const QAEdges: Edge[] = [
    // Main connections from QA Engineer
    {
        id: 'qa-fundamentals',
        source: 'qa-engineer',
        target: 'qa-fundamentals',
        type: 'smoothstep',
    },
    {
        id: 'qa-test-process',
        source: 'qa-engineer',
        target: 'test-process',
        type: 'smoothstep',
    },
    {
        id: 'qa-automation-tools',
        source: 'qa-engineer',
        target: 'automation-tools',
        type: 'smoothstep',
    },
    {
        id: 'qa-ci-cd',
        source: 'qa-engineer',
        target: 'ci-cd',
        type: 'smoothstep',
    },

    // QA Fundamentals connections
    {
        id: 'fundamentals-mindset',
        source: 'qa-fundamentals',
        target: 'tester-mindset',
        type: 'smoothstep',
    },
    {
        id: 'mindset-approaches',
        source: 'tester-mindset',
        target: 'testing-approaches',
        type: 'smoothstep',
    },
    {
        id: 'approaches-whitebox',
        source: 'testing-approaches',
        target: 'white-box',
        type: 'smoothstep',
    },
    {
        id: 'approaches-blackbox',
        source: 'testing-approaches',
        target: 'black-box',
        type: 'smoothstep',
    },

    // Test Process connections
    {
        id: 'process-planning',
        source: 'test-process',
        target: 'test-planning',
        type: 'smoothstep',
    },
    {
        id: 'process-cases',
        source: 'test-process',
        target: 'test-cases',
        type: 'smoothstep',
    },
    {
        id: 'process-automation',
        source: 'test-process',
        target: 'test-automation',
        type: 'smoothstep',
    },

    // Automation Tools connections
    {
        id: 'tools-selenium',
        source: 'automation-tools',
        target: 'selenium',
        type: 'smoothstep',
    },
    {
        id: 'tools-cypress',
        source: 'automation-tools',
        target: 'cypress',
        type: 'smoothstep',
    },
    {
        id: 'tools-postman',
        source: 'automation-tools',
        target: 'postman',
        type: 'smoothstep',
    },

    // CI/CD connections
    {
        id: 'ci-jenkins',
        source: 'ci-cd',
        target: 'jenkins',
        type: 'smoothstep',
    },
    {
        id: 'ci-github-actions',
        source: 'ci-cd',
        target: 'github-actions',
        type: 'smoothstep',
    },

    // External Resources
    {
        id: 'qa-resources-link',
        source: 'qa-engineer',
        target: 'qa-resources',
        type: 'smoothstep',
        style: { strokeDasharray: '5,5' },
    },
];
