import { Edge, Node } from '@xyflow/react';

type CustomNodeData = {
    label: string;
    recommendation?: 'recommended' | 'alternative' | 'optional';
};

export const UIDesignNodes: Node<Partial<CustomNodeData>>[] = [
    // Main UI Designer Node
    {
        id: 'ui-designer',
        position: { x: 600, y: 50 },
        data: {
            label: 'UI Designer',
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

    // Design Principles
    {
        id: 'design-principles',
        position: { x: 200, y: 150 },
        data: { label: 'Design Principles' },
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
        id: 'typography',
        position: { x: 100, y: 250 },
        data: { label: 'Typography' },
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
        id: 'color-theory',
        position: { x: 300, y: 250 },
        data: { label: 'Color Theory' },
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

    // Design Tools
    {
        id: 'design-tools',
        position: { x: 600, y: 200 },
        data: { label: 'Design Tools' },
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
        id: 'figma',
        position: { x: 400, y: 300 },
        data: {
            label: 'Figma',
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
        id: 'sketch',
        position: { x: 600, y: 300 },
        data: {
            label: 'Sketch',
            recommendation: 'alternative',
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
        id: 'adobe-xd',
        position: { x: 800, y: 300 },
        data: { label: 'Adobe XD' },
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

    // Prototyping & Testing
    {
        id: 'prototyping-testing',
        position: { x: 1000, y: 150 },
        data: { label: 'Prototyping & Testing' },
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
        id: 'interactive-prototypes',
        position: { x: 900, y: 250 },
        data: { label: 'Interactive Prototypes' },
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
        id: 'usability-testing',
        position: { x: 1100, y: 250 },
        data: { label: 'Usability Testing' },
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

    // Collaboration with Devs
    {
        id: 'collaboration-devs',
        position: { x: 1000, y: 400 },
        data: { label: 'Collaboration with Devs' },
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
        id: 'design-handoff',
        position: { x: 900, y: 500 },
        data: {
            label: 'Design Handoff',
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
        id: 'design-systems',
        position: { x: 1100, y: 500 },
        data: { label: 'Design Systems' },
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

export const UIDesignEdges: Edge[] = [
    // Main connections from UI Designer
    {
        id: 'ui-designer-principles',
        source: 'ui-designer',
        target: 'design-principles',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeWidth: 2,
        },
    },
    {
        id: 'ui-designer-tools',
        source: 'ui-designer',
        target: 'design-tools',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeWidth: 2,
        },
    },
    {
        id: 'ui-designer-prototyping',
        source: 'ui-designer',
        target: 'prototyping-testing',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeWidth: 2,
        },
    },
    {
        id: 'ui-designer-collaboration',
        source: 'ui-designer',
        target: 'collaboration-devs',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeWidth: 2,
        },
    },

    // Design Principles connections
    {
        id: 'design-principles-typography',
        source: 'design-principles',
        target: 'typography',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'design-principles-color',
        source: 'design-principles',
        target: 'color-theory',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },

    // Design Tools connections
    {
        id: 'design-tools-figma',
        source: 'design-tools',
        target: 'figma',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'design-tools-sketch',
        source: 'design-tools',
        target: 'sketch',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'design-tools-adobe-xd',
        source: 'design-tools',
        target: 'adobe-xd',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },

    // Prototyping & Testing connections
    {
        id: 'prototyping-testing-prototypes',
        source: 'prototyping-testing',
        target: 'interactive-prototypes',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'prototyping-testing-usability',
        source: 'prototyping-testing',
        target: 'usability-testing',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },

    // Collaboration with Devs connections
    {
        id: 'collaboration-devs-handoff',
        source: 'collaboration-devs',
        target: 'design-handoff',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'collaboration-devs-systems',
        source: 'collaboration-devs',
        target: 'design-systems',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
];
