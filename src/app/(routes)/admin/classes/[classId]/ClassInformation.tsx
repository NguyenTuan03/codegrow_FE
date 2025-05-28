import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Dispatch, SetStateAction } from 'react';
import {
    BookOpen,
    User,
    Users,
    Calendar,
    Clock,
    Award,
    FileText,
    Link2,
    PlayCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Schedule {
    startDate: string;
    endDate: string;
    time: string;
    daysOfWeek: string[];
}

interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: { _id: string; name: string };
    createdAt: string;
    author: {
        _id: string;
        fullName: string;
        role: string;
        email: string;
    };
    isDeleted?: boolean;
    enrolledCount?: number;
}

interface User {
    _id: string;
    email: string;
    role: string;
    fullName: string;
}

interface Mentor {
    _id: string;
    fullName: string;
    email: string;
    role: string;
}

interface ClassItem {
    _id: string;
    title: string;
    course: Course;
    description: string;
    mentor: User;
    status: string;
    maxStudents: number;
    students: User[];
    schedule: Schedule;
    linkMeet?: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface ClassInfoProps {
    classData: ClassItem;
    formData: ClassItem | null;
    isEditing: boolean;
    courses: Course[];
    mentors: Mentor[];
    handleInputChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: keyof ClassItem | keyof Schedule,
    ) => void;
    handleDayChange: (day: string) => void;
    setFormData: Dispatch<SetStateAction<ClassItem | null>>;
}

export default function ClassInfo({
    classData,
    formData,
    isEditing,
    courses,
    mentors,
    handleInputChange,
    handleDayChange,
    setFormData,
}: ClassInfoProps) {
    const daysOfWeekOptions = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ];

    const handleJoinMeeting = () => {
        if (classData.linkMeet) {
            window.open(classData.linkMeet, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="w-6 h-6 text-[#657ED4]" />
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        Class Information
                    </h2>
                </div>
                {isEditing ? (
                    <div className="space-y-6">
                        <div>
                            <label
                                htmlFor="title"
                                className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-medium mb-2"
                            >
                                <BookOpen className="w-5 h-5 text-[#657ED4]" />
                                Title
                            </label>
                            <Input
                                id="title"
                                type="text"
                                value={formData?.title || ''}
                                onChange={(e) => handleInputChange(e, 'title')}
                                className="w-full border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#5AD3AF] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                placeholder="Enter class title"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="course"
                                className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-medium mb-2"
                            >
                                <BookOpen className="w-5 h-5 text-[#5AD3AF]" />
                                Course
                            </label>
                            <select
                                id="course"
                                value={formData?.course._id || ''}
                                onChange={(e) => {
                                    if (formData) {
                                        const selectedCourse = courses.find(
                                            (c) => c._id === e.target.value,
                                        ) || {
                                            _id: '',
                                            title: '',
                                            description: '',
                                            price: 0,
                                            category: { _id: '', name: '' },
                                            createdAt: '',
                                            author: {
                                                _id: '',
                                                fullName: '',
                                                role: '',
                                                email: '',
                                            },
                                        };
                                        setFormData({ ...formData, course: selectedCourse });
                                    }
                                }}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#5AD3AF]"
                            >
                                <option value="" disabled>
                                    Select a course
                                </option>
                                {courses.map((course) => (
                                    <option key={course._id} value={course._id}>
                                        {course.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="mentor"
                                className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-medium mb-2"
                            >
                                <User className="w-5 h-5 text-[#5AD3AF]" />
                                Mentor
                            </label>
                            <select
                                id="mentor"
                                value={formData?.mentor?._id || ''}
                                onChange={(e) => {
                                    if (formData) {
                                        const selectedMentor = mentors.find(
                                            (m) => m._id === e.target.value,
                                        ) || {
                                            _id: '',
                                            fullName: 'N/A',
                                            email: '',
                                            role: '',
                                        };
                                        setFormData({ ...formData, mentor: selectedMentor });
                                    }
                                }}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#5AD3AF]"
                            >
                                <option value="" disabled>
                                    Select a mentor
                                </option>
                                {mentors.map((mentor) => (
                                    <option key={mentor._id} value={mentor._id}>
                                        {mentor.fullName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="description"
                                className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-medium mb-2"
                            >
                                <FileText className="w-5 h-5 text-[#5AD3AF]" />
                                Description
                            </label>
                            <Textarea
                                id="description"
                                value={formData?.description || ''}
                                onChange={(e) => handleInputChange(e, 'description')}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#5AD3AF] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-y"
                                rows={4}
                                placeholder="Enter class description"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="linkMeet"
                                className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-medium mb-2"
                            >
                                <Link2 className="w-5 h-5 text-[#5AD3AF]" />
                                Meeting Link
                            </label>
                            <div className="relative">
                                <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="linkMeet"
                                    type="text"
                                    value={formData?.linkMeet || ''}
                                    onChange={(e) => handleInputChange(e, 'linkMeet')}
                                    className="w-full pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#5AD3AF] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    placeholder="https://meet.google.com/abc-xyz"
                                />
                            </div>
                            <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
                                Enter a valid meeting link (e.g., Google Meet, Zoom)
                            </p>
                        </div>
                        <div>
                            <label
                                htmlFor="maxStudents"
                                className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-medium mb-2"
                            >
                                <Users className="w-5 h-5 text-[#5AD3AF]" />
                                Max Students
                            </label>
                            <Input
                                id="maxStudents"
                                type="number"
                                value={formData?.maxStudents || 0}
                                onChange={(e) => handleInputChange(e, 'maxStudents')}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#5AD3AF] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                placeholder="Enter maximum number of students"
                                min="1"
                                max="30"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="status"
                                className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-medium mb-2"
                            >
                                <Award className="w-5 h-5 text-[#5AD3AF]" />
                                Status
                            </label>
                            <select
                                id="status"
                                value={formData?.status || ''}
                                onChange={(e) =>
                                    formData &&
                                    handleInputChange(
                                        {
                                            target: { value: e.target.value },
                                        } as React.ChangeEvent<HTMLInputElement>,
                                        'status',
                                    )
                                }
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#5AD3AF]"
                            >
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                                <option value="in-progress">In Progress</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="startDate"
                                    className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-medium mb-2"
                                >
                                    <Calendar className="w-5 h-5 text-[#5AD3AF]" />
                                    Start Date
                                </label>
                                <Input
                                    id="startDate"
                                    type="date"
                                    value={formData?.schedule?.startDate?.split('T')[0] || ''}
                                    onChange={(e) => handleInputChange(e, 'startDate')}
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#5AD3AF] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="endDate"
                                    className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-medium mb-2"
                                >
                                    <Calendar className="w-5 h-5 text-[#5AD3AF]" />
                                    End Date
                                </label>
                                <Input
                                    id="endDate"
                                    type="date"
                                    value={formData?.schedule?.endDate?.split('T')[0] || ''}
                                    onChange={(e) => handleInputChange(e, 'endDate')}
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#5AD3AF] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="time"
                                    className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-medium mb-2"
                                >
                                    <Clock className="w-5 h-5 text-[#5AD3AF]" />
                                    Class Time
                                </label>
                                <Select
                                    value={formData?.schedule?.time || '19:00-21:00'}
                                    onValueChange={(value) => {
                                        if (formData) {
                                            handleInputChange(
                                                {
                                                    target: { value },
                                                } as React.ChangeEvent<HTMLInputElement>,
                                                'time',
                                            );
                                        }
                                    }}
                                >
                                    <SelectTrigger className="w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#5AD3AF] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                                        <SelectValue placeholder="Select time" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-gray-800">
                                        {[
                                            { value: '07:00-09:00', label: '7:00 - 9:00' },
                                            { value: '09:00-11:00', label: '9:00 - 11:00' },
                                            { value: '11:00-13:00', label: '11:00 - 13:00' },
                                            { value: '13:00-15:00', label: '13:00 - 15:00' },
                                            { value: '15:00-17:00', label: '15:00 - 17:00' },
                                            { value: '17:00-19:00', label: '17:00 - 19:00' },
                                            { value: '19:00-21:00', label: '19:00 - 21:00' },
                                        ].map((time) => (
                                            <SelectItem key={time.value} value={time.value}>
                                                {time.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <fieldset>
                                    <legend className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-medium mb-2">
                                        <Calendar className="w-5 h-5 text-[#5AD3AF]" />
                                        Class Days
                                    </legend>
                                    <div className="flex flex-wrap gap-3">
                                        {daysOfWeekOptions.map((day) => (
                                            <label
                                                key={day}
                                                htmlFor={`day-${day.toLowerCase()}`}
                                                className="flex items-center gap-1 text-gray-700 dark:text-gray-200"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id={`day-${day.toLowerCase()}`}
                                                    checked={
                                                        formData?.schedule?.daysOfWeek.includes(
                                                            day,
                                                        ) || false
                                                    }
                                                    onChange={() => handleDayChange(day)}
                                                    className="h-4 w-4 text-[#5AD3AF] focus:ring-[#5AD3AF] border-gray-300 rounded"
                                                />
                                                <span>{day}</span>
                                            </label>
                                        ))}
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                                {classData.description || 'No description available.'}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex items-start gap-3">
                                <FileText className="w-5 h-5 text-[#657ED4] dark:text-[#5AD3AF] mt-1" />
                                <div>
                                    <h3 className="font-medium text-gray-700 dark:text-gray-200 text-base">
                                        Course Description
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-base">
                                        {classData.course.description
                                            ? classData.course.description.slice(0, 50) +
                                              (classData.course.description.length > 50
                                                  ? '...'
                                                  : '')
                                            : 'N/A'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Award className="w-5 h-5 text-[#657ED4] dark:text-[#5AD3AF] mt-1" />
                                <div>
                                    <h3 className="font-medium text-gray-700 dark:text-gray-200 text-base">
                                        Course Price
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-base">
                                        {classData.course.price
                                            ? `${classData.course.price} VND`
                                            : 'N/A'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Calendar className="w-5 h-5 text-[#657ED4] dark:text-[#5AD3AF] mt-1" />
                                <div>
                                    <h3 className="font-medium text-gray-700 dark:text-gray-200 text-base">
                                        Course Created At
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-base">
                                        {classData.course.createdAt
                                            ? new Date(
                                                  classData.course.createdAt,
                                              ).toLocaleDateString()
                                            : 'N/A'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <User className="w-5 h-5 text-[#657ED4] dark:text-[#5AD3AF] mt-1" />
                                <div>
                                    <h3 className="font-medium text-gray-700 dark:text-gray-200 text-base">
                                        Mentor
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-base">
                                        {classData.mentor.fullName || 'N/A'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Users className="w-5 h-5 text-[#657ED4] dark:text-[#5AD3AF] mt-1" />
                                <div>
                                    <h3 className="font-medium text-gray-700 dark:text-gray-200 text-base">
                                        Max Students
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-base">
                                        {classData.maxStudents || 'N/A'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Award className="w-5 h-5 text-[#657ED4] dark:text-[#5AD3AF] mt-1" />
                                <div>
                                    <h3 className="font-medium text-gray-700 dark:text-gray-200 text-base">
                                        Status
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-base">
                                        {classData.status || 'N/A'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Calendar className="w-5 h-5 text-[#657ED4] dark:text-[#5AD3AF] mt-1" />
                                <div>
                                    <h3 className="font-medium text-gray-700 dark:text-gray-200 text-base">
                                        Start Date
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-base">
                                        {classData.schedule.startDate
                                            ? new Date(
                                                  classData.schedule.startDate,
                                              ).toLocaleDateString()
                                            : 'N/A'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Calendar className="w-5 h-5 text-[#657ED4] dark:text-[#5AD3AF] mt-1" />
                                <div>
                                    <h3 className="font-medium text-gray-700 dark:text-gray-200 text-base">
                                        End Date
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-base">
                                        {classData.schedule.endDate
                                            ? new Date(
                                                  classData.schedule.endDate,
                                              ).toLocaleDateString()
                                            : 'N/A'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-[#657ED4] dark:text-[#5AD3AF] mt-1" />
                                <div>
                                    <h3 className="font-medium text-gray-700 dark:text-gray-200 text-base">
                                        Class Time
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-base">
                                        {classData.schedule.time || 'N/A'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Calendar className="w-5 h-5 text-[#657ED4] dark:text-[#5AD3AF] mt-1" />
                                <div>
                                    <h3 className="font-medium text-gray-700 dark:text-gray-200 text-base">
                                        Class Days
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-base">
                                        {classData.schedule.daysOfWeek?.join(', ') || 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <Button
                                className="w-full sm:w-auto rounded-lg px-6 py-3 bg-[#657ED4] hover:bg-[#34574d] dark-bg-[#5AD3AF] dark-hover:bg-[#4ac2a0] text-white font-medium flex items-center gap-2 transition-all duration-200 shadow-sm"
                                onClick={handleJoinMeeting}
                                disabled={!classData.linkMeet}
                                aria-label={
                                    classData.linkMeet
                                        ? 'Join meeting'
                                        : 'No meeting link available'
                                }
                            >
                                <PlayCircle className="w-5 h-5" />
                                Join Meeting
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
