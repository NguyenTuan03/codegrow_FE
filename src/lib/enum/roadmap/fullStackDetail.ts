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

export const fullstackDetails: { [key: string]: NodeDetail } = {
    internet: {
        title: 'Internet',
        description:
            'Understand the foundational concepts of the internet, including how it connects devices globally and facilitates data communication.',
        prerequisites: [],
        difficulty: 'Beginner',
        estimatedTime: '2 hours',
        imageUrl: 'https://example.com/images/internet.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'Internet Basics', url: 'https://example.com/internet' },
                {
                    type: 'Video',
                    title: 'Internet Overview',
                    url: 'https://example.com/internet-video',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Internet Fundamentals by Udemy',
                    url: 'https://www.udemy.com/internet-fundamentals',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
                {
                    type: 'Course',
                    title: 'Internet Architecture by Coursera',
                    url: 'https://www.coursera.org/internet-architecture',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
            ],
        },
    },
    'how-internet': {
        title: 'How does the internet work?',
        description:
            'Explore the infrastructure and data flow of the internet, including protocols and network layers.',
        prerequisites: ['internet'],
        difficulty: 'Beginner',
        estimatedTime: '1.5 hours',
        imageUrl: 'https://example.com/images/how-internet.jpg',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'Internet Working',
                    url: 'https://example.com/internet-working',
                },
                { type: 'Video', title: 'Internet Flow', url: 'https://example.com/internet-flow' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Internet Operations by Udemy',
                    url: 'https://www.udemy.com/internet-operations',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
                {
                    type: 'Course',
                    title: 'Network Basics by Coursera',
                    url: 'https://www.coursera.org/network-basics',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
            ],
        },
    },
    http: {
        title: 'What is HTTP/HTTPS?',
        description:
            'Learn about the HyperText Transfer Protocol and its secure version (HTTPS) for web communication.',
        prerequisites: ['internet'],
        difficulty: 'Beginner',
        estimatedTime: '1 hour',
        imageUrl: 'https://example.com/images/http.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'HTTP Guide', url: 'https://example.com/http-guide' },
                { type: 'Video', title: 'HTTP Basics', url: 'https://example.com/http-video' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'HTTP Essentials by Pluralsight',
                    url: 'https://www.pluralsight.com/http-essentials',
                    discount: '15% Off',
                },
                {
                    type: 'Course',
                    title: 'HTTPS Security by Udemy',
                    url: 'https://www.udemy.com/https-security',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
            ],
        },
    },
    dns: {
        title: 'DNS and how it works?',
        description:
            'Understand the Domain Name System and its role in translating domain names to IP addresses.',
        prerequisites: ['internet'],
        difficulty: 'Beginner',
        estimatedTime: '1 hour',
        imageUrl: 'https://example.com/images/dns.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'DNS Basics', url: 'https://example.com/dns-basics' },
                { type: 'Video', title: 'DNS Tutorial', url: 'https://example.com/dns-video' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'DNS Mastery by Coursera',
                    url: 'https://www.coursera.org/dns-mastery',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
                {
                    type: 'Course',
                    title: 'DNS Configuration by Udemy',
                    url: 'https://www.udemy.com/dns-configuration',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
            ],
        },
    },
    servers: {
        title: 'What are Servers?',
        description:
            'Learn about server types, their roles, and how they support web applications.',
        prerequisites: ['internet'],
        difficulty: 'Beginner',
        estimatedTime: '1.5 hours',
        imageUrl: 'https://example.com/images/servers.jpg',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'Server Basics',
                    url: 'https://example.com/server-basics',
                },
                { type: 'Video', title: 'Server Intro', url: 'https://example.com/server-video' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Server Fundamentals by Pluralsight',
                    url: 'https://www.pluralsight.com/server-fundamentals',
                    discount: '15% Off',
                },
                {
                    type: 'Course',
                    title: 'Server Management by Udemy',
                    url: 'https://www.udemy.com/server-management',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
            ],
        },
    },
    rest: {
        title: 'REST API Basics',
        description:
            'Get introduced to RESTful APIs, including endpoints, methods, and best practices.',
        prerequisites: ['internet'],
        difficulty: 'Beginner',
        estimatedTime: '1.5 hours',
        imageUrl: 'https://example.com/images/rest.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'REST Basics', url: 'https://example.com/rest-basics' },
                { type: 'Video', title: 'REST Intro', url: 'https://example.com/rest-video' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'REST API Intro by Coursera',
                    url: 'https://www.coursera.org/rest-api-intro',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
                {
                    type: 'Course',
                    title: 'REST Fundamentals by Udemy',
                    url: 'https://www.udemy.com/rest-fundamentals',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
            ],
        },
    },
    frontend: {
        title: 'Frontend',
        description:
            'Build interactive user interfaces using HTML, CSS, JavaScript, and frameworks like React.',
        prerequisites: ['internet'],
        difficulty: 'Intermediate',
        estimatedTime: '5 hours',
        imageUrl: 'https://example.com/images/frontend.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'Frontend Basics', url: 'https://example.com/frontend' },
                {
                    type: 'Tutorial',
                    title: 'React Quick Start',
                    url: 'https://example.com/react-quick',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Frontend Development by Pluralsight',
                    url: 'https://www.pluralsight.com/frontend-dev',
                    discount: '15% Off',
                },
                {
                    type: 'Certification',
                    title: 'Frontend Cert by Coursera',
                    url: 'https://www.coursera.org/frontend-cert',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
            ],
        },
    },
    html: {
        title: 'HTML',
        description: 'Learn the basics of HTML to structure web content with tags and elements.',
        prerequisites: ['frontend'],
        difficulty: 'Beginner',
        estimatedTime: '2 hours',
        imageUrl: 'https://example.com/images/html.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'HTML Basics', url: 'https://example.com/html' },
                {
                    type: 'Tutorial',
                    title: 'HTML for Beginners',
                    url: 'https://example.com/html-beginner',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'HTML Fundamentals by Udemy',
                    url: 'https://www.udemy.com/html-fundamentals',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
                {
                    type: 'Course',
                    title: 'HTML Advanced by Coursera',
                    url: 'https://www.coursera.org/html-advanced',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
            ],
        },
    },
    css: {
        title: 'CSS',
        description: 'Master CSS to style and layout web pages with responsive design techniques.',
        prerequisites: ['frontend'],
        difficulty: 'Beginner',
        estimatedTime: '2.5 hours',
        imageUrl: 'https://example.com/images/css.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'CSS Basics', url: 'https://example.com/css' },
                { type: 'Video', title: 'CSS Tutorial', url: 'https://example.com/css-video' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'CSS Mastery by Pluralsight',
                    url: 'https://www.pluralsight.com/css-mastery',
                    discount: '15% Off',
                },
                {
                    type: 'Certification',
                    title: 'CSS Cert by Coursera',
                    url: 'https://www.coursera.org/css-cert',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
            ],
        },
    },
    javascript: {
        title: 'JavaScript',
        description:
            'Learn JavaScript to add interactivity and dynamic behavior to web applications.',
        prerequisites: ['frontend'],
        difficulty: 'Beginner',
        estimatedTime: '3 hours',
        imageUrl: 'https://example.com/images/javascript.jpg',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'JavaScript Basics',
                    url: 'https://example.com/javascript',
                },
                { type: 'Video', title: 'JS Intro', url: 'https://example.com/js-video' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'JavaScript Essentials by Udemy',
                    url: 'https://www.udemy.com/javascript-essentials',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
                {
                    type: 'Course',
                    title: 'JavaScript Advanced by Coursera',
                    url: 'https://www.coursera.org/js-advanced',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
            ],
        },
    },
    react: {
        title: 'React',
        description: 'Build dynamic user interfaces with React, a popular JavaScript library.',
        prerequisites: ['frontend', 'javascript'],
        difficulty: 'Intermediate',
        estimatedTime: '3.5 hours',
        imageUrl: 'https://example.com/images/react.jpg',
        resources: {
            free: [
                { type: 'Tutorial', title: 'React Basics', url: 'https://example.com/react' },
                { type: 'Video', title: 'React Intro', url: 'https://example.com/react-video' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'React Fundamentals by Pluralsight',
                    url: 'https://www.pluralsight.com/react-fundamentals',
                    discount: '15% Off',
                },
                {
                    type: 'Certification',
                    title: 'React Cert by Coursera',
                    url: 'https://www.coursera.org/react-cert',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
            ],
        },
    },
    backend: {
        title: 'Backend',
        description:
            'Develop server-side logic and APIs using Node.js, Express.js, and middleware.',
        prerequisites: ['internet'],
        difficulty: 'Intermediate',
        estimatedTime: '5.5 hours',
        imageUrl: 'https://example.com/images/backend.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'Backend Basics', url: 'https://example.com/backend' },
                { type: 'Video', title: 'Node.js Intro', url: 'https://example.com/node-video' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Backend Development by Udemy',
                    url: 'https://www.udemy.com/backend-dev',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
                {
                    type: 'Course',
                    title: 'Node.js Mastery by Coursera',
                    url: 'https://www.coursera.org/node-mastery',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
            ],
        },
    },
    nodejs: {
        title: 'Node.js',
        description:
            'Use Node.js to build scalable network applications with JavaScript on the server.',
        prerequisites: ['backend'],
        difficulty: 'Intermediate',
        estimatedTime: '3 hours',
        imageUrl: 'https://example.com/images/nodejs.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'Node.js Basics', url: 'https://example.com/nodejs' },
                {
                    type: 'Tutorial',
                    title: 'Node.js Guide',
                    url: 'https://example.com/nodejs-guide',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Node.js Deep Dive by Pluralsight',
                    url: 'https://www.pluralsight.com/node-deep-dive',
                    discount: '15% Off',
                },
                {
                    type: 'Course',
                    title: 'Node.js by Udemy',
                    url: 'https://www.udemy.com/node-js',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
            ],
        },
    },
    express: {
        title: 'Express.js',
        description:
            'Build web applications and APIs quickly with the Express.js framework for Node.js.',
        prerequisites: ['backend', 'nodejs'],
        difficulty: 'Intermediate',
        estimatedTime: '2.5 hours',
        imageUrl: 'https://example.com/images/express.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'Express Basics', url: 'https://example.com/express' },
                {
                    type: 'Video',
                    title: 'Express Tutorial',
                    url: 'https://example.com/express-video',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Express.js by Coursera',
                    url: 'https://www.coursera.org/express-js',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
                {
                    type: 'Course',
                    title: 'Express Mastery by Udemy',
                    url: 'https://www.udemy.com/express-mastery',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
            ],
        },
    },
    middleware: {
        title: 'Middleware',
        description:
            'Understand middleware in Express.js to handle requests and responses in backend applications.',
        prerequisites: ['backend', 'express'],
        difficulty: 'Intermediate',
        estimatedTime: '2 hours',
        imageUrl: 'https://example.com/images/middleware.jpg',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'Middleware Basics',
                    url: 'https://example.com/middleware',
                },
                {
                    type: 'Tutorial',
                    title: 'Middleware Guide',
                    url: 'https://example.com/middleware-guide',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Middleware in Express by Pluralsight',
                    url: 'https://www.pluralsight.com/middleware-express',
                    discount: '15% Off',
                },
                {
                    type: 'Course',
                    title: 'Express Middleware by Udemy',
                    url: 'https://www.udemy.com/express-middleware',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
            ],
        },
    },
    databases: {
        title: 'Databases',
        description:
            'Manage data with SQL (PostgreSQL, MySQL) and NoSQL (MongoDB) databases for full-stack applications.',
        prerequisites: ['backend'],
        difficulty: 'Intermediate',
        estimatedTime: '4.5 hours',
        imageUrl: 'https://example.com/images/databases.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'Database Basics', url: 'https://example.com/databases' },
                { type: 'Video', title: 'SQL Tutorial', url: 'https://example.com/sql-video' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Database Design by Pluralsight',
                    url: 'https://www.pluralsight.com/db-design',
                    discount: '15% Off',
                },
                {
                    type: 'Course',
                    title: 'MongoDB for Full Stack by Udemy',
                    url: 'https://www.udemy.com/mongodb-fullstack',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
            ],
        },
    },
    sql: {
        title: 'SQL Databases (PostgreSQL, MySQL)',
        description: 'Learn SQL to manage relational databases like PostgreSQL and MySQL.',
        prerequisites: ['databases'],
        difficulty: 'Intermediate',
        estimatedTime: '2.5 hours',
        imageUrl: 'https://example.com/images/sql.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'SQL Basics', url: 'https://example.com/sql' },
                {
                    type: 'Tutorial',
                    title: 'PostgreSQL Guide',
                    url: 'https://example.com/postgres-guide',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'SQL Mastery by Coursera',
                    url: 'https://www.coursera.org/sql-mastery',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
                {
                    type: 'Course',
                    title: 'MySQL Basics by Udemy',
                    url: 'https://www.udemy.com/mysql-basics',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
            ],
        },
    },
    nosql: {
        title: 'NoSQL Databases (MongoDB)',
        description: 'Explore NoSQL databases like MongoDB for flexible data storage.',
        prerequisites: ['databases'],
        difficulty: 'Intermediate',
        estimatedTime: '2.5 hours',
        imageUrl: 'https://example.com/images/nosql.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'NoSQL Basics', url: 'https://example.com/nosql' },
                { type: 'Video', title: 'MongoDB Intro', url: 'https://example.com/mongodb-video' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'MongoDB by Pluralsight',
                    url: 'https://www.pluralsight.com/mongodb',
                    discount: '15% Off',
                },
                {
                    type: 'Course',
                    title: 'NoSQL Advanced by Udemy',
                    url: 'https://www.udemy.com/nosql-advanced',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
            ],
        },
    },
    orm: {
        title: 'ORM (Prisma, Sequelize)',
        description:
            'Use Object-Relational Mapping tools like Prisma and Sequelize to interact with databases.',
        prerequisites: ['databases'],
        difficulty: 'Intermediate',
        estimatedTime: '2 hours',
        imageUrl: 'https://example.com/images/orm.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'ORM Basics', url: 'https://example.com/orm' },
                {
                    type: 'Tutorial',
                    title: 'Prisma Guide',
                    url: 'https://example.com/prisma-guide',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'ORM Fundamentals by Coursera',
                    url: 'https://www.coursera.org/orm-fundamentals',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
                {
                    type: 'Course',
                    title: 'Sequelize by Udemy',
                    url: 'https://www.udemy.com/sequelize',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
            ],
        },
    },
    apis: {
        title: 'APIs',
        description: 'Build and secure APIs using REST and GraphQL for full-stack integration.',
        prerequisites: ['databases'],
        difficulty: 'Intermediate',
        estimatedTime: '5 hours',
        imageUrl: 'https://example.com/images/apis.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'API Basics', url: 'https://example.com/apis' },
                { type: 'Tutorial', title: 'REST API Guide', url: 'https://example.com/rest-api' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'REST API Development by Coursera',
                    url: 'https://www.coursera.org/rest-api',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
                {
                    type: 'Course',
                    title: 'GraphQL Basics by Udemy',
                    url: 'https://www.udemy.com/graphql-basics',
                    discount: '15% Off with CODE: FULLSTACK15',
                },
            ],
        },
    },
    'rest-api': {
        title: 'Building REST APIs',
        description: 'Learn to design and implement RESTful APIs for web applications.',
        prerequisites: ['apis'],
        difficulty: 'Intermediate',
        estimatedTime: '2.5 hours',
        imageUrl: 'https://example.com/images/rest-api.jpg',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'REST API Basics',
                    url: 'https://example.com/rest-api-basics',
                },
                { type: 'Video', title: 'REST Tutorial', url: 'https://example.com/rest-video' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'REST API by Pluralsight',
                    url: 'https://www.pluralsight.com/rest-api',
                    discount: '15% Off',
                },
                {
                    type: 'Course',
                    title: 'REST Development by Udemy',
                    url: 'https://www.udemy.com/rest-development',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
            ],
        },
    },
    graphql: {
        title: 'GraphQL',
        description: 'Master GraphQL for efficient and flexible API development.',
        prerequisites: ['apis'],
        difficulty: 'Intermediate',
        estimatedTime: '2.5 hours',
        imageUrl: 'https://example.com/images/graphql.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'GraphQL Basics', url: 'https://example.com/graphql' },
                {
                    type: 'Tutorial',
                    title: 'GraphQL Guide',
                    url: 'https://example.com/graphql-guide',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'GraphQL by Coursera',
                    url: 'https://www.coursera.org/graphql',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
                {
                    type: 'Course',
                    title: 'GraphQL Advanced by Udemy',
                    url: 'https://www.udemy.com/graphql-advanced',
                    discount: '15% Off with CODE: FULLSTACK15',
                },
            ],
        },
    },
    'api-security': {
        title: 'API Security',
        description: 'Secure APIs with authentication, rate limiting, and encryption techniques.',
        prerequisites: ['apis'],
        difficulty: 'Intermediate',
        estimatedTime: '2 hours',
        imageUrl: 'https://example.com/images/api-security.jpg',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'API Security Basics',
                    url: 'https://example.com/api-security',
                },
                {
                    type: 'Video',
                    title: 'Security Tutorial',
                    url: 'https://example.com/security-video',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'API Security by Pluralsight',
                    url: 'https://www.pluralsight.com/api-security',
                    discount: '15% Off',
                },
                {
                    type: 'Course',
                    title: 'Secure APIs by Udemy',
                    url: 'https://www.udemy.com/secure-apis',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
            ],
        },
    },
    authentication: {
        title: 'Authentication',
        description:
            'Implement secure user authentication using JWT, OAuth 2.0, and session-based methods.',
        prerequisites: ['apis'],
        difficulty: 'Intermediate',
        estimatedTime: '4 hours',
        imageUrl: 'https://example.com/images/authentication.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'Auth Basics', url: 'https://example.com/auth' },
                { type: 'Video', title: 'JWT Tutorial', url: 'https://example.com/jwt-video' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Authentication Security by Pluralsight',
                    url: 'https://www.pluralsight.com/auth-security',
                    discount: '15% Off',
                },
                {
                    type: 'Certification',
                    title: 'OAuth Certification by Coursera',
                    url: 'https://www.coursera.org/oauth-cert',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
            ],
        },
    },
    jwt: {
        title: 'JWT Authentication',
        description:
            'Learn JSON Web Tokens for secure stateless authentication in web applications.',
        prerequisites: ['authentication'],
        difficulty: 'Intermediate',
        estimatedTime: '1.5 hours',
        imageUrl: 'https://example.com/images/jwt.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'JWT Guide', url: 'https://example.com/jwt-guide' },
                { type: 'Video', title: 'JWT Basics', url: 'https://example.com/jwt-video' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'JWT Security by Udemy',
                    url: 'https://www.udemy.com/jwt-security',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
                {
                    type: 'Course',
                    title: 'JWT by Coursera',
                    url: 'https://www.coursera.org/jwt',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
            ],
        },
    },
    oauth: {
        title: 'OAuth 2.0',
        description: 'Master OAuth 2.0 for secure authorization in web and mobile applications.',
        prerequisites: ['authentication'],
        difficulty: 'Intermediate',
        estimatedTime: '2 hours',
        imageUrl: 'https://example.com/images/oauth.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'OAuth Basics', url: 'https://example.com/oauth-basics' },
                { type: 'Tutorial', title: 'OAuth Guide', url: 'https://example.com/oauth-guide' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'OAuth 2.0 by Pluralsight',
                    url: 'https://www.pluralsight.com/oauth-2',
                    discount: '15% Off',
                },
                {
                    type: 'Course',
                    title: 'OAuth Security by Udemy',
                    url: 'https://www.udemy.com/oauth-security',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
            ],
        },
    },
    session: {
        title: 'Session-based Auth',
        description: 'Understand session-based authentication for stateful web applications.',
        prerequisites: ['authentication'],
        difficulty: 'Intermediate',
        estimatedTime: '1.5 hours',
        imageUrl: 'https://example.com/images/session.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'Session Auth', url: 'https://example.com/session-auth' },
                {
                    type: 'Video',
                    title: 'Session Tutorial',
                    url: 'https://example.com/session-video',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Session Auth by Coursera',
                    url: 'https://www.coursera.org/session-auth',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
                {
                    type: 'Course',
                    title: 'Session Management by Udemy',
                    url: 'https://www.udemy.com/session-management',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
            ],
        },
    },
    vcs: {
        title: 'Version Control Systems',
        description:
            'Use Git, GitHub, and GitLab for version control and collaborative development.',
        prerequisites: ['authentication'],
        difficulty: 'Intermediate',
        estimatedTime: '3.5 hours',
        imageUrl: 'https://example.com/images/vcs.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'VCS Basics', url: 'https://example.com/vcs' },
                { type: 'Tutorial', title: 'Git Guide', url: 'https://example.com/git-guide' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Git Mastery by Udemy',
                    url: 'https://www.udemy.com/git-mastery',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
                {
                    type: 'Course',
                    title: 'GitHub Workflow by Coursera',
                    url: 'https://www.coursera.org/github-workflow',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
            ],
        },
    },
    git: {
        title: 'Git Basics',
        description: 'Learn the fundamentals of Git for version control and code management.',
        prerequisites: ['vcs'],
        difficulty: 'Intermediate',
        estimatedTime: '1.5 hours',
        imageUrl: 'https://example.com/images/git.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'Git Basics', url: 'https://example.com/git-basics' },
                { type: 'Video', title: 'Git Tutorial', url: 'https://example.com/git-video' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Git Essentials by Pluralsight',
                    url: 'https://www.pluralsight.com/git-essentials',
                    discount: '15% Off',
                },
                {
                    type: 'Course',
                    title: 'Git by Udemy',
                    url: 'https://www.udemy.com/git',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
            ],
        },
    },
    github: {
        title: 'GitHub',
        description: 'Master GitHub for hosting, collaborating, and managing repositories.',
        prerequisites: ['vcs', 'git'],
        difficulty: 'Intermediate',
        estimatedTime: '1.5 hours',
        imageUrl: 'https://example.com/images/github.jpg',
        resources: {
            free: [
                { type: 'Tutorial', title: 'GitHub Guide', url: 'https://example.com/github' },
                { type: 'Video', title: 'GitHub Basics', url: 'https://example.com/github-video' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'GitHub Advanced by Coursera',
                    url: 'https://www.coursera.org/github-advanced',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
                {
                    type: 'Course',
                    title: 'GitHub Workflow by Udemy',
                    url: 'https://www.udemy.com/github-workflow',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
            ],
        },
    },
    gitlab: {
        title: 'GitLab',
        description: 'Learn GitLab for integrated version control, CI/CD, and DevOps workflows.',
        prerequisites: ['vcs', 'git'],
        difficulty: 'Intermediate',
        estimatedTime: '1.5 hours',
        imageUrl: 'https://example.com/images/gitlab.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'GitLab Basics', url: 'https://example.com/gitlab' },
                {
                    type: 'Tutorial',
                    title: 'GitLab Guide',
                    url: 'https://example.com/gitlab-guide',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'GitLab by Pluralsight',
                    url: 'https://www.pluralsight.com/gitlab',
                    discount: '15% Off',
                },
                {
                    type: 'Course',
                    title: 'GitLab CI/CD by Udemy',
                    url: 'https://www.udemy.com/gitlab-cicd',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
            ],
        },
    },
    'package-managers': {
        title: 'Package Managers',
        description: 'Manage project dependencies efficiently with npm, pnpm, and yarn.',
        prerequisites: ['vcs'],
        difficulty: 'Intermediate',
        estimatedTime: '3 hours',
        imageUrl: 'https://example.com/images/package-managers.jpg',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'Package Managers',
                    url: 'https://example.com/package-managers',
                },
                { type: 'Video', title: 'npm Tutorial', url: 'https://example.com/npm-video' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Package Management by Pluralsight',
                    url: 'https://www.pluralsight.com/package-management',
                    discount: '15% Off',
                },
                {
                    type: 'Course',
                    title: 'npm Advanced by Udemy',
                    url: 'https://www.udemy.com/npm-advanced',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
            ],
        },
    },
    npm: {
        title: 'npm',
        description: 'Get started with npm for Node.js package management and dependency handling.',
        prerequisites: ['package-managers'],
        difficulty: 'Intermediate',
        estimatedTime: '1.5 hours',
        imageUrl: 'https://example.com/images/npm.jpg',
        resources: {
            free: [
                { type: 'Tutorial', title: 'npm Basics', url: 'https://example.com/npm' },
                { type: 'Video', title: 'npm Guide', url: 'https://example.com/npm-guide' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'npm Deep Dive by Coursera',
                    url: 'https://www.coursera.org/npm-deep-dive',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
                {
                    type: 'Course',
                    title: 'npm Mastery by Udemy',
                    url: 'https://www.udemy.com/npm-mastery',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
            ],
        },
    },
    pnpm: {
        title: 'pnpm',
        description: 'Learn pnpm for efficient and fast package management in Node.js projects.',
        prerequisites: ['package-managers'],
        difficulty: 'Intermediate',
        estimatedTime: '1.5 hours',
        imageUrl: 'https://example.com/images/pnpm.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'pnpm Guide', url: 'https://example.com/pnpm' },
                { type: 'Tutorial', title: 'pnpm Basics', url: 'https://example.com/pnpm-basics' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'pnpm Essentials by Pluralsight',
                    url: 'https://www.pluralsight.com/pnpm-essentials',
                    discount: '15% Off',
                },
                {
                    type: 'Course',
                    title: 'pnpm by Udemy',
                    url: 'https://www.udemy.com/pnpm',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
            ],
        },
    },
    yarn: {
        title: 'yarn',
        description: 'Master yarn for managing dependencies and optimizing JavaScript projects.',
        prerequisites: ['package-managers'],
        difficulty: 'Intermediate',
        estimatedTime: '1.5 hours',
        imageUrl: 'https://example.com/images/yarn.jpg',
        resources: {
            free: [
                { type: 'Tutorial', title: 'yarn Basics', url: 'https://example.com/yarn' },
                { type: 'Video', title: 'yarn Guide', url: 'https://example.com/yarn-video' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'yarn Mastery by Coursera',
                    url: 'https://www.coursera.org/yarn-mastery',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
                {
                    type: 'Course',
                    title: 'yarn Advanced by Udemy',
                    url: 'https://www.udemy.com/yarn-advanced',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
            ],
        },
    },
    deployment: {
        title: 'Deployment',
        description:
            'Deploy full-stack applications using cloud providers, Docker, and CI/CD pipelines.',
        prerequisites: ['package-managers'],
        difficulty: 'Advanced',
        estimatedTime: '5.5 hours',
        imageUrl: 'https://example.com/images/deployment.jpg',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'Deployment Basics',
                    url: 'https://example.com/deployment',
                },
                { type: 'Video', title: 'Docker Intro', url: 'https://example.com/docker-video' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Cloud Deployment by Coursera',
                    url: 'https://www.coursera.org/cloud-deployment',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
                {
                    type: 'Course',
                    title: 'CI/CD Pipelines by Udemy',
                    url: 'https://www.udemy.com/cicd-pipelines',
                    discount: '15% Off with CODE: FULLSTACK15',
                },
            ],
        },
    },
    'cloud-providers': {
        title: 'Cloud Providers (AWS, Azure)',
        description: 'Learn to deploy applications on cloud platforms like AWS and Azure.',
        prerequisites: ['deployment'],
        difficulty: 'Advanced',
        estimatedTime: '2.5 hours',
        imageUrl: 'https://example.com/images/cloud-providers.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'Cloud Basics', url: 'https://example.com/cloud-basics' },
                { type: 'Video', title: 'AWS Intro', url: 'https://example.com/aws-video' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'AWS Fundamentals by Pluralsight',
                    url: 'https://www.pluralsight.com/aws-fundamentals',
                    discount: '15% Off',
                },
                {
                    type: 'Course',
                    title: 'Azure Basics by Udemy',
                    url: 'https://www.udemy.com/azure-basics',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
            ],
        },
    },
    docker: {
        title: 'Docker',
        description: 'Master Docker for containerizing applications in full-stack development.',
        prerequisites: ['deployment'],
        difficulty: 'Advanced',
        estimatedTime: '2.5 hours',
        imageUrl: 'https://example.com/images/docker.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'Docker Basics', url: 'https://example.com/docker' },
                {
                    type: 'Tutorial',
                    title: 'Docker Guide',
                    url: 'https://example.com/docker-guide',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Docker by Coursera',
                    url: 'https://www.coursera.org/docker',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
                {
                    type: 'Course',
                    title: 'Docker Mastery by Udemy',
                    url: 'https://www.udemy.com/docker-mastery',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
            ],
        },
    },
    'ci-cd': {
        title: 'CI/CD Pipelines',
        description: 'Implement continuous integration and continuous deployment pipelines.',
        prerequisites: ['deployment'],
        difficulty: 'Advanced',
        estimatedTime: '2.5 hours',
        imageUrl: 'https://example.com/images/ci-cd.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'CI/CD Basics', url: 'https://example.com/cicd' },
                { type: 'Video', title: 'CI/CD Tutorial', url: 'https://example.com/cicd-video' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'CI/CD by Pluralsight',
                    url: 'https://www.pluralsight.com/cicd',
                    discount: '15% Off',
                },
                {
                    type: 'Course',
                    title: 'CI/CD Pipelines by Coursera',
                    url: 'https://www.coursera.org/cicd-pipelines',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
            ],
        },
    },
    'system-design': {
        title: 'System Design',
        description:
            'Design scalable systems with monolith, microservices, and load balancing techniques.',
        prerequisites: ['deployment'],
        difficulty: 'Advanced',
        estimatedTime: '6 hours',
        imageUrl: 'https://example.com/images/system-design.jpg',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'System Design Basics',
                    url: 'https://example.com/system-design',
                },
                {
                    type: 'Video',
                    title: 'Microservices Intro',
                    url: 'https://example.com/microservices-video',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'System Design by Pluralsight',
                    url: 'https://www.pluralsight.com/system-design',
                    discount: '15% Off',
                },
                {
                    type: 'Certification',
                    title: 'System Design Cert by Coursera',
                    url: 'https://www.coursera.org/system-design-cert',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
            ],
        },
    },
    monolith: {
        title: 'Monolith Architecture',
        description: 'Learn about monolith architecture for building single-unit applications.',
        prerequisites: ['system-design'],
        difficulty: 'Advanced',
        estimatedTime: '2 hours',
        imageUrl: 'https://example.com/images/monolith.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'Monolith Basics', url: 'https://example.com/monolith' },
                {
                    type: 'Video',
                    title: 'Monolith Guide',
                    url: 'https://example.com/monolith-video',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Monolith Design by Udemy',
                    url: 'https://www.udemy.com/monolith-design',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
                {
                    type: 'Course',
                    title: 'Monolith by Coursera',
                    url: 'https://www.coursera.org/monolith',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
            ],
        },
    },
    microservices: {
        title: 'Microservices',
        description: 'Master microservices architecture for scalable and independent services.',
        prerequisites: ['system-design'],
        difficulty: 'Advanced',
        estimatedTime: '2.5 hours',
        imageUrl: 'https://example.com/images/microservices.jpg',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'Microservices Basics',
                    url: 'https://example.com/microservices',
                },
                {
                    type: 'Tutorial',
                    title: 'Microservices Guide',
                    url: 'https://example.com/microservices-guide',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Microservices by Pluralsight',
                    url: 'https://www.pluralsight.com/microservices',
                    discount: '15% Off',
                },
                {
                    type: 'Course',
                    title: 'Microservices Design by Udemy',
                    url: 'https://www.udemy.com/microservices-design',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
            ],
        },
    },
    'load-balancing': {
        title: 'Load Balancing',
        description: 'Learn load balancing techniques to distribute traffic across servers.',
        prerequisites: ['system-design'],
        difficulty: 'Advanced',
        estimatedTime: '2 hours',
        imageUrl: 'https://example.com/images/load-balancing.jpg',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'Load Balancing Basics',
                    url: 'https://example.com/load-balancing',
                },
                {
                    type: 'Video',
                    title: 'Load Balancing Tutorial',
                    url: 'https://example.com/load-video',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Load Balancing by Coursera',
                    url: 'https://www.coursera.org/load-balancing',
                    discount: '20% Off with CODE: FULLSTACK20',
                },
                {
                    type: 'Course',
                    title: 'Load Management by Udemy',
                    url: 'https://www.udemy.com/load-management',
                    discount: '10% Off with CODE: FULLSTACK10',
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
                    title: 'General Full Stack Intro by Udemy',
                    url: 'https://www.udemy.com/fullstack-intro',
                    discount: '10% Off with CODE: FULLSTACK10',
                },
            ],
        },
    },
};
