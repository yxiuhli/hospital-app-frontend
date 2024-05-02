"use server";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getDoctors } from "@/lib/data";
import { Typography } from "@mui/material";
import { renderLink, renderButton } from "@/components/render/RenderLink";

const DoctorsPage = async () => {
  const doctors = await getDoctors();

  const columns = [
    { field: "name", headerName: "Họ và tên", width: 150, renderCell: renderLink },
    { field: "dob", headerName: "Ngày sinh", width: 150 },
    { field: "gender", headerName: "Giới tính", width: 100 },
    { field: "start", headerName: "Ngày bắt đầu làm", width: 200 },
    { field: "degree", headerName: "Bằng cấp", width: 335 },
    {
      field: "edit",
      headerName: "Chỉnh sửa",
      width: 120,
      sortable: false,
      renderCell: renderButton,
    },
    {
      field: "delete",
      headerName: "Xóa",
      width: 120,
      sortable: false,
      renderCell: renderButton,
    },
  ];

  const rows = doctors.map((doctor) => ({
    id: doctor._id,
    name: doctor.name,
    dob: doctor.dob.split("T")[0].split("-").reverse().join("-"),
    gender: doctor.gender,
    start: doctor.startedWork.split("T")[0].split("-").reverse().join("-"),
    degree: doctor.degree,
    edit: "edit",
    delete: "delete",
  }));

  return (
    <div className="">
      <Typography className="ml-14 my-4" variant="h5">
        Quản lý Bác sĩ
      </Typography>
      <DataGrid 
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        className="h-[450px] mx-12 my-0 shadow-lg bg-white"
      />
    </div>
  );
};

export default DoctorsPage;
