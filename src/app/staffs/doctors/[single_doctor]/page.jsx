import React from 'react'
import { getDoctor } from "@/lib/data";
import { Typography } from "@mui/material";


const SingleDoctorPage = async ({params}) => {
  const {single_doctor} = params;
  const doctor = await getDoctor(single_doctor);
  const avatarWidth = "400px";
  return (
    <div className='w-full h-[calc(100vh-118px)] flex justify-center items-center relative gap-[30px]'>
      <div className='w-[calc((100%-800px)/2+200px-15px)] h-full absolute bg-[#D6E5FA] left-0'></div>
      <img src={"/" + doctor._id + ".jpg"} alt="" srcset="" className='object-cover rounded-full w-[400px] aspect-square z-10 ring-2 ring-[#1572A1]'/>
      <div className='w-[400px] aspect-square flex flex-col justify-between p-5'>
        <Typography className="font-semibold flex justify-between items-center w-full">
           <span className='w-max text-[#0002A1]'>Tên:</span>
           <span className='w-max'>{doctor.name}</span>
        </Typography>
        <Typography className="font-semibold flex justify-between items-center w-full">
          <span className='w-max text-[#0002A1]'>Ngày sinh:</span>
          <span className='w-max'>{doctor.dob.split("T")[0].split("-").reverse().join(" - ")}</span>
        </Typography>
        <Typography className="font-semibold flex justify-between items-center w-full">
          <span className='w-max text-[#0002A1]'>Giới tính:</span>
          <span className='w-max capitalize'>{doctor.gender}</span>
        </Typography>
        <Typography className="font-semibold flex justify-between items-center w-full">
          <span className='w-max text-[#0002A1]'>Ngày bắt đầu làm:</span>
          <span className='w-max'>{doctor.startedWork.split("T")[0].split("-").reverse().join(" - ")}</span>
        </Typography>
        <Typography className="font-semibold flex justify-between items-center w-full">
          <span className='w-max text-[#0002A1]'>Bằng cấp:</span>
          <span className='w-[70%] text-right'>{doctor.degree}</span>
        </Typography>
        <Typography className="font-semibold flex justify-between items-center w-full">
          <span className='w-max text-[#0002A1]'>Vị trí: </span>
          <span className='w-max capitalize'>{doctor.job}</span>
        </Typography>
      </div>
    </div>
  )
}

export default SingleDoctorPage