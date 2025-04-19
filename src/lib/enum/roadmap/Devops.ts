import { Edge, Node } from '@xyflow/react';

type CustomNodeData = {
    label: string;
};

// Nodes for the DevOps roadmap
export const DevOpsNodes: Node<Partial<CustomNodeData>>[] = [
    // Linux Node (Central Node)
    {
        id: 'linux',
        position: { x: 320, y: -800 },
        data: { label: 'Linux' },
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
    // Linux subnodes
    {
        id: 'bash',
        position: { x: 600, y: -950 },
        data: { label: 'Bash Scripting' },
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
        id: 'commands',
        position: { x: 600, y: -900 },
        data: { label: 'Linux Commands' },
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
        id: 'permissions',
        position: { x: 600, y: -850 },
        data: { label: 'File Permissions' },
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
        position: { x: 320, y: -600 },
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
        position: { x: 100, y: -650 },
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
        position: { x: 100, y: -600 },
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
        position: { x: 100, y: -550 },
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
    // Containers Node
    {
        id: 'containers',
        position: { x: 320, y: -400 },
        data: { label: 'Containers' },
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
    // Containers subnodes
    {
        id: 'docker',
        position: { x: 600, y: -450 },
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
        id: 'kubernetes',
        position: { x: 600, y: -400 },
        data: { label: 'Kubernetes' },
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
        id: 'docker-compose',
        position: { x: 600, y: -350 },
        data: { label: 'Docker Compose' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 220,
            textAlign: 'center',
        },
    },
    // CI/CD Node
    {
        id: 'ci-cd',
        position: { x: 320, y: -200 },
        data: { label: 'CI/CD' },
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
    // CI/CD subnodes
    {
        id: 'jenkins',
        position: { x: 100, y: -250 },
        data: { label: 'Jenkins' },
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
        id: 'github-actions',
        position: { x: 100, y: -200 },
        data: { label: 'GitHub Actions' },
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
        id: 'circleci',
        position: { x: 100, y: -150 },
        data: { label: 'CircleCI' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 220,
            textAlign: 'center',
        },
    },
    // Cloud Providers Node
    {
        id: 'cloud-providers',
        position: { x: 320, y: 0 },
        data: { label: 'Cloud Providers' },
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
    // Cloud Providers subnodes
    {
        id: 'aws',
        position: { x: 600, y: -50 },
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
        id: 'azure',
        position: { x: 600, y: 0 },
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
    {
        id: 'gcp',
        position: { x: 600, y: 50 },
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
    // Monitoring Node
    {
        id: 'monitoring',
        position: { x: 320, y: 200 },
        data: { label: 'Monitoring & Logging' },
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
    // Monitoring subnodes
    {
        id: 'prometheus',
        position: { x: 100, y: 150 },
        data: { label: 'Prometheus' },
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
        id: 'grafana',
        position: { x: 100, y: 200 },
        data: { label: 'Grafana' },
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
        id: 'elk',
        position: { x: 100, y: 250 },
        data: { label: 'ELK Stack' },
        style: {
            background: '#ffe09b',
            border: '2px solid #000',
            borderRadius: 12,
            padding: 10,
            width: 220,
            textAlign: 'center',
        },
    },
    // Infrastructure as Code Node
    {
        id: 'iac',
        position: { x: 320, y: 400 },
        data: { label: 'Infrastructure as Code' },
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
    // IaC subnodes
    {
        id: 'terraform',
        position: { x: 600, y: 350 },
        data: { label: 'Terraform' },
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
        id: 'ansible',
        position: { x: 600, y: 400 },
        data: { label: 'Ansible' },
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
        id: 'cloudformation',
        position: { x: 600, y: 450 },
        data: { label: 'AWS CloudFormation' },
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

// Edges for the DevOps roadmap
export const DevOpsEdges: Edge[] = [
    // Linux to subnodes
    {
        id: 'e-linux-bash',
        source: 'linux',
        target: 'bash',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-linux-commands',
        source: 'linux',
        target: 'commands',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-linux-permissions',
        source: 'linux',
        target: 'permissions',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // Linux to VCS
    {
        id: 'e-linux-vcs',
        source: 'linux',
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
    // VCS to Containers
    {
        id: 'e-vcs-containers',
        source: 'vcs',
        target: 'containers',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeWidth: 2,
        },
    },
    // Containers to subnodes
    {
        id: 'e-containers-docker',
        source: 'containers',
        target: 'docker',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-containers-kubernetes',
        source: 'containers',
        target: 'kubernetes',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-containers-docker-compose',
        source: 'containers',
        target: 'docker-compose',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // Containers to CI/CD
    {
        id: 'e-containers-ci-cd',
        source: 'containers',
        target: 'ci-cd',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeWidth: 2,
        },
    },
    // CI/CD to subnodes
    {
        id: 'e-ci-cd-jenkins',
        source: 'ci-cd',
        target: 'jenkins',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-ci-cd-github-actions',
        source: 'ci-cd',
        target: 'github-actions',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-ci-cd-circleci',
        source: 'ci-cd',
        target: 'circleci',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // CI/CD to Cloud Providers
    {
        id: 'e-ci-cd-cloud-providers',
        source: 'ci-cd',
        target: 'cloud-providers',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeWidth: 2,
        },
    },
    // Cloud Providers to subnodes
    {
        id: 'e-cloud-providers-aws',
        source: 'cloud-providers',
        target: 'aws',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-cloud-providers-azure',
        source: 'cloud-providers',
        target: 'azure',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-cloud-providers-gcp',
        source: 'cloud-providers',
        target: 'gcp',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // Cloud Providers to Monitoring
    {
        id: 'e-cloud-providers-monitoring',
        source: 'cloud-providers',
        target: 'monitoring',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeWidth: 2,
        },
    },
    // Monitoring to subnodes
    {
        id: 'e-monitoring-prometheus',
        source: 'monitoring',
        target: 'prometheus',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-monitoring-grafana',
        source: 'monitoring',
        target: 'grafana',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-monitoring-elk',
        source: 'monitoring',
        target: 'elk',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    // Monitoring to IaC
    {
        id: 'e-monitoring-iac',
        source: 'monitoring',
        target: 'iac',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeWidth: 2,
        },
    },
    // IaC to subnodes
    {
        id: 'e-iac-terraform',
        source: 'iac',
        target: 'terraform',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-iac-ansible',
        source: 'iac',
        target: 'ansible',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
    {
        id: 'e-iac-cloudformation',
        source: 'iac',
        target: 'cloudformation',
        type: 'smoothstep',
        style: {
            stroke: '#2e90fa',
            strokeDasharray: '6',
            strokeWidth: 2,
        },
    },
];
