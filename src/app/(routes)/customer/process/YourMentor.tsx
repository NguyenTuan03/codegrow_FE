'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { EyeIcon, ChevronRight } from 'lucide-react';
import { getUser } from '@/lib/services/admin/getuser';
import { ViewDetailReview } from '@/app/(routes)/qaqc/manage/ViewDetailReview';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

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
            <Card className="border shadow-none">
                <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                    <CardTitle className="text-lg font-semibold">Mentors</CardTitle>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary/90"
                    >
                        View All
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                </CardHeader>

                <CardContent className="p-4 pt-0">
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
                        <div className="text-center py-4 text-destructive">{error}</div>
                    ) : mentors.length > 0 ? (
                        <ul className="space-y-3">
                            {mentors.slice(0, 3).map((mentor) => (
                                <li key={mentor._id} className="group">
                                    <div className="flex items-center justify-between p-2 rounded-lg group-hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center space-x-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarFallback className="bg-primary text-primary-foreground">
                                                    {mentor.fullName.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{mentor.fullName}</p>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <Badge
                                                        variant="secondary"
                                                        className="text-xs capitalize"
                                                    >
                                                        {mentor.role}
                                                    </Badge>
                                                    <span className="text-xs text-muted-foreground truncate max-w-[120px]">
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
                                                    className="gap-2 hover:bg-primary hover:text-primary-foreground"
                                                >
                                                    <EyeIcon className="h-4 w-4" />
                                                    Details
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-2xl">
                                                <DialogHeader>
                                                    <DialogTitle className="text-xl">
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
                        <div className="text-center py-4 text-muted-foreground">
                            No mentors available
                        </div>
                    )}
                </CardContent>
            </Card>
        </section>
    );
}
