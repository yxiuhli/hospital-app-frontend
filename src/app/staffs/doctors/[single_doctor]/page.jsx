import React from 'react'
import { getDoctorById } from "@/lib/data";
import { Typography, ListItem, List, ListItemButton, ListItemText, Card } from "@mui/material";
import Schedule from '@/components/schedule/Schedule';

const SingleDoctorPage = async ({params}) => {
  const {single_doctor} = params;
  const doctor = await getDoctorById(single_doctor);
  console.log(doctor);
  return (
    <div className='w-full h-[calc(100vh-118px)] grid grid-cols-[400px_1fr] grid-rows-[100%]'>
      <div className='bg-[#5CA0D3] pt-3'>
        <Typography className='w-max font-bold text-3xl mb-7 mx-auto'>
          Thông tin bác sĩ
        </Typography>
        <div className="flex justify-between items-center p-2 mx-7 gap-4 shadow-lg rounded-3xl bg-[#D6E5FA]">
          <img src={"/" + (doctor.gender == 'Nam' ? 'doctor_male' : 'doctor_female') + ".png"} alt="" srcSet="" className='object-cover rounded-full w-[25%] aspect-square'/>
          <div className="w-full flex flex-col items-start justify-start gap-3">
            <Typography className="w-[60%] text-xl">
                <span className='font-bold w-max]'>Tên: </span>
                <span className='font-light w-max'>{doctor.name}</span>
            </Typography>
            <Typography className="w-[60%] text-xl"> 
                <span className='font-bold w-max]'>Vị trí:  </span>
                <span className='w-max capitalize font-light '>{doctor.job}</span>
            </Typography>
          </div>
        </div>
        <Card className='mx-7 mt-4 gap-5 text-xl shadow-lg rounded-3xl bg-[#D6E5FA]'>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText>Ngày sinh: {doctor.dob.split('-').reverse().join('-')}</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText>Giới tính: {doctor.gender}</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText>Ngày bắt đầu làm: {doctor.startedWork.split('-').reverse().join('-')}</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText>Bằng cấp: {doctor.degree}</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Card>
      </div>
      <div className='overflow-y-scroll relative'>
        <Typography className='font-bold text-3xl px-3 py-3 sticky top-0 z-10 bg-[#D6E5FA]'>Lịch làm việc</Typography>
        <div className="w-full shadow-lg bg-white p-3">
          <Schedule />
        </div>
      </div>
    </div>
  )
}

export default SingleDoctorPage;