import { Edge, Node } from '@xyflow/react';

type CustomNodeData = {
    label: string;
};

// Nodes for the backend roadmap
export const BENodes: Node<Partial<CustomNodeData>>[] = [
    // Internet Node (Central Node)
    {
        id: 'internet',
        position: { x: 320, y: -400 },
        data: { label: 'Internet' },
        style: {
            background: '#fff14c',
            padding: 10,
            borderRadius: 12,
            border: '2px solid #000',
            fontWeight: 'bold',
            boxShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            textAlign: 'center',
            width: 180,
        },
    },
    // Internet-related subnodes
    {
        id: 'how-internet',
        position: { x: 600, y: -650 },
        data: { label: 'How does the internet work?' },
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
        id: 'http',
        position: { x: 600, y: -600 },
        data: { label: 'What is HTTP/HTTPS?' },
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
        id: 'dns',
        position: { x: 600, y: -550 },
        data: { label: 'DNS and how it works?' },
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
        id: 'servers',
        position: { x: 600, y: -500 },
        data: { label: 'What are Servers?' },
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
        id: 'rest',
        position: { x: 600, y: -450 },
        data: { label: 'REST API Basics' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 220,
            textAlign: 'center',
        },
    },
    // Programming Language Node (Node.js)
    {
        id: 'nodejs',
        position: { x: 320, y: -200 },
        data: { label: 'Node.js' },
        style: {
            background: '#fff14c',
            padding: 10,
            borderRadius: 12,
            border: '2px solid #000',
            fontWeight: 'bold',
            boxShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            textAlign: 'center',
            width: 180,
        },
    },
    // Node.js subnodes
    {
        id: 'learn-basics-nodejs',
        position: { x: 100, y: -300 },
        data: { label: 'Learn the Basics' },
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
        id: 'async-programming',
        position: { x: 100, y: -250 },
        data: { label: 'Async Programming' },
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
        id: 'express',
        position: { x: 100, y: -200 },
        data: { label: 'Express.js' },
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
        id: 'middleware',
        position: { x: 100, y: -150 },
        data: { label: 'Middleware' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 220,
            textAlign: 'center',
        },
    },
    // Databases Node
    {
        id: 'databases',
        position: { x: 320, y: 0 },
        data: { label: 'Databases' },
        style: {
            background: '#fff14c',
            padding: 10,
            borderRadius: 12,
            border: '2px solid #000',
            fontWeight: 'bold',
            boxShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            textAlign: 'center',
            width: 180,
        },
    },
    // Databases subnodes
    {
        id: 'sql',
        position: { x: 600, y: -50 },
        data: { label: 'SQL Databases (PostgreSQL, MySQL)' },
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
        id: 'nosql',
        position: { x: 600, y: 0 },
        data: { label: 'NoSQL Databases (MongoDB)' },
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
        id: 'orm',
        position: { x: 600, y: 50 },
        data: { label: 'ORM (Prisma, Sequelize)' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 220,
            textAlign: 'center',
        },
    },
    // APIs Node
    {
        id: 'apis',
        position: { x: 320, y: 200 },
        data: { label: 'APIs' },
        style: {
            background: '#fff14c',
            padding: 10,
            borderRadius: 12,
            border: '2px solid #000',
            fontWeight: 'bold',
            boxShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            textAlign: 'center',
            width: 180,
        },
    },
    // APIs subnodes
    {
        id: 'rest-api',
        position: { x: 100, y: 150 },
        data: { label: 'Building REST APIs' },
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
        id: 'graphql',
        position: { x: 100, y: 200 },
        data: { label: 'GraphQL' },
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
        id: 'api-security',
        position: { x: 100, y: 250 },
        data: { label: 'API Security' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 220,
            textAlign: 'center',
        },
    },
    // Authentication Node
    {
        id: 'authentication',
        position: { x: 320, y: 400 },
        data: { label: 'Authentication' },
        style: {
            background: '#fff14c',
            padding: 10,
            borderRadius: 12,
            border: '2px solid #000',
            fontWeight: 'bold',
            boxShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            textAlign: 'center',
            width: 180,
        },
    },
    // Authentication subnodes
    {
        id: 'jwt',
        position: { x: 600, y: 350 },
        data: { label: 'JWT Authentication' },
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
        id: 'oauth',
        position: { x: 600, y: 400 },
        data: { label: 'OAuth 2.0' },
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
        id: 'session',
        position: { x: 600, y: 450 },
        data: { label: 'Session-based Auth' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 220,
            textAlign: 'center',
        },
    },
    // Version Control Systems Node
    {
        id: 'vcs',
        position: { x: 320, y: 600 },
        data: { label: 'Version Control Systems' },
        style: {
            background: '#fff14c',
            padding: 10,
            borderRadius: 12,
            border: '2px solid #000',
            fontWeight: 'bold',
            boxShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            textAlign: 'center',
            width: 180,
        },
    },
    // VCS subnodes
    {
        id: 'git',
        position: { x: 100, y: 550 },
        data: { label: 'Git Basics' },
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
        id: 'github',
        position: { x: 100, y: 600 },
        data: { label: 'GitHub' },
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
        id: 'gitlab',
        position: { x: 100, y: 650 },
        data: { label: 'GitLab' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 220,
            textAlign: 'center',
        },
    },
    // Package Managers Node
    {
        id: 'package-managers',
        position: { x: 320, y: 800 },
        data: { label: 'Package Managers' },
        style: {
            background: '#fff14c',
            padding: 10,
            borderRadius: 12,
            border: '2px solid #000',
            fontWeight: 'bold',
            boxShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            textAlign: 'center',
            width: 180,
        },
    },
    // Package Managers subnodes
    {
        id: 'npm',
        position: { x: 600, y: 750 },
        data: { label: 'npm' },
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
        id: 'pnpm',
        position: { x: 600, y: 800 },
        data: { label: 'pnpm' },
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
        id: 'yarn',
        position: { x: 600, y: 850 },
        data: { label: 'yarn' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 220,
            textAlign: 'center',
        },
    },
    // Deployment Node
    {
        id: 'deployment',
        position: { x: 320, y: 1000 },
        data: { label: 'Deployment' },
        style: {
            background: '#fff14c',
            padding: 10,
            borderRadius: 12,
            border: '2px solid #000',
            fontWeight: 'bold',
            boxShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            textAlign: 'center',
            width: 180,
        },
    },
    // Deployment subnodes
    {
        id: 'cloud-providers',
        position: { x: 100, y: 950 },
        data: { label: 'Cloud Providers (AWS, Azure)' },
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
        id: 'docker',
        position: { x: 100, y: 1000 },
        data: { label: 'Docker' },
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
        id: 'ci-cd',
        position: { x: 100, y: 1050 },
        data: { label: 'CI/CD Pipelines' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 220,
            textAlign: 'center',
        },
    },
];

// Edges for the backend roadmap
export const BEEdges: Edge[] = [
    // Internet to subnodes
    {
        id: 'e-internet-how-internet',
        source: 'internet',
        target: 'how-internet',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-internet-http',
        source: 'internet',
        target: 'http',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-internet-dns',
        source: 'internet',
        target: 'dns',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-internet-servers',
        source: 'internet',
        target: 'servers',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-internet-rest',
        source: 'internet',
        target: 'rest',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // Internet to Node.js
    {
        id: 'e-internet-nodejs',
        source: 'internet',
        target: 'nodejs',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeWidth: 2,
        },
    },
    // Node.js to subnodes
    {
        id: 'e-nodejs-learn-basics-nodejs',
        source: 'nodejs',
        target: 'learn-basics-nodejs',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-nodejs-async-programming',
        source: 'nodejs',
        target: 'async-programming',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-nodejs-express',
        source: 'nodejs',
        target: 'express',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-nodejs-middleware',
        source: 'nodejs',
        target: 'middleware',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // Node.js to Databases
    {
        id: 'e-nodejs-databases',
        source: 'nodejs',
        target: 'databases',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeWidth: 2,
        },
    },
    // Databases to subnodes
    {
        id: 'e-databases-sql',
        source: 'databases',
        target: 'sql',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-databases-nosql',
        source: 'databases',
        target: 'nosql',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-databases-orm',
        source: 'databases',
        target: 'orm',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // Databases to APIs
    {
        id: 'e-databases-apis',
        source: 'databases',
        target: 'apis',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeWidth: 2,
        },
    },
    // APIs to subnodes
    {
        id: 'e-apis-rest-api',
        source: 'apis',
        target: 'rest-api',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-apis-graphql',
        source: 'apis',
        target: 'graphql',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-apis-api-security',
        source: 'apis',
        target: 'api-security',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // APIs to Authentication
    {
        id: 'e-apis-authentication',
        source: 'apis',
        target: 'authentication',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeWidth: 2,
        },
    },
    // Authentication to subnodes
    {
        id: 'e-authentication-jwt',
        source: 'authentication',
        target: 'jwt',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-authentication-oauth',
        source: 'authentication',
        target: 'oauth',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-authentication-session',
        source: 'authentication',
        target: 'session',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // Authentication to VCS
    {
        id: 'e-authentication-vcs',
        source: 'authentication',
        target: 'vcs',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeWidth: 2,
        },
    },
    // VCS to subnodes
    {
        id: 'e-vcs-git',
        source: 'vcs',
        target: 'git',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-vcs-github',
        source: 'vcs',
        target: 'github',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-vcs-gitlab',
        source: 'vcs',
        target: 'gitlab',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // VCS to Package Managers
    {
        id: 'e-vcs-package-managers',
        source: 'vcs',
        target: 'package-managers',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeWidth: 2,
        },
    },
    // Package Managers to subnodes
    {
        id: 'e-package-managers-npm',
        source: 'package-managers',
        target: 'npm',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-package-managers-pnpm',
        source: 'package-managers',
        target: 'pnpm',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-package-managers-yarn',
        source: 'package-managers',
        target: 'yarn',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // Package Managers to Deployment
    {
        id: 'e-package-managers-deployment',
        source: 'package-managers',
        target: 'deployment',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeWidth: 2,
        },
    },
    // Deployment to subnodes
    {
        id: 'e-deployment-cloud-providers',
        source: 'deployment',
        target: 'cloud-providers',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-deployment-docker',
        source: 'deployment',
        target: 'docker',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-deployment-ci-cd',
        source: 'deployment',
        target: 'ci-cd',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
];
