import React, { useState } from "react";
import ScheduleForm from "../components/ScheduleForm";
import MeetingCard from "../components/MeetingCard";

const Dashboard = () => {
  const [meetings, setMeetings] = useState([]);

  const handleSchedule = (meeting) => {
    setMeetings([...meetings, { ...meeting, id: Date.now() }]);
  };

  const handleEdit = (id, updatedMeeting) => {
    setMeetings(meetings.map((m) => (m.id === id ? updatedMeeting : m)));
  };

  const handleDelete = (id) => {
    setMeetings(meetings.filter((m) => m.id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Schedule Meetings</h1>
      <ScheduleForm onSubmit={handleSchedule} />
      <div className="mt-8">
        {meetings.map((meeting) => (
          <MeetingCard
            key={meeting.id}
            meeting={meeting}
            onEdit={() => handleEdit(meeting.id)}
            onDelete={() => handleDelete(meeting.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;