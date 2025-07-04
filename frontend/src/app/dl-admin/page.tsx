"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";
import { useAdmin } from "../../context/AdminContext";

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
        <input
          type="password"
          placeholder="Пароль"
          className="border p-2 w-full mb-2 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 w-full rounded-lg"
        >
          Увійти
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
