'use client';

import { useEffect, useState, useCallback } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { EyeIcon, PlusIcon, Search } from 'lucide-react';
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

import { Input } from '@/components/ui/input';
import { debounce } from 'lodash';
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
                <Avatar className="w-9 h-9">
                    <AvatarFallback className="bg-blue-100 dark:bg-[#5AD3AF] text-[#657ED4] dark:text-[#5AD3AF] font-medium cursor-default">
                        {(row.getValue('name') as string).charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <span className="text-gray-900 dark:text-gray-100 font-medium text-base cursor-default">
                    {row.getValue('name') as string}
                </span>
            </div>
        ),
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => (
            <span className="text-gray-700 dark:text-gray-300 text-base cursor-default">
                {row.getValue('email') as string}
            </span>
        ),
    },
    {
        accessorKey: 'action',
        header: 'Actions',
        cell: ({ row }) => (
            <div className="flex gap-2">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            title="Add Review"
                            className="flex gap-2 border-[#657ED4] dark:border-[#5AD3AF] text-[#657ED4] dark:text-[#5AD3AF] hover:bg-[#657ED4] hover:text-white dark:hover:bg-[#5AD3AF] dark:hover:text-black transition-colors rounded-lg cursor-pointer"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Add
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                        <DialogHeader>
                            <DialogTitle className="text-gray-900 dark:text-white text-xl font-semibold cursor-default">
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
                            title="View Review Details"
                            className="flex gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-lg cursor-pointer"
                        >
                            <EyeIcon className="w-4 h-4" />
                            View Detail
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                        <DialogHeader>
                            <DialogTitle className="text-gray-900 dark:text-white text-xl font-semibold cursor-default">
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
            <span className="text-gray-900 dark:text-gray-100 font-medium text-base cursor-default">
                {row.original.mentor?.fullName || 'N/A'}
            </span>
        ),
    },
    {
        accessorKey: 'comment',
        header: 'Comment',
        cell: ({ row }) => (
            <span className="text-gray-700 dark:text-gray-300 text-base cursor-default">
                {row.getValue('comment')}
            </span>
        ),
    },
    {
        accessorKey: 'createdAt',
        header: 'Date',
        cell: ({ row }) => (
            <span className="text-gray-700 dark:text-gray-300 text-base cursor-default">
                {new Date(row.getValue('createdAt')).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                })}
            </span>
        ),
    },
    {
        accessorKey: 'rating',
        header: 'Score',
        cell: ({ row }) => (
            <span className="text-yellow-600 dark:text-yellow-400 font-semibold text-base cursor-default">
                {row.getValue('rating')}/5
            </span>
        ),
    },
];

export default function MentorsPage() {
    const [allMentors, setAllMentors] = useState<MentorTableData[]>([]);
    const [mentorData, setMentorData] = useState<MentorTableData[]>([]);
    const [allReviews, setAllReviews] = useState<ReviewItem[]>([]);
    const [reviewData, setReviewData] = useState<ReviewItem[]>([]);
    const [loadingMentors, setLoadingMentors] = useState(true);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [errorMentors, setErrorMentors] = useState<string | null>(null);
    const [errorReviews, setErrorReviews] = useState<string | null>(null);
    const [mentorCurrentPage, setMentorCurrentPage] = useState(1);
    const [mentorPageSize] = useState(10);
    const [mentorTotalPages, setMentorTotalPages] = useState(1);
    const [reviewCurrentPage, setReviewCurrentPage] = useState(1);
    const [reviewPageSize] = useState(10);
    const [reviewTotalPages, setReviewTotalPages] = useState(1);
    const [mentorSearchQuery, setMentorSearchQuery] = useState('');
    const [reviewSearchQuery, setReviewSearchQuery] = useState('');

    const fetchMentors = async () => {
        try {
            setLoadingMentors(true);
            const response = await getUser();
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
            setErrorMentors('Error loading mentor list');
            setLoadingMentors(false);
            console.error('Error fetching mentors:', error);
        }
    };

    const fetchReviews = async () => {
        try {
            setLoadingReviews(true);
            const data = await GetAllReview({
                page: reviewCurrentPage,
                limit: reviewPageSize,
            });

            if (data && data.metadata) {
                setAllReviews(data.metadata.reviews || data.metadata);
                setReviewData(data.metadata.reviews || data.metadata);
                const total =
                    data.metadata.totalPages ||
                    Math.ceil((data.metadata.totalItems || 0) / reviewPageSize);
                setReviewTotalPages(total > 0 ? total : 1);
            } else {
                setAllReviews([]);
                setReviewData([]);
                setReviewTotalPages(1);
            }
            setLoadingReviews(false);
        } catch (error) {
            setErrorReviews('Error loading review list');
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

    useEffect(() => {
        let filteredMentors = [...allMentors];
        if (mentorSearchQuery) {
            filteredMentors = filteredMentors.filter(
                (mentor) =>
                    mentor.name.toLowerCase().includes(mentorSearchQuery.toLowerCase()) ||
                    mentor.email.toLowerCase().includes(mentorSearchQuery.toLowerCase()),
            );
        }
        const start = (mentorCurrentPage - 1) * mentorPageSize;
        const end = start + mentorPageSize;
        const paginatedMentors = filteredMentors.slice(start, end);
        setMentorData(paginatedMentors);

        const total = Math.ceil(filteredMentors.length / mentorPageSize);
        setMentorTotalPages(total > 0 ? total : 1);
    }, [allMentors, mentorCurrentPage, mentorPageSize, mentorSearchQuery]);

    useEffect(() => {
        let filteredReviews = [...allReviews];
        if (reviewSearchQuery) {
            filteredReviews = filteredReviews.filter(
                (review) =>
                    review.comment.toLowerCase().includes(reviewSearchQuery.toLowerCase()) ||
                    (review.mentor?.fullName &&
                        review.mentor.fullName
                            .toLowerCase()
                            .includes(reviewSearchQuery.toLowerCase())),
            );
        }
        setReviewData(filteredReviews);
        const total = Math.ceil(filteredReviews.length / reviewPageSize);
        setReviewTotalPages(total > 0 ? total : 1);
        setReviewCurrentPage(1);
    }, [allReviews, reviewSearchQuery, reviewPageSize]);

    const debouncedMentorSearch = useCallback(
        debounce((searchTerm) => {
            setMentorSearchQuery(searchTerm);
        }, 300),
        [],
    );

    const debouncedReviewSearch = useCallback(
        debounce((searchTerm) => {
            setReviewSearchQuery(searchTerm);
        }, 300),
        [],
    );

    const handleMentorSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        debouncedMentorSearch(value);
    };

    const handleReviewSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        debouncedReviewSearch(value);
    };

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
        if (page >= 1 && page <= mentorTotalPages) {
            setMentorCurrentPage(page);
        }
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
        if (page >= 1 && page <= reviewTotalPages) {
            setReviewCurrentPage(page);
        }
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
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
            {/* Mentors Section */}
            <section className="mb-12">
                <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white cursor-default">
                    Mentor List
                </h2>
                <div className="relative w-full sm:w-1/2 lg:w-1/3 mb-6">
                    <Input
                        type="text"
                        placeholder="Search by name or email..."
                        onChange={handleMentorSearchChange}
                        className="pl-10 pr-4 py-3 rounded-full border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] transition-all duration-300 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                {loadingMentors && (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-6 text-base font-medium cursor-default">
                        Loading mentor list...
                    </p>
                )}
                {errorMentors && (
                    <p className="text-center text-red-500 dark:text-red-400 py-6 text-base font-medium cursor-default">
                        {errorMentors}
                    </p>
                )}
                {!loadingMentors && !errorMentors && (
                    <>
                        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                            <Table className="bg-white dark:bg-gray-800">
                                <TableHeader>
                                    {mentorTable.getHeaderGroups().map((headerGroup) => (
                                        <TableRow
                                            key={headerGroup.id}
                                            className="border-b border-gray-200 dark:border-gray-700"
                                        >
                                            {headerGroup.headers.map((header) => (
                                                <TableHead
                                                    key={header.id}
                                                    className="text-gray-900 dark:text-gray-100 font-semibold bg-gray-100 dark:bg-gray-700 py-4 px-6 text-left text-base cursor-default"
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
                                                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-default"
                                            >
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id} className="py-4 px-6">
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
                                                className="py-10 text-center text-gray-500 dark:text-gray-400 text-base font-medium cursor-default"
                                            >
                                                No mentors found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination Controls for Mentors */}
                        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
                            <Pagination>
                                <PaginationContent className="flex items-center gap-1">
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() =>
                                                handleMentorPageChange(mentorCurrentPage - 1)
                                            }
                                            className={`px-3 py-1 rounded-md border-gray-300 dark:border-gray-600 transition-colors cursor-pointer ${
                                                mentorCurrentPage === 1
                                                    ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                                    : 'text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                        />
                                    </PaginationItem>

                                    {getMentorPageNumbers().map((page) => (
                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                onClick={() => handleMentorPageChange(page)}
                                                isActive={mentorCurrentPage === page}
                                                className={
                                                    mentorCurrentPage === page
                                                        ? 'bg-[#657ED4] dark:bg-[#5AD3AF] text-white hover:bg-[#424c70] dark:hover:bg-[#4ac2a0] px-3 py-1 rounded-md border-gray-300 dark:border-gray-600 transition-colors cursor-pointer'
                                                        : 'text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md border-gray-300 dark:border-gray-600 transition-colors cursor-pointer'
                                                }
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
                                            className={`px-3 py-1 rounded-md border-gray-300 dark:border-gray-600 transition-colors cursor-pointer ${
                                                mentorCurrentPage === mentorTotalPages
                                                    ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                                    : 'text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </>
                )}
            </section>

            {/* Review History Section */}
            <section>
                <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white cursor-default">
                    Review History
                </h2>
                <p className="mb-6 text-gray-600 dark:text-gray-400 text-base font-medium cursor-default">
                    This section allows you to view the history of QAQC activities.
                </p>
                <div className="relative w-full sm:w-1/2 lg:w-1/3 mb-6">
                    <Input
                        type="text"
                        placeholder="Search by comment or mentor name..."
                        onChange={handleReviewSearchChange}
                        className="pl-10 pr-4 py-3 rounded-full border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] transition-all duration-300 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                {loadingReviews && (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-6 text-base font-medium cursor-default">
                        Loading review list...
                    </p>
                )}
                {errorReviews && (
                    <p className="text-center text-red-500 dark:text-red-400 py-6 text-base font-medium cursor-default">
                        {errorReviews}
                    </p>
                )}
                {!loadingReviews && !errorReviews && (
                    <>
                        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                            <Table className="bg-white dark:bg-gray-800">
                                <TableHeader>
                                    {reviewTable.getHeaderGroups().map((headerGroup) => (
                                        <TableRow
                                            key={headerGroup.id}
                                            className="border-b border-gray-200 dark:border-gray-700"
                                        >
                                            {headerGroup.headers.map((header) => (
                                                <TableHead
                                                    key={header.id}
                                                    className="text-gray-900 dark:text-gray-100 font-semibold bg-gray-100 dark:bg-gray-700 py-4 px-6 text-left text-base cursor-default"
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
                                                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-default"
                                            >
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id} className="py-4 px-6">
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
                                                className="py-10 text-center text-gray-500 dark:text-gray-400 text-base font-medium cursor-default"
                                            >
                                                No reviews found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination Controls for Review History */}
                        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
                            <Pagination>
                                <PaginationContent className="flex items-center gap-1">
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() =>
                                                handleReviewPageChange(reviewCurrentPage - 1)
                                            }
                                            className={`px-3 py-1 rounded-md border-gray-300 dark:border-gray-600 transition-colors cursor-pointer ${
                                                reviewCurrentPage === 1
                                                    ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                                    : 'text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                        />
                                    </PaginationItem>

                                    {getReviewPageNumbers().map((page) => (
                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                onClick={() => handleReviewPageChange(page)}
                                                isActive={reviewCurrentPage === page}
                                                className={
                                                    reviewCurrentPage === page
                                                        ? 'bg-[#657ED4] dark:bg-[#5AD3AF] text-white hover:bg-[#424c70] dark:hover:bg-[#4ac2a0] px-3 py-1 rounded-md border-gray-300 dark:border-gray-600 transition-colors cursor-pointer'
                                                        : 'text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md border-gray-300 dark:border-gray-600 transition-colors cursor-pointer'
                                                }
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
                                            className={`px-3 py-1 rounded-md border-gray-300 dark:border-gray-600 transition-colors cursor-pointer ${
                                                reviewCurrentPage === reviewTotalPages
                                                    ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                                    : 'text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#424c70] dark:hover:text-[#4ac2a0] hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
}
