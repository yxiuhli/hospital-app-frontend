"use client";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { addPatient, deletePatientById, getPatients, updatePatient } from "@/lib/PatientAPI";
import { Typography, Link, Button, Modal, Box, TextField } from "@mui/material";

const PatientsPage = async () => {
  const [patients, setPatients] = useState([]);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updatingPatient, setUpdatingPatient] = useState({});

  const handleDelete = async (param) => {
    try {
      const deletedPatient = await deletePatientById(param.id);
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
      const patient = update ? await updatePatient(inputs, updatingPatient.id) : await addPatient(inputs)
      setReload(!reload);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      getPatients().then((data) => setPatients(data));
    } catch (err) {
      console.log(err);
    }
  }, [reload]);

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
    { field: "phone", headerName: "Điện thoại", width: 200 },
    { field: "address", headerName: "Địa chỉ", width: 450 },
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
              setUpdatingPatient(
                patients.find((patient) => patient.id === param.id)
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

  const rows = patients.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dob: patient.dob,
    gender: patient.gender,
    phone: patient.phone,
    address: patient.address,
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
      <Button
        onClick={() => {
          setUpdate(false);
          setOpen(true);
        }}
        variant="contained"
        className="max-w-96 self-end"
      >
        Thêm bệnh nhân
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white border-solid border-2 shadow-2xl p-4">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {update ? "Cập nhật thông tin bệnh nhân" : "Thêm bệnh nhân mới"}
          </Typography>
          <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Họ và tên"
              variant="standard"
              defaultValue={update ? updatingPatient.name : ""}
            />
            <TextField
              type="date"
              name="dob"
              label="Ngày sinh"
              variant="standard"
              defaultValue={update ? updatingPatient.dob : "1990-01-01"}
            />
            <TextField
              select
              name="gender"
              label="Giới tính"
              variant="standard"
              defaultValue={update ? updatingPatient.gender : "Nam"}
              SelectProps={{
                native: true,
              }}
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </TextField>
            <TextField
              name="phone"
              label="Số điện thoại"
              variant="standard"
              defaultValue={update ? updatingPatient.phone : ""}
            />
            <TextField
              name="address"
              label="Địa chỉ"
              variant="standard"
              defaultValue={update ? updatingPatient.address : ""}
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

export default PatientsPage;
