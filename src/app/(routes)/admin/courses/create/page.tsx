import CreateCourseForm from '@/app/(routes)/admin/courses/create/create-course.form';

export default function CreateClassPage() {
    return (
        <div className="min-h-screen width-[1000px] flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
            <CreateCourseForm />
        </div>
    );
}
