"use client";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Schedule() {
  const [events, setEvents] = React.useState([
    { title: "event 1", date: "2024-04-28" },
    { title: "event 2", date: "2024-04-29" },
  ]);
  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };

  return (
    <div className="w-full">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        className="h-[500px]"
      />
    </div>
  );
}
