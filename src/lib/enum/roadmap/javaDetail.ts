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

export const javaDetails: { [key: string]: NodeDetail } = {
    'java-basics': {
        title: 'Java Basics',
        description:
            'Understand the core concepts of Java programming, including variables, loops, and object-oriented principles.',
        prerequisites: [],
        difficulty: 'Beginner',
        estimatedTime: '3 hours',
        imageUrl: 'https://example.com/images/java-basics.jpg',
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
                {
                    type: 'Course',
                    title: 'Java Programming by Udemy',
                    url: 'https://www.udemy.com/java-programming',
                    discount: '10% Off with CODE: JAVA10',
                },
                {
                    type: 'Certification',
                    title: 'Java SE Certification by Coursera',
                    url: 'https://www.coursera.org/java-se-cert',
                    discount: '20% Off with CODE: JAVA20',
                },
            ],
        },
    },
    'java-ee': {
        title: 'Java EE',
        description:
            'Explore Java Enterprise Edition for enterprise applications, including servlets, JSP, and EJBs.',
        prerequisites: ['Java Basics'],
        difficulty: 'Intermediate',
        estimatedTime: '4 hours',
        imageUrl: 'https://example.com/images/java-ee.jpg',
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
                {
                    type: 'Course',
                    title: 'Java EE Development by Pluralsight',
                    url: 'https://www.pluralsight.com/java-ee',
                    discount: '15% Off',
                },
                {
                    type: 'Certification',
                    title: 'Java EE Certification by Udemy',
                    url: 'https://www.udemy.com/java-ee-cert',
                    discount: '15% Off with CODE: JAVA15',
                },
            ],
        },
    },
    'java-spring': {
        title: 'Spring Framework',
        description:
            'Learn the Spring Framework for building robust Java applications, including Spring Boot.',
        prerequisites: ['Java Basics', 'Java EE'],
        difficulty: 'Intermediate',
        estimatedTime: '5 hours',
        imageUrl: 'https://example.com/images/java-spring.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'Spring Basics', url: 'https://example.com/spring' },
                {
                    type: 'Tutorial',
                    title: 'Spring Boot Guide',
                    url: 'https://example.com/spring-boot',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Spring Boot Mastery by Coursera',
                    url: 'https://www.coursera.org/spring-boot',
                    discount: '20% Off with CODE: JAVA20',
                },
                {
                    type: 'Course',
                    title: 'Spring Framework by Pluralsight',
                    url: 'https://www.pluralsight.com/spring-framework',
                    discount: '15% Off',
                },
                {
                    type: 'Certification',
                    title: 'Spring Professional Certification by Udemy',
                    url: 'https://www.udemy.com/spring-cert',
                    discount: '10% Off with CODE: JAVA10',
                },
            ],
        },
    },
    'java-android': {
        title: 'Android Development with Java',
        description: 'Learn to develop Android applications using Java and Android SDK.',
        prerequisites: ['Java Basics'],
        difficulty: 'Intermediate',
        estimatedTime: '4.5 hours',
        imageUrl: 'https://example.com/images/java-android.jpg',
        resources: {
            free: [
                { type: 'Article', title: 'Android Basics', url: 'https://example.com/android' },
                {
                    type: 'Video',
                    title: 'Android Development Intro',
                    url: 'https://example.com/android-video',
                },
            ],
            premium: [
                {
                    type: 'Course',
                    title: 'Android Development by Udemy',
                    url: 'https://www.udemy.com/android-development',
                    discount: '15% Off with CODE: JAVA15',
                },
                {
                    type: 'Course',
                    title: 'Android with Java by Pluralsight',
                    url: 'https://www.pluralsight.com/android-java',
                    discount: '15% Off',
                },
                {
                    type: 'Certification',
                    title: 'Android Developer Certification by Coursera',
                    url: 'https://www.coursera.org/android-cert',
                    discount: '20% Off with CODE: JAVA20',
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
                    title: 'General Java Intro by Udemy',
                    url: 'https://www.udemy.com/general-java',
                    discount: '10% Off with CODE: JAVA10',
                },
            ],
        },
    },
};
