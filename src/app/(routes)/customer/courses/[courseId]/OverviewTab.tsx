// @/app/(routes)/customer/courses/[courseId]/OverviewTab.tsx
'use client';

import LessonList from '@/app/(routes)/customer/courses/[courseId]/LessionList';

interface OverviewTabProps {
    progressPercentage: number;
    completedModules: { [key: string]: boolean };
    onNavigate: (path: string) => void;
    courseId: string;
}

export default function OverviewTab({
    progressPercentage,
    completedModules,
    onNavigate,
    courseId,
}: OverviewTabProps) {
    return (
        <LessonList
            courseId={courseId}
            progressPercentage={progressPercentage}
            completedModules={completedModules}
            onNavigate={onNavigate}
        />
    );
}
