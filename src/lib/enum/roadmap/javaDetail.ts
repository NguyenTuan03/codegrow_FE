// lib/enum/roadmap/javaDetail.ts
interface NodeDetail {
    title: string;
    description: string;
    resources: {
        free: { type: string; title: string; url: string }[];
        premium: { type: string; title: string; url: string; discount?: string }[];
    };
}

export const javaDetails: { [key: string]: NodeDetail } = {
    'java-basics': {
        title: 'Java Basics',
        description: 'Understand the core concepts of Java programming.',
        resources: {
            free: [
                { type: 'Article', title: 'Java Basics', url: 'https://example.com/java' },
                {
                    type: 'Video',
                    title: 'Java Introduction',
                    url: 'https://example.com/java-video',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Java Fundamentals',
                    url: 'https://example.com/java-fundamentals',
                    discount: '15% Off',
                },
            ],
        },
    },
    'java-ee': {
        title: 'Java EE',
        description: 'Explore Java Enterprise Edition for enterprise applications.',
        resources: {
            free: [
                { type: 'Article', title: 'Java EE Basics', url: 'https://example.com/java-ee' },
                {
                    type: 'Tutorial',
                    title: 'Java EE Guide',
                    url: 'https://example.com/java-ee-guide',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Java EE Advanced',
                    url: 'https://example.com/java-ee-advanced',
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
