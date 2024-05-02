"use client";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getNurses } from "@/lib/data";
import { Typography, Button, Link } from "@mui/material";

const NursesPage = async () => {

  const [nurses,setNurses] =  useState([])

  useEffect(() => {
    getNurses().then((data) => setNurses(data))
  }, [])

  const columns = [
    {
      field: "name",
      headerName: "Họ và tên",
      width: 150,
      renderCell: (param) => {
        return <Link href={'nurses/'+param.id}>{param.value}</Link>;
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

  const rows = nurses.map((nurse) => ({
    id: nurse._id,
    name: nurse.name,
    dob: nurse.dob.split("T")[0],
    gender: nurse.gender,
    start: nurse.startedWork.split("T")[0],
    degree: nurse.degree,
    edit: "edit",
    delete: "delete",
  }));

  return (
    <div className="">
      <Typography className="mt-12 ml-14 mb-8" variant="h5">
        Quản lý Nhân viên
      </Typography>
      <div className="h-[300px] w-full px-12">
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
};

export default NursesPage;
