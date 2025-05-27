
import { useState } from "react";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering with", { name, email, password });
    
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 border rounded-2xl shadow space-y-4">
      <h2 className="text-2xl font-bold">Register</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md"
      />

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
      >
        Register
      </button>
    </form>
  );
}
