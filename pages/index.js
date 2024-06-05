import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";

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
          <Hero/>
        <footer className="w-screen bg-black">
          <Footer/>
        </footer>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="bg-white min-h-screen flex flex-col ">
      <header>
        <Navbar />
      </header>
      <div className="flex flex-col flex-grow text-black">
        <p className="pl-2 pt-2">Selamat Datang {user.name}</p>
        {/* <button onClick={handleSignOut}>Sign Out</button> */}
      </div>
      <footer className="w-screen bg-black">
          <Footer/>
      </footer>
      
    </div>
  );
}
