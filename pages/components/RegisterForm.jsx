'use client';

import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function RegisterForm(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
          setError("Semua input harus diisi.");
          return;
        }
      
        try {
          const res = await fetch('/api/register', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
          });
      
          if (res.ok) {
            const form = e.target;
            form.reset();
                setSuccess("Registrasi Sukses"); // Set success state to true
                setTimeout(() => {
                setSuccess(false); // Hide success message after 3 seconds
                    router.push("/");
                }, 3000); // Adjust the delay as needed
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
        <div className="grid place-items-baseline justify-items-center pt-20 min-h-screen bg-gray-100 p-5 sm:pb-19">
          <div className="grid gap-5 max-w-md w-4/5">
            <label className="text-2xl sm:text-3xl md:text-4xl pb-3 text-black text-center">Register</label>
            <form onSubmit={handleSubmit} className="grid gap-7">
              <input 
                onChange={e => setName(e.target.value)} 
                className="text-black py-2 pl-2 pr-5 sm:pr-10 md:pr-40 outline outline-gray-400 focus-within:outline-gray-700 focus-within:outline-4"
                type="text" 
                placeholder="Nama Lengkap"
              />
              <input
                onChange={e => setEmail(e.target.value)} 
                className="text-black py-2 pl-2 pr-5 sm:pr-10 md:pr-40 outline outline-gray-400 focus-within:outline-gray-700 focus-within:outline-4"
                type="text" 
                placeholder="email"
              />
              <input
                onChange={e => setPassword(e.target.value)} 
                className="text-black py-2 pl-2 pr-5 sm:pr-10 md:pr-40 outline outline-gray-400 focus-within:outline-gray-700 focus-within:outline-4" 
                type="password" 
                placeholder="password"
              />
              
              {success && (
                <div className="p-2 bg-green-500 w-fit rounded-sm mx-auto">{success}</div>
              )}
    
              {error && (
                <div className="p-2 bg-red-600 w-fit rounded-sm mx-auto">{error}</div>
              )}
              
              <button 
                type="submit" 
                className="w-full sm:w-fit mx-auto text-white bg-black px-5 py-3 sm:px-10 sm:py-4 rounded-sm text-md hover:underline hover:outline hover:outline-gray-500">
                Register
              </button>
              <Link className="mx-auto underline text-black" href='./Login'>Login</Link>
            </form>
          </div>
        </div>
      );
    
}