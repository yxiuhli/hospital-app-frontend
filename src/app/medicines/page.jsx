import React from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { getMedicines } from "@/lib/data";
import { Typography } from "@mui/material";


const medicines = await getMedicines();

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'name', headerName: 'Tên thuốc', width: 150 },
  { field: 'description', headerName: 'Mô tả', width: 450 },
  { field: 'quantity', headerName: 'Số lượng', width: 150 },
  { field: 'price', headerName: 'Đơn giá', width: 150 },
];

const rows = medicines.map((medicine) => ({
  id: medicine.id,
  name: medicine.name,
  description: medicine.description,
  quantity: medicine.quantity,
  price: medicine.price
}));

const MedicinesPage = () => {
  return (
    <div className="">
      <Typography className="mt-12 ml-14 mb-8" variant="h5">
        Quản lý Thuốc
      </Typography>
      <div className="h-[300px] w-full px-12">
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  )
}

export default MedicinesPage