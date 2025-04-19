import { Edge, Node } from '@xyflow/react';

type CustomNodeData = {
    label: string;
};

// Nodes for the AI/Data Scientist roadmap
export const AIDataScientistNodes: Node<Partial<CustomNodeData>>[] = [
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
        id: 'python',
        position: { x: 600, y: -900 },
        data: { label: 'Python' },
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
        id: 'r',
        position: { x: 600, y: -850 },
        data: { label: 'R' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 220,
            textAlign: 'center',
        },
    },
    // Mathematics & Statistics Node
    {
        id: 'math-stats',
        position: { x: 320, y: -600 },
        data: { label: 'Mathematics & Statistics' },
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
    // Mathematics & Statistics subnodes
    {
        id: 'linear-algebra',
        position: { x: 100, y: -650 },
        data: { label: 'Linear Algebra' },
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
        id: 'calculus',
        position: { x: 100, y: -600 },
        data: { label: 'Calculus' },
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
        id: 'probability',
        position: { x: 100, y: -550 },
        data: { label: 'Probability & Statistics' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 220,
            textAlign: 'center',
        },
    },
    // Data Processing Node
    {
        id: 'data-processing',
        position: { x: 320, y: -400 },
        data: { label: 'Data Processing' },
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
    // Data Processing subnodes
    {
        id: 'pandas',
        position: { x: 600, y: -450 },
        data: { label: 'Pandas' },
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
        id: 'numpy',
        position: { x: 600, y: -400 },
        data: { label: 'NumPy' },
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
        id: 'sql',
        position: { x: 600, y: -350 },
        data: { label: 'SQL' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 220,
            textAlign: 'center',
        },
    },
    // Machine Learning Node
    {
        id: 'machine-learning',
        position: { x: 320, y: -200 },
        data: { label: 'Machine Learning' },
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
    // Machine Learning subnodes
    {
        id: 'scikit-learn',
        position: { x: 100, y: -250 },
        data: { label: 'Scikit-learn' },
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
        id: 'xgboost',
        position: { x: 100, y: -200 },
        data: { label: 'XGBoost' },
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
        id: 'lightgbm',
        position: { x: 100, y: -150 },
        data: { label: 'LightGBM' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 220,
            textAlign: 'center',
        },
    },
    // Deep Learning Node
    {
        id: 'deep-learning',
        position: { x: 320, y: 0 },
        data: { label: 'Deep Learning' },
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
    // Deep Learning subnodes
    {
        id: 'tensorflow',
        position: { x: 600, y: -50 },
        data: { label: 'TensorFlow' },
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
        id: 'pytorch',
        position: { x: 600, y: 0 },
        data: { label: 'PyTorch' },
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
        id: 'keras',
        position: { x: 600, y: 50 },
        data: { label: 'Keras' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 220,
            textAlign: 'center',
        },
    },
    // Data Visualization Node
    {
        id: 'data-visualization',
        position: { x: 320, y: 200 },
        data: { label: 'Data Visualization' },
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
    // Data Visualization subnodes
    {
        id: 'matplotlib',
        position: { x: 100, y: 150 },
        data: { label: 'Matplotlib' },
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
        id: 'seaborn',
        position: { x: 100, y: 200 },
        data: { label: 'Seaborn' },
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
        id: 'tableau',
        position: { x: 100, y: 250 },
        data: { label: 'Tableau' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 220,
            textAlign: 'center',
        },
    },
    // Deployment & Cloud Node
    {
        id: 'deployment-cloud',
        position: { x: 320, y: 400 },
        data: { label: 'Deployment & Cloud' },
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
    // Deployment & Cloud subnodes
    {
        id: 'aws',
        position: { x: 600, y: 350 },
        data: { label: 'AWS' },
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
        id: 'gcp',
        position: { x: 600, y: 400 },
        data: { label: 'Google Cloud Platform' },
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
        id: 'azure',
        position: { x: 600, y: 450 },
        data: { label: 'Azure' },
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

// Edges for the AI/Data Scientist roadmap
export const AIDataScientistEdges: Edge[] = [
    // Languages to subnodes
    {
        id: 'e-languages-python',
        source: 'languages',
        target: 'python',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-languages-r',
        source: 'languages',
        target: 'r',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // Languages to Mathematics & Statistics
    {
        id: 'e-languages-math-stats',
        source: 'languages',
        target: 'math-stats',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeWidth: 2,
        },
    },
    // Mathematics & Statistics to subnodes
    {
        id: 'e-math-stats-linear-algebra',
        source: 'math-stats',
        target: 'linear-algebra',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-math-stats-calculus',
        source: 'math-stats',
        target: 'calculus',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-math-stats-probability',
        source: 'math-stats',
        target: 'probability',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // Mathematics & Statistics to Data Processing
    {
        id: 'e-math-stats-data-processing',
        source: 'math-stats',
        target: 'data-processing',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeWidth: 2,
        },
    },
    // Data Processing to subnodes
    {
        id: 'e-data-processing-pandas',
        source: 'data-processing',
        target: 'pandas',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-data-processing-numpy',
        source: 'data-processing',
        target: 'numpy',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-data-processing-sql',
        source: 'data-processing',
        target: 'sql',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // Data Processing to Machine Learning
    {
        id: 'e-data-processing-machine-learning',
        source: 'data-processing',
        target: 'machine-learning',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeWidth: 2,
        },
    },
    // Machine Learning to subnodes
    {
        id: 'e-machine-learning-scikit-learn',
        source: 'machine-learning',
        target: 'scikit-learn',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-machine-learning-xgboost',
        source: 'machine-learning',
        target: 'xgboost',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-machine-learning-lightgbm',
        source: 'machine-learning',
        target: 'lightgbm',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // Machine Learning to Deep Learning
    {
        id: 'e-machine-learning-deep-learning',
        source: 'machine-learning',
        target: 'deep-learning',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeWidth: 2,
        },
    },
    // Deep Learning to subnodes
    {
        id: 'e-deep-learning-tensorflow',
        source: 'deep-learning',
        target: 'tensorflow',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-deep-learning-pytorch',
        source: 'deep-learning',
        target: 'pytorch',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-deep-learning-keras',
        source: 'deep-learning',
        target: 'keras',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // Deep Learning to Data Visualization
    {
        id: 'e-deep-learning-data-visualization',
        source: 'deep-learning',
        target: 'data-visualization',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeWidth: 2,
        },
    },
    // Data Visualization to subnodes
    {
        id: 'e-data-visualization-matplotlib',
        source: 'data-visualization',
        target: 'matplotlib',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-data-visualization-seaborn',
        source: 'data-visualization',
        target: 'seaborn',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-data-visualization-tableau',
        source: 'data-visualization',
        target: 'tableau',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // Data Visualization to Deployment & Cloud
    {
        id: 'e-data-visualization-deployment-cloud',
        source: 'data-visualization',
        target: 'deployment-cloud',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeWidth: 2,
        },
    },
    // Deployment & Cloud to subnodes
    {
        id: 'e-deployment-cloud-aws',
        source: 'deployment-cloud',
        target: 'aws',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-deployment-cloud-gcp',
        source: 'deployment-cloud',
        target: 'gcp',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-deployment-cloud-azure',
        source: 'deployment-cloud',
        target: 'azure',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
];
