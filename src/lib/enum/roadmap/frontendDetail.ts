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

export const frontendDetails: { [key: string]: NodeDetail } = {
    internet: {
        title: 'Internet Basics',
        description:
            'Understand the fundamentals of how the internet works, including its structure and key protocols.',
        prerequisites: [],
        difficulty: 'Beginner',
        estimatedTime: '1 hour',
        imageUrl: 'https://example.com/images/internet-basics.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'Internet Basics', url: 'https://example.com/internet' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Internet Fundamentals by Udemy',
                    url: 'https://www.udemy.com/internet-fundamentals',
                    discount: '10% Off with CODE: ROADMAP10',
                },
            ],
        },
    },
    'how-internet': {
        title: 'How Does The Internet Work',
        description:
            'The internet is a global network connecting computers and devices for information sharing. Learn about its infrastructure and data flow.',
        prerequisites: ['Internet Basics'],
        difficulty: 'Beginner',
        estimatedTime: '2 hours',
        imageUrl: 'https://example.com/images/how-internet.jpg',
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
                {
                    type: 'Certification',
                    title: 'Internet Architecture by Coursera',
                    url: 'https://www.coursera.org/internet-architecture',
                    discount: '20% Off with CODE: FRONTEND20',
                },
            ],
        },
    },
    http: {
        title: 'What is HTTP?',
        description:
            'Learn about the HyperText Transfer Protocol and its role in web communication, including requests and responses.',
        prerequisites: ['Internet Basics', 'How Does The Internet Work'],
        difficulty: 'Intermediate',
        estimatedTime: '1.5 hours',
        imageUrl: 'https://example.com/images/http.jpg',
        resources: {
            free: [{ type: 'Article', title: 'HTTP Basics', url: 'https://example.com/http' }],
            premium: [
                {
                    type: 'Course',
                    title: 'HTTP Essentials by Pluralsight',
                    url: 'https://www.pluralsight.com/http-essentials',
                    discount: '15% Off',
                },
            ],
        },
    },
    domain: {
        title: 'What is Domain Name?',
        description:
            'Explore how domain names function and their importance in web addressing and branding.',
        prerequisites: ['Internet Basics'],
        difficulty: 'Beginner',
        estimatedTime: '1 hour',
        imageUrl: 'https://example.com/images/domain.jpg',
        resources: {
            free: [
                {
                    type: 'Guide',
                    title: 'Domain Names Explained',
                    url: 'https://example.com/domain',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Domain Management by Udemy',
                    url: 'https://www.udemy.com/domain-management',
                    discount: '10% Off with CODE: ROADMAP10',
                },
            ],
        },
    },
    hosting: {
        title: 'What is Hosting?',
        description:
            'Discover what web hosting is and how it supports websites with server management.',
        prerequisites: ['Internet Basics', 'Domain Name'],
        difficulty: 'Intermediate',
        estimatedTime: '2 hours',
        imageUrl: 'https://example.com/images/hosting.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'Web Hosting Guide', url: 'https://example.com/hosting' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Web Hosting Fundamentals by Coursera',
                    url: 'https://www.coursera.org/web-hosting',
                    discount: '20% Off with CODE: FRONTEND20',
                },
            ],
        },
    },
    dns: {
        title: 'DNS and How it Works?',
        description:
            'Learn about the Domain Name System and its role in translating domain names to IP addresses.',
        prerequisites: ['Internet Basics', 'Domain Name'],
        difficulty: 'Intermediate',
        estimatedTime: '1.5 hours',
        imageUrl: 'https://example.com/images/dns.jpg',
        resources: {
            free: [{ type: 'Video', title: 'DNS Explained', url: 'https://example.com/dns' }],
            premium: [
                {
                    type: 'Course',
                    title: 'DNS Mastery by Pluralsight',
                    url: 'https://www.pluralsight.com/dns-mastery',
                    discount: '15% Off',
                },
            ],
        },
    },
    browser: {
        title: 'Browsers and How They Work?',
        description:
            'Understand how web browsers render and interact with web content using HTML, CSS, and JavaScript.',
        prerequisites: ['HTML Basics', 'CSS Basics', 'JavaScript Basics'],
        difficulty: 'Intermediate',
        estimatedTime: '2 hours',
        imageUrl: 'https://example.com/images/browser.jpg',
        resources: {
            free: [
                { type: 'Tutorial', title: 'Browser Basics', url: 'https://example.com/browser' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Browser Technology by Udemy',
                    url: 'https://www.udemy.com/browser-technology',
                    discount: '10% Off with CODE: ROADMAP10',
                },
            ],
        },
    },
    html: {
        title: 'HTML Basics',
        description:
            'Learn the fundamentals of HTML for structuring web content, including tags and elements.',
        prerequisites: [],
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
                    title: 'Advanced HTML Course',
                    url: 'https://example.com/html-advanced',
                    discount: '15% Off',
                },
                {
                    type: 'Certification',
                    title: 'HTML Mastery by Coursera',
                    url: 'https://www.coursera.org/html-mastery',
                    discount: '20% Off with CODE: FRONTEND20',
                },
            ],
        },
    },
    'learn-basics-html': {
        title: 'Learn the Basics of HTML',
        description: `Get started with the fundamentals of HTML structure and syntax.
      HTML (HyperText Markup Language) is the backbone of webpages. It structures the content you see online. You use CSS to style this HTML structure and JavaScript to make it interactive. Think of HTML as the skeleton of a website.
      Visit the following resources to learn more:`,
        prerequisites: [],
        difficulty: 'Beginner',
        estimatedTime: '3 hours',
        imageUrl: 'https://example.com/images/learn-html.jpg',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'HTML Basics Tutorial',
                    url: 'https://example.com/html-basics-tutorial',
                },
                {
                    type: 'Video',
                    title: 'HTML Full Course - Build a Website Tutorial',
                    url: 'https://example.com/html-full-course',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'CSS Mastery',
                    url: 'https://example.com/css-mastery',
                    discount: '20% Off',
                },
                {
                    type: 'Course',
                    title: 'Scrimba - Learn Responsive Web Design',
                    url: 'https://example.com/scrimba-responsive',
                    discount: '20% Off',
                },
                {
                    type: 'Course',
                    title: 'Scrimba - From Figma to Code',
                    url: 'https://example.com/scrimba-figma',
                    discount: '20% Off',
                },
                {
                    type: 'Course',
                    title: 'Scrima - Learn UI Design',
                    url: 'https://example.com/scrima-ui',
                    discount: '20% Off',
                },
                {
                    type: 'Certification',
                    title: 'HTML & CSS Certification by Udemy',
                    url: 'https://www.udemy.com/html-css-certification',
                    discount: '15% Off with CODE: ROADMAP15',
                },
            ],
        },
    },
    'semantic-html': {
        title: 'Writing Semantic HTML',
        description: 'Master the use of semantic elements for better accessibility and SEO.',
        prerequisites: ['HTML Basics'],
        difficulty: 'Intermediate',
        estimatedTime: '2 hours',
        imageUrl: 'https://example.com/images/semantic-html.jpg',
        resources: {
            free: [
                {
                    type: 'Tutorial',
                    title: 'Semantic HTML Guide',
                    url: 'https://example.com/semantic-html',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Semantic HTML by Pluralsight',
                    url: 'https://www.pluralsight.com/semantic-html',
                    discount: '15% Off',
                },
            ],
        },
    },
    'forms-validation': {
        title: 'Forms and Validations',
        description: 'Learn to create and validate HTML forms.',
        prerequisites: ['HTML Basics'],
        difficulty: 'Intermediate',
        estimatedTime: '2.5 hours',
        imageUrl: 'https://example.com/images/forms.jpg',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'Forms and Validation',
                    url: 'https://example.com/forms',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Form Validation by Udemy',
                    url: 'https://www.udemy.com/form-validation',
                    discount: '10% Off with CODE: ROADMAP10',
                },
            ],
        },
    },
    accessibility: {
        title: 'Accessibility',
        description: 'Ensure your web content is accessible to all users.',
        prerequisites: ['HTML Basics', 'CSS Basics'],
        difficulty: 'Intermediate',
        estimatedTime: '2 hours',
        imageUrl: 'https://example.com/images/accessibility.jpg',
        resources: {
            free: [
                {
                    type: 'Guide',
                    title: 'Web Accessibility',
                    url: 'https://example.com/accessibility',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Accessibility Basics by Coursera',
                    url: 'https://www.coursera.org/accessibility',
                    discount: '20% Off with CODE: FRONTEND20',
                },
            ],
        },
    },
    seo: {
        title: 'SEO Basics',
        description: 'Understand the basics of Search Engine Optimization.',
        prerequisites: ['HTML Basics'],
        difficulty: 'Beginner',
        estimatedTime: '1.5 hours',
        imageUrl: 'https://example.com/images/seo.jpg',
        resources: {
            free: [{ type: 'Article', title: 'SEO Basics', url: 'https://example.com/seo-basics' }],
            premium: [
                {
                    type: 'Course',
                    title: 'SEO Fundamentals by Udemy',
                    url: 'https://www.udemy.com/seo-fundamentals',
                    discount: '15% Off with CODE: ROADMAP15',
                },
            ],
        },
    },
    css: {
        title: 'CSS Basics',
        description: 'Master CSS to style and layout web pages.',
        prerequisites: ['HTML Basics'],
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
                    title: 'CSS Mastery',
                    url: 'https://example.com/css-mastery',
                    discount: '20% Off',
                },
                {
                    type: 'Certification',
                    title: 'CSS Certification by Coursera',
                    url: 'https://www.coursera.org/css-certification',
                    discount: '20% Off with CODE: FRONTEND20',
                },
            ],
        },
    },
    'learn-basics-css': {
        title: 'Learn the Basics of CSS',
        description: 'Get started with CSS styling and layout techniques.',
        prerequisites: ['HTML Basics'],
        difficulty: 'Beginner',
        estimatedTime: '2 hours',
        imageUrl: 'https://example.com/images/learn-css.jpg',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'CSS Basics Tutorial',
                    url: 'https://example.com/css-basics-tutorial',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'CSS for Beginners by Udemy',
                    url: 'https://www.udemy.com/css-beginners',
                    discount: '10% Off with CODE: ROADMAP10',
                },
            ],
        },
    },
    layouts: {
        title: 'Making Layouts',
        description: 'Learn how to create effective CSS layouts.',
        prerequisites: ['CSS Basics'],
        difficulty: 'Intermediate',
        estimatedTime: '2 hours',
        imageUrl: 'https://example.com/images/layouts.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'CSS Layouts', url: 'https://example.com/css-layouts' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'CSS Layouts by Pluralsight',
                    url: 'https://www.pluralsight.com/css-layouts',
                    discount: '15% Off',
                },
            ],
        },
    },
    responsive: {
        title: 'Responsive Design',
        description: 'Master responsive design techniques for all devices.',
        prerequisites: ['CSS Basics'],
        difficulty: 'Intermediate',
        estimatedTime: '2.5 hours',
        imageUrl: 'https://example.com/images/responsive.jpg',
        resources: {
            free: [
                {
                    type: 'Tutorial',
                    title: 'Responsive Design Guide',
                    url: 'https://example.com/responsive',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Responsive Web Design by Coursera',
                    url: 'https://www.coursera.org/responsive-design',
                    discount: '20% Off with CODE: FRONTEND20',
                },
            ],
        },
    },
    javascript: {
        title: 'JavaScript Basics',
        description: 'Learn the fundamentals of JavaScript programming.',
        prerequisites: ['HTML Basics', 'CSS Basics'],
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
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'JavaScript Essentials by Udemy',
                    url: 'https://www.udemy.com/javascript-essentials',
                    discount: '15% Off with CODE: ROADMAP15',
                },
                {
                    type: 'Certification',
                    title: 'JavaScript Certification by Coursera',
                    url: 'https://www.coursera.org/javascript-cert',
                    discount: '20% Off with CODE: FRONTEND20',
                },
            ],
        },
    },
    'learn-basics-js': {
        title: 'Learn the Basics of JavaScript',
        description: 'Get started with JavaScript core concepts.',
        prerequisites: ['JavaScript Basics'],
        difficulty: 'Beginner',
        estimatedTime: '2.5 hours',
        imageUrl: 'https://example.com/images/learn-js.jpg',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'JavaScript Basics Tutorial',
                    url: 'https://example.com/js-basics',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'JavaScript for Beginners by Pluralsight',
                    url: 'https://www.pluralsight.com/js-beginners',
                    discount: '15% Off',
                },
            ],
        },
    },
    dom: {
        title: 'Learn DOM Manipulation',
        description: 'Understand how to manipulate the Document Object Model with JavaScript.',
        prerequisites: ['JavaScript Basics'],
        difficulty: 'Intermediate',
        estimatedTime: '2 hours',
        imageUrl: 'https://example.com/images/dom.jpg',
        resources: {
            free: [
                {
                    type: 'Tutorial',
                    title: 'DOM Manipulation Guide',
                    url: 'https://example.com/dom-manipulation',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'DOM Mastery by Udemy',
                    url: 'https://www.udemy.com/dom-mastery',
                    discount: '10% Off with CODE: ROADMAP10',
                },
            ],
        },
    },
    'fetch-ajax': {
        title: 'Fetch API / Ajax (XHR)',
        description: 'Learn how to make HTTP requests using Fetch API and Ajax.',
        prerequisites: ['JavaScript Basics'],
        difficulty: 'Intermediate',
        estimatedTime: '2.5 hours',
        imageUrl: 'https://example.com/images/fetch.jpg',
        resources: {
            free: [{ type: 'Article', title: 'Fetch API Guide', url: 'https://example.com/fetch' }],
            premium: [
                {
                    type: 'Course',
                    title: 'Fetch & Ajax by Coursera',
                    url: 'https://www.coursera.org/fetch-ajax',
                    discount: '20% Off with CODE: FRONTEND20',
                },
            ],
        },
    },
    vcs: {
        title: 'Version Control Systems',
        description: 'Learn the basics of version control for code management.',
        prerequisites: [],
        difficulty: 'Beginner',
        estimatedTime: '2 hours',
        imageUrl: 'https://example.com/images/vcs.jpg',
        resources: {
            free: [{ type: 'Article', title: 'VCS Basics', url: 'https://example.com/vcs' }],
            premium: [
                {
                    type: 'Course',
                    title: 'Git Basics by Udemy',
                    url: 'https://www.udemy.com/git-basics',
                    discount: '15% Off with CODE: ROADMAP15',
                },
            ],
        },
    },
    github: {
        title: 'GitHub',
        description: 'Master GitHub for version control and collaboration.',
        prerequisites: ['Version Control Systems'],
        difficulty: 'Intermediate',
        estimatedTime: '2.5 hours',
        imageUrl: 'https://example.com/images/github.jpg',
        resources: {
            free: [{ type: 'Tutorial', title: 'GitHub Guide', url: 'https://example.com/github' }],
            premium: [
                {
                    type: 'Course',
                    title: 'GitHub Mastery by Pluralsight',
                    url: 'https://www.pluralsight.com/github-mastery',
                    discount: '15% Off',
                },
            ],
        },
    },
    'vcs-hosting': {
        title: 'VCS Hosting',
        description: 'Understand hosting solutions for version control systems.',
        prerequisites: ['Version Control Systems', 'GitHub'],
        difficulty: 'Intermediate',
        estimatedTime: '1.5 hours',
        imageUrl: 'https://example.com/images/vcs-hosting.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'VCS Hosting', url: 'https://example.com/vcs-hosting' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'VCS Hosting by Coursera',
                    url: 'https://www.coursera.org/vcs-hosting',
                    discount: '20% Off with CODE: FRONTEND20',
                },
            ],
        },
    },
    'package-managers': {
        title: 'Package Managers',
        description: 'Learn about managing dependencies with package managers.',
        prerequisites: ['JavaScript Basics'],
        difficulty: 'Intermediate',
        estimatedTime: '2 hours',
        imageUrl: 'https://example.com/images/package-managers.jpg',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'Package Managers',
                    url: 'https://example.com/package-managers',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Package Management by Udemy',
                    url: 'https://www.udemy.com/package-management',
                    discount: '10% Off with CODE: ROADMAP10',
                },
            ],
        },
    },
    npm: {
        title: 'npm',
        description: 'Get started with npm for Node.js package management.',
        prerequisites: ['Package Managers'],
        difficulty: 'Intermediate',
        estimatedTime: '1.5 hours',
        imageUrl: 'https://example.com/images/npm.jpg',
        resources: {
            free: [{ type: 'Tutorial', title: 'npm Basics', url: 'https://example.com/npm' }],
            premium: [
                {
                    type: 'Course',
                    title: 'npm Deep Dive by Pluralsight',
                    url: 'https://www.pluralsight.com/npm-deep-dive',
                    discount: '15% Off',
                },
            ],
        },
    },
    pnpm: {
        title: 'pnpm',
        description: 'Learn pnpm for efficient package management.',
        prerequisites: ['Package Managers'],
        difficulty: 'Intermediate',
        estimatedTime: '1.5 hours',
        imageUrl: 'https://example.com/images/pnpm.jpg',
        resources: {
            free: [{ type: 'Article', title: 'pnpm Guide', url: 'https://example.com/pnpm' }],
            premium: [
                {
                    type: 'Course',
                    title: 'pnpm Essentials by Udemy',
                    url: 'https://www.udemy.com/pnpm-essentials',
                    discount: '10% Off with CODE: ROADMAP10',
                },
            ],
        },
    },
    yarn: {
        title: 'yarn',
        description: 'Master yarn for package management in JavaScript projects.',
        prerequisites: ['Package Managers'],
        difficulty: 'Intermediate',
        estimatedTime: '1.5 hours',
        imageUrl: 'https://example.com/images/yarn.jpg',
        resources: {
            free: [{ type: 'Tutorial', title: 'yarn Basics', url: 'https://example.com/yarn' }],
            premium: [
                {
                    type: 'Course',
                    title: 'yarn Mastery by Coursera',
                    url: 'https://www.coursera.org/yarn-mastery',
                    discount: '20% Off with CODE: FRONTEND20',
                },
            ],
        },
    },
    framework: {
        title: 'Pick a Framework',
        description: 'Choose a framework to build your frontend applications.',
        prerequisites: ['HTML Basics', 'CSS Basics', 'JavaScript Basics'],
        difficulty: 'Intermediate',
        estimatedTime: '2 hours',
        imageUrl: 'https://example.com/images/framework.jpg',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'Framework Selection',
                    url: 'https://example.com/framework',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Framework Comparison by Udemy',
                    url: 'https://www.udemy.com/framework-comparison',
                    discount: '15% Off with CODE: ROADMAP15',
                },
            ],
        },
    },
    react: {
        title: 'React',
        description: 'Learn React for building dynamic user interfaces.',
        prerequisites: ['JavaScript Basics'],
        difficulty: 'Intermediate',
        estimatedTime: '3 hours',
        imageUrl: 'https://example.com/images/react.jpg',
        resources: {
            free: [{ type: 'Tutorial', title: 'React Basics', url: 'https://example.com/react' }],
            premium: [
                {
                    type: 'Course',
                    title: 'React Fundamentals by Pluralsight',
                    url: 'https://www.pluralsight.com/react-fundamentals',
                    discount: '15% Off',
                },
                {
                    type: 'Certification',
                    title: 'React Certification by Coursera',
                    url: 'https://www.coursera.org/react-cert',
                    discount: '20% Off with CODE: FRONTEND20',
                },
            ],
        },
    },
    vue: {
        title: 'Vue.js',
        description: 'Master Vue.js for modern web development.',
        prerequisites: ['JavaScript Basics'],
        difficulty: 'Intermediate',
        estimatedTime: '3 hours',
        imageUrl: 'https://example.com/images/vue.jpg',
        resources: {
            free: [{ type: 'Article', title: 'Vue.js Basics', url: 'https://example.com/vue' }],
            premium: [
                {
                    type: 'Course',
                    title: 'Vue.js Essentials by Udemy',
                    url: 'https://www.udemy.com/vuejs-essentials',
                    discount: '10% Off with CODE: ROADMAP10',
                },
            ],
        },
    },
    angular: {
        title: 'Angular',
        description: 'Explore Angular for robust application development.',
        prerequisites: ['JavaScript Basics'],
        difficulty: 'Advanced',
        estimatedTime: '4 hours',
        imageUrl: 'https://example.com/images/angular.jpg',
        resources: {
            free: [
                { type: 'Tutorial', title: 'Angular Basics', url: 'https://example.com/angular' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Angular Mastery by Coursera',
                    url: 'https://www.coursera.org/angular-mastery',
                    discount: '20% Off with CODE: FRONTEND20',
                },
            ],
        },
    },
    svelte: {
        title: 'Svelte',
        description: 'Learn Svelte for compiling UI components.',
        prerequisites: ['JavaScript Basics'],
        difficulty: 'Intermediate',
        estimatedTime: '3 hours',
        imageUrl: 'https://example.com/images/svelte.jpg',
        resources: {
            free: [{ type: 'Article', title: 'Svelte Basics', url: 'https://example.com/svelte' }],
            premium: [
                {
                    type: 'Course',
                    title: 'Svelte Fundamentals by Pluralsight',
                    url: 'https://www.pluralsight.com/svelte-fundamentals',
                    discount: '15% Off',
                },
            ],
        },
    },
    solidjs: {
        title: 'Solid JS',
        description: 'Get started with Solid JS for reactive UI development.',
        prerequisites: ['JavaScript Basics'],
        difficulty: 'Intermediate',
        estimatedTime: '3 hours',
        imageUrl: 'https://example.com/images/solidjs.jpg',
        resources: {
            free: [
                { type: 'Tutorial', title: 'Solid JS Basics', url: 'https://example.com/solidjs' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Solid JS by Udemy',
                    url: 'https://www.udemy.com/solid-js',
                    discount: '10% Off with CODE: ROADMAP10',
                },
            ],
        },
    },
    qwik: {
        title: 'Qwik',
        description: 'Learn Qwik for high-performance web applications.',
        prerequisites: ['JavaScript Basics'],
        difficulty: 'Advanced',
        estimatedTime: '4 hours',
        imageUrl: 'https://example.com/images/qwik.jpg',
        resources: {
            free: [{ type: 'Article', title: 'Qwik Basics', url: 'https://example.com/qwik' }],
            premium: [
                {
                    type: 'Course',
                    title: 'Qwik Performance by Coursera',
                    url: 'https://www.coursera.org/qwik-performance',
                    discount: '20% Off with CODE: FRONTEND20',
                },
            ],
        },
    },
    'writing-css': {
        title: 'Writing CSS',
        description: 'Master the art of writing effective CSS.',
        prerequisites: ['CSS Basics'],
        difficulty: 'Intermediate',
        estimatedTime: '2 hours',
        imageUrl: 'https://example.com/images/writing-css.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'Writing CSS', url: 'https://example.com/writing-css' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'CSS Writing Techniques by Pluralsight',
                    url: 'https://www.pluralsight.com/css-writing',
                    discount: '15% Off',
                },
            ],
        },
    },
    tailwind: {
        title: 'Tailwind',
        description: 'Learn Tailwind CSS for utility-first styling.',
        prerequisites: ['CSS Basics'],
        difficulty: 'Intermediate',
        estimatedTime: '2.5 hours',
        imageUrl: 'https://example.com/images/tailwind.jpg',
        resources: {
            free: [
                { type: 'Tutorial', title: 'Tailwind Basics', url: 'https://example.com/tailwind' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Tailwind CSS by Udemy',
                    url: 'https://www.udemy.com/tailwind-css',
                    discount: '10% Off with CODE: ROADMAP10',
                },
            ],
        },
    },
    'css-architecture': {
        title: 'CSS Architecture',
        description: 'Understand advanced CSS architecture techniques.',
        prerequisites: ['CSS Basics'],
        difficulty: 'Advanced',
        estimatedTime: '2.5 hours',
        imageUrl: 'https://example.com/images/css-architecture.jpg',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'CSS Architecture',
                    url: 'https://example.com/css-architecture',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'CSS Architecture by Coursera',
                    url: 'https://www.coursera.org/css-architecture',
                    discount: '20% Off with CODE: FRONTEND20',
                },
            ],
        },
    },
    bem: {
        title: 'BEM',
        description: 'Master the BEM methodology for CSS.',
        prerequisites: ['CSS Basics'],
        difficulty: 'Intermediate',
        estimatedTime: '2 hours',
        imageUrl: 'https://example.com/images/bem.jpg',
        resources: {
            free: [{ type: 'Tutorial', title: 'BEM Guide', url: 'https://example.com/bem' }],
            premium: [
                {
                    type: 'Course',
                    title: 'BEM Methodology by Pluralsight',
                    url: 'https://www.pluralsight.com/bem-methodology',
                    discount: '15% Off',
                },
            ],
        },
    },
    'css-preprocessors': {
        title: 'CSS Preprocessors',
        description: 'Learn about CSS preprocessors for enhanced styling.',
        prerequisites: ['CSS Basics'],
        difficulty: 'Intermediate',
        estimatedTime: '2 hours',
        imageUrl: 'https://example.com/images/css-preprocessors.jpg',
        resources: {
            free: [
                {
                    type: 'Article',
                    title: 'CSS Preprocessors',
                    url: 'https://example.com/css-preprocessors',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'CSS Preprocessors by Udemy',
                    url: 'https://www.udemy.com/css-preprocessors',
                    discount: '10% Off with CODE: ROADMAP10',
                },
            ],
        },
    },
    sass: {
        title: 'Sass',
        description: 'Get started with Sass for advanced CSS.',
        prerequisites: ['CSS Preprocessors'],
        difficulty: 'Intermediate',
        estimatedTime: '2.5 hours',
        imageUrl: 'https://example.com/images/sass.jpg',
        resources: {
            free: [{ type: 'Tutorial', title: 'Sass Basics', url: 'https://example.com/sass' }],
            premium: [
                {
                    type: 'Course',
                    title: 'Sass Advanced by Coursera',
                    url: 'https://www.coursera.org/sass-advanced',
                    discount: '20% Off with CODE: FRONTEND20',
                },
            ],
        },
    },
    postcss: {
        title: 'PostCSS',
        description: 'Explore PostCSS for modern CSS processing.',
        prerequisites: ['CSS Preprocessors'],
        difficulty: 'Advanced',
        estimatedTime: '2 hours',
        imageUrl: 'https://example.com/images/postcss.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'PostCSS Basics', url: 'https://example.com/postcss' },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'PostCSS Mastery by Pluralsight',
                    url: 'https://www.pluralsight.com/postcss-mastery',
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
                    title: 'General Frontend Intro by Udemy',
                    url: 'https://www.udemy.com/general-frontend',
                    discount: '10% Off with CODE: ROADMAP10',
                },
            ],
        },
    },
};
