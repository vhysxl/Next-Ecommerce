import Link from "next/link";
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (result.error) {
      setError(result.error);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="grid place-items-baseline pt-20 min-h-screen  bg-gray-100 p-5">
    <div className="grid gap-5 max-w-md w-full">
      <label className="text-2xl md:text-4xl pb-3 text-black text-center">Login</label>
      <form onSubmit={handleSubmit} className="grid gap-7">
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="text-black py-2 pl-2 pr-10 md:pr-40 outline outline-gray-400 focus-within:outline-gray-700 focus-within:outline-4"
          type="text"
          placeholder="email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="text-black py-2 pl-2 pr-10 md:pr-40 outline outline-gray-400 focus-within:outline-gray-700 focus-within:outline-4"
          type="password"
          placeholder="password"
        />
        {error && (
          <div className="p-2 bg-red-600 w-fit rounded-sm mx-auto">
            {error}
          </div>
        )}
        <button
          type="submit"
          className="w-full md:w-fit mx-auto text-white bg-black px-5 py-3 md:px-10 md:py-4 rounded-sm text-md hover:underline hover:outline hover:outline-gray-500"
        >
          Sign In
        </button>
        <Link className="mx-auto underline text-black" href='./Register'>
          Register
        </Link>
      </form>
    </div>
  </div>
  
  );
}