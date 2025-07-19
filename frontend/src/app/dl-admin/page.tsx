"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";
import { useAdmin } from "../../context/AdminContext";
import InputWithIcon from "@/components/InputWithIcon";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setIsAdmin } = useAdmin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ password });
      localStorage.setItem("admin_token", res.token);
      setIsAdmin(true);
      router.push("/dl-admin/articles");
    } catch (err) {
      console.log(" e:", err);
      setError("Невірний пароль");
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">Вхід адміністратора</h1>
      <form onSubmit={handleLogin}>
        <InputWithIcon
          inputClassName="mb-2"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={setPassword}
        />
        <button
          type="submit"
          className="btn-gradient text-white px-4 py-2.5 w-full transition cursor-pointer"
        >
          Увійти
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
