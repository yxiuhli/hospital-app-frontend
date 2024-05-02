"use client";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getSupporters } from "@/lib/data";
import { Typography, Button, Link } from "@mui/material";

const SupportersPage = async () => {

  const [supporters,setSupporters] =  useState([])

  useEffect(() => {
    getSupporters().then((data) => setSupporters(data))
  }, [])

  const columns = [
    {
      field: "name",
      headerName: "Họ và tên",
      width: 150,
      renderCell: (param) => {
        return <Link href={'supporters/'+param.id}>{param.value}</Link>;
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

  const rows = supporters.map((supporter) => ({
    id: supporter._id,
    name: supporter.name,
    dob: supporter.dob.split("T")[0],
    gender: supporter.gender,
    start: supporter.startedWork.split("T")[0],
    degree: supporter.degree,
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

export default SupportersPage;
