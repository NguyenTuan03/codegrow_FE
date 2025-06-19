// lib/enum/roadmap/frontendDetail.ts
interface NodeDetail {
    title: string;
    description: string;
    resources: {
        free: { type: string; title: string; url: string }[];
        premium: { type: string; title: string; url: string; discount?: string }[];
    };
}

export const frontendDetails: { [key: string]: NodeDetail } = {
    internet: {
        title: 'Internet Basics',
        description: 'Understand the fundamentals of how the internet works.',
        resources: {
            free: [
                { type: 'Article', title: 'Internet Basics', url: 'https://example.com/internet' },
            ],
            premium: [],
        },
    },
    'how-internet': {
        title: 'How Does The Internet Work',
        description:
            'The internet is a global network connecting computers and devices for information sharing.',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'Introduction to Internet',
                    url: 'https://example.com/internet-intro',
                },
                {
                    type: 'Video',
                    title: 'How the Internet Works',
                    url: 'https://example.com/internet-video',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Internet Deep Dive',
                    url: 'https://example.com/internet-course',
                    discount: '15% Off',
                },
            ],
        },
    },
    http: {
        title: 'What is HTTP?',
        description:
            'Learn about the HyperText Transfer Protocol and its role in web communication.',
        resources: {
            free: [{ type: 'Article', title: 'HTTP Basics', url: 'https://example.com/http' }],
            premium: [],
        },
    },
    domain: {
        title: 'What is Domain Name?',
        description: 'Explore how domain names function and their importance in web addressing.',
        resources: {
            free: [
                {
                    type: 'Guide',
                    title: 'Domain Names Explained',
                    url: 'https://example.com/domain',
                },
            ],
            premium: [],
        },
    },
    hosting: {
        title: 'What is Hosting?',
        description: 'Discover what web hosting is and how it supports websites.',
        resources: {
            free: [
                { type: 'Article', title: 'Web Hosting Guide', url: 'https://example.com/hosting' },
            ],
            premium: [],
        },
    },
    dns: {
        title: 'DNS and How it Works?',
        description: 'Learn about the Domain Name System and its role in internet navigation.',
        resources: {
            free: [{ type: 'Video', title: 'DNS Explained', url: 'https://example.com/dns' }],
            premium: [],
        },
    },
    browser: {
        title: 'Browsers and How They Work?',
        description: 'Understand how web browsers render and interact with web content.',
        resources: {
            free: [
                { type: 'Tutorial', title: 'Browser Basics', url: 'https://example.com/browser' },
            ],
            premium: [],
        },
    },
    html: {
        title: 'HTML Basics',
        description: 'Learn the fundamentals of HTML for structuring web content.',
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
                    title: 'Advanced HTML Course',
                    url: 'https://example.com/html-advanced',
                    discount: '15% Off',
                },
            ],
        },
    },
    'learn-basics-html': {
        title: 'Learn the Basics of HTML',
        description: 'Get started with the fundamentals of HTML structure and syntax.',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'HTML Basics Tutorial',
                    url: 'https://example.com/html-basics-tutorial',
                },
            ],
            premium: [],
        },
    },
    'semantic-html': {
        title: 'Writing Semantic HTML',
        description: 'Master the use of semantic elements for better accessibility and SEO.',
        resources: {
            free: [
                {
                    type: 'Tutorial',
                    title: 'Semantic HTML Guide',
                    url: 'https://example.com/semantic-html',
                },
            ],
            premium: [],
        },
    },
    'forms-validation': {
        title: 'Forms and Validations',
        description: 'Learn to create and validate HTML forms.',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'Forms and Validation',
                    url: 'https://example.com/forms',
                },
            ],
            premium: [],
        },
    },
    accessibility: {
        title: 'Accessibility',
        description: 'Ensure your web content is accessible to all users.',
        resources: {
            free: [
                {
                    type: 'Guide',
                    title: 'Web Accessibility',
                    url: 'https://example.com/accessibility',
                },
            ],
            premium: [],
        },
    },
    seo: {
        title: 'SEO Basics',
        description: 'Understand the basics of Search Engine Optimization.',
        resources: {
            free: [{ type: 'Article', title: 'SEO Basics', url: 'https://example.com/seo-basics' }],
            premium: [],
        },
    },
    css: {
        title: 'CSS Basics',
        description: 'Master CSS to style and layout web pages.',
        resources: {
            free: [
                { type: 'Article', title: 'CSS Basics', url: 'https://example.com/css' },
                { type: 'Video', title: 'CSS Tutorial', url: 'https://example.com/css-video' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'CSS Mastery',
                    url: 'https://example.com/css-mastery',
                    discount: '20% Off',
                },
            ],
        },
    },
    'learn-basics-css': {
        title: 'Learn the Basics of CSS',
        description: 'Get started with CSS styling and layout techniques.',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'CSS Basics Tutorial',
                    url: 'https://example.com/css-basics-tutorial',
                },
            ],
            premium: [],
        },
    },
    layouts: {
        title: 'Making Layouts',
        description: 'Learn how to create effective CSS layouts.',
        resources: {
            free: [
                { type: 'Article', title: 'CSS Layouts', url: 'https://example.com/css-layouts' },
            ],
            premium: [],
        },
    },
    responsive: {
        title: 'Responsive Design',
        description: 'Master responsive design techniques for all devices.',
        resources: {
            free: [
                {
                    type: 'Tutorial',
                    title: 'Responsive Design Guide',
                    url: 'https://example.com/responsive',
                },
            ],
            premium: [],
        },
    },
    javascript: {
        title: 'JavaScript Basics',
        description: 'Learn the fundamentals of JavaScript programming.',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'JavaScript Basics',
                    url: 'https://example.com/javascript',
                },
            ],
            premium: [],
        },
    },
    'learn-basics-js': {
        title: 'Learn the Basics of JavaScript',
        description: 'Get started with JavaScript core concepts.',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'JavaScript Basics Tutorial',
                    url: 'https://example.com/js-basics',
                },
            ],
            premium: [],
        },
    },
    dom: {
        title: 'Learn DOM Manipulation',
        description: 'Understand how to manipulate the Document Object Model with JavaScript.',
        resources: {
            free: [
                {
                    type: 'Tutorial',
                    title: 'DOM Manipulation Guide',
                    url: 'https://example.com/dom-manipulation',
                },
            ],
            premium: [],
        },
    },
    'fetch-ajax': {
        title: 'Fetch API / Ajax (XHR)',
        description: 'Learn how to make HTTP requests using Fetch API and Ajax.',
        resources: {
            free: [{ type: 'Article', title: 'Fetch API Guide', url: 'https://example.com/fetch' }],
            premium: [],
        },
    },
    vcs: {
        title: 'Version Control Systems',
        description: 'Learn the basics of version control for code management.',
        resources: {
            free: [{ type: 'Article', title: 'VCS Basics', url: 'https://example.com/vcs' }],
            premium: [],
        },
    },
    github: {
        title: 'GitHub',
        description: 'Master GitHub for version control and collaboration.',
        resources: {
            free: [{ type: 'Tutorial', title: 'GitHub Guide', url: 'https://example.com/github' }],
            premium: [],
        },
    },
    'vcs-hosting': {
        title: 'VCS Hosting',
        description: 'Understand hosting solutions for version control systems.',
        resources: {
            free: [
                { type: 'Article', title: 'VCS Hosting', url: 'https://example.com/vcs-hosting' },
            ],
            premium: [],
        },
    },
    'package-managers': {
        title: 'Package Managers',
        description: 'Learn about managing dependencies with package managers.',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'Package Managers',
                    url: 'https://example.com/package-managers',
                },
            ],
            premium: [],
        },
    },
    npm: {
        title: 'npm',
        description: 'Get started with npm for Node.js package management.',
        resources: {
            free: [{ type: 'Tutorial', title: 'npm Basics', url: 'https://example.com/npm' }],
            premium: [],
        },
    },
    pnpm: {
        title: 'pnpm',
        description: 'Learn pnpm for efficient package management.',
        resources: {
            free: [{ type: 'Article', title: 'pnpm Guide', url: 'https://example.com/pnpm' }],
            premium: [],
        },
    },
    yarn: {
        title: 'yarn',
        description: 'Master yarn for package management in JavaScript projects.',
        resources: {
            free: [{ type: 'Tutorial', title: 'yarn Basics', url: 'https://example.com/yarn' }],
            premium: [],
        },
    },
    framework: {
        title: 'Pick a Framework',
        description: 'Choose a framework to build your frontend applications.',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'Framework Selection',
                    url: 'https://example.com/framework',
                },
            ],
            premium: [],
        },
    },
    react: {
        title: 'React',
        description: 'Learn React for building dynamic user interfaces.',
        resources: {
            free: [{ type: 'Tutorial', title: 'React Basics', url: 'https://example.com/react' }],
            premium: [],
        },
    },
    vue: {
        title: 'Vue.js',
        description: 'Master Vue.js for modern web development.',
        resources: {
            free: [{ type: 'Article', title: 'Vue.js Basics', url: 'https://example.com/vue' }],
            premium: [],
        },
    },
    angular: {
        title: 'Angular',
        description: 'Explore Angular for robust application development.',
        resources: {
            free: [
                { type: 'Tutorial', title: 'Angular Basics', url: 'https://example.com/angular' },
            ],
            premium: [],
        },
    },
    svelte: {
        title: 'Svelte',
        description: 'Learn Svelte for compiling UI components.',
        resources: {
            free: [{ type: 'Article', title: 'Svelte Basics', url: 'https://example.com/svelte' }],
            premium: [],
        },
    },
    solidjs: {
        title: 'Solid JS',
        description: 'Get started with Solid JS for reactive UI development.',
        resources: {
            free: [
                { type: 'Tutorial', title: 'Solid JS Basics', url: 'https://example.com/solidjs' },
            ],
            premium: [],
        },
    },
    qwik: {
        title: 'Qwik',
        description: 'Learn Qwik for high-performance web applications.',
        resources: {
            free: [{ type: 'Article', title: 'Qwik Basics', url: 'https://example.com/qwik' }],
            premium: [],
        },
    },
    'writing-css': {
        title: 'Writing CSS',
        description: 'Master the art of writing effective CSS.',
        resources: {
            free: [
                { type: 'Article', title: 'Writing CSS', url: 'https://example.com/writing-css' },
            ],
            premium: [],
        },
    },
    tailwind: {
        title: 'Tailwind',
        description: 'Learn Tailwind CSS for utility-first styling.',
        resources: {
            free: [
                { type: 'Tutorial', title: 'Tailwind Basics', url: 'https://example.com/tailwind' },
            ],
            premium: [],
        },
    },
    'css-architecture': {
        title: 'CSS Architecture',
        description: 'Understand advanced CSS architecture techniques.',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'CSS Architecture',
                    url: 'https://example.com/css-architecture',
                },
            ],
            premium: [],
        },
    },
    bem: {
        title: 'BEM',
        description: 'Master the BEM methodology for CSS.',
        resources: {
            free: [{ type: 'Tutorial', title: 'BEM Guide', url: 'https://example.com/bem' }],
            premium: [],
        },
    },
    'css-preprocessors': {
        title: 'CSS Preprocessors',
        description: 'Learn about CSS preprocessors for enhanced styling.',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'CSS Preprocessors',
                    url: 'https://example.com/css-preprocessors',
                },
            ],
            premium: [],
        },
    },
    sass: {
        title: 'Sass',
        description: 'Get started with Sass for advanced CSS.',
        resources: {
            free: [{ type: 'Tutorial', title: 'Sass Basics', url: 'https://example.com/sass' }],
            premium: [],
        },
    },
    postcss: {
        title: 'PostCSS',
        description: 'Explore PostCSS for modern CSS processing.',
        resources: {
            free: [
                { type: 'Article', title: 'PostCSS Basics', url: 'https://example.com/postcss' },
            ],
            premium: [],
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
