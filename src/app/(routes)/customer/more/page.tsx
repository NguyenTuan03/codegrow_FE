'use client';

import { useEffect, useState, useRef } from 'react';
import { GetClass } from '@/lib/services/class/getclass';
import { toast } from '@/components/ui/use-toast';
import ContactForm from '@/app/(routes)/customer/more/contact-form';
import HeroSection from '@/app/(routes)/customer/more/HeroSection';
import LearningMethods from '@/app/(routes)/customer/more/LearningMethods';
import BenefitsSection from '@/app/(routes)/customer/more/BenefitsSection';
import CoursesList from '@/app/(routes)/customer/more/ClassList';
import { motion, useInView, Variants } from 'framer-motion';

interface ClassItem {
    _id: string;
    title: string;
    description: string;
    students: string[];
    mentor: {
        _id: string;
        fullName: string;
        email: string;
        phone: string;
        image?: string;
    };
    schedule: {
        startDate: string;
        endDate: string;
        daysOfWeek: string[];
        time: string;
    };
    image?: string;
    bgColor?: string;
}

export default function MentorCourses() {
    const [classesItems, setClassesItems] = useState<ClassItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 6;

    // Refs for scroll-triggered animations
    const heroRef = useRef(null);
    const methodsRef = useRef(null);
    const benefitsRef = useRef(null);
    const coursesRef = useRef(null);
    const contactRef = useRef(null);

    // Detect when sections are in view
    const heroInView = useInView(heroRef, { once: true, margin: '0px 0px -50px 0px' });
    const methodsInView = useInView(methodsRef, { once: true, margin: '0px 0px -50px 0px' });
    const benefitsInView = useInView(benefitsRef, { once: true, margin: '0px 0px -50px 0px' });
    const coursesInView = useInView(coursesRef, { once: true, margin: '0px 0px -50px 0px' });
    const contactInView = useInView(contactRef, { once: true, margin: '0px 0px -50px 0px' });

    const fetchClasses = async (page: number = 1) => {
        try {
            const data = await GetClass(page, limit);
            setClassesItems(data.metadata.classes);
            setCurrentPage(data.metadata.page);
            setTotalPages(data.metadata.totalPages);
        } catch (error) {
            console.error('Failed to fetch classes:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch classes',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
        }
    };

    // Animation variants
    const sectionVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
    };

    return (
        <div className="space-y-16 px-6 py-10 bg-white dark:bg-gray-900 transition-colors duration-300 md:px-16">
            <motion.div
                ref={heroRef}
                initial="hidden"
                animate={heroInView ? 'visible' : 'hidden'}
                variants={sectionVariants}
            >
                <HeroSection />
            </motion.div>
            <hr className="border-t border-[#657ED4]/20 dark:border-[#5AD3AF]/20 my-10" />
            <motion.div
                ref={methodsRef}
                initial="hidden"
                animate={methodsInView ? 'visible' : 'hidden'}
                variants={sectionVariants}
            >
                <LearningMethods />
            </motion.div>
            <hr className="border-t border-[#657ED4]/20 dark:border-[#5AD3AF]/20 my-10" />
            <motion.div
                ref={benefitsRef}
                initial="hidden"
                animate={benefitsInView ? 'visible' : 'hidden'}
                variants={sectionVariants}
            >
                <BenefitsSection />
            </motion.div>
            <hr className="border-t border-[#657ED4]/20 dark:border-[#5AD3AF]/20 my-10" />
            <motion.div
                ref={coursesRef}
                initial="hidden"
                animate={coursesInView ? 'visible' : 'hidden'}
                variants={sectionVariants}
            >
                <CoursesList
                    classesItems={classesItems}
                    loading={loading}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                />
            </motion.div>
            <hr className="border-t border-[#657ED4]/20 dark:border-[#5AD3AF]/20 my-10" />
            <motion.div
                ref={contactRef}
                initial="hidden"
                animate={contactInView ? 'visible' : 'hidden'}
                variants={sectionVariants}
            >
                <ContactForm />
            </motion.div>
            <hr className="border-t border-[#657ED4]/20 dark:border-[#5AD3AF]/20 my-10" />
        </div>
    );
}
