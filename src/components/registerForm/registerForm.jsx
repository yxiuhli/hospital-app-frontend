"use client";
import styles from "./registerForm.module.css";
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
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Đăng Ký</h1>
      <input type="text" placeholder="username" name="username" />
      <input type="email" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <input type="password" placeholder="password again" name="password2" />
      <button disabled={isLoading}>Đăng ký</button>
      {error && <span>{error}</span>}
      <Link href="/login">
        Đã có tài khoản? <b>Đăng nhập</b>
      </Link>
    </form>
  );
};

export default RegisterForm;
