'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import CreateUser from '@/app/(routes)/admin/account/CreateUser';
import ViewDetailUser from '@/app/(routes)/admin/account/ViewDetailUser';
import DeleteUser from '@/app/(routes)/admin/account/DeleteUser';
import UpdateUser from '@/app/(routes)/admin/account/UpdateUser';

const mockAccounts = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'mentor' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'customer' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'qaqc' },
    { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com', role: 'mentor' },
];

export default function Account() {
    const [accounts, setAccounts] = useState(mockAccounts);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [modal, setModal] = useState('');

    const handleDelete = (id: number) => {
        setAccounts(accounts.filter((account) => account.id !== id));
        setModal('');
    };

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-600">Account Management</h1>
                    <Button
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                        onClick={() => setModal('create')}
                    >
                        Create Account
                    </Button>
                </div>

                <Table className="bg-white rounded-lg shadow-md">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {accounts.map((account) => (
                            <TableRow key={account.id}>
                                <TableCell>{account.id}</TableCell>
                                <TableCell>{account.name}</TableCell>
                                <TableCell>{account.email}</TableCell>
                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded-full text-sm ${
                                            account.role === 'mentor'
                                                ? 'bg-blue-100 text-blue-800'
                                                : account.role === 'customer'
                                                  ? 'bg-green-100 text-green-800'
                                                  : 'bg-yellow-100 text-yellow-800'
                                        }`}
                                    >
                                        {account.role}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            className="bg-white border border-blue-200 shadow-md"
                                        >
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setSelectedAccount(account);
                                                    setModal('view');
                                                }}
                                            >
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setSelectedAccount(account);
                                                    setModal('update');
                                                }}
                                            >
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setSelectedAccount(account);
                                                    setModal('delete');
                                                }}
                                                className="text-red-500"
                                            >
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Modals */}
            {modal === 'create' && <CreateUser onClose={() => setModal('')} />}
            {modal === 'view' && selectedAccount && (
                <ViewDetailUser account={selectedAccount} onClose={() => setModal('')} />
            )}
            {modal === 'delete' && selectedAccount && (
                <DeleteUser
                    account={selectedAccount}
                    onDelete={() => handleDelete(selectedAccount.id)}
                    onClose={() => setModal('')}
                />
            )}
            {modal === 'update' && selectedAccount && (
                <UpdateUser account={selectedAccount} onClose={() => setModal('')} />
            )}
        </div>
    );
}
