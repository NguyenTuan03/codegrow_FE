import { Button } from '@/components/ui/button';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';

export default function MentorCalendar() {
    return (
        <div className="min-h-screen bg-[#f5f6fa] p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold">Daily Weekly List Calendar Attendance</h1>
                <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" className="px-3">
                        Daily
                    </Button>
                    <Button variant="ghost" size="sm" className="px-3">
                        Weekly
                    </Button>
                    <Button variant="ghost" size="sm" className="px-3">
                        List
                    </Button>
                    <Button variant="default" size="sm" className="px-3">
                        Calendar
                    </Button>
                    <Button variant="ghost" size="sm" className="px-3">
                        Attendance
                    </Button>
                </div>
            </div>

            <div className="flex gap-6">
                {/* Left sidebar - Calendar */}
                {/* <div className="w-[280px] bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-medium mb-3">March</h2>
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        className="rounded-md border"
                        month={new Date(2022, 2)} // March 2022
                        disabled={(date) => date.getMonth() !== 2} // Only show March
                    />
                    <div className="mt-3 text-sm text-gray-600">
                        {selectedDate.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </div>
                </div> */}

                {/* Main content */}
                <div className="flex-1 bg-white p-6 rounded-lg shadow">
                    {/* Public/Private toggle */}
                    <div className="flex space-x-2 mb-4">
                        <Button variant="outline" size="sm" className="px-4">
                            Public
                        </Button>
                        <Button variant="default" size="sm" className="px-4">
                            Private
                        </Button>
                    </div>

                    {/* Instructor dropdown */}
                    <Select>
                        <SelectTrigger className="w-[200px] mb-6">
                            <SelectValue placeholder="No Instructor" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="darlene">Darlene Robertson</SelectItem>
                            <SelectItem value="marvin">Marvin McKinney</SelectItem>
                            <SelectItem value="albert">Albert Flores</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Time slots */}
                    <div className="space-y-4">
                        {/* 9:00 AM */}
                        <div>
                            <div className="text-sm font-medium mb-1">9:00 AM</div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center p-2 border rounded">
                                    <span>Private Lesson</span>
                                </div>
                                <div className="flex justify-between items-center p-2 border rounded">
                                    <span>Adult LTF</span>
                                    <span className="text-xs text-gray-500">8:4</span>
                                </div>
                                <div className="flex justify-between items-center p-2 border rounded">
                                    <span>Private Lesson</span>
                                </div>
                            </div>
                        </div>

                        {/* 9:30 AM */}
                        <div>
                            <div className="text-sm font-medium mb-1">9:30 AM</div>
                            <div className="flex justify-between items-center p-2 border rounded">
                                <span>Private Lesson</span>
                                <Button variant="ghost" size="sm" className="text-blue-600">
                                    Add Private Lesson
                                </Button>
                            </div>
                        </div>

                        {/* 10:00 AM */}
                        <div>
                            <div className="text-sm font-medium mb-1">10:00 AM</div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center p-2 border rounded">
                                    <span>Private Lesson</span>
                                    <Button variant="ghost" size="sm" className="text-blue-600">
                                        Add Private Lesson
                                    </Button>
                                </div>
                                <div className="flex justify-between items-center p-2 border rounded">
                                    <span>Kids Learn-to-Fence</span>
                                    <span className="text-xs text-gray-500">8:4 0/10</span>
                                </div>
                                <div className="flex justify-between items-center p-2 border rounded">
                                    <span>Youth Learn-to-Fence</span>
                                    <span className="text-xs text-gray-500">8:4 0/10</span>
                                </div>
                            </div>
                        </div>

                        {/* 10:30 AM */}
                        <div>
                            <div className="text-sm font-medium mb-1">10:30 AM</div>
                            <div className="flex justify-between items-center p-2 border rounded">
                                <span>Private Lesson</span>
                                <Button variant="ghost" size="sm" className="text-blue-600">
                                    Add Private Lesson
                                </Button>
                            </div>
                        </div>

                        {/* 11:00 AM */}
                        <div>
                            <div className="text-sm font-medium mb-1">11:00 AM</div>
                            <div className="flex justify-between items-center p-2 border rounded">
                                <span>Private Lesson</span>
                            </div>
                        </div>

                        {/* 11:30 AM */}
                        <div>
                            <div className="text-sm font-medium mb-1">11:30 AM</div>
                            <div className="flex justify-between items-center p-2 border rounded">
                                <span>Private Lesson</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
