import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import dayjs from "dayjs";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ScheduleForm = ({ onSubmit }) => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [duration, setDuration] = useState("");
  const [participants, setParticipants] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (date && time && title && participants) {
      const meeting = {
        date: dayjs(date).format("YYYY-MM-DD"),
        time: dayjs(time).format("HH:mm"),
        duration,
        participants,
        title,
        description,
      };

      try {
        const response = await axios.post("http://localhost:5000/meetings", meeting);
        toast.success(`Meeting scheduled successfully with ${participants}!`);
        setTimeout(() => {
          onSubmit(response.data);
        }, 3000);
      } catch (error) {
        console.error("Error scheduling the meeting:", error);
        toast.error("Error scheduling the meeting. Please try again.");
      }
    } else {
      toast.warn("Please fill in all required fields!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Participants"
          variant="outlined"
          fullWidth
          margin="normal"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <DatePicker
          label="Date"
          value={date}
          onChange={(newDate) => setDate(newDate)}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
        <TimePicker
          label="Time"
          value={time}
          onChange={(newTime) => setTime(newTime)}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
        <TextField
          label="Duration (in hours)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Schedule Meeting
        </Button>
      </form>

      <ToastContainer />
    </>
  );
};

export default ScheduleForm;