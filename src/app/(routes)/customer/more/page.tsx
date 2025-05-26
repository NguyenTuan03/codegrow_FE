// @/app/(routes)/mentor-courses/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { GetClass } from '@/lib/services/class/getclass';
import { toast } from '@/components/ui/use-toast';
import ContactForm from '@/app/(routes)/customer/more/contact-form';
import HeroSection from '@/app/(routes)/customer/more/HeroSection';
import LearningMethods from '@/app/(routes)/customer/more/LearningMethods';
import BenefitsSection from '@/app/(routes)/customer/more/BenefitsSection';
import CoursesList from '@/app/(routes)/customer/more/ClassList';

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

    return (
        <div className="space-y-16 px-6 py-10 bg-white dark:bg-gray-900 transition-colors duration-300 md:px-16">
            <HeroSection />
            <LearningMethods />
            <hr className="border-t border-[#657ED4]/20 dark:border-[#5AD3AF]/20 my-10" />
            <BenefitsSection />
            <hr className="border-t border-[#657ED4]/20 dark:border-[#5AD3AF]/20 my-10" />
            <CoursesList
                classesItems={classesItems}
                loading={loading}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
            <ContactForm />
            <hr className="border-t border-[#657ED4]/20 dark:border-[#5AD3AF]/20 my-10" />
        </div>
    );
}
