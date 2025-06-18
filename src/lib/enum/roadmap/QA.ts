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
        position: { x: 600, y: 50 }, // Shifted to center for wider layout
        data: {
            label: 'QA Engineer',
            category: 'main',
            recommendation: 'essential',
        },
        style: {
            background: 'linear-gradient(135deg, #5AD3AF 0%, #4ac2a0 100%)', // Updated to app theme gradient
            padding: 15,
            borderRadius: 16,
            border: '2px solid #2e90fa',
            fontWeight: 'bold',
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
            textAlign: 'center',
            color: '#fff',
            width: 200,
            fontSize: 16,
            transition: 'transform 0.2s ease-in-out',
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
            background: '#e6f7fa',
            border: '2px solid #2e90fa',
            borderRadius: 12,
            padding: 12,
            width: 260,
            textAlign: 'center',
            fontSize: 14,
            color: '#1a202c',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease-in-out',
        },
    },
    {
        id: 'tester-mindset',
        position: { x: 100, y: 250 },
        data: {
            label: 'Tester Mindset',
            category: 'foundation',
            recommendation: 'essential',
        },
        style: {
            background: '#e6f7fa',
            border: '2px solid #2e90fa',
            borderRadius: 12,
            padding: 12,
            width: 260,
            textAlign: 'center',
            fontSize: 14,
            color: '#1a202c',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease-in-out',
        },
    },
    {
        id: 'testing-approaches',
        position: { x: 100, y: 350 },
        data: {
            label: 'Testing Approaches',
            category: 'foundation',
            recommendation: 'essential',
        },
        style: {
            background: '#e6f7fa',
            border: '2px solid #2e90fa',
            borderRadius: 12,
            padding: 12,
            width: 260,
            textAlign: 'center',
            fontSize: 14,
            color: '#1a202c',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease-in-out',
        },
    },
    {
        id: 'white-box',
        position: { x: -150, y: 450 },
        data: {
            label: 'White Box Testing',
            category: 'technique',
            recommendation: 'important',
        },
        style: {
            background: '#e6f7fa',
            border: '2px solid #2e90fa',
            borderRadius: 12,
            padding: 12,
            width: 260,
            textAlign: 'center',
            fontSize: 14,
            color: '#1a202c',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease-in-out',
        },
    },
    {
        id: 'black-box',
        position: { x: 150, y: 450 },
        data: {
            label: 'Black Box Testing',
            category: 'technique',
            recommendation: 'important',
        },
        style: {
            background: '#e6f7fa',
            border: '2px solid #2e90fa',
            borderRadius: 12,
            padding: 12,
            width: 260,
            textAlign: 'center',
            fontSize: 14,
            color: '#1a202c',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease-in-out',
        },
    },

    // Test Process
    {
        id: 'test-process',
        position: { x: 600, y: 200 },
        data: {
            label: 'Test Process',
            category: 'process',
            recommendation: 'essential',
        },
        style: {
            background: '#e6f7fa',
            border: '2px solid #2e90fa',
            borderRadius: 12,
            padding: 12,
            width: 260,
            textAlign: 'center',
            fontSize: 14,
            color: '#1a202c',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease-in-out',
        },
    },
    {
        id: 'test-planning',
        position: { x: 400, y: 300 },
        data: {
            label: 'Test Planning',
            category: 'process',
            recommendation: 'essential',
        },
        style: {
            background: '#e6f7fa',
            border: '2px solid #2e90fa',
            borderRadius: 12,
            padding: 12,
            width: 260,
            textAlign: 'center',
            fontSize: 14,
            color: '#1a202c',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease-in-out',
        },
    },
    {
        id: 'test-cases',
        position: { x: 700, y: 300 },
        data: {
            label: 'Test Cases',
            category: 'process',
            recommendation: 'essential',
        },
        style: {
            background: '#e6f7fa',
            border: '2px solid #2e90fa',
            borderRadius: 12,
            padding: 12,
            width: 260,
            textAlign: 'center',
            fontSize: 14,
            color: '#1a202c',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease-in-out',
        },
    },
    {
        id: 'test-automation',
        position: { x: 600, y: 400 },
        data: {
            label: 'Test Automation',
            category: 'process',
            recommendation: 'important',
        },
        style: {
            background: '#e6f7fa',
            border: '2px solid #2e90fa',
            borderRadius: 12,
            padding: 12,
            width: 260,
            textAlign: 'center',
            fontSize: 14,
            color: '#1a202c',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease-in-out',
        },
    },

    // Automation Tools
    {
        id: 'automation-tools',
        position: { x: 1000, y: 150 },
        data: {
            label: 'Automation Tools',
            category: 'tools',
            recommendation: 'important',
        },
        style: {
            background: '#e6f7fa',
            border: '2px solid #2e90fa',
            borderRadius: 12,
            padding: 12,
            width: 260,
            textAlign: 'center',
            fontSize: 14,
            color: '#1a202c',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease-in-out',
        },
    },
    {
        id: 'selenium',
        position: { x: 1000, y: 250 },
        data: {
            label: 'Selenium',
            category: 'tools',
            recommendation: 'essential',
        },
        style: {
            background: '#fbbf24', // Kept original color for recommendation
            border: '2px solid #2e90fa',
            borderRadius: 12,
            padding: 12,
            width: 260,
            textAlign: 'center',
            fontSize: 14,
            color: '#1a202c',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease-in-out',
        },
    },
    {
        id: 'cypress',
        position: { x: 1000, y: 350 },
        data: {
            label: 'Cypress',
            category: 'tools',
            recommendation: 'important',
        },
        style: {
            background: '#fcd34d', // Kept original color for recommendation
            border: '2px solid #2e90fa',
            borderRadius: 12,
            padding: 12,
            width: 260,
            textAlign: 'center',
            fontSize: 14,
            color: '#1a202c',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease-in-out',
        },
    },
    {
        id: 'postman',
        position: { x: 1000, y: 450 },
        data: {
            label: 'Postman/Newman',
            category: 'tools',
            recommendation: 'important',
        },
        style: {
            background: '#fcd34d', // Kept original color for recommendation
            border: '2px solid #2e90fa',
            borderRadius: 12,
            padding: 12,
            width: 260,
            textAlign: 'center',
            fontSize: 14,
            color: '#1a202c',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease-in-out',
        },
    },

    // CI/CD
    {
        id: 'ci-cd',
        position: { x: 1300, y: 150 },
        data: {
            label: 'CI/CD Pipelines',
            category: 'devops',
            recommendation: 'important',
        },
        style: {
            background: '#e6f7fa',
            border: '2px solid #2e90fa',
            borderRadius: 12,
            padding: 12,
            width: 260,
            textAlign: 'center',
            fontSize: 14,
            color: '#1a202c',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease-in-out',
        },
    },
    {
        id: 'jenkins',
        position: { x: 1300, y: 250 },
        data: {
            label: 'Jenkins',
            category: 'devops',
            recommendation: 'important',
        },
        style: {
            background: '#e6f7fa',
            border: '2px solid #2e90fa',
            borderRadius: 12,
            padding: 12,
            width: 260,
            textAlign: 'center',
            fontSize: 14,
            color: '#1a202c',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease-in-out',
        },
    },
    {
        id: 'github-actions',
        position: { x: 1300, y: 350 },
        data: {
            label: 'GitHub Actions',
            category: 'devops',
            recommendation: 'important',
        },
        style: {
            background: '#e6f7fa',
            border: '2px solid #2e90fa',
            borderRadius: 12,
            padding: 12,
            width: 260,
            textAlign: 'center',
            fontSize: 14,
            color: '#1a202c',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease-in-out',
        },
    },

    // External Resources
    {
        id: 'qa-resources',
        position: { x: 600, y: 600 },
        data: {
            label: 'QA Resources',
            category: 'resources',
        },
        style: {
            background: '#a5d8ff',
            border: '2px dashed #2e90fa',
            borderRadius: 12,
            padding: 12,
            width: 260,
            textAlign: 'center',
            fontSize: 14,
            color: '#1a202c',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease-in-out',
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
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeWidth: 2,
        },
    },
    {
        id: 'qa-test-process',
        source: 'qa-engineer',
        target: 'test-process',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeWidth: 2,
        },
    },
    {
        id: 'qa-automation-tools',
        source: 'qa-engineer',
        target: 'automation-tools',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeWidth: 2,
        },
    },
    {
        id: 'qa-ci-cd',
        source: 'qa-engineer',
        target: 'ci-cd',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeWidth: 2,
        },
    },

    // QA Fundamentals connections
    {
        id: 'fundamentals-mindset',
        source: 'qa-fundamentals',
        target: 'tester-mindset',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'mindset-approaches',
        source: 'tester-mindset',
        target: 'testing-approaches',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'approaches-whitebox',
        source: 'testing-approaches',
        target: 'white-box',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'approaches-blackbox',
        source: 'testing-approaches',
        target: 'black-box',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },

    // Test Process connections
    {
        id: 'process-planning',
        source: 'test-process',
        target: 'test-planning',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'process-cases',
        source: 'test-process',
        target: 'test-cases',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'process-automation',
        source: 'test-process',
        target: 'test-automation',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },

    // Automation Tools connections
    {
        id: 'tools-selenium',
        source: 'automation-tools',
        target: 'selenium',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'tools-cypress',
        source: 'automation-tools',
        target: 'cypress',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'tools-postman',
        source: 'automation-tools',
        target: 'postman',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },

    // CI/CD connections
    {
        id: 'ci-jenkins',
        source: 'ci-cd',
        target: 'jenkins',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'ci-github-actions',
        source: 'ci-cd',
        target: 'github-actions',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },

    // External Resources
    {
        id: 'qa-resources-link',
        source: 'qa-engineer',
        target: 'qa-resources',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '5,5',
            strokeWidth: 2,
        },
    },
];
