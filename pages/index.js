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

  return (
    <div className="z-100">
      <Navbar/>
        <Hero />
      <Footer/>
    </div>
      
      
  );
}
