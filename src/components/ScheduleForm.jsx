import React, { useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";

const ScheduleForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: "",
    participants: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
      />
      <DatePicker
        value={formData.date}
        onChange={(date) => setFormData({ ...formData, date })}
      />
      <TimePicker
        value={formData.time}
        onChange={(time) => setFormData({ ...formData, time })}
      />
      <TextField
        name="duration"
        label="Duration (in mins)"
        value={formData.duration}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="participants"
        label="Participants"
        value={formData.participants}
        onChange={handleChange}
        select
        fullWidth
      >
        <MenuItem value="Client">Client</MenuItem>
        <MenuItem value="Freelancer">Freelancer</MenuItem>
      </TextField>
      <Button type="submit" variant="contained" color="primary">
        Schedule Meeting
      </Button>
    </form>
  );
};

export default ScheduleForm;