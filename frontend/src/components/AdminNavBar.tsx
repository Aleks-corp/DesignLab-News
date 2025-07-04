"use client";

import { current } from "@/lib/api";
import { useAdmin } from "context/AdminContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminNavbar() {
  const { isAdmin, setIsAdmin } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) return;
    const checkAdmin = async () => {
      try {
        await current();
        setIsAdmin(true);
      } catch {
        localStorage.removeItem("admin_token");
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, [setIsAdmin]);

  const logout = () => {
    localStorage.removeItem("admin_token");
    setIsAdmin(false);
    router.push("/");
  };
  if (!isAdmin) return null;

  return (
    <div className="w-full p-4 bg-gray-100 flex justify-between items-center mt-[-80px]">
      <div className="flex gap-4 flex-wrap">
        <p className="text-sm">
          Ви увійшли як <strong>Адмін</strong>
        </p>
        <div className="flex gap-4">
          <Link href={"/"} className="text-muted hover:text-hover transition">
            Головна
          </Link>
          <Link
            href={"/dl-admin/articles"}
            className="text-muted hover:text-hover transition"
          >
            Редагування
          </Link>
        </div>
      </div>
      <button
        onClick={logout}
        className="text-red-600 hover:text-red-500 transition underline"
      >
        Вийти
      </button>
    </div>
  );
}
