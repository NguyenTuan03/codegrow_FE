// // @/app/(routes)/admin/courses/[courseId]/lessons/[lessonId]/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { toast } from '@/components/ui/use-toast';
// import { Loader2, Pencil, Trash2, Plus } from 'lucide-react';
// import { viewDetailLesson } from '@/lib/services/lessons/getdetailllesson';
// import { CreateQuiz } from '@/lib/services/quizs/createquiz';
// import { UpdateQuiz } from '@/lib/services/quizs/updatequiz';
// import { DeleteQuiz } from '@/lib/services/quizs/deletequiz';

// interface Lesson {
//     _id: string;
//     title: string;
//     content?: string;
//     videoUrl?: string;
//     videoKey?: string;
//     quiz?: string[];
//     order: number;
// }

// export default function LessonDetail() {
//     const { lessonId } = useParams(); // Get lessonId from URL
//     const [lesson, setLesson] = useState<Lesson | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [isQuizDialogOpen, setIsQuizDialogOpen] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);
//     const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
//     const [newQuestion, setNewQuestion] = useState('');

//     // Fetch lesson details
//     const loadLesson = async () => {
//         try {
//             setLoading(true);
//             const response = await viewDetailLesson(lessonId as string);
//             setLesson(response.metadata);
//         } catch (error) {
//             console.error('Failed to fetch lesson details:', error);
//             toast({
//                 title: 'Error',
//                 description:
//                     error instanceof Error ? error.message : 'Failed to load lesson details',
//                 variant: 'destructive',
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (lessonId) {
//             loadLesson();
//         }
//     }, [lessonId]);

//     // Handle adding a new quiz question
//     const handleAddQuizQuestion = async () => {
//         if (!newQuestion || options.length === 0) {
//             toast({
//                 title: 'Error',
//                 description: 'Please enter a quiz question and at least one option',
//                 variant: 'destructive',
//             });
//             return;
//         }

//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 throw new Error('Authentication token is missing');
//             }

//             const response = await CreateQuiz({
//                 token,
//                 lesson: lessonId as string, // Lesson ID
//                 type: 'multiple_choice', // Quiz type
//                 questionText: newQuestion, // Question text
//                 options, // Array of options
//                 starterCode, // Optional starter code
//                 expectedOutput, // Optional expected output
//                 language, // Optional programming language
//                 testCases, // Optional test cases
//                 explanation, // Optional explanation
//             });

//             setLesson((prev) => ({
//                 ...prev!,
//                 quiz: response.metadata.quiz, // Update quiz list
//             }));
//             setNewQuestion('');
//             setOptions([]); // Reset options
//             setStarterCode('');
//             setExpectedOutput('');
//             setLanguage('');
//             setTestCases([]);
//             setExplanation('');
//             setIsQuizDialogOpen(false);

//             toast({
//                 title: 'Success',
//                 description: 'Quiz question added successfully',
//                 variant: 'default',
//                 className: 'bg-[#5AD3AF] text-black',
//             });
//         } catch (error) {
//             console.error('Failed to add quiz question:', error);
//             toast({
//                 title: 'Error',
//                 description: error instanceof Error ? error.message : 'Failed to add quiz question',
//                 variant: 'destructive',
//             });
//         }
//     };

//     // Handle updating a quiz question
//     const handleUpdateQuizQuestion = async () => {
//         if (!currentQuestion || !newQuestion) {
//             toast({
//                 title: 'Error',
//                 description: 'Please enter a new quiz question',
//                 variant: 'destructive',
//             });
//             return;
//         }

//         try {
//             const response = await UpdateQuiz(lessonId as string, currentQuestion, newQuestion);
//             setLesson((prev) => ({
//                 ...prev!,
//                 quiz: response.metadata.quiz,
//             }));
//             setNewQuestion('');
//             setCurrentQuestion(null);
//             setIsEditing(false);
//             setIsQuizDialogOpen(false);
//             toast({
//                 title: 'Success',
//                 description: 'Quiz question updated successfully',
//                 variant: 'default',
//                 className: 'bg-[#5AD3AF] text-black',
//             });
//         } catch (error) {
//             console.error('Failed to update quiz question:', error);
//             toast({
//                 title: 'Error',
//                 description:
//                     error instanceof Error ? error.message : 'Failed to update quiz question',
//                 variant: 'destructive',
//             });
//         }
//     };

//     // Handle deleting a quiz question
//     const handleDeleteQuizQuestion = async (question: string) => {
//         try {
//             const response = await DeleteQuiz(lessonId as string, question);
//             setLesson((prev) => ({
//                 ...prev!,
//                 quiz: response.metadata.quiz,
//             }));
//             toast({
//                 title: 'Success',
//                 description: 'Quiz question deleted successfully',
//                 variant: 'default',
//                 className: 'bg-[#5AD3AF] text-black',
//             });
//         } catch (error) {
//             console.error('Failed to delete quiz question:', error);
//             toast({
//                 title: 'Error',
//                 description:
//                     error instanceof Error ? error.message : 'Failed to delete quiz question',
//                 variant: 'destructive',
//             });
//         }
//     };

//     // Open modal for editing a quiz question
//     const openEditQuizModal = (question: string) => {
//         setIsEditing(true);
//         setCurrentQuestion(question);
//         setNewQuestion(question);
//         setIsQuizDialogOpen(true);
//     };

//     // Open modal for adding a new quiz question
//     const openAddQuizModal = () => {
//         setIsEditing(false);
//         setCurrentQuestion(null);
//         setNewQuestion('');
//         setIsQuizDialogOpen(true);
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-32">
//                 <Loader2 className="h-8 w-8 animate-spin text-[#5AD3AF]" />
//             </div>
//         );
//     }

//     if (!lesson) {
//         return (
//             <div className="text-center text-gray-600 dark:text-gray-400 p-4">
//                 Lesson not found.
//             </div>
//         );
//     }

//     return (
//         <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-6">
//             <h2 className="text-2xl font-semibold text-[#657ED4] dark:text-[#5AD3AF] mb-6">
//                 Lesson Details
//             </h2>

//             {/* Lesson Details Card */}
//             <Card className="mb-6">
//                 <CardHeader>
//                     <CardTitle>{lesson.title}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="space-y-4">
//                         <div>
//                             <Label className="font-medium">Content</Label>
//                             <p className="text-gray-600 dark:text-gray-400">
//                                 {lesson.content || 'No content'}
//                             </p>
//                         </div>
//                         <div>
//                             <Label className="font-medium">Video URL</Label>
//                             <p className="text-gray-600 dark:text-gray-400">
//                                 {lesson.videoUrl || 'No video URL'}
//                             </p>
//                         </div>
//                         <div>
//                             <Label className="font-medium">Video Key</Label>
//                             <p className="text-gray-600 dark:text-gray-400">
//                                 {lesson.videoKey || 'No video key'}
//                             </p>
//                         </div>
//                         <div>
//                             <Label className="font-medium">Order</Label>
//                             <p className="text-gray-600 dark:text-gray-400">{lesson.order}</p>
//                         </div>
//                     </div>
//                 </CardContent>
//             </Card>

//             {/* Quiz Section */}
//             <Card>
//                 <CardHeader className="flex justify-between items-center">
//                     <CardTitle>Quiz Questions</CardTitle>
//                     <Dialog open={isQuizDialogOpen} onOpenChange={setIsQuizDialogOpen}>
//                         <DialogTrigger asChild>
//                             <Button
//                                 onClick={openAddQuizModal}
//                                 className="bg-blue-600 text-white hover:bg-blue-700"
//                             >
//                                 <Plus className="h-4 w-4 mr-2" />
//                                 Add Quiz Question
//                             </Button>
//                         </DialogTrigger>
//                         <DialogContent>
//                             <DialogHeader>
//                                 <DialogTitle>
//                                     {isEditing ? 'Edit Quiz Question' : 'Add Quiz Question'}
//                                 </DialogTitle>
//                             </DialogHeader>
//                             <div className="space-y-4">
//                                 <div>
//                                     <Label htmlFor="question">Question</Label>
//                                     <Input
//                                         id="question"
//                                         value={newQuestion}
//                                         onChange={(e) => setNewQuestion(e.target.value)}
//                                         placeholder="Enter quiz question"
//                                         className="dark:bg-gray-700 dark:text-gray-200"
//                                     />
//                                 </div>
//                                 <Button
//                                     onClick={
//                                         isEditing ? handleUpdateQuizQuestion : handleAddQuizQuestion
//                                     }
//                                 >
//                                     {isEditing ? 'Update' : 'Add'}
//                                 </Button>
//                             </div>
//                         </DialogContent>
//                     </Dialog>
//                 </CardHeader>
//                 <CardContent>
//                     {lesson.quiz && lesson.quiz.length > 0 ? (
//                         <ul className="space-y-4">
//                             {lesson.quiz.map((question, index) => (
//                                 <li
//                                     key={index}
//                                     className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-700 rounded-md"
//                                 >
//                                     <span className="text-gray-900 dark:text-gray-100">
//                                         {question}
//                                     </span>
//                                     <div className="flex gap-2">
//                                         <Button
//                                             variant="outline"
//                                             size="sm"
//                                             onClick={() => openEditQuizModal(question)}
//                                             className="text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
//                                         >
//                                             <Pencil className="h-4 w-4 mr-1" />
//                                             Edit
//                                         </Button>
//                                         <Button
//                                             variant="outline"
//                                             size="sm"
//                                             onClick={() => handleDeleteQuizQuestion(question)}
//                                             className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600 border-gray-300 dark:border-gray-600"
//                                         >
//                                             <Trash2 className="h-4 w-4 mr-1" />
//                                             Delete
//                                         </Button>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p className="text-gray-600 dark:text-gray-400">
//                             No quiz questions available.
//                         </p>
//                     )}
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }
