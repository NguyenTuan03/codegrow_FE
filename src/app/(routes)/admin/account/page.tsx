'use client';
import React, { useEffect, useState } from 'react';
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

import ViewDetailUser from '@/app/(routes)/admin/account/ViewDetailUser';
import DeleteUser from '@/app/(routes)/admin/account/DeleteUser';
import UpdateUser from '@/app/(routes)/admin/account/UpdateUser';
import { getUser } from '@/lib/services/admin/getuser'; // Import API
import { getUserDetail } from '@/lib/services/admin/getuserdetail';
import { RemoveUser } from '@/lib/services/admin/removeuser';

import { useRouter } from 'next/navigation';
import { CreateAccount } from '@/lib/services/admin/createaccount'; // Import API
import CreateNewUser from '@/app/(routes)/admin/account/CreateNewUser';
import { UpdateAccount } from '@/lib/services/admin/updateaccount'; // Import API
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

export default function Account() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [modal, setModal] = useState('');
    const router = useRouter(); // Sử dụng router từ Next.js

    const fetchApi = async () => {
        try {
            const response = await getUser(); // Gọi API lấy danh sách tài khoản
            setAccounts(response.metadata.users);
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    };

    const fetchUserDetail = async (id: string) => {
        try {
            const userDetail = await getUserDetail(id); // Gọi API lấy chi tiết người dùng
            console.log(`User detail for ID ${id}:`, userDetail);

            setSelectedAccount(userDetail.metadata); // Lưu thông tin chi tiết vào state
            setModal('view'); // Mở modal hiển thị chi tiết
            toast({
                title: 'Success',
                content: 'User details fetched successfully.',
                variant: 'default',
                duration: 2000,
            });
            router.refresh(); // Tải lại trang sau khi lấy thông tin chi tiết thành công
        } catch (error) {
            console.error('❌ Error fetching user details:', error);
            toast({
                title: 'Error',
                content: 'Failed to fetch user details. Please try again.',
                variant: 'destructive',
                duration: 2000,
            });
        }
    };
    const handleDelete = async (id: string) => {
        try {
            const token = localStorage.getItem('token'); // Lấy token từ localStorage
            const response = await RemoveUser(id, token!); // Gọi API xóa tài khoản
            if (response?.status === 200) {
                setModal(''); // Đóng modal trước
                toast({
                    title: 'Success',
                    description: 'User deleted successfully.',
                    variant: 'default',
                });
                router.refresh(); // Tải lại trang sau khi xóa thành công
            } else {
                toast({
                    title: 'Error',
                    description: 'Failed to delete the user. Please try again.',
                    variant: 'destructive',
                });
            }
        } catch (error: unknown) {
            console.error('❌ Error deleting user:', error);
            toast({
                title: 'Error',
                description: 'Failed to delete the user. Please try again.',
                variant: 'destructive',
            });
        }
    };
    useEffect(() => {
        fetchApi(); // Fetch accounts khi component được mount
    }, []);
    const handleUpdate = async (id: string, updatedData: Partial<Account>) => {
        try {
            console.log(`Updating user with ID: ${id}`, updatedData);
            const token = localStorage.getItem('token') || ''; // Lấy token từ localStorage
            console.log('Session ID:', token);

            // Gọi API UpdateAccount với các tham số được kiểm tra
            const result = await UpdateAccount(
                token,
                id,
                updatedData.fullName || '',
                updatedData.email || '',
                updatedData.role || 'customer',
            );

            console.log('✅ User updated successfully:', result);

            // Cập nhật danh sách tài khoản
            setAccounts((prevAccounts) =>
                prevAccounts.map((account) =>
                    account._id === id ? { ...account, ...updatedData } : account,
                ),
            );
            if (result?.status === 200) {
                console.log('User updated successfully:', result);
                toast({
                    title: 'Success',
                    content: 'User updated successfully.',
                    variant: 'default',
                    duration: 2000,
                });
                router.refresh(); // Tải lại trang sau khi cập nhật thành công
                // Trả về kết quả để có thể sử dụng tiếp nếu cần
                setModal('');
            } else {
                console.error('❌ Error updating user:', result);
                toast({
                    title: 'Error',
                    content: 'Failed to update the user. Please try again.',
                    variant: 'destructive',
                    duration: 2000,
                });
            }
        } catch (error) {
            console.error('❌ Error updating user:', error);

            throw error; // Ném lại lỗi để xử lý tiếp ở nơi gọi hàm
        }
    };

    const handleCreate = async (newData: {
        fullName: string;
        email: string;
        password: string;
        role: string;
    }) => {
        try {
            console.log('Creating new user:', newData);
            const token = localStorage.getItem('token') || ''; // Lấy token từ localStorage

            // Gọi API CreateUser
            const response = await CreateAccount(
                token,
                newData.fullName,
                newData.email,
                newData.password,
                newData.role,
            );

            console.log('✅ User created successfully:', response);

            // Cập nhật danh sách tài khoản
            setAccounts((prevAccounts) => [...prevAccounts, response.metadata]);
            toast({
                title: 'Success',
                content: 'User created successfully.',
                variant: 'default',
                duration: 2000,
            });
            router.refresh(); // Tải lại trang sau khi tạo thành công
            setModal(''); // Đóng modal
        } catch (error: unknown) {
            console.error('❌ Error creating user:', error);
        }
    };
    return (
        <div className="p-6 md:p-10 min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-600 dark:text-gray-100">
                        Account Management
                    </h1>
                    <Button
                        className="bg-[#657ED4] hover:bg-[#5A6BBE] text-white dark:bg-blue-700 dark:hover:bg-blue-600"
                        onClick={() => setModal('create')}
                    >
                        Create Account
                    </Button>
                </div>

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
                        {accounts.map((account) => (
                            <TableRow key={account._id}>
                                <TableCell>{account.fullName}</TableCell>
                                <TableCell>{account.email}</TableCell>
                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded-full text-sm ${
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
                                                className="h-8 w-8 p-0 dark:text-gray-300"
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            className="bg-white dark:bg-gray-800 dark:text-gray-100 border border-blue-200 dark:border-gray-700 shadow-md"
                                        >
                                            <DropdownMenuItem
                                                onClick={() => fetchUserDetail(account._id)}
                                            >
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    console.log('Edit clicked');
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
                                                className="text-red-500 dark:text-red-400"
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
    );
}
