import React from "react";
import { getDoctorById } from "@/lib/data";
import { Button } from "@mui/material";

const SingleDoctorPage = async ({ params }) => {
  const { single_doctor } = params;
  const doctor = await getDoctorById(single_doctor);
  console.log(doctor);
  return (
    <div>
      SingleDoctorPage
    </div>
  );
};

export default SingleDoctorPage;
