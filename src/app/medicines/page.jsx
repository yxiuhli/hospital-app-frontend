"use client";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  addMedicine,
  deleteMedicineById,
  getMedicines,
  updateMedicine,
} from "@/lib/MedicineAPI";
import { Typography, Link, Button, Modal, Box, TextField } from "@mui/material";

const MedicinesPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updatingMedicine, setUpdatingMedicine] = useState({});

  const handleDelete = async (param) => {
    try {
      const deletedMedicine = await deleteMedicineById(param.id);
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
      const medicine = update
        ? await updateMedicine(inputs, BigInt(updatingMedicine.id)+1n)
        : await addMedicine(inputs);
      setReload(!reload);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      getMedicines().then((data) => setMedicines(data));
    } catch (err) {
      console.log(err);
    }
  }, [reload]);

  const columns = [
    { field: "name", headerName: "Tên thuốc", width: 150 },
    { field: "importDate", headerName: "Ngày nhập", width: 150 },
    { field: "number", headerName: "Số lượng", width: 150 },
    { field: "expiry", headerName: "Hạn sử dụng", width: 150 },
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
              setUpdatingMedicine(
                medicines.find((medicine) => BigInt(medicine.id)+1n === param.id)
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

  const rows = medicines.map((medicine) => ({
    id: BigInt(medicine.id)+1n,
    name: medicine.name,
    importDate: medicine.importDate,
    number: medicine.number,
    expiry: medicine.expiry,
    edit: "edit",
    delete: "delete",
  }));

  return (
    <div className="px-12 flex flex-col gap-8">
      <Typography className="mt-12 ml-2" variant="h5">
        Quản lý Thuốc
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
        Thêm thuốc
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white border-solid border-2 shadow-2xl p-4">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {update ? "Cập nhật thông tin thuốc" : "Thêm thuốc mới"}
          </Typography>
          <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Tên thuốc"
              variant="standard"
              defaultValue={update ? updatingMedicine.name : ""}
            />
            <TextField
              type="date"
              name="importDate"
              label="Ngày nhập"
              variant="standard"
              defaultValue={update ? updatingMedicine.importDate : "2024-04-04"}
            />
            <TextField
              name="shipment"
              label="Lô sản xuất"
              variant="standard"
              defaultValue={update ? updatingMedicine.shipment : ""}
            ></TextField>
            <TextField
              type="date"
              name="expiry"
              label="Hạn sử dụng"
              variant="standard"
              defaultValue={update ? updatingMedicine.expiry : "2029-01-01"}
            />
            <TextField
              name="number"
              label="Số lượng"
              variant="standard"
              defaultValue={update ? updatingMedicine.number : ""}
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

export default MedicinesPage;
