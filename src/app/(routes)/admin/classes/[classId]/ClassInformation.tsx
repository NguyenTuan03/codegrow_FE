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
  category: string;
  createdAt: string;
  author: string;
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
  mentor: User; // Use User to match ClassDetailPage
  status: string;
  maxStudents: number;
  students: User[];
  schedule: Schedule;
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

  return (
    <div className="lg:col-span-2">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 transition-colors duration-300">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Class Information
        </h2>
        {isEditing ? (
          <>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 dark:text-gray-200 font-medium mb-1"
              >
                Title
              </label>
              <Input
                id="title"
                type="text"
                value={formData?.title || ''}
                onChange={(e) => handleInputChange(e, 'title')}
                className="w-full"
                placeholder="Enter class title"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="course"
                className="block text-gray-700 dark:text-gray-200 font-medium mb-1"
              >
                Course
              </label>
              <select
                id="course"
                value={formData?.course._id || ''}
                onChange={(e) => {
                  if (formData) {
                    const selectedCourse = courses.find((c) => c._id === e.target.value) || {
                      _id: '',
                      title: '',
                      description: '',
                      price: 0,
                      category: '',
                      createdAt: '',
                      author: '',
                    };
                    setFormData({ ...formData, course: selectedCourse });
                  }
                }}
                className="w-full border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
            <div className="mb-4">
              <label
                htmlFor="mentor"
                className="block text-gray-700 dark:text-gray-200 font-medium mb-1"
              >
                Mentor
              </label>
              <select
                id="mentor"
                value={formData?.mentor?._id || ''}
                onChange={(e) => {
                  if (formData) {
                    const selectedMentor = mentors.find((m) => m._id === e.target.value) || {
                      _id: '',
                      fullName: 'N/A',
                      email: '',
                      role: '',
                    };
                    setFormData({ ...formData, mentor: selectedMentor });
                  }
                }}
                className="w-full border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 dark:text-gray-200 font-medium mb-1"
              >
                Description
              </label>
              <Textarea
                id="description"
                value={formData?.description || ''}
                onChange={(e) => handleInputChange(e, 'description')}
                className="w-full"
                rows={4}
                placeholder="Enter class description"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="maxStudents"
                className="block text-gray-700 dark:text-gray-200 font-medium mb-1"
              >
                Max Students
              </label>
              <Input
                id="maxStudents"
                type="number"
                value={formData?.maxStudents || 0}
                onChange={(e) => handleInputChange(e, 'maxStudents')}
                className="w-full"
                placeholder="Enter maximum number of students"
                min="1"
                max="30"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-gray-700 dark:text-gray-200 font-medium mb-1"
              >
                Status
              </label>
              <select
                id="status"
                value={formData?.status || ''}
                onChange={(e) =>
                  formData &&
                  handleInputChange(
                    { target: { value: e.target.value } } as React.ChangeEvent<HTMLInputElement>,
                    'status',
                  )
                }
                className="w-full border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
                  className="block text-gray-700 dark:text-gray-200 font-medium mb-1"
                >
                  Start Date
                </label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData?.schedule?.startDate?.split('T')[0] || ''}
                  onChange={(e) => handleInputChange(e, 'startDate')}
                  className="w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="block text-gray-700 dark:text-gray-200 font-medium mb-1"
                >
                  End Date
                </label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData?.schedule?.endDate?.split('T')[0] || ''}
                  onChange={(e) => handleInputChange(e, 'endDate')}
                  className="w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="time"
                  className="block text-gray-700 dark:text-gray-200 font-medium mb-1"
                >
                  Class Time
                </label>
                <Select
                  value={formData?.schedule?.time || '19:00-21:00'}
                  onValueChange={(value) => {
                    if (formData) {
                      handleInputChange(
                        { target: { value } } as React.ChangeEvent<HTMLInputElement>,
                        'time',
                      );
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
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
                  <legend className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
                    Class Days
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {daysOfWeekOptions.map((day) => (
                      <label
                        key={day}
                        htmlFor={`day-${day.toLowerCase()}`}
                        className="flex items-center gap-1"
                      >
                        <input
                          type="checkbox"
                          id={`day-${day.toLowerCase()}`}
                          checked={formData?.schedule?.daysOfWeek.includes(day) || false}
                          onChange={() => handleDayChange(day)}
                          className="h-4 w-4 text-blue-600 dark:text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-gray-700 dark:text-gray-200">{day}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {classData.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-200">Course</h3>
                <p className="text-gray-600 dark:text-gray-300">{classData.course.title || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-200">Mentor</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {classData.mentor.fullName || 'N/A'}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-200">Max Students</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {classData.maxStudents || 'N/A'}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-200">Status</h3>
                <p className="text-gray-600 dark:text-gray-300">{classData.status || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-200">Start Date</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {classData.schedule.startDate
                    ? new Date(classData.schedule.startDate).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-200">End Date</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {classData.schedule.endDate
                    ? new Date(classData.schedule.endDate).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-200">Class Time</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {classData.schedule.time || 'N/A'}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-200">Class Days</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {classData.schedule.daysOfWeek?.join(', ') || 'N/A'}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}