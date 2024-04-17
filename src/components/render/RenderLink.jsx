"use client";

import { Button } from "@mui/material";
import Link from "next/link";

export async function renderButton(params) {
  return (
    <Button variant="contained" color={params.value==="edit"?"success":"error"}></Button>
  );
}

export async function renderLink(params) {
  return (
    <Link href={"doctors/" + params.id}>{params.value}</Link>
  );
}