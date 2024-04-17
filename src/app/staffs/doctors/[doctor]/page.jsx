import React from 'react'
import { getDoctor } from "@/lib/data";

const DoctorPage = ({params}) => {
  const doctorId = params;
  const doctor = getDoctor(doctorId);
  console.log(doctor);
  return (
    <div>DoctorPage</div>
  )
}

export default DoctorPage