'use client';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
const page = () => {
    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Class Schedule</h2>

            <FullCalendar                                
                plugins={[resourceTimelinePlugin, timeGridPlugin, interactionPlugin]}
                initialView="resourceTimelineDay"
                resources={[
                    { id: 'none', title: 'No Instructor' },
                    { id: 'darlene', title: 'Darlene Robertson' },
                    { id: 'marvin', title: 'Marvin McKinney' },
                    { id: 'albert', title: 'Albert Flores' },
                ]}
                events={[
                    {
                        id: '1',
                        resourceId: 'none',
                        title: 'Private Lesson',
                        start: '2022-03-21T09:00:00',
                        end: '2022-03-21T09:30:00',
                    },
                    {
                        id: '2',
                        resourceId: 'darlene',
                        title: 'Adult LTF',
                        start: '2022-03-21T09:00:00',
                        end: '2022-03-21T09:30:00',
                    },
                    {
                        id: '3',
                        resourceId: 'marvin',
                        title: 'Private Lesson',
                        start: '2022-03-21T09:00:00',
                        end: '2022-03-21T09:30:00',
                    },
                    {
                        id: '4',
                        resourceId: 'marvin',
                        title: 'Kids Learn-to-Fence',
                        start: '2022-03-21T10:00:00',
                        end: '2022-03-21T10:30:00',
                    },
                    {
                        id: '5',
                        resourceId: 'albert',
                        title: 'Youth Learn-to-Fence',
                        start: '2022-03-21T10:00:00',
                        end: '2022-03-21T10:30:00',
                    },
                ]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'resourceTimelineDay,resourceTimelineWeek',
                }}
                slotMinTime="09:00:00"
                slotMaxTime="13:00:00"
                height="400px"
                nowIndicator={true}
                editable={true}
                selectable={true}
                eventOverlap={false}
            />
        </div>
    );
};

export default page;
