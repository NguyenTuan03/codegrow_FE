'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const Page = () => {
    const [rating, setRating] = useState(4);

    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <Card className="w-full max-w-md p-6 shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                <h2 className="text-2xl font-bold text-center mb-6">Feedback Form</h2>
                <CardContent className="space-y-4">
                    <div>
                        <Label className="mb-3" htmlFor="name">
                            Name
                        </Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1.5 text-gray-400 dark:text-gray-500">
                                👤
                            </span>
                            <Input
                                id="name"
                                placeholder="Your name"
                                className="pl-10 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                            />
                        </div>
                    </div>

                    <div>
                        <Label className="mb-3" htmlFor="email">
                            Email Address
                        </Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1.5 text-gray-400 dark:text-gray-500">
                                📧
                            </span>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="pl-10 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                            />
                        </div>
                    </div>

                    <div>
                        <Label className="mb-3">Share your experience in scaling</Label>
                        <div className="flex space-x-1 mt-1">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Star
                                    key={index}
                                    onClick={() => setRating(index + 1)}
                                    className={cn(
                                        'w-6 h-6 cursor-pointer',
                                        index < rating
                                            ? 'text-yellow-400 fill-yellow-400'
                                            : 'text-gray-300 dark:text-gray-600',
                                    )}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <Textarea
                            placeholder="Add your comments..."
                            className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                        />
                    </div>

                    <div className="flex justify-between items-center pt-2">
                        <Button variant="link" className="text-blue-600 dark:text-blue-400">
                            Cancel
                        </Button>
                        <Button className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500">
                            Submit
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;

// 'use client';

// import { useState, useEffect } from 'react';
// import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from '@/components/ui/table';
// import { Button } from '@/components/ui/button';
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from '@/components/ui/dialog';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// import { Loader2, Check, X, Edit } from 'lucide-react';
// import FeedbackForm from '@/app/(routes)/qaqc/feedbacks/Feedbacks-form';
// import { GetLesson } from '@/lib/services/lessons/getAllLessons';
// import { UpdateLesson } from '@/lib/services/lessons/updateLessonFeedback';

// export default function LessonsPage() {
//     const [lessons, setLessons] = useState<Lesson[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
//     const [dialogOpen, setDialogOpen] = useState(false);

//     // Fetch lessons on mount
//     useEffect(() => {
//         const loadLessons = async () => {
//             try {
//                 const data = await GetLesson();
//                 setLessons(data);
//             } catch (error) {
//                 console.error('Failed to fetch lessons:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         loadLessons();
//     }, []);

//     // Handle feedback form submission
//     const handleFeedbackSubmit = async (data: {
//         name: string;
//         email: string;
//         rating: number;
//         comments: string;
//     }) => {
//         if (selectedLesson) {
//             try {
//                 await UpdateLesson(selectedLesson.id, data);
//                 setLessons((prev) =>
//                     prev.map((lesson) =>
//                         lesson.id === selectedLesson.id ? { ...lesson, feedback: data } : lesson,
//                     ),
//                 );
//                 setDialogOpen(false);
//                 setSelectedLesson(null);
//             } catch (error) {
//                 console.error('Failed to update feedback:', error);
//             }
//         }
//     };

//     return (
//         <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
//             <Card className="w-full max-w-4xl mx-auto shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
//                 <CardHeader>
//                     <CardTitle>Lessons Management</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     {loading ? (
//                         <div className="flex justify-center">
//                             <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
//                         </div>
//                     ) : (
//                         <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
//                             <Table>
//                                 <TableHeader>
//                                     {table.getHeaderGroups().map((headerGroup) => (
//                                         <TableRow key={headerGroup.id}>
//                                             {headerGroup.headers.map((header) => (
//                                                 <TableHead key={header.id}>
//                                                     {header.isPlaceholder
//                                                         ? null
//                                                         : flexRender(
//                                                               header.column.columnDef.header,
//                                                               header.getContext(),
//                                                           )}
//                                                 </TableHead>
//                                             ))}
//                                         </TableRow>
//                                     ))}
//                                 </TableHeader>
//                                 <TableBody>
//                                     {table.getRowModel().rows.map((row) => (
//                                         <TableRow key={row.id}>
//                                             {row.getVisibleCells().map((cell) => (
//                                                 <TableCell key={cell.id}>
//                                                     {cell.column.id === 'actions' ? (
//                                                         <DialogTrigger asChild>
//                                                             <div
//                                                                 onClick={() =>
//                                                                     setSelectedLesson(row.original)
//                                                                 }
//                                                             >
//                                                                 {flexRender(
//                                                                     cell.column.columnDef.cell,
//                                                                     cell.getContext(),
//                                                                 )}
//                                                             </div>
//                                                         </DialogTrigger>
//                                                     ) : (
//                                                         flexRender(
//                                                             cell.column.columnDef.cell,
//                                                             cell.getContext(),
//                                                         )
//                                                     )}
//                                                 </TableCell>
//                                             ))}
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                             <DialogContent className="sm:max-w-md">
//                                 <DialogHeader>
//                                     <DialogTitle>
//                                         {selectedLesson?.feedback
//                                             ? 'Edit Feedback'
//                                             : 'Add Feedback'}
//                                     </DialogTitle>
//                                 </DialogHeader>
//                                 {selectedLesson && (
//                                     <FeedbackForm
//                                         initialData={selectedLesson.feedback}
//                                         onSubmit={handleFeedbackSubmit}
//                                         onCancel={() => {
//                                             setDialogOpen(false);
//                                             setSelectedLesson(null);
//                                         }}
//                                     />
//                                 )}
//                             </DialogContent>
//                         </Dialog>
//                     )}
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }
