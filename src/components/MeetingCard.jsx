import React from "react";

const MeetingCard = ({ meeting, onEdit, onDelete }) => {
  return (
    <div className="p-4 border rounded shadow m-2">
      <h2 className="text-xl font-bold">{meeting.title}</h2>
      <p>Meeting scheduled with: {meeting.participants}</p>
      <p>{meeting.description}</p>
      <p>Date: {meeting.date}</p>
      <p>Time: {meeting.time}</p>
      <p>Duration: {meeting.duration} mins</p>
      <div className="flex gap-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded shadow" onClick={onEdit}>
          Edit
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded shadow" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default MeetingCard;