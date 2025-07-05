'use client';

import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { getPendingEnrollments } from '@/lib/services/admin/getlistcus';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, XCircle, Search } from 'lucide-react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from '@/components/ui/pagination';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'; // Assuming you have Dialog from @radix-ui
import { debounce } from 'lodash';
import { Input } from '@/components/ui/input';

interface Enrollment {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    note?: string;
    isConsulted: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export default function PendingEnrollmentsList() {
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Number of items per page
    const [searchQuery, setSearchQuery] = useState(''); // Thêm trạng thái tìm kiếm
    const [approveDialogOpen, setApproveDialogOpen] = useState(false); // State for approve confirmation
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false); // State for reject confirmation
    const [selectedEnrollmentId, setSelectedEnrollmentId] = useState<string | null>(null); // Track selected enrollment

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await getPendingEnrollments();
            console.log('Pending enrollments:', res);

            type RawEnrollment = {
                _id: string;
                user: {
                    fullName: string;
                    email: string;
                };
                phone?: string;
                note?: string;
                isConsulted: boolean;
                enrolledAt?: string;
                updatedAt?: string;
            };

            const mappedEnrollments = (res.metadata as RawEnrollment[]).map((item) => ({
                _id: item._id,
                fullName: item.user.fullName,
                email: item.user.email,
                phone: item.phone || '',
                note: item.note || '',
                isConsulted: item.isConsulted,
                createdAt: item.enrolledAt,
                updatedAt: item.updatedAt || new Date().toISOString(),
            }));

            setEnrollments(mappedEnrollments);
        } catch (err) {
            setError(`Failed to load enrollments: ${err}`);
            toast({
                title: 'Error',
                description: 'Could not fetch pending enrollments',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleApprove = async (enrollmentId: string) => {
        try {
            toast({
                title: 'Success',
                description: `Enrollment approved!`,
                variant: 'default',
                className:
                    'bg-[#657ED4] dark:bg-[#5AD3AF] text-white dark:text-black font-semibold',
            });
            setEnrollments(enrollments.filter((enrollment) => enrollment._id !== enrollmentId));
        } catch (err) {
            console.error('Error approving enrollment:', err);
            toast({
                title: 'Error',
                description: 'Failed to approve enrollment',
                variant: 'destructive',
            });
        }
    };

    const handleReject = async (enrollmentId: string) => {
        try {
            toast({
                title: 'Success',
                description: `Enrollment rejected!`,
                variant: 'destructive',
                className:
                    'bg-[#657ED4] dark:bg-[#5AD3AF] text-white dark:text-black font-semibold',
            });
            setEnrollments(enrollments.filter((enrollment) => enrollment._id !== enrollmentId));
        } catch (err) {
            console.error('Error approving enrollment:', err);
            toast({
                title: 'Error',
                description: 'Failed to reject enrollment',
                variant: 'destructive',
            });
        }
    };

    // Pagination logic
    const totalPages = Math.ceil(enrollments.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEnrollments = enrollments.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-12 w-12 text-blue-500 animate-spin cursor-default" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-6 bg-red-50 dark:bg-red-900/50 rounded-lg shadow-md">
                <p className="text-red-600 dark:text-red-400 font-medium cursor-default">{error}</p>
            </div>
        );
    }

    const debouncedSearch = debounce((query: string) => {
        setCurrentPage(1); // Reset to first page on new search
        if (query.trim() === '') {
            fetchData(); // Re-fetch original enrollments
            return;
        } else {
            const filteredEnrollments = enrollments.filter(
                (enrollment) =>
                    enrollment.fullName.toLowerCase().includes(query.toLowerCase()) ||
                    enrollment.email.toLowerCase().includes(query.toLowerCase()),
            );
            setEnrollments(filteredEnrollments);
        }
    }, 300);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        setSearchQuery(value); // Update search query state
        debouncedSearch(value); // Debounced search
    };

    return (
        <div className="p-6">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg">
                <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-3xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 cursor-default">
                        <span>Pending Enrollments</span>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            ({enrollments.length})
                        </span>
                    </CardTitle>
                    <div className="mt-4 relative w-full sm:w-1/2 lg:w-1/3">
                        <Input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="pl-10 pr-4 py-2 rounded-full border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200 shadow-sm"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    {enrollments.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <p className="text-lg font-medium cursor-default">
                                No pending enrollments found.
                            </p>
                            <p className="text-sm mt-2 cursor-default">
                                New enrollments will appear here when submitted.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50 dark:bg-gray-700">
                                            <TableHead className="text-sm font-semibold text-gray-700 dark:text-gray-200 py-4 cursor-default">
                                                Name
                                            </TableHead>
                                            <TableHead className="text-sm font-semibold text-gray-700 dark:text-gray-200 py-4 cursor-default">
                                                Email
                                            </TableHead>
                                            <TableHead className="text-sm font-semibold text-gray-700 dark:text-gray-200 py-4 cursor-default">
                                                Phone
                                            </TableHead>
                                            <TableHead className="text-sm font-semibold text-gray-700 dark:text-gray-200 py-4 cursor-default">
                                                Note
                                            </TableHead>
                                            <TableHead className="text-sm font-semibold text-gray-700 dark:text-gray-200 py-4 cursor-default">
                                                Consulted
                                            </TableHead>
                                            <TableHead className="text-sm font-semibold text-gray-700 dark:text-gray-200 py-4 cursor-default">
                                                Enrolled At
                                            </TableHead>
                                            <TableHead className="text-sm font-semibold text-gray-700 dark:text-gray-200 py-4 cursor-default">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {currentEnrollments.map((enrollment) => (
                                            <TableRow
                                                key={enrollment._id}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 cursor-default"
                                            >
                                                <TableCell className="text-gray-800 dark:text-gray-100 font-medium py-4 cursor-default">
                                                    {enrollment.fullName}
                                                </TableCell>
                                                <TableCell className="text-gray-800 dark:text-gray-100 py-4 cursor-default">
                                                    {enrollment.email}
                                                </TableCell>
                                                <TableCell className="text-gray-800 dark:text-gray-100 py-4 cursor-default">
                                                    {enrollment.phone || '-'}
                                                </TableCell>
                                                <TableCell className="max-w-xs truncate text-gray-600 dark:text-gray-400 py-4 cursor-default">
                                                    {enrollment.note || '-'}
                                                </TableCell>
                                                <TableCell className="py-4">
                                                    <span
                                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium cursor-default ${
                                                            enrollment.isConsulted
                                                                ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300'
                                                                : 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300'
                                                        }`}
                                                    >
                                                        {enrollment.isConsulted ? (
                                                            <CheckCircle className="w-4 h-4 mr-1" />
                                                        ) : (
                                                            <XCircle className="w-4 h-4 mr-1" />
                                                        )}
                                                        {enrollment.isConsulted ? 'Yes' : 'No'}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-gray-600 dark:text-gray-400 py-4 cursor-default">
                                                    {enrollment.createdAt
                                                        ? formatDate(enrollment.createdAt)
                                                        : '-'}
                                                </TableCell>
                                                <TableCell className="py-4 flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        className="bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm transition-all duration-200 flex items-center gap-1 cursor-pointer"
                                                        onClick={() => {
                                                            setSelectedEnrollmentId(enrollment._id);
                                                            setApproveDialogOpen(true);
                                                        }}
                                                    >
                                                        <CheckCircle className="w-4 h-4" />
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        className="bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm transition-all duration-200 flex items-center gap-1 cursor-pointer"
                                                        onClick={() => {
                                                            setSelectedEnrollmentId(enrollment._id);
                                                            setRejectDialogOpen(true);
                                                        }}
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                        Reject
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Approve Confirmation Dialog */}
                            <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
                                <DialogContent className="z-50 bg-amber-50">
                                    <DialogHeader>
                                        <DialogTitle>Confirm Approval</DialogTitle>
                                    </DialogHeader>
                                    <DialogDescription>
                                        Are you sure you want to approve this enrollment?
                                    </DialogDescription>
                                    <DialogFooter>
                                        <Button
                                            variant="outline"
                                            onClick={() => setApproveDialogOpen(false)}
                                            className="mr-2"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                if (selectedEnrollmentId) {
                                                    handleApprove(selectedEnrollmentId);
                                                    setApproveDialogOpen(false);
                                                }
                                            }}
                                        >
                                            Confirm
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            {/* Reject Confirmation Dialog */}
                            <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
                                <DialogContent className="z-50 bg-amber-100">
                                    <DialogHeader>
                                        <DialogTitle>Confirm Rejection</DialogTitle>
                                    </DialogHeader>
                                    <DialogDescription>
                                        Are you sure you want to reject this enrollment?
                                    </DialogDescription>
                                    <DialogFooter>
                                        <Button
                                            variant="outline"
                                            onClick={() => setRejectDialogOpen(false)}
                                            className="mr-2"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            className="bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm transition-all duration-200"
                                            variant="destructive"
                                            onClick={() => {
                                                if (selectedEnrollmentId) {
                                                    handleReject(selectedEnrollmentId);
                                                    setRejectDialogOpen(false);
                                                }
                                            }}
                                        >
                                            Confirm
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="mt-6 flex justify-center">
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    onClick={() =>
                                                        handlePageChange(currentPage - 1)
                                                    }
                                                    className={
                                                        currentPage === 1
                                                            ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                                            : 'cursor-pointer text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full'
                                                    }
                                                    aria-disabled={currentPage === 1}
                                                />
                                            </PaginationItem>

                                            {Array.from(
                                                { length: totalPages },
                                                (_, i) => i + 1,
                                            ).map((page) => (
                                                <PaginationItem key={page}>
                                                    <PaginationLink
                                                        onClick={() => handlePageChange(page)}
                                                        isActive={currentPage === page}
                                                        className={
                                                            currentPage === page
                                                                ? 'bg-[#657ED4] dark:bg-[#5AD3AF] text-white hover:bg-[#424c70] dark:hover:bg-[#4ac2a0] rounded-full cursor-pointer'
                                                                : 'cursor-pointer text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full'
                                                        }
                                                    >
                                                        {page}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            ))}

                                            <PaginationItem>
                                                <PaginationNext
                                                    onClick={() =>
                                                        handlePageChange(currentPage + 1)
                                                    }
                                                    className={
                                                        currentPage === totalPages
                                                            ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                                            : 'cursor-pointer text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full'
                                                    }
                                                    aria-disabled={currentPage === totalPages}
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
