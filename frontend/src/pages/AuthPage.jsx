import { useState } from "react";

export default function AuthPage() {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    email: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = () => {
    if (!form.name || !form.dob || !form.email) {
      alert("Fill all fields");
      return;
    }

    // Save user locally
    localStorage.setItem("user", JSON.stringify(form));

    alert("🎉 Logged in successfully!");
    
    // redirect
    window.location.href = "/home";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-center">Simple Login</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />

        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Gmail"
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />

        <button
          onClick={handleLogin}
          className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Let’s Go 🚀
        </button>
      </div>
    </div>
  );
}
