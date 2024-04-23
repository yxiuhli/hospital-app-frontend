import React from "react";
import { getNurseById } from "@/lib/data";
import { Button } from "@mui/material";

const SingleNursePage = async ({ params }) => {
  const { single_nurse } = params;
  const nurse = await getNurseById(single_nurse);
  console.log(nurse);
  return (
    <div>
      SingleNursePage
      <Button>Thông tin cá nhân</Button>
      <Button>Lịch làm việc</Button>
    </div>
  );
};

export default SingleNursePage;
