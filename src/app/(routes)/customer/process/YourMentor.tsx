'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { EyeIcon, ChevronRight, User } from 'lucide-react';
import { getUser } from '@/lib/services/admin/getuser';
import { ViewDetailReview } from '@/app/(routes)/qaqc/manage/ViewDetailReview';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Mentor = {
    _id: string;
    fullName: string;
    email: string;
    role: string;
};

export default function YourMentor() {
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMentors = async () => {
        try {
            setLoading(true);
            const response = await getUser();
            const mentors: Mentor[] = response.metadata.users.filter(
                (mentor: Mentor) => mentor.role === 'mentor',
            );

            setMentors(mentors);
            setLoading(false);
        } catch (error) {
            setError('Failed to load mentors');
            setLoading(false);
            console.error('Error fetching mentors:', error);
        }
    };

    useEffect(() => {
        fetchMentors();
    }, []);

    return (
        <section className="w-full">
            <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between p-4">
                    <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <User className="w-6 h-6 text-[#657ED4] dark:text-[#5AD3AF]" />
                        Mentors
                    </CardTitle>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#657ED4] dark:text-[#5AD3AF] hover:text-[#4a5da0] dark:hover:text-[#4ac2a0] flex items-center gap-1"
                    >
                        View All
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </CardHeader>

                <CardContent className="p-4">
                    {loading ? (
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <Skeleton className="h-9 w-9 rounded-full" />
                                        <div className="space-y-1">
                                            <Skeleton className="h-4 w-[120px]" />
                                            <Skeleton className="h-3 w-[80px]" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-9 w-[100px]" />
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="text-center py-4 text-red-500 dark:text-red-400">
                            {error}
                        </div>
                    ) : mentors.length > 0 ? (
                        <ul className="space-y-3">
                            {mentors.slice(0, 3).map((mentor) => (
                                <li key={mentor._id}>
                                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                        <div className="flex items-center space-x-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarFallback className="bg-[#657ED4] dark:bg-[#5AD3AF] text-white">
                                                    {mentor.fullName.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold text-gray-800 dark:text-gray-200">
                                                    {mentor.fullName}
                                                </p>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs capitalize text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 rounded-full px-2 py-0.5"
                                                    >
                                                        {mentor.role}
                                                    </Badge>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
                                                        {mentor.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="gap-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-[#657ED4] dark:hover:bg-[#5AD3AF] hover:text-white dark:hover:text-white rounded-full transition-all duration-200"
                                                >
                                                    <EyeIcon className="h-4 w-4" />
                                                    Details
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-2xl">
                                                <DialogHeader>
                                                    <DialogTitle className="text-xl text-gray-900 dark:text-gray-100">
                                                        {mentor.fullName} Reviews
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <ViewDetailReview mentorId={mentor._id} />
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                            No mentors available
                        </div>
                    )}
                </CardContent>
            </Card>
        </section>
    );
}
