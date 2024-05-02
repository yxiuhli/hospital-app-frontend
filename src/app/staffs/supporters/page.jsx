"use client";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { addSupporter, deleteSupporterById, getSupporters, updateSupporter } from "@/lib/SupporterAPI";
import { Typography, Link, Button, Modal, Box, TextField } from "@mui/material";

const SupportersPage = () => {
  const [supporters, setSupporters] = useState([]);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updatingSupporter, setUpdatingSupporter] = useState({});

  const handleDelete = async (param) => {
    try {
      const deletedSupporter = await deleteSupporterById(param.id);
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
      const supporter = update ? await updateSupporter(inputs, updatingSupporter.id) : await addSupporter(inputs)
      setReload(!reload);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      getSupporters().then((data) => setSupporters(data));
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
        return <Link href={"supporters/" + param.id}>{param.value}</Link>;
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
              setUpdatingSupporter(
                supporters.find((supporter) => supporter.id === param.id)
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

  const rows = supporters.map((supporter) => ({
    id: supporter.id,
    name: supporter.name,
    dob: supporter.dob,
    gender: supporter.gender,
    start: supporter.start,
    degree: supporter.degree,
    edit: "edit",
    delete: "delete",
  }));

  return (
    <div className="px-12 flex flex-col gap-8">
      <Typography className="mt-12 ml-2" variant="h5">
        Quản lý Nhân viên hỗ trợ
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
        Thêm nhân viên hỗ trợ
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white border-solid border-2 shadow-2xl p-4">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {update ? "Cập nhật thông tin nhân viên hỗ trợ " : "Thêm nhân viên hỗ trợ mới"}
          </Typography>
          <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Họ và tên"
              variant="standard"
              defaultValue={update ? updatingSupporter.name : ""}
            />
            <TextField
              type="date"
              name="dob"
              label="Ngày sinh"
              variant="standard"
              defaultValue={update ? updatingSupporter.dob : "1990-01-01"}
            />
            <TextField
              select
              name="gender"
              label="Giới tính"
              variant="standard"
              defaultValue={update ? updatingSupporter.gender : "Nam"}
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
              defaultValue={update ? updatingSupporter.start : "2021-01-01"}
            />
            <TextField
              name="degree"
              label="Bằng cấp"
              variant="standard"
              defaultValue={update ? updatingSupporter.degree : ""}
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

export default SupportersPage;
