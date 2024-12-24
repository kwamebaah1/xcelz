import React, { useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import ScheduleForm from "../components/ScheduleForm";
import MeetingCard from "../components/MeetingCard";

const Dashboard = () => {
  const [meetings, setMeetings] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSchedule = (meeting) => {
    setMeetings([...meetings, { ...meeting, id: Date.now() }]);
    setModalOpen(false);
  };

  const handleEdit = (id, updatedMeeting) => {
    setMeetings(meetings.map((m) => (m.id === id ? updatedMeeting : m)));
  };

  const handleDelete = (id) => {
    setMeetings(meetings.filter((m) => m.id !== id));
  };

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Scheduled Meetings</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={handleModalOpen}
        >
          Schedule a Meeting
        </Button>
      </div>

      {/* Modal for ScheduleForm */}
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: 400,
            borderRadius: 2,
          }}
        >
          <h2 className="text-xl font-bold mb-4">Schedule a Meeting</h2>
          <ScheduleForm onSubmit={handleSchedule} />
        </Box>
      </Modal>

      <div className="mt-8">
        {meetings.length > 0 ? (
          meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
              onEdit={(updatedMeeting) => handleEdit(meeting.id, updatedMeeting)}
              onDelete={() => handleDelete(meeting.id)}
            />
          ))
        ) : (
          <p className="text-gray-600">No scheduled meetings.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;