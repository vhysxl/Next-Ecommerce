import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  

  if (!session) {
    return (
      <header className=" bg-black text-white">
        <div className="flex flex-wrap place-items-center">
          <section className="relative mx-auto">
            <nav className="flex justify-between w-screen px-5 xl:px-12 py-6 items-center">
              <div className="flex items-center gap-2">
                <Link href="/">
                  <Image
                    src="/logo.svg"
                    alt="Vercel Logo"
                    className="dark:invert"
                    width={50}
                    height={50}
                    priority
                  />
                </Link>
                <Link
                  className="hidden xl:block lg:block text-2xl font-bold"
                  href="/"
                >
                  Usaha Baru
                </Link>
              </div>
              <ul className="hidden md:flex pr-20 mx-auto text-center font-semibold font-heading space-x-12">
                <li>
                  <Link className="hover:text-gray-200" href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-gray-200" href="/Product">
                    Products
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-gray-200" href="/AboutUs">
                    About Us
                  </Link>
                </li>
              </ul>
              <div className="hidden xl:flex lg:flex md:flex items-center space-x-5">
                <Link
                  className="flex items-center hover:text-gray-200"
                  href="/cart"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </Link>
                <Link
                  className="flex items-center hover:text-gray-200"
                  href="/Login"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Link>
              </div>
              <div className="xl:hidden lg:hidden md:hidden flex items-center">
                <Link className="mr-6 hover:text-gray-200" href="/Cart">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </Link>
                <Link
                  className="navbar-burger self-center mr-6"
                  href="#"
                  onClick={toggleMenu}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hover:text-gray-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </Link>
                <Link
                  className="flex items-center mr-6 hover:text-gray-200"
                  href="/Login"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Link>
              </div>
            </nav>
            {isOpen && (
              <div className="xl:hidden flex flex-col items-center bg-gray-900 text-white w-full py-4">
                <Link className="hover:text-gray-200 py-2" href="/">
                  Home
                </Link>
                <Link className="hover:text-gray-200 py-2" href="/Product">
                  Products
                </Link>
                <Link className="hover:text-gray-200 py-2" href="/AboutUs">
                  About Us
                </Link>
              </div>
            )}
          </section>
        </div>
      </header>
    );
  }

  const { user } = session;

  return (
    <header className=" bg-black text-white">
      <div className="flex flex-wrap place-items-center">
        <section className="relative mx-auto">
          <nav className="flex justify-between w-screen px-5 xl:px-12 py-6 items-center">
            <div className="flex items-center gap-2">
              <Link href="/">
                <Image
                  src="/logo.svg"
                  alt="Vercel Logo"
                  className="dark:invert"
                  width={50}
                  height={50}
                  priority
                />
              </Link>
              <Link
                className="hidden xl:block lg:block text-2xl font-bold"
                href="/"
              >
                Usaha Baru
              </Link>
            </div>
            <ul className="hidden md:flex pr-20 mx-auto text-center font-semibold font-heading space-x-12 ml-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <li>
                <Link className="hover:text-gray-200" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-200" href="/Product">
                  Products
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-200" href="/AboutUs">
                  About Us
                </Link>
              </li>
            </ul>

            <div className="hidden xl:flex lg:flex md:flex items-center space-x-5">
              <p>Selamat Datang <span className="text-red-500 text-lg">{user.name}</span></p>
              <Link
                className="flex items-center hover:text-gray-200"
                href="/components/cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </Link>
              <Link
                className="flex items-center hover:text-gray-200"
                href="/UserInfo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Link>
            </div>
            <div className="xl:hidden lg:hidden md:hidden flex items-center">
              <Link className="mr-6 hover:text-gray-200" href="/Cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </Link>
              <Link
                className="navbar-burger self-center mr-6"
                href="#"
                onClick={toggleMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 hover:text-gray-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Link>
              <Link
                className="flex items-center mr-6 hover:text-gray-200"
                href="/UserInfo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Link>
            </div>
          </nav>
          {isOpen && (
            <div className="xl:hidden flex flex-col items-center bg-gray-900 text-white w-full py-4">
              <Link className="hover:text-gray-200 py-2" href="/">
                Home
              </Link>
              <Link className="hover:text-gray-200 py-2" href="/Product">
                Products
              </Link>
              <Link className="hover:text-gray-200 py-2" href="/AboutUs">
                About Us
              </Link>
            </div>
          )}
        </section>
      </div>
    </header>
  );
}
