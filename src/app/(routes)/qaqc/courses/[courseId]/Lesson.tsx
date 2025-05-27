'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from '@/components/ui/pagination';
import { toast } from '@/components/ui/use-toast';
import { Eye, PlayCircle, FileText } from 'lucide-react';
import { GetLessons } from '@/lib/services/lessons/getAllLessons';
import { Badge } from '@/components/ui/badge';

interface Lesson {
    _id: string;
    title: string;
    content?: string;
    status?: string;
    videoUrl?: string;
    videoKey?: string;
    quiz?: string[];
    order: number;
    createdAt?: string;
    updatedAt?: string;
}

interface LessonListProps {
    courseId: string;
}

interface ApiResponse {
    status: number;
    metadata: Lesson[];
    page?: number;
    totalPages?: number;
    totalItems?: number;
}

export default function LessonList({ courseId }: LessonListProps) {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 6; // Number of lessons per page
    const router = useRouter();

    const loadLessons = useCallback(
        async (page: number = 1) => {
            try {
                setLoading(true);
                const data: ApiResponse = await GetLessons(courseId, page, limit);
                console.log('API Data:', data);

                if (data?.status === 200 && Array.isArray(data.metadata)) {
                    setLessons(
                        data.metadata.map((lesson: Lesson) => ({
                            _id: lesson._id,
                            title: lesson.title,
                            content: lesson.content,
                            status: lesson.status,
                            videoUrl: lesson.videoUrl,
                            videoKey: lesson.videoKey,
                            quiz: lesson.quiz,
                            order: lesson.order,
                            createdAt: lesson.createdAt,
                            updatedAt: lesson.updatedAt,
                        })),
                    );
                    setCurrentPage(data.page || 1);
                    setTotalPages(data.totalPages || Math.ceil(data.metadata.length / limit));
                } else {
                    throw new Error('Invalid lesson data');
                }
            } catch (error) {
                console.error('Failed to fetch lessons:', error);
                toast({
                    title: 'Error',
                    description: error instanceof Error ? error.message : 'Failed to load lessons',
                    variant: 'destructive',
                });
                setLessons([]);
            } finally {
                setLoading(false);
            }
        },
        [courseId],
    );

    useEffect(() => {
        loadLessons(currentPage);
    }, [loadLessons, currentPage]);

    const handleViewDetails = (lessonId: string) => {
        console.log('Navigating to lesson details:', lessonId);
        router.push(`/qaqc/courses/${courseId}/${lessonId}`);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Lessons</h2>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: limit }).map((_, index) => (
                        <Card
                            key={index}
                            className="animate-pulse bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                        >
                            <CardContent className="p-4 space-y-3">
                                <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
                                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full" />
                                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : lessons.length === 0 ? (
                <div className="text-center py-12 text-gray-600 dark:text-gray-400">
                    <p className="text-lg">No lessons found for this course.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {lessons.map((lesson) => (
                            <Card
                                key={lesson._id}
                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 hover:shadow-xl"
                            >
                                <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                                            {lesson.title}
                                        </h3>
                                        <Badge
                                            className={`text-xs ${
                                                lesson.status === 'done'
                                                    ? 'bg-[#5AD3AF] text-white'
                                                    : 'bg-gray-500 text-white'
                                            }`}
                                        >
                                            {lesson.status || 'Draft'}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 space-y-2">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                        {lesson.content
                                            ? lesson.content.slice(0, 100) +
                                              (lesson.content.length > 100 ? '...' : '')
                                            : 'No content available'}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                        <FileText className="h-4 w-4" />
                                        <span>Order: {lesson.order}</span>
                                    </div>
                                    {lesson.videoUrl && (
                                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                            <PlayCircle className="h-4 w-4" />
                                            <a
                                                href={lesson.videoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#5AD3AF] hover:underline truncate max-w-[150px]"
                                                title={lesson.videoUrl}
                                            >
                                                {lesson.videoUrl.slice(0, 20) +
                                                    (lesson.videoUrl.length > 20 ? '...' : '')}
                                            </a>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                        <span>
                                            Created:{' '}
                                            {lesson.createdAt
                                                ? new Date(lesson.createdAt).toLocaleDateString()
                                                : 'N/A'}
                                        </span>
                                    </div>
                                </CardContent>
                                <div className="p-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full text-[#5AD3AF] border-[#5AD3AF] hover:bg-[#5AD3AF] hover:text-white dark:text-[#5AD3AF] dark:border-[#5AD3AF] dark:hover:bg-[#5AD3AF] dark:hover:text-white"
                                        onClick={() => handleViewDetails(lesson._id)}
                                    >
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Details
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-8 flex justify-center">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            className={
                                                currentPage === 1
                                                    ? 'pointer-events-none opacity-50'
                                                    : 'cursor-pointer text-[#5AD3AF] hover:text-[#4ac2a0]'
                                            }
                                            aria-disabled={currentPage === 1}
                                        />
                                    </PaginationItem>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                        (page) => (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    onClick={() => handlePageChange(page)}
                                                    isActive={currentPage === page}
                                                    className={
                                                        currentPage === page
                                                            ? 'bg-[#5AD3AF] text-white hover:bg-[#4ac2a0]'
                                                            : 'cursor-pointer text-[#5AD3AF] hover:text-[#4ac2a0]'
                                                    }
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ),
                                    )}

                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            className={
                                                currentPage === totalPages
                                                    ? 'pointer-events-none opacity-50'
                                                    : 'cursor-pointer text-[#5AD3AF] hover:text-[#4ac2a0]'
                                            }
                                            aria-disabled={currentPage === totalPages}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationPrevious,
//   PaginationNext,
// } from '@/components/ui/pagination';
// import { toast } from '@/components/ui/use-toast';
// import { Eye, PlayCircle, FileText } from 'lucide-react';
// import { GetLessons } from '@/lib/services/lessons/getAllLessons';
// import { Badge } from '@/components/ui/badge';

// interface Lesson {
//   _id: string;
//   title: string;
//   content?: string;
//   videoUrl?: string; // For watching lessons
//   videoKey?: string;
//   quiz?: string[];
//   order: number;
//   createdAt?: string;
//   updatedAt?: string;
//   type: 'reading' | 'watching'; // Explicit type field
//   urlMaterial?: string; // For reading lessons
//   description?: string; // For reading lessons
// }

// interface LessonListProps {
//   courseId: string;
// }

// interface ApiResponse {
//   status: number;
//   metadata: Lesson[];
//   page?: number;
//   totalPages?: number;
//   totalItems?: number;
// }

// export default function LessonList({ courseId }: LessonListProps) {
//   const [lessons, setLessons] = useState<Lesson[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const limit = 6; // Number of lessons per page
//   const router = useRouter();

//   const loadLessons = useCallback(
//     async (page: number = 1) => {
//       try {
//         setLoading(true);
//         const data: ApiResponse = await GetLessons(courseId, page, limit);
//         console.log('API Data:', data);

//         if (data?.status === 200 && Array.isArray(data.metadata)) {
//           setLessons(
//             data.metadata.map((lesson: Lesson) => ({
//               _id: lesson._id,
//               title: lesson.title,
//               content: lesson.content,
//               videoUrl: lesson.videoUrl,
//               videoKey: lesson.videoKey,
//               quiz: lesson.quiz,
//               order: lesson.order,
//               createdAt: lesson.createdAt,
//               updatedAt: lesson.updatedAt,
//               type: lesson.type,
//               urlMaterial: lesson.urlMaterial,
//               description: lesson.description,
//             })),
//           );
//           setCurrentPage(data.page || 1);
//           setTotalPages(data.totalPages || Math.ceil(data.metadata.length / limit));
//         } else {
//           throw new Error('Invalid lesson data');
//         }
//       } catch (error) {
//         console.error('Failed to fetch lessons:', error);
//         toast({
//           title: 'Error',
//           description: error instanceof Error ? error.message : 'Failed to load lessons',
//           variant: 'destructive',
//         });
//         setLessons([]);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [courseId],
//   );

//   useEffect(() => {
//     loadLessons(currentPage);
//   }, [loadLessons, currentPage]);

//   const handleViewDetails = (lessonId: string) => {
//     console.log('Navigating to lesson details:', lessonId);
//     router.push(`/qaqc/courses/${courseId}/${lessonId}`);
//   };

//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages && page !== currentPage) {
//       setCurrentPage(page);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header Section */}
//         <div className="flex items-center gap-3">
//           <div className="w-1.5 h-8 bg-[#5AD3AF] rounded-full" />
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Lessons</h2>
//         </div>

//         {/* Lessons Section */}
//         <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
//           <CardContent className="p-6">
//             {loading ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {Array.from({ length: limit }).map((_, index) => (
//                   <Card
//                     key={index}
//                     className="animate-pulse bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
//                   >
//                     <CardContent className="p-6 space-y-3">
//                       <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
//                       <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full" />
//                       <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             ) : lessons.length === 0 ? (
//               <div className="text-center py-12 text-gray-600 dark:text-gray-400">
//                 <p className="text-lg">No lessons found for this course.</p>
//               </div>
//             ) : (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {lessons.map((lesson) => (
//                     <Card
//                       key={lesson._id}
//                       className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 hover:shadow-xl"
//                     >
//                       <CardHeader className="p-6 border-b border-gray-200 dark:border-gray-700">
//                         <div className="flex items-center justify-between">
//                           <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
//                             {lesson.title}
//                           </h3>
//                           <Badge
//                             className={`text-xs ${
//                               lesson.status === 'published'
//                                 ? 'bg-[#5AD3AF] text-white'
//                                 : 'bg-yellow-500 text-white'
//                             }`}
//                           >
//                             {lesson.status || 'Draft'}
//                           </Badge>
//                         </div>
//                       </CardHeader>
//                       <CardContent className="p-6 space-y-3">
//                         <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
//                           {lesson.content
//                             ? lesson.content.slice(0, 80) +
//                               (lesson.content.length > 80 ? '...' : '')
//                             : 'No content available'}
//                         </p>
//                         <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
//                           <FileText className="h-4 w-4" />
//                           <span>Order: {lesson.order}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
//                           {lesson.type === 'watching' ? (
//                             <PlayCircle className="h-4 w-4 text-[#5AD3AF]" />
//                           ) : (
//                             <FileText className="h-4 w-4 text-[#5AD3AF]" />
//                           )}
//                           <span>
//                             {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
//                           </span>
//                         </div>
//                         {lesson.type === 'watching' && lesson.videoUrl && (
//                           <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
//                             <PlayCircle className="h-4 w-4" />
//                             <a
//                               href={lesson.videoUrl}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-[#5AD3AF] hover:underline truncate max-w-[150px]"
//                               title={lesson.videoUrl}
//                             >
//                               {lesson.videoUrl.slice(0, 20) +
//                                 (lesson.videoUrl.length > 20 ? '...' : '')}
//                             </a>
//                           </div>
//                         )}
//                         {lesson.type === 'reading' && lesson.urlMaterial && (
//                           <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
//                             <FileText className="h-4 w-4" />
//                             <a
//                               href={lesson.urlMaterial}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-[#5AD3AF] hover:underline truncate max-w-[150px]"
//                               title={lesson.urlMaterial}
//                             >
//                               {lesson.urlMaterial.slice(0, 20) +
//                                 (lesson.urlMaterial.length > 20 ? '...' : '')}
//                             </a>
//                           </div>
//                         )}
//                         <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
//                           <span>
//                             Created:{' '}
//                             {lesson.createdAt
//                               ? new Date(lesson.createdAt).toLocaleDateString()
//                               : 'N/A'}
//                           </span>
//                         </div>
//                       </CardContent>
//                       <div className="p-6">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           className="w-full text-[#5AD3AF] border-[#5AD3AF] hover:bg-[#5AD3AF] hover:text-white dark:text-[#5AD3AF] dark:border-[#5AD3AF] dark:hover:bg-[#5AD3AF] dark:hover:text-white rounded-lg"
//                           onClick={() => handleViewDetails(lesson._id)}
//                         >
//                           <Eye className="h-4 w-4 mr-2" />
//                           View Details
//                         </Button>
//                       </div>
//                     </Card>
//                   ))}
//                 </div>

//                 {totalPages > 1 && (
//                   <div className="mt-8 flex justify-center">
//                     <Pagination>
//                       <PaginationContent>
//                         <PaginationItem>
//                           <PaginationPrevious
//                             onClick={() => handlePageChange(currentPage - 1)}
//                             className={
//                               currentPage === 1
//                                 ? 'pointer-events-none opacity-50'
//                                 : 'cursor-pointer text-[#5AD3AF] hover:text-[#4ac2a0]'
//                             }
//                             aria-disabled={currentPage === 1}
//                           />
//                         </PaginationItem>

//                         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                           <PaginationItem key={page}>
//                             <PaginationLink
//                               onClick={() => handlePageChange(page)}
//                               isActive={currentPage === page}
//                               className={
//                                 currentPage === page
//                                   ? 'bg-[#5AD3AF] text-white hover:bg-[#4ac2a0] rounded-lg'
//                                   : 'cursor-pointer text-[#5AD3AF] hover:text-[#4ac2a0] rounded-lg'
//                               }
//                             >
//                               {page}
//                             </PaginationLink>
//                           </PaginationItem>
//                         ))}

//                         <PaginationItem>
//                           <PaginationNext
//                             onClick={() => handlePageChange(currentPage + 1)}
//                             className={
//                               currentPage === totalPages
//                                 ? 'pointer-events-none opacity-50'
//                                 : 'cursor-pointer text-[#5AD3AF] hover:text-[#4ac2a0]'
//                             }
//                             aria-disabled={currentPage === totalPages}
//                           />
//                         </PaginationItem>
//                       </PaginationContent>
//                     </Pagination>
//                   </div>
//                 )}
//               </>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
