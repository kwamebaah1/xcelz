import React, { useState, useEffect } from "react";
import { Button, Modal, Box } from "@mui/material";
import ScheduleForm from "../components/ScheduleForm";
import MeetingCard from "../components/MeetingCard";
import axios from "axios";

const Dashboard = () => {
  const [meetings, setMeetings] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState(null);

  useEffect(() => {
    // Fetch all scheduled meetings from the server
    axios.get("https://xcelz-backend.onrender.com/meetings")
      .then(response => {
        setMeetings(response.data);
      })
      .catch(error => {
        console.error("Error fetching meetings:", error);
      });
  }, []);

  const handleSchedule = (meeting) => {
    if (editingMeeting) {
      setMeetings(
        meetings.map((m) => (m.id === editingMeeting.id ? { ...m, ...meeting } : m))
      );
    } else {
      setMeetings([...meetings, { ...meeting, id: Date.now() }]);
    }
    setModalOpen(false);
    setEditingMeeting(null);
  };

  const handleEdit = (meeting) => {
    setEditingMeeting(meeting);
    setModalOpen(true);
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
          <ScheduleForm onSubmit={handleSchedule} unavailableSlots={meetings} meeting={editingMeeting}/>
        </Box>
      </Modal>

      <div className="mt-8">
        {meetings.length > 0 ? (
          meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
              onEdit={() => handleEdit(meeting)}
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