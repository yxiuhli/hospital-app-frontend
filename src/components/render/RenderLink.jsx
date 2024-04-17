"use client";

import { Button } from "@mui/material";
import Link from "next/link";

export async function renderLink(params) {
  return (
    <Button variant="contained" color={params.value==="edit"?"success":"error"}>
      <Link href={params.value}>{params.value}</Link>
    </Button>
  );
}
