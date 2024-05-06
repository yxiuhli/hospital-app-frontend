"use client";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  addDevice,
  deleteDeviceById,
  getDevices,
  updateDevice,
} from "@/lib/DeviceAPI";
import { Typography, Link, Button, Modal, Box, TextField } from "@mui/material";

const DevicesPage = () => {
  const [devices, setDevices] = useState([]);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updatingDevice, setUpdatingDevice] = useState({});

  const handleDelete = async (param) => {
    try {
      const deletedDevice = await deleteDeviceById(param.id);
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
      const device = update
        ? await updateDevice(inputs, updatingDevice.id)
        : await addDevice(inputs);
      setReload(!reload);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      getDevices().then((data) => setDevices(data));
    } catch (err) {
      console.log(err);
    }
  }, [reload]);

  const columns = [
    {
      field: "name",
      headerName: "Tên thiết bị",
      width: 150,
      renderCell: (params) => {
        return <Link href={"devices/" + params.id}>{params.value}</Link>;
      },
    },
    { field: "status", headerName: "Tình trạng", width: 150 },
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
              setUpdatingDevice(
                devices.find((device) => device.id === param.id)
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

  const rows = devices.map((device) => ({
    id: device.id,
    name: device.name,
    status: device.status,
    edit: "edit",
    delete: "delete",
  }));

  return (
    <div className="px-12 flex flex-col gap-8">
      <Typography className="mt-12 ml-2" variant="h5">
        Quản lý Thiết bị
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
        Thêm thiết bị
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white border-solid border-2 shadow-2xl p-4">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {update ? "Cập nhật thông tin thiết bị" : "Thêm thiết bị mới"}
          </Typography>
          <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Tên thiết bị"
              variant="standard"
              defaultValue={update ? updatingDevice.name : ""}
            />
            <TextField
              name="status"
              label="Tình trạng"
              variant="standard"
              defaultValue={update ? updatingDevice.status : ""}
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

export default DevicesPage;
