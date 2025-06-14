import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,   // prevent automatic redirect
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();

      if(session?.user?.isAdmin){
        router.push("/admin");
      }
      else{
        router.push("/profile");
      }
      
    }
  };

  return (
    <div
      className="flex justify-center items-center bg-amber-100"
      style={{ minHeight: "calc(100vh - 64px)", paddingTop: 0 }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-amber-200 p-8 rounded-2xl shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-amber-900">
          Kyçu në llogarinë tënde
        </h2>

        {error && (
          <p className="text-red-600 text-center font-semibold">{error}</p>
        )}

        <div className="flex flex-col space-y-2">
          <label className="text-amber-900 font-semibold" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-900 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
        >
          Kyçu
        </button>

        <p className="text-center text-sm text-amber-800">
          Nuk ke një llogari?{" "}
          <a href="/register" className="text-amber-700 underline font-medium">
            Regjistrohu këtu
          </a>
        </p>
      </form>
    </div>
  );
}
