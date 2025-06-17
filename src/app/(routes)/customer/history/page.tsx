'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from '@/components/ui/pagination';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import { fetchPaymentHistory } from '@/lib/services/api/getpayment'; // Adjust path if needed
import { Badge } from '@/components/ui/badge'; // Assuming you have a Badge component

interface PaymentHistory {
    id: string;
    user: string;
    amount: number;
    transactionId: string;
    status: string;
    createdAt: string;
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PaymentHistoryPage() {
    const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);
    const [filteredHistory, setFilteredHistory] = useState<PaymentHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState<string | null>(null);
    const limit = 5; // Number of items per page
    const router = useRouter();

    // Fetch payment history
    const fetchData = async (page: number = 1) => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('token');
            if (!token) {
                toast({
                    title: 'Error',
                    description: 'Token not found. Please log in again.',
                    variant: 'destructive',
                    className: 'bg-[#F76F8E] text-white dark:text-black font-semibold',
                });
                router.push('/login');
                return;
            }
            const tokenuser = JSON.parse(token);

            const userData = localStorage.getItem('user');
            if (!userData) {
                throw new Error('User data not found. Please log in.');
            }

            const user = JSON.parse(userData);
            const id = user.id;

            const response = await fetchPaymentHistory(tokenuser, id);

            console.log('Payment History Data:', response);

            if (response.status === 200) {
                const payments = response.metadata as PaymentHistory[];
                setPaymentHistory(payments);
                setFilteredHistory(payments);
                setTotalPages(Math.ceil(payments.length / limit));
                setCurrentPage(page);
            } else {
                throw new Error(response?.message || `Failed with status ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching payment history:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Generate pagination links with a limited range
    const getPaginationRange = () => {
        const delta = 2; // Number of pages to show on each side of current page
        const range: (number | string)[] = [];
        const start = Math.max(1, currentPage - delta);
        const end = Math.min(totalPages, currentPage + delta);

        if (start > 1) {
            range.push(1);
            if (start > 2) range.push('...');
        }

        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        if (end < totalPages) {
            if (end < totalPages - 1) range.push('...');
            range.push(totalPages);
        }

        return range;
    };

    // Search handling
    const debouncedSearch = useCallback(
        debounce((searchTerm: string) => {
            if (!searchTerm.trim()) {
                setFilteredHistory(paymentHistory);
                setTotalPages(Math.ceil(paymentHistory.length / limit));
                return;
            }
            const filtered = paymentHistory.filter(
                (item) =>
                    item.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.createdAt.toLowerCase().includes(searchTerm.toLowerCase()),
            );
            setFilteredHistory(filtered);
            setTotalPages(Math.ceil(filtered.length / limit));
            setCurrentPage(1); // Reset to first page on search
        }, 300),
        [paymentHistory],
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchQuery(value);
        debouncedSearch(value);
    };

    // Pagination logic
    const getPaginatedData = () => {
        const start = (currentPage - 1) * limit;
        const end = start + limit;
        return filteredHistory.slice(start, end);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-6 sm:p-10 mx-auto py-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-300"
        >
            <div className="max-w-8xl mx-auto">
                {/* Header and Search */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
                >
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                        Payment History
                    </h1>
                    <div className="relative w-full sm:w-1/2 lg:w-1/3">
                        <Input
                            type="text"
                            placeholder="Search by transaction ID, status, or date..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="pl-10 pr-4 py-3 rounded-full border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] transition-all duration-300 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 cursor-pointer"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                </motion.div>

                {loading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-center items-center h-64"
                    >
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5AD3AF]"></div>
                    </motion.div>
                ) : error ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
                    >
                        <p className="text-gray-600 dark:text-gray-400 text-base font-medium">
                            {error}
                        </p>
                    </motion.div>
                ) : (
                    <>
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                        <tr>
                                            <th className="py-3 px-4 font-semibold">
                                                Transaction ID
                                            </th>
                                            <th className="py-3 px-4 font-semibold">User</th>
                                            <th className="py-3 px-4 font-semibold">Amount</th>
                                            <th className="py-3 px-4 font-semibold">Status</th>
                                            <th className="py-3 px-4 font-semibold">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getPaginatedData().length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className="py-10 text-center text-gray-600 dark:text-gray-400"
                                                >
                                                    No payment history found.
                                                </td>
                                            </tr>
                                        ) : (
                                            getPaginatedData().map((payment) => (
                                                <motion.tr
                                                    key={payment.id}
                                                    variants={itemVariants}
                                                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200"
                                                >
                                                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                                                        #{payment.transactionId}
                                                    </td>
                                                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                                                        {payment.user}
                                                    </td>
                                                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                                                        ${payment.amount.toLocaleString()}
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <Badge
                                                            variant={
                                                                payment.status === 'completed'
                                                                    ? 'default'
                                                                    : payment.status === 'pending'
                                                                      ? 'secondary'
                                                                      : 'destructive'
                                                            }
                                                            className="text-sm font-medium"
                                                        >
                                                            {payment.status}
                                                        </Badge>
                                                    </td>
                                                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                                                        {new Date(
                                                            payment.createdAt,
                                                        ).toLocaleDateString()}
                                                    </td>
                                                </motion.tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {totalPages > 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-8 flex justify-center"
                            >
                                <Pagination className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md">
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                className={`cursor-pointer text-gray-600 dark:text-gray-400 hover:text-[#657ED4] dark:hover:text-[#5AD3AF] ${
                                                    currentPage === 1
                                                        ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                                        : ''
                                                }`}
                                            />
                                        </PaginationItem>
                                        {getPaginationRange().map((page, index) =>
                                            page === '...' ? (
                                                <PaginationItem key={`ellipsis-${index}`}>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            ) : (
                                                <PaginationItem key={page}>
                                                    <PaginationLink
                                                        onClick={() =>
                                                            handlePageChange(page as number)
                                                        }
                                                        isActive={currentPage === page}
                                                        className={`cursor-pointer rounded-full px-3 py-1 ${
                                                            currentPage === page
                                                                ? 'bg-[#657ED4] text-white dark:bg-[#5AD3AF] dark:text-black font-medium'
                                                                : 'text-gray-600 dark:text-gray-400 hover:text-[#657ED4] dark:hover:text-[#5AD3AF]'
                                                        }`}
                                                    >
                                                        {page}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            ),
                                        )}
                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                className={`cursor-pointer text-gray-600 dark:text-gray-400 hover:text-[#657ED4] dark:hover:text-[#5AD3AF] ${
                                                    currentPage === totalPages
                                                        ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                                        : ''
                                                }`}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </motion.div>
    );
}
