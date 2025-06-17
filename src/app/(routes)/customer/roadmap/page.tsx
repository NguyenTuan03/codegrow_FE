'use client';

import { Button } from '@/components/ui/button';
import React, { useRef } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { motion, useInView, Variants } from 'framer-motion';

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

    // Refs for scroll-triggered animations
    const headerRef = useRef(null);
    const descriptionRef = useRef(null);
    const roadmapsRef = useRef(null);

    // Detect when sections are in view
    const headerInView = useInView(headerRef, { once: true, margin: '0px 0px -50px 0px' });
    const descriptionInView = useInView(descriptionRef, {
        once: true,
        margin: '0px 0px -50px 0px',
    });
    const roadmapsInView = useInView(roadmapsRef, { once: true, margin: '0px 0px -50px 0px' });

    // Animation variants
    const sectionVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeInOut' } },
    };

    return (
        <ReactFlowProvider>
            <div className="min-h-screen dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 transition-colors duration-300">
                <div className="max-w-8xl mx-auto">
                    {/* Header */}
                    <motion.h1
                        ref={headerRef}
                        initial="hidden"
                        animate={headerInView ? 'visible' : 'hidden'}
                        variants={sectionVariants}
                        className="text-4xl font-bold tracking-tight text-center mb-4 text-[#657ED4] dark:[#5AD3AF]"
                    >
                        Developer Roadmaps
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        ref={descriptionRef}
                        initial="hidden"
                        animate={descriptionInView ? 'visible' : 'hidden'}
                        variants={sectionVariants}
                        className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto"
                    >
                        <span className="text-gray-800 dark:text-gray-300 text-xl">roadmap.sh</span>{' '}
                        is a community effort to create roadmaps, guides and other educational
                        content to help guide developers in picking up a path and guide their
                        learnings.
                    </motion.p>

                    {/* Roadmaps Grid */}
                    <motion.div
                        ref={roadmapsRef}
                        initial="hidden"
                        animate={roadmapsInView ? 'visible' : 'hidden'}
                        variants={sectionVariants}
                        className="border-t border-gray-300 dark:border-gray-700 pt-8 mb-8"
                    >
                        <h2 className="text-xl font-medium text-center mb-8 text-gray-700 dark:text-gray-300">
                            Role-based Roadmaps
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {roadmaps.map((roadmap, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: index * 0.1 }}
                                    className="relative group"
                                >
                                    <a
                                        href={roadmap.href}
                                        className="block bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 h-16 items-center transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-lg"
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
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </ReactFlowProvider>
    );
}
