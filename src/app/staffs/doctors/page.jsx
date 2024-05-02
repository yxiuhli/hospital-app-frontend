"use client";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { addDoctor, deleteDoctorById, getDoctors, updateDoctor } from "@/lib/DoctorAPI";
import { Typography, Link, Button, Modal, Box, TextField } from "@mui/material";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updatingDoctor, setUpdatingDoctor] = useState({});

  const handleDelete = async (param) => {
    try {
      const deletedDoctor = await deleteDoctorById(param.id);
      setReload(!reload);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const inputs = Object.fromEntries(formData);
      const doctor = update ? await updateDoctor(inputs, updatingDoctor.id) : await addDoctor(inputs)
      setReload(!reload);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      getDoctors().then((data) => setDoctors(data));
    } catch (err) {
      console.log(err);
    }
  }, [reload]);

  const columns = [
    {
      field: "name",
      headerName: "Họ và tên",
      width: 150,
      renderCell: (param) => {
        return <Link href={"doctors/" + param.id}>{param.value}</Link>;
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
      renderCell: (param) => {
        return (
          <Button
            onClick={() => {
              setUpdate(true);
              setOpen(true);
              setUpdatingDoctor(
                doctors.find((doctor) => doctor.id === param.id)
              );
            }}
          >
            Edit
          </Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Xóa",
      width: 120,
      renderCell: (param) => {
        return <Button onClick={() => handleDelete(param)}>Delete</Button>;
      },
    },
  ];

  const rows = doctors.map((doctor) => ({
    id: doctor.id,
    name: doctor.name,
    dob: doctor.dob,
    gender: doctor.gender,
    start: doctor.start,
    degree: doctor.degree,
    edit: "edit",
    delete: "delete",
  }));

  return (
    <div className="px-12 flex flex-col gap-8">
      <Typography className="mt-12 ml-2" variant="h5">
        Quản lý Bác sĩ
      </Typography>
      <div className="h-[300px] w-full">
        <DataGrid rows={rows} columns={columns} />
      </div>
      <Button
        onClick={() => {
          setUpdate(false);
          setOpen(true);
        }}
        variant="contained"
        className="max-w-96 self-end"
      >
        Thêm bác sĩ
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white border-solid border-2 shadow-2xl p-4">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {update ? "Cập nhật thông tin bác sĩ" : "Thêm bác sĩ mới"}
          </Typography>
          <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Họ và tên"
              variant="standard"
              defaultValue={update ? updatingDoctor.name : ""}
            />
            <TextField
              type="date"
              name="dob"
              label="Ngày sinh"
              variant="standard"
              defaultValue={update ? updatingDoctor.dob : "1990-01-01"}
            />
            <TextField
              select
              name="gender"
              label="Giới tính"
              variant="standard"
              defaultValue={update ? updatingDoctor.gender : "Nam"}
              SelectProps={{
                native: true,
              }}
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </TextField>
            <TextField
              name="start"
              label="Ngày bắt đầu làm"
              variant="standard"
              type="date"
              defaultValue={update ? updatingDoctor.start : "2021-01-01"}
            />
            <TextField
              name="degree"
              label="Bằng cấp"
              variant="standard"
              defaultValue={update ? updatingDoctor.degree : ""}
            />
            <Button variant="contained" type="submit" className="max-w-96 mt-4">
              Lưu
            </Button>
            <Button onClick={() => setOpen(false)}>Hủy bỏ</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default DoctorsPage;
