import React from "react";
import { getSupporterById } from "@/lib/data";
import { Button } from "@mui/material";

const SingleSupporterPage = async ({ params }) => {
  const { single_supporter } = params;
  const supporter = await getSupporterById(single_supporter);
  console.log(supporter);
  return (
    <div>
      SingleSupporterPage
      <Button>Thông tin cá nhân</Button>
      <Button>Lịch làm việc</Button>
    </div>
  );
};

export default SingleSupporterPage;
