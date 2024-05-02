"use client";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { addMedicine, deleteMedicinesById, getMedicines, updateMedicine } from "@/lib/data";
import { Typography, Button, Modal, Box, TextField } from "@mui/material";

const MedicinesPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updatingMedicine, setUpdatingMedicine] = useState({});

  const handleDelete = async (param) => {
    try {
      const deletedMedicine = await deleteMedicinesById(param.id);
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
      const medicine = update ? await updateMedicine(inputs, updatingMedicine._id) : await addMedicine(inputs)
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
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Tên thuốc', width: 150 },
    { field: 'description', headerName: 'Mô tả', width: 450 },
    { field: 'quantity', headerName: 'Số lượng', width: 150 },
    { field: 'price', headerName: 'Đơn giá', width: 150 },
    {
      field: "edit",
      headerName: "Chỉnh sửa",
      width: 120,
      sortable: false,
      renderCell: (param) => {
        return (
          <Button
            onClick={() => {
              setUpdate(true);
              setOpen(true);
              setUpdatingMedicine(
                medicines.find((medicine) => medicine._id === param.id)
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
      sortable: false,
      renderCell: (param) => {
        return <Button onClick={() => handleDelete(param)}>Delete</Button>;
      },
    },
  ];
  
  const rows = medicines.map((medicine) => ({
    id: medicine.id,
    name: medicine.name,
    description: medicine.description,
    quantity: medicine.quantity,
    price: medicine.price
  }));

  return (
    <div className="px-12 flex flex-col gap-8">
      <Typography className="mt-12 ml-2" variant="h5">
        Quản lý thiết bị
      </Typography>
      <div className="h-[340px] w-full">
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
              name="description"
              label="Mô tả"
              variant="standard"
              defaultValue={update ? updatingMedicine.description : ""}
            />
            <TextField
              type="number"
              name="quantity"
              label="Số lượng"
              variant="standard"
              defaultValue={update ? updatingMedicine.quantity : ""}
            />
            <TextField
              type="number"
              name="price"
              label="Giá"
              variant="standard"
              defaultValue={update ? updatingMedicine.price : ""}
            />
            <Button variant="contained" type="submit" className="max-w-96 mt-4">
              Lưu
            </Button>
            <Button onClick={() => setOpen(false)}>Hủy bỏ</Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default MedicinesPage