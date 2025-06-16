'use client';

import React, { useEffect, useState, useCallback } from 'react';
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
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from '@/components/ui/pagination';
import { MoreHorizontal, Search, Filter } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { debounce } from 'lodash';
import ViewDetailUser from '@/app/(routes)/admin/account/ViewDetailUser';
import DeleteUser from '@/app/(routes)/admin/account/DeleteUser';
import UpdateUser from '@/app/(routes)/admin/account/UpdateUser';
import { getUser } from '@/lib/services/admin/getuser';
import { getUserDetail } from '@/lib/services/admin/getuserdetail';
import { RemoveUser } from '@/lib/services/admin/removeuser';
import { useRouter } from 'next/navigation';
import { CreateAccount } from '@/lib/services/admin/createaccount';
import CreateNewUser from '@/app/(routes)/admin/account/CreateNewUser';
import { UpdateAccount } from '@/lib/services/admin/updateaccount';
import { toast } from '@/components/ui/use-toast';

interface Account {
    _id: string;
    fullName: string;
    email: string;
    password: string;
    role: 'customer' | 'mentor' | 'admin';
    wallet: number;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
    avatar?: string;
}

interface ApiResponse {
    message: string;
    status: number;
    metadata: {
        users: Account[];
        page: number;
        totalPages: number;
    };
}

export default function Account() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [modal, setModal] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');
    const limit = 6; // Number of accounts per page
    const router = useRouter();

    const fetchApi = async (page: number = 1) => {
        try {
            setLoading(true);
            const response: ApiResponse = await getUser(page, limit);
            setAccounts(response.metadata.users || []);
            setFilteredAccounts(response.metadata.users || []);
            setCurrentPage(response.metadata.page || 1);
            setTotalPages(response.metadata.totalPages || 1);
        } catch (error) {
            console.error('Error fetching accounts:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch accounts.',
                variant: 'destructive',
            });
            setAccounts([]);
            setFilteredAccounts([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserDetail = async (id: string) => {
        try {
            const userDetail = await getUserDetail(id);
            setSelectedAccount(userDetail.metadata);
            setModal('view');
            toast({
                title: 'Success',
                description: 'User details fetched successfully.',
                variant: 'default',
                duration: 2000,
            });
        } catch (error) {
            console.error('❌ Error fetching user details:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch user details. Please try again.',
                variant: 'destructive',
                duration: 2000,
            });
        }
    };

    const handleDelete = async (id: string) => {
        try {
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
            const response = await RemoveUser(id, tokenuser);
            if (response?.status === 200) {
                setModal('');
                setAccounts((prev) => prev.filter((account) => account._id !== id));
                setFilteredAccounts((prev) => prev.filter((account) => account._id !== id));
                toast({
                    title: 'Success',
                    description: 'User deleted successfully.',
                    variant: 'default',
                });
                fetchApi(currentPage); // Refresh the current page
            } else {
                toast({
                    title: 'Error',
                    description: 'Failed to delete the user. Please try again.',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('❌ Error deleting user:', error);
            toast({
                title: 'Error',
                description: 'Failed to delete the user. Please try again.',
                variant: 'destructive',
            });
        }
    };

    const handleUpdate = async (id: string, updatedData: Partial<Account>) => {
        try {
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
            const result = await UpdateAccount(
                tokenuser,
                id,
                updatedData.fullName || '',
                updatedData.email || '',
                updatedData.role || 'customer',
            );

            if (result?.status === 200) {
                setAccounts((prevAccounts) =>
                    prevAccounts.map((account) =>
                        account._id === id ? { ...account, ...updatedData } : account,
                    ),
                );
                setFilteredAccounts((prevAccounts) =>
                    prevAccounts.map((account) =>
                        account._id === id ? { ...account, ...updatedData } : account,
                    ),
                );
                toast({
                    title: 'Success',
                    description: 'User updated successfully.',
                    variant: 'default',
                    duration: 2000,
                });
                setModal('');
                fetchApi(currentPage); // Refresh the current page
            } else {
                toast({
                    title: 'Error',
                    description: 'Failed to update the user. Please try again.',
                    variant: 'destructive',
                    duration: 2000,
                });
            }
        } catch (error) {
            console.error('❌ Error updating user:', error);
            toast({
                title: 'Error',
                description: 'Failed to update the user. Please try again.',
                variant: 'destructive',
            });
        }
    };

    const handleCreate = async (newData: {
        fullName: string;
        email: string;
        password: string;
        role: string;
    }) => {
        try {
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
            const response = await CreateAccount(
                tokenuser,
                newData.fullName,
                newData.email,
                newData.password,
                newData.role,
            );

            if (response?.status === 200) {
                setModal('');
                toast({
                    title: 'Success',
                    description: 'User created successfully.',
                    variant: 'default',
                    duration: 2000,
                });
                fetchApi(currentPage); // Refresh the current page
            } else {
                toast({
                    title: 'Error',
                    description: 'Failed to create the user. Please try again.',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('❌ Error creating user:', error);
            toast({
                title: 'Error',
                description: 'Failed to create the user. Please try again.',
                variant: 'destructive',
            });
        }
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        fetchApi(currentPage);
    }, [currentPage]);

    useEffect(() => {
        let filtered = [...accounts];

        if (searchQuery) {
            filtered = filtered.filter(
                (account) =>
                    account.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    account.email.toLowerCase().includes(searchQuery.toLowerCase()),
            );
        }

        if (selectedRole !== 'all') {
            filtered = filtered.filter((account) => account.role === selectedRole);
        }

        setFilteredAccounts(filtered);
    }, [searchQuery, selectedRole, accounts]);

    const debouncedSearch = useCallback(
        debounce((searchTerm) => {
            if (!searchTerm) {
                setFilteredAccounts(accounts);
                return;
            }
            const filtered = accounts.filter(
                (account) =>
                    account.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    account.email.toLowerCase().includes(searchTerm.toLowerCase()),
            );
            setFilteredAccounts(filtered);
        }, 300),
        [accounts],
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchQuery(value);
        debouncedSearch(value);
    };

    return (
        <div className="p-6 md:p-10 min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h1 className="text-2xl font-bold text-gray-600 dark:text-gray-100 cursor-default">
                        Account Management
                    </h1>
                    <Button
                        className="bg-[#657ED4] hover:bg-[#5A6BBE] text-white dark:bg-blue-700 dark:hover:bg-blue-600 cursor-pointer"
                        onClick={() => setModal('create')}
                    >
                        Create Account
                    </Button>
                </div>

                {/* Search and Filter Section */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                    <div className="relative w-full sm:w-1/2 lg:w-1/3">
                        <Input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="pl-10 pr-4 py-3 rounded-full border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] transition-all duration-300 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>

                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-gray-600 dark:text-gray-300 flex-shrink-0" />
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="w-[180px] rounded-full border-gray-100 dark:border-gray-700 text-black dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#657ED4] dark:focus:ring-[#5AD3AF] transition-all text-base shadow-sm py-2 px-3 cursor-pointer"
                            aria-label="Filter by Role"
                        >
                            <option value="all">Filter by Role</option>
                            <option value="customer">Customer</option>
                            <option value="mentor">Mentor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <Table className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-md">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Full Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[...Array(5)].map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <Skeleton className="h-6 w-3/4" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-6 w-1/2" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-6 w-1/4" />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Skeleton className="h-6 w-8 ml-auto" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <>
                        <Table className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-md">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Full Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredAccounts.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-6">
                                            No accounts found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredAccounts.map((account) => (
                                        <TableRow key={account._id}>
                                            <TableCell className="cursor-default">
                                                {account.fullName}
                                            </TableCell>
                                            <TableCell className="cursor-default">
                                                {account.email}
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-sm cursor-default ${
                                                        account.role === 'mentor'
                                                            ? 'bg-[#657ED4] text-[#ffffff] dark:bg-blue-700 dark:text-white'
                                                            : account.role === 'customer'
                                                              ? 'bg-[#5AD3AF] text-[#FFFFFF] dark:bg-green-700 dark:text-white'
                                                              : 'bg-[#F76F8E] text-[#FFFFFF] dark:bg-red-700 dark:text-white'
                                                    }`}
                                                >
                                                    {account.role}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu modal={false}>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            className="h-8 w-8 p-0 dark:text-gray-300 cursor-pointer"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                        align="end"
                                                        className="bg-white dark:bg-gray-800 dark:text-gray-100 border border-blue-200 dark:border-gray-700 shadow-md"
                                                    >
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                fetchUserDetail(account._id)
                                                            }
                                                            className="cursor-pointer"
                                                        >
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => {
                                                                setSelectedAccount(account);
                                                                setModal('update');
                                                            }}
                                                            className="cursor-pointer"
                                                        >
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => {
                                                                setSelectedAccount(account);
                                                                setModal('delete');
                                                            }}
                                                            className="text-red-500 dark:text-red-400 cursor-pointer"
                                                        >
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-8 flex justify-center">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                className={
                                                    currentPage === 1
                                                        ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                                        : 'cursor-pointer text-gray-600 dark:text-gray-400 hover:text-[#657ED4] dark:hover:text-[#5AD3AF]'
                                                }
                                            />
                                        </PaginationItem>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                            (page) => (
                                                <PaginationItem key={page}>
                                                    <PaginationLink
                                                        onClick={() => handlePageChange(page)}
                                                        isActive={currentPage === page}
                                                        className={
                                                            currentPage === page
                                                                ? 'bg-[#657ED4] text-white dark:bg-[#5AD3AF] dark:text-black font-medium rounded-lg cursor-pointer'
                                                                : 'cursor-pointer text-gray-600 dark:text-gray-400 hover:text-[#657ED4] dark:hover:text-[#5AD3AF]'
                                                        }
                                                    >
                                                        {page}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            ),
                                        )}
                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                className={
                                                    currentPage === totalPages
                                                        ? 'pointer-events-none opacity-50 cursor-not-allowed'
                                                        : 'cursor-pointer text-gray-600 dark:text-gray-400 hover:text-[#657ED4] dark:hover:text-[#5AD3AF]'
                                                }
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}
                    </>
                )}

                {modal === 'create' && (
                    <CreateNewUser
                        onCreate={(newData) => {
                            const safeData = {
                                fullName: newData.fullName || '',
                                email: newData.email || '',
                                password: newData.password || '',
                                role: newData.role || 'customer',
                            };
                            handleCreate(safeData);
                        }}
                        onClose={() => setModal('')}
                    />
                )}
                {modal === 'view' && selectedAccount && (
                    <ViewDetailUser account={selectedAccount} onClose={() => setModal('')} />
                )}
                {modal === 'delete' && selectedAccount && (
                    <DeleteUser
                        account={{
                            id: selectedAccount._id,
                            name: selectedAccount.fullName,
                        }}
                        onDelete={() => handleDelete(selectedAccount._id)}
                        onClose={() => setModal('')}
                    />
                )}
                {modal === 'update' && selectedAccount && (
                    <UpdateUser
                        account={selectedAccount}
                        onUpdate={(updatedData) => handleUpdate(selectedAccount._id, updatedData)}
                        onClose={() => setModal('')}
                    />
                )}
            </div>
        </div>
    );
}
