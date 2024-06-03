import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  if (!session){
    return (
        <header>
            <div className="flex flex-wrap place-items-center">
          <section className="relative mx-auto">
            <nav className="flex justify-between bg-black text-white w-screen">
              <div className="px-5 xl:px-12 py-6 flex w-full items-center">
                <div className='flex items-center gap-2'>
                <Link href="/">
                    <Image
                        src="/logo.svg"
                        alt="Vercel Logo"
                        className="dark:invert"
                        width={50}
                        height={0}
                        priority
                    />
                </Link>
                <Link className="hidden xl:block lg:block text-2xl font-bold" href="/">
                        Usaha Baru
                    </Link> 
                </div>
                
                
                
                
                   
                {/* <a className="text-3xl font-bold font-heading" href="#">
                    Usaha Baru
                  </a> */}
                <ul className="hidden md:flex pr-20 mx-auto text-center font-semibold font-heading space-x-12">
                  <li><Link className="hover:text-gray-200" href="/">Home</Link></li>
                  <li><a className="hover:text-gray-200" href="#">Category</a></li>
                  <li><Link className="hover:text-gray-200" href="/Product">Collections</Link></li>
                  <li><a className="hover:text-gray-200 " href="#">Contact Us</a></li>
                </ul>
                <div className="hidden xl:flex lg:flex md:flex items-center space-x-5">
                  <a className="flex items-center hover:text-gray-200" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {/* <span className="flex absolute -mt-5 ml-4">
                      <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                    </span> */}
                  </a>
                  <a className="flex items-center hover:text-gray-200" href="/Login">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="xl:hidden lg:hidden md:hidden flex items-center">
                <a className="mr-6 hover:text-gray-200" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {/* <span className="flex absolute -mt-5 ml-4">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                  </span> */}
                </a>
                <a className="navbar-burger self-center mr-6" href="#" onClick={toggleMenu}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </a>
                <a className="flex items-center mr-6 hover:text-gray-200" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </a>
              </div>
            </nav>
            {isOpen && (
              <div className="xl:hidden  flex flex-col items-center bg-gray-900 text-white w-full py-4">
                <Link className="hover:text-gray-200 py-2" href="/">Home</Link>
                <a className="hover:text-gray-200 py-2" href="#">Category</a>
                <Link className="hover:text-gray-200 py-2" href="/Product">Collections</Link>
                <a className="hover:text-gray-200 py-2" href="#">Contact Us</a>
              </div>
            )}
          </section>
        </div>
        </header>
        
      );
  }
  const { user } = session;

  return (
    <header>
        <div className="flex flex-wrap place-items-center">
      <section className="relative mx-auto">
        <nav className="flex justify-between bg-black text-white w-screen">
          <div className="px-5 xl:px-12 py-6 flex w-full items-center">
            <div className='flex items-center gap-2'>
            <Link href="/">
                <Image
                    src="/logo.svg"
                    alt="Vercel Logo"
                    className="dark:invert"
                    width={50}
                    height={0}
                    priority
                />
            </Link>
               
                    <Link className="hidden xl:block lg:block text-2xl font-bold" href="/">
                        Usaha Baru
                    </Link> 
            </div>
               
            {/* <a className="text-3xl font-bold font-heading" href="#">
                Usaha Baru
              </a> */}
            <ul className="hidden md:flex pr-20 mx-auto text-center font-semibold font-heading space-x-12">
              <li><Link className="hover:text-gray-200" href="/">Home</Link></li>
              <li><a className="hover:text-gray-200" href="#">Category</a></li>
              <li><Link className="hover:text-gray-200" href="/Product">Collections</Link></li>
              <li><a className="hover:text-gray-200 " href="#">Contact Us</a></li>
            </ul>
            <div className="hidden xl:flex lg:flex md:flex items-center space-x-5">
              <a className="flex items-center hover:text-gray-200" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {/* <span className="flex absolute -mt-5 ml-4">
                  <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                </span> */}
              </a>
              <a className="flex items-center hover:text-gray-200" href="/UserInfo">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="xl:hidden lg:hidden md:hidden flex items-center">
            <a className="mr-6 hover:text-gray-200" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {/* <span className="flex absolute -mt-5 ml-4">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
              </span> */}
            </a>
            <a className="navbar-burger self-center mr-6" href="#" onClick={toggleMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </a>
            <a className="flex items-center mr-6 hover:text-gray-200" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </a>
          </div>
        </nav>
        {isOpen && (
          <div className="xl:hidden  flex flex-col items-center bg-gray-900 text-white w-full py-4">
            <Link className="hover:text-gray-200 py-2" href="/">Home</Link>
            <a className="hover:text-gray-200 py-2" href="#">Category</a>
            <Link className="hover:text-gray-200 py-2" href="/Product">Collections</Link>
            <a className="hover:text-gray-200 py-2" href="#">Contact Us</a>
          </div>
        )}
      </section>
    </div>
    </header>
    
  );


  
}
