"use client";
import { Typography } from "@mui/material";

const Home = () => {
  return (
    <div className="flex flex-col justify-start">
      <div className="w-full relative h-[450px]">
        <img
          className="absolute top-0 left-0 z-0 static object-cover h-full w-full"
          src="/hometitle.jpg"
          alt="nature image"
        />
        <Typography variant="h2" className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white font-[Georgia]">
          Welcome to Hospital management app
        </Typography>
      </div>
    </div>
  )
}

export default Home;
