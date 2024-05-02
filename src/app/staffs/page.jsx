"use client";
import React from "react";
import { MenuItem, MenuList, Typography, Paper } from "@mui/material";
import Link from "next/link";

const StaffsPage = async () => {
  return (
    <div className="px-12">
      <Typography className="ml-14 my-4" variant="h5">
        Quản lý Nhân viên
      </Typography>
      <Paper className="w-1/2">
        <MenuList dense>
          <MenuItem>
            <Link href="/staffs/doctors" className="w-full">Quản lý bác sĩ</Link>
          </MenuItem>
          <MenuItem>
            <Link href="staffs/nurses" className="w-full">Quản lý y tá</Link>
          </MenuItem>
          <MenuItem>
            <Link href="staffs/supporters" className="w-full">Quản lý nhân viên hỗ trợ</Link>
          </MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
};

export default StaffsPage;
