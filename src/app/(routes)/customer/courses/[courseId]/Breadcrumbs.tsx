import Link from 'next/link';

interface BreadcrumbsProps {
    courseId: string;
    category: string;
    title: string;
}

export default function Breadcrumbs({ courseId, category, title }: BreadcrumbsProps) {
    return (
        <nav className="text-sm text-gray-600 dark:text-gray-400">
            <Link href="/customer/courses" className="hover:underline">
                Courses
            </Link>

            <span className="mx-2">/</span>
            <Link href={`/customer/courses?category=${category}`} className="hover:underline">
                {category}
            </Link>
            <span className="mx-2">/</span>

            <span className="text-gray-900 dark:text-gray-100">{title}</span>
            <h2 className="text-lg font-semibold hidden">{courseId}</h2>
        </nav>
    );
}
