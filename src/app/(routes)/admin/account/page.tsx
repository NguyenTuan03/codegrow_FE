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
import { Toast } from '@/components/ui/toast';
import { UpdateAccount } from '@/lib/services/admin/updateuser';
import { CreateUser } from '@/lib/services/admin/createuser';
import CreateNewUser from '@/app/(routes)/admin/account/CreateNewUser';

interface Account {
    _id: string;
    fullName: string;
    email: string;
    password: string;
    role: string;
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
        } catch (error) {
            console.error('❌ Error fetching user details:', error);
        }
    };
    const handleDelete = async (id: string) => {
        try {
            console.log(`Deleting user with ID: ${id}`);
            const token = localStorage.getItem('token'); // Lấy token từ localStorage
            const response = await RemoveUser(id, token!); // Gọi API xóa tài khoản
            console.log('✅ User deleted successfully:', response);
            if (response?.message) {
                Toast({
                    title: 'Success',
                    content: 'User deleted successfully.',
                    variant: 'default',
                });
                router.refresh(); // Tải lại trang sau khi xóa thành công
            } else {
                Toast({
                    title: 'Error',
                    content: 'Failed to delete the user. Please try again.',
                    variant: 'destructive',
                });
            }
        } catch (error: any) {
            if (error.response?.status === 401) {
                console.error('❌ Unauthorized: Please check your token.');
            } else if (error.response?.status === 500) {
                console.error('❌ Server error: Please check the server logs.');
            } else {
                console.error('❌ Error deleting user:', error.message);
            }
        }
    };
    useEffect(() => {
        fetchApi(); // Fetch accounts khi component được mount
    }, []);
    const handleUpdate = async (id: string, updatedData: Partial<Account>) => {
        try {
            console.log(`Updating user with ID: ${id}`);
            const token = localStorage.getItem('token'); // Lấy token từ localStorage
            if (!token) {
                throw new Error('Token is missing');
            }

            // Gọi API UpdateAccount
            const response = await UpdateAccount(
                token,
                id,
                updatedData.fullName || '',
                updatedData.email || '',
                updatedData.role || 'customer', // Giá trị mặc định nếu role không được cung cấp
            );

            console.log('✅ User updated successfully:', response);

            // Cập nhật danh sách tài khoản
            setAccounts((prevAccounts) =>
                prevAccounts.map((account) =>
                    account._id === id ? { ...account, ...updatedData } : account,
                ),
            );

            Toast({
                title: 'Success',
                content: 'User updated successfully.',
                variant: 'default',
            });

            setModal(''); // Đóng modal
        } catch (error: any) {
            console.error('❌ Error updating user:', error.message);
            Toast({
                title: 'Error',
                content: 'An error occurred while updating the user.',
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
            console.log('Creating new user:', newData);
            const token = localStorage.getItem('token'); // Lấy token từ localStorage

            // Gọi API CreateUser
            const response = await CreateUser(
                token,
                newData.fullName,
                newData.email,
                newData.password,
                newData.role,
            );

            console.log('✅ User created successfully:', response);

            // Cập nhật danh sách tài khoản
            setAccounts((prevAccounts) => [...prevAccounts, response.metadata]);

            setModal(''); // Đóng modal
        } catch (error: any) {
            console.error('❌ Error creating user:', error.message);
        }
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
                                    <DropdownMenu modal={false}>
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
                                                onClick={() => fetchUserDetail(account._id)} // Gọi API lấy chi tiết người dùng
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
            {modal === 'create' && (
                <CreateNewUser
                    onCreate={(newData) => handleCreate(newData)} // Gọi hàm handleCreate
                    onClose={() => setModal('')} // Đóng modal khi nhấn "Cancel"
                />
            )}
            {modal === 'view' && selectedAccount && (
                <ViewDetailUser account={selectedAccount} onClose={() => setModal('')} />
            )}
            {modal === 'delete' && selectedAccount && (
                <DeleteUser
                    account={selectedAccount}
                    onDelete={() => handleDelete(selectedAccount._id)} // Gọi hàm handleDelete từ trang chính
                    onClose={() => setModal('')} // Đóng modal khi nhấn "Cancel"
                />
            )}
            {modal === 'update' && selectedAccount && (
                <>
                    {console.log('Modal state:', modal)}
                    <UpdateUser
                        account={selectedAccount}
                        onUpdate={(updatedData) => handleUpdate(selectedAccount._id, updatedData)}
                        onClose={() => setModal('')}
                    />
                </>
            )}
        </div>
    );
}
