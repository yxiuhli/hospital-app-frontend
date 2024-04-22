"use client";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getDoctors } from "@/lib/data";
import { Typography, Button, Link } from "@mui/material";

const DoctorsPage = async () => {
  const [doctors,setDoctors] =  useState([])

  useEffect(() => {
    getDoctors().then((data) => setDoctors(data))
  }, [])

  const columns = [
    {
      field: "name",
      headerName: "Họ và tên",
      width: 150,
      renderCell: (param) => {
        return <Link href={param.value}>{param.value}</Link>;
      },
    },
    { field: "dob", headerName: "Ngày sinh", width: 150 },
    { field: "gender", headerName: "Giới tính", width: 100 },
    { field: "start", headerName: "Ngày bắt đầu làm", width: 200 },
    { field: "degree", headerName: "Bằng cấp", width: 450 },
    {
      field: "edit",
      headerName: "Chỉnh sửa",
      width: 120,
      renderCell: () => {
        return <Button>Edit</Button>;
      },
    },
    {
      field: "delete",
      headerName: "Xóa",
      width: 120,
      renderCell: () => {
        return <Button>Delete</Button>;
      },
    },
  ];

  const rows = doctors.map((doctor) => ({
    id: doctor._id,
    name: doctor.name,
    dob: doctor.dob.split("T")[0],
    gender: doctor.gender,
    start: doctor.startedWork.split("T")[0],
    degree: doctor.degree,
    edit: "edit",
    delete: "delete",
  }));

  return (
    <div className="">
      <Typography className="mt-12 ml-14 mb-8" variant="h5">
        Quản lý Bác sĩ
      </Typography>
      <div className="h-[300px] w-full px-12">
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
};

export default DoctorsPage;
