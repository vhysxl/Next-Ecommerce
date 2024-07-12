"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notelp, setNotelp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [domisili, setDomisili] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !notelp || !alamat || !domisili) {
      setError("Semua input harus diisi.");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          notelp,
          alamat,
          domisili,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        setSuccess("Registrasi Sukses Silakan Login");
      } else {
        const data = await res.json();
        if (data.message === "Email already in use.") {
          setError("Email sudah terdaftar. Silahkan gunakan email lain.");
        } else {
          setError("Gagal mendaftarkan pengguna. Silahkan coba lagi.");
        }
      }
    } catch (error) {
      setError("Terjadi kesalahan. Silahkan coba lagi nanti.");
    }
  };

  return (
    <div className="grid place-items-baseline justify-items-center pt-20 min-h-screen pb-20 bg-gray-100 p-5 sm:pb-19">
      <div className="grid gap-5 max-w-md w-4/5">
        <label className="text-2xl sm:text-3xl md:text-4xl pb-3 text-black text-center">
          Register
        </label>
        <form onSubmit={handleSubmit} className="grid gap-5">
          <input
            onChange={(e) => setName(e.target.value)}
            className="text-black py-2 pl-2 pr-5 sm:pr-10 md:pr-40 outline outline-gray-400 focus-within:outline-gray-700 focus-within:outline-4"
            type="text"
            placeholder="Nama Lengkap"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="text-black py-2 pl-2 pr-5 sm:pr-10 md:pr-40 outline outline-gray-400 focus-within:outline-gray-700 focus-within:outline-4"
            type="text"
            placeholder="email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="text-black py-2 pl-2 pr-5 sm:pr-10 md:pr-40 outline outline-gray-400 focus-within:outline-gray-700 focus-within:outline-4"
            type="password"
            placeholder="password"
          />
          <input
            onChange={(e) => setNotelp(e.target.value)}
            className="text-black py-2 pl-2 pr-5 sm:pr-10 md:pr-40 outline outline-gray-400 focus-within:outline-gray-700 focus-within:outline-4"
            type="text"
            placeholder="Nomor Telepon"
          />
          <input
            onChange={(e) => setAlamat(e.target.value)}
            className="text-black py-2 pl-2 pr-5 w-full outline outline-gray-400 focus-within:outline-gray-700 focus-within:outline-4 overflow-x-auto resize-x"
            type="text"
            placeholder="Alamat"
          />
          <div className="grid">
            <label className="text-black text-sm ">Format:</label>
            <label className="text-black text-sm ">
              Nama jalan & no rumah RT RW, kelurahan, kecamatan, kode pos
            </label>
          </div>

          <select
            value={domisili} // Set the selected value
            onChange={(e) => setDomisili(e.target.value)}
            className="text-black py-2 pl-2 pr-5 sm:pr-10 md:pr-40 outline outline-gray-400 focus-within:outline-gray-700 focus-within:outline-4"
          >
            <option value="" disabled>
              Domisili
            </option>
            <option value="Jakarta">Jakarta</option>
            <option value="Bogor">Bogor</option>
            <option value="Depok">Depok</option>
            <option value="Tangerang">Tangerang</option>
            <option value="Bekasi">Bekasi</option>
            <option value="Luar Jabodetabek">Luar Jabodetabek</option>
          </select>
          <label className="text-black text-sm">
            Apabila diluar Jabodetabek pilih
            <span className="text-green-600">Luar Jabodetabek</span>
          </label>
          {success && (
            <div className="p-2 bg-green-500 w-fit rounded-sm mx-auto">
              {success}
            </div>
          )}

          {error && (
            <div className="p-2 bg-red-600 w-fit rounded-sm mx-auto">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full sm:w-fit mx-auto text-white bg-black px-5 py-3 sm:px-10 sm:py-4 rounded-sm text-md hover:underline hover:outline hover:outline-gray-500"
          >
            Register
          </button>
          <Link className="mx-auto underline text-black" href="./Login">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}
