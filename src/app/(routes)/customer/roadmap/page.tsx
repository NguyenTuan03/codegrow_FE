import { Button } from '@/components/ui/button';
import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';

export default function DeveloperRoadmaps() {
    const roadmaps = [
        { name: 'Frontend', href: '/customer/roadmap/Frontend' },
        { name: 'Backend', href: '/customer/roadmap/Backend' },
        { name: 'React', href: '/customer/roadmap/React' },
        { name: 'FullStack', href: '/customer/roadmap/FullStack' },
        { name: 'Java', href: '/customer/roadmap/Java', isNew: true },
        { name: 'Devops', href: '/customer/roadmap/Devops' },
        { name: 'AI and Data Scientist', href: '/customer/roadmap/AIDataScientist' },
        { name: 'Android', href: '/customer/roadmap/Android' },
        { name: 'IOS', href: '/customer/roadmap/IOS' },
        { name: 'PostgreSQL', href: '/customer/roadmap/PostgreSQL' },
        { name: 'BlockChain', href: '/customer/roadmap/BlockChain' },
        { name: 'QA', href: '/customer/roadmap/QA' },
        { name: 'Software Architect', href: '/customer/roadmap/SoftwareArchitect' },
        { name: 'Cyber Security', href: '/customer/roadmap/CyberSecurity' },
        { name: 'UI Design', href: '/customer/roadmap/UIDesign' },
        { name: 'Game Developer', href: '/customer/roadmap/GameDeveloper' },
        { name: 'Technical Writer', href: '/customer/roadmap/TechnicalWriter' },
        { name: 'MLOps', href: '/customer/roadmap/MLOps' },
        { name: 'Product Manager', href: '/customer/roadmap/ProductManager' },
        { name: 'Engineering Manager', href: '/customer/roadmap/EngineeringManager', isNew: true },
        { name: 'Developer Relations', href: '/customer/roadmap/DeveloperRelations' },
    ];

    return (
        <ReactFlowProvider>
            <div className="min-h-screen  dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl font-bold text-center mb-4 text-[#5AD3AF] dark:[#5AD3AF]">
                        Developer Roadmaps
                    </h1>

                    <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
                        <span className="text-gray-800 dark:text-gray-300">roadmap.sh</span> is a
                        community effort to create roadmaps, guides and other educational content to
                        help guide developers in picking up a path and guide their learnings.
                    </p>

                    <div className="border-t border-gray-300 dark:border-gray-700 pt-8 mb-8">
                        <h2 className="text-xl font-medium text-center mb-8 text-gray-700 dark:text-gray-300">
                            Role-based Roadmaps
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {roadmaps.map((roadmap, index) => (
                                <div key={index} className="relative group">
                                    <a
                                        href={roadmap.href}
                                        className="block bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 h-16 flex items-center transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-lg"
                                    >
                                        <span>{roadmap.name}</span>
                                        {roadmap.isNew && (
                                            <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-purple-500"></span>
                                        )}
                                    </a>
                                    <Button className="absolute top-4 right-12 text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                            <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                            <polyline points="7 3 7 8 15 8"></polyline>
                                        </svg>
                                    </Button>
                                </div>
                            ))}

                            {/* <div className="relative group">
                                <a
                                    href="#/create-roadmap"
                                    className="block bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 border-dashed rounded-lg p-4 h-16 flex items-center justify-center transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                                >
                                    <span className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="mr-2"
                                        >
                                            <line x1="12" y1="5" x2="12" y2="19"></line>
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                        </svg>
                                        Create your own Roadmap
                                    </span>
                                </a>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </ReactFlowProvider>
    );
}
