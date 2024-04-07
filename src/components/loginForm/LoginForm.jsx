"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";
import { login } from "@/lib/auth";
import Link from "next/link";

const LoginForm = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { updateUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await login(email, password);
      const user = await res.data;
      updateUser(user);
      router.push("/");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col text-center gap-6">
      <h1>Đăng Nhập</h1>
      <input
        name="email"
        required
        minLength={3}
        maxLength={20}
        type="text"
        placeholder="Email"
        className="px-4 py-4 bg-gray-100 text-black border-none rounded-md"
      />
      <input
        className="px-4 py-4 bg-gray-100 text-black border-none rounded-md"
        name="password"
        type="password"
        required
        placeholder="Password"
      />
      <button
        className="px-4 py-4 cursor-pointer bg-blue-500 text-white font-bold border-none rounded-md"
        disabled={isLoading}
      >
        Đăng nhập
      </button>
      {error && <span>{error}</span>}
      <Link href="/register">
        Bạn chưa có tài khoản? <b>Đăng ký</b>
      </Link>
    </form>
  );
};

export default LoginForm;
