import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Navbar from "./components/Navbar";

export default function Home() {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <header>
          <Navbar />
        </header>
        <div className="flex flex-col items-center justify-center flex-grow font-bold text-black text-4xl">
          You need to login
        </div>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header>
        <Navbar />
      </header>
      <div className="flex flex-col flex-grow text-black">
        <p className="pl-2 pt-2">Selamat Datang {user.name}</p>
        {/* <button onClick={handleSignOut}>Sign Out</button> */}
      </div>
    </div>
  );
}
