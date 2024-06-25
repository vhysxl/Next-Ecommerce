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
      <div className="z-100 overflow-hidden">
        <Navbar />
        <Hero />
        <Footer />
      </div>
    );
  }

  return (
    <div className="z-100 overflow-hidden">
      <Navbar/>
        <Hero />
      <Footer/>
    </div>
      
      
  );
}
