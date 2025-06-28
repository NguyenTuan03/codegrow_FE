interface NodeDetail {
    title: string;
    description: string;
    prerequisites?: string[]; // Optional list of prerequisites
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced'; // Difficulty level
    estimatedTime: string; // Estimated time to learn (e.g., "2 hours")
    imageUrl?: string; // Optional URL for an image or icon
    resources: {
        free: { type: string; title: string; url: string }[];
        premium: { type: string; title: string; url: string; discount?: string }[];
    };
}

export const backendDetails: { [key: string]: NodeDetail } = {
    node: {
        title: 'Node.js Basics',
        description:
            'Get started with Node.js for server-side development, including handling HTTP requests and building APIs.',
        prerequisites: [],
        difficulty: 'Beginner',
        estimatedTime: '3 hours',
        imageUrl: 'https://example.com/images/node.jpg',
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
                {
                    type: 'Course',
                    title: 'Node.js API Development by Udemy',
                    url: 'https://www.udemy.com/node-api',
                    discount: '10% Off with CODE: BACKEND10',
                },
                {
                    type: 'Certification',
                    title: 'Node.js Certification by Coursera',
                    url: 'https://www.coursera.org/node-cert',
                    discount: '20% Off with CODE: BACKEND20',
                },
            ],
        },
    },
    python: {
        title: 'Python Basics',
        description:
            'Learn Python for backend development and scripting, including data handling and automation.',
        prerequisites: [],
        difficulty: 'Beginner',
        estimatedTime: '3.5 hours',
        imageUrl: 'https://example.com/images/python.jpg',
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
                {
                    type: 'Course',
                    title: 'Python for Backend by Pluralsight',
                    url: 'https://www.pluralsight.com/python-backend',
                    discount: '15% Off',
                },
                {
                    type: 'Certification',
                    title: 'Python Developer Certification by Udemy',
                    url: 'https://www.udemy.com/python-cert',
                    discount: '15% Off with CODE: BACKEND15',
                },
            ],
        },
    },
    databases: {
        title: 'Database Fundamentals',
        description:
            'Learn the basics of databases, including SQL and NoSQL, for storing and retrieving data.',
        prerequisites: ['Node.js Basics', 'Python Basics'],
        difficulty: 'Intermediate',
        estimatedTime: '4 hours',
        imageUrl: 'https://example.com/images/databases.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'Database Basics', url: 'https://example.com/databases' },
                {
                    type: 'Video',
                    title: 'SQL for Beginners',
                    url: 'https://example.com/sql-video',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Database Design by Coursera',
                    url: 'https://www.coursera.org/database-design',
                    discount: '20% Off with CODE: BACKEND20',
                },
                {
                    type: 'Course',
                    title: 'NoSQL Essentials by Udemy',
                    url: 'https://www.udemy.com/nosql-essentials',
                    discount: '10% Off with CODE: BACKEND10',
                },
            ],
        },
    },
    apis: {
        title: 'API Development',
        description: 'Master building and consuming APIs using REST and GraphQL.',
        prerequisites: ['Node.js Basics'],
        difficulty: 'Intermediate',
        estimatedTime: '3.5 hours',
        imageUrl: 'https://example.com/images/apis.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'API Basics', url: 'https://example.com/apis' },
                {
                    type: 'Tutorial',
                    title: 'REST API Guide',
                    url: 'https://example.com/rest-api',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'REST API Development by Pluralsight',
                    url: 'https://www.pluralsight.com/rest-api',
                    discount: '15% Off',
                },
                {
                    type: 'Course',
                    title: 'GraphQL Fundamentals by Udemy',
                    url: 'https://www.udemy.com/graphql-fundamentals',
                    discount: '10% Off with CODE: BACKEND10',
                },
            ],
        },
    },
    servers: {
        title: 'Server Management',
        description: 'Learn to manage servers, including deployment and scaling techniques.',
        prerequisites: ['Node.js Basics', 'Python Basics'],
        difficulty: 'Advanced',
        estimatedTime: '4.5 hours',
        imageUrl: 'https://example.com/images/servers.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'Server Basics', url: 'https://example.com/servers' },
                {
                    type: 'Video',
                    title: 'Server Deployment Guide',
                    url: 'https://example.com/server-video',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Server Administration by Coursera',
                    url: 'https://www.coursera.org/server-admin',
                    discount: '20% Off with CODE: BACKEND20',
                },
                {
                    type: 'Certification',
                    title: 'Server Scaling by Pluralsight',
                    url: 'https://www.pluralsight.com/server-scaling',
                    discount: '15% Off',
                },
            ],
        },
    },
    default: {
        title: 'Node Details',
        description: 'General information about this topic.',
        prerequisites: [],
        difficulty: 'Beginner',
        estimatedTime: '1 hour',
        imageUrl: 'https://example.com/images/default.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'General Resource', url: 'https://example.com/general' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'General Backend Intro by Udemy',
                    url: 'https://www.udemy.com/general-backend',
                    discount: '10% Off with CODE: BACKEND10',
                },
            ],
        },
    },
};
