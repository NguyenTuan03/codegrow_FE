import { Edge, Node } from '@xyflow/react';

type CustomNodeData = {
    label: string;
    recommendation?: 'recommended' | 'alternative' | 'optional';
};

export const ProductManagerNodes: Node<Partial<CustomNodeData>>[] = [
    // Main Product Manager Node
    {
        id: 'product-manager',
        position: { x: 600, y: 50 },
        data: {
            label: 'Product Manager',
            recommendation: 'recommended',
        },
        style: {
            background: 'linear-gradient(135deg, #5AD3AF 0%, #4ac2a0 100%)',
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

    // Product Strategy
    {
        id: 'product-strategy',
        position: { x: 200, y: 150 },
        data: { label: 'Product Strategy' },
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
        id: 'market-research',
        position: { x: 100, y: 250 },
        data: { label: 'Market Research' },
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
        id: 'roadmapping',
        position: { x: 300, y: 250 },
        data: { label: 'Roadmapping' },
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

    // Product Development
    {
        id: 'product-development',
        position: { x: 600, y: 200 },
        data: { label: 'Product Development' },
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
        id: 'requirements',
        position: { x: 400, y: 300 },
        data: { label: 'Defining Requirements' },
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
        id: 'collaboration',
        position: { x: 600, y: 300 },
        data: { label: 'Cross-Team Collaboration' },
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
        id: 'agile',
        position: { x: 800, y: 300 },
        data: { label: 'Agile Methodologies' },
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

    // Launch & Growth
    {
        id: 'launch-growth',
        position: { x: 1000, y: 150 },
        data: { label: 'Launch & Growth' },
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
        id: 'go-to-market',
        position: { x: 900, y: 250 },
        data: { label: 'Go-to-Market Strategy' },
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
        id: 'metrics',
        position: { x: 1100, y: 250 },
        data: { label: 'Metrics & Analytics' },
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

    // Cybersecurity in Product Management
    {
        id: 'cybersecurity-pm',
        position: { x: 1000, y: 400 },
        data: { label: 'Cybersecurity in PM' },
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
        id: 'security-requirements',
        position: { x: 900, y: 500 },
        data: {
            label: 'Security Requirements',
            recommendation: 'recommended',
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
        id: 'compliance',
        position: { x: 1100, y: 500 },
        data: {
            label: 'Compliance (GDPR, CCPA)',
            recommendation: 'recommended',
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
];

export const ProductManagerEdges: Edge[] = [
    // Main connections from Product Manager
    {
        id: 'product-manager-strategy',
        source: 'product-manager',
        target: 'product-strategy',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeWidth: 2,
        },
    },
    {
        id: 'product-manager-development',
        source: 'product-manager',
        target: 'product-development',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeWidth: 2,
        },
    },
    {
        id: 'product-manager-launch-growth',
        source: 'product-manager',
        target: 'launch-growth',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeWidth: 2,
        },
    },
    {
        id: 'product-manager-cybersecurity-pm',
        source: 'product-manager',
        target: 'cybersecurity-pm',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeWidth: 2,
        },
    },

    // Product Strategy connections
    {
        id: 'product-strategy-market-research',
        source: 'product-strategy',
        target: 'market-research',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'product-strategy-roadmapping',
        source: 'product-strategy',
        target: 'roadmapping',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },

    // Product Development connections
    {
        id: 'product-development-requirements',
        source: 'product-development',
        target: 'requirements',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'product-development-collaboration',
        source: 'product-development',
        target: 'collaboration',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'product-development-agile',
        source: 'product-development',
        target: 'agile',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },

    // Launch & Growth connections
    {
        id: 'launch-growth-go-to-market',
        source: 'launch-growth',
        target: 'go-to-market',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'launch-growth-metrics',
        source: 'launch-growth',
        target: 'metrics',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },

    // Cybersecurity in Product Management connections
    {
        id: 'cybersecurity-pm-security-requirements',
        source: 'cybersecurity-pm',
        target: 'security-requirements',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'cybersecurity-pm-compliance',
        source: 'cybersecurity-pm',
        target: 'compliance',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
];
