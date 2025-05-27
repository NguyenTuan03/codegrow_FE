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
        header: 'Tên',
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                <Avatar className="w-9 h-9">
                    <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-medium">
                        {(row.getValue('name') as string).charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                    {row.getValue('name') as string}
                </span>
            </div>
        ),
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => (
            <span className="text-gray-700 dark:text-gray-300">
                {row.getValue('email') as string}
            </span>
        ),
    },
    {
        accessorKey: 'action',
        header: 'Hành động',
        cell: ({ row }) => (
            <div className="flex gap-2">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            title="Thêm đánh giá"
                            className="flex gap-2 border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Thêm
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                        <DialogHeader>
                            <DialogTitle className="text-gray-900 dark:text-white text-lg font-semibold">
                                Thêm đánh giá cho {row.getValue('name')}
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
                            title="Xem chi tiết đánh giá"
                            className="flex gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <EyeIcon className="w-4 h-4" />
                            Xem chi tiết
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                        <DialogHeader>
                            <DialogTitle className="text-gray-900 dark:text-white text-lg font-semibold">
                                Đánh giá cho {row.getValue('name')}
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
        header: 'Người đánh giá',
        cell: ({ row }) => (
            <span className="text-gray-900 dark:text-gray-100 font-medium">
                {row.original.mentor?.fullName || 'N/A'}
            </span>
        ),
    },
    {
        accessorKey: 'comment',
        header: 'Nhận xét',
        cell: ({ row }) => (
            <span className="text-gray-700 dark:text-gray-300">{row.getValue('comment')}</span>
        ),
    },
    {
        accessorKey: 'createdAt',
        header: 'Ngày',
        cell: ({ row }) => (
            <span className="text-gray-700 dark:text-gray-300">
                {new Date(row.getValue('createdAt')).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                })}
            </span>
        ),
    },
    {
        accessorKey: 'rating',
        header: 'Điểm',
        cell: ({ row }) => (
            <span className="text-yellow-600 dark:text-yellow-400 font-semibold">
                {row.getValue('rating')}/5
            </span>
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
            setErrorMentors('Lỗi khi tải danh sách mentor');
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

            setReviewData(data.metadata.reviews || data.metadata);
            const total =
                data.metadata.totalPages ||
                Math.ceil((data.metadata.totalItems || 0) / reviewPageSize);
            setReviewTotalPages(total > 0 ? total : 1);
            setLoadingReviews(false);
        } catch (error) {
            setErrorReviews('Lỗi khi tải danh sách đánh giá');
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
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
            {/* Mentors Section */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                    Danh sách Mentor
                </h2>
                {loadingMentors && (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-6">
                        Đang tải danh sách mentor...
                    </p>
                )}
                {errorMentors && (
                    <p className="text-center text-red-500 dark:text-red-400 py-6">
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
                                                    className="text-gray-900 dark:text-gray-100 font-semibold bg-gray-100 dark:bg-gray-700 py-4 px-6 text-left"
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
                                                className="py-10 text-center text-gray-500 dark:text-gray-400"
                                            >
                                                Không tìm thấy mentor.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination Controls for Mentors */}
                        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Số mục mỗi trang:
                                </span>
                                <Select
                                    value={mentorPageSize.toString()}
                                    onValueChange={handleMentorPageSizeChange}
                                >
                                    <SelectTrigger className="w-24 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-md">
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
                                <PaginationContent className="flex items-center gap-1">
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() =>
                                                handleMentorPageChange(mentorCurrentPage - 1)
                                            }
                                            className={`${
                                                mentorCurrentPage === 1
                                                    ? 'pointer-events-none opacity-50'
                                                    : ''
                                            } px-3 py-1 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 transition-colors`}
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
                                                } px-3 py-1 rounded-md border-gray-300 dark:border-gray-600 transition-colors`}
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
                                            } px-3 py-1 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 transition-colors`}
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
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                    Lịch sử đánh giá
                </h2>
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                    Phần này cho phép bạn xem lại lịch sử các hoạt động đánh giá QAQC.
                </p>
                {loadingReviews && (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-6">
                        Đang tải danh sách đánh giá...
                    </p>
                )}
                {errorReviews && (
                    <p className="text-center text-red-500 dark:text-red-400 py-6">
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
                                                    className="text-gray-900 dark:text-gray-100 font-semibold bg-gray-100 dark:bg-gray-700 py-4 px-6 text-left"
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
                                                className="py-10 text-center text-gray-500 dark:text-gray-400"
                                            >
                                                Không tìm thấy đánh giá.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination Controls for Review History */}
                        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Số mục mỗi trang:
                                </span>
                                <Select
                                    value={reviewPageSize.toString()}
                                    onValueChange={handleReviewPageSizeChange}
                                >
                                    <SelectTrigger className="w-24 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-md">
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
                                <PaginationContent className="flex items-center gap-1">
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() =>
                                                handleReviewPageChange(reviewCurrentPage - 1)
                                            }
                                            className={`${
                                                reviewCurrentPage === 1
                                                    ? 'pointer-events-none opacity-50'
                                                    : ''
                                            } px-3 py-1 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 transition-colors`}
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
                                                } px-3 py-1 rounded-md border-gray-300 dark:border-gray-600 transition-colors`}
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
                                            } px-3 py-1 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 transition-colors`}
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
