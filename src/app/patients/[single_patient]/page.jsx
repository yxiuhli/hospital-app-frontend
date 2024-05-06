"use client";
import { useState, useEffect } from "react";
import { getPatientById } from "@/lib/PatientAPI";
import { DataGrid } from "@mui/x-data-grid";
import {
  addMedicalForm,
  deleteMedicalFormById,
  getMedicalForms,
  updateMedicalForm,
} from "@/lib/MedicalFormAPI";
import {
  Typography,
  Link,
  Button,
  Modal,
  Box,
  TextField,
  ListItem,
  List,
  ListItemButton,
  ListItemText,
  Card,
} from "@mui/material";

const SinglePatientPage = ({ params }) => {
  const { single_patient } = params;
  const [patient, setPatient] = useState({});
  const [medicalForms, setMedicalForms] = useState([]);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updatingMedicalForm, setUpdatingMedicalForm] = useState({});

  const handleDelete = async (param) => {
    try {
      const deletedMedicalForm = await deleteMedicalFormById(param.id);
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
      const medicalForm = update
        ? await updateMedicalForm(inputs, BigInt(updatingMedicalForm.id) + 1n)
        : await addMedicalForm(inputs);
      setReload(!reload);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      getMedicalForms().then((data) => setMedicalForms(data));
    } catch (err) {
      console.log(err);
    }
  }, [reload]);

  const columns = [
    {
      field: "time",
      headerName: "Thời gian khám",
      width: 150,
      renderCell: (param) => {
        return <Link href={"medicalForms/" + param.id}>{param.value}</Link>;
      },
    },
    { field: "status", headerName: "Trạng thái", width: 150 },
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
              setUpdatingMedicalForm(
                medicalForms.find(
                  (medicalForm) => BigInt(medicalForm.id) + 1n === param.id
                )
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

  const rows = medicalForms.map((medicalForm) => ({
    id: BigInt(medicalForm.id) + 1n,
    name: medicalForm.name,
    status: medicalForm.status,
    edit: "edit",
    delete: "delete",
  }));
  useEffect(() => {
    try {
      getPatientById(single_patient).then((data) => setPatient(data));
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="w-full h-[calc(100vh-118px)] grid grid-cols-[400px_1fr] grid-rows-[100%]">
      <div className="bg-[#5CA0D3] pt-3">
        <Typography className="w-max font-bold text-3xl mb-7 mx-auto">
          Thông tin bệnh nhân
        </Typography>
        <div className="flex justify-between items-center p-2 mx-7 gap-4 shadow-lg rounded-3xl bg-[#D6E5FA]">
          <img
            src="/user.png"
            alt=""
            srcSet=""
            className="object-cover rounded-full w-[25%] aspect-square"
          />
          <div className="w-full flex flex-col items-start justify-start gap-3">
            <Typography className="w-[60%] text-xl">
              <span className="font-bold w-max]">Tên: </span>
              <span className="font-light w-max">{patient.fullName}</span>
            </Typography>
          </div>
        </div>
        <Card className="mx-7 mt-4 gap-5 text-xl shadow-lg rounded-3xl bg-[#D6E5FA]">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText>Ngày sinh: {patient.dateOfBirth}</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText>Giới tính: {patient.gender}</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText>Địa chỉ: {patient.address}</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText>
                  Số điện thoại: {patient.phoneNumber}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Card>
      </div>
      <div className="overflow-y-scroll relative">
        <Typography className="font-bold text-3xl px-3 py-3 sticky top-0 z-10 bg-[#D6E5FA]">
          Lịch sử khám bệnh
        </Typography>
        <div className="w-full shadow-lg bg-white p-3">
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
            Thêm phiếu khám bệnh
          </Button>
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white border-solid border-2 shadow-2xl p-4">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {update ? "Cập nhật thông tin phiếu khám bệnh" : "Thêm phiếu khám bệnh mới"}
              </Typography>
              <form
                className="flex flex-col gap-4 mt-4"
                onSubmit={handleSubmit}
              >
                <TextField
                  name="time"
                  label="Thời gian khám"
                  variant="standard"
                  defaultValue={update ? updatingMedicalForm.name : ""}
                />
                <TextField
                  name="status"
                  label="Trạng thái"
                  variant="standard"
                  defaultValue={update ? updatingMedicalForm.status : ""}
                />
                
                <Button
                  variant="contained"
                  type="submit"
                  className="max-w-96 mt-4"
                >
                  Lưu
                </Button>
                <Button onClick={() => setOpen(false)}>Hủy bỏ</Button>
              </form>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SinglePatientPage;
