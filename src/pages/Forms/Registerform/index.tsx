"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      setError("Fjalëkalimet nuk përputhen.");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
          isAdmin: user.isAdmin,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Gabim gjatë regjistrimit.");
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
      setError("Nuk u lidh dot me serverin.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-56px)] bg-amber-100">
      <form
        className="bg-amber-200 p-8 rounded-2xl shadow-md w-full max-w-md space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-center text-amber-900">
          Regjistrohu në llogari
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded text-sm">{error}</div>
        )}

        <div className="flex flex-col space-y-2">
          <label className="text-amber-900 font-semibold" htmlFor="name">
            Emri i plotë
          </label>
          <input
            id="name"
            type="text"
            required
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="p-3 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-amber-900 font-semibold" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="p-3 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-amber-900 font-semibold" htmlFor="password">
            Fjalëkalimi
          </label>
          <input
            id="password"
            type="password"
            required
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="p-3 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-amber-900 font-semibold" htmlFor="confirmPassword">
            Konfirmo fjalëkalimin
          </label>
          <input
            id="confirmPassword"
            type="password"
            required
            value={user.confirmPassword}
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
            className="p-3 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isAdmin"
            checked={user.isAdmin}
            onChange={(e) => setUser({ ...user, isAdmin: e.target.checked })}
            className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500"
          />
          <label htmlFor="isAdmin" className="text-amber-900 font-medium">
            Regjistrohu si admin
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-amber-900 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
        >
          Regjistrohu
        </button>

        <p className="text-center text-sm text-amber-800">
          Ke një llogari?{" "}
          <Link href="/login" className="text-amber-700 underline font-medium">
            Kyçu këtu
          </Link>
        </p>
      </form>
    </div>
  );
}
