import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("mahasiswa");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        {
          nama: nama,
          email: email,
          password: password,
          role: role,
        }
      );
      
      const data = await response.data;
      if (!response.status === 200) {
        throw new Error(data.message || "Registrasi gagal");
      }

      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.response ? err.response.data.message : "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center px-4">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-16 h-60 w-60 bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="absolute -inset-[1px] bg-gradient-to-br from-fuchsia-500 via-red-500 to-slate-900 rounded-3xl opacity-70 blur-sm" />
        <div className="relative w-full bg-slate-950/80 backdrop-blur-xl rounded-3xl border border-fuchsia-500/40 shadow-[0_0_40px_rgba(236,72,153,0.45)] p-7">
          <div className="mb-6">
            <p className="text-xs tracking-[0.2em] uppercase text-fuchsia-400/80">
              Silakan mendaftar terlebih dahulu
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-fuchsia-100">
              Register
            </h1>
            <p className="text-sm text-slate-400">
              Buat akun baru untuk masuk
            </p>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-300 bg-red-500/10 border border-red-500/40 rounded-xl px-4 py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wide text-slate-400 mb-1">
                Nama
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-fuchsia-400/70">
                  //
                </span>
                <input
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                  className="w-full rounded-2xl bg-slate-900/80 border border-slate-700/70 pl-8 pr-4 py-2.5 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-400 placeholder:text-slate-500"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wide text-slate-400 mb-1">
                Email
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-cyan-400/70">
                  @
                </span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                  className="w-full rounded-2xl bg-slate-900/80 border border-slate-700/70 pl-8 pr-4 py-2.5 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-400 placeholder:text-slate-500"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wide text-slate-400 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-2xl bg-slate-900/80 border border-slate-700/70 px-4 py-2.5 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-400 placeholder:text-slate-500"
                  placeholder="••••••••"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] tracking-widest text-fuchsia-400/70">
                  ENCRYPT
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wide text-slate-400 mb-1">
                Role
              </label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-2xl bg-slate-900/80 border border-slate-700/70 px-4 py-2.5 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-400"
                >
                  <option className="bg-slate-900" value="mahasiswa">
                    Mahasiswa
                  </option>
                  <option className="bg-slate-900" value="admin">
                    Admin
                  </option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 via-red-500 to-fuchsia-500 text-white py-2.5 text-sm font-semibold tracking-wide shadow-[0_0_25px_rgba(236,72,153,0.6)] hover:shadow-[0_0_35px_rgba(248,113,113,0.8)] transition active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Register"}
            </button>
          </form>

          <p className="text-xs text-slate-400 mt-5 text-center">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="text-fuchsia-300 hover:text-fuchsia-200 underline underline-offset-4"
            >
              Login di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
