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

    localStorage.setItem("user", JSON.stringify(form));
    alert("🎉 Logged in!");
    window.location.href = "/home";
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78]">

      <div className="grid w-full max-w-6xl overflow-hidden border shadow-2xl md:grid-cols-2 rounded-2xl backdrop-blur-lg bg-white/20 border-white/30">

        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center p-12 text-white bg-gradient-to-r from-[#E63946] via-[#9D2FFF] to-[#1D3557]">
          <h1 className="mb-6 text-5xl font-extrabold">ResQNet</h1>
          <p className="italic opacity-90">
            In the midst of every crisis, lies great opportunity.
          </p>
          <p className="mt-6 text-sm opacity-80">— Albert Einstein</p>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-10 bg-white/70 backdrop-blur-xl">
          <div className="max-w-md mx-auto space-y-4">

            <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
              Create Account
            </h2>

            {/* NAME */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter your name"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter your email"
              />
            </div>

            {/* DOB */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={handleLogin}
              className="w-full py-3 mt-4 font-semibold text-white rounded-lg bg-gradient-to-r from-[#E63946] to-[#9D2FFF] hover:opacity-90"
            >
              Let’s Go 🚀
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
