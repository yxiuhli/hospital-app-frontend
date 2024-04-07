"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/lib/auth";

const RegisterForm = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const password2 = formData.get("password2");

    if (password !== password2) {
      setError("Mật khẩu nhập lại không đúng");
      setIsLoading(false);
      return;
    }

    try {
      const res = await register({
        username,
        email,
        password,
      });

      router.push("/login");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col text-center gap-6" onSubmit={handleSubmit}>
      <h1>Đăng Ký</h1>
      <input className="px-4 py-4 bg-gray-100 text-black border-none rounded-md" type="text" placeholder="username" name="username" />
      <input className="px-4 py-4 bg-gray-100 text-black border-none rounded-md" type="email" placeholder="email" name="email" />
      <input className="px-4 py-4 bg-gray-100 text-black border-none rounded-md" type="password" placeholder="password" name="password" />
      <input className="px-4 py-4 bg-gray-100 text-black border-none rounded-md" type="password" placeholder="password again" name="password2" />
      <button className="px-4 py-4 cursor-pointer bg-blue-500 text-white font-bold border-none rounded-md" disabled={isLoading}>Đăng ký</button>
      {error && <span>{error}</span>}
      <Link href="/login">
        Đã có tài khoản? <b>Đăng nhập</b>
      </Link>
    </form>
  );
};

export default RegisterForm;
