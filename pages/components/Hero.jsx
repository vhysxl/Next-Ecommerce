import Link from "next/link";

export default function Hero(){
        return (
            <div className="lg:flex bg-gray-200">
              <div className="flex items-center justify-center w-full px-6 py-8 lg:h-[32rem] lg:w-1/2">
                <div className="max-w-xl">
                  <h2 className="text-3xl font-semibold text-black lg:text-4xl">
                    Toko Accessories <span className="text-red-600">Terpercaya</span>
                  </h2>
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 lg:text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis commodi cum cupiditate ducimus, fugit harum id necessitatibus odio quam quasi, quibusdam rem tempora voluptates.
                  </p>
                  <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
                    <Link
                      href="#"
                      className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-700"
                    >
                      Belanja Sekarang
                    </Link>
                    <Link
                      href="/Product"
                      className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md lg:mx-4 hover:bg-gray-300"
                    >
                      Tentang Kami
                    </Link>
                  </div>
                </div>
              </div>
              <div className="relative w-full h-64 lg:w-1/2 lg:h-auto">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url(https://lh3.googleusercontent.com/p/AF1QipMwAt1-FiyBf310LuYHB_GQpEuJ7yu3ZMLoEg85=s680-w680-h510)"
                  }}
                >
                  <div className="absolute inset-0 bg-black opacity-25"></div>
                </div>
              </div>
            </div>
          );
    
}