import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/lab";
import dayjs from "dayjs";

const ScheduleForm = ({ onSubmit }) => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [duration, setDuration] = useState("");
  const [participants, setParticipants] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
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
      onSubmit(meeting);
    }
  };

  return (
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
  );
};

export default ScheduleForm;