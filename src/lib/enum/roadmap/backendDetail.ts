// lib/enum/roadmap/backendDetail.ts
interface NodeDetail {
    title: string;
    description: string;
    resources: {
        free: { type: string; title: string; url: string }[];
        premium: { type: string; title: string; url: string; discount?: string }[];
    };
}

export const backendDetails: { [key: string]: NodeDetail } = {
    node: {
        title: 'Node.js Basics',
        description: 'Get started with Node.js for server-side development.',
        resources: {
            free: [
                { type: 'Article', title: 'Node.js Basics', url: 'https://example.com/node' },
                {
                    type: 'Video',
                    title: 'Node.js for Beginners',
                    url: 'https://example.com/node-video',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Node.js Advanced',
                    url: 'https://example.com/node-advanced',
                    discount: '15% Off',
                },
            ],
        },
    },
    python: {
        title: 'Python Basics',
        description: 'Learn Python for backend development and scripting.',
        resources: {
            free: [
                { type: 'Article', title: 'Python Basics', url: 'https://example.com/python' },
                {
                    type: 'Tutorial',
                    title: 'Python for Beginners',
                    url: 'https://example.com/python-tutorial',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Python Mastery',
                    url: 'https://example.com/python-mastery',
                    discount: '20% Off',
                },
            ],
        },
    },
    default: {
        title: 'Node Details',
        description: 'General information about this topic.',
        resources: {
            free: [
                { type: 'Article', title: 'General Resource', url: 'https://example.com/general' },
            ],
            premium: [],
        },
    },
};
