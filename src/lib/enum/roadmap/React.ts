// lib/enum/roadmap/React.ts
import { Edge, Node } from '@xyflow/react';

type CustomNodeData = {
    label: string;
    recommendation?: 'recommended' | 'alternative' | 'not-recommended' | 'optional';
};

export const ReactNodes: Node<Partial<CustomNodeData>>[] = [
    // Main React Node
    {
        id: 'react',
        position: { x: 400, y: 50 },
        data: {
            label: 'React',
            recommendation: 'recommended',
        },
        style: {
            background: '#61dafb',
            color: '#000',
            padding: 10,
            borderRadius: 12,
            border: '2px solid #000',
            fontWeight: 'bold',
            boxShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            textAlign: 'center',
            width: 180,
        },
    },

    // JavaScript Roadmap Link
    {
        id: 'js-roadmap',
        position: { x: 150, y: 150 },
        data: {
            label: 'Visit JavaScript Roadmap',
            recommendation: 'recommended',
        },
        style: {
            background: '#f0db4f',
            border: '2px dashed #000',
            borderRadius: 12,
            padding: 10,
            width: 200,
            textAlign: 'center',
        },
    },

    // CLI Tools
    {
        id: 'cli-tools',
        position: { x: 400, y: 150 },
        data: { label: 'CLI Tools' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 180,
            textAlign: 'center',
        },
    },
    {
        id: 'vite',
        position: { x: 250, y: 200 },
        data: {
            label: 'Vite',
            recommendation: 'recommended',
        },
        style: {
            background: '#ffd700',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 120,
            textAlign: 'center',
        },
    },
    {
        id: 'cra',
        position: { x: 400, y: 200 },
        data: {
            label: 'Create React App',
            recommendation: 'not-recommended',
        },
        style: {
            background: '#ff6b6b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 150,
            textAlign: 'center',
        },
    },

    // Components Basics
    {
        id: 'components-basics',
        position: { x: 150, y: 300 },
        data: { label: 'Components Basics' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 180,
            textAlign: 'center',
        },
    },
    {
        id: 'functional-components',
        position: { x: 50, y: 350 },
        data: {
            label: 'Functional Components',
            recommendation: 'recommended',
        },
        style: {
            background: '#ffd700',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 180,
            textAlign: 'center',
        },
    },
    {
        id: 'class-components',
        position: { x: 250, y: 350 },
        data: {
            label: 'Class Components',
            recommendation: 'optional',
        },
        style: {
            background: '#a5d8ff',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 180,
            textAlign: 'center',
        },
    },
    {
        id: 'jsx',
        position: { x: 50, y: 400 },
        data: { label: 'JSX' },
        style: {
            background: '#ffd700',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 120,
            textAlign: 'center',
        },
    },
    {
        id: 'props-state',
        position: { x: 200, y: 400 },
        data: { label: 'Props vs State' },
        style: {
            background: '#ffd700',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 150,
            textAlign: 'center',
        },
    },

    // Hooks
    {
        id: 'basic-hooks',
        position: { x: 400, y: 300 },
        data: { label: 'Basic Hooks' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 180,
            textAlign: 'center',
        },
    },
    {
        id: 'usestate',
        position: { x: 350, y: 350 },
        data: { label: 'useState' },
        style: {
            background: '#ffd700',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 120,
            textAlign: 'center',
        },
    },
    {
        id: 'useeffect',
        position: { x: 500, y: 350 },
        data: { label: 'useEffect' },
        style: {
            background: '#ffd700',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 120,
            textAlign: 'center',
        },
    },

    // State Management
    {
        id: 'state-management',
        position: { x: 650, y: 150 },
        data: { label: 'State Management' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 180,
            textAlign: 'center',
        },
    },
    {
        id: 'redux',
        position: { x: 600, y: 200 },
        data: {
            label: 'Redux / Toolkit',
            recommendation: 'recommended',
        },
        style: {
            background: '#764abc',
            color: '#fff',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 150,
            textAlign: 'center',
        },
    },
    {
        id: 'zustand',
        position: { x: 600, y: 250 },
        data: {
            label: 'Zustand',
            recommendation: 'alternative',
        },
        style: {
            background: '#ffd700',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 120,
            textAlign: 'center',
        },
    },

    // Frontend Roadmap Link
    {
        id: 'frontend-roadmap',
        position: { x: 650, y: 400 },
        data: {
            label: 'Frontend Roadmap',
            recommendation: 'recommended',
        },
        style: {
            background: '#a5d8ff',
            border: '2px dashed #000',
            borderRadius: 12,
            padding: 10,
            width: 180,
            textAlign: 'center',
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
    },
    {
        id: 'react-components-basics',
        source: 'react',
        target: 'components-basics',
        type: 'smoothstep',
    },
    {
        id: 'react-basic-hooks',
        source: 'react',
        target: 'basic-hooks',
        type: 'smoothstep',
    },
    {
        id: 'react-state-management',
        source: 'react',
        target: 'state-management',
        type: 'smoothstep',
    },

    // CLI Tools connections
    {
        id: 'cli-tools-vite',
        source: 'cli-tools',
        target: 'vite',
        type: 'smoothstep',
    },
    {
        id: 'cli-tools-cra',
        source: 'cli-tools',
        target: 'cra',
        type: 'smoothstep',
    },

    // Components Basics connections
    {
        id: 'components-basics-functional',
        source: 'components-basics',
        target: 'functional-components',
        type: 'smoothstep',
    },
    {
        id: 'components-basics-class',
        source: 'components-basics',
        target: 'class-components',
        type: 'smoothstep',
    },
    {
        id: 'functional-jsx',
        source: 'functional-components',
        target: 'jsx',
        type: 'smoothstep',
    },
    {
        id: 'functional-props-state',
        source: 'functional-components',
        target: 'props-state',
        type: 'smoothstep',
    },

    // State Management connections
    {
        id: 'state-management-redux',
        source: 'state-management',
        target: 'redux',
        type: 'smoothstep',
    },
    {
        id: 'state-management-zustand',
        source: 'state-management',
        target: 'zustand',
        type: 'smoothstep',
    },

    // External links
    {
        id: 'react-js-roadmap',
        source: 'react',
        target: 'js-roadmap',
        type: 'smoothstep',
        style: { strokeDasharray: '5,5' },
    },
    {
        id: 'react-frontend-roadmap',
        source: 'react',
        target: 'frontend-roadmap',
        type: 'smoothstep',
        style: { strokeDasharray: '5,5' },
    },
];
