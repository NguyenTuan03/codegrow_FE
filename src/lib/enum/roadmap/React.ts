import { Edge, Node } from '@xyflow/react';

type CustomNodeData = {
    label: string;
    recommendation?: 'recommended' | 'alternative' | 'not-recommended' | 'optional';
};

export const ReactNodes: Node<Partial<CustomNodeData>>[] = [
    // Main React Node
    {
        id: 'react',
        position: { x: 600, y: 50 }, // Shifted to center for wider layout
        data: {
            label: 'React',
            recommendation: 'recommended',
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

    // JavaScript Roadmap Link
    {
        id: 'js-roadmap',
        position: { x: 200, y: 150 },
        data: {
            label: 'Visit JavaScript Roadmap',
            recommendation: 'recommended',
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

    // CLI Tools
    {
        id: 'cli-tools',
        position: { x: 600, y: 200 },
        data: { label: 'CLI Tools' },
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
        id: 'vite',
        position: { x: 400, y: 300 },
        data: {
            label: 'Vite',
            recommendation: 'recommended',
        },
        style: {
            background: '#ffd700', // Kept original color for recommendation
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
        id: 'cra',
        position: { x: 800, y: 300 },
        data: {
            label: 'Create React App',
            recommendation: 'not-recommended',
        },
        style: {
            background: '#ff6b6b', // Kept original color for recommendation
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

    // Components Basics
    {
        id: 'components-basics',
        position: { x: 200, y: 400 },
        data: { label: 'Components Basics' },
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
        id: 'functional-components',
        position: { x: 100, y: 500 },
        data: {
            label: 'Functional Components',
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
        id: 'class-components',
        position: { x: 300, y: 500 },
        data: {
            label: 'Class Components',
            recommendation: 'optional',
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
        id: 'jsx',
        position: { x: 100, y: 600 },
        data: { label: 'JSX' },
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
        id: 'props-state',
        position: { x: 300, y: 600 },
        data: { label: 'Props vs State' },
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

    // Hooks
    {
        id: 'basic-hooks',
        position: { x: 600, y: 400 },
        data: { label: 'Basic Hooks' },
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
        id: 'usestate',
        position: { x: 450, y: 500 },
        data: { label: 'useState' },
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
        id: 'useeffect',
        position: { x: 750, y: 500 },
        data: { label: 'useEffect' },
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

    // State Management
    {
        id: 'state-management',
        position: { x: 1000, y: 200 },
        data: { label: 'State Management' },
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
        id: 'redux',
        position: { x: 1000, y: 300 },
        data: {
            label: 'Redux / Toolkit',
            recommendation: 'recommended',
        },
        style: {
            background: '#764abc', // Kept original color for recommendation
            color: '#fff',
            border: '2px solid #2e90fa',
            borderRadius: 12,
            padding: 12,
            width: 260,
            textAlign: 'center',
            fontSize: 14,
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease-in-out',
        },
    },
    {
        id: 'zustand',
        position: { x: 1000, y: 400 },
        data: {
            label: 'Zustand',
            recommendation: 'alternative',
        },
        style: {
            background: '#ffd700', // Kept original color for recommendation
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

    // Frontend Roadmap Link
    {
        id: 'frontend-roadmap',
        position: { x: 1000, y: 600 },
        data: {
            label: 'Frontend Roadmap',
            recommendation: 'recommended',
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

export const ReactEdges: Edge[] = [
    // Main connections from React
    {
        id: 'react-cli-tools',
        source: 'react',
        target: 'cli-tools',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeWidth: 2,
        },
    },
    {
        id: 'react-components-basics',
        source: 'react',
        target: 'components-basics',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeWidth: 2,
        },
    },
    {
        id: 'react-basic-hooks',
        source: 'react',
        target: 'basic-hooks',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeWidth: 2,
        },
    },
    {
        id: 'react-state-management',
        source: 'react',
        target: 'state-management',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeWidth: 2,
        },
    },

    // CLI Tools connections
    {
        id: 'cli-tools-vite',
        source: 'cli-tools',
        target: 'vite',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'cli-tools-cra',
        source: 'cli-tools',
        target: 'cra',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },

    // Components Basics connections
    {
        id: 'components-basics-functional',
        source: 'components-basics',
        target: 'functional-components',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'components-basics-class',
        source: 'components-basics',
        target: 'class-components',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'functional-jsx',
        source: 'functional-components',
        target: 'jsx',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'functional-props-state',
        source: 'functional-components',
        target: 'props-state',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },

    // State Management connections
    {
        id: 'state-management-redux',
        source: 'state-management',
        target: 'redux',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'state-management-zustand',
        source: 'state-management',
        target: 'zustand',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },

    // External links
    {
        id: 'react-js-roadmap',
        source: 'react',
        target: 'js-roadmap',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '5,5',
            strokeWidth: 2,
        },
    },
    {
        id: 'react-frontend-roadmap',
        source: 'react',
        target: 'frontend-roadmap',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '5,5',
            strokeWidth: 2,
        },
    },
];
