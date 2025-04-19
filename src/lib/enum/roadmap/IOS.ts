import { Edge, Node } from '@xyflow/react';

type CustomNodeData = {
    label: string;
};

// Nodes for the iOS roadmap
export const IOSNodes: Node<Partial<CustomNodeData>>[] = [
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
        id: 'swift',
        position: { x: 600, y: -900 },
        data: { label: 'Swift' },
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
        id: 'objc',
        position: { x: 600, y: -850 },
        data: { label: 'Objective-C' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 220,
            textAlign: 'center',
        },
    },
    // iOS Frameworks Node
    {
        id: 'ios-frameworks',
        position: { x: 320, y: -600 },
        data: { label: 'iOS Frameworks' },
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
    // iOS Frameworks subnodes
    {
        id: 'uikit',
        position: { x: 100, y: -650 },
        data: { label: 'UIKit' },
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
        id: 'swiftui',
        position: { x: 100, y: -600 },
        data: { label: 'SwiftUI' },
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
        id: 'foundation',
        position: { x: 100, y: -550 },
        data: { label: 'Foundation' },
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
        id: 'storyboards',
        position: { x: 600, y: -450 },
        data: { label: 'Storyboards' },
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
        id: 'xibs',
        position: { x: 600, y: -400 },
        data: { label: 'XIBs' },
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
        id: 'human-guidelines',
        position: { x: 600, y: -350 },
        data: { label: 'Human Interface Guidelines' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 220,
            textAlign: 'center',
        },
    },
    // Data Persistence Node
    {
        id: 'data-persistence',
        position: { x: 320, y: -200 },
        data: { label: 'Data Persistence' },
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
    // Data Persistence subnodes
    {
        id: 'core-data',
        position: { x: 100, y: -250 },
        data: { label: 'Core Data' },
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
        id: 'realm',
        position: { x: 100, y: -200 },
        data: { label: 'Realm' },
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
        id: 'cloudkit',
        position: { x: 100, y: -150 },
        data: { label: 'CloudKit' },
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
        id: 'alamofire',
        position: { x: 600, y: 0 },
        data: { label: 'Alamofire' },
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
        id: 'urlsession',
        position: { x: 600, y: 50 },
        data: { label: 'URLSession' },
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
        id: 'mvc',
        position: { x: 100, y: 150 },
        data: { label: 'MVC' },
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
        id: 'mvvm',
        position: { x: 100, y: 200 },
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
        id: 'viper',
        position: { x: 100, y: 250 },
        data: { label: 'VIPER' },
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
        id: 'xctest',
        position: { x: 600, y: 350 },
        data: { label: 'XCTest' },
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
        id: 'xcuitest',
        position: { x: 600, y: 400 },
        data: { label: 'XCUITest' },
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
        id: 'quick-nimble',
        position: { x: 600, y: 450 },
        data: { label: 'Quick/Nimble' },
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

// Edges for the iOS roadmap
export const IOSEdges: Edge[] = [
    // Languages to subnodes
    {
        id: 'e-languages-swift',
        source: 'languages',
        target: 'swift',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-languages-objc',
        source: 'languages',
        target: 'objc',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // Languages to iOS Frameworks
    {
        id: 'e-languages-ios-frameworks',
        source: 'languages',
        target: 'ios-frameworks',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeWidth: 2,
        },
    },
    // iOS Frameworks to subnodes
    {
        id: 'e-ios-frameworks-uikit',
        source: 'ios-frameworks',
        target: 'uikit',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-ios-frameworks-swiftui',
        source: 'ios-frameworks',
        target: 'swiftui',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-ios-frameworks-foundation',
        source: 'ios-frameworks',
        target: 'foundation',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // iOS Frameworks to UI Design
    {
        id: 'e-ios-frameworks-ui-design',
        source: 'ios-frameworks',
        target: 'ui-design',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeWidth: 2,
        },
    },
    // UI Design to subnodes
    {
        id: 'e-ui-design-storyboards',
        source: 'ui-design',
        target: 'storyboards',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-ui-design-xibs',
        source: 'ui-design',
        target: 'xibs',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-ui-design-human-guidelines',
        source: 'ui-design',
        target: 'human-guidelines',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // UI Design to Data Persistence
    {
        id: 'e-ui-design-data-persistence',
        source: 'ui-design',
        target: 'data-persistence',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeWidth: 2,
        },
    },
    // Data Persistence to subnodes
    {
        id: 'e-data-persistence-core-data',
        source: 'data-persistence',
        target: 'core-data',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-data-persistence-realm',
        source: 'data-persistence',
        target: 'realm',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-data-persistence-cloudkit',
        source: 'data-persistence',
        target: 'cloudkit',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // Data Persistence to APIs
    {
        id: 'e-data-persistence-apis',
        source: 'data-persistence',
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
        id: 'e-apis-alamofire',
        source: 'apis',
        target: 'alamofire',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-apis-urlsession',
        source: 'apis',
        target: 'urlsession',
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
        id: 'e-architecture-mvc',
        source: 'architecture',
        target: 'mvc',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
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
        id: 'e-architecture-viper',
        source: 'architecture',
        target: 'viper',
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
        id: 'e-testing-xctest',
        source: 'testing',
        target: 'xctest',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-testing-xcuitest',
        source: 'testing',
        target: 'xcuitest',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-testing-quick-nimble',
        source: 'testing',
        target: 'quick-nimble',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
];
