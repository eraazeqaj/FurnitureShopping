import React from "react";

export default function RegisterForm() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-56px)] bg-amber-100">
      <form className="bg-amber-200 p-8 rounded-2xl shadow-md w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-amber-900">
          Regjistrohu në llogari
        </h2>

        <div className="flex flex-col space-y-2">
          <label className="text-amber-900 font-semibold" htmlFor="name">
            Emri i plotë
          </label>
          <input
            id="name"
            type="text"
            required
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
            className="p-3 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-900 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
        >
          Regjistrohu
        </button>

        <p className="text-center text-sm text-amber-800">
          Ke një llogari?{" "}
          <a href="/login" className="text-amber-700 underline font-medium">
            Kyçu këtu
          </a>
        </p>
      </form>
    </div>
  );
}

