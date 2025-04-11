'use client';

import { Hand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Placeholder transaction data
const transactions = [
    {
        id: 1,
        name: 'Shopify',
        code: 'SP',
        amount: -18.49,
        date: 'Aug 18',
        category: 'Food & Drinks',
        account: 'Visa 9487',
        expires: '24/10',
    },
    {
        id: 2,
        name: 'Gacha Games',
        code: 'GG',
        amount: -199.99,
        date: 'June 22',
        category: 'Finance',
        account: 'Mastercard 1212',
        expires: '24/10',
    },
    {
        id: 3,
        name: 'Stripe',
        code: 'ST',
        amount: 20.99,
        date: 'May 11',
        category: 'Entertainment',
        account: 'Visa 9487',
        expires: '24/10',
        icon: <Hand className="w-4 h-4 text-blue-500" />,
    },
    {
        id: 4,
        name: 'Figma',
        code: 'FM',
        amount: -15.0,
        date: 'Apr 20',
        category: 'Groceries',
        account: 'Visa 9487',
        expires: '24/10',
    },
    {
        id: 5,
        name: 'GG Fried Chicken',
        code: 'GG',
        amount: -45.05,
        date: 'Apr 18',
        category: 'Subscription',
        account: 'Mastercard 1212',
        expires: '24/10',
    },
    {
        id: 6,
        name: 'Uber Foods',
        code: 'UF',
        amount: -50.25,
        date: 'March 8',
        category: 'Income',
        account: 'Mastercard 1212',
        expires: '24/10',
    },
    {
        id: 7,
        name: 'PayPal',
        code: 'PP',
        amount: 487.88,
        date: 'March 2',
        category: 'Electronics',
        account: 'Visa 9487',
        expires: '24/10',
    },
    {
        id: 8,
        name: 'Genshin Impact',
        code: 'GI',
        amount: -999.99,
        date: 'Feb 19',
        category: 'Gadget',
        account: 'Mastercard 1212',
        expires: '24/10',
    },
];

export default function TransactionHistory() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Main Content */}
            <main className="flex-1 py-10 px-6 md:px-16 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    {/* Title and Actions */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
                        <div className="flex gap-3">
                            <Button variant="outline" className="text-sm">
                                Choose Date
                            </Button>
                            <Button variant="outline" className="text-sm">
                                Filter
                            </Button>
                        </div>
                    </div>

                    {/* Transaction Table */}
                    <div className="border rounded-lg shadow-sm bg-white">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-gray-600 font-semibold">
                                        Transactions
                                    </TableHead>
                                    <TableHead className="text-gray-600 font-semibold">
                                        Amount
                                    </TableHead>
                                    <TableHead className="text-gray-600 font-semibold">
                                        Date
                                    </TableHead>
                                    <TableHead className="text-gray-600 font-semibold">
                                        Category
                                    </TableHead>
                                    <TableHead className="text-gray-600 font-semibold">
                                        Account
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell className="flex items-center gap-2">
                                            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-xs">
                                                {transaction.code}
                                            </span>
                                            {transaction.icon || null}
                                            <span className="text-gray-900">
                                                {transaction.name}
                                            </span>
                                        </TableCell>
                                        <TableCell
                                            className={
                                                transaction.amount > 0
                                                    ? 'text-green-500'
                                                    : 'text-red-500'
                                            }
                                        >
                                            {transaction.amount > 0 ? '+' : ''}$
                                            {Math.abs(transaction.amount).toFixed(2)}
                                        </TableCell>
                                        <TableCell className="text-gray-600">
                                            {transaction.date}
                                        </TableCell>
                                        <TableCell className="text-gray-600">
                                            {transaction.category}
                                        </TableCell>
                                        <TableCell className="text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <span>{transaction.account}</span>
                                                <span className="text-gray-400 text-xs">
                                                    Expired in {transaction.expires}
                                                </span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-2 mt-6">
                        <Button variant="ghost" size="icon">
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-sm">
                            1
                        </Button>
                        <Button variant="ghost" size="sm" className="text-sm">
                            2
                        </Button>
                        <Button variant="ghost" size="sm" className="text-sm">
                            3
                        </Button>
                        <Button variant="ghost" size="sm" className="text-sm">
                            4
                        </Button>
                        <Button variant="ghost" size="sm" className="text-sm">
                            5
                        </Button>
                        <span className="text-gray-600">...</span>
                        <Button variant="ghost" size="sm" className="text-sm">
                            99
                        </Button>
                        <Button variant="ghost" size="icon">
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
