"use client";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getPatients } from "@/lib/data";
import { Typography, Link, Button, Modal, Box } from "@mui/material";

const PatientsPage = async () => {
  const [patients, setPatients] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getPatients().then((data) => setPatients(data));
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Họ và tên",
      width: 150,
      renderCell: (params) => {
        return <Link href={"patients/" + params.id}>{params.value}</Link>;
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

  const rows = patients.map((patient) => ({
    id: patient._id,
    name: patient.name,
    dob: patient.dob.split("T")[0],
    gender: patient.gender,
    start: patient.startedWork.split("T")[0],
    degree: patient.degree,
    edit: "edit",
    delete: "delete",
  }));

  return (
    <div className="px-12 flex flex-col gap-8">
      <Typography className="mt-12 ml-2" variant="h5">
        Quản lý Bệnh nhân
      </Typography>
      <div className="h-[300px] w-full">
        <DataGrid rows={rows} columns={columns} />
      </div>
      <Button onClick={() => setOpen(true)} variant="contained" className="max-w-96 self-end">
        Thêm bệnh nhân
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white border-solid border-2 shadow-2xl p-4">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Thêm bệnh nhân mới
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default PatientsPage;
