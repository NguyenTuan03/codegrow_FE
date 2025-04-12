'use client';

export default function CalendarPage() {
    return (
        <div className="min-h-screen bg-[#f5f6fa] px-8 py-6">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-2">Pages / Projects / Calendar</div>
            <h1 className="text-2xl font-bold mb-6">Calendar</h1>

            <div className="bg-white rounded-md shadow p-6 flex gap-6">
                {/* Sidebar */}
                <div className="w-[250px] space-y-6">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded font-medium">
                        + Create New Event
                    </button>

                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-green-500" />
                            <span>New Theme Release</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-blue-500" />
                            <span>My Event</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-yellow-400" />
                            <span>Meet manager</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500" />
                            <span>Create New theme</span>
                        </div>
                    </div>

                    <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" />
                        Remove after drop
                    </label>

                    <div className="text-[13px] space-y-2 pt-4">
                        <h3 className="font-semibold">How It Works ?</h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                            <li>It has survived not only five centuries...</li>
                            <li>Richard McClintock, a Latin professor at...</li>
                            <li>It has survived not only five centuries...</li>
                        </ul>
                    </div>
                </div>

                {/* Calendar */}
                <div className="flex-1">
                    {/* Top Bar */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <button className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100">
                                &lt;
                            </button>
                            <button className="text-sm border px-3 py-1 rounded hover:bg-gray-100">
                                Today
                            </button>
                        </div>

                        <h2 className="text-lg font-semibold tracking-wide">MARCH 2025</h2>

                        <div className="flex items-center gap-2">
                            <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700">
                                Month
                            </button>
                            <button className="text-sm border px-3 py-1 rounded hover:bg-gray-100">
                                Week
                            </button>
                            <button className="text-sm border px-3 py-1 rounded hover:bg-gray-100">
                                Day
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100">
                                &gt;
                            </button>
                        </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 border-t border-l text-center text-xs">
                        {/* Week Header */}
                        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                            <div
                                key={day}
                                className="border-r border-b py-2 font-semibold text-gray-500"
                            >
                                {day}
                            </div>
                        ))}

                        {/* Row 1 */}
                        <div className="border-r border-b h-24 bg-gray-50" />
                        <div className="border-r border-b h-24" />
                        <div className="border-r border-b h-24" />
                        <div className="border-r border-b h-24" />
                        <div className="border-r border-b h-24" />
                        <div className="border-r border-b h-24" />
                        <div className="border-r border-b h-24" />

                        {/* Row 2: Starts from March 1 */}
                        {[...Array(7)].map((_, i) => {
                            const date = i + 1;
                            return (
                                <div
                                    key={date}
                                    className="border-r border-b h-24 relative text-left px-1 py-1"
                                >
                                    <div className="text-xs font-medium">{date}</div>
                                    {date === 2 && (
                                        <div className="text-[10px] bg-green-500 text-white px-1 py-0.5 mt-1 rounded">
                                            10:58p See John D
                                        </div>
                                    )}
                                    {date === 4 && (
                                        <div className="text-[10px] bg-yellow-400 text-white px-1 py-0.5 mt-1 rounded">
                                            6:51p Hey!
                                        </div>
                                    )}
                                    {date === 6 && (
                                        <div className="text-[10px] bg-blue-500 text-white px-1 py-0.5 mt-1 rounded">
                                            8:51p Buy a Theme
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* Row 3 to 6: Fill empty grid (March has 31 days) */}
                        {[...Array(31 - 7)].map((_, i) => {
                            const date = i + 8;
                            return (
                                <div
                                    key={date}
                                    className="border-r border-b h-24 relative text-left px-1 py-1"
                                >
                                    <div className="text-xs font-medium">{date}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
