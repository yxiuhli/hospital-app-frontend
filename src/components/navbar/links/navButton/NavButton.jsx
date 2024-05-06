import Link from "next/link";
import {Button } from "@mui/material"
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export const LoginNavButton = () => {
  return (
    <Link href="/login">
      <Button
        variant="outlined"
        color="black"
        className="p-2 min-w-24 rounded-xl"
      >
        Login
      </Button>
    </Link>
  );
};

export const LogoutNavButton = () => {

  const { setIsLogin } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      setIslogin(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Link href="/">
      <Button
        variant="outlined"
        color="black"
        className="p-2 min-w-24 rounded-xl"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Link>
  );
};
