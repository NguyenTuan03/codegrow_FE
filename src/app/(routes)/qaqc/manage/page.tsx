'use client';

import { useState, useEffect } from 'react';
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
import { getUser } from '@/lib/services/admin/getuser';
import { CreateReviewForm } from './CreateReviewForm';
import { ViewDetailReview } from './ViewDetailReview';

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

const columns: ColumnDef<MentorTableData>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium uppercase">
                    <Avatar>
                        <AvatarFallback>
                            {(row.getValue('name') as string).charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <span>{row.getValue('name') as string}</span>
            </div>
        ),
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                <span>{row.getValue('email') as string}</span>
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
                            className="flex gap-2"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Add
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Review for {row.getValue('name')}</DialogTitle>
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
                            className="flex gap-2"
                        >
                            <EyeIcon className="w-4 h-4" />
                            View Detail
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Reviews for {row.getValue('name')}</DialogTitle>
                        </DialogHeader>
                        <ViewDetailReview mentorId={row.original._id} />
                    </DialogContent>
                </Dialog>
            </div>
        ),
    },
];

export default function MentorsPage() {
    const [tableData, setTableData] = useState<MentorTableData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await getUser();
                console.log('API Response:', response);

                const mentors: Mentor[] = response.metadata.users;
                const filteredMentors = mentors.filter((mentor) => mentor.role === 'mentor');
                const mappedData: MentorTableData[] = filteredMentors.map((mentor) => ({
                    name: mentor.fullName,
                    email: mentor.email,
                    _id: mentor._id,
                }));

                setTableData(mappedData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching mentors');
                setLoading(false);
                console.error('Error fetching accounts:', error);
            }
        };

        fetchApi();
    }, []);

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="container mx-auto py-8 px-4">
            <h2 className="text-2xl font-semibold mb-4">Mentors</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
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
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
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
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
