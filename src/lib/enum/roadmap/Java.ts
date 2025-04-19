// lib/enum/roadmap/Java.ts
import { Edge, Node } from '@xyflow/react';

type CustomNodeData = {
    label: string;
    recommendation?: 'recommended' | 'alternative' | 'not-recommended' | 'optional';
};

export const JavaNodes: Node<Partial<CustomNodeData>>[] = [
    // Main Java Node
    {
        id: 'java',
        position: { x: 400, y: 50 },
        data: {
            label: 'Java',
            recommendation: 'recommended',
        },
        style: {
            background: '#5382a1',
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

    // Backend Roadmap Link
    {
        id: 'backend-roadmap',
        position: { x: 150, y: 150 },
        data: {
            label: 'Visit Backend Roadmap',
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

    // Learn the Basics
    {
        id: 'learn-basics',
        position: { x: 400, y: 150 },
        data: { label: 'Learn the Basics' },
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
        id: 'basic-syntax',
        position: { x: 250, y: 200 },
        data: { label: 'Basic Syntax' },
        style: {
            background: '#ffd700',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 150,
            textAlign: 'center',
        },
    },
    {
        id: 'data-types',
        position: { x: 400, y: 200 },
        data: { label: 'Data Types' },
        style: {
            background: '#ffd700',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 150,
            textAlign: 'center',
        },
    },
    {
        id: 'variables-scopes',
        position: { x: 550, y: 200 },
        data: { label: 'Variables and Scopes' },
        style: {
            background: '#ffd700',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 180,
            textAlign: 'center',
        },
    },

    // Object Oriented Programming
    {
        id: 'oop',
        position: { x: 150, y: 300 },
        data: { label: 'Object Oriented Programming' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 220,
            textAlign: 'center',
        },
    },
    {
        id: 'encapsulation',
        position: { x: 50, y: 350 },
        data: { label: 'Encapsulation' },
        style: {
            background: '#ffd700',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 150,
            textAlign: 'center',
        },
    },
    {
        id: 'interfaces',
        position: { x: 250, y: 350 },
        data: { label: 'Interfaces' },
        style: {
            background: '#ffd700',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 150,
            textAlign: 'center',
        },
    },
    {
        id: 'method-overloading',
        position: { x: 50, y: 400 },
        data: { label: 'Method Overloading/Overriding' },
        style: {
            background: '#ffd700',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 220,
            textAlign: 'center',
        },
    },

    // Functional Programming
    {
        id: 'functional-programming',
        position: { x: 400, y: 300 },
        data: { label: 'Functional Programming' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 220,
            textAlign: 'center',
        },
    },
    {
        id: 'lambda-expressions',
        position: { x: 350, y: 350 },
        data: { label: 'Lambda Expressions' },
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
        id: 'stream-api',
        position: { x: 550, y: 350 },
        data: { label: 'Stream API' },
        style: {
            background: '#ffd700',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 150,
            textAlign: 'center',
        },
    },

    // Web Frameworks
    {
        id: 'web-frameworks',
        position: { x: 650, y: 150 },
        data: { label: 'Web Frameworks' },
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
        id: 'spring-boot',
        position: { x: 600, y: 200 },
        data: {
            label: 'Spring Boot',
            recommendation: 'recommended',
        },
        style: {
            background: '#6db33f',
            color: '#fff',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 150,
            textAlign: 'center',
        },
    },
    {
        id: 'quarkus',
        position: { x: 600, y: 250 },
        data: {
            label: 'Quarkus',
            recommendation: 'alternative',
        },
        style: {
            background: '#4695eb',
            color: '#fff',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 120,
            textAlign: 'center',
        },
    },

    // Backend Roadmap Link (bottom)
    {
        id: 'backend-path',
        position: { x: 650, y: 400 },
        data: {
            label: 'Backend Roadmap',
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

export const JavaEdges: Edge[] = [
    // Main connections from Java
    {
        id: 'java-learn-basics',
        source: 'java',
        target: 'learn-basics',
        type: 'smoothstep',
    },
    {
        id: 'java-oop',
        source: 'java',
        target: 'oop',
        type: 'smoothstep',
    },
    {
        id: 'java-functional',
        source: 'java',
        target: 'functional-programming',
        type: 'smoothstep',
    },
    {
        id: 'java-web-frameworks',
        source: 'java',
        target: 'web-frameworks',
        type: 'smoothstep',
    },

    // Learn Basics connections
    {
        id: 'learn-basics-syntax',
        source: 'learn-basics',
        target: 'basic-syntax',
        type: 'smoothstep',
    },
    {
        id: 'learn-basics-data-types',
        source: 'learn-basics',
        target: 'data-types',
        type: 'smoothstep',
    },
    {
        id: 'learn-basics-variables',
        source: 'learn-basics',
        target: 'variables-scopes',
        type: 'smoothstep',
    },

    // OOP connections
    {
        id: 'oop-encapsulation',
        source: 'oop',
        target: 'encapsulation',
        type: 'smoothstep',
    },
    {
        id: 'oop-interfaces',
        source: 'oop',
        target: 'interfaces',
        type: 'smoothstep',
    },
    {
        id: 'oop-method-overloading',
        source: 'oop',
        target: 'method-overloading',
        type: 'smoothstep',
    },

    // Functional Programming connections
    {
        id: 'functional-lambda',
        source: 'functional-programming',
        target: 'lambda-expressions',
        type: 'smoothstep',
    },
    {
        id: 'functional-stream',
        source: 'functional-programming',
        target: 'stream-api',
        type: 'smoothstep',
    },

    // Web Frameworks connections
    {
        id: 'web-spring',
        source: 'web-frameworks',
        target: 'spring-boot',
        type: 'smoothstep',
    },
    {
        id: 'web-quarkus',
        source: 'web-frameworks',
        target: 'quarkus',
        type: 'smoothstep',
    },

    // External links
    {
        id: 'java-backend-roadmap',
        source: 'java',
        target: 'backend-roadmap',
        type: 'smoothstep',
        style: { strokeDasharray: '5,5' },
    },
    {
        id: 'java-backend-path',
        source: 'java',
        target: 'backend-path',
        type: 'smoothstep',
        style: { strokeDasharray: '5,5' },
    },
];
