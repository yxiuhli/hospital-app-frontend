"use client";
import React from 'react'
import moment from "moment"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function Schedule() {
  const localizer = momentLocalizer(moment);

  return (
    <div className='w-full'>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  )
}