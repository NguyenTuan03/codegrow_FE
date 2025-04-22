'use client';

import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { GetServicesTicket } from '@/lib/services/services/getallservice';
import ServiceTicketReplyForm from '@/app/(routes)/qaqc/services/Reply-form';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface ServiceTicket {
    _id: string;
    sender: Sender;
    message: string;
    status: string;
    qaqcReply?: string;
    createdAt: string;
    updatedAt: string;
}
interface Sender {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
}

export default function SupportPage() {
    const [tickets, setTickets] = useState<ServiceTicket[]>([]);
    const [filteredTickets, setFilteredTickets] = useState<ServiceTicket[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<string>('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [expandedRow, setExpandedRow] = useState<string | null>(null);
    const limit = 10;

    const fetchTickets = async (page: number = 1) => {
        try {
            setLoading(true);
            const response = await GetServicesTicket(page, limit);
            console.log('API Response:', response);
            if (response?.metadata?.tickets && Array.isArray(response.metadata.tickets)) {
                // Normalize status to lowercase for consistency
                const normalizedTickets = response.metadata.tickets.map(
                    (ticket: ServiceTicket) => ({
                        ...ticket,
                        status: ticket.status.toLowerCase(),
                    }),
                );
                setTickets(normalizedTickets);
                setCurrentPage(response.metadata.page || 1);
                setTotalPages(response.metadata.totalPages || 1);
                filterTickets(normalizedTickets, statusFilter);
            } else {
                throw new Error('Invalid response from API');
            }
        } catch (error) {
            console.error('Failed to fetch service tickets:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch service tickets. Please try again later.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const filterTickets = (tickets: ServiceTicket[], status: string) => {
        if (status === 'All') {
            setFilteredTickets(tickets);
        } else {
            setFilteredTickets(tickets.filter((ticket) => ticket.status === status));
        }
    };

    const handleStatusFilterChange = (value: string) => {
        setStatusFilter(value);
        filterTickets(tickets, value);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
            setExpandedRow(null);
            fetchTickets(page);
        }
    };

    const toggleRow = (ticketId: string) => {
        setExpandedRow(expandedRow === ticketId ? null : ticketId);
    };

    const handleReplySuccess = (ticketId: string, qaqcReply: string) => {
        setTickets((prev) =>
            prev.map((ticket) =>
                ticket._id === ticketId ? { ...ticket, qaqcReply, status: 'resolved' } : ticket,
            ),
        );
        filterTickets(
            tickets.map((ticket) =>
                ticket._id === ticketId ? { ...ticket, qaqcReply, status: 'resolved' } : ticket,
            ),
            statusFilter,
        );
        setExpandedRow(null);
    };

    useEffect(() => {
        fetchTickets(currentPage);
    }, [currentPage]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Service Tickets
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Manage and respond to customer service requests
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Select onValueChange={handleStatusFilterChange} value={statusFilter}>
                            <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                                <SelectItem
                                    value="All"
                                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    All Tickets
                                </SelectItem>
                                <SelectItem
                                    value="open"
                                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <span className="flex items-center">
                                        <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                                        Open
                                    </span>
                                </SelectItem>
                                <SelectItem
                                    value="resolved"
                                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <span className="flex items-center">
                                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                                        Resolved
                                    </span>
                                </SelectItem>
                                <SelectItem
                                    value="rejected"
                                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <span className="flex items-center">
                                        <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                                        Rejected
                                    </span>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            onClick={() => fetchTickets(currentPage)}
                            variant="outline"
                            className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                            aria-label="Refresh tickets"
                        >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh
                        </Button>
                    </div>
                </div>

                {filteredTickets.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            No tickets found
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {statusFilter === 'All'
                                ? 'There are currently no service tickets.'
                                : `No ${statusFilter} tickets found.`}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <Table>
                                <TableHeader className="bg-gray-50 dark:bg-gray-700">
                                    <TableRow>
                                        <TableHead className="text-gray-600 dark:text-gray-300 font-medium py-4">
                                            Sender
                                        </TableHead>
                                        <TableHead className="text-gray-600 dark:text-gray-300 font-medium">
                                            Message Preview
                                        </TableHead>
                                        <TableHead className="text-gray-600 dark:text-gray-300 font-medium">
                                            Status
                                        </TableHead>
                                        <TableHead className="text-gray-600 dark:text-gray-300 font-medium">
                                            Date Created
                                        </TableHead>
                                        <TableHead className="w-10"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredTickets.map((ticket) => (
                                        <>
                                            <TableRow
                                                key={ticket._id}
                                                onClick={() => toggleRow(ticket._id)}
                                                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
                                            >
                                                <TableCell className="py-4">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium mr-3">
                                                            {ticket.sender.fullName
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900 dark:text-white">
                                                                {ticket.sender.fullName}
                                                            </p>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                {ticket.sender.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-4">
                                                    <p className="text-gray-800 dark:text-gray-200 line-clamp-2">
                                                        {ticket.message}
                                                    </p>
                                                </TableCell>
                                                <TableCell className="py-4">
                                                    <Badge
                                                        variant={
                                                            ticket.status === 'rejected'
                                                                ? 'secondary'
                                                                : ticket.status === 'resolved'
                                                                  ? 'secondary' // Map "success" to "default"
                                                                  : 'default'
                                                        }
                                                        className="capitalize"
                                                    >
                                                        {ticket.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="py-4 text-gray-600 dark:text-gray-400">
                                                    {new Date(ticket.createdAt).toLocaleDateString(
                                                        'en-US',
                                                        {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                        },
                                                    )}
                                                </TableCell>
                                                <TableCell className="py-4 text-right">
                                                    {expandedRow === ticket._id ? (
                                                        <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                    ) : (
                                                        <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                            {expandedRow === ticket._id && (
                                                <TableRow className="border-b border-gray-200 dark:border-gray-700">
                                                    <TableCell colSpan={5} className="p-0">
                                                        <div className="bg-gray-50 dark:bg-gray-700/30 px-6 py-4">
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                <div>
                                                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                                                        SENDER DETAILS
                                                                    </h4>
                                                                    <div className="space-y-2">
                                                                        <p className="text-gray-900 dark:text-white">
                                                                            <span className="font-medium">
                                                                                Name:
                                                                            </span>{' '}
                                                                            {ticket.sender.fullName}
                                                                        </p>
                                                                        <p className="text-gray-900 dark:text-white">
                                                                            <span className="font-medium">
                                                                                Email:
                                                                            </span>{' '}
                                                                            {ticket.sender.email}
                                                                        </p>
                                                                        <p className="text-gray-900 dark:text-white">
                                                                            <span className="font-medium">
                                                                                Phone:
                                                                            </span>{' '}
                                                                            {ticket.sender.phone ||
                                                                                'Not provided'}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                                                        TICKET DETAILS
                                                                    </h4>
                                                                    <div className="space-y-2">
                                                                        <p className="text-gray-900 dark:text-white">
                                                                            <span className="font-medium">
                                                                                Status:
                                                                            </span>
                                                                            <Badge
                                                                                variant={
                                                                                    ticket.status ===
                                                                                    'open'
                                                                                        ? 'default'
                                                                                        : ticket.status ===
                                                                                            'resolved'
                                                                                          ? 'default' // Map "success" to "default"
                                                                                          : 'destructive'
                                                                                }
                                                                                className="ml-2 capitalize"
                                                                            >
                                                                                {ticket.status}
                                                                            </Badge>
                                                                        </p>
                                                                        <p className="text-gray-900 dark:text-white">
                                                                            <span className="font-medium">
                                                                                Created:
                                                                            </span>{' '}
                                                                            {new Date(
                                                                                ticket.createdAt,
                                                                            ).toLocaleString()}
                                                                        </p>
                                                                        {ticket.updatedAt !==
                                                                            ticket.createdAt && (
                                                                            <p className="text-gray-900 dark:text-white">
                                                                                <span className="font-medium">
                                                                                    Last Updated:
                                                                                </span>{' '}
                                                                                {new Date(
                                                                                    ticket.updatedAt,
                                                                                ).toLocaleString()}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="mt-6">
                                                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                                                    MESSAGE
                                                                </h4>
                                                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                                                    <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
                                                                        {ticket.message}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            {ticket.qaqcReply && (
                                                                <div className="mt-6">
                                                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                                                        PREVIOUS REPLY
                                                                    </h4>
                                                                    <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                                                                        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
                                                                            {ticket.qaqcReply}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {ticket.status !== 'resolved' &&
                                                                ticket.status !== 'rejected' && (
                                                                    <div className="mt-6">
                                                                        <ServiceTicketReplyForm
                                                                            ticketId={ticket._id}
                                                                            initialReply={
                                                                                ticket.qaqcReply ||
                                                                                ''
                                                                            }
                                                                            onReplySuccess={
                                                                                handleReplySuccess
                                                                            }
                                                                        />
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {totalPages > 1 && (
                            <div className="mt-8">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                className={
                                                    currentPage === 1
                                                        ? 'pointer-events-none opacity-50'
                                                        : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
                                                }
                                            />
                                        </PaginationItem>
                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                            let pageNum;
                                            if (totalPages <= 5) {
                                                pageNum = i + 1;
                                            } else if (currentPage <= 3) {
                                                pageNum = i + 1;
                                            } else if (currentPage >= totalPages - 2) {
                                                pageNum = totalPages - 4 + i;
                                            } else {
                                                pageNum = currentPage - 2 + i;
                                            }
                                            return (
                                                <PaginationItem key={pageNum}>
                                                    <PaginationLink
                                                        onClick={() => handlePageChange(pageNum)}
                                                        isActive={currentPage === pageNum}
                                                        className={
                                                            currentPage === pageNum
                                                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                                        }
                                                    >
                                                        {pageNum}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            );
                                        })}
                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                className={
                                                    currentPage === totalPages
                                                        ? 'pointer-events-none opacity-50'
                                                        : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
                                                }
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
