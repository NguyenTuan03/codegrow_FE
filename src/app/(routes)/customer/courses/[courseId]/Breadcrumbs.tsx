import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
    courseId: string;
    category: string;
    title: string;
}

export default function Breadcrumbs({ courseId, category, title }: BreadcrumbsProps) {
    return (
        <nav className="flex items-center text-base text-gray-600 dark:text-gray-400 space-x-2">
            <Link
                href="/customer/courses"
                className="hover:text-[#657ED4] dark:hover:text-[#5AD3AF] transition-colors duration-200"
            >
                Courses
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link
                href={`/customer/courses?category=${category}`}
                className="hover:text-[#657ED4] dark:hover:text-[#5AD3AF] transition-colors duration-200"
            >
                {category}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 dark:text-gray-100 font-medium truncate max-w-xs">
                {title}
            </span>
            <h2 className="hidden">{courseId}</h2>
        </nav>
    );
}
