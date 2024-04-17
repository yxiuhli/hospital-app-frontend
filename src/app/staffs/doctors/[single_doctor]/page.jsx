import React from 'react'
import { getDoctor } from "@/lib/data";

const SingleDoctorPage = async ({params}) => {
  const {single_doctor} = params;
  const doctor = await getDoctor(single_doctor);
  console.log(doctor);
  return (
    <div>SingleDoctorPage</div>
  )
}

export default SingleDoctorPage