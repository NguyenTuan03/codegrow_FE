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
import { Button } from '@/components/ui/button'; // Uncommented Button import
import { toast } from '@/components/ui/use-toast';
import { getPendingEnrollments } from '@/lib/services/admin/getlistcus';

interface Enrollment {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    note?: string;
    isConsulted: boolean;
    createdAt?: string; // Added for date display
    updatedAt?: string; // Added for date display
}

export default function PendingEnrollmentsList() {
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getPendingEnrollments();
                console.log('Pending enrollments:', res);

                // Map the response to the Enrollment interface
                type RawEnrollment = {
                    _id: string;
                    user: {
                        fullName: string;
                        email: string;
                    };
                    phone?: string;
                    note?: string;
                    isConsulted: boolean;
                    enrolledAt?: string;
                    updatedAt?: string;
                };

                const mappedEnrollments = (res.metadata as RawEnrollment[]).map((item) => ({
                    _id: item._id,
                    fullName: item.user.fullName,
                    email: item.user.email,
                    phone: item.phone || '',
                    note: item.note || '',
                    isConsulted: item.isConsulted,
                    createdAt: item.enrolledAt, // Map enrolledAt to createdAt
                    updatedAt: item.updatedAt || new Date().toISOString(), // Fallback to current date if not available
                }));

                setEnrollments(mappedEnrollments);
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

    // Format date to a readable string
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Placeholder for Approve action
    const handleApprove = async (enrollmentId: string) => {
        try {
            // Simulate an API call to approve the enrollment
            toast({
                title: 'Success',
                description: `Enrollment ${enrollmentId} approved!`,
                variant: 'default',
            });
            // Remove the approved enrollment from the list
            setEnrollments(enrollments.filter((enrollment) => enrollment._id !== enrollmentId));
        } catch (err) {
            console.error('Error approving enrollment:', err);
            toast({
                title: 'Error',
                description: 'Failed to approve enrollment',
                variant: 'destructive',
            });
        }
    };

    // Placeholder for Reject action
    const handleReject = async (enrollmentId: string) => {
        try {
            // Simulate an API call to reject the enrollment
            toast({
                title: 'Success',
                description: `Enrollment ${enrollmentId} rejected!`,
                variant: 'destructive',
            });
            // Remove the rejected enrollment from the list
            setEnrollments(enrollments.filter((enrollment) => enrollment._id !== enrollmentId));
        } catch (err) {
            console.error('Error approving enrollment:', err);
            toast({
                title: 'Error',
                description: 'Failed to reject enrollment',
                variant: 'destructive',
            });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center p-4 bg-red-50 rounded-md">{error}</div>;
    }

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Pending Enrollments</h2>
            {enrollments.length === 0 ? (
                <div className="text-center text-gray-500 py-6">No pending enrollments found.</div>
            ) : (
                <div className="rounded-md border overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-semibold text-gray-700">Name</TableHead>
                                <TableHead className="font-semibold text-gray-700">Email</TableHead>
                                <TableHead className="font-semibold text-gray-700">Phone</TableHead>
                                <TableHead className="font-semibold text-gray-700">Note</TableHead>
                                <TableHead className="font-semibold text-gray-700">
                                    Consulted
                                </TableHead>
                                <TableHead className="font-semibold text-gray-700">
                                    Enrolled At
                                </TableHead>
                                <TableHead className="font-semibold text-gray-700">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {enrollments.map((enrollment) => (
                                <TableRow key={enrollment._id} className="hover:bg-gray-50">
                                    <TableCell className="text-gray-800">
                                        {enrollment.fullName}
                                    </TableCell>
                                    <TableCell className="text-gray-800">
                                        {enrollment.email}
                                    </TableCell>
                                    <TableCell className="text-gray-800">
                                        {enrollment.phone || '-'}
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate text-gray-600">
                                        {enrollment.note || '-'}
                                    </TableCell>
                                    <TableCell className="text-gray-800">
                                        <span
                                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                                enrollment.isConsulted
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                        >
                                            {enrollment.isConsulted ? 'Yes' : 'No'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-gray-600">
                                        {enrollment.createdAt
                                            ? formatDate(enrollment.createdAt)
                                            : '-'}
                                    </TableCell>
                                    <TableCell className="flex gap-2">
                                        <Button
                                            size="sm"
                                            className="bg-green-600 hover:bg-green-700 text-white"
                                            onClick={() => handleApprove(enrollment._id)}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            className="bg-red-600 hover:bg-red-700 text-white"
                                            onClick={() => handleReject(enrollment._id)}
                                        >
                                            Reject
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
