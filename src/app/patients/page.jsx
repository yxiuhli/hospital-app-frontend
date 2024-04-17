import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getPatients } from "@/lib/data";
import { Typography } from "@mui/material";

const patients = await getPatients();

const columns = [
  { field: 'name', headerName: 'Họ và tên', width: 150 },
  { field: 'mail', headerName: 'Email', width: 150 },
];

const rows = patients.map((patient) => ({
  id: patient.id,
  name: patient.name,
  mail: patient.email,
}));

const PatientsPage = async () => {
  return (
    <div className="">
      <Typography className="mt-12 ml-14 mb-8" variant="h5">
        Quản lý Bệnh nhân
      </Typography>
      <div className="h-[300px] w-full px-12">
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
};

export default PatientsPage;
