'use client';

import { useState } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { MailIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type Mentor = {
    name: string;
    location: string;
    email: string;
};

const data: Mentor[] = [
    { name: 'Nguyen Manh Tien', location: 'K17 HCM', email: 'tien@example.com' },
    { name: 'Tran Huy Hoang', location: 'K17 HCM', email: 'hoang@example.com' },
    { name: 'Phan Nguyen Doan Vu', location: 'K16 HCM', email: 'vu@example.com' },
    { name: 'Nguyen Le Viet Huy', location: 'K17 DN', email: 'huy@example.com' },
    { name: 'Bui Viet Quy', location: 'K17 HCM', email: 'quy@example.com' },
];

const columns: ColumnDef<Mentor>[] = [
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
        accessorKey: 'location',
        header: 'Location',
    },
    {
        accessorKey: 'email',
        header: 'Action',
        cell: () => (
            <button className="p-2 hover:bg-accent rounded-full" title="Send email">
                <MailIcon className="w-4 h-4" />
            </button>
        ),
    },
];

const Page = () => {
    const [tableData] = useState<Mentor[]>(data);

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="container mx-auto py-8 px-4">
            <h2 className="text-2xl font-semibold mb-4">Classmates</h2>
            <div className="border rounded-md">
                <table className="w-full table-auto text-sm">
                    <thead className="bg-muted">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="text-left p-4 font-medium">
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="border-t">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="p-4">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Page;
