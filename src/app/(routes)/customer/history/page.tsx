'use client';

import {
    Hand,
    ChevronLeft,
    ChevronRight,
    CreditCard,
    Wallet,
    DollarSign,
    Filter,
    Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

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
        logo: '/shopify-logo.png',
    },
    {
        id: 2,
        name: 'Gacha Games',
        code: 'GG',
        amount: -199.99,
        date: 'June 22',
        category: 'Entertainment',
        account: 'Mastercard 1212',
        expires: '24/10',
        logo: '/game-logo.png',
    },
    {
        id: 3,
        name: 'Stripe',
        code: 'ST',
        amount: 20.99,
        date: 'May 11',
        category: 'Payment',
        account: 'Visa 9487',
        expires: '24/10',
        logo: '/stripe-logo.png',
        icon: <Hand className="w-4 h-4 text-blue-500" />,
    },
    {
        id: 4,
        name: 'Figma',
        code: 'FM',
        amount: -15.0,
        date: 'Apr 20',
        category: 'Design Tools',
        account: 'Visa 9487',
        expires: '24/10',
        logo: '/figma-logo.png',
    },
    {
        id: 5,
        name: 'GG Fried Chicken',
        code: 'GG',
        amount: -45.05,
        date: 'Apr 18',
        category: 'Food & Drinks',
        account: 'Mastercard 1212',
        expires: '24/10',
        logo: '/food-logo.png',
    },
    {
        id: 6,
        name: 'Uber Foods',
        code: 'UF',
        amount: -50.25,
        date: 'March 8',
        category: 'Food Delivery',
        account: 'Mastercard 1212',
        expires: '24/10',
        logo: '/uber-logo.png',
    },
    {
        id: 7,
        name: 'PayPal',
        code: 'PP',
        amount: 487.88,
        date: 'March 2',
        category: 'Payment',
        account: 'Visa 9487',
        expires: '24/10',
        logo: '/paypal-logo.png',
    },
    {
        id: 8,
        name: 'Genshin Impact',
        code: 'GI',
        amount: -999.99,
        date: 'Feb 19',
        category: 'Gaming',
        account: 'Mastercard 1212',
        expires: '24/10',
        logo: '/genshin-logo.png',
    },
];

const paymentMethods = [
    { type: 'Visa', last4: '9487', balance: 2450.32 },
    { type: 'Mastercard', last4: '1212', balance: 1250.78 },
];

export default function TransactionHistory() {
    const totalIncome = transactions
        .filter((t) => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter((t) => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Main Content */}
            <main className="flex-1 py-8 px-4 md:px-8 lg:px-12">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">
                                    Total Balance
                                </CardTitle>
                                <Wallet className="h-4 w-4 text-gray-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    ${(totalIncome - totalExpenses).toFixed(2)}
                                </div>
                                <Progress
                                    value={(totalIncome / (totalIncome + totalExpenses)) * 100}
                                    className="h-2 mt-2"
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    {((totalIncome / (totalIncome + totalExpenses)) * 100).toFixed(
                                        1,
                                    )}
                                    % income ratio
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">
                                    Total Income
                                </CardTitle>
                                <DollarSign className="h-4 w-4 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-500">
                                    +${totalIncome.toFixed(2)}
                                </div>
                                <p className="text-xs text-gray-500 mt-2">+12% from last month</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">
                                    Total Expenses
                                </CardTitle>
                                <CreditCard className="h-4 w-4 text-red-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-red-500">
                                    -${totalExpenses.toFixed(2)}
                                </div>
                                <p className="text-xs text-gray-500 mt-2">+8% from last month</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Payment Methods */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {paymentMethods.map((method, index) => (
                            <Card key={index}>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {method.type} •••• {method.last4}
                                    </CardTitle>
                                    <Badge variant="outline" className="text-xs">
                                        Active
                                    </Badge>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xl font-bold">
                                        ${method.balance.toFixed(2)}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Available balance</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Title and Actions */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
                        <div className="flex gap-2">
                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="text-sm gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Choose Date
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                                    <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                                    <DropdownMenuItem>Last 3 months</DropdownMenuItem>
                                    <DropdownMenuItem>Custom range</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="text-sm gap-2">
                                        <Filter className="h-4 w-4" />
                                        Filter
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>All Transactions</DropdownMenuItem>
                                    <DropdownMenuItem>Income Only</DropdownMenuItem>
                                    <DropdownMenuItem>Expenses Only</DropdownMenuItem>
                                    <DropdownMenuItem>By Category</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* Transaction Table */}
                    <Card>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[300px]">Transaction</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead className="text-right">Account</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={transaction.logo} />
                                                    <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                                                        {transaction.code}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">
                                                        {transaction.name}
                                                    </div>
                                                    {transaction.icon && (
                                                        <Badge
                                                            variant="outline"
                                                            className="text-xs mt-1"
                                                        >
                                                            Recurring
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
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
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <span>{transaction.date}</span>
                                                {new Date().getDate() <= 7 && (
                                                    <Badge variant="secondary" className="text-xs">
                                                        New
                                                    </Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{transaction.category}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex flex-col items-end">
                                                <span>{transaction.account.split(' ')[0]}</span>
                                                <span className="text-xs text-gray-500">
                                                    Exp {transaction.expires}
                                                </span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-2">
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
