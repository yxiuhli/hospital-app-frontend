import apiRequest from "@/config/apiRequest";
import { NextResponse } from "next/server";

export const login = (email, password) => {
  if (email === "admin@example.com" && password === "123456") {
    return true;
  } else {
    return false;
  }
};
