'use client';

import { useEffect, useState } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { EyeIcon, PlusIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { getUser } from '@/lib/services/admin/getuser';
import { GetAllReview } from '@/lib/services/qaqc/getAllReview';
import { CreateReviewForm } from './CreateReviewForm';
import { ViewDetailReview } from './ViewDetailReview';

// Define interfaces for type safety
type Mentor = {
    _id: string;
    fullName: string;
    email: string;
    role: string;
};

type MentorTableData = {
    name: string;
    email: string;
    _id: string;
};

type ReviewItem = {
    _id: string;
    comment: string;
    createdAt: string;
    mentor: {
        fullName: string;
    };
    rating: number;
};

// Columns for Mentors table
const mentorColumns: ColumnDef<MentorTableData>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium uppercase">
                    <Avatar>
                        <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200">
                            {(row.getValue('name') as string).charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <span className="text-gray-800 dark:text-gray-200">
                    {row.getValue('name') as string}
                </span>
            </div>
        ),
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                <span className="text-gray-800 dark:text-gray-200">
                    {row.getValue('email') as string}
                </span>
            </div>
        ),
    },
    {
        accessorKey: 'action',
        header: 'Action',
        cell: ({ row }) => (
            <div className="flex gap-2">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            title="Add Review"
                            className="flex gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Add
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white dark:bg-gray-800">
                        <DialogHeader>
                            <DialogTitle className="text-gray-900 dark:text-white">
                                Add Review for {row.getValue('name')}
                            </DialogTitle>
                        </DialogHeader>
                        <CreateReviewForm mentorId={row.original._id} />
                    </DialogContent>
                </Dialog>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            title="View Reviews"
                            className="flex gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <EyeIcon className="w-4 h-4" />
                            View Detail
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl bg-white dark:bg-gray-800">
                        <DialogHeader>
                            <DialogTitle className="text-gray-900 dark:text-white">
                                Reviews for {row.getValue('name')}
                            </DialogTitle>
                        </DialogHeader>
                        <ViewDetailReview mentorId={row.original._id} />
                    </DialogContent>
                </Dialog>
            </div>
        ),
    },
];

// Columns for Review History table
const reviewColumns: ColumnDef<ReviewItem>[] = [
    {
        accessorKey: 'mentor.fullName',
        header: 'Reviewer',
        cell: ({ row }) => (
            <span className="text-gray-800 dark:text-gray-200">
                {row.original.mentor?.fullName || 'N/A'}
            </span>
        ),
    },
    {
        accessorKey: 'comment',
        header: 'Comment',
        cell: ({ row }) => (
            <span className="text-gray-800 dark:text-gray-200">{row.getValue('comment')}</span>
        ),
    },
    {
        accessorKey: 'createdAt',
        header: 'Date',
        cell: ({ row }) => (
            <span className="text-gray-800 dark:text-gray-200">
                {new Date(row.getValue('createdAt')).toLocaleDateString()}
            </span>
        ),
    },
    {
        accessorKey: 'rating',
        header: 'Rating',
        cell: ({ row }) => (
            <span className="text-gray-800 dark:text-gray-200">{row.getValue('rating')}</span>
        ),
    },
];

export default function MentorsPage() {
    const [allMentors, setAllMentors] = useState<MentorTableData[]>([]);
    const [mentorData, setMentorData] = useState<MentorTableData[]>([]);
    const [reviewData, setReviewData] = useState<ReviewItem[]>([]);
    const [loadingMentors, setLoadingMentors] = useState(true);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [errorMentors, setErrorMentors] = useState<string | null>(null);
    const [errorReviews, setErrorReviews] = useState<string | null>(null);
    const [mentorCurrentPage, setMentorCurrentPage] = useState(1);
    const [mentorPageSize, setMentorPageSize] = useState(10);
    const [mentorTotalPages, setMentorTotalPages] = useState(1);
    const [reviewCurrentPage, setReviewCurrentPage] = useState(1);
    const [reviewPageSize, setReviewPageSize] = useState(10);
    const [reviewTotalPages, setReviewTotalPages] = useState(1);

    const fetchMentors = async () => {
        try {
            setLoadingMentors(true);
            const response = await getUser();
            console.log('Mentors API Response:', response);

            const mentors: Mentor[] = response.metadata.users;
            const filteredMentors = mentors.filter((mentor) => mentor.role === 'mentor');
            const mappedData: MentorTableData[] = filteredMentors.map((mentor) => ({
                name: mentor.fullName,
                email: mentor.email,
                _id: mentor._id,
            }));

            setAllMentors(mappedData);
            setLoadingMentors(false);
        } catch (error) {
            setErrorMentors('Error fetching mentors');
            setLoadingMentors(false);
            console.error('Error fetching mentors:', error);
        }
    };

    useEffect(() => {
        const start = (mentorCurrentPage - 1) * mentorPageSize;
        const end = start + mentorPageSize;
        const paginatedMentors = allMentors.slice(start, end);
        setMentorData(paginatedMentors);

        const total = Math.ceil(allMentors.length / mentorPageSize);
        setMentorTotalPages(total > 0 ? total : 1);
    }, [allMentors, mentorCurrentPage, mentorPageSize]);

    const fetchReviews = async () => {
        try {
            setLoadingReviews(true);
            const data = await GetAllReview({
                page: reviewCurrentPage,
                limit: reviewPageSize,
            });
            console.log('Reviews API Response:', data);

            setReviewData(data.metadata.reviews || data.metadata);
            const total =
                data.metadata.totalPages ||
                Math.ceil((data.metadata.totalItems || 0) / reviewPageSize);
            setReviewTotalPages(total > 0 ? total : 1);
            setLoadingReviews(false);
        } catch (error) {
            setErrorReviews('Error fetching reviews');
            setLoadingReviews(false);
            console.error('Error fetching reviews:', error);
        }
    };

    useEffect(() => {
        fetchMentors();
    }, []);

    useEffect(() => {
        fetchReviews();
    }, [reviewCurrentPage, reviewPageSize]);

    const mentorTable = useReactTable({
        data: mentorData,
        columns: mentorColumns,
        getCoreRowModel: getCoreRowModel(),
    });

    const reviewTable = useReactTable({
        data: reviewData,
        columns: reviewColumns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleMentorPageChange = (page: number) => {
        setMentorCurrentPage(page);
    };

    const handleMentorPageSizeChange = (value: string) => {
        setMentorPageSize(Number(value));
        setMentorCurrentPage(1);
    };

    const getMentorPageNumbers = () => {
        const pages: number[] = [];
        const maxPagesToShow = 5;
        const startPage = Math.max(1, mentorCurrentPage - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(mentorTotalPages, startPage + maxPagesToShow - 1);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const handleReviewPageChange = (page: number) => {
        setReviewCurrentPage(page);
    };

    const handleReviewPageSizeChange = (value: string) => {
        setReviewPageSize(Number(value));
        setReviewCurrentPage(1);
    };

    const getReviewPageNumbers = () => {
        const pages: number[] = [];
        const maxPagesToShow = 5;
        const startPage = Math.max(1, reviewCurrentPage - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(reviewTotalPages, startPage + maxPagesToShow - 1);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className=" mx-auto py-8 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen">
            {/* Mentors Section */}
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Mentors</h2>
            {loadingMentors && (
                <p className="text-center text-gray-500 dark:text-gray-400">Loading mentors...</p>
            )}
            {errorMentors && (
                <p className="text-center text-red-500 dark:text-red-400">{errorMentors}</p>
            )}
            {!loadingMentors && !errorMentors && (
                <>
                    <div className="rounded-lg border border-gray-200 dark:border-gray-700 mb-4 shadow-sm bg-white dark:bg-gray-800">
                        <Table>
                            <TableHeader>
                                {mentorTable.getHeaderGroups().map((headerGroup) => (
                                    <TableRow
                                        key={headerGroup.id}
                                        className="border-b border-gray-200 dark:border-gray-700"
                                    >
                                        {headerGroup.headers.map((header) => (
                                            <TableHead
                                                key={header.id}
                                                className="text-gray-900 dark:text-gray-100 font-semibold bg-gray-100 dark:bg-gray-700"
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {mentorTable.getRowModel().rows.length ? (
                                    mentorTable.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext(),
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={mentorColumns.length}
                                            className="h-24 text-center text-gray-500 dark:text-gray-400"
                                        >
                                            No mentors found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination Controls for Mentors */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Items per page:
                            </span>
                            <Select
                                value={mentorPageSize.toString()}
                                onValueChange={handleMentorPageSizeChange}
                            >
                                <SelectTrigger className="w-[100px] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                                    <SelectItem
                                        value="10"
                                        className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        10
                                    </SelectItem>
                                    <SelectItem
                                        value="20"
                                        className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        20
                                    </SelectItem>
                                    <SelectItem
                                        value="50"
                                        className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        50
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() =>
                                            handleMentorPageChange(mentorCurrentPage - 1)
                                        }
                                        className={`${
                                            mentorCurrentPage === 1
                                                ? 'pointer-events-none opacity-50'
                                                : ''
                                        } text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600`}
                                    />
                                </PaginationItem>

                                {getMentorPageNumbers().map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            onClick={() => handleMentorPageChange(page)}
                                            isActive={mentorCurrentPage === page}
                                            className={`${
                                                mentorCurrentPage === page
                                                    ? 'bg-blue-500 text-white dark:bg-blue-600'
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            } border-gray-300 dark:border-gray-600`}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() =>
                                            handleMentorPageChange(mentorCurrentPage + 1)
                                        }
                                        className={`${
                                            mentorCurrentPage === mentorTotalPages
                                                ? 'pointer-events-none opacity-50'
                                                : ''
                                        } text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600`}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </>
            )}

            {/* Review History Section */}
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Review History
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
                This section allows you to review the history of QAQC activities.
            </p>
            {loadingReviews && (
                <p className="text-center text-gray-500 dark:text-gray-400">Loading reviews...</p>
            )}
            {errorReviews && (
                <p className="text-center text-red-500 dark:text-red-400">{errorReviews}</p>
            )}
            {!loadingReviews && !errorReviews && (
                <>
                    <div className="rounded-lg border border-gray-200 dark:border-gray-700 mb-4 shadow-sm bg-white dark:bg-gray-800">
                        <Table>
                            <TableHeader>
                                {reviewTable.getHeaderGroups().map((headerGroup) => (
                                    <TableRow
                                        key={headerGroup.id}
                                        className="border-b border-gray-200 dark:border-gray-700"
                                    >
                                        {headerGroup.headers.map((header) => (
                                            <TableHead
                                                key={header.id}
                                                className="text-gray-900 dark:text-gray-100 font-semibold bg-gray-100 dark:bg-gray-700"
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {reviewTable.getRowModel().rows.length ? (
                                    reviewTable.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext(),
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={reviewColumns.length}
                                            className="h-24 text-center text-gray-500 dark:text-gray-400"
                                        >
                                            No reviews found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination Controls for Review History */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Items per page:
                            </span>
                            <Select
                                value={reviewPageSize.toString()}
                                onValueChange={handleReviewPageSizeChange}
                            >
                                <SelectTrigger className="w-[100px] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                                    <SelectItem
                                        value="10"
                                        className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        10
                                    </SelectItem>
                                    <SelectItem
                                        value="20"
                                        className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        20
                                    </SelectItem>
                                    <SelectItem
                                        value="50"
                                        className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        50
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() =>
                                            handleReviewPageChange(reviewCurrentPage - 1)
                                        }
                                        className={`${
                                            reviewCurrentPage === 1
                                                ? 'pointer-events-none opacity-50'
                                                : ''
                                        } text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600`}
                                    />
                                </PaginationItem>

                                {getReviewPageNumbers().map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            onClick={() => handleReviewPageChange(page)}
                                            isActive={reviewCurrentPage === page}
                                            className={`${
                                                reviewCurrentPage === page
                                                    ? 'bg-blue-500 text-white dark:bg-blue-600'
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            } border-gray-300 dark:border-gray-600`}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() =>
                                            handleReviewPageChange(reviewCurrentPage + 1)
                                        }
                                        className={`${
                                            reviewCurrentPage === reviewTotalPages
                                                ? 'pointer-events-none opacity-50'
                                                : ''
                                        } text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600`}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </>
            )}
        </div>
    );
}
