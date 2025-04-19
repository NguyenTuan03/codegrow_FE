import { Edge, Node } from '@xyflow/react';

type CustomNodeData = {
    label: string;
};

// Nodes for the Android roadmap
export const AndroidNodes: Node<Partial<CustomNodeData>>[] = [
    // Programming Languages Node (Central Node)
    {
        id: 'languages',
        position: { x: 320, y: -800 },
        data: { label: 'Programming Languages' },
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
    // Programming Languages subnodes
    {
        id: 'java',
        position: { x: 600, y: -900 },
        data: { label: 'Java' },
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
        id: 'kotlin',
        position: { x: 600, y: -850 },
        data: { label: 'Kotlin' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 220,
            textAlign: 'center',
        },
    },
    // Android SDK Node
    {
        id: 'android-sdk',
        position: { x: 320, y: -600 },
        data: { label: 'Android SDK' },
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
    // Android SDK subnodes
    {
        id: 'activities',
        position: { x: 100, y: -650 },
        data: { label: 'Activities & Fragments' },
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
        id: 'intents',
        position: { x: 100, y: -600 },
        data: { label: 'Intents' },
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
        id: 'services',
        position: { x: 100, y: -550 },
        data: { label: 'Services' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 220,
            textAlign: 'center',
        },
    },
    // UI Design Node
    {
        id: 'ui-design',
        position: { x: 320, y: -400 },
        data: { label: 'UI Design' },
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
    // UI Design subnodes
    {
        id: 'xml-layouts',
        position: { x: 600, y: -450 },
        data: { label: 'XML Layouts' },
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
        id: 'jetpack-compose',
        position: { x: 600, y: -400 },
        data: { label: 'Jetpack Compose' },
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
        id: 'material-design',
        position: { x: 600, y: -350 },
        data: { label: 'Material Design' },
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
        position: { x: 320, y: -200 },
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
        id: 'sqlite',
        position: { x: 100, y: -250 },
        data: { label: 'SQLite' },
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
        id: 'room',
        position: { x: 100, y: -200 },
        data: { label: 'Room Persistence Library' },
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
        id: 'firebase',
        position: { x: 100, y: -150 },
        data: { label: 'Firebase Realtime Database' },
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
        position: { x: 320, y: 0 },
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
        position: { x: 600, y: -50 },
        data: { label: 'REST APIs' },
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
        id: 'retrofit',
        position: { x: 600, y: 0 },
        data: { label: 'Retrofit' },
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
        id: 'volley',
        position: { x: 600, y: 50 },
        data: { label: 'Volley' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 220,
            textAlign: 'center',
        },
    },
    // Architecture Node
    {
        id: 'architecture',
        position: { x: 320, y: 200 },
        data: { label: 'Architecture' },
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
    // Architecture subnodes
    {
        id: 'mvvm',
        position: { x: 100, y: 150 },
        data: { label: 'MVVM' },
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
        id: 'mvp',
        position: { x: 100, y: 200 },
        data: { label: 'MVP' },
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
        id: 'jetpack',
        position: { x: 100, y: 250 },
        data: { label: 'Jetpack Libraries' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 220,
            textAlign: 'center',
        },
    },
    // Testing Node
    {
        id: 'testing',
        position: { x: 320, y: 400 },
        data: { label: 'Testing' },
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
    // Testing subnodes
    {
        id: 'junit',
        position: { x: 600, y: 350 },
        data: { label: 'JUnit' },
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
        id: 'espresso',
        position: { x: 600, y: 400 },
        data: { label: 'Espresso' },
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
        id: 'mockito',
        position: { x: 600, y: 450 },
        data: { label: 'Mockito' },
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

// Edges for the Android roadmap
export const AndroidEdges: Edge[] = [
    // Languages to subnodes
    {
        id: 'e-languages-java',
        source: 'languages',
        target: 'java',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-languages-kotlin',
        source: 'languages',
        target: 'kotlin',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // Languages to Android SDK
    {
        id: 'e-languages-android-sdk',
        source: 'languages',
        target: 'android-sdk',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeWidth: 2,
        },
    },
    // Android SDK to subnodes
    {
        id: 'e-android-sdk-activities',
        source: 'android-sdk',
        target: 'activities',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-android-sdk-intents',
        source: 'android-sdk',
        target: 'intents',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-android-sdk-services',
        source: 'android-sdk',
        target: 'services',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // Android SDK to UI Design
    {
        id: 'e-android-sdk-ui-design',
        source: 'android-sdk',
        target: 'ui-design',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeWidth: 2,
        },
    },
    // UI Design to subnodes
    {
        id: 'e-ui-design-xml-layouts',
        source: 'ui-design',
        target: 'xml-layouts',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-ui-design-jetpack-compose',
        source: 'ui-design',
        target: 'jetpack-compose',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-ui-design-material-design',
        source: 'ui-design',
        target: 'material-design',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // UI Design to Databases
    {
        id: 'e-ui-design-databases',
        source: 'ui-design',
        target: 'databases',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeWidth: 2,
        },
    },
    // Databases to subnodes
    {
        id: 'e-databases-sqlite',
        source: 'databases',
        target: 'sqlite',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-databases-room',
        source: 'databases',
        target: 'room',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-databases-firebase',
        source: 'databases',
        target: 'firebase',
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
        id: 'e-apis-retrofit',
        source: 'apis',
        target: 'retrofit',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-apis-volley',
        source: 'apis',
        target: 'volley',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // APIs to Architecture
    {
        id: 'e-apis-architecture',
        source: 'apis',
        target: 'architecture',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeWidth: 2,
        },
    },
    // Architecture to subnodes
    {
        id: 'e-architecture-mvvm',
        source: 'architecture',
        target: 'mvvm',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-architecture-mvp',
        source: 'architecture',
        target: 'mvp',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-architecture-jetpack',
        source: 'architecture',
        target: 'jetpack',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // Architecture to Testing
    {
        id: 'e-architecture-testing',
        source: 'architecture',
        target: 'testing',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeWidth: 2,
        },
    },
    // Testing to subnodes
    {
        id: 'e-testing-junit',
        source: 'testing',
        target: 'junit',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-testing-espresso',
        source: 'testing',
        target: 'espresso',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-testing-mockito',
        source: 'testing',
        target: 'mockito',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
];
