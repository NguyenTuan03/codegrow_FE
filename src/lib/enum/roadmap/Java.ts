import { Edge, Node } from '@xyflow/react';

type CustomNodeData = {
    label: string;
    recommendation?: 'recommended' | 'alternative' | 'not-recommended' | 'optional';
};

export const JavaNodes: Node<Partial<CustomNodeData>>[] = [
    // Main Java Node
    {
        id: 'java',
        position: { x: 600, y: 50 }, // Shifted to center for wider layout
        data: {
            label: 'Java',
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

    // Backend Roadmap Link
    {
        id: 'backend-roadmap',
        position: { x: 200, y: 150 },
        data: {
            label: 'Visit Backend Roadmap',
            recommendation: 'recommended',
        },
        style: {
            background: '#a5d8ff', // Kept dashed link style but updated color to match app theme
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

    // Learn the Basics
    {
        id: 'learn-basics',
        position: { x: 600, y: 200 },
        data: { label: 'Learn the Basics' },
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
        id: 'basic-syntax',
        position: { x: 300, y: 300 },
        data: { label: 'Basic Syntax' },
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
        id: 'data-types',
        position: { x: 600, y: 300 },
        data: { label: 'Data Types' },
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
        id: 'variables-scopes',
        position: { x: 900, y: 300 },
        data: { label: 'Variables and Scopes' },
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

    // Object Oriented Programming
    {
        id: 'oop',
        position: { x: 200, y: 400 },
        data: { label: 'Object Oriented Programming' },
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
        id: 'encapsulation',
        position: { x: 100, y: 500 },
        data: { label: 'Encapsulation' },
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
        id: 'interfaces',
        position: { x: 300, y: 500 },
        data: { label: 'Interfaces' },
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
        id: 'method-overloading',
        position: { x: 100, y: 600 },
        data: { label: 'Method Overloading/Overriding' },
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

    // Functional Programming
    {
        id: 'functional-programming',
        position: { x: 600, y: 400 },
        data: { label: 'Functional Programming' },
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
        id: 'lambda-expressions',
        position: { x: 450, y: 500 },
        data: { label: 'Lambda Expressions' },
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
        id: 'stream-api',
        position: { x: 750, y: 500 },
        data: { label: 'Stream API' },
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

    // Web Frameworks
    {
        id: 'web-frameworks',
        position: { x: 1000, y: 200 },
        data: { label: 'Web Frameworks' },
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
        id: 'spring-boot',
        position: { x: 1000, y: 300 },
        data: {
            label: 'Spring Boot',
            recommendation: 'recommended',
        },
        style: {
            background: '#6db33f', // Kept original color for recommendation
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
        id: 'quarkus',
        position: { x: 1000, y: 400 },
        data: {
            label: 'Quarkus',
            recommendation: 'alternative',
        },
        style: {
            background: '#4695eb', // Kept original color for recommendation
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

    // Backend Roadmap Link (bottom)
    {
        id: 'backend-path',
        position: { x: 1000, y: 600 },
        data: {
            label: 'Backend Roadmap',
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

export const JavaEdges: Edge[] = [
    // Main connections from Java
    {
        id: 'java-learn-basics',
        source: 'java',
        target: 'learn-basics',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeWidth: 2,
        },
    },
    {
        id: 'java-oop',
        source: 'java',
        target: 'oop',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeWidth: 2,
        },
    },
    {
        id: 'java-functional',
        source: 'java',
        target: 'functional-programming',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeWidth: 2,
        },
    },
    {
        id: 'java-web-frameworks',
        source: 'java',
        target: 'web-frameworks',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeWidth: 2,
        },
    },

    // Learn Basics connections
    {
        id: 'learn-basics-syntax',
        source: 'learn-basics',
        target: 'basic-syntax',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'learn-basics-data-types',
        source: 'learn-basics',
        target: 'data-types',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'learn-basics-variables',
        source: 'learn-basics',
        target: 'variables-scopes',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },

    // OOP connections
    {
        id: 'oop-encapsulation',
        source: 'oop',
        target: 'encapsulation',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'oop-interfaces',
        source: 'oop',
        target: 'interfaces',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'oop-method-overloading',
        source: 'oop',
        target: 'method-overloading',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },

    // Functional Programming connections
    {
        id: 'functional-lambda',
        source: 'functional-programming',
        target: 'lambda-expressions',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'functional-stream',
        source: 'functional-programming',
        target: 'stream-api',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },

    // Web Frameworks connections
    {
        id: 'web-spring',
        source: 'web-frameworks',
        target: 'spring-boot',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'web-quarkus',
        source: 'web-frameworks',
        target: 'quarkus',
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
        id: 'java-backend-roadmap',
        source: 'java',
        target: 'backend-roadmap',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '5,5',
            strokeWidth: 2,
        },
    },
    {
        id: 'java-backend-path',
        source: 'java',
        target: 'backend-path',
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: '#5AD3AF',
            strokeDasharray: '5,5',
            strokeWidth: 2,
        },
    },
];
