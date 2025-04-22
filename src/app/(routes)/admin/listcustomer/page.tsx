// components/PendingEnrollmentsList.tsx
'use client';
import { useState, useEffect } from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
// import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { getPendingEnrollments } from '@/lib/services/admin/getlistcus';
interface Enrollment {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    note?: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
    updatedAt: string;
}
export default function PendingEnrollmentsList() {
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { metadata } = await getPendingEnrollments();
                setEnrollments(metadata.enrollments);
            } catch (err) {
                setError(`Failed to load enrollments: ${err}`);
                toast({
                    title: 'Error',
                    description: 'Could not fetch pending enrollments',
                    variant: 'destructive',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // const handleApprove = async (enrollmentId: string) => {
    //     // Implement approval logic
    // };

    // const handleReject = async (enrollmentId: string) => {
    //     // Implement rejection logic
    // };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Note</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {enrollments.map((enrollment) => (
                        <TableRow key={enrollment._id}>
                            <TableCell>{enrollment.fullName}</TableCell>
                            <TableCell>{enrollment.email}</TableCell>
                            <TableCell>{enrollment.phone}</TableCell>
                            <TableCell className="max-w-xs truncate">
                                {enrollment.note || '-'}
                            </TableCell>
                            {/* <TableCell>{formatDate(enrollment.createdAt)}</TableCell>
                            <TableCell className="flex gap-2">
                                <Button size="sm" onClick={() => handleApprove(enrollment._id)}>
                                    Approve
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleReject(enrollment._id)}
                                >
                                    Reject
                                </Button> */}
                            {/* </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
